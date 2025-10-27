import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function IndexPage() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  const heroStyle = {
    height: '400px',
    backgroundImage: 'url("https://via.placeholder.com/1200x400?text=Doe+o+que+n%C3%A3o+usa+mais")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    textAlign: 'center',
    padding: '2rem',
    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '1.5rem',
    padding: '2rem 0',
  };

  return (
    <div>
      <Navbar />
      
      <header style={heroStyle}>
        <h1 style={{ fontSize: '3rem', margin: '0' }}>Está na hora do desapego.</h1>
        <p style={{ fontSize: '1.25rem', margin: '1rem 0' }}>Doe seus itens...</p>
        <button className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}>Doar</button>
      </header>

      
            <Footer />
  
      
        </div>

  );
}

export default IndexPage;