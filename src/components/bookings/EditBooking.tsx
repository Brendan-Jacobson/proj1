import React, { useState } from 'react'
import BookingR from '../../models/booking'
import APIService from "../../services/apiServices";
import { Axios, AxiosResponse } from 'axios';
//import Button from './Button'
import "react-widgets/styles.css";
import '../../App.css'

type EditBookingProp = {
    modifyItem: (bookingA: BookingR) => void;
    booking: BookingR;
    //editVisible: true
};

const EditBooking = (props:EditBookingProp) => {
    //const [Id, setId] = useState(props.booking.Id.toString())
    const [PassengerId, setPassengerId] = useState(props.booking.passengerRId.toString())
    const [FlightId, setFlightId] = useState(props.booking.flightRId.toString())

    const setThePost = () =>{

        // Check if the service name input field is empty
        /*if(!Id){
            alert('Please enter a Name')
            return
        }*/

        if(!PassengerId){
            alert('Please enter an Email')
            return
        }

        if(!FlightId){
            alert('Please enter a Job')
            return
        }
        
        // Create json to send to service
        let prod = {
            "Id": props.booking.Id,
            "passengerRId": parseInt(PassengerId),
            "flightRId": parseInt(FlightId),
        }
        
        // Use service to send post json and to add the account
        let PassengerProm = APIService.putBookingR(prod);

        PassengerProm.then((res) => {
            props.modifyItem(res.data);
        })
        //window.location.replace(window.location.href);
        //window.location.replace("http://localhost:3000/bookings");
        
        
    }
    return (
        <tr>
            <td></td>     
            <td><input type='text'  value={FlightId} onChange={(e) => setFlightId(e.target.value)} /></td>
            <td><input type='text'  value={PassengerId} onChange={(e) => setPassengerId(e.target.value)} /></td>
            <td><span role='Button' className="material-icons" onClick={setThePost} >check_circle</span></td>
            <td></td>
        </tr>
    )
}

export default EditBooking;