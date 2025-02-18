import React, {useEffect, useState} from 'react';
import axios from "axios";
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

function Viewservicecategory() {
    const [list, setList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:1337/api/getservicecat')
    .then((response) => {
      setList(response.data);
      //alert(response.data);
    })
    .catch((error) => {
      console.error("There was an error fetching the data!", error);
    });
  }, []);
  
  //Handle Delete
  const handleDelete = (Category_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6", // Corrected case
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!", // Removed duplicate
      cancelButtonText: "Cancel!", // Retained the proper key
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:1337/api/deleteservicecategory/${Category_id}`) // Fixed string template
          .then((response) => {
            // Update the state to remove the deleted category
            setList((prevList) => prevList.filter((val) => val.Category_id !== Category_id));
  
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
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
        Swal.fire("Cancelled", "Delete operation cancelled.", "error");
      }
    });
  };
  
  
    return (
    <div class="col-lg-12 grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">View Service Category</h4>
        
        <div class="table-responsive">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th> # </th>
                <th> Category Name</th>
                <th> Category Description </th>
                
              </tr>
            </thead>
            <tbody>
            {list.map((val, index) => (
                <tr key={val.Category_id}>
                  <td>{index + 1}</td>
                  <td>{val.Category_name}</td>
                  <td>{val.Category_desc}</td>
                  <td><Link
                        to="/editcategory"
                        state={{ Category_id: val.Category_id }}
                        className="btn btn-primary btn-sm"
                      >
                        Edit
                      </Link>
                    &nbsp;&nbsp;
                  <a className="btn btn-danger" onClick={()=> handleDelete(val.Category_id)}>Delete</a></td>
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

export default Viewservicecategory