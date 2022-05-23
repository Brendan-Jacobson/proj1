import React, { useEffect, useState } from 'react'
import PassengerR from '../../models/passenger'
import APIService from "../../services/apiServices";
import { Axios, AxiosResponse } from 'axios';
//import Button from './Button'
import '../../App.css'

type AddPassengerProp = {
    //visibility: string
    addItem: (passengerA: PassengerR) => void
};
const AddPassenger = (props:AddPassengerProp) => {
    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [Job, setJob] = useState('')
    const [Age, setAge] = useState('')
    const [classs, setclasss] = useState("block")
    //let classs = "block"
   /*const changeHide=()=>{
        classs == "block" ? setclasss("none"):setclasss("block")
    }*/

    //useEffect(()=>

    //)
    const setThePost = () =>{

        // Check if the service name input field is empty
        if(!Name){
            alert('Please enter a Name')
            return
        }

        if(!Email){
            alert('Please enter an Email')
            return
        }

        if(!Job){
            alert('Please enter a Job')
            return
        }

        if(!Age){
            alert('Please enter an Age')
            return
        }

        // Create json to send to service
        let prod = {
            "Id": 0,
            "Name": Name,
            "Email": Email,
            "Job": Job,
            "Age": parseInt(Age)
        }

        // Use service to send post json and to add the account
        let PassengerProm = APIService.postPassengerR(prod);

        PassengerProm.then((res) => {
            //setItem(res.data);
            props.addItem(res.data);
        })
        
        

        // Clear the form text fields
        setName('')
        setJob('')
        setEmail('')
        setAge('')
    }
    //const saveText:string = "Save"
    return (
        <tr>
            <td></td>
            <td><input  type='text' placeholder='Add Name' default-value={Name} onChange={(e) => setName(e.target.value)} /></td>
            <td><input  type='text' placeholder='Add Email' default-value={Email} onChange={(e) => setEmail(e.target.value)} /></td>
            <td><input  type='text' placeholder='Add Job' default-value={Job} onChange={(e) => setJob(e.target.value)} /></td>
            <td><input  type='text' placeholder='Add Age' default-value={Age} onChange={(e) => setAge(e.target.value)} /></td>
            <td><span role="button" className="material-icons" onClick={setThePost}>check_circle</span></td>
        </tr>
    )
}
//<div className = {props.visibility}><span role='button' color='steelblue' onClick={setThePost}>check_circle</span></div></td>
//<td><input className = {classs} type='Button' color='steelblue' value="hide" onClick={changeHide} /></td>
export default AddPassenger;