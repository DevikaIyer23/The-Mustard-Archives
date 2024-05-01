import React, { useEffect, useState } from 'react';

function Service() {
  const [services, setService] = useState([]);

  useEffect(() => {
    fetch('/api/services')
    .then(response => response.json())
    .then(data => setService(data));
  }, []);

  return (
    <div>
      <h1>service List</h1>
      {services.map(service => (
        <div key={service.name}>
          <h2>{service.name}</h2>
          <p>{service.description}</p>
          <p>{service.minrate}</p>
          <p>{service.maxrate}</p>
        </div>
      ))}
    </div>
  );
}

export default Service;