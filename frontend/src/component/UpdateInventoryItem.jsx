import React , {useState, useContext, useEffect} from "react";
import classes from "./addinventoryitem.module.css"
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { backendUrl } from "../constant";
import LoginContext from "../store/context/loginContext";

const UpdateInventoryItem = ()=>{
    const navigate = useNavigate();
    const Loginctx = useContext(LoginContext);
    const [quantity, setQuantity] = useState("");
    const {equipmentId} = useParams();

      const updateEquipment = async (e) => {
        e.preventDefault();

        try {
            const requestBody = {
                equipmentId: equipmentId,
                available_quantity: quantity
            };
            console.log(requestBody);
            const response = await axios.patch(
                `${backendUrl}/api/v1/inventory`,
                requestBody,
                {
                    headers: {
                    Authorization: `Bearer ${Loginctx.AccessToken}`,
                    },
                }
            );

            console.log("Item Updated successfully:", response.data);
            setQuantity("");
            alert("Item Updated!");
            navigate('/inventory');
            
        } catch (error) {
            console.error("Error updating Item:", error);
        }
    };

    return(<>
          <h3 className={classes.title}>Update Equipment</h3>
        <form className={classes.inputform}>
            <div class="mb-3">
                <label for="2" class="form-label">Available Quantity</label>
                <input 
                    type="text" 
                    class="form-control" 
                    id="2" 
                    value={quantity}
                    onChange={(e)=>setQuantity(e.target.value)}
                />
            </div>
         
            <button type="submit" class="btn btn-primary" onClick={(e)=>updateEquipment(e)}>Update</button>
        </form>

    </>)
}

export default UpdateInventoryItem;