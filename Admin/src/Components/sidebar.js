import React from 'react'

function Sidebar() {
  return (
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
    <div class="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
      <a class="sidebar-brand brand-logo" href="index.html"><img src="assets/images/logo.svg" alt="logo" /></a>
      <a class="sidebar-brand brand-logo-mini" href="index.html"><img src="assets/images/logo-mini.svg" alt="logo" /></a>
    </div>
    <ul class="nav">
      <li class="nav-item profile">
        <div class="profile-desc">
          <div class="profile-pic">
            <div class="count-indicator">
              <img class="img-xs rounded-circle " src="assets/images/faces/face15.jpg" alt=""></img>
              <span class="count bg-success"></span>
            </div>
            <div class="profile-name">
              <h5 class="mb-0 font-weight-normal">Admin</h5>
              <span></span>
            </div>
          </div>
          <a href="#" id="profile-dropdown" data-toggle="dropdown"><i class="mdi mdi-dots-vertical"></i></a>
          <div class="dropdown-menu dropdown-menu-right sidebar-dropdown preview-list" aria-labelledby="profile-dropdown">
            <a href="#" class="dropdown-item preview-item">
              <div class="preview-thumbnail">
                <div class="preview-icon bg-dark rounded-circle">
                  <i class="mdi mdi-settings text-primary"></i>
                </div>
              </div>
              <div class="preview-item-content">
                <p class="preview-subject ellipsis mb-1 text-small">Account settings</p>
              </div>
            </a>
            <div class="dropdown-divider"></div>
            <a href="#" class="dropdown-item preview-item">
              <div class="preview-thumbnail">
                <div class="preview-icon bg-dark rounded-circle">
                  <i class="mdi mdi-onepassword  text-info"></i>
                </div>
              </div>
              <div class="preview-item-content">
          <p class="preview-subject ellipsis mb-1 text-small">
          <a href="/password">Change Password</a>
       </p>
      </div>
            </a>
            <div class="dropdown-divider"></div>
            <a href="#" class="dropdown-item preview-item">
              <div class="preview-thumbnail">
                <div class="preview-icon bg-dark rounded-circle">
                  <i class="mdi mdi-calendar-today text-success"></i>
                </div>
              </div>
              <div class="preview-item-content">
                <p class="preview-subject ellipsis mb-1 text-small">To-do list</p>
              </div>
            </a>
          </div>
        </div>
      </li>
      <li class="nav-item nav-category">
        <span class="nav-link">Navigation</span>
      </li>
      <li class="nav-item menu-items">
        <a class="nav-link" href="/dash">
          <span class="menu-icon">
            <i class="mdi mdi-speedometer"></i>
          </span>
          <span class="menu-title">Dashboard</span>
        </a>
      </li>
      <li class="nav-item menu-items">
        <a class="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
          <span class="menu-icon">
            <i class="mdi mdi-laptop"></i>
          </span>
          <span class="menu-title">Manage Service Category</span>
          <i class="menu-arrow"></i>
        </a>
        <div class="collapse" id="ui-basic">
          <ul class="nav flex-column sub-menu">
                           <li class="nav-item">
               <a class="nav-link" href="/manageservicecategory">
                <span class="menu-title">Add</span> {/* Display "Add" */}
                
               </a>
             </li>
            <li class="nav-item">
              <a class="nav-link" href="/viewservicecategory">
              <span class="menu-title">View</span> {/* Display "View"*/}

            </a>
            </li>
          </ul>
        </div>
      </li> 

      <li class="nav-item menu-items">
        <a class="nav-link" data-toggle="collapse" href="#auth" aria-expanded="false" aria-controls="auth">
          <span class="menu-icon">
            <i class="mdi mdi-laptop"></i>
          </span>
          <span class="menu-title">Manage Service </span>
          <i class="menu-arrow"></i>
        </a>
        <div class="collapse" id="auth">
          <ul class="nav flex-column sub-menu">
                           <li class="nav-item">
               <a class="nav-link" href="/addservice">
                <span class="menu-title">Add</span> {/* Display "Add" */}
                
               </a>
             </li>
            <li class="nav-item">
              <a class="nav-link" href="/viewservice">
              <span class="menu-title">View</span> {/* Display "View"*/}

            </a>
            </li>
          </ul>
        </div>
      </li>
          <li class="nav-item menu-items">
            <a class="nav-link" data-toggle="collapse" href="#auth1" aria-expanded="false" aria-controls="auth1">
              <span class="menu-icon">
                <i class="mdi mdi-contacts"></i>
              </span>
              <span class="menu-title">Timeslot</span>
              <i class="menu-arrow"></i>
            </a>
            <div class="collapse" id="auth1">
          <ul class="nav flex-column sub-menu">
                           <li class="nav-item">
               <a class="nav-link" href="/addtimeslot">
                <span class="menu-title">Add</span> {/* Display "Add" */}
                
               </a>
             </li>
            <li class="nav-item">
              <a class="nav-link" href="/viewtimeslot">
              <span class="menu-title">View</span> {/* Display "View"*/}

            </a>
            </li>
          </ul>
        </div>

           
          </li>
          
         


      {/* <li class="nav-item">
          <a class="nav-link" href="/login">
            <span class="menu-title">Login</span>
           
          </a>
        </li> */}
    </ul>
  </nav>
  );
}

export default Sidebar;