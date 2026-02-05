// Smooth scroll function
function scrollToRegister() {
  document.getElementById('register').scrollIntoView({
    behavior: 'smooth'
  });
}

// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
  const registerForm = document.getElementById('registerForm');
  
  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const contact = document.getElementById('contact').value;
      const password = document.getElementById('password').value;
      const examType = document.getElementById('examType').value;
      const city = document.getElementById('city').value;
      const language = document.getElementById('language').value;
      
      // Basic validation
      if (password.length < 6) {
        alert('❌ Password should be at least 6 characters!');
        return;
      }
      
      // Create user object
      const userData = {
        name: name,
        contact: contact,
        password: password,
        examType: examType,
        city: city,
        language: language,
        registeredDate: new Date().toISOString()
      };
      
      // For now, store in localStorage (temporary)
      // We'll connect to Google Sheets in next session
      localStorage.setItem('tempUser', JSON.stringify(userData));
      
      // Success message
      alert('🎉 Registration Successful!\n\nWelcome ' + name + '!\n\nNext session mein hum Google Sheets se connect karenge.');
      
      // Reset form
      registerForm.reset();
      
      // Show success animation
      showSuccessMessage();
    });
  }
});

// Success message function
function showSuccessMessage() {
  const message = document.createElement('div');
  message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        font-size: 1.1rem;
        font-weight: 600;
    `;
  message.textContent = '✅ Account Created Successfully!';
  document.body.appendChild(message);
  
  setTimeout(() => {
    message.remove();
  }, 3000);
}

// Console message
console.log('📚 Exam Buddy Finder - Session 1 Complete!');
console.log('✅ Landing page working!');
console.log('🚀 Next: Login page & Google Sheets backend');
// ==========================================
// SESSION 2: LOGIN PAGE JAVASCRIPT
// ==========================================

// Password toggle function
function togglePassword() {
  const passwordInput = document.getElementById('loginPassword');
  const toggleIcon = document.getElementById('toggleIcon');
  
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggleIcon.textContent = '🙈';
  } else {
    passwordInput.type = 'password';
    toggleIcon.textContent = '👁️';
  }
}

// Demo login function
function loginAsDemo() {
  document.getElementById('loginContact').value = 'demo@exambuddy.com';
  document.getElementById('loginPassword').value = 'demo123';
  
  showNotification('Demo credentials filled! Click Login Now', 'info');
}

// Login form handler
if (document.getElementById('loginForm')) {
  document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const contact = document.getElementById('loginContact').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Show loading
    document.getElementById('loadingOverlay').style.display = 'flex';
    
    // Validation
    if (contact.trim() === '' || password.trim() === '') {
      hideLoading();
      showNotification('❌ Please fill all fields!', 'error');
      return;
    }
    
    if (password.length < 6) {
      hideLoading();
      showNotification('❌ Password should be at least 6 characters!', 'error');
      return;
    }
    
    // Simulate login (Google Sheets mein next session connect karenge)
    setTimeout(() => {
      // Check demo credentials
      if (contact === 'demo@exambuddy.com' && password === 'demo123') {
        // Success
        const userData = {
          name: 'Demo User',
          contact: contact,
          examType: 'VDO',
          loggedIn: true,
          loginTime: new Date().toISOString()
        };
        
        // Store in localStorage
        if (rememberMe) {
          localStorage.setItem('examBuddyUser', JSON.stringify(userData));
        } else {
          sessionStorage.setItem('examBuddyUser', JSON.stringify(userData));
        }
        
        hideLoading();
        showNotification('✅ Login Successful! Redirecting...', 'success');
        
        // Redirect to dashboard (next session banayenge)
        setTimeout(() => {
          // dashboard.html abhi nahi hai, so alert dikhayenge
          alert('🎉 Login successful!\n\nDashboard page next session mein banayenge!');
          // window.location.href = 'dashboard.html';
        }, 1500);
        
      } else {
        // Check if user registered (from Session 1)
        const tempUser = localStorage.getItem('tempUser');
        
        if (tempUser) {
          const user = JSON.parse(tempUser);
          
          if (user.contact === contact && user.password === password) {
            // Login success
            const userData = {
              name: user.name,
              contact: user.contact,
              examType: user.examType,
              city: user.city,
              language: user.language,
              loggedIn: true,
              loginTime: new Date().toISOString()
            };
            
            if (rememberMe) {
              localStorage.setItem('examBuddyUser', JSON.stringify(userData));
            } else {
              sessionStorage.setItem('examBuddyUser', JSON.stringify(userData));
            }
            
            hideLoading();
            showNotification('✅ Welcome back, ' + user.name + '!', 'success');
            
            setTimeout(() => {
              alert('🎉 Login successful!\n\nDashboard next session mein banayenge!');
            }, 1500);
            
          } else {
            hideLoading();
            showNotification('❌ Invalid email/phone or password!', 'error');
          }
        } else {
          hideLoading();
          showNotification('❌ User not found! Please register first.', 'error');
        }
      }
    }, 2000); // 2 second delay for realistic feel
  });
}

// Hide loading function
function hideLoading() {
  document.getElementById('loadingOverlay').style.display = 'none';
}

// Notification function (enhanced)
function showNotification(message, type = 'info') {
  const existingNotification = document.querySelector('.notification-toast');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  const notification = document.createElement('div');
  notification.className = 'notification-toast notification-' + type;
  
  const colors = {
    success: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    error: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    info: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  };
  
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 100000;
        font-size: 1rem;
        font-weight: 600;
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
    `;
  
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

console.log('📚 Session 2: Login page loaded!');
console.log('🔐 Demo credentials:demo@exambuddy.com/ demo123');