import React, { useState } from "react";
import Swal from "sweetalert2";
import Axios from "axios";

function Login() {
  // Declare state for email and password
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  // Function to handle the login process
  function loginProcess() {
    // Validate if fields are empty
    if (!Email) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please enter your Email",
      });
      return;
    }

    if (!Password) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please enter your password",
      });
      return;
    }

    // Make API call to backend for login authentication
    Axios.post("http://localhost:1337/api/adminlogin", {
      Email: Email,
      Password: Password,
    })
      .then((response) => {
        if (response.data.message) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.data.message,
          });
        } else {

        const adminData = response.data[0] || response.data;
        const data = {
        Email: adminData.Email,

        };
        sessionStorage.setItem("mydata", JSON.stringify(data));
          Swal.fire({
            icon: "success",
            title: 'Login Successful',
            text: response.data.message,
          }).then(() => {
            window.location = "/dash"; // Redirect after successful login
          });
        }
      })
      // .catch((error) => {
      //   Swal.fire({
      //     icon: "error",
      //     title: "Error",
      //     text: "Something went wrong. Please try again.",
      //   });
      // });
  }

  return (
    <>
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          <div className="row w-100 m-0">
            <div className="content-wrapper full-page-wrapper d-flex align-items-center auth login-bg">
            <div className="card col-lg-4 mx-auto" style={{ height: '400px', width: '500px' }}> {/* Line 68: Adjust width of the card */}
                <div className="card-body px-5 py-5">
                  <h3 className="card-title text-left mb-3">Login</h3>
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      className="form-control p_input"
                      value={Email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="form-group">
                    <label>Password *</label>
                    <input
                      type="password"
                      className="form-control p_input"
                      value={Password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                    />
                  </div>
                  <div className="form-group d-flex align-items-center justify-content-between">
                    <div className="form-check">
                      <label className="form-check-label">
                        <input type="checkbox" className="form-check-input" />
                        Remember me
                      </label>
                    </div>
                 
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block enter-btn"
                      onClick={loginProcess}
                    >
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
