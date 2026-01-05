// src/sections/Contact.jsx
import { useEffect, useRef } from 'react';
import './Contact.css';

const Contact = () => {
  const formRef = useRef(null);

  useEffect(() => {
    initKeypad();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Message sent successfully! I\'ll get back to you soon.');
        e.target.reset();
      } else {
        // Try to parse error, but don't fail if response is not JSON
        let errorMsg = 'Please try again';
        try {
          const error = await response.json();
          errorMsg = error.message || errorMsg;
        } catch (e) {
          // Response is not JSON (404, etc.)
          errorMsg = `Server error: ${response.status}`;
        }
        alert(`Failed to send message: ${errorMsg}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message. Please try again or email me directly at bracosmo@gmail.com');
    }
  };

  return (
    <section className="contact-section">
      {/* Background particles */}
      <div className="contact-particles"></div>

      <main className="contact-main">
        <section className="contact-content">
          <div className="contact-info">
            <h2 className="contact-title">Ideas are cheap.<br/>Execution isn’t. Let’s work!</h2>
            <p className="contact-subtitle">
              Feel free to share the details of your project.
            </p>
            
            <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required 
                  placeholder="Your name"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required 
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  required 
                  rows="5"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>

              <p className="keypad-hint">Press any button to send →</p>
            </form>
          </div>
        </section>

        <div className="keypad">
          <div className="keypad__base">
            <img 
              src="https://assets.codepen.io/605876/keypad-base.png?format=auto&quality=86" 
              alt="Keypad base" 
            />
          </div>
          
          <button id="send-ok" type="button" className="key keypad__single keypad__single--left">
            <span className="key__mask">
              <span className="key__content">
                <span className="key__text">send</span>
                <img 
                  src="https://assets.codepen.io/605876/keypad-single.png?format=auto&quality=86" 
                  alt="" 
                />
              </span>
            </span>
          </button>
          
          <button id="send-go" type="button" className="key keypad__single">
            <span className="key__mask">
              <span className="key__content">
                <span className="key__text">go</span>
                <img 
                  src="https://assets.codepen.io/605876/keypad-single.png?format=auto&quality=86" 
                  alt="" 
                />
              </span>
            </span>
          </button>
          
          <button id="send-create" type="button" className="key keypad__double">
            <span className="key__mask">
              <span className="key__content">
                <span className="key__text">create.</span>
                <img 
                  src="https://assets.codepen.io/605876/keypad-double.png?format=auto&quality=86" 
                  alt="" 
                />
              </span>
            </span>
          </button>
        </div>
      </main>
    </section>
  );
};

// Initialize keypad functionality
function initKeypad() {
  const config = {
    muted: false,
    sendOk: {
      travel: 26,
      hue: 114,
      saturation: 1.4,
      brightness: 1.2,
      buttonElement: document.querySelector('#send-ok'),
    },
    sendGo: {
      travel: 26,
      hue: 0,
      saturation: 0,
      brightness: 1.4,
      buttonElement: document.querySelector('#send-go'),
    },
    sendCreate: {
      travel: 18,
      hue: 0,
      saturation: 0,
      brightness: 0.4,
      buttonElement: document.querySelector('#send-create'),
    },
  };

  const clickAudio = new Audio(
    'https://cdn.freesound.org/previews/378/378085_6260145-lq.mp3'
  );
  clickAudio.muted = config.muted;

  // Set CSS custom properties
  Object.values(config).forEach((item) => {
    if (item.buttonElement) {
      item.buttonElement.style.setProperty('--travel', item.travel);
      item.buttonElement.style.setProperty('--hue', item.hue);
      item.buttonElement.style.setProperty('--saturate', item.saturation);
      item.buttonElement.style.setProperty('--brightness', item.brightness);
    }
  });

  // Submit form function
  const submitForm = () => {
    const form = document.querySelector('.contact-form');
    if (form && form.checkValidity()) {
      form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    } else if (form) {
      form.reportValidity();
    }
  };

  // Add click handlers
  Object.values(config).forEach((item) => {
    if (item.buttonElement) {
      item.buttonElement.addEventListener('pointerdown', () => {
        if (!config.muted) {
          clickAudio.currentTime = 0;
          clickAudio.play();
        }
      });
      
      item.buttonElement.addEventListener('click', submitForm);
    }
  });

  // Show keypad with animation
  setTimeout(() => {
    const keypad = document.querySelector('.keypad');
    if (keypad) keypad.style.opacity = '1';
  }, 100);
}

export default Contact;
