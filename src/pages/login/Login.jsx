import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    axios.post('http://localhost:8080/auth/signin', { email, password })
      .then(res => {
        const token = res.data.token;
         const empId = res.data.empId;

        localStorage.setItem('token', token); // store token in local storage
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // set the default authorization header for all axios requests
        localStorage.setItem('empId',empId);
        // navigate('/employee/:empId', { state: { empId: empId } });
            // navigate to the dashboard page
            //  <Link to={"/employee/:empId" {state:{empId:empId}}}>
            navigate('/wfo')
      })
      
      .catch(err => setError(err.response.data.message));
  }

  return (
    <div >
      
      <form onSubmit={handleSubmit}>
        <div >
          <label htmlFor='email' > </label>
          <input type="email" placeholder='Email'  value={email} onChange={e => setEmail(e.target.value)}  />
        </div>
        <div> 
          <label htmlFor='password'   ></label>
          <input type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit" >Signin</button>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
}

export default Login;