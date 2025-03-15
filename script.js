// script.js

// 1) Only auto-redirect if we are on sign-in.html (unchanged)
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('sign-in.html')) {
    const isLoggedIn = localStorage.getItem('loggedIn');
    const userRole = localStorage.getItem('userRole');

    if (isLoggedIn && userRole) {
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

// 2) Fake user database (updated)
let fakeUserDB = [
  { email: "test@example.com", password: "password123", name: "John Doe",  role: "employee" },
  { email: "jane@company.com", password: "securePass",  name: "Jane Smith",role: "employer" },
  { email: "admin@admin.com",  password: "adminPass",   name: "Admin User",role: "admin" }
];

// 3) Toggle Dark Mode
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

// 4) LOGIN (unchanged)
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

  // Check user in fake DB
  const user = fakeUserDB.find(u => u.email === email && u.password === password);

  if (!user) {
    errorMsg.textContent = "Invalid email or password. Try again.";
    return;
  }
  if (user.role !== selectedRole) {
    errorMsg.textContent = `Mismatch. You selected ${selectedRole}, but this account is for ${user.role}.`;
    return;
  }

  const storage = keepSignedIn.checked ? localStorage : sessionStorage;
  storage.setItem('loggedIn', 'true');
  storage.setItem('userEmail', user.email);
  storage.setItem('userName', user.name);
  storage.setItem('userRole', user.role);

  switch (user.role) {
    case 'employee':
      window.location.href = 'dashboard.html';
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

// 5) LOGOUT (unchanged)
function logout() {
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = 'index.html';
}

// 6) REGISTER (new)
function registerUser(event) {
  event.preventDefault();

  const name       = document.getElementById('reg-name').value;
  const email      = document.getElementById('reg-email').value;
  const password   = document.getElementById('reg-password').value;
  const confirm    = document.getElementById('reg-confirm-password').value;
  const role       = document.getElementById('reg-role').value;
  const regError   = document.getElementById('reg-error-msg');

  // Check password match
  if (password !== confirm) {
    regError.textContent = "Passwords do not match.";
    return;
  }

  // Check if user already exists
  const existingUser = fakeUserDB.find(u => u.email === email);
  if (existingUser) {
    regError.textContent = "User with this email already exists. Try logging in or use password recovery.";
    return;
  }

  // Insert new user into fake DB
  fakeUserDB.push({
    email: email,
    password: password,
    name: name,
    role: role
  });

  // Success => either auto-login or redirect to sign-in
  alert("Registration successful! Please sign in.");
  window.location.href = "sign-in.html";
}

// 7) RECOVER PASSWORD (new)
function recoverPassword(event) {
  event.preventDefault();
  const emailInput = document.getElementById('recover-email');
  const recoverMsg = document.getElementById('recover-msg');

  const email = emailInput.value;

  // Check if user exists in the DB
  const user = fakeUserDB.find(u => u.email === email);
  if (!user) {
    recoverMsg.textContent = "No account found with this email.";
    return;
  }

  // In a real app, you’d send an email with reset instructions.
  // For now, let's pretend we "sent an email."
  alert("A password recovery link has been sent to " + email + ". Please check your inbox.");
  // Optionally redirect somewhere
  window.location.href = "sign-in.html";
}
