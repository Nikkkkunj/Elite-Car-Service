import React, {useState} from 'react';
import Swal from 'sweetalert2';
import Axios from 'axios';
function Manage() {
    const [categoryName, setcategoryName] = useState("");
    const [categoryDesc, setcategoryDesc] = useState("");
  
    const Category = (e) => {
      e.preventDefault(); // Prevent default form submission
  
      if (!categoryName || !categoryDesc) {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Please input all fields",
        });
        return;
      }
  
      Axios.post("http://localhost:1337/api/insertcategory", {
        category_name: categoryName,
        category_desc: categoryDesc,
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
              <h4 className="card-title">Service Category</h4>
              <h1 className="card-description">Service Category</h1>
              
              
                <div className="form-group">
                  <label htmlFor="exampleInputUsername1">Category Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Category_name"
                    placeholder="Name"
                    value={categoryName}
                    onChange={(e) => setcategoryName(e.target.value)} // Bind to state
                   
                   />
                    
                  
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Category description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Category_desc"
                    placeholder="description"
                    value={categoryDesc}
                    onChange={(e) => setcategoryDesc(e.target.value)} // Bind to state
                    
                  />
                  </div>
               
                <button type="submit" className="btn btn-primary mr-2" onClick={ Category }>
                  Submit
                </button>
                <button type="button" className="btn btn-dark" 
                onClick={( )=> {
                  setcategoryName("");
                  setcategoryDesc("");

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

export default Manage