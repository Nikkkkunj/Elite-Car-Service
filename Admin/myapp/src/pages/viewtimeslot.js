import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Axios from "axios";
import { Link } from "react-router-dom";

function Viewtimeslot() {
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    fetchTimeSlots();
  }, []);

  const fetchTimeSlots = () => {
    Axios.get("http://localhost:1337/api/gettimeslot")
      .then((response) => {
        setTimeSlots(response.data);
      })
      .catch((error) => {
        console.error("Error fetching time slots:", error);
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:1337/api/deletetimeslot/${id}`)
          .then(() => {
            setTimeSlots((prevList) => prevList.filter((val) => val.Timeslot_id !== id));
            Swal.fire("Deleted!", "Time slot has been deleted.", "success");
          })
          .catch((error) => {
            console.error("Error deleting time slot:", error);
            Swal.fire("Error!", "Failed to delete time slot.", "error");
          });
      }
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formatTime = (timeString) => {
    const time = new Date(`1970-01-01T${timeString}Z`);
    const hours = String(time.getUTCHours()).padStart(2, "0");
    const minutes = String(time.getUTCMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <div className="col-lg-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">View Time Slots</h4>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Appointment</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((val, index) => (
                  <tr key={val.Timeslot_id}>
                    <td>{index + 1}</td>
                    <td>{formatTime(val.start_time)}</td>
                    <td>{formatTime(val.end_time)}</td>
                    <td>{formatDate(val.appointment)}</td>
                    <td>{val.status === 1 ? "Active" : "Inactive"}</td>
                    <td>
                      <Link to="/edittimeslot" state={{ Timeslot_id: val.Timeslot_id }} className="btn btn-primary btn-sm">
                        Edit
                      </Link>
                      &nbsp;&nbsp;
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(val.Timeslot_id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Viewtimeslot;