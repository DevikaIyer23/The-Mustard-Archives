// mustard-archive/frontend/src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('client'); // default user type
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Determine the correct API endpoint based on the user type
    const apiEndpoint = userType === 'client' ? '/api/clients' : '/api/consultants';
  
    // Fetch the user data from the respective table
    const usersResponse = await fetch(`http://localhost:3001${apiEndpoint}`);
    const users = await usersResponse.json();
  
    // Find the user with the matching username
    const user = users.find(user => user.username === username);
    console.log(user)
  
    // If the user exists and the password matches, navigate to the respective page
    if (user && user.password === password) {
      navigate(`/client-profile/${user.id}`);
      console.log(user.id)
    } else {
      // Handle authentication failure
      console.error('Authentication failed');
    }
  };

  return (
    <div className='login container'>
    <div className='login item'>
      <form onSubmit={handleSubmit} className='login'>
        Username:<input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" /><br/>
        Password:<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" /><br/><br/>
        <button type="submit">Login</button><br/>
      </form>
      </div>  
    </div>
    
  );
}

export default Login;