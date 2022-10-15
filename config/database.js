const mongoose = require ('mongoose');
 const {MONGO_URI} = process.env;

 exports.connect = () => {

    //here we are making a connection to the database
    mongoose
    .connect(MONGO_URI)

    .then(()=>{
        console.log("Successfully connected to the database");

    })

    .catch((error)=>{
        console.log("Database connection failed. exiting now...");
        console.error(error);
        process.exit(1);

    });

 };