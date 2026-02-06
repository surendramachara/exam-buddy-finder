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

// Sample students data (dummy - Google Sheets mein baad mein migrate karenge)
const sampleStudents = [
    {
        id: 1,
        name: 'Rahul Kumar',
        exam: 'VDO',
        city: 'Lucknow',
        language: 'Both',
        studyTime: 'Morning',
        bio: 'Preparing for VDO 2026. Looking for serious study partners from Lucknow.',
        streak: 12,
        hours: 45,
        rank: 23,
        connected: false,
        pending: false
    },
    {
        id: 2,
        name: 'Priya Singh',
        exam: 'VDO',
        city: 'Kanpur',
        language: 'Hindi',
        studyTime: 'Evening',
        bio: 'Final year BA student. VDO exam in 6 months. Need study buddies!',
        streak: 8,
        hours: 32,
        rank: 45,
        connected: false,
        pending: false
    },
    {
        id: 3,
        name: 'Amit Verma',
        exam: 'SSC',
        city: 'Lucknow',
        language: 'English',
        studyTime: 'Night',
        bio: 'SSC CGL aspirant. Strong in Math and Reasoning.',
        streak: 20,
        hours: 67,
        rank: 12,
        connected: false,
        pending: false
    },
    {
        id: 4,
        name: 'Anjali Sharma',
        exam: 'VDO',
        city: 'Varanasi',
        language: 'Both',
        studyTime: 'Morning',
        bio: 'Dedicated VDO aspirant. Love group study sessions.',
        streak: 15,
        hours: 52,
        rank: 18,
        connected: false,
        pending: false
    },
    {
        id: 5,
        name: 'Vikash Yadav',
        exam: 'UPSC',
        city: 'Prayagraj',
        language: 'Both',
        studyTime: 'Flexible',
        bio: 'UPSC CSE 2026 aspirant. Looking for optional subject discussion partners.',
        streak: 25,
        hours: 89,
        rank: 8,
        connected: false,
        pending: false
    },
    {
        id: 6,
        name: 'Neha Gupta',
        exam: 'VDO',
        city: 'Lucknow',
        language: 'Hindi',
        studyTime: 'Afternoon',
        bio: 'Working professional preparing for VDO. Evening study group needed.',
        streak: 6,
        hours: 28,
        rank: 56,
        connected: false,
        pending: false
    }
];

// Global variables
let allStudents = [...sampleStudents];
let filteredStudents = [...sampleStudents];
let currentTab = 'all';
let isGridView = true;
let selectedStudent = null;

// Initialize Find Buddies page
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('find-buddies.html')) {
        checkAuth();
        loadBuddiesPage();
    }
});

// Load buddies page
function loadBuddiesPage() {
    // Load user data for navbar
    loadUserData();
    
    // Load students
    loadStudents();
    
    // Update counts
    updateCounts();
}

// Load students
function loadStudents() {
    const container = document.getElementById('studentsContainer');
    const emptyState = document.getElementById('emptyState');
    
    // Get current tab students
    let students = [];
    
    if (currentTab === 'all') {
        students = filteredStudents;
    } else if (currentTab === 'connected') {
        students = filteredStudents.filter(s => s.connected);
    } else if (currentTab === 'pending') {
        students = filteredStudents.filter(s => s.pending);
    }
    
    // Clear container
    container.innerHTML = '';
    
    if (students.length === 0) {
        emptyState.style.display = 'block';
        container.style.display = 'none';
        return;
    }
    
    emptyState.style.display = 'none';
    container.style.display = 'grid';
    
    // Add students
    students.forEach(student => {
        const card = createStudentCard(student);
        container.appendChild(card);
    });
    
    // Update result count
    document.getElementById('resultCount').textContent = students.length;
}

// Create student card
function createStudentCard(student) {
    const card = document.createElement('div');
    card.className = 'student-card';
    card.onclick = () => openStudentModal(student);
    
    // Connection status button
    let connectBtnText = '🤝 Connect';
    let connectBtnClass = 'btn-connect';
    
    if (student.connected) {
        connectBtnText = '✅ Connected';
        connectBtnClass = 'btn-connect connected';
    } else if (student.pending) {
        connectBtnText = '⏳ Pending';
        connectBtnClass = 'btn-connect pending';
    }
    
    card.innerHTML = `
        <div class="student-card-header">
            <div class="student-avatar">
                ${student.name.charAt(0).toUpperCase()}
            </div>
            <div class="student-info">
                <h3>${student.name}</h3>
                <p class="student-exam">${student.exam} Aspirant</p>
                <p class="student-location">📍 ${student.city}</p>
            </div>
        </div>
        
        <p class="student-bio">${student.bio}</p>
        
        <div class="student-tags">
            <span class="tag">🗣️ ${student.language}</span>
            <span class="tag">⏰ ${student.studyTime}</span>
        </div>
        
        <div class="student-stats">
            <div class="student-stat">
                <h4>${student.streak}</h4>
                <p>Streak</p>
            </div>
            <div class="student-stat">
                <h4>${student.hours}</h4>
                <p>Hours</p>
            </div>
            <div class="student-stat">
                <h4>#${student.rank}</h4>
                <p>Rank</p>
            </div>
        </div>
        
        <div class="student-actions">
            <button class="${connectBtnClass}" onclick="event.stopPropagation(); toggleConnect(${student.id})">
                ${connectBtnText}
            </button>
        </div>
    `;
    
    return card;
}

// Apply filters
function applyFilters() {
    const examFilter = document.getElementById('filterExam').value;
    const cityFilter = document.getElementById('filterCity').value.toLowerCase().trim();
    const languageFilter = document.getElementById('filterLanguage').value;
    const studyTimeFilter = document.getElementById('filterStudyTime').value;
    const nameFilter = document.getElementById('filterName').value.toLowerCase().trim();
    
    filteredStudents = allStudents.filter(student => {
        // Exam filter
        if (examFilter && student.exam !== examFilter) return false;
        
        // City filter
        if (cityFilter && !student.city.toLowerCase().includes(cityFilter)) return false;
        
        // Language filter
        if (languageFilter && student.language !== languageFilter) return false;
        
        // Study time filter
        if (studyTimeFilter && student.studyTime !== studyTimeFilter) return false;
        
        // Name filter
        if (nameFilter && !student.name.toLowerCase().includes(nameFilter)) return false;
        
        return true;
    });
    
    loadStudents();
    updateCounts();
}

// Reset filters
function resetFilters() {
    document.getElementById('filterExam').value = '';
    document.getElementById('filterCity').value = '';
    document.getElementById('filterLanguage').value = '';
    document.getElementById('filterStudyTime').value = '';
    document.getElementById('filterName').value = '';
    
    filteredStudents = [...allStudents];
    loadStudents();
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
    
    loadStudents();
}

// Update counts
function updateCounts() {
    document.getElementById('allCount').textContent = filteredStudents.length;
    document.getElementById('connectedCount').textContent = filteredStudents.filter(s => s.connected).length;
    document.getElementById('pendingCount').textContent = filteredStudents.filter(s => s.pending).length;
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
function toggleConnect(studentId) {
    const student = allStudents.find(s => s.id === studentId);
    
    if (!student) return;
    
    if (student.connected) {
        // Disconnect
        const confirm = window.confirm(`Disconnect from ${student.name}?`);
        if (confirm) {
            student.connected = false;
            showNotification(`Disconnected from ${student.name}`, 'info');
            loadStudents();
            updateCounts();
        }
    } else if (student.pending) {
        showNotification('Request already pending!', 'info');
    } else {
        // Send request
        student.pending = true;
        showNotification(`✅ Request sent to ${student.name}!`, 'success');
        loadStudents();
        updateCounts();
        
        // Auto-accept after 3 seconds (demo)
        setTimeout(() => {
            student.pending = false;
            student.connected = true;
            showNotification(`🎉 ${student.name} accepted your request!`, 'success');
            loadStudents();
            updateCounts();
        }, 3000);
    }
}

// Open student modal
function openStudentModal(student) {
    selectedStudent = student;
    
    const modal = document.getElementById('studentModal');
    
    // Populate modal
    document.getElementById('modalAvatarLetter').textContent = student.name.charAt(0).toUpperCase();
    document.getElementById('modalName').textContent = student.name;
    document.getElementById('modalExam').textContent = student.exam + ' Aspirant';
    document.getElementById('modalCity').textContent = student.city;
    document.getElementById('modalBio').textContent = student.bio;
    document.getElementById('modalLanguage').textContent = student.language;
    document.getElementById('modalStudyTime').textContent = student.studyTime;
    document.getElementById('modalGoal').textContent = 'Not set';
    document.getElementById('modalStreak').textContent = student.streak;
    document.getElementById('modalHours').textContent = student.hours;
    document.getElementById('modalRank').textContent = '#' + student.rank;
    
    // Connect button
    const connectBtn = document.getElementById('modalConnectBtn');
    if (student.connected) {
        connectBtn.textContent = '✅ Connected';
        connectBtn.className = 'btn-modal-action btn-connect connected';
    } else if (student.pending) {
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
    selectedStudent = null;
}

// Send connect request from modal
function sendConnectRequest() {
    if (selectedStudent) {
        toggleConnect(selectedStudent.id);
        closeStudentModal();
    }
}

console.log('👥 Session 5: Find Buddies page loaded!');
console.log('📊 Sample students:', sampleStudents.length);

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