import React from "react";
import Axios  from "axios";
import { useEffect,useState } from "react";

function Dashboard() {

  const [list,setlist] = useState([]);
  useEffect(() => {
    Axios.get('http://localhost:1337/api/totalcategory').then((response)  => {
      setlist(response.data);
    })
  },[]);

  const [list2,setlist2] = useState([]);
  useEffect(() => {
    Axios.get('http://localhost:1337/api/totalservice').then((response)  => {
      setlist2(response.data);
    })
  },[]);

  const [list3,setlist3] = useState([]);
  useEffect(() => {
    Axios.get('http://localhost:1337/api/totaltimeslot').then((response)  => {
      setlist3(response.data);
    })
  },[]);
  return (
    <div class="main-panel">
    <div class="content-wrapper">
      <div class="row">
        <div class="col-12 grid-margin stretch-card">
          <div class="card corona-gradient-card">
            <div class="card-body py-0 px-0 px-sm-3">
              <div class="row align-items-center">
                <div class="col-4 col-sm-3 col-xl-2">
                  <img src="assets/images/dashboard/Group126@2x.png" class="gradient-corona-img img-fluid" alt=""/>
                </div>
                <div class="col-5 col-sm-7 col-xl-8 p-0">
                  <h4 class="mb-1 mb-sm-0">Want even more features?</h4>
                  <p class="mb-0 font-weight-normal d-none d-sm-block">Check out our Pro version with 5 unique layouts!</p>
                </div>
                <div class="col-3 col-sm-2 col-xl-2 pl-0 text-center">
                  <span>
                    <a href="https://www.bootstrapdash.com/product/corona-admin-template/" target="_blank" class="btn btn-outline-light btn-rounded get-started-btn">Upgrade to PRO</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-3 col-sm-6 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-9">
                  <div class="d-flex align-items-center align-self-start">
                    {list.map((val)=>{return(
                   
                    <h3 class="mb-0">{val.count}</h3>
                  )})}
                   
                  </div>
                </div>
                <div class="col-3">
                  <div class="icon icon-box-success ">
                    <span class="mdi mdi-arrow-top-right icon-item"></span>
                  </div>
                </div>
              </div>
              <h6 class="text-muted font-weight-normal">Total Service Category</h6>
            </div>
          </div>
        </div>
        
        <div class="col-xl-3 col-sm-6 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-9">
                  <div class="d-flex align-items-center align-self-start">
                  {list2.map((val)=>{return(
                   
                   <h3 class="mb-0">{val.count}</h3>
                 )})}
                   
  
                  </div>
                </div>

                
                <div class="col-3">
                  <div class="icon icon-box-success">
                    <span class="mdi mdi-arrow-top-right icon-item"></span>
                  </div>
                </div>
              </div>
              <h6 class="text-muted font-weight-normal">Total Services</h6>
              
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-sm-6 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-9">
                  <div class="d-flex align-items-center align-self-start">
                    {list3.map((val)=>{return(
                   
                    <h3 class="mb-0">{val.count}</h3>
                  )})}
                   
                  </div>
                </div>
                <div class="col-3">
                  <div class="icon icon-box-success ">
                    <span class="mdi mdi-arrow-top-right icon-item"></span>
                  </div>
                </div>
              </div>
              <h6 class="text-muted font-weight-normal">Total Timeslot</h6>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-sm-6 grid-margin stretch-card">
         
        </div>
       
      </div>
            
                </div>
   
   
    
  </div>
  );
}

export default Dashboard;