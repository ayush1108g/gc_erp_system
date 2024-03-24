import React from "react";
import classes from './inventoryform.module.css'
import { useState } from 'react'

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



  console.log()
  return (<>
    <h1 className={classes.title}>Equipment Name</h1>
    <div className={classes.gridContainer}>
      <div class={classes.gridItem}>
        <div>Sports : </div>
        <div className={classes.yoyo}>Lorem, ipsum.</div>
      </div>
      <div class={classes.gridItem}>
        <div> Quantity Available: </div>
        <div className={classes.yoyo}>Lorem, ipsum.</div>
      </div>
      <div class={classes.gridItem}>
        <div>Total Quanity : </div>
        <div className={classes.yoyo}>Lorem, ipsum.</div>
      </div>
      <div class={classes.gridItem}>
        <div>Last Updated : </div>
        <div className={classes.yoyo}>Lorem, ipsum.</div>
      </div>
    </div>

    <table className={classes.issueTable}>
      <thead>
        <th>Roll number</th>
        <th>Quantity issued</th>
      </thead>
      <tbody>

        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.roll_number}</td>
            <td>{item.quantity_issued}</td>
          </tr>
        ))}
      </tbody>
    </table>


    <div className={classes.button}>
      <h2 className={classes.title}>To Issuue the Component Click Below</h2>
      <button type="button" class={` btn btn-success`}>Issue the Equipment</button>
    </div>

  </>)
}

export default Inventory_form;