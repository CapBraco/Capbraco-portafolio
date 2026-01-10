// src/sections/Contact.jsx - WITH HONEYPOT SPAM PROTECTION
import { useState, useEffect, useRef } from 'react';
import './Contact.css';

const Contact = () => {
  const formRef = useRef(null);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const isSubmittingRef = useRef(false);

  useEffect(() => {
    initKeypad(handleFormSubmit);
  }, []);

  const handleFormSubmit = async (e) => {
    if (e) e.preventDefault();
    
    if (isSubmittingRef.current || status === 'sending') {
      return;
    }

    const form = formRef.current;
    if (!form || !form.checkValidity()) {
      form?.reportValidity();
      return;
    }

    isSubmittingRef.current = true;
    setStatus('sending');
    setErrorMessage('');

    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      website: formData.get('website'), // Honeypot field - should be empty
    };

    const API_URL = import.meta.env.VITE_API_URL || '';
    const endpoint = `${API_URL}/api/contact/`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
        setTimeout(() => {
          setStatus('idle');
          isSubmittingRef.current = false;
        }, 5000);
      } else {
        let errorMsg = 'Please try again';
        
        if (response.status === 429) {
          errorMsg = 'Too many requests. Please try again in an hour.';
        } else {
          try {
            const error = await response.json();
            errorMsg = error.error || error.message || errorMsg;
          } catch (e) {
            errorMsg = `Server error: ${response.status}`;
          }
        }
        
        setErrorMessage(errorMsg);
        setStatus('error');
        isSubmittingRef.current = false;
        setTimeout(() => {
          setStatus('idle');
          setErrorMessage('');
        }, 5000);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Network error. Please check your connection.');
      setStatus('error');
      isSubmittingRef.current = false;
      setTimeout(() => {
        setStatus('idle');
        setErrorMessage('');
      }, 5000);
    }
  };

  return (
    <section className="contact-section">
      <div className="contact-particles"></div>

      <main className="contact-main">
        <section className="contact-content">
          <div className="contact-info">
            <h2 className="contact-title">
              Ideas are cheap.<br /> Execution isn't. Let's work.
            </h2>
            <p className="contact-subtitle">
              Tell me more about your project.
            </p>
            
            {status !== 'success' && (
              <>
                <form ref={formRef} onSubmit={handleFormSubmit} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      minLength="2"
                      maxLength="100"
                      placeholder="Your name"
                      disabled={status === 'sending'}
                      autoComplete="name"
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
                      disabled={status === 'sending'}
                      autoComplete="email"
                    />
                  </div>
                  
                  {/* HONEYPOT FIELD - HIDDEN FROM HUMANS, BOTS WILL FILL IT */}
                  <div className="honeypot-field" aria-hidden="true">
                    <label htmlFor="website">Website (leave this blank)</label>
                    <input 
                      type="text" 
                      id="website" 
                      name="website" 
                      tabIndex="-1"
                      autoComplete="off"
                      placeholder="Leave blank"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      required 
                      rows="5"
                      minLength="10"
                      maxLength="5000"
                      placeholder="Tell me about your project..."
                      disabled={status === 'sending'}
                    ></textarea>
                    <span className="character-count">
                      {formRef.current?.message?.value?.length || 0} / 5000
                    </span>
                  </div>

                  <p className="keypad-hint">
                    {status === 'sending' ? 'Sending...' : 'Press any button to send →'}
                  </p>

                  {status === 'error' && (
                    <div className="status-message error-message">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2"/>
                        <path d="M10 6V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <circle cx="10" cy="14" r="1" fill="currentColor"/>
                      </svg>
                      <p>{errorMessage}</p>
                    </div>
                  )}
                </form>
              </>
            )}

            {status === 'success' && (
              <div className="success-container">
                <div className="success-icon">
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="3"/>
                    <path d="M20 32L28 40L44 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="success-title">Message Sent!</h3>
                <p className="success-text">
                  Thank you for reaching out. I'll get back to you within 24 hours.
                </p>
                <button 
                  onClick={() => {
                    setStatus('idle');
                    isSubmittingRef.current = false;
                  }} 
                  className="success-button"
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>
        </section>

        <div className="keypad" style={{ opacity: status === 'sending' ? 0.5 : 1, pointerEvents: status === 'sending' ? 'none' : 'auto' }}>
          <div className="keypad__base">
            <img 
              src="https://assets.codepen.io/605876/keypad-base.png?format=auto&quality=86" 
              alt="Keypad base" 
            />
          </div>
          
          <button id="send-ok" type="button" className="key keypad__single keypad__single--left" disabled={status === 'sending'}>
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
          
          <button id="send-go" type="button" className="key keypad__single" disabled={status === 'sending'}>
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
          
          <button id="send-create" type="button" className="key keypad__double" disabled={status === 'sending'}>
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
function initKeypad(submitCallback) {
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

  Object.values(config).forEach((item) => {
    if (item.buttonElement) {
      item.buttonElement.style.setProperty('--travel', item.travel);
      item.buttonElement.style.setProperty('--hue', item.hue);
      item.buttonElement.style.setProperty('--saturate', item.saturation);
      item.buttonElement.style.setProperty('--brightness', item.brightness);
    }
  });

  Object.values(config).forEach((item) => {
    if (item.buttonElement) {
      item.buttonElement.addEventListener('pointerdown', () => {
        if (!config.muted) {
          clickAudio.currentTime = 0;
          clickAudio.play();
        }
      });
      
      item.buttonElement.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        submitCallback();
      }, { once: false });
    }
  });

  setTimeout(() => {
    const keypad = document.querySelector('.keypad');
    if (keypad) keypad.style.opacity = '1';
  }, 100);
}

export default Contact;
