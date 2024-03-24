import React from "react";
import classes from './inventoryform.module.css'
import { useState, useContext, useEffect } from 'react'
import axios from 'axios';
import LoginContext from "../store/context/loginContext";
import {backendUrl} from "../constant";
import { useParams } from 'react-router-dom';
import { useNavigate} from "react-router"

const data = [
  {
    "roll_number": "001",
    "quantity_issued": 5
  },
  {
    "roll_number": "008",
    "quantity_issued": 2
  },
  {
    "roll_number": "002",
    "quantity_issued": 5
  },
  {
    "roll_number": "003",
    "quantity_issued": 5
  },
  {
    "roll_number": "009",
    "quantity_issued": 8
  },
  {
    "roll_number": "004",
    "quantity_issued": 2
  },
  {
    "roll_number": "005",
    "quantity_issued": 5
  },
  {
    "roll_number": "006",
    "quantity_issued": 3
  },
  {
    "roll_number": "007",
    "quantity_issued": 5
  },
  {
    "roll_number": "000",
    "quantity_issued": 2
  }
];

const Inventory_form = () => {
  
  const Loginctx = useContext(LoginContext);
  const navigate = useNavigate();
  const [equipmentData, setEquipmentData] = useState(null); 
  const { equipmentId } = useParams();
  let isadmin = Loginctx.role === 'admin';

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(backendUrl + '/api/v1/inventory/' + equipmentId, {
          headers: {
            Authorization: `Bearer ${Loginctx.AccessToken}`
          }
        });
        const equipment = response.data.equipment;
        setEquipmentData(equipment);
      } catch (err) {
        console.log(err);
      }
    };
    fetchdata();
  }, [equipmentId, Loginctx.AccessToken]);

  const handleIssueEquipment = async () => {
    console.log("Button Pressed")
    try {
      const response = await axios.post(
        backendUrl + '/api/v1/inventory',
        {
          equipmentId: equipmentId,
          issued_date: new Date().toISOString().slice(0, 10) // Format the date as YYYY-MM-DD
        },
        {
          headers: {
            Authorization: `Bearer ${Loginctx.AccessToken}`
          }
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error('Error issuing equipment:', error);
    }

    navigate('/inventory');
  };

  return (
    <>
      {equipmentData && ( 
        <>
          <h1 className={classes.title}>{equipmentData.equipment_name}</h1>
          <div className={classes.gridContainer}>
            <div className={classes.gridItem}>
              <div> Quantity Available: </div>
              <div className={classes.yoyo}>{equipmentData.available_quantity}</div>
            </div>
            <div className={classes.gridItem}>
              <div>Total Quantity : </div>
              <div className={classes.yoyo}>{equipmentData.total_quantity}</div>
            </div>
            <div className={classes.gridItem}>
              <div>Last Updated : </div>
              <div className={classes.yoyo}>{new Date(equipmentData.last_updated).toLocaleString()}</div>
            </div>
          </div>

          <table className={classes.issueTable}>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Issue Date</th>
              </tr>
            </thead>
            {isadmin && 
              <tbody>
                {equipmentData.issued_to.map((item, index) => (
                  <tr key={index}>
                    <td>{item.student_id}</td>
                    <td>{item.issued_date}</td>
                  </tr>
                ))}
              </tbody>
            }
          </table>

          <div className={classes.button}>
            <h2 className={classes.title}>To Issue the Equipment Click Below</h2>
            <button type="button" className={`btn btn-success`} onClick={(handleIssueEquipment)}>Issue the Equipment</button>
          </div>
        </>
      )}
    </>
  );
};

export default Inventory_form;

