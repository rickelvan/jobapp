// script.js

// 1) Only auto-redirect if we are on the "sign-in.html" page
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('sign-in.html')) {
      const isLoggedIn = localStorage.getItem('loggedIn');
      const userRole = localStorage.getItem('userRole');
  
      if (isLoggedIn && userRole) {
        // User was kept signed in, redirect them to their appropriate dashboard
        switch (userRole) {
          case 'employee':
            window.location.href = 'dashboard.html';
            break;
          case 'employer':
            window.location.href = 'employer-dashboard.html';
            break;
          case 'admin':
            window.location.href = 'admin-dashboard.html';
            break;
        }
      }
    }
  });
  
  // 2) Fake user database (for demo). In a real app, call your backend API here.
  const fakeUserDB = [
    { email: "test@example.com",     password: "password123", name: "John Doe",  role: "employee" },
    { email: "jane@company.com",     password: "securePass",  name: "Jane Smith",role: "employer" },
    { email: "admin@admin.com",      password: "adminPass",   name: "Admin User",role: "admin" }
  ];
  
  // 3) Dark Mode Toggler (no changes)
  function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
  }
  
  // 4) Login function with role-based redirection and "keep me signed in"
  function login(event) {
    event.preventDefault();
  
    const emailInput    = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const roleSelect    = document.getElementById('roleSelect');
    const keepSignedIn  = document.getElementById('keepSignedIn');
    const errorMsg      = document.getElementById('error-msg');
  
    const email         = emailInput.value;
    const password      = passwordInput.value;
    const selectedRole  = roleSelect.value;
  
    // 4a) Check credentials in "fakeUserDB"
    const user = fakeUserDB.find(u => u.email === email && u.password === password);
  
    if (!user) {
      errorMsg.textContent = "Invalid email or password. Try again.";
      return;
    }
  
    // 4b) Check if user's role matches selected role
    if (user.role !== selectedRole) {
      errorMsg.textContent = `User role mismatch. You selected ${selectedRole}, but this account is ${user.role}.`;
      return;
    }
  
    // 4c) If "Keep Me Signed In" is checked, use localStorage; otherwise sessionStorage
    const storage = keepSignedIn.checked ? localStorage : sessionStorage;
  
    // 4d) Store some user info or token
    storage.setItem('loggedIn', 'true');
    storage.setItem('userEmail', user.email);
    storage.setItem('userName', user.name);
    storage.setItem('userRole', user.role);
  
    // 4e) Redirect based on role
    switch (user.role) {
      case 'employee':
        window.location.href = 'dashboard.html';  // Could rename to 'employee-dashboard.html'
        break;
      case 'employer':
        window.location.href = 'employer-dashboard.html';
        break;
      case 'admin':
        window.location.href = 'admin-dashboard.html';
        break;
      default:
        errorMsg.textContent = "Role not recognized.";
    }
  }
  
  // 5) Logout function clears both localStorage & sessionStorage, then goes home
  function logout() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = 'index.html'; // or 'sign-in.html' if you prefer
  }
  