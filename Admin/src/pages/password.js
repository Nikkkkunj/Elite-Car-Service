import React from "react";
import Swal from "sweetalert2";
import axios from "axios";

function Password() {
  // Get user email from session storage
  const user = JSON.parse(sessionStorage.getItem("mydata")) || { Email: "" };

  function changepass() {
    const oldPassword = document.getElementById("oldPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Check if required fields are filled
    if (!newPassword || !confirmPassword || !oldPassword) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "All fields are mandatory",
      });
      return;
    }

    // Check if newPassword and confirmPassword match
    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Mismatch",
        text: "New Password and Confirm Password do not match",
      });
      return;
    }

    // Send API request
    axios
      .post("http://localhost:1337/api/updatepassword", {
        Email: user.Email,
        old_password: oldPassword,
        new_password: newPassword
      })
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.message || "Password updated successfully",
        }).then(() => {
          window.location.href = "/dash";
        });
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || "An error occurred while updating password";
        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorMessage
        });
      });
  }

  return (
    <div className="main-panel">
      <div className="content-wrapper">
        <div className="page-header">
          <h1 className="page-title">Change Password</h1>
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
                <h4 className="card-title">Update Password</h4>

                <div className="form-group">
                  <label htmlFor="oldPassword">Old Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="oldPassword"
                    name="oldPassword"
                    placeholder="Enter old password"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    name="newPassword"
                    placeholder="Enter new password"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm new password"
                  />
                </div>

                <button type="submit" className="btn btn-primary me-2" onClick={changepass}>
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Password;