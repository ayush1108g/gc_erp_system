import React from "react";
import classes from "./inventorypage.module.css"
const data = [
    {name:"Bat"},
    {name:"Football"},
    {name:"Badminton Racket"},
    {name:"Table tennis"}
] ;
const Invenotory_Page=()=>{
   return(<>
         <h1 className={classes.title}>Welcome to SAC Inventory</h1>
         <div className={classes.eqp}>
            <h2 style={{margin:'5vw'}}>Equipments list </h2>
             <ul>
                {data.map((ele,ind)=>{
                    return(<li key={ind}>{ele.name}</li>)
                })}
             </ul>
         </div>
         
   </>)
}

export default Invenotory_Page;