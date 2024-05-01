import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; 
import Header from './Header';

function Home() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/services')
    .then(response => response.text())  // get the response body as text
    .then(text => {
      console.log(text);  // log the text
      return JSON.parse(text);  // parse the text as JSON
    })
    .then(data => setServices(data))
    .catch(error => console.error('Error:', error));
  }, []);

  return (
    <>
    <Header />
    <div className="home">
      <h1>The Mustard Archives</h1>
      <div className="services">
      {services.map(service => (
        <div key={service.name} className="service-box">
          <Link to={`/services/${service.name}`}>
            <h2>{service.name}</h2>
          </Link>
          <p>{service.descr}</p>
          <p>{service.minrate} - {service.maxrate}</p>
        </div>
      ))}
      </div>
    </div>
    </>
  );
}
export default Home;