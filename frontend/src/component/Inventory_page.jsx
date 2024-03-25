import React, { useState, useEffect, useContext } from "react";
import classes from "./inventorypage.module.css"
import { FaPlus } from "react-icons/fa";
import axios from 'axios';
import { backendUrl } from "../constant";
import LoginContext from "../store/context/loginContext";
import { useNavigate } from "react-router"
import image5 from "../assets/5.jpg"
import image6 from "../assets/6.jpg"
import image7 from "../assets/7.jpg"
import image8 from "../assets/8.jpg"
import image9 from "../assets/9.jpg"
// const data = [
//     {name:"Bat"},
//     {name:"Football"},
//     {name:"Badminton Racket"},
//     {name:"Table tennis"}
// ] ;

const imgarr = [image5,image9,image7,image8,image6]

const Invenotory_Page = () => {

    const Loginctx = useContext(LoginContext);
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        const fetchdata = async () => {
            try {
                const resp = await axios.get(backendUrl + '/api/v1/inventory', {
                    headers: {
                        Authorization: `Bearer ${Loginctx.AccessToken}`
                    }
                });
                console.log(resp.data);
                const data = resp.data;
                const items = data.inventoryItems;
                setData(items);
                return items;
            } catch (err) {
                console.log(err);
            }
        };
        fetchdata();
    }, []);

    const openInvetoryForm = (equipmentId) => {
        navigate(`/inventory/${equipmentId}`);
        console.log(equipmentId);
    };

    const addInvetoryForm = () => {
        navigate('/add_inventory_item');
    };

    return (<div className={classes.Body}>
        <h1 className={classes.title}>Welcome to SAC Inventory</h1>
        <div className={classes.eqp}>
            <h5 style={{ margin: '30px' , marginLeft:'10%'}}> <FaPlus color="blue" /> Add Equipment</h5>
            <ul>
                {data.map((ele, ind) => {
                    return (<li onClick={() => openInvetoryForm(ele._id)} key={ind}>
                           <img src={imgarr[ind%5]} alt="" className={classes.img}/>
                        
                        <div className={classes.name}>
                        {ele.equipment_name}
                        </div>
                        </li>)
                })}
            </ul>
        </div>

    </div>)
}

export default Invenotory_Page;