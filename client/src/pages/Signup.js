import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';



const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const { username, email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        console.log('signup successful');
        localStorage.setItem('userSignedIn', 'true');
        navigate('/');
      } else {
        console.error('Signup failed');
      }
    } catch (error) {
      console.log("Error: --", error);
    }
  };

  return (
    <div className='big__container'>
      <section>
        <Header />
      </section>
      <section>

        <div className="container">
          <h2 className="heading">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="formGroup">
              <label htmlFor="username" className="label">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            <div className="formGroup">
              <label htmlFor="email" className="label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            <div className="formGroup">
              <label htmlFor="password" className="label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            <button type="submit" className="button">
              Sign Up
            </button>
            <p className="signin-link">
              Already a user? <Link to="/signin">Sign In</Link>
            </p>
          </form>
        </div>
      </section>
      <section>
        <Footer />
      </section>
    </div>
  );
};

export default SignUp;
