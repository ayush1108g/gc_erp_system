import React, { useState, useEffect, useContext } from "react";
import classes from "./InventoryPage.module.css"
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router"
import axios from 'axios';

import { backendUrl } from "../../constant";
import LoginContext from "../../store/context/loginContext";
import { useSidebar } from "../../store/context/sidebarcontext";

import image5 from "../../assets/5.jpg"
import image6 from "../../assets/6.jpg"
import image7 from "../../assets/7.jpg"
import image8 from "../../assets/8.jpg"
import image9 from "../../assets/9.jpg"

const imgarr = [image5, image9, image7, image8, image6]

const Invenotory_Page = () => {
    const Loginctx = useContext(LoginContext);
    const navigate = useNavigate();
    const { isSidebarOpen } = useSidebar();

    const [data, setData] = useState([]);

    useEffect(() => {
        // Fetch the inventory data from the backend
        const fetchdata = async () => {
            try {
                const resp = await axios.get(backendUrl + '/api/v1/inventory', { headers: { Authorization: `Bearer ${Loginctx.AccessToken}` } });
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

    // Function to navigate to the inventory form
    const openInvetoryForm = (equipmentId) => {
        navigate(`/inventory/${equipmentId}`);
        console.log(equipmentId);
    };

    // Function to navigate to the add inventory form
    const addInvetoryForm = () => {
        navigate('/add_inventory_item');
    };

    return (<div className={classes.Body} style={{ marginLeft: isSidebarOpen ? '210px' : '10px' }}>
        <h1 className={classes.title}>Welcome to SAC Inventory</h1>
        <div className={classes.eqp}>
            {Loginctx?.role === 'admin' && <h5 style={{ margin: '30px', marginLeft: '10%' }}> <FaPlus color="blue" onClick={addInvetoryForm} /> Add Equipment</h5>}
            <ul>
                {data.map((ele, ind) => {
                    return (<li onClick={() => openInvetoryForm(ele._id)} key={ind}>
                        <img src={imgarr[ind % 5]} alt="" className={classes.img} />
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