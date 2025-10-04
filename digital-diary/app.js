import express from "express"; // firstly we inialize the express frmaework
import path from "path"; // this package give us current path 
import { db } from "./db.js";
const app = express(); // we can assign the app 

const join = path.join("./public");
console.log(join);
app.use(express.static("../public")); // we can create static website 

app.use(express.json()); // usually used to convert data in exprress json format

app.use(express.urlencoded({extended:false}));

app.post("/api/entries",(req,res)=>{
  try{
   const {date,mood,entry} = req.body;
   db.run("INSERT INTO entries(date,mood,entry) VALUES(?,?,?)",[date,mood,entry],(err)=>{
    if(err){
     res.status(501).send({
      statusCode:501,
      message:'Failed to Insert Data',
     });
    }else{
      res.status(201).send({
        message:"Data Inserted Succesfully"
      });  
    }
   });
  }catch(error){
    res.status(401).status({
     statusCode:401,
     message:"Error Failed",
    });
  }
}); // this is handlebar usually to modified the request and response


app.get("/api/entries",(req,res)=>{
  try{
   db.all("SELECT * FROM entries",(err,rows)=>{
    if(err){
      res.status(401).send({
         message:"Error Fetching entries"
      });
    }else{
        res.status(201).json(rows);
    }
   });
  }catch(error){
    res.status(401).send({
     statusCode:401,
     message:"Error Cant finding data",
    });
  }
});

app.delete("/api/entries/:id",(req,res)=>{
 let id = req.params.id;
    try{
     db.run("DELETE FROM entries where id=?",[id],(err)=>{
        if(err){
         res.status(401).send({
             statusCode:401,
             message:"data not Deleted Error Raise",
             error:err
         });
         }else{
          res.status(201).send({
            statusCode:201,
            message:"Deleted Data Succesfully",
           signal:"Green",  
        }); 
         }
     });
   }catch(error){
    res.status(401).send({
       statusCode:401,
       message:"Cant Deleted Data in Database",
    });
   }  
});

app.listen(3000, () => {  // this is main function used to create the server assign in 3000
    console.log("Server started on port 3000");
});