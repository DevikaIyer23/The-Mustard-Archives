import React, { useState, useEffect, setResponse } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ConsultantDetails.css'; 
import Header from './Header';

function ConsultantDetails() {
  const [consultant, setConsultant] = useState({});
  const [username, setUsername] = useState('');
  const [projectId, setprojectId] = useState(0);
  const [projectName, setprojectName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [hours, setHours] = useState(0);
  const { consultantId } = useParams();
  const navigate = useNavigate();
  const [isRequestingProject, setIsRequestingProject] = useState(false);

  const requestProjects = () => {
    setIsRequestingProject(true);
  };

  useEffect(() => {
    fetch(`http://localhost:3001/api/consultants/${consultantId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setConsultant(data))
      .catch(error => console.log('Error:', error));
  }, [consultantId]);

  const requestProject = () => {
    // First fetch the client's ID
    fetch(`http://localhost:3001/api/clients/username/${username}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(client => {
        fetch('http://localhost:3001/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: projectId,
            name: projectName,
            client_id: client.id,
            consultant_id: consultantId,
            s_date: startDate,
            e_date: endDate,
            status: 'processing',
            tot_cost: hours * consultant.rate,
          }),
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          navigate('/projects');
          setResponse(data);
        })
        .catch(error => console.log('Error:', error));
      });
  };

  return (
    <>
    <Header />
    <div className="consultant-details">
      <div className="consultant-details-backdrop">
        <h2>{consultant.name}</h2>
        <p>{consultant.email}</p>
        <p>{consultant.phone}</p>
        <p>{consultant.city}</p>
        <p>{consultant.rate}</p>
      </div>
      {!isRequestingProject && <button className="page-box" onClick={requestProjects}>Request Project</button>}
      {isRequestingProject && (
        <div className="page-box">
          <p>Username:</p>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Your username" />
          <p>Project Id:</p>
          <input type="number" value={projectId} onChange={e => setprojectId(e.target.value)} placeholder="Project id" />
          <p>Project Name:</p>
          <input type="text" value={projectName} onChange={e => setprojectName(e.target.value)} placeholder="Project Name" />
          <p>Start Date:</p>
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} placeholder="Start date" />
          <p>End Date:</p>
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} placeholder="End date" />
          <p>Hours:</p>
          <input type="number" value={hours} onChange={e => setHours(e.target.value)} placeholder="Hours" min={0}/>
          <p></p>
          <button className="page-box" onClick={requestProject}>Request Project</button>
        </div>
      )}
    </div>
    </>
  );
}

export default ConsultantDetails;