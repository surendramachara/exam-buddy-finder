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
  showNotification('✅ Login successful! Redirecting...',   'success');
      window.location.href = 'dashboard.html';
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
  showNotification('✅ Login successful! Redirecting...', 'success');
  window.location.href = 'dashboard.html';
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
// ==========================================
// SESSION 3: DASHBOARD PAGE JAVASCRIPT
// ==========================================

// Check if user is logged in
document.addEventListener('DOMContentLoaded', function() {
    // Only run on dashboard page
    if (window.location.pathname.includes('dashboard.html')) {
        checkAuth();
        loadUserData();
        loadDashboardStats();
    }
});

// Check authentication
function checkAuth() {
    const user = localStorage.getItem('examBuddyUser') || sessionStorage.getItem('examBuddyUser');
    
    if (!user) {
        // Not logged in, redirect to login
        alert('⚠️ Please login first!');
        window.location.href = 'login.html';
        return;
    }
}

// Load user data
function loadUserData() {
    const userStr = localStorage.getItem('examBuddyUser') || sessionStorage.getItem('examBuddyUser');
    
    if (userStr) {
        const user = JSON.parse(userStr);
        
        // Update user name in multiple places
        const userNameElements = document.querySelectorAll('#userName, #dashboardUserName, #dropdownUserName');
        userNameElements.forEach(el => {
            if (el) el.textContent = user.name;
        });
        
        // Update email
        const emailElement = document.getElementById('dropdownUserEmail');
        if (emailElement) {
            emailElement.textContent = user.contact;
        }
        
        // Update exam type
        const examElement = document.getElementById('userExam');
        if (examElement) {
            examElement.textContent = user.examType || 'VDO';
        }
    }
}

// Load dashboard stats (dummy data for now)
function loadDashboardStats() {
    // In future sessions, we'll load from Google Sheets
    // For now, using dummy data
    
    const stats = {
        streak: Math.floor(Math.random() * 7) + 1,
        hours: Math.floor(Math.random() * 20) + 5,
        buddies: Math.floor(Math.random() * 10),
        groups: Math.floor(Math.random() * 5)
    };
    
    // Update stat cards
    const streakEl = document.getElementById('studyStreak');
    const hoursEl = document.getElementById('studyHours');
    const buddiesEl = document.getElementById('totalBuddies');
    const groupsEl = document.getElementById('totalGroups');
    
    if (streakEl) streakEl.textContent = stats.streak;
    if (hoursEl) hoursEl.textContent = stats.hours;
    if (buddiesEl) buddiesEl.textContent = stats.buddies;
    if (groupsEl) groupsEl.textContent = stats.groups;
}

// Toggle sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    
    if (sidebar && overlay) {
        sidebar.classList.toggle('show');
        overlay.classList.toggle('show');
    }
}

// Toggle notifications
function toggleNotifications() {
    const dropdown = document.getElementById('notificationDropdown');
    const userDropdown = document.getElementById('userDropdown');
    const overlay = document.getElementById('overlay');
    
    if (dropdown) {
        dropdown.classList.toggle('show');
        overlay.classList.toggle('show');
        
        // Close user dropdown if open
        if (userDropdown && userDropdown.classList.contains('show')) {
            userDropdown.classList.remove('show');
        }
    }
}

// Toggle user menu
function toggleUserMenu() {
    const dropdown = document.getElementById('userDropdown');
    const notifDropdown = document.getElementById('notificationDropdown');
    const overlay = document.getElementById('overlay');
    
    if (dropdown) {
        dropdown.classList.toggle('show');
        overlay.classList.toggle('show');
        
        // Close notification dropdown if open
        if (notifDropdown && notifDropdown.classList.contains('show')) {
            notifDropdown.classList.remove('show');
        }
    }
}

// Close all dropdowns
function closeAllDropdowns() {
    const overlay = document.getElementById('overlay');
    const sidebar = document.getElementById('sidebar');
    const notifDropdown = document.getElementById('notificationDropdown');
    const userDropdown = document.getElementById('userDropdown');
    
    if (overlay) overlay.classList.remove('show');
    if (sidebar) sidebar.classList.remove('show');
    if (notifDropdown) notifDropdown.classList.remove('show');
    if (userDropdown) userDropdown.classList.remove('show');
}

// Daily check-in
function dailyCheckIn() {
    const statusEl = document.getElementById('checkInStatus');
    const button = event.target;
    
    if (statusEl) {
        statusEl.textContent = '✅ Checked in today!';
        statusEl.style.color = '#43e97b';
    }
    
    if (button) {
        button.textContent = '✅ Checked In';
        button.disabled = true;
        button.style.opacity = '0.6';
    }
    
    showNotification('🎉 Daily check-in successful! Keep it up!', 'success');
    
    // Update streak (dummy)
    const streakEl = document.getElementById('studyStreak');
    if (streakEl) {
        const currentStreak = parseInt(streakEl.textContent);
        streakEl.textContent = currentStreak + 1;
    }
}

// Logout function
function logout() {
    const confirm = window.confirm('Are you sure you want to logout?');
    
    if (confirm) {
        // Clear storage
        localStorage.removeItem('examBuddyUser');
        sessionStorage.removeItem('examBuddyUser');
        
        // Show message
        alert('👋 Logged out successfully!');
        
        // Redirect to home
        window.location.href = 'index.html';
    }
}

console.log('📊 Session 3: Dashboard page loaded!');
console.log('✅ User authentication check active');
// ==========================================
// SESSION 4: PROFILE PAGE JAVASCRIPT
// ==========================================

// Profile page initialization
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('profile.html')) {
        checkAuth();
        loadProfileData();
        setupProfileListeners();
    }
});

// Load profile data
function loadProfileData() {
    const userStr = localStorage.getItem('examBuddyUser') || sessionStorage.getItem('examBuddyUser');
    
    if (userStr) {
        const user = JSON.parse(userStr);
        
        // Update navbar
        const userNameEl = document.getElementById('userName');
        if (userNameEl) userNameEl.textContent = user.name;
        
        // Update avatar letter
        const avatarLetter = document.getElementById('avatarLetter');
        if (avatarLetter) avatarLetter.textContent = user.name.charAt(0).toUpperCase();
        
        // Profile card
        document.getElementById('profileName').textContent = user.name;
        document.getElementById('profileExam').textContent = user.examType + ' Aspirant';
        document.getElementById('profileCity').textContent = user.city || 'Not set';
        
        // Join date
        if (user.registeredDate) {
            const date = new Date(user.registeredDate);
            const options = { month: 'short', year: 'numeric' };
            document.getElementById('profileJoinDate').textContent = date.toLocaleDateString('en-US', options);
        }
        
        // Stats (dummy for now)
        document.getElementById('profileStreak').textContent = Math.floor(Math.random() * 15) + 1;
        document.getElementById('profileHours').textContent = Math.floor(Math.random() * 50) + 10;
        document.getElementById('profileRank').textContent = '#' + (Math.floor(Math.random() * 100) + 1);
        
        // Personal info - view mode
        document.getElementById('displayName').textContent = user.name;
        document.getElementById('displayContact').textContent = user.contact;
        document.getElementById('displayCity').textContent = user.city || 'Not set';
        document.getElementById('displayLanguage').textContent = user.language || 'Not set';
        
        // Bio
        const bio = localStorage.getItem('userBio');
        if (bio) {
            document.getElementById('displayBio').textContent = bio;
            document.getElementById('displayBio').style.fontStyle = 'normal';
        }
        
        // Study preferences - view mode
        document.getElementById('displayExam').textContent = user.examType;
        
        const studyTime = localStorage.getItem('studyTime');
        const dailyGoal = localStorage.getItem('dailyGoal');
        const subjects = localStorage.getItem('favoriteSubjects');
        
        if (studyTime) document.getElementById('displayStudyTime').textContent = studyTime;
        if (dailyGoal) document.getElementById('displayGoal').textContent = dailyGoal + ' hours/day';
        if (subjects) document.getElementById('displaySubjects').textContent = subjects;
        
        // Edit mode - pre-fill
        document.getElementById('editName').value = user.name;
        document.getElementById('editContact').value = user.contact;
        document.getElementById('editCity').value = user.city || '';
        document.getElementById('editLanguage').value = user.language || 'Hindi';
        document.getElementById('editExam').value = user.examType;
        
        if (bio) document.getElementById('editBio').value = bio;
        if (studyTime) document.getElementById('editStudyTime').value = studyTime;
        if (dailyGoal) document.getElementById('editGoal').value = dailyGoal;
        if (subjects) document.getElementById('editSubjects').value = subjects;
        
        // User dropdown
        document.getElementById('dropdownUserName').textContent = user.name;
        document.getElementById('dropdownUserEmail').textContent = user.contact;
    }
}

// Setup profile listeners
function setupProfileListeners() {
    // Bio character counter
    const bioInput = document.getElementById('editBio');
    const bioCount = document.getElementById('bioCount');
    
    if (bioInput && bioCount) {
        bioInput.addEventListener('input', function() {
            const length = this.value.length;
            bioCount.textContent = length + '/200 characters';
            
            if (length > 200) {
                bioCount.style.color = '#ff4757';
            } else {
                bioCount.style.color = '#999';
            }
        });
        
        // Initial count
        bioCount.textContent = bioInput.value.length + '/200 characters';
    }
    
    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        const isDark = localStorage.getItem('darkMode') === 'true';
        darkModeToggle.checked = isDark;
        
        darkModeToggle.addEventListener('change', function() {
            if (this.checked) {
                localStorage.setItem('darkMode', 'true');
                showNotification('🌙 Dark mode enabled! (Coming soon)', 'info');
            } else {
                localStorage.setItem('darkMode', 'false');
                showNotification('☀️ Light mode enabled!', 'info');
            }
        });
    }
    
    // Notifications toggle
    const notifToggle = document.getElementById('notifToggle');
    if (notifToggle) {
        const isEnabled = localStorage.getItem('notifications') !== 'false';
        notifToggle.checked = isEnabled;
        
        notifToggle.addEventListener('change', function() {
            localStorage.setItem('notifications', this.checked);
            if (this.checked) {
                showNotification('🔔 Notifications enabled!', 'success');
            } else {
                showNotification('🔕 Notifications disabled!', 'info');
            }
        });
    }
}

// Toggle edit mode
function toggleEditMode() {
    const btn = document.getElementById('editModeBtn');
    const profileView = document.getElementById('profileView');
    const profileEdit = document.getElementById('profileEdit');
    const prefView = document.getElementById('prefView');
    const prefEdit = document.getElementById('prefEdit');
    const actions = document.getElementById('profileActions');
    
    const isEditing = btn.classList.contains('editing');
    
    if (isEditing) {
        // Cancel edit
        cancelEdit();
    } else {
        // Enter edit mode
        btn.textContent = '❌ Cancel Edit';
        btn.classList.add('editing');
        
        profileView.style.display = 'none';
        profileEdit.style.display = 'block';
        prefView.style.display = 'none';
        prefEdit.style.display = 'block';
        actions.style.display = 'flex';
    }
}

// Cancel edit
function cancelEdit() {
    const btn = document.getElementById('editModeBtn');
    const profileView = document.getElementById('profileView');
    const profileEdit = document.getElementById('profileEdit');
    const prefView = document.getElementById('prefView');
    const prefEdit = document.getElementById('prefEdit');
    const actions = document.getElementById('profileActions');
    
    btn.textContent = '✏️ Edit Profile';
    btn.classList.remove('editing');
    
    profileView.style.display = 'block';
    profileEdit.style.display = 'none';
    prefView.style.display = 'block';
    prefEdit.style.display = 'none';
    actions.style.display = 'none';
    
    // Reload data (reset changes)
    loadProfileData();
}

// Save profile
function saveProfile() {
    // Get values
    const name = document.getElementById('editName').value.trim();
    const city = document.getElementById('editCity').value.trim();
    const language = document.getElementById('editLanguage').value;
    const bio = document.getElementById('editBio').value.trim();
    const examType = document.getElementById('editExam').value;
    const studyTime = document.getElementById('editStudyTime').value;
    const goal = document.getElementById('editGoal').value;
    const subjects = document.getElementById('editSubjects').value.trim();
    
    // Validation
    if (!name) {
        showNotification('❌ Name is required!', 'error');
        return;
    }
    
    if (bio.length > 200) {
        showNotification('❌ Bio must be under 200 characters!', 'error');
        return;
    }
    
    // Get existing user data
    const userStr = localStorage.getItem('examBuddyUser') || sessionStorage.getItem('examBuddyUser');
    const user = JSON.parse(userStr);
    
    // Update user object
    user.name = name;
    user.city = city;
    user.language = language;
    user.examType = examType;
    
    // Save to storage
    const storage = localStorage.getItem('examBuddyUser') ? localStorage : sessionStorage;
    storage.setItem('examBuddyUser', JSON.stringify(user));
    
    // Save additional data
    localStorage.setItem('userBio', bio);
    if (studyTime) localStorage.setItem('studyTime', studyTime);
    if (goal) localStorage.setItem('dailyGoal', goal);
    if (subjects) localStorage.setItem('favoriteSubjects', subjects);
    
    // Show success
    showNotification('✅ Profile updated successfully!', 'success');
    
    // Exit edit mode
    setTimeout(() => {
        cancelEdit();
        loadProfileData();
    }, 1000);
}

// Confirm delete account
function confirmDelete() {
    const confirmation = prompt('⚠️ WARNING: This will permanently delete your account!\n\nType "DELETE" to confirm:');
    
    if (confirmation === 'DELETE') {
        // Clear all data
        localStorage.clear();
        sessionStorage.clear();
        
        alert('Account deleted successfully. We\'re sad to see you go! 😢');
        
        // Redirect to home
        window.location.href = 'index.html';
    } else if (confirmation !== null) {
        showNotification('❌ Deletion cancelled - incorrect confirmation', 'error');
    }
}

console.log('👤 Session 4: Profile page loaded!');