import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ServiceDetails.css'; 
import Header from './Header';

function ServiceDetails() {
  const [consultants, setConsultants] = useState([]);
  const [filteredConsultants, setFilteredConsultants] = useState([]);
  const [city, setCity] = useState('');
  const [rate, setRate] = useState('');
  const [cities, setCities] = useState([]);
  const { serviceName } = useParams();
  const navigate = useNavigate();

  const selectConsultant = (consultant) => {
    navigate(`/consultant-details/${consultant.id}`);
  };

  useEffect(() => {
    fetch('http://localhost:3001/api/consultants')
    .then(response => response.json())
    .then(data => {
      const consultantsForService = data.filter(consultant => consultant.service === serviceName);
      setConsultants(consultantsForService);
      setFilteredConsultants(consultantsForService);

      const uniqueCities = [...new Set(consultantsForService.map(consultant => consultant.city))];
      setCities(uniqueCities);
    });
  }, [serviceName]);

  useEffect(() => {
    let filtered = consultants;
    if (city) {
      filtered = filtered.filter(consultant => consultant.city === city);
    }
    if (rate) {
      filtered = filtered.filter(consultant => consultant.rate <= rate);
    }
    setFilteredConsultants(filtered);
  }, [city, rate, consultants]);

  const minRate = Math.min(...consultants.map(consultant => consultant.rate));
  const maxRate = Math.max(...consultants.map(consultant => consultant.rate));

  return (
    <>
    <Header />
    <div className="service-details">
      <h1>{serviceName}</h1>
      <select value={city} onChange={e => setCity(e.target.value)}>
        <option value="">All Cities</option>
        {cities.map(city => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
      <p>Rate: {rate}</p>
      <input type="range" min={minRate} max={maxRate} value={rate} onChange={e => setRate(e.target.value)} />
      <div className="consultants">
      {filteredConsultants.map(consultant => (
        <div className="consultant" key={consultant.id} onClick={() => selectConsultant(consultant)}>
          <h2>{consultant.name}</h2>
          <p>{consultant.email}</p>
          <p>{consultant.phone}</p>
          <p>{consultant.city}</p>
          <p>{consultant.rate}</p>
        </div>
      ))}
      </div>
    </div>
    </>
  );
}

export default ServiceDetails;