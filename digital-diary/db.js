import sqlite3 from "sqlite3"; // npm provide main sqlite3 package to connected mysql database

const sqlite = sqlite3.verbose(); //verbose method give permision to perform multiple operation like crud

const db = new sqlite.Database("./diary",(err)=>{
    if(err){
      console.log(err);
    }else{
    console.log("Database connected properly");
    }
}); // we can create object database

db.serialize(() => { //this serialize function perform the synchrounous operation
  db.run(`CREATE TABLE IF NOT EXISTS entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    mood TEXT NOT NULL,
    entry TEXT NOT NULL
  )`); //usually it created table
});

export {db}; // export the package db 
