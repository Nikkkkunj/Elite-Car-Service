import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

function Viewservice() {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:1337/api/getservice')
      .then((response) => {
        setList(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  // Handle Delete
  const handleDelete = (Service_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:1337/api/deleteservice/${Service_id}`)
          .then((response) => {
            // Update the state to remove the deleted service
            setList((prevList) => prevList.filter((val) => val.Service_id !== Service_id));

            Swal.fire("Deleted!", "The service has been deleted.", "success");
          })
          .catch((error) => {
            console.error("There was an error deleting the item!", error);

            Swal.fire({
              icon: "error",
              title: "Error",
              text: "There was an error deleting the item.",
            });
          });
      } else {
        Swal.fire("Cancelled", "Delete operation cancelled.", "info");
      }
    });
  };

  return (
    <div className="col-lg-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">View Service</h4>

          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Number</th>
                  <th>Service Name</th>
                  <th>Service Image</th>
                  <th>Service Price</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {list.map((val, index) => (
                  <tr key={val.Service_id}>
                    <td>{index + 1}</td>
                    <td>{val.Service_name}</td>
                    <td>
                      <img
                        src={`http://localhost:1337/public/upload/${val.Service_image}`} // Ensure using correct protocol (http or https)
                        alt={val.Service_image}
                        style={{ 
                          width: "100px",  // or set to a responsive value like "100%" or "auto"
                          height: "100px", // Keeps it square, you can make this responsive based on your design
                          //  borderRadius: "15%",  // Rounds the image (adjust the percentage for more or less rounding)
                           objectFit: "cover", // Ensures the image covers the space without stretching
                         }}
                      />
                    </td>
                    <td>{val.Service_price}</td>
                    <td>{val.Service_desc}</td>
                    <td>
                      <Link
                        to="/editservice"
                        state={{ Service_id: val.Service_id }}
                        className="btn btn-primary"
                      >
                        Edit
                      </Link>
                      &nbsp;&nbsp;
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(val.Service_id)}
                      >
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

export default Viewservice;
