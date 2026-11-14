/**
 * Experiment 09: User Authentication & JWT Inspector Client
 * Student: Dev Kumar Tiwari (GitHub: @http-d3v | Vercel: @httpd3v)
 * 2nd Year B.Tech CSE (Data Science)
 */

document.addEventListener('DOMContentLoaded', () => {
  const tabLogin = document.getElementById('tabLogin');
  const tabRegister = document.getElementById('tabRegister');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const authTabs = document.getElementById('authTabs');
  const alertBox = document.getElementById('alertBox');
  const fillDemoBtn = document.getElementById('fillDemoBtn');

  // Dashboard elements
  const dashboardView = document.getElementById('dashboardView');
  const dashAvatar = document.getElementById('dashAvatar');
  const dashName = document.getElementById('dashName');
  const dashEmail = document.getElementById('dashEmail');
  const dashRole = document.getElementById('dashRole');
  const logoutBtn = document.getElementById('logoutBtn');
  const testProfileBtn = document.getElementById('testProfileBtn');
  const testResourceBtn = document.getElementById('testResourceBtn');

  // Inspector elements
  const tokenStatusBadge = document.getElementById('tokenStatusBadge');
  const tokenDisplay = document.getElementById('tokenDisplay');
  const claimsDisplay = document.getElementById('claimsDisplay');
  const apiResponse = document.getElementById('apiResponse');

  const TOKEN_KEY = 'btech_cse_auth_jwt_exp09';

  // Tab switching
  tabLogin.addEventListener('click', () => {
    tabLogin.classList.add('active');
    tabRegister.classList.remove('active');
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
    clearAlert();
  });

  tabRegister.addEventListener('click', () => {
    tabRegister.classList.add('active');
    tabLogin.classList.remove('active');
    registerForm.style.display = 'block';
    loginForm.style.display = 'none';
    clearAlert();
  });

  function showAlert(msg, isSuccess = false) {
    alertBox.textContent = msg;
    alertBox.className = `alert-box ${isSuccess ? 'alert-success' : 'alert-error'}`;
    alertBox.style.display = 'block';
  }

  function clearAlert() {
    alertBox.style.display = 'none';
    alertBox.textContent = '';
  }

  // Pre-fill demo
  fillDemoBtn.addEventListener('click', () => {
    document.getElementById('loginEmail').value = 'dev.cse.ds@college.edu';
    document.getElementById('loginPassword').value = 'Password123';
    showAlert('Demo credentials filled. Click "Sign In" to authenticate.', true);
  });

  // Decode JWT payload without library
  function parseJwt(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  }

  function updateAuthState(token, user) {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      tokenStatusBadge.textContent = 'Authenticated (JWT Active)';
      tokenStatusBadge.className = 'token-badge authenticated';
      tokenDisplay.textContent = token;

      const claims = parseJwt(token);
      claimsDisplay.textContent = JSON.stringify(claims, null, 2);

      // Show Dashboard
      loginForm.style.display = 'none';
      registerForm.style.display = 'none';
      authTabs.style.display = 'none';
      dashboardView.style.display = 'block';

      if (user) {
        dashName.textContent = user.name;
        dashEmail.textContent = user.email;
        dashRole.textContent = user.role || '2nd Year B.Tech CSE (Data Science)';
        dashAvatar.textContent = user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
      }
    } else {
      localStorage.removeItem(TOKEN_KEY);
      tokenStatusBadge.textContent = 'No Token';
      tokenStatusBadge.className = 'token-badge unauthenticated';
      tokenDisplay.textContent = '// Authenticate to view your signed JWT payload.';
      claimsDisplay.textContent = '{}';

      dashboardView.style.display = 'none';
      authTabs.style.display = 'flex';
      loginForm.style.display = 'block';
    }
  }

  // Login handler
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearAlert();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      apiResponse.textContent = JSON.stringify(data, null, 2);

      if (res.ok && data.success) {
        showAlert('Authentication successful! JWT token issued.', true);
        updateAuthState(data.token, data.user);
      } else {
        showAlert(data.message || 'Login failed. Please verify your credentials.');
      }
    } catch (err) {
      // Local demo fallback if backend offline
      apiResponse.textContent = JSON.stringify({ error: err.message }, null, 2);
      showAlert('Network error communicating with auth server: ' + err.message);
    }
  });

  // Register handler
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearAlert();
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const role = document.getElementById('regRole').value.trim();
    const password = document.getElementById('regPassword').value;

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role })
      });

      const data = await res.json();
      apiResponse.textContent = JSON.stringify(data, null, 2);

      if (res.ok && data.success) {
        showAlert('Registration successful! Logged in with fresh token.', true);
        updateAuthState(data.token, data.user);
      } else {
        showAlert(data.message || 'Registration failed.');
      }
    } catch (err) {
      apiResponse.textContent = JSON.stringify({ error: err.message }, null, 2);
      showAlert('Network error: ' + err.message);
    }
  });

  // Test Profile (Protected)
  testProfileBtn.addEventListener('click', async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    try {
      const res = await fetch('/api/auth/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      apiResponse.textContent = JSON.stringify(data, null, 2);
      showAlert(`GET /api/auth/profile returned Status: ${res.status}`, res.ok);
    } catch (err) {
      apiResponse.textContent = JSON.stringify({ error: err.message }, null, 2);
    }
  });

  // Test Resource (Protected)
  testResourceBtn.addEventListener('click', async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    try {
      const res = await fetch('/api/auth/protected-resource', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      apiResponse.textContent = JSON.stringify(data, null, 2);
      showAlert(`GET /api/auth/protected-resource returned Status: ${res.status}`, res.ok);
    } catch (err) {
      apiResponse.textContent = JSON.stringify({ error: err.message }, null, 2);
    }
  });

  // Logout handler
  logoutBtn.addEventListener('click', () => {
    updateAuthState(null);
    showAlert('You have been signed out. Local JWT token removed.', true);
    apiResponse.textContent = JSON.stringify({ success: true, message: 'Session terminated.' }, null, 2);
  });

  // Check existing token on load
  const existingToken = localStorage.getItem(TOKEN_KEY);
  if (existingToken) {
    const claims = parseJwt(existingToken);
    if (claims && claims.exp * 1000 > Date.now()) {
      updateAuthState(existingToken, {
        name: claims.name || 'Student User',
        email: claims.email || '',
        role: claims.role || '2nd Year B.Tech CSE (Data Science)'
      });
    } else {
      updateAuthState(null);
    }
  }
});
