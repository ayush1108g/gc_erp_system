import React from "react";
import classes from "./addinventoryitem.module.css"


const Add_inventory_item = ()=>{
    return(<>
          <h3 className={classes.title}>Add Equipment</h3>
        <form className={classes.inputform}>
            <div class="mb-3">
                <label for="1" class="form-label">Equipment Name</label>
                <input type="text" class="form-control" id="1" aria-describedby="emailHelp" />
            </div>
            <div class="mb-3">
                <label for="2" class="form-label">Total Quantity</label>
                <input type="text" class="form-control" id="2" />
            </div>
         
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>

    </>)
}

export default Add_inventory_item;