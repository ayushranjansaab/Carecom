// // Handle registration
// const registerForm = document.getElementById('registerForm');
// if (registerForm) {
//   registerForm.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const role = document.getElementById('role').value;
//     const name = document.getElementById('name').value;
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     try {
//       const res = await fetch('http://localhost:5000/api/auth/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, email, password,role })
//       });

//       const data = await res.json();
//       alert('Registered! Now login.');
//       window.location.href = 'login.html';
//     } catch (err) {
//       alert('Registration failed');
//     }
//   });
// }

// // Handle login
// const loginForm = document.getElementById('loginForm');
// if (loginForm) {
//   loginForm.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     try {
//       const res = await fetch('http://localhost:5000/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password })
//       });

//       const data = await res.json();
//       if (data.token) {
//         localStorage.setItem('token', data.token);
//         localStorage.setItem('role', data.user.role); // store role
      
//         alert('Login successful!');
      
//         if (data.user.role === 'admin') {
//           window.location.href = 'doctor-dashboard.html';
//         } else {
//           window.location.href = 'dashboard.html';
//         }
//       }
//        else {
//         alert('Invalid credentials');
//       }
//     } catch (err) {
//       alert('Login failed');
//     }
//   });
// }

// Handle registration (assumes registration form still uses #registerForm)
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const role = document.getElementById('role').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role })
      });

      const data = await res.json();
      alert('Registered! Now login.');
      window.location.href = 'login.html';
    } catch (err) {
      alert('Registration failed');
    }
  });
}

// Handle login
const loginForm = document.querySelector('form.container'); // new form selector
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-pass').value;

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.user.role); // store role

        alert('Login successful!');

        if (data.user.role === 'admin') {
          window.location.href = 'doctor-dashboard.html';
        } else {
          window.location.href = 'dashboard.html';
        }
      } else {
        alert('Invalid credentials');
      }
    } catch (err) {
      alert('Login failed');
    }
  });
}
