import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/header';
import Sidebar from './Components/sidebar';
import Footer from './Components/footer';
import Dashboard from './pages/dash';
import Login from './pages/Login';
import Manage from './pages/manageservicecategory';
import Addservice from './pages/addservice';
import Viewservicecategory from './pages/viewservicecategory';
import Viewservice from './pages/viewservice';
import Addappointment from './pages/appointment';
import Viewappointment from './pages/viewappointment';
import Editcategory from './pages/editcategory';
import Editservice from './pages/editservice';
import Password from './pages/password';
import Addtimeslot from './pages/addtimeslot';
import ViewtimeSlot from './pages/viewtimeslot';
import EditTimeSlot from './pages/edittimeslot';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route is the login page */}
        <Route path="/" element={<Login />} /> {/* This sets the login page as the default route */}

        {/* Other routes with full layout */}
        <Route
          path="/*"
          element={
            <div className="container-scroller">
              <Header />
              <Sidebar />
              <div className="container-fluid page-body-wrapper">
                <Routes>
                  <Route path="/dash" element={<Dashboard />} />
                  <Route path="/manageservicecategory" element={<Manage />} />
                  <Route path="/addservice" element={<Addservice />} />
                  <Route path="/viewservicecategory" element={<Viewservicecategory />} />
                  <Route path="/viewservice" element={<Viewservice />} />
                  <Route path="/editcategory" element={<Editcategory />} />
                  <Route path="/editservice" element={<Editservice />} />
                  <Route path="/appointment" element={<Addappointment />} />
                  <Route path="/viewappointment" element={<Viewappointment />} />
                  <Route path="/password" element={<Password />} />
                  <Route path="/addtimeslot" element={<Addtimeslot />} />
                  <Route path="/viewtimeslot" element={<ViewtimeSlot />} />
                  <Route path="/edittimeslot" element={<EditTimeSlot />} />
                 
                 
                </Routes>
              </div>
              {/* <Footer /> */}
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
