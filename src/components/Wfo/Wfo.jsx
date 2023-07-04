import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { CalenderEntry } from '../../services/calenderService';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { format } from "date-fns";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getStatusClassName } from './getStatusClassName';
import { ArchievedEntries } from './ArchievedEntries';
import "./Wfo.css";


const CalendarComponent = () => {
  const [actualDate, setActualDate] = useState(null);
  const [changedDate, setChangedDate] = useState(null);
  const [reason, setReason] = useState('');
  const [status, setStatus] = useState('');
  const [calendarEntries, setCalendarEntries] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const[showrequests, setShowRequests] =useState([false]);
  const [requests, setRequests] = useState([]);
  const [empName,setEmpName]=useState('');
  const[managerName,setManagerName]=useState('');
  const [archivedEntries, setArchivedEntries] = useState([]);
  const [showArchived, setShowArchived] = useState(false);
  const [remainingEntries,setRemainingEntries] = useState([]);
  
  const latestEntries = calendarEntries.slice(0, 5); // Get the latest five entries
  // const remainingEntries = calendarEntries.slice(5);

  
  useEffect(() => {
    // Fetch the calendar entries on component mount
    fetchCalendarEntries();
    fectchEmpName();
    fetchMangerName();
    if (remainingEntries.length > 0) {
      setArchivedEntries(remainingEntries);
    }else{

    }

  }, [remainingEntries]);

 
  const handleDateChange = (date) => {
    setActualDate(date);
  };

  const handleDateChangec = (date) => {
    setChangedDate(date);
  };
  // const formatDateForInput = (dateString) => {
  //   const date = new Date(dateString);
  //   const day = date.getDate().toString().padStart(2, '0');
  //   const month = (date.getMonth() + 1).toString().padStart(2, '0');
  //   const year = date.getFullYear().toString();
  //   return `${year}-${month}-${day}`;
  // };

  const fetchCalendarEntries = () => {
    let token = localStorage.getItem( "token" );
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    let empId=localStorage.getItem('empId');

    axios
      .get(`http://localhost:8080/api/getentries/${empId}`)
      .then((response) => {
        setCalendarEntries(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
   
  const fectchEmpName =()=>
   {
    let token=localStorage.getItem("token");
    axios.defaults.headers.common['Authorization']=`Bearer ${token}`;
    let empId=localStorage.getItem('empId');
    axios.get(`http://localhost:8080/api/getname/${empId}`)
    .then((response)=>
    {
      setEmpName(response.data);
    })
    .catch((error) =>{
      console.error('Error:',error);
    });

   };
    const fetchMangerName =()=>{
      let token =localStorage.getItem("token");
      axios.defaults.headers.common['Authorization']=`Bearer ${token}`;
      let empId =localStorage.getItem("empId");
      axios.get(`http://localhost:8080/api/getmanagername/${empId}`)
      .then((response)=>{
        setManagerName(response.data);

      })
      .catch((error)=>{
        console.error('Error:',error);

      });
    }



  const handleSubmit = (e) =>  {
    
    e.preventDefault(); 
    // const formattedDate = formatDate(actualDate);

    // Make the POST request to save the calendar entry
    CalenderEntry(actualDate,changedDate,reason)
      .then((data) => {
        
        setShowPopup(true);
        setActualDate('');
        setChangedDate('');
        setReason('');
        console.log('Response:', data);

      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  const handlePopupClose = () => {
    setShowPopup(false);
    window.location.reload();
  };
  const handleArchivedButtonClick = () => {
    const updatedEntries = calendarEntries.slice(5);
    setRemainingEntries(updatedEntries);
    setShowArchived(!showArchived);    
  };

  return (
    <div>
     <div className="col-6 text-right">
      <Link to="/requests" className="link-style">
        Show Requests
      </Link>
      
    </div>
    

      <div className='nametext'>
       {empName && (
    <p>
      Hi   <span style={{ fontWeight: 'bold',fontFamily:'serif',fontSize:'25px' }}>{empName}</span>, please inform <span style={{fontFamily:'cursive',fontWeight:'bold'}}>{managerName} </span>about the change in your work from home dates.
    </p>
         )}
        </div>

    <div className='form-container'>
    <h1 className='form-heading'>Update Work-from-Home Dates</h1>


      <form onSubmit={handleSubmit}>
        <div className="form-group">
        <label htmlFor="actualDateInput">Actual-Date:</label>
      <DatePicker
        id="actualDateInput"
        className="form-control"
        selected={actualDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy" // Set the desired display format
        placeholderText='DD/MM/YYYY'
      />
        </div>

      

        <div className="form-group">
          <label htmlFor="changedDateInput">Changed Date:</label>
          <DatePicker
            id="changedDateInput"
            className="form-control"
            selected={changedDate}
            onChange={handleDateChangec}
            dateFormat="dd/MM/yyyy"
            placeholderText='DD/MM/YYYY'
          />
        </div>
       
        <div className="form-group">
          <label htmlFor="reasonTextarea">Reason:</label>
          <textarea
            className="form-control"
            id="reasonTextarea"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            style={{ height: '100px' }} // Adjust the height as needed
          />
        </div>

        <button  type="submit" className="btn btn-primary">Send</button>
        <Modal show={showPopup} onHide={handlePopupClose}>
        <Modal.Header closeButton>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your request has been submitted successfully.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlePopupClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      </form>
    </div>

    <div className='table-container'>
      <table className='table table-bordered table-hover custom-table '>
        <thead className='tablehead'>
          <tr>
          {/* <th>Employee ID</th> */}
           <th > Actual Date</th>
            <th>Changed Date</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {latestEntries.map((entry, index) => (
            <tr key={index}>
              {/* <td>{entry.empId}</td> */}
              <td>{entry.actualDate}</td>
              <td>{entry.changedDate}</td>
              <td >{entry.reason}</td>
              <td className={getStatusClassName(entry.status)}>{entry.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className={`archieved-button`}>
    <button className="btn btn-info custom-button" onClick= {handleArchivedButtonClick}>Show Archived</button>
    
      {/* Render the archived entries if showArchived is true */}
      {/* {remainingEntries.length > 0 ? (
        <ul> */}
                {showArchived && <ArchievedEntries entries={archivedEntries} />}

        {/* </ul>
      ) : (
        // <p>No remaining entries</p>
      )} */}

    
    </div>
    
    
  </div>
  );
};
export default CalendarComponent;
