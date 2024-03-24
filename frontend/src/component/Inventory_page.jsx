import React,{useState,useEffect,useContext} from "react";
import classes from "./inventorypage.module.css"
import { FaPlus } from "react-icons/fa";
import axios from 'axios';
import {backendUrl} from "../constant";
import LoginContext from "../store/context/loginContext";
// const data = [
//     {name:"Bat"},
//     {name:"Football"},
//     {name:"Badminton Racket"},
//     {name:"Table tennis"}
// ] ;



const Invenotory_Page=()=>{
    const Loginctx = useContext(LoginContext);
    const [data,setData] = useState([]);

    useEffect(()=>{

        const fetchdata = async () => {
    try {
        const resp = await axios.get(backendUrl + '/api/v1/inventory',{
            headers:{
                Authorization:`Bearer ${Loginctx.AccessToken}`
            }
        });
        console.log(resp.data);
        const data = resp.data;
        const items = data.inventoryItems;
        setData(items);
        return items;
    } catch(err) {
        console.log(err);
    }
};
    fetchdata();
    },[])
   return(<div className={classes.Body}>
         <h1 className={classes.title}>Welcome to SAC Inventory</h1>
         <div className={classes.eqp}>
            <h5 style={{margin:'30px'}}> <FaPlus color="blue" /> Add Equipment</h5>
             <ul>
                {data.map((ele,ind)=>{
                    return(<li key={ind}>{ele.equipment_name}</li>)
                })}
             </ul>
         </div>
         
   </div>)
}

export default Invenotory_Page;