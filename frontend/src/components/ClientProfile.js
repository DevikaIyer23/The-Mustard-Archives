import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ClientProfile.css';
function ClientProfile() {
  const [selectedSection, setSelectedSection] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    home: '',
    city: ''
  });

  const { clientId } = useParams();

  const fetchClientData = async () => {
    console.log('Fetching client data for id:', clientId); // Log the id
    const response = await fetch(`http://localhost:3001/api/clients/${clientId}`);
    console.log('Server response:', response); // Log the entire response object
    if (!response.ok) {
      console.error('Server response was not ok');
      return;
    }
    const text = await response.text();
    if (!text) {
      console.error('Server response was empty');
      return;
    }
    try {
      const data = JSON.parse(text);
      setProfileData(data);
    } catch (error) {
      console.error('Failed to parse server response:', error);
    }
  };

  useEffect(() => {
    fetchClientData();
  }, [clientId]);

  const [projects, setProjects] = useState([]);
  const [consultants, setConsultants] = useState([]);

  const fetchProjectData = async () => {
    console.log('Fetching project data for client id:', clientId);
    const response = await fetch(`http://localhost:3001/api/projects/clients/${clientId}`);
    console.log('Server response:', response);
    if (!response.ok) {
      console.error('Server response was not ok');
      return;
    }
    const text = await response.text();
    if (!text) {
      console.error('Server response was empty');
      return;
    }
    try {
      const data = JSON.parse(text);
      if (Array.isArray(data)) {
        setProjects(data);
      } else if (typeof data === 'object' && data !== null) {
        setProjects([data]);
      } else {
        console.error('Unexpected server response:', data);
      }
    } catch (error) {
      console.error('Failed to parse server response:', error);
    }
  };

  useEffect(() => {
    fetchProjectData();
  }, [clientId]);

  useEffect(() => {
    fetch('http://localhost:3001/api/consultants')
    .then(response => {
      console.log(response);
      return response;
    })
    .then(response => response.json())
    .then(data => setConsultants(data));
  }, []);

  const [payments, setPayments] = useState([]);

  const fetchPaymentData = async () => {
    console.log('Fetching payment data for client id:', clientId);
    const response = await fetch(`http://localhost:3001/api/payments/clients/${clientId}`);
    console.log('Server response:', response);
    if (!response.ok) {
      console.error('Server response was not ok');
      return;
    }
    const text = await response.text();
    if (!text) {
      console.error('Server response was empty');
      return;
    }
    try {
      const data = JSON.parse(text);
      if (Array.isArray(data)) {
        setPayments(data);
      } else if (typeof data === 'object' && data !== null) {
        setPayments([data]);
      } else {
        console.error('Unexpected server response:', data);
      }
    } catch (error) {
      console.error('Failed to parse server response:', error);
    }
  };

  useEffect(() => {
    fetchPaymentData();
  }, [clientId]);

  return (
    <>
    <h1>Client Profile</h1>
    <div className="container">
      <div className="form" style={{ display: 'flex' }}>
        <div className="sidebar">
          <h2 onClick={() => setSelectedSection('profile')}>Profile Info</h2>
          <h2 onClick={() => setSelectedSection('status')}>Project Status</h2>
          <h2 onClick={() => setSelectedSection('payments')}>Payments</h2>
        </div>
        <div className="content">
          {selectedSection === 'profile' && (
            <div>
              <p>Name: {profileData.name}</p>
              <p>Email: {profileData.email}</p>
              <p>Phone: {profileData.phone}</p>
              <p>Home: {profileData.home}</p>
              <p>City: {profileData.city}</p>
            </div>
          )}
          {selectedSection === 'status' && (
            <div>
              {projects.map((project, index) => {
                const consultant = consultants.find(c => c.id === project.consultant_id);
                console.log('Consultant:')
                return (
                  <div key={index}>
                    <h2>{project.name}</h2>
                    {consultant && <p>Consultant: {consultant.name}</p>}
                    <p>Start Date: {new Date(project.s_date).toLocaleDateString()}</p>
                    <p>End Date: {new Date(project.e_date).toLocaleDateString()}</p>
                    <p>Status: {project.status}</p>
                    <p>Total Cost: {project.tot_cost}</p>
                  </div>
                );
              })}
            </div>
          )}
          {selectedSection === 'payments' && (
            <div>
              {payments.map((payment, index) => (
                <div key={index}>
                  <p>Date: {payment.date}</p>
                  <p>Amount: {payment.amount}</p>
                  <p>Method: {payment.method}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  </>
  );
}

export default ClientProfile;