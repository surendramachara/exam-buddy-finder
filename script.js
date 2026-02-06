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
// ==========================================
// SESSION 5: FIND BUDDIES PAGE JAVASCRIPT
// ==========================================

// Sample people data with new structure
const samplePeople = [
    {
        id: 1,
        name: 'Rahul Kumar',
        userType: 'Student',
        category: 'VDO',
        currentLocation: { state: 'Uttar Pradesh', district: 'Lucknow' },
        birthLocation: { state: 'Uttar Pradesh', district: 'Lucknow' },
        language: 'Both',
        bio: 'Preparing for VDO 2026. Looking for serious study partners.',
        streak: 12,
        hours: 45,
        rank: 23,
        connected: false,
        pending: false
    },
    {
        id: 2,
        name: 'Priya Singh',
        userType: 'Student',
        category: 'SSC',
        currentLocation: { state: 'Uttar Pradesh', district: 'Kanpur' },
        birthLocation: { state: 'Uttar Pradesh', district: 'Varanasi' },
        language: 'Hindi',
        bio: 'SSC CGL aspirant. Strong in Mathematics and Reasoning.',
        streak: 8,
        hours: 32,
        rank: 45,
        connected: false,
        pending: false
    },
    {
        id: 3,
        name: 'Vikash Yadav',
        userType: 'Government Servant',
        category: 'State Government',
        currentLocation: { state: 'Uttar Pradesh', district: 'Prayagraj' },
        birthLocation: { state: 'Uttar Pradesh', district: 'Prayagraj' },
        language: 'Both',
        bio: 'VDO preparing for promotion exam. 5 years experience.',
        streak: 15,
        hours: 52,
        rank: 18,
        connected: false,
        pending: false
    },
    {
        id: 4,
        name: 'Amit Verma',
        userType: 'Professional',
        category: 'IT / Software Development',
        currentLocation: { state: 'Delhi', district: 'South Delhi' },
        birthLocation: { state: 'Uttar Pradesh', district: 'Lucknow' },
        language: 'English',
        bio: 'Software engineer learning data science and AI.',
        streak: 20,
        hours: 67,
        rank: 12,
        connected: false,
        pending: false
    },
    {
        id: 5,
        name: 'Anjali Sharma',
        userType: 'Student',
        category: 'Banking',
        currentLocation: { state: 'Uttar Pradesh', district: 'Lucknow' },
        birthLocation: { state: 'Rajasthan', district: 'Jaipur' },
        language: 'Both',
        bio: 'IBPS PO preparation. Commerce graduate.',
        streak: 10,
        hours: 38,
        rank: 34,
        connected: false,
        pending: false
    },
    {
        id: 6,
        name: 'Suresh Patel',
        userType: 'Professional',
        category: 'Agriculture / Farming',
        currentLocation: { state: 'Uttar Pradesh', district: 'Lucknow' },
        birthLocation: { state: 'Uttar Pradesh', district: 'Hardoi' },
        language: 'Hindi',
        bio: 'Farmer learning modern agriculture techniques.',
        streak: 5,
        hours: 25,
        rank: 67,
        connected: false,
        pending: false
    },
    {
        id: 7,
        name: 'Neha Gupta',
        userType: 'Student',
        category: 'UPSC',
        currentLocation: { state: 'Delhi', district: 'Central Delhi' },
        birthLocation: { state: 'Bihar', district: 'Patna' },
        language: 'Both',
        bio: 'UPSC CSE 2026 aspirant. Optional: Political Science.',
        streak: 25,
        hours: 89,
        rank: 8,
        connected: true,
        pending: false
    },
    {
        id: 8,
        name: 'Ravi Kumar',
        userType: 'Government Servant',
        category: 'Central Government',
        currentLocation: { state: 'Delhi', district: 'New Delhi' },
        birthLocation: { state: 'Uttar Pradesh', district: 'Lucknow' },
        language: 'Both',
        bio: 'Working in Ministry. Preparing for departmental exam.',
        streak: 18,
        hours: 55,
        rank: 21,
        connected: false,
        pending: false
    }
];

// Category mappings based on user type
const categoryMappings = {
    'Student': [
        'VDO',
        'SSC',
        'UPSC',
        'Banking',
        'Railway',
        'Teaching',
        'State PSC',
        'Other'
    ],
    'Government Servant': [
        'State Government',
        'Central Government',
        'PSU / Autonomous Body',
        'Municipal Corporation',
        'Other'
    ],
    'Professional': [
        'IT / Software Development',
        'Business / Trading',
        'Agriculture / Farming',
        'Teaching / Coaching (Private)',
        'Self-Employed / Freelancer',
        'Skill Learner',
        'Job Seeker',
        'Other'
    ]
};

// District mappings (sample - add more as needed)
const districtMappings = {
    'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Varanasi', 'Prayagraj', 'Agra', 'Meerut', 'Ghaziabad', 'Noida', 'Other'],
    'Delhi': ['Central Delhi', 'North Delhi', 'South Delhi', 'East Delhi', 'West Delhi', 'New Delhi'],
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Other'],
    'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Other'],
    'Madhya Pradesh': ['Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Other'],
    'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Other'],
    'Other': ['Other']
};

// Global variables
let allPeople = [...samplePeople];
let filteredPeople = [...samplePeople];
let currentTab = 'all';
let isGridView = true;
let selectedPerson = null;

// Initialize Find Buddies page
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('find-buddies.html')) {
        checkAuth();
        loadBuddiesPage();
    }
});

// Load buddies page
function loadBuddiesPage() {
    loadUserData();
    loadPeople();
    updateCounts();
}

// User type change handler
function onUserTypeChange() {
    const userType = document.getElementById('filterUserType').value;
    const categorySelect = document.getElementById('filterCategory');
    
    // Clear and populate category dropdown
    categorySelect.innerHTML = '<option value="">All Categories</option>';
    
    if (userType && categoryMappings[userType]) {
        categoryMappings[userType].forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            categorySelect.appendChild(option);
        });
    }
    
    applyFilters();
}

// Current state change handler
function onCurrentStateChange() {
    const state = document.getElementById('filterCurrentState').value;
    const districtSelect = document.getElementById('filterCurrentDistrict');
    
    // Clear and populate district dropdown
    districtSelect.innerHTML = '<option value="">All Districts</option>';
    
    if (state && districtMappings[state]) {
        districtMappings[state].forEach(district => {
            const option = document.createElement('option');
            option.value = district;
            option.textContent = district;
            districtSelect.appendChild(option);
        });
    }
    
    applyFilters();
}

// Birth state change handler
function onBirthStateChange() {
    const state = document.getElementById('filterBirthState').value;
    const districtSelect = document.getElementById('filterBirthDistrict');
    
    // Clear and populate district dropdown
    districtSelect.innerHTML = '<option value="">All Districts</option>';
    
    if (state && districtMappings[state]) {
        districtMappings[state].forEach(district => {
            const option = document.createElement('option');
            option.value = district;
            option.textContent = district;
            districtSelect.appendChild(option);
        });
    }
    
    applyFilters();
}

// Toggle advanced filters
function toggleAdvancedFilters() {
    const advancedFilters = document.getElementById('advancedFilters');
    const icon = document.getElementById('advancedToggleIcon');
    
    if (advancedFilters.style.display === 'none') {
        advancedFilters.style.display = 'block';
        icon.classList.add('rotated');
    } else {
        advancedFilters.style.display = 'none';
        icon.classList.remove('rotated');
    }
}

// Load people
function loadPeople() {
    const container = document.getElementById('studentsContainer');
    const emptyState = document.getElementById('emptyState');
    
    // Get current tab people
    let people = [];
    
    if (currentTab === 'all') {
        people = filteredPeople;
    } else if (currentTab === 'connected') {
        people = filteredPeople.filter(p => p.connected);
    } else if (currentTab === 'pending') {
        people = filteredPeople.filter(p => p.pending);
    }
    
    // Clear container
    container.innerHTML = '';
    
    if (people.length === 0) {
        emptyState.style.display = 'block';
        container.style.display = 'none';
        return;
    }
    
    emptyState.style.display = 'none';
    container.style.display = 'grid';
    
    // Add people
    people.forEach(person => {
        const card = createPersonCard(person);
        container.appendChild(card);
    });
    
    // Update result count
    document.getElementById('resultCount').textContent = people.length;
}

// Create person card
function createPersonCard(person) {
    const card = document.createElement('div');
    card.className = 'student-card';
    card.onclick = () => openStudentModal(person);
    
    // Connection status button
    let connectBtnText = '🤝 Connect';
    let connectBtnClass = 'btn-connect';
    
    if (person.connected) {
        connectBtnText = '✅ Connected';
        connectBtnClass = 'btn-connect connected';
    } else if (person.pending) {
        connectBtnText = '⏳ Pending';
        connectBtnClass = 'btn-connect pending';
    }
    
    // Birth location display (if different from current)
    let birthLocationHTML = '';
    if (person.birthLocation && 
        (person.birthLocation.state !== person.currentLocation.state || 
         person.birthLocation.district !== person.currentLocation.district)) {
        birthLocationHTML = `<p class="student-location">🏠 Born: ${person.birthLocation.district}, ${person.birthLocation.state}</p>`;
    }
    
    card.innerHTML = `
        <div class="student-card-header">
            <div class="student-avatar">
                ${person.name.charAt(0).toUpperCase()}
            </div>
            <div class="student-info">
                <h3>${person.name}</h3>
                <p class="student-exam">${person.userType} - ${person.category}</p>
                <p class="student-location">📍 ${person.currentLocation.district}, ${person.currentLocation.state}</p>
                ${birthLocationHTML}
            </div>
        </div>
        
        <p class="student-bio">${person.bio}</p>
        
        <div class="student-tags">
            <span class="tag">🗣️ ${person.language}</span>
        </div>
        
        <div class="student-stats">
            <div class="student-stat">
                <h4>${person.streak}</h4>
                <p>Streak</p>
            </div>
            <div class="student-stat">
                <h4>${person.hours}</h4>
                <p>Hours</p>
            </div>
            <div class="student-stat">
                <h4>#${person.rank}</h4>
                <p>Rank</p>
            </div>
        </div>
        
        <div class="student-actions">
            <button class="${connectBtnClass}" onclick="event.stopPropagation(); toggleConnect(${person.id})">
                ${connectBtnText}
            </button>
        </div>
    `;
    
    return card;
}

// Apply filters
function applyFilters() {
    const userTypeFilter = document.getElementById('filterUserType').value;
    const categoryFilter = document.getElementById('filterCategory').value;
    const currentStateFilter = document.getElementById('filterCurrentState').value;
    const currentDistrictFilter = document.getElementById('filterCurrentDistrict').value;
    const languageFilter = document.getElementById('filterLanguage').value;
    const birthStateFilter = document.getElementById('filterBirthState').value;
    const birthDistrictFilter = document.getElementById('filterBirthDistrict').value;
    
    filteredPeople = allPeople.filter(person => {
        // User type filter
        if (userTypeFilter && person.userType !== userTypeFilter) return false;
        
        // Category filter
        if (categoryFilter && person.category !== categoryFilter) return false;
        
        // Current location filters
        if (currentStateFilter && person.currentLocation.state !== currentStateFilter) return false;
        if (currentDistrictFilter && person.currentLocation.district !== currentDistrictFilter) return false;
        
        // Language filter
        if (languageFilter && person.language !== languageFilter && person.language !== 'Both' && languageFilter !== 'Both') return false;
        
        // Birth location filters (optional)
        if (birthStateFilter && person.birthLocation && person.birthLocation.state !== birthStateFilter) return false;
        if (birthDistrictFilter && person.birthLocation && person.birthLocation.district !== birthDistrictFilter) return false;
        
        return true;
    });
    
    loadPeople();
    updateCounts();
}

// Reset filters
function resetFilters() {
    document.getElementById('filterUserType').value = '';
    document.getElementById('filterCategory').value = '';
    document.getElementById('filterCurrentState').value = '';
    document.getElementById('filterCurrentDistrict').value = '';
    document.getElementById('filterLanguage').value = '';
    document.getElementById('filterBirthState').value = '';
    document.getElementById('filterBirthDistrict').value = '';
    
    // Reset category dropdown
    document.getElementById('filterCategory').innerHTML = '<option value="">All Categories</option>';
    
    // Reset district dropdowns
    document.getElementById('filterCurrentDistrict').innerHTML = '<option value="">All Districts</option>';
    document.getElementById('filterBirthDistrict').innerHTML = '<option value="">All Districts</option>';
    
    filteredPeople = [...allPeople];
    loadPeople();
    updateCounts();
}

// Switch tab
function switchTab(tab) {
    currentTab = tab;
    
    // Update active tab
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    loadPeople();
}

// Update counts
function updateCounts() {
    document.getElementById('allCount').textContent = filteredPeople.length;
    document.getElementById('connectedCount').textContent = filteredPeople.filter(p => p.connected).length;
    document.getElementById('pendingCount').textContent = filteredPeople.filter(p => p.pending).length;
}

// Toggle view mode
function toggleViewMode() {
    const container = document.getElementById('studentsContainer');
    const icon = document.getElementById('viewModeIcon');
    const text = document.getElementById('viewModeText');
    
    isGridView = !isGridView;
    
    if (isGridView) {
        container.classList.remove('list-view');
        icon.textContent = '📋';
        text.textContent = 'Grid View';
    } else {
        container.classList.add('list-view');
        icon.textContent = '📊';
        text.textContent = 'List View';
    }
}

// Toggle connect
function toggleConnect(personId) {
    const person = allPeople.find(p => p.id === personId);
    
    if (!person) return;
    
    if (person.connected) {
        // Disconnect
        const confirm = window.confirm(`Disconnect from ${person.name}?`);
        if (confirm) {
            person.connected = false;
            showNotification(`Disconnected from ${person.name}`, 'info');
            loadPeople();
            updateCounts();
        }
    } else if (person.pending) {
        showNotification('Request already pending!', 'info');
    } else {
        // Send request
        person.pending = true;
        showNotification(`✅ Request sent to ${person.name}!`, 'success');
        loadPeople();
        updateCounts();
        
        // Auto-accept after 3 seconds (demo)
        setTimeout(() => {
            person.pending = false;
            person.connected = true;
            showNotification(`🎉 ${person.name} accepted your request!`, 'success');
            loadPeople();
            updateCounts();
        }, 3000);
    }
}

// Open student modal
function openStudentModal(person) {
    selectedPerson = person;
    
    const modal = document.getElementById('studentModal');
    
    // Populate modal
    document.getElementById('modalAvatarLetter').textContent = person.name.charAt(0).toUpperCase();
    document.getElementById('modalName').textContent = person.name;
    document.getElementById('modalCategory').textContent = `${person.userType} - ${person.category}`;
    document.getElementById('modalCurrentLocation').textContent = `${person.currentLocation.district}, ${person.currentLocation.state}`;
    
    // Birth location (if different)
    const birthContainer = document.getElementById('modalBirthLocationContainer');
    if (person.birthLocation && 
        (person.birthLocation.state !== person.currentLocation.state || 
         person.birthLocation.district !== person.currentLocation.district)) {
        document.getElementById('modalBirthLocation').textContent = `${person.birthLocation.district}, ${person.birthLocation.state}`;
        birthContainer.style.display = 'block';
    } else {
        birthContainer.style.display = 'none';
    }
    
    document.getElementById('modalBio').textContent = person.bio;
    document.getElementById('modalUserType').textContent = person.userType;
    document.getElementById('modalLanguage').textContent = person.language;
    document.getElementById('modalStreak').textContent = person.streak;
    document.getElementById('modalHours').textContent = person.hours;
    document.getElementById('modalRank').textContent = '#' + person.rank;
    
    // Connect button
    const connectBtn = document.getElementById('modalConnectBtn');
    if (person.connected) {
        connectBtn.textContent = '✅ Connected';
        connectBtn.className = 'btn-modal-action btn-connect connected';
    } else if (person.pending) {
        connectBtn.textContent = '⏳ Pending';
        connectBtn.className = 'btn-modal-action btn-connect pending';
    } else {
        connectBtn.textContent = '🤝 Connect';
        connectBtn.className = 'btn-modal-action btn-connect';
    }
    
    modal.classList.add('show');
}

// Close student modal
function closeStudentModal() {
    const modal = document.getElementById('studentModal');
    modal.classList.remove('show');
    selectedPerson = null;
}

// Send connect request from modal
function sendConnectRequest() {
    if (selectedPerson) {
        toggleConnect(selectedPerson.id);
        closeStudentModal();
    }
}

console.log('👥 Session 5: Find Buddies page (revised) loaded!');
console.log('📊 Sample people:', samplePeople.length);
console.log('✅ New structure with User Types, Hierarchical Categories, and Location filters');


// ==========================================
// SESSION 6: STUDY GROUPS PAGE JAVASCRIPT
// ==========================================

// Sample groups data
const sampleGroups = [
    {
        id: 1,
        name: "VDO 2026 Preparation Group",
        description: "Dedicated group for VDO exam 2026 aspirants. Daily discussions, mock tests, and study materials sharing.",
        exam: "VDO",
        subject: "All Subjects",
        type: "Public",
        admin: "Rahul Kumar",
        members: 45,
        maxMembers: 50,
        createdDate: "2026-01-15",
        joined: false
    },
    {
        id: 2,
        name: "Indian Polity Mastery",
        description: "Deep dive into Indian Constitution, Political System, and Polity. Perfect for UPSC and State PSC aspirants.",
        exam: "UPSC",
        subject: "Indian Polity",
        type: "Public",
        admin: "Priya Singh",
        members: 67,
        maxMembers: 100,
        createdDate: "2026-01-10",
        joined: false
    },
    {
        id: 3,
        name: "SSC CGL 2026 Warriors",
        description: "Collaborative preparation for SSC CGL. Daily practice questions, strategy discussions, and motivation.",
        exam: "SSC",
        subject: "All Subjects",
        type: "Private",
        admin: "Amit Verma",
        members: 89,
        maxMembers: 100,
        createdDate: "2026-01-20",
        joined: true
    },
    {
        id: 4,
        name: "Modern History Discussion",
        description: "Explore Indian freedom struggle, world wars, and modern history topics. Interactive learning sessions.",
        exam: "Other",
        subject: "History",
        type: "Public",
        admin: "Anjali Sharma",
        members: 34,
        maxMembers: 50,
        createdDate: "2026-01-25",
        joined: false
    },
    {
        id: 5,
        name: "Banking Exams Preparation 2026",
        description: "For IBPS, SBI, RBI aspirants. Quantitative aptitude, reasoning, and English practice daily.",
        exam: "Banking",
        subject: "All Subjects",
        type: "Public",
        admin: "Vikash Yadav",
        members: 78,
        maxMembers: 100,
        createdDate: "2026-02-01",
        joined: false
    },
    {
        id: 6,
        name: "Current Affairs Daily",
        description: "Stay updated with daily current affairs. News analysis, quizzes, and monthly compilations.",
        exam: "Other",
        subject: "Current Affairs",
        type: "Public",
        admin: "Neha Gupta",
        members: 120,
        maxMembers: 150,
        createdDate: "2026-01-05",
        joined: true
    }
];

// Global variables
let allGroups = [...sampleGroups];
let filteredGroups = [...sampleGroups];
let currentGroupTab = 'all';
let selectedGroup = null;

// Initialize Groups page
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('groups.html')) {
        checkAuth();
        loadGroupsPage();
        setupGroupFormListeners();
    }
});

// Load groups page
function loadGroupsPage() {
    loadUserData();
    loadGroups();
    updateGroupCounts();
}

// Load groups
function loadGroups() {
    const container = document.getElementById('groupsContainer');
    const emptyState = document.getElementById('emptyGroupState');
    
    // Get current tab groups
    let groups = [];
    
    if (currentGroupTab === 'all') {
        groups = filteredGroups;
    } else if (currentGroupTab === 'my-groups') {
        groups = filteredGroups.filter(g => g.joined);
    } else if (currentGroupTab === 'popular') {
        groups = filteredGroups.filter(g => g.members > 50);
    }
    
    // Clear container
    container.innerHTML = '';
    
    if (groups.length === 0) {
        emptyState.style.display = 'block';
        container.style.display = 'none';
        return;
    }
    
    emptyState.style.display = 'none';
    container.style.display = 'grid';
    
    // Add groups
    groups.forEach(group => {
        const card = createGroupCard(group);
        container.appendChild(card);
    });
    
    // Update result count
    document.getElementById('groupResultCount').textContent = groups.length;
}

// Create group card
function createGroupCard(group) {
    const card = document.createElement('div');
    card.className = 'group-card' + (group.joined ? ' joined' : '');
    
    const isFull = group.members >= group.maxMembers;
    
    let joinBtnText = '➕ Join Group';
    let joinBtnClass = 'btn-join-group';
    
    if (group.joined) {
        joinBtnText = '✅ Joined';
        joinBtnClass = 'btn-join-group joined';
    } else if (isFull) {
        joinBtnText = '🔒 Full';
        joinBtnClass = 'btn-join-group full';
    } else if (group.type === 'Private') {
        joinBtnText = '🔐 Request';
    }
    
    card.innerHTML = `
        <span class="group-type-badge ${group.type.toLowerCase()}">${group.type}</span>
        
        <div class="group-card-header">
            <div class="group-icon">📚</div>
            <h3 class="group-name">${group.name}</h3>
        </div>
        
        <div class="group-meta">
            <span class="group-meta-item">📝 ${group.exam}</span>
            <span class="group-meta-item">📖 ${group.subject}</span>
        </div>
        
        <p class="group-description">${group.description}</p>
        
        <div class="group-stats">
            <div class="group-stat">
                <h4>${group.members}</h4>
                <p>Members</p>
            </div>
            <div class="group-stat">
                <h4>${group.maxMembers}</h4>
                <p>Max</p>
            </div>
            <div class="group-stat">
                <h4>${Math.floor(Math.random() * 20) + 5}</h4>
                <p>Active</p>
            </div>
        </div>
        
        <div class="group-actions">
            <button class="${joinBtnClass}" onclick="event.stopPropagation(); toggleGroupJoin(${group.id})" ${isFull && !group.joined ? 'disabled' : ''}>
                ${joinBtnText}
            </button>
            <button class="btn-view-group" onclick="event.stopPropagation(); openGroupDetail(${group.id})">
                👁️ View
            </button>
        </div>
    `;
    
    return card;
}

// Apply group filters
function applyGroupFilters() {
    const examFilter = document.getElementById('filterGroupExam').value;
    const subjectFilter = document.getElementById('filterGroupSubject').value;
    const typeFilter = document.getElementById('filterGroupType').value;
    const nameFilter = document.getElementById('filterGroupName').value.toLowerCase().trim();
    
    filteredGroups = allGroups.filter(group => {
        if (examFilter && group.exam !== examFilter) return false;
        if (subjectFilter && group.subject !== subjectFilter) return false;
        if (typeFilter && group.type !== typeFilter) return false;
        if (nameFilter && !group.name.toLowerCase().includes(nameFilter)) return false;
        return true;
    });
    
    loadGroups();
    updateGroupCounts();
}

// Reset group filters
function resetGroupFilters() {
    document.getElementById('filterGroupExam').value = '';
    document.getElementById('filterGroupSubject').value = '';
    document.getElementById('filterGroupType').value = '';
    document.getElementById('filterGroupName').value = '';
    
    filteredGroups = [...allGroups];
    loadGroups();
    updateGroupCounts();
}

// Switch group tab
function switchGroupTab(tab) {
    currentGroupTab = tab;
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    loadGroups();
}

// Update group counts
function updateGroupCounts() {
    document.getElementById('allGroupsCount').textContent = filteredGroups.length;
    document.getElementById('myGroupsCount').textContent = filteredGroups.filter(g => g.joined).length;
}

// Toggle group join
function toggleGroupJoin(groupId) {
    const group = allGroups.find(g => g.id === groupId);
    if (!group) return;
    
    const isFull = group.members >= group.maxMembers;
    
    if (group.joined) {
        const confirm = window.confirm(`Leave "${group.name}"?`);
        if (confirm) {
            group.joined = false;
            group.members--;
            showNotification(`Left ${group.name}`, 'info');
            loadGroups();
            updateGroupCounts();
        }
    } else if (isFull) {
        showNotification('❌ This group is full!', 'error');
    } else {
        group.joined = true;
        group.members++;
        
        if (group.type === 'Private') {
            showNotification(`✅ Join request sent to ${group.name}!`, 'success');
        } else {
            showNotification(`✅ Joined ${group.name}!`, 'success');
        }
        
        loadGroups();
        updateGroupCounts();
    }
}

// Open group detail modal
function openGroupDetail(groupId) {
    selectedGroup = allGroups.find(g => g.id === groupId);
    if (!selectedGroup) return;
    
    const modal = document.getElementById('groupDetailModal');
    
    document.getElementById('detailGroupName').textContent = selectedGroup.name;
    document.getElementById('detailGroupExam').textContent = selectedGroup.exam;
    document.getElementById('detailGroupSubject').textContent = selectedGroup.subject;
    document.getElementById('detailGroupType').textContent = selectedGroup.type;
    document.getElementById('detailMemberCount').textContent = selectedGroup.members;
    document.getElementById('detailGroupDesc').textContent = selectedGroup.description;
    document.getElementById('detailGroupAdmin').textContent = selectedGroup.admin;
    
    const date = new Date(selectedGroup.createdDate);
    document.getElementById('detailGroupDate').textContent = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    
    const joinBtn = document.getElementById('detailJoinBtn');
    if (selectedGroup.joined) {
        joinBtn.textContent = '✅ Leave Group';
        joinBtn.classList.add('joined');
    } else {
        joinBtn.textContent = selectedGroup.type === 'Private' ? '🔐 Request to Join' : '➕ Join Group';
        joinBtn.classList.remove('joined');
    }
    
    modal.classList.add('show');
}

// Close group detail modal
function closeGroupDetailModal() {
    document.getElementById('groupDetailModal').classList.remove('show');
    selectedGroup = null;
}

// Toggle group membership from modal
function toggleGroupMembership() {
    if (selectedGroup) {
        toggleGroupJoin(selectedGroup.id);
        closeGroupDetailModal();
    }
}

// Open create group modal
function openCreateGroupModal() {
    document.getElementById('createGroupModal').classList.add('show');
}

// Close create group modal
function closeCreateGroupModal() {
    document.getElementById('createGroupModal').classList.remove('show');
    document.getElementById('createGroupForm').reset();
}

// Setup group form listeners
function setupGroupFormListeners() {
    const descTextarea = document.getElementById('newGroupDesc');
    const descCount = document.getElementById('descCount');
    
    if (descTextarea && descCount) {
        descTextarea.addEventListener('input', function() {
            const length = this.value.length;
            descCount.textContent = length + '/200 characters';
            
            if (length > 200) {
                descCount.style.color = '#ff4757';
            } else {
                descCount.style.color = '#999';
            }
        });
    }
}

// Create new group
function createNewGroup() {
    const name = document.getElementById('newGroupName').value.trim();
    const desc = document.getElementById('newGroupDesc').value.trim();
    const exam = document.getElementById('newGroupExam').value;
    const subject = document.getElementById('newGroupSubject').value;
    const type = document.getElementById('newGroupType').value;
    const maxMembers = parseInt(document.getElementById('newGroupMaxMembers').value) || 50;
    
    if (!name || !desc || !exam || !subject || !type) {
        showNotification('❌ Please fill all required fields!', 'error');
        return;
    }
    
    if (desc.length > 200) {
        showNotification('❌ Description must be under 200 characters!', 'error');
        return;
    }
    
    // Get current user
    const userStr = localStorage.getItem('examBuddyUser') || sessionStorage.getItem('examBuddyUser');
    const user = userStr ? JSON.parse(userStr) : { name: 'User' };
    
    const newGroup = {
        id: allGroups.length + 1,
        name: name,
        description: desc,
        exam: exam,
        subject: subject,
        type: type,
        admin: user.name,
        members: 1,
        maxMembers: maxMembers,
        createdDate: new Date().toISOString().split('T')[0],
        joined: true
    };
    
    allGroups.unshift(newGroup);
    filteredGroups = [...allGroups];
    
    showNotification('🎉 Group created successfully!', 'success');
    closeCreateGroupModal();
    loadGroups();
    updateGroupCounts();
}

console.log('📚 Session 6: Study Groups page loaded!');
console.log('📊 Sample groups:', sampleGroups.length);
// ==========================================
// SESSION 7: RESOURCES PAGE JAVASCRIPT
// ==========================================

// Sample resources data
const sampleResources = [
    {
        id: 1,
        title: 'Indian Polity Complete Notes',
        description: 'Comprehensive notes covering all topics of Indian Polity. Perfect for VDO and State PSC exams.',
        exam: 'VDO',
        subject: 'Indian Polity',
        type: 'PDF',
        url: '#',
        uploader: 'Rahul Kumar',
        uploadDate: '2026-02-01',
        downloads: 145,
        views: 320,
        rating: 4.8,
        reviews: 23,
        bookmarked: false,
        myUpload: false
    },
    {
        id: 2,
        title: 'Modern History Video Lectures',
        description: 'Complete video series on Indian freedom struggle and modern history. HD quality with Hindi explanation.',
        exam: 'UPSC',
        subject: 'History',
        type: 'Video',
        url: 'https://youtube.com/playlist',
        uploader: 'Priya Singh',
        uploadDate: '2026-01-28',
        downloads: 89,
        views: 245,
        rating: 4.5,
        reviews: 15,
        bookmarked: true,
        myUpload: false
    },
    {
        id: 3,
        title: 'SSC Mathematics Formula Sheet',
        description: 'All important formulas and shortcuts for SSC CGL quantitative aptitude section. Quick revision material.',
        exam: 'SSC',
        subject: 'Mathematics',
        type: 'PDF',
        url: '#',
        uploader: 'Amit Verma',
        uploadDate: '2026-02-03',
        downloads: 234,
        views: 456,
        rating: 4.9,
        reviews: 34,
        bookmarked: false,
        myUpload: true
    },
    {
        id: 4,
        title: 'Geography Mind Maps',
        description: 'Visual mind maps for Indian and world geography. Covers all important topics with diagrams.',
        exam: 'Other',
        subject: 'Geography',
        type: 'Image',
        url: '#',
        uploader: 'Anjali Sharma',
        uploadDate: '2026-01-25',
        downloads: 67,
        views: 189,
        rating: 4.3,
        reviews: 12,
        bookmarked: true,
        myUpload: false
    },
    {
        id: 5,
        title: 'Current Affairs January 2026',
        description: 'Monthly current affairs compilation with MCQs. Important for all competitive exams.',
        exam: 'Other',
        subject: 'Current Affairs',
        type: 'PDF',
        url: '#',
        uploader: 'Vikash Yadav',
        uploadDate: '2026-02-05',
        downloads: 312,
        views: 578,
        rating: 4.7,
        reviews: 45,
        bookmarked: false,
        myUpload: false
    },
    {
        id: 6,
        title: 'Banking Awareness Complete Guide',
        description: 'Banking terms, financial concepts, and RBI guidelines. Essential for banking exam aspirants.',
        exam: 'Banking',
        subject: 'Economics',
        type: 'PDF',
        url: '#',
        uploader: 'Neha Gupta',
        uploadDate: '2026-01-30',
        downloads: 178,
        views: 298,
        rating: 4.6,
        reviews: 28,
        bookmarked: false,
        myUpload: false
    }
];

// Global variables
let allResources = [...sampleResources];
let filteredResources = [...sampleResources];
let currentResourceTab = 'all';
let selectedResource = null;

// Initialize Resources page
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('resources.html')) {
        checkAuth();
        loadResourcesPage();
        setupResourceFormListeners();
    }
});

// Load resources page
function loadResourcesPage() {
    loadUserData();
    loadResources();
    updateResourceCounts();
    updateResourceStats();
}

// Load resources
function loadResources() {
    const container = document.getElementById('resourcesContainer');
    const emptyState = document.getElementById('emptyResourceState');
    
    // Get current tab resources
    let resources = [];
    
    if (currentResourceTab === 'all') {
        resources = filteredResources;
    } else if (currentResourceTab === 'my-uploads') {
        resources = filteredResources.filter(r => r.myUpload);
    } else if (currentResourceTab === 'bookmarked') {
        resources = filteredResources.filter(r => r.bookmarked);
    } else if (currentResourceTab === 'popular') {
        resources = filteredResources.filter(r => r.downloads > 100);
    }
    
    // Clear container
    container.innerHTML = '';
    
    if (resources.length === 0) {
        emptyState.style.display = 'block';
        container.style.display = 'none';
        return;
    }
    
    emptyState.style.display = 'none';
    container.style.display = 'grid';
    
    // Add resources
    resources.forEach(resource => {
        const card = createResourceCard(resource);
        container.appendChild(card);
    });
    
    // Update result count
    document.getElementById('resourceResultCount').textContent = resources.length;
}

// Create resource card
function createResourceCard(resource) {
    const card = document.createElement('div');
    card.className = 'resource-card';
    card.onclick = () => openResourceDetail(resource);
    
    // Type icon
    const typeIcons = {
        'PDF': '📄',
        'Video': '🎥',
        'Link': '🔗',
        'Image': '🖼️'
    };
    
    // Rating stars
    const fullStars = Math.floor(resource.rating);
    const stars = '⭐'.repeat(fullStars);
    
    // Upload date
    const uploadDate = new Date(resource.uploadDate);
    const daysAgo = Math.floor((new Date() - uploadDate) / (1000 * 60 * 60 * 24));
    const dateText = daysAgo === 0 ? 'Today' : daysAgo === 1 ? 'Yesterday' : `${daysAgo} days ago`;
    
    card.innerHTML = `
        <div class="resource-card-header">
            <div class="resource-type-icon">
                ${typeIcons[resource.type]}
            </div>
            <div class="resource-header-info">
                <h3>${resource.title}</h3>
                <div class="resource-meta-inline">
                    <span>${resource.exam}</span>
                    <span>•</span>
                    <span>${resource.subject}</span>
                </div>
            </div>
        </div>
        
        <div class="resource-card-body">
            <p class="resource-description">${resource.description}</p>
            
            <div class="resource-rating-inline">
                <span class="stars">${stars}</span>
                <span class="rating-value">${resource.rating}</span>
                <span class="rating-count">(${resource.reviews})</span>
            </div>
            
            <div class="resource-card-stats">
                <div class="resource-stat-inline">
                    <strong>${resource.downloads}</strong>
                    <span>Downloads</span>
                </div>
                <div class="resource-stat-inline">
                    <strong>${resource.views}</strong>
                    <span>Views</span>
                </div>
                <div class="resource-stat-inline">
                    <strong>${dateText}</strong>
                    <span>Uploaded</span>
                </div>
            </div>
            
            <div class="resource-card-footer">
                <button class="btn-bookmark-small ${resource.bookmarked ? 'bookmarked' : ''}" onclick="event.stopPropagation(); toggleBookmark(${resource.id})">
                    ${resource.bookmarked ? '🔖 Saved' : '🔖 Save'}
                </button>
                <button class="btn-download-small" onclick="event.stopPropagation(); downloadResource()">
                    ⬇️ Download
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Apply resource filters
function applyResourceFilters() {
    const examFilter = document.getElementById('filterResourceExam').value;
    const subjectFilter = document.getElementById('filterResourceSubject').value;
    const typeFilter = document.getElementById('filterResourceType').value;
    const searchFilter = document.getElementById('filterResourceSearch').value.toLowerCase().trim();
    
    filteredResources = allResources.filter(resource => {
        if (examFilter && resource.exam !== examFilter) return false;
        if (subjectFilter && resource.subject !== subjectFilter) return false;
        if (typeFilter && resource.type !== typeFilter) return false;
        if (searchFilter && !resource.title.toLowerCase().includes(searchFilter) && 
            !resource.description.toLowerCase().includes(searchFilter)) return false;
        return true;
    });
    
    loadResources();
    updateResourceCounts();
}

// Reset resource filters
function resetResourceFilters() {
    document.getElementById('filterResourceExam').value = '';
    document.getElementById('filterResourceSubject').value = '';
    document.getElementById('filterResourceType').value = '';
    document.getElementById('filterResourceSearch').value = '';
    
    filteredResources = [...allResources];
    loadResources();
    updateResourceCounts();
}

// Switch resource tab
function switchResourceTab(tab) {
    currentResourceTab = tab;
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    loadResources();
}

// Update resource counts
function updateResourceCounts() {
    document.getElementById('allResourcesCount').textContent = filteredResources.length;
    document.getElementById('myUploadsCount').textContent = filteredResources.filter(r => r.myUpload).length;
    document.getElementById('bookmarkedResourcesCount').textContent = filteredResources.filter(r => r.bookmarked).length;
}

// Update resource stats
function updateResourceStats() {
    const totalResources = allResources.length;
    const totalDownloads = allResources.reduce((sum, r) => sum + r.downloads, 0);
    const avgRating = (allResources.reduce((sum, r) => sum + r.rating, 0) / allResources.length).toFixed(1);
    const bookmarkedCount = allResources.filter(r => r.bookmarked).length;
    
    document.getElementById('totalResources').textContent = totalResources;
    document.getElementById('totalDownloads').textContent = totalDownloads;
    document.getElementById('avgRating').textContent = avgRating;
    document.getElementById('bookmarkedCount').textContent = bookmarkedCount;
}

// Toggle bookmark
function toggleBookmark(resourceId) {
    const resource = allResources.find(r => r.id === resourceId);
    if (!resource) return;
    
    resource.bookmarked = !resource.bookmarked;
    
    if (resource.bookmarked) {
        showNotification('🔖 Resource bookmarked!', 'success');
    } else {
        showNotification('Bookmark removed', 'info');
    }
    
    loadResources();
    updateResourceCounts();
    updateResourceStats();
}

// Open resource detail modal
function openResourceDetail(resource) {
    selectedResource = resource;
    
    const modal = document.getElementById('resourceDetailModal');
    
    // Type icon
    const typeIcons = {
        'PDF': '📄',
        'Video': '🎥',
        'Link': '🔗',
        'Image': '🖼️'
    };
    
    // Rating stars
    const fullStars = Math.floor(resource.rating);
    const stars = '⭐'.repeat(fullStars);
    
    // Upload date
    const uploadDate = new Date(resource.uploadDate);
    const daysAgo = Math.floor((new Date() - uploadDate) / (1000 * 60 * 60 * 24));
    const dateText = daysAgo === 0 ? 'Today' : daysAgo === 1 ? 'Yesterday' : `${daysAgo} days ago`;
    
    document.getElementById('detailResourceIcon').textContent = typeIcons[resource.type];
    document.getElementById('detailResourceTitle').textContent = resource.title;
    document.getElementById('detailResourceExam').textContent = resource.exam;
    document.getElementById('detailResourceSubject').textContent = resource.subject;
    document.getElementById('detailResourceType').textContent = resource.type;
    document.getElementById('detailResourceStars').textContent = stars;
    document.getElementById('detailResourceRating').textContent = resource.rating;
    document.getElementById('detailResourceReviews').textContent = resource.reviews;
    document.getElementById('detailResourceDesc').textContent = resource.description;
    document.getElementById('detailResourceUploader').textContent = resource.uploader;
    document.getElementById('detailResourceDownloads').textContent = resource.downloads;
    document.getElementById('detailResourceViews').textContent = resource.views;
    document.getElementById('detailResourceDate').textContent = dateText;
    
    // Bookmark button
    const bookmarkBtn = document.getElementById('detailBookmarkBtn');
    if (resource.bookmarked) {
        bookmarkBtn.textContent = '✅ Bookmarked';
        bookmarkBtn.classList.add('bookmarked');
    } else {
        bookmarkBtn.textContent = '🔖 Bookmark';
        bookmarkBtn.classList.remove('bookmarked');
    }
    
    modal.classList.add('show');
}

// Close resource detail modal
function closeResourceDetailModal() {
    document.getElementById('resourceDetailModal').classList.remove('show');
    selectedResource = null;
}

// Toggle resource bookmark from modal
function toggleResourceBookmark() {
    if (selectedResource) {
        toggleBookmark(selectedResource.id);
        
        // Update modal button
        const bookmarkBtn = document.getElementById('detailBookmarkBtn');
        if (selectedResource.bookmarked) {
            bookmarkBtn.textContent = '✅ Bookmarked';
            bookmarkBtn.classList.add('bookmarked');
        } else {
            bookmarkBtn.textContent = '🔖 Bookmark';
            bookmarkBtn.classList.remove('bookmarked');
        }
    }
}

// Download resource
function downloadResource() {
    if (selectedResource) {
        selectedResource.downloads++;
        showNotification('⬇️ Download started!', 'success');
        updateResourceStats();
        closeResourceDetailModal();
        loadResources();
    }
}

// Open upload modal
function openUploadModal() {
    document.getElementById('uploadModal').classList.add('show');
}

// Close upload modal
function closeUploadModal() {
    document.getElementById('uploadModal').classList.remove('show');
    document.getElementById('uploadResourceForm').reset();
    document.getElementById('urlField').style.display = 'none';
    document.getElementById('fileField').style.display = 'none';
}

// Toggle upload fields based on type
function toggleUploadFields() {
    const type = document.getElementById('resourceType').value;
    const urlField = document.getElementById('urlField');
    const fileField = document.getElementById('fileField');
    
    if (type === 'Video' || type === 'Link') {
        urlField.style.display = 'block';
        fileField.style.display = 'none';
        document.getElementById('resourceUrl').required = true;
        document.getElementById('resourceFile').required = false;
    } else if (type === 'PDF' || type === 'Image') {
        urlField.style.display = 'none';
        fileField.style.display = 'block';
        document.getElementById('resourceUrl').required = false;
        document.getElementById('resourceFile').required = true;
    } else {
        urlField.style.display = 'none';
        fileField.style.display = 'none';
        document.getElementById('resourceUrl').required = false;
        document.getElementById('resourceFile').required = false;
    }
}

// Setup resource form listeners
function setupResourceFormListeners() {
    const descTextarea = document.getElementById('resourceDesc');
    const descCount = document.getElementById('resourceDescCount');
    
    if (descTextarea && descCount) {
        descTextarea.addEventListener('input', function() {
            const length = this.value.length;
            descCount.textContent = length + '/300 characters';
            
            if (length > 300) {
                descCount.style.color = '#ff4757';
            } else {
                descCount.style.color = '#999';
            }
        });
    }
}

// Upload resource
function uploadResource() {
    const title = document.getElementById('resourceTitle').value.trim();
    const desc = document.getElementById('resourceDesc').value.trim();
    const exam = document.getElementById('resourceExam').value;
    const subject = document.getElementById('resourceSubject').value;
    const type = document.getElementById('resourceType').value;
    
    if (!title || !desc || !exam || !subject || !type) {
        showNotification('❌ Please fill all required fields!', 'error');
        return;
    }
    
    if (desc.length > 300) {
        showNotification('❌ Description must be under 300 characters!', 'error');
        return;
    }
    
    // Get current user
    const userStr = localStorage.getItem('examBuddyUser') || sessionStorage.getItem('examBuddyUser');
    const user = userStr ? JSON.parse(userStr) : { name: 'User' };
    
    const newResource = {
        id: allResources.length + 1,
        title: title,
        description: desc,
        exam: exam,
        subject: subject,
        type: type,
        url: '#',
        uploader: user.name,
        uploadDate: new Date().toISOString().split('T')[0],
        downloads: 0,
        views: 0,
        rating: 0,
        reviews: 0,
        bookmarked: false,
        myUpload: true
    };
    
    allResources.unshift(newResource);
    filteredResources = [...allResources];
    
    showNotification('🎉 Resource uploaded successfully!', 'success');
    closeUploadModal();
    loadResources();
    updateResourceCounts();
    updateResourceStats();
}

console.log('📖 Session 7: Resources page loaded!');
console.log('📊 Sample resources:', sampleResources.length);