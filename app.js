const express = require('express');
const ejs = require('ejs');
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.use(express.static("public"))

// Define a route to render your EJS template
app.get('/', (req, res) => {
  // Render the EJS template with data
  res.render('home.ejs');
});
app.get('/req', (req, res) => {
  // Render the EJS template with data
  res.render('req.ejs',{name:"Ahmed",loc:"Havelian"});
});

app.listen(3000,()=>{
  console.log("Server is Running");
})