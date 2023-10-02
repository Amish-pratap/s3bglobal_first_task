import React, { useState } from 'react';
import './Home.css'
import img3 from '../assets/jessy-smith-zFOm6KzA-7g-unsplash.jpg'
import Header from '../components/Header';
import Footer from '../components/Footer';



function Home() {

  return (
    <div className='home__container'>
      <section>
        <Header />
      </section>
      <section>
        <div className="body">
          <img src={img3} alt="Resizable Image" className="resizable-image" />
        </div>
      </section>
      <section>
        <Footer />
      </section>
    </div>
  );
}

export default Home;

