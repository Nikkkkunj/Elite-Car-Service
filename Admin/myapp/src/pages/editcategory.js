import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';


function Editservicecategory() {

    const location = useLocation();
    const Category_id = location.state?.Category_id;
    const [categorydata, setcategorydata] = useState({
        Category_id:'',
        Category_name:'',
        Category_desc:'',
    });

    useEffect(() => {
        if(Category_id){
            Axios.post('http://localhost:1337/api/getservicecategorybyid', {Category_id:Category_id})
            .then((response) => {
                setcategorydata(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data', error);
            });   
        }
    },
    [Category_id]);

    const handleChange = (e) => {
      const { id, value } = e.target;
      setcategorydata((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    };

    const handleSubmit = () => {
      if(categorydata.Category_name && categorydata.Category_desc){
        Axios.post('http://localhost:1337/api/updateservicecategory', categorydata)
        .then((response) => {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Service Category updated successfully',
            }).then(() => {
              window.location.href = '/viewservicecategory';
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'An error occurred while updating service category',
            }).then(() => {
              window.location.href = '/viewservicecategory';
            });
          });
      } else{
        Swal.fire({
          icon: 'warning',
          title: 'Validation Error',
          text: 'All fields are mandatory',
        });
      }
    };

  return (
      <div className="main-panel">
      <div className="content-wrapper">
        <div className="page-header">
          <h1 className="page-title"> Edit Service Category </h1>
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
                <h4 className="card-title">Service Category</h4>
                
                <div className="form-group">
                  <label htmlFor="Category_name">Edit Service Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Category_name"
                    value={categorydata.Category_name}
                    onChange={handleChange}
                    
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="Category_desc"> Edit Service Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Category_desc"
                    value={categorydata.Category_desc}
                    onChange={handleChange}
                    
                  />
                </div>
                <button type="submit" className="btn btn-primary me-2" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Editservicecategory