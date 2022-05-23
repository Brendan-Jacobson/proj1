import React, { useState } from 'react'
import PassengerR from '../../models/passenger'
import APIService from "../../services/apiServices";
import { Axios, AxiosResponse } from 'axios';
//import Button from './Button'
import "react-widgets/styles.css";
import '../../App.css'

type EditPassengerProp = {
    passenger: PassengerR
    modifyItem: (passengerA: PassengerR) => void
};

const EditPassengers = (props:EditPassengerProp) => {
    const [Name, setName] = useState(props.passenger.Name)
    const [Email, setEmail] = useState(props.passenger.Email)
    const [Job, setJob] = useState(props.passenger.Job)
    const [Age, setAge] = useState(props.passenger.Age.toString())
    let classs = "block"

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
            "Id": props.passenger.Id,
            "Name": Name,
            "Email": Email,
            "Job": Job,
            "Age": parseInt(Age)
        }
        console.log(prod," ", props.passenger.Id)
        // Use service to send post json and to add the account
        let PassengerProm = APIService.putPassengerR(prod,prod.Id);

        PassengerProm.then((res) => {
            //setItem(res.data);
            props.modifyItem(res.data);
        })
        window.location.replace(window.location.href);
        //window.location.replace("http://localhost:3000/passengers");

        // Clear the form text fields
    }
    //const saveText:string = "Save"
    return (
        <tr>
            <td></td>
            <td><input className={classs} type='text'  default-value={Name} onChange={(e) => setName(e.target.value)} /></td>
            <td><input type='text'  default-value={Email} onChange={(e) => setEmail(e.target.value)} /></td>
            <td><input type='text'  default-value={Job} onChange={(e) => setJob(e.target.value)} /></td>
            <td><input type='text'  default-value={Age} onChange={(e) => setAge(e.target.value)} /></td>
            <td><span role="button" className="material-icons"  onClick={setThePost} >check_circle</span></td>
        </tr>
    )
}

export default EditPassengers;