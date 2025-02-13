import React, { useState,useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
function Addservice() {
  const[list, setlist] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:1337/api/getservicecat")
      .then((response) => {
        setlist(response.data);
      })
      .catch((error) => {
        console.error("Error fetching  categories:", error);
      });
  }, []);

  const validateImage = (file) => {
    const validTypes = ["image/jpeg", "image/png"];
    if (file && !validTypes.includes(file.type)) {
      Swal.fire({
        icon: "error",
        title: "Invalid File Type",
        text: "Only .jpeg and .png files are allowed.",
      });
      return false;
    }
    return true;
  };

function serviceadd() {
  const Category_id = document.getElementById('Category_id').value;
  const service_name = document.getElementById('service_name').value;
  const image = document.getElementById('image').files[0];
  const service_price = document.getElementById('service_price').value;
  const service_desc = document.getElementById('service_desc').value;



     

    if (!Category_id || !service_name || !image || !service_price || !service_desc) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Please input all fields",
      });
      return;
    }
    if (!validateImage(image)){
      return;
    }
    const formData = new FormData();
    formData.append('Category_id',Category_id);
    formData.append('service_name', service_name);
    formData.append('image', image);
    formData.append('service_price', service_price);
    formData.append('service_desc', service_desc);
    

    axios.post("http://localhost:1337/api/addservice", formData, {
      headers: { "Content-Type": "multipart/form-data" },
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
        const errorMessage = error.response?.data?.message || "Something went wrong";

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
              <h4 className="card-title">Add Service</h4>
              <h1 className="card-description">Add Service</h1>

                <div className="form-group">
                  <label htmlFor="category_name">Service Category</label>
                  <select className='form-control' id="Category_id">
                    <option value="">Select Category </option>
                    {list.map((servicecat)=> (
                      <option key={servicecat.Category_id} value={servicecat.Category_id}>
                        {servicecat.Category_name}
                        </option>
                    ) )}
                  </select>
                </div>
              
                <div className="form-group">
                  <label htmlFor="exampleInputUsername1">Service Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="service_name"
                    placeholder="Name"
               
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Service Image</label>
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    placeholder="image"
                

                  />
                </div>

                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Service Price</label>
                  <input
                    type="decimal"
                    className="form-control"
                    id="service_price"
                    placeholder="Price"
                    
                  />
                </div>


                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Service description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="service_desc"
                    placeholder="description"
                   


                  />
                </div>

                <button type="submit" className="btn btn-primary mr-2" onClick={serviceadd}>
                  Submit
                </button>
                
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addservice;