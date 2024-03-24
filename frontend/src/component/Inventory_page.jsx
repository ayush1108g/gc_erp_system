import React from "react";
import classes from "./inventorypage.module.css"
import { FaPlus } from "react-icons/fa";
const data = [
    {name:"Bat"},
    {name:"Football"},
    {name:"Badminton Racket"},
    {name:"Table tennis"}
] ;
const Invenotory_Page=()=>{
   return(<div className={classes.Body}>
         <h1 className={classes.title}>Welcome to SAC Inventory</h1>
         <div className={classes.eqp}>
            <h5 style={{margin:'30px'}}> <FaPlus color="blue" /> Add Equipment</h5>
             <ul>
                {data.map((ele,ind)=>{
                    return(<li key={ind}>{ele.name}</li>)
                })}
             </ul>
         </div>
         
   </div>)
}

export default Invenotory_Page;