import React, {useEffect, useState} from 'react';
import axios from "axios";

function Viewappointment() {
    const [list, setList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:1337/api/getappointment')
    .then((response) => {
      setList(response.data);
      //alert(response.data);
    })
    .catch((error) => {
      console.error("There was an error fetching the data!", error);
    });
  }, []);
  
  
  
    return (
    <div class="col-lg-12 grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">View Appointment</h4>
        
        <div class="table-responsive">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th> # </th>
                <th> Pickup Point</th>
                <th> Dropoff Point</th>
                <th> Status </th>
                <th> Selected Date</th>
                
              </tr>
            </thead>
            <tbody>
            {list.map((val, index) => (
                <tr key={val.Appointment_id}>
                  <td>{index + 1}</td>
                  <td>{val.Pickup_point}</td>
                  <td>{val.Dropoff_point}</td>
                  <td>{val.Status}</td>
                  <td>{val.Selected_date}</td>
                  <td><a className="btn btn-primary">Edit</a>&nbsp;&nbsp;
                  <a className="btn btn-danger">Delete</a></td>
                </tr>

              ))}

            
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Viewappointment