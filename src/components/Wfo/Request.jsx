import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Wfo.css'
import { Button, Modal } from 'react-bootstrap';


function RequestsPage() {
  const [requests, setRequests] = useState([]);
  const [status,setStatus] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [notification,setNotification]=useState('');


 const handlePopupClose = () => {
    setShowPopup(false);
    setNotification('');
    window.location.reload();
    
  };


  useEffect(() => {
    getRequests();
  }, []);

  const getRequests = () => {
    const parentId = localStorage.getItem('empId');
    let token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios
      .get(`http://localhost:8080/api/getrequests/${parentId}`)
      .then(response => {
        setRequests(response.data);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  };


  const handleAgree = requestId => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    axios
      .put(`http://localhost:8080/api/update-status/${requestId}`, {
        status: 'AGREED'
      })
      .then(response => {
        setStatus(response.data.status);
        setNotification('You Have Agreed To The request')
        setShowPopup(true)
        // window.location.reload();

      })
      .catch(error => {
        console.log('Error:', error);
      });
  };


  const handleDisAgree = requestId => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    axios
      .put(`http://localhost:8080/api/update-status/${requestId}`, {
        status: 'DISAGREED'
      })
      .then(response => {
        setStatus(response.data.status);
        setShowPopup(true);
        setNotification('You Have Disagreed With The Request')


      })
      .catch(error => {
        console.log('Error:', error);
      });
  };
  
  

 
  return (
    <div>

      <h2>Requests Page</h2>
      <div className='table-container'>
      {requests.length === 0 ? (
        <h1 className='no-request'>No requests are found</h1>
      ) : (
      <table className='table table-bordered table-hover table-striped'>
        <thead className='tablehead1'>
          <tr>
            {/* <th>Request ID</th> */}
            <th>RequestId</th>
            <th>Employee ID</th>
            <th>Employee Name</th>
            <th>Actual Date</th>
            <th>Changed Date</th>
            <th>Reason</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className>
          {requests.map(request => (
            <tr key={request.requestId}>
              <td>{request.requestId}</td>
              <td>{request.empId}</td>
              <td>{request.empName}</td>
              <td>{request.actualDate}</td>
              <td>{request.changedDate}</td>
              <td>{request.reason}</td>
              <td>
            <button onClick={() => handleAgree(request.requestId)} className='btn btn-success'>
               Agree
            </button>
            <button onClick={()=>handleDisAgree(request.requestId)} className='btn btn-danger' >
                Disagree
            </button>
            
            <Modal show={showPopup} onHide={handlePopupClose}>
        <Modal.Header closeButton>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
      {notification}
      </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlePopupClose} >
              Close          
            </Button>
        </Modal.Footer>
      </Modal>
            
        </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
      </div>
      
    </div>
      
  );
}

export default RequestsPage;
