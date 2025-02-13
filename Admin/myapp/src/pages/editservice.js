import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';

function Editservice() {
  const location = useLocation();
  const Service_id = location.state?.Service_id;

  const [servicedata, setservicedata] = useState({
    Service_id: '',
    Service_name: '',
    image: '',
    Service_price: '',
    Service_desc: '',
  });

  useEffect(() => {
    if (Service_id) {
      Axios.post('http://localhost:1337/api/getservicebyid', { Service_id })
        .then((response) => {
          setservicedata(response.data);
        })
        .catch((error) => {
          console.error('Error fetching data', error);
        });
    }
  }, [Service_id]);

  const handleChange = (e) => {
    const { id, value, files } = e.target;

    if (id === 'image') {
      // If it's a file input, handle the file change
      setservicedata((prevState) => ({
        ...prevState,
        image: files[0], // Store the file in state, not the file path
      }));
    } else {
      // Handle other form fields
      setservicedata((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('Service_id', servicedata.Service_id);
    formData.append('Service_name', servicedata.Service_name);
    formData.append('Service_price', servicedata.Service_price);
    formData.append('Service_desc', servicedata.Service_desc);

    // Append the file (if it exists)
    if (servicedata.image) {
      formData.append('image', servicedata.image); // Use the image file from state
    }

    Axios.post('http://localhost:1337/api/updateservice', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Service updated successfully',
        }).then(() => {
          window.location.href = '/viewservice'; // Redirect after success
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while updating service',
        }).then(() => {
          window.location.href = '/viewservice'; // Redirect after error
        });
      });
  };

  return (
    <div className="main-panel">
      <div className="content-wrapper">
        <div className="page-header">
          <h3 className="page-title">Manage Service</h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">Forms</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Form elements
              </li>
            </ol>
          </nav>
        </div>
        <div className="row">
          <div className="col-md-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Manage Service</h4>

                <div className="form-group">
                  <label htmlFor="Service_name">Service Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Service_name"
                    value={servicedata.Service_name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="image">Service Image</label>
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    onChange={handleChange}
                  />
                  {servicedata.image && (
                    <img
                      src={`http://localhost:1337/public/upload/${servicedata.Service_image}`}
                      alt={servicedata.Service_image}
                      style={{ width: '50px', height: 'auto' }}
                    />
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="Service_price">Service Price</label>
                  <input
                    type="number"
                    className="form-control"
                    id="Service_price"
                    value={servicedata.Service_price}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="Service_desc">Service Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Service_desc"
                    value={servicedata.Service_desc}
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="button"
                  className="btn btn-primary me-2"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Editservice;
