// Simple user storage for authentication
let users = JSON.parse(localStorage.getItem('campusConnectUsers')) || {};
let currentUser = localStorage.getItem('campusConnectCurrentUser');

// Initialize user state on page load
window.addEventListener('load', function() {
  if (currentUser && users[currentUser]) {
    updateNavForLoggedInUser(users[currentUser].name);
  }
});

// Sample data for search functionality
const sampleItems = [
  { id: 1, title: "Lab Coat", category: "drafting", price: "₹400", description: "Lab Coat, good condition", image: "public/image/lab_coat.webp" },
  { id: 2, title: "Notebook Pack (5)", category: "stationery", price: "₹200", description: "College-ruled notebooks", image: "public/image/note_books.jpg" },
  { id: 3, title: "Drafter (A4)", category: "drafting", price: "₹600", description: "Sturdy A4-sized drafter", image: "public/image/drafter.jfif" },
  { id: 4, title: "Scientific Calculator", category: "electronics", price: "₹1,200", description: "Casio fx-series (used)", image: "public/image/calci.jpg" },
  { id: 5, title: "Engineering Mathematics", category: "books", price: "₹350", description: "Latest edition, minimal highlighting", image: "public/image/eng_maths_books.webp" },
  { id: 6, title: "Geometry Box Set", category: "stationery", price: "₹150", description: "Complete set with compass, protractor", image: "public/image/geo_box.webp" },
  { id: 7, title: "T-Square (60cm)", category: "drafting", price: "₹300", description: "Professional grade T-square", image: "public/image/square_scale.jpg" },
  { id: 8, title: "Laptop Charger", category: "electronics", price: "₹800", description: "Universal laptop charger", image: "public/image/lp_charger.jpg" }
];

// Toggle mobile menu
function toggleMenu() {
  const navLinks = document.getElementById('nav-links');
  navLinks.classList.toggle('active');
}

// Smooth scroll to section
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// Search functionality
function searchItems() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const resultsContainer = document.getElementById('searchResults');
  
  if (!searchTerm.trim()) {
    resultsContainer.innerHTML = '<p class="no-results">Please enter a search term</p>';
    return;
  }
  
  const filteredItems = sampleItems.filter(item => 
    item.title.toLowerCase().includes(searchTerm) || 
    item.category.toLowerCase().includes(searchTerm) ||
    item.description.toLowerCase().includes(searchTerm)
  );
  
  displaySearchResults(filteredItems);
}

// Search by category (for footer links)
function searchCategory(category) {
  const filteredItems = sampleItems.filter(item => item.category === category);
  displaySearchResults(filteredItems);
  scrollToSection('browse');
  document.getElementById('searchInput').value = category;
}

// Display search results
function displaySearchResults(items) {
  const resultsContainer = document.getElementById('searchResults');
  
  if (items.length === 0) {
    resultsContainer.innerHTML = '<p class="no-results">No items found matching your search.</p>';
    return;
  }
  
  const resultsHTML = items.map(item => `
    <div class="card">
      <div class="card-image">
        <img src="${item.image}" alt="${item.title}">
        <div class="card-badge">Available</div>
      </div>
      <div class="card-content">
        <h3>${item.title}</h3>
        <p class="card-description">${item.description}</p>
        <div class="card-footer">
          <p class="price">${item.price}</p>
          <button class="btn btn-primary btn-small">Message Seller</button>
        </div>
      </div>
    </div>
  `).join('');
  
  resultsContainer.innerHTML = resultsHTML;
}

// Post item functionality
function postItem() {
  alert('Post Item feature coming soon! Please sign up to get notified when this feature is available.');
}

// Modal functions
function showLogin() {
  document.getElementById('loginModal').style.display = 'block';
}

function showSignup() {
  document.getElementById('signupModal').style.display = 'block';
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

function switchToSignup() {
  closeModal('loginModal');
  showSignup();
}

function switchToLogin() {
  closeModal('signupModal');
  showLogin();
}

// Form submissions
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }
  
  // Validate password (6 digits)
  if (!/^[0-9]{6}$/.test(password)) {
    alert('Password must be exactly 6 digits.');
    return;
  }
  
  if (!username.trim()) {
    alert('Please enter a username.');
    return;
  }
  
  // Check if user exists
  if (users[email]) {
    // Check password
    if (users[email].password === password && users[email].username === username) {
      alert(`Welcome back, ${users[email].name}! Login successful.`);
      currentUser = email;
      localStorage.setItem('campusConnectCurrentUser', currentUser);
      updateNavForLoggedInUser(users[email].name);
      closeModal('loginModal');
      // Clear form
      document.getElementById('loginForm').reset();
    } else if (users[email].password !== password) {
      alert('Incorrect password. Please try again.');
    } else {
      alert('Incorrect username. Please try again.');
    }
  } else {
    alert('Account not found. Please sign up first.');
    closeModal('loginModal');
    showSignup();
  }
});

document.getElementById('signupForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('signupName').value;
  const username = document.getElementById('signupUsername').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const college = document.getElementById('signupCollege').value;
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }
  
  // Validate password (6 digits)
  if (!/^[0-9]{6}$/.test(password)) {
    alert('Password must be exactly 6 digits.');
    return;
  }
  
  if (!name.trim() || !username.trim() || !college.trim()) {
    alert('Please fill in all fields.');
    return;
  }
  
  // Check if user already exists
  if (users[email]) {
    alert('Account already exists with this email. Please login instead.');
    closeModal('signupModal');
    showLogin();
    return;
  }
  
  // Check if username already exists
  const existingUser = Object.values(users).find(user => user.username === username);
  if (existingUser) {
    alert('Username already taken. Please choose a different username.');
    return;
  }
  
  // Create new user
  if (name && username && email && password && college) {
    users[email] = {
      name: name,
      username: username,
      email: email,
      password: password,
      college: college
    };
    
    // Save to localStorage
    localStorage.setItem('campusConnectUsers', JSON.stringify(users));
    currentUser = email;
    localStorage.setItem('campusConnectCurrentUser', currentUser);
    
    alert(`Welcome to Campus Connect, ${name}! Your account has been created successfully.`);
    closeModal('signupModal');
    updateNavForLoggedInUser(name);
    // Clear form
    document.getElementById('signupForm').reset();
  }
});

// Function to update navigation for logged in user
function updateNavForLoggedInUser(name) {
  document.getElementById('nav-auth').innerHTML = `
    <span class="nav-link">Welcome, ${name}!</span>
    <a href="#" class="nav-link" onclick="logout()">Logout</a>
  `;
}

// Logout function
function logout() {
  currentUser = null;
  localStorage.removeItem('campusConnectCurrentUser');
  document.getElementById('nav-auth').innerHTML = `
    <a href="#" class="nav-link" onclick="showLogin()">Login</a>
    <a href="#" class="nav-link signup-btn" onclick="showSignup()">Sign Up</a>
  `;
  alert('You have been logged out successfully!');
}

// Info pages (placeholder functionality)
function showInfo(page) {
  const messages = {
    'about': 'Campus Connect is a student marketplace designed to help students buy and sell essential items like books, stationery, and electronics.',
    'how-it-works': 'Simply browse items, contact sellers directly, and arrange safe meetups on campus to complete transactions.',
    'safety': 'Always meet in public places, verify items before purchase, and trust your instincts when dealing with other users.',
    'help': 'Need help? Contact our support team at help@campusconnect.com or check our FAQ section.',
    'contact': 'Reach us at: Email: contact@campusconnect.com | Phone: +91-XXXX-XXXX-XX',
    'privacy': 'We protect your privacy and never share your personal information with third parties without consent.',
    'terms': 'By using Campus Connect, you agree to our terms of service. Users must be students and follow community guidelines.'
  };
  
  alert(messages[page] || 'Information coming soon!');
}

// Close modal when clicking outside
window.onclick = function(event) {
  const loginModal = document.getElementById('loginModal');
  const signupModal = document.getElementById('signupModal');
  
  if (event.target === loginModal) {
    loginModal.style.display = 'none';
  }
  if (event.target === signupModal) {
    signupModal.style.display = 'none';
  }
}

// Search on Enter key
document.getElementById('searchInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    searchItems();
  }
});