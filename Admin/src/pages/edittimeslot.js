import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Axios from "axios";

function EditTimeSlot() {
  const location = useLocation();
  const navigate = useNavigate();
  const { Timeslot_id } = location.state || {};

  const [timeSlot, setTimeSlot] = useState({
    Service_id: "",
    start_time: "",
    end_time: "",
    appointment: "",
    status: ""
  });

  useEffect(() => {
    if (Timeslot_id) {
        Axios.post(`http://localhost:1337/api/gettimeslot/${Timeslot_id}`, timeSlot)

        .then((response) => {
          setTimeSlot(response.data);
        })
        .catch((error) => {
          console.error("Error fetching time slot data:", error);
        });
    }
  }, [Timeslot_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTimeSlot((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.put(`http://localhost:1337/api/updatetimeslot/${Timeslot_id}`, timeSlot)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Time slot updated successfully",
        }).then(() => navigate("/viewtimeslot"));
      })
      .catch((error) => {
        console.error("Error updating time slot:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update time slot",
        });
      });
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Edit Time Slot</h4>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Start Time</label>
                  <input
                    type="time"
                    className="form-control"
                    name="start_time"
                    value={timeSlot.start_time}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>End Time</label>
                  <input
                    type="time"
                    className="form-control"
                    name="end_time"
                    value={timeSlot.end_time}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Appointment Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="appointment"
                    value={timeSlot.appointment}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    className="form-control"
                    name="status"
                    value={timeSlot.status}
                    onChange={handleChange}
                  >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
                <button type="button" className="btn btn-dark ml-2" onClick={() => navigate("/viewtimeslot")}>
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTimeSlot;
