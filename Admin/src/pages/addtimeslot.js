import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Axios from "axios";

function AddTimeSlot() {
  const [list, setList] = useState([]);
  const [Service_id, setServiceid] = useState(""); // State for the selected service
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [appointment, setAppointment] = useState("");
  const [status, setStatus] = useState("");

  // Fetch services on component mount
  useEffect(() => {
    Axios.get("http://localhost:1337/api/getservice")
      .then((response) => {
        setList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });
  }, []);

  // Handle form submission
  const handleAddTimeSlot = (e) => {
    e.preventDefault();

    // Basic validation
    if (!Service_id || !startTime || !endTime || !appointment || !status) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Please fill in all fields",
      });
      return;
    }

    // Send POST request to backend
    Axios.post("http://localhost:1337/api/addtimeslot", {
      Service_id: Service_id,
      start_time: startTime,
      end_time: endTime,
      appointment: appointment,
      status: status,
    })
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: response.data.message,
        }).then(() => {
          // Optionally redirect or reset form fields after success
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: error.response?.data?.message || "Something went wrong",
        });
      });
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Add Time Slot</h4>
              <h1 className="card-description">Add a new time slot</h1>

              <div className="form-group">
                <label htmlFor="Service_name">Select Service</label>
                <select
                  className="form-control"
                  id="Service_id"
                  value={Service_id}
                  onChange={(e) => setServiceid(e.target.value)} // Update state on select change
                >
                  <option value="">Select Service</option>
                  {list.map((service) => (
                    <option key={service.Service_id} value={service.Service_id}>
                      {service.Service_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="start_time">Start Time</label>
                <input
                  type="time"
                  className="form-control"
                  id="start_time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)} // Bind to state
                />
              </div>

              <div className="form-group">
                <label htmlFor="end_time">End Time</label>
                <input
                  type="time"
                  className="form-control"
                  id="end_time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)} // Bind to state
                />
              </div>

              <div className="form-group">
                <label htmlFor="appointment">Appointment</label>
                <input
                  type="date"
                  className="form-control"
                  id="appointment"
                  value={appointment}
                  onChange={(e) => setAppointment(e.target.value)} // Bind to state
                />
              </div>

              <div className="form-group">
              <label htmlFor="status">Status</label>
             <select
               className="form-control"
              id="status"
               value={status}
               onChange={(e) => setStatus(e.target.value)} // Bind to state
                 >
                <option value="">Select Status</option>
                 <option value="1">Active</option>
                  <option value="0">Inactive</option>
                 </select>
                  </div>




              

              <button
                type="submit"
                className="btn btn-primary mr-2"
                onClick={handleAddTimeSlot} // Submit form
              >
                Submit
              </button>
              <button
                type="button"
                className="btn btn-dark"
                onClick={() => {
                  // Reset form fields on cancel
                  setServiceid("");
                  setStartTime("");
                  setEndTime("");
                  setAppointment("");
                  setStatus("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTimeSlot;