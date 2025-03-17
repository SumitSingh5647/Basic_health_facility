const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const bcryptjs = require("bcryptjs");

const app = express();
const PORT = 8000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); // Serve static files


// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/Hospital", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

// Serve Index Page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname,'/public/index.html')); // Ensure you have views/index.ejs
});

// Serve Signup Page
app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname,'/public/signup.html'));
});

// Serve Login Page
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname,'/public/login.html'))
});

// Serve Forgot Password Page
app.get("/forgot-password", (req, res) => {
  res.sendFile(path.join(__dirname,'/public/Forget_Password.html'));// Create views/forgot-password.ejs
});

// Signup Route
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.sendFile(path.join(__dirname,'public/login.html'));
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Save user to database
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.sendFile(path.join(__dirname,'/public/login.html')) // Redirect to login page after successful signup
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.sendFile(path.join(__dirname,'/public/signup.html'))
    }

    // Check if password matches
    console.log("starting");
    const isMatch = await bcryptjs.compare(password, user.password);
    if (isMatch) {
      console.log("ending");
      return res.sendFile(path.join(__dirname, '/public/front.html')); // Redirect to dashboard
    } else {
      return res.send("invalid Credentials");
    }
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Forgot Password Route - Verify Email
app.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.send("User not found");
    }

    // Redirect to reset password page with email
    res.sendFile(path.join(__dirname,'/public/Reset_Password.html'));
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Reset Password Route
// Reset Password Route - Update Password in DB
app.post("/reset-password", async (req, res) => {

  try {
    const { email, newPassword } = req.body;

    console.log("Reset request received for:", email, newPassword); // Debugging

    // Validate input
    if (!email || !newPassword) {
      return res.status(400).send("Email and new password are required.");
    }

    // Hash new password
    const hashedPassword = await bcryptjs.hash(newPassword, 10);
    console.log("Hashed Password:", hashedPassword); // Debugging

    // Update user password
    const updatedUser = await User.findOneAndUpdate(
      { email }, 
      { password: hashedPassword },
      { new: true } // Returns the updated document
    );

    if (!updatedUser) {
      console.log("User not found, password not updated.");
      return res.status(404).send("User not found.");
    }

    console.log("Password updated successfully!");
    res.sendFile(path.join(__dirname, "/public/login.html")); // Redirect to login page
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).send("Internal Server Error");
  }
});


// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});






// // Another Code

// const express = require("express");
// const mongoose = require("mongoose");
// const path = require("path");
// const bodyParser = require("body-parser");
// const bcryptjs = require("bcryptjs");
// const jwt = require("jsonwebtoken"); // JWT for token-based authentication

// const app = express();
// const PORT = 8000;
// const SECRET_KEY = "your_secret_key"; // Use environment variables in production

// // Middleware
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, "public"))); // Serve static files

// // MongoDB Connection
// mongoose
//   .connect("mongodb://localhost:27017/Hospital", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log("MongoDB Connection Error:", err));

// // User Schema
// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
// });

// const User = mongoose.model("User", userSchema);

// // Serve Index Page
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "/public/index.html"));
// });

// // Serve Signup Page
// app.get("/signup", (req, res) => {
//   res.sendFile(path.join(__dirname, "/public/signup.html"));
// });

// // Serve Login Page
// app.get("/login", (req, res) => {
//   res.sendFile(path.join(__dirname, "/public/login.html"));
// });

// // Serve Forgot Password Page
// app.get("/forgot-password", (req, res) => {
//   res.sendFile(path.join(__dirname, "/public/Forget_Password.html"));
// });

// // Signup Route
// app.post("/signup", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.sendFile(path.join(__dirname, "/public/login.html"));
//     }

//     // Hash the password
//     const hashedPassword = await bcryptjs.hash(password, 10);

//     // Save user to database
//     const newUser = new User({ name, email, password: hashedPassword });
//     await newUser.save();

//     res.sendFile(path.join(__dirname, "/public/login.html"));
//   } catch (error) {
//     console.error("Signup Error:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// // Login Route
// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.sendFile(path.join(__dirname, "/public/signup.html"));
//     }

//     // Check if password matches
//     const isMatch = await bcryptjs.compare(password, user.password);
//     if (isMatch) {
//       return res.sendFile(path.join(__dirname, "/public/front.html"));
//     } else {
//       return res.send("Invalid Credentials");
//     }
//   } catch (error) {
//     console.error("Login Error:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// // Forgot Password Route - Generate JWT Token
// app.post("/forgot-password", async (req, res) => {
//   try {
//     const { email } = req.body;

//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).send("User not found");
//     }

//     // Generate JWT token (expires in 2 minutes)
//     const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "2m" });

//     // Send token in response (or normally via email)
//     res.json({ token, resetUrl: `http://localhost:${PORT}/reset-password?token=${token}` });
//   } catch (error) {
//     console.error("Forgot Password Error:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// // Serve Reset Password Page
// app.get("/reset-password", (req, res) => {
//   res.sendFile(path.join(__dirname, "/public/Reset_Password.html"));
// });

// // Reset Password Route - Verify JWT & Update Password
// app.post("/reset-password", async (req, res) => {
//   try {
//     const { token, newPassword } = req.body;

//     if (!token) {
//       return res.status(400).send("Invalid or expired token.");
//     }

//     // Verify the token
//     jwt.verify(token, SECRET_KEY, async (err, decoded) => {
//       if (err) {
//         return res.status(400).send("Token expired or invalid.");
//       }

//       const email = decoded.email;

//       // Hash new password
//       const hashedPassword = await bcryptjs.hash(newPassword, 10);

//       // Update user password
//       const updatedUser = await User.findOneAndUpdate(
//         { email },
//         { password: hashedPassword },
//         { new: true }
//       );

//       if (!updatedUser) {
//         return res.status(404).send("User not found.");
//       }

//       res.sendFile(path.join(__dirname, "/public/login.html"));
//     });
//   } catch (error) {
//     console.error("Reset Password Error:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// // Start Server
// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });
