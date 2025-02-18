import React, {useState} from 'react';
import Swal from 'sweetalert2';
import Axios from 'axios';

function Addappointment() {
    const [pickupPoint, setpickupPoint] = useState("");
    const [dropoffPoint, setdropoffPoint] = useState("");
    const [status, setstatus] = useState("");
    const [selectedDate, setselectedDate] = useState("");
  
    const Appointment = (e) => {
      e.preventDefault(); // Prevent default form submission
  
      if (!pickupPoint || !dropoffPoint || !status || !selectedDate ) {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Please input all fields",
        });
        return;
      }
  
      Axios.post("http://localhost:1337/api/addappointment", {
        Pickup_point: pickupPoint,
        Dropoff_point: dropoffPoint,
        Status: status,
        Selected_date: selectedDate,

      })
        .then((response) => {
          const message = response.data.message;
  
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: message,
          }).then(() => {
            window.location = "/"; // Redirect after success
          });
        })
        .catch((error) => {
          const errorMessage =
            error.response?.data?.message || "Something went wrong";
  
          Swal.fire({
            icon: "error",
            title: "Oops!",
            text: errorMessage,
          });
        });
    };
  
   

  return (
    <div className="container-fluid">
      <div className="row justify-content">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Add Appointment</h4>
              <h1 className="card-description">Add Appointment</h1>
              
              
                <div className="form-group">
                  <label htmlFor="exampleInputUsername1">Pickup Point</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Pickup_point"
                    placeholder="Address"
                    value={pickupPoint}
                    onChange={(e) => setpickupPoint(e.target.value)} // Bind to state
                   
                   />
                    
                  
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Dropoff Point</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Dropoff_point"
                    placeholder="Address"
                    value={dropoffPoint}
                    onChange={(e) => setdropoffPoint(e.target.value)} // Bind to state
                    
                  />
                  </div>
                  
                  <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Status</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Status"
                    placeholder="Status"
                    value={status}
                    onChange={(e) => setstatus(e.target.value)} // Bind to state
                    
                  />
                  </div>
                  <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Selected Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="Selected_date"
                    placeholder="Date"
                    value={selectedDate}
                    onChange={(e) => setselectedDate(e.target.value)} // Bind to state
                    
                  />
                  </div>
               
               
                <button type="submit" className="btn btn-primary mr-2" onClick={ Appointment }>
                  Submit
                </button>
                <button type="button" className="btn btn-dark" onClick={( )=> {
                  setpickupPoint("");
                  setdropoffPoint("");
                  setstatus("");
                  setselectedDate("");
                  

                }}> 
                  Cancel
                </button>
                
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Addappointment