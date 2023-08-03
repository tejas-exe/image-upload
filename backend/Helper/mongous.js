const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb+srv://farEastMovement:8347775181@nodedemo.6hwdhzx.mongodb.net/?retryWrites=true&w=majority`
  )
  .then((res) => {
    console.log("Mongoose Connected Sucessfully");
  })
  .catch((err) => {
    console.log(err);
  });
