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