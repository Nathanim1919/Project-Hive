import React from 'react'
import Header from '../components/header/header'
import '../styles/homepage.css'

export default function HomePage() {
  return (
    <div>
      <Header />
      <section className="hero">
        <div className="hero-content">
          <h1>
            Streamline Your Project <span>Management</span> Process
          </h1>
        </div>

        <div className="hero-ill">
          <img src="images/hero.jpg" alt="" />
        </div>
      </section>
    </div>
  );
}
