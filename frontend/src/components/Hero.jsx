// src/components/Hero.jsx
import { useEffect } from 'react';
import './Hero.css';

const Hero = ({ onBurnComplete }) => {
  useEffect(() => {
    captureAndBurn(onBurnComplete);
  }, [onBurnComplete]);

  return (
    <>
      {/* Hero that gets captured and burned */}
      <div id="intro-capture" className="intro-section">
        <div className="intro-content">
          <div className="intro-title">
            <h2>Cap</h2>
            <h1 id="intro-title-main">Braco</h1>
            <h4>Let's work together.</h4>
          </div>
        </div>
      </div>

      {/* Fire overlay canvas */}
      <canvas id="fire-overlay"></canvas>
    </>
  );
};

async function captureAndBurn(onComplete) {
  const canvasEl = document.getElementById('fire-overlay');
  const heroElement = document.getElementById('intro-capture');
  
  if (!canvasEl || !heroElement) return;

  await document.fonts.ready;
  await new Promise(resolve => setTimeout(resolve, 100));

  const devicePixelRatio = Math.min(window.devicePixelRatio, 2);
  let startTime = performance.now();
  let animationProgress = 0.3;
  let uniforms;
  let textTexture;

  const vertexShaderSource = `
    precision mediump float;
    varying vec2 vUv;
    attribute vec2 a_position;
    void main() {
      vUv = a_position;
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  const fragmentShaderSource = `
    precision mediump float;
    varying vec2 vUv;
    uniform vec2 u_resolution;
    uniform float u_progress;
    uniform float u_time;
    uniform sampler2D u_text;
    
    float rand(vec2 n) {
      return fract(cos(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
    }
    
    float noise(vec2 n) {
      const vec2 d = vec2(0., 1.);
      vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
      return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
    }
    
    float fbm(vec2 n) {
      float total = 0.0, amplitude = .4;
      for (int i = 0; i < 4; i++) {
        total += noise(n) * amplitude;
        n += n;
        amplitude *= 0.6;
      }
      return total;
    }
    
    void main() {
      vec2 uv = vUv;
      uv.x *= min(1., u_resolution.x / u_resolution.y);
      uv.y *= min(1., u_resolution.y / u_resolution.x);
      vec2 screenUv = vUv * 0.5 + 0.5;
      screenUv.y = 1.0 - screenUv.y;
      float t = u_progress;
      vec4 textColor = texture2D(u_text, screenUv);
      vec3 color = textColor.rgb;
      float main_noise = 1. - fbm(.75 * uv + 10. - vec2(.3, .9 * t));
      float paper_darkness = smoothstep(main_noise - .1, main_noise, t);
      color -= vec3(.99, .95, .99) * paper_darkness;
      vec3 fire_color = fbm(6. * uv - vec2(0., .005 * u_time)) * vec3(6., 1.4, .0);
      float show_fire = smoothstep(.4, .9, fbm(10. * uv + 2. - vec2(0., .005 * u_time)));
      show_fire += smoothstep(.7, .8, fbm(.5 * uv + 5. - vec2(0., .001 * u_time)));
      float fire_border = .02 * show_fire;
      float fire_edge = smoothstep(main_noise - fire_border, main_noise - .5 * fire_border, t);
      fire_edge *= (1. - smoothstep(main_noise - .5 * fire_border, main_noise, t));
      color += fire_color * fire_edge;
      float opacity = 1. - smoothstep(main_noise - .0005, main_noise, t);
      gl_FragColor = vec4(color, opacity);
    }
  `;

  const gl = canvasEl.getContext('webgl') || canvasEl.getContext('experimental-webgl');

  if (!gl) {
    console.warn('WebGL not supported');
    heroElement.style.display = 'none';
    if (onComplete) onComplete();
    return;
  }

  const html2canvas = (await import('html2canvas')).default;
  const heroCanvas = await html2canvas(heroElement, {
    backgroundColor: '#f5f5f7',
    scale: 2,
    logging: false
  });

  heroElement.style.display = 'none';

  function createShader(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader error:', gl.getShaderInfoLog(shader));
      return null;
    }
    return shader;
  }

  const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program error:', gl.getProgramInfoLog(program));
    return;
  }

  gl.useProgram(program);

  uniforms = {
    u_resolution: gl.getUniformLocation(program, 'u_resolution'),
    u_progress: gl.getUniformLocation(program, 'u_progress'),
    u_time: gl.getUniformLocation(program, 'u_time'),
    u_text: gl.getUniformLocation(program, 'u_text')
  };

  textTexture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, textTexture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, heroCanvas);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

  gl.clearColor(1.0, 1.0, 1.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  const positionLocation = gl.getAttribLocation(program, 'a_position');
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  function resizeCanvas() {
    canvasEl.width = window.innerWidth * devicePixelRatio;
    canvasEl.height = window.innerHeight * devicePixelRatio;
    gl.viewport(0, 0, canvasEl.width, canvasEl.height);
    gl.uniform2f(uniforms.u_resolution, canvasEl.width, canvasEl.height);
  }

  function easeInOut(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  function render() {
    const currentTime = performance.now();
    const elapsed = (currentTime - startTime) / 7000;

    if (elapsed <= 1) {
      animationProgress = 0.3 + 0.7 * easeInOut(elapsed);
    } else {
      canvasEl.style.display = 'none';
      if (onComplete) onComplete();
      return;
    }

    gl.uniform1f(uniforms.u_time, currentTime);
    gl.uniform1f(uniforms.u_progress, animationProgress);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textTexture);
    gl.uniform1i(uniforms.u_text, 0);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(render);
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  render();
}

export default Hero;