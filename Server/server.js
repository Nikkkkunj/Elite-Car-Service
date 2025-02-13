var mysql = require("mysql");
var express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");



var app = express();
app.use(express.json());
app.use("/public", express.static("public"));
app.use(cors());
app.use(bodyParser.json());

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "elite_car_service",
});

// Connect to MySQL
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected to MySQL!");
});

// Admin Login

app.post('/api/adminlogin', (req,res) => {
  var Email = req.body.Email;
  var Password = req.body.Password;

  const query = "select * from admin_login where Email = ? and Password = ?";
  con.query(query,[Email,Password],(err,result)=>{
    if(result.length > 0)
    {
      res.send(result);
    }
    else {
      res.send({message:"invalid email or password"});
    }
  });
});


// Insert Category Endpoint
app.post('/api/insertcategory', (req, res) => {
    var category_name = req.body.category_name;
    var category_desc = req.body.category_desc;

    if (!category_name || !category_desc) {
        return res.status(400).send({ message: "Please fill all required fields." });
    }

    const query = "INSERT INTO service_category (category_name, category_desc) VALUES (?,?)";

    con.query(query, [category_name, category_desc], (err, result) => {
        if (err) {
            console.log("Error inserting data:", err);
            return res.status(500).send({ message: "Error inserting data." });
        } else {
            res.status(201).send({ message: "Data inserted successfully", result });
        }
    });
});


// Add Time Slot Endpoint
app.post("/api/addtimeslot", (req, res) => {
  const { Service_id,start_time, end_time, appointment, status } = req.body;

  if (!Service_id || !start_time || !end_time || !appointment || status === undefined) {
    return res.status(400).send({ message: "Please fill in all fields." });
  }

  const query = `
    INSERT INTO timeslot (Service_id, start_time, end_time, appointment, status)
    VALUES (?, ?, ?, ?,?)
  `;

  con.query(query, [Service_id,start_time, end_time, appointment, status], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).send({ message: "Error inserting time slot." });
    }
    res.status(201).send({ message: "Time slot added successfully", result });
  });
});

 // Insert Service Endpoit
 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/upload");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  
  var upload = multer({ storage: storage});
  var multi = upload.fields([{ name: 'image'}]);
  
  app.post("/api/addservice", multi, (req, res) => {
    const Category_id = req.body.Category_id;
    console.log(Category_id);
    const service_name = req.body.service_name;
    const image = req.files.image[0].filename;
    
    const service_price = req.body.service_price;
    const service_desc = req.body.service_desc;
    
    const query ="INSERT INTO service(Category_id,Service_name,Service_image,Service_price,Service_desc) VALUES (?, ?, ?, ?, ?)";
      
    con.query(
      query,
      [Category_id,service_name, image, service_price, service_desc],
      (err, result) => {
        if (err) {
          console.error("Database Error: ", err);
          return res
            .status(500)
            .send({ message: "An internal server error occurred. Please try again later." });
        }
        res.status(201).send({ message: "Data inserted successfully", result });
      });
    });

    

   
  

    app.get('/api/getservicecat', (req,res) => {
      const ins = "select * from service_category";
      con.query(ins,(err,result)=>{
        res.send(result);
      });
    });

    app.get('/api/getservice', (req,res) => {
      const ins = "select * from service";
      con.query(ins,(err,result)=>{
        res.send(result);
      });
    });

    app.get('/api/gettimeslot', (req,res) => {
      const ins = "select * from timeslot";
      con.query(ins,(err,result)=>{
        res.send(result);
      });
    });




    

// Update Service Category Endpoint
app.post('/api/getservicecategorybyid', (req, res) => {
  const Category_id = req.body.Category_id;
  const query = "SELECT * FROM service_category WHERE Category_id = ?";

  con.query(query, [Category_id], (err, result) => {
    if (err) {
      console.error("Error executing query: ", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Service Category not found" });
    }
    res.send(result[0]);


  });

});

app.post('/api/updateservicecategory', (req, res) => {
  const Category_id = req.body.Category_id;
  const Category_name = req.body.Category_name;
  const Category_desc = req.body.Category_desc;

  const query = "UPDATE service_category SET Category_name = ?, Category_desc = ? WHERE Category_id = ?";

  con.query(query, [Category_name, Category_desc, Category_id], (err, result) => {
    if (err) {
      console.error("Error executing query: ", err);
      return res.status(500).send({ error: 'An error occurred while updating the data.' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).send({ message: 'Service Category not found' });
    }

    console.log(result);
    res.send({ message: "Service Category updated successfully", result });
  });
});


// Update Book Endpoint

app.post('/api/getservicebyid', (req, res) => {
  const Service_id = req.body.Service_id;
  const query = "SELECT * FROM service WHERE Service_id = ?";

  con.query(query, [Service_id], (err, result) => {
    if (err) {
      console.error("Error executing query: ", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.send(result[0]);


  });

});

// Update Service 
app.post("/api/updateservice", multi, (req, res) => {
 const { Service_id, Service_name, Service_price, Service_desc} = req.body;

 let image = null;
 if (req.files && req.files.image) {
   image = req.files.image[0].filename;
 }

 const query = image 
  ? "UPDATE service SET Service_name = ?, Service_image = ?, Service_price = ?, Service_desc = ? WHERE Service_id = ?"
  : "UPDATE service SET Service_name = ?, Service_price = ?, Service_desc = ? WHERE Service_id = ?";

  const params = image
  ? [Service_name, image, Service_price, Service_desc,  Service_id]
  : [Service_name, Service_price, Service_desc,  Service_id];

  con.query(query, params, (err, result) => {
    if (err){
      console.error("Error executing query: ", err);
      return res.status(500).send({ error: 'An error occurred while updating the data.' });
    } else {
      res.send({ message: "Service updated successfully", result });
    }
  });
});



// Get Time Slot by ID Endpoint

  app.post('/api/gettimeslot', (req, res) => {
  const { Timeslot_id } = req.params;
  const query = "SELECT * FROM timeslot WHERE Timeslot_id = ?";

  con.query(query, [Timeslot_id], (err, result) => {
    if (err) {
      console.error("Error executing query: ", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Time slot not found" });
    }
    res.json(result[0]);
  });
});

// Update Time Slot Endpoint
app.put('/api/updatetimeslot/:Timeslot_id', (req, res) => {
  const { Timeslot_id } = req.params;
  const { start_time, end_time, appointment, status } = req.body;

  const query = "UPDATE timeslot SET start_time = ?, end_time = ?, appointment = ?, status = ? WHERE Timeslot_id = ?";

  con.query(query, [start_time, end_time, appointment, status, Timeslot_id], (err, result) => {
    if (err) {
      console.error("Error executing query: ", err);
      return res.status(500).json({ error: "An error occurred while updating the time slot." });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Time slot not found" });
    }

    res.json({ message: "Time slot updated successfully", result });
  });
});





    //Delete Service Category
  app.delete("/api/deleteservicecategory/:Category_id", (req, res) => {
    const Category_id = req.params.Category_id;
    console.log("Attempting to delete Category with ID:", Category_id);
    const query = "DELETE FROM service_category WHERE Category_id = ?";
  
    con.query(query, [Category_id], (err, result) => {
      if (err) {
        console.error("Error executing query: ", err);
        return res.status(500).json({ message: "Server error", error: err });
      }
  
      if (result.affectedRows === 0) {
        console.warn("No service category found with the given ID:", Category_id);
        return res.status(404).json({ message: "Service Category not found" });
      }
  
      console.log("Service Category deleted successfully:", Category_id);
      res.status(200).json({ message: "Service Category deleted successfully", result });
    });
  });


   //Delete Service 
   app.delete("/api/deleteservice/:Service_id", (req, res) => {
    const Service_id = req.params.Service_id;
    console.log("Attempting to delete Service with ID:", Service_id);
    const query = "DELETE FROM service WHERE Service_id = ?";
  
    con.query(query, [Service_id], (err, result) => {
      if (err) {
        console.error("Error executing query: ", err);
        return res.status(500).json({ message: "Server error", error: err });
      }
  
      if (result.affectedRows === 0) {
        console.warn("No service category found with the given ID:", Service_id);
        return res.status(404).json({ message: "Service  not found" });
      }
  
      console.log("Service Category deleted successfully:", Service_id);
      res.status(200).json({ message: "Service  deleted successfully", result });
    });
  });



  //Delete Timeslot
  app.delete("/api/deletetimeslot/:Timeslot_id", (req, res) => {
    const Timeslot_id  = req.params.Timeslot_id ;
    console.log("Attempting to delete Timeslot with ID:", Timeslot_id );
    const query = "DELETE FROM timeslot WHERE Timeslot_id  = ?";
  
    con.query(query, [Timeslot_id], (err, result) => {
      if (err) {
        console.error("Error executing query: ", err);
        return res.status(500).json({ message: "Server error", error: err });
      }
  
      if (result.affectedRows === 0) {
        console.warn("No Timeslot found with the given ID:", Timeslot_id );
        return res.status(404).json({ message: "Timeslot  not found" });
      }
  
      console.log("Timeslot deleted successfully:", Timeslot_id);
      res.status(200).json({ message: "Timeslot  deleted successfully", result });
    });
  });


  // update password
app.post("/api/updatepassword", (req, resp) => {
  const { Email, old_password, new_password } = req.body;
  


  const query = "SELECT * FROM admin_login WHERE Email = ?";
  con.query(query, [Email], (err, result) => {
    if (err) {
      return resp.status(500).send({ message: "Error checking the user" });
    }

    if (result.length === 0) {
      return resp.status(404).send({ message: "User not found" });
    }

    const user = result[0];

    if (user.Password !== old_password) {
      return resp.status(400).send({ message: "Current password is incorrect" });
    }

    const updateQuery =
      "UPDATE admin_login SET Password = ? WHERE Email = ?";
    con.query(updateQuery, [new_password, Email], (updateErr, updateResult) => {
      if (updateErr) {
        return resp.status(500).send({ message: "Error updating the password" });
      }

      resp.send({ message: "Password changed successfully" });
    });
  });
});

app.get('/api/totalcategory', (req, resp) => {
  const ins="SELECT COUNT(Category_id ) as count from service_category";
  con.query(ins,(err,result)=>{
    resp.send(result);
  });

});

app.get('/api/totalservice', (req, resp) => {
  const ins="SELECT COUNT(Service_id ) as count from service";
  con.query(ins,(err,result)=>{
    resp.send(result);
  });

});

app.get('/api/totaltimeslot', (req, resp) => {
  const ins="SELECT COUNT(Timeslot_id ) as count from timeslot";
  con.query(ins,(err,result)=>{
    resp.send(result);
  });

});



 // Start Server


 // Start Server
 const PORT = 1337;
 app.listen(PORT, () => {
     console.log(`Server is running on port ${PORT}`);
 })