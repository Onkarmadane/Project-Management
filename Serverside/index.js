// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ProjectModel = require('./models/Project');
const userModel = require('./models/users');

const app = express();
app.use(cors());
app.use(express.json())

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/ProjectManagement', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferCommands: false,  // Disables buffering
    serverSelectionTimeoutMS: 10000, // Increases timeout duration
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// API endpoint to create a new project
app.get("/ProjectListing", (req, res) => {
    ProjectModel.find({})
        .then(projects => res.json(projects))
        .catch(err => res.status(500).json({ error: err.message }));
});

app.post('/CreateProjectPage', async (req, res) => {
   ProjectModel.create(req.body)
   .then(project=>console.log(project))
   .catch (err => res.json(err))
});

// Route to get department-wise project stats
app.get('/Chart', async (req, res) => {
    try {
      const projectStats = await Project.aggregate([
        {
          $group: {
            _id: "$department", // Group by department
            totalProjects: { $sum: 1 }, // Count total projects
            closedProjects: { $sum: { $cond: [{ $eq: ["$status", "Closed"] }, 1, 0] } }, // Count closed projects
          }
        }
      ]);
  
      // Transforming data to return as an object
      const stats = projectStats.map(dept => ({
        department: dept._id,
        totalProjects: dept.totalProjects,
        closedProjects: dept.closedProjects,
        successPercentage: (dept.closedProjects / dept.totalProjects) * 100 || 0 // Calculate success percentage
      }));
  
      res.json(stats);
    } catch (error) {
      console.error("Error fetching project stats:", error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Route to get prefilled credentials for a user
app.get('/GetPrefilledCredentials', async (req, res) => {
  try {
      // Assuming you're fetching the first user's credentials for demo purposes
      const user = await userModel.findOne(); // You can add a condition like `{ email: req.query.email }` for specific users

      if (user) {
          res.json({
              success: true,
              email:'kiran.gosavi@techprimelab.com' ,
              password: 'mypass321'  // Not recommended to send plain password in production
          });
      } else {
          res.status(404).json({ success: false, message: 'User not found' });
      }
  } catch (error) {
      console.error('Error fetching user credentials:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Login route in server.js
app.post('/LoginPage', async (req, res) => {
  const { email, password } = req.body;

  // Fetch user from the database
  const user = await userModel.findOne({ email: email });

  if (!user) {
      // If user not found, return invalid credentials
      return res.status(400).json({
          Success: "false",
          Message: "Invalid email or user not found"
      });
  }

  // Check if password matches (you may want to hash/compare if hashed)
  if (user.password !== password) {
      return res.status(400).json({
          Success: "false",
          Message: "Invalid password"
      });
  }

  // If credentials are correct
  res.json({
      Success: "true",
      Message: "Login successful"
  });
});


// app.post('/DashboardPage', (req, res) => {
//   const dashboardData = req.body; // Assume some data comes from the request body
//   console.log('Dashboard data received:', dashboardData);

//   // Process data or send a response
//   res.json({ success: true, message: 'Dashboard data processed', data: dashboardData });
// });


// Start the server
app.listen(3001, () => {
    console.log("Server is running");
});
