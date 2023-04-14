const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoute = require("./routes/users");
const path = require("path");

dotenv.config();
app.use(express.json());
const Port = process.env.PORT || 5000;

mongoose
  .connect(process.env.URL)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
})


app.use("/api", userRoute);


// app.use(express.static(path.join(__dirname, "/client/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/client/build", "index.html"));
// });

app.listen(Port, () => {
  try{
    console.log(`Backend is running at ${Port}`);
  }catch(err){
    console.log("Backend error",err)
  }
});
