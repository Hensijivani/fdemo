// import React, { useState } from 'react';
// import axios from 'axios';
// import './LoginPopup.css';
// import { assets } from '../../img/assets';

// function LoginPopup({ setShowLogin }) {
//   const [currState, setCurrState] = useState('Sign Up');
//   const [formData, setFormData] = useState({ name: '', email: '', password: '' });
//   const [errorMessage, setErrorMessage] = useState('');
//   const [loading, setLoading] = useState(false); 

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage('');
//     setLoading(true); // Set loading to true

//     try {
//       if (currState === 'Sign Up') {
//         await axios.post('http://localhost:3000/user/signup', {
//           name: formData.name,
//           email: formData.email,
//           password: formData.password,
//         });
//         alert('Signup successful!');
//         setCurrState('Login');
//       } else {
//         const response = await axios.post('http://localhost:3000/user/login', {
//           email: formData.email,
//           password: formData.password,
//         });
//         alert('Login successful!');
//         console.log('Token:', response.data.token);
//         setShowLogin(false);
//       }
//     } catch (error) {
//       setErrorMessage(error.response?.data?.Message || 'Something went wrong.');
//     } finally {
//       setLoading(false); //loading
//     }
//   };
                    
//   return (
//     <div className='login-popup'>
//       <form onSubmit={handleSubmit} className='login-popup-container'>
//         <div className="login-popup-title">
//           <h2>{currState}</h2>
//           <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
//         </div>
//         <div className="login-popup-inputs">
//           {currState === 'Login' ? null : (
//             <input
//               type="text"
//               name="name"
//               placeholder="Your Name"
//               value={formData.name}
//               onChange={handleInputChange}
//               required
//             />
//           )}
//           <input
//             type="email"
//             name="email"
//             placeholder="Your Email"
//             value={formData.email}
//             onChange={handleInputChange}
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Your Password"
//             value={formData.password}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         <button type="submit" disabled={loading}>
//           {loading ? 'Submitting...' : currState === 'Sign Up' ? 'Create Account' : 'Login'}
//         </button>
//         {errorMessage && <p className="error-message">{errorMessage}</p>}
//         <div className="login-popup-condition">
//           <input type="checkbox" required />
//           <p>By continuing, I agree to the terms of use & privacy policy.</p>
//         </div>
//         {currState === 'Login' ? (
//           <p>
//             Create a new account? <span onClick={() => setCurrState('Sign Up')}>Click Here</span>
//           </p>
//         ) : (
//           <p>
//             Already have an account? <span onClick={() => setCurrState('Login')}>Login Here</span>
//           </p>
//         )}
//       </form>
//     </div>
//   );
// }

// export default LoginPopup;

import React, { useState } from 'react';
import axios from 'axios';
import './LoginPopup.css';
import { assets } from '../../img/assets';
import { useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';

function LoginPopup({ setShowLogin }) {
  const [currState, setCurrState] = useState('Sign Up');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { setUser } = useContext(StoreContext); // Access the context's setUser function

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      if (currState === 'Sign Up') {
        await axios.post('http://localhost:3000/user/signup', {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        alert('Signup successful!');
        setCurrState('Login');
      } else {
        const response = await axios.post('http://localhost:3000/user/login', {
          email: formData.email,
          password: formData.password,
        });
        alert('Login successful!');
        console.log('Token:', response.data.token);

        // Set user information after successful login
        setUser({
          email: formData.email,
          token: response.data.token,
        });
        setShowLogin(false);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.Message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login-popup'>
      <form onSubmit={handleSubmit} className='login-popup-container'>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
        </div>
        <div className="login-popup-inputs">
          {currState === 'Login' ? null : (
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Your Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : currState === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState === 'Login' ? (
          <p>
            Create a new account? <span onClick={() => setCurrState('Sign Up')}>Click Here</span>
          </p>
        ) : (
          <p>
            Already have an account? <span onClick={() => setCurrState('Login')}>Login Here</span>
          </p>
        )}
      </form>
    </div>
  );
}

export default LoginPopup;
