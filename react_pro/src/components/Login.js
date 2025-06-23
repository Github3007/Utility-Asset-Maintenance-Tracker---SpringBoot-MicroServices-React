// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';

// // const Login = () => {
// //   const [username, setUserName] = useState('');
// //   const [password, setPassword] = useState('');
// //   const navigate = useNavigate();

// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const res = await axios.post('http://localhost:8090/api/auth/authenticate', { username, password });
// //       alert('Login successful');
// //       // Optionally store token: localStorage.setItem('token', res.data.token);
// //       navigate('/');
// //     } catch (err) {
// //       alert('Login failed');
// //     }
// //   };
// //   const credentials = {
// //     username,
// //     password
// //   };

// //   const loginUser = async (credentials) => {
// //     try {
// //       const response = await axios.post("http://localhost:8090/api/auth/authenticate", credentials);
// //       const token = response.data.token;
// //       console.log(credentials);
// //       // Store token in localStorage or sessionStorage
// //       localStorage.setItem("jwtToken", token);
  
// //       console.log("Login successful, token stored:", token);
// //     } catch (error) {
// //       console.error("Login failed:", error.response.data);
// //     }
// //   };



// //   return (
// //     <div className="container mt-5">
// //       <h2>Login</h2>
// //       <form onSubmit={loginUser}>
// //         <div className="mb-3">
// //           <label>Email</label>
// //           <input type="email" className="form-control" value={username} onChange={(e) => setUserName(e.target.value)} required />
// //         </div>
// //         <div className="mb-3">
// //           <label>Password</label>
// //           <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
// //         </div>
// //         <button type="submit" className="btn btn-primary">Login</button>
// //         <p className="mt-3">
// //           New user? <span className="text-primary" style={{ cursor: 'pointer' }} onClick={() => navigate('/register')}>Register a User</span>
// //         </p>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Login;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Login = () => {
//   const [username, setUserName] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   // Function to handle login API call
//   const loginUser = async (credentials) => {
//     try {
//       const response = await axios.post("http://localhost:8086/api/auth/authenticate", credentials, {
//         headers: { "Content-Type": "application/json" }
//       });

//       const token = response.data.token;
//       console.log("Login successful:", credentials);

//       if (token) {
//         localStorage.setItem("jwtToken", token);
//         console.log("Token stored:", token);
//         alert("Login successful");
//         navigate('/');
//       } else {
//         alert("Authentication failed: No token received");
//       }

//     } catch (error) {
//       console.error("Login failed:", error.response ? error.response.data : error.message);
//       alert(`Login failed: ${error.response ? error.response.data.message : "Unknown error"}`);
//     }
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const credentials = { email:username, password };
//     loginUser(credentials);
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label>Email</label>
//           <input
//             type="email"
//             className="form-control"
//             value={username}
//             onChange={(e) => setUserName(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label>Password</label>
//           <input
//             type="password"
//             className="form-control"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">Login</button>
//         <p className="mt-3">
//           New user?{" "}
//           <span className="text-primary" style={{ cursor: 'pointer' }} onClick={() => navigate('/register')}>
//             Register a User
//           </span>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;




// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';

// const Login = () => {
//   const [username, setUserName] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const isLoggedIn = !!localStorage.getItem('jwtToken');

//   const handleLogout = () => {
//     localStorage.removeItem('jwtToken');
//     alert('Logged out successfully');
//     navigate('/login');
//   };

//   // Function to handle login API call
//   const loginUser = async (credentials) => {
//     try {
//       const response = await axios.post("http://localhost:8090/api/auth/authenticate", credentials);
//       const token = response.data.token;
//       console.log(token);
//       console.log("Login successful:", credentials);

//       if (token) {
//         localStorage.setItem("jwtToken", token);
//         console.log("Token stored:", token);
//         alert("Login successful");
//         navigate('/');
//       } else {
//         alert("Authentication failed: No token received");
//       }

//     } catch (error) {
//       console.error("Login failed:", error.response ? error.response.data : error.message);
//       alert(`Login failed: ${error.response ? error.response.data.message : "Unknown error"}`);
//     }
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const credentials = { username, password };
//     console.log(credentials);
//     loginUser(credentials);
//   };

//   return (
//     <>
//       {/* Navbar */}
//       <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow sticky-top">
//         <div className="container-fluid">
//           <Link className="navbar-brand fw-bold text-uppercase" to="/">Home</Link>

//           <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
//             aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//             <span className="navbar-toggler-icon"></span>
//           </button>

//           <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
//             <ul className="navbar-nav d-flex flex-row gap-4">
//               <li className="nav-item"><Link className="nav-link text-white" to="/assets">Assets</Link></li>
//               <li className="nav-item"><Link className="nav-link text-white" to="/maintenance">Maintenance</Link></li>
//               <li className="nav-item"><Link className="nav-link text-white" to="/workorder">Work Order</Link></li>
//               <li className="nav-item"><Link className="nav-link text-white" to="/technicians">Technicians</Link></li>
//               <li className="nav-item"><Link className="nav-link text-white" to="/assign">Assign</Link></li>
//               <li className="nav-item"><Link className="nav-link text-white" to="/assignments">Assignments</Link></li>
//               <li className="nav-item"><Link className="nav-link text-white" to="/report">Report</Link></li>
//             </ul>
//           </div>

//           <div className="d-flex">
//             {isLoggedIn ? (
//               <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
//             ) : (
//               <Link to="/login">
//                 <button className="btn btn-warning">Login</button>
//               </Link>
//             )}
//           </div>
//         </div>
//       </nav>

//       {/* Login Form */}
//       <div className="container mt-5">
//         <h2>Login</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label>Email</label>
//             <input
//               name='username'
//               type="email"
//               className="form-control"
//               value={username}
//               onChange={(e) => setUserName(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label>Password</label>
//             <input
//               type="password"
//               className="form-control"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit" className="btn btn-primary">Login</button>
//           <p className="mt-3">
//             New user?{" "}
//             <span className="text-primary" style={{ cursor: 'pointer' }} onClick={() => navigate('/register')}>
//               Register a User
//             </span>
//           </p>
//         </form>
//       </div>
//     </>
//   );
// };

// export default Login;




// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginUser = async (credentials) => {
    try {
      const response = await axios.post("http://localhost:8090/api/auth/authenticate", credentials);
      const token = response.data.token;

      if (token) {
        localStorage.setItem("jwtToken", token);
        alert("Login successful");
        navigate('/');
      } else {
        alert("Authentication failed: No token received");
      }
    } catch (error) {
      alert(`Login failed: ${error.response ? error.response.data.message : "Unknown error"}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser({ username, password });
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input
            name='username'
            type="email"
            className="form-control"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        <p className="mt-3">
          New user?{" "}
          <span className="text-primary" style={{ cursor: 'pointer' }} onClick={() => navigate('/register')}>
            Register a User
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
