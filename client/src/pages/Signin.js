import React, { useState } from 'react';
import './Signin.css';
import { Link, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Header from '../components/Header';
import Footer from '../components/Footer';

function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await handleSignIn(formData);

    if (success) {
      navigate('/');
    }
  };

  return (
    <div className='big__container'>
      <section>

        <Header />
      </section>
      <section>

        <div className='container'>
          <h2 className='heading'>Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className='formGroup'>
              <label htmlFor="email" className='label'>Email:</label>
              <input
                className='input'
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className='formGroup'>
              <label htmlFor="password" className='label'>Password:</label>
              <input
                className='input'
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button className='button' type="submit">Sign In</button>
          </form>
          <p>
            New user? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </section>
      <section>

        <Footer />
      </section>
    </div>
  );
}

async function handleSignIn(formData) {

  try {
    const response = await fetch('http://localhost:5000/api/signin', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      // console.log('Sign-in successful');
      localStorage.setItem('userSignedIn', 'true');
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error signing in:', error);
    return false;
  }
}


export default SignIn;
