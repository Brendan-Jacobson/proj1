import React, { useState } from 'react'
import BookingR from "../../models/booking"
import FlightR from '../../models/flight'
import APIService from "../../services/apiServices";
import { Axios, AxiosResponse } from 'axios';
//import Button from './Button'

type AddBookingProp = {
    addItem: (Booking: BookingR) => void
    //editVisible: true
};
/*
    Id: number;
    DepartureTime: string;
    ArrivalTime: string;
    DepartureDate: string;
    ArrivalDate: string;
    DepartureAirport: string;
    ArrivalAirport: string;
    PassengerLimit: number;
*/
const AddBooking = (props:AddBookingProp) => {
    const [Id, setId] = useState('0')
    const [FlightId, setFlightId] = useState('')
    const [PassengerId, setPassengerId] = useState('')
    const setThePost = () =>{

        // Check if the service name input field is empty

        if(!FlightId){
            alert('Please enter an Flight Id')
            return
        }
        if(!PassengerId){
            alert('Please enter a Passenger Id')
            return
        }

        // Create json to send to service
        let prod = {
            "Id": 0,
            "flightRId": parseInt(FlightId),
            "passengerRId": parseInt(PassengerId),
        }

        // Use service to send post json and to add the account
        //let BookingProm = APIService.postBookingRApart(parseInt(FlightId),parseInt(PassengerId))
        let BookingProm = APIService.postBookingR(prod);

        BookingProm.then((res) => {
            //setItem(res.data);
            props.addItem(res.data);
        })
        
        // Clear the form text fields
        setFlightId('')
        setPassengerId('')
        //window.location.replace(window.location.href);
    }
    //const saveText:string = "Save"
    return (
        <tr className={""/*props.editVisible ? "" : "hidekids"*/}>
            <td></td>
            <td><input type='text' placeholder='Add Flight Id' /*value={FlightId}*/ onChange={(e) => setFlightId(e.target.value)} /></td>
            <td><input type='text' placeholder='Add Passenger Id' /*value={PassengerId}*/ onChange={(e) => setPassengerId(e.target.value)} /></td>            
            <td><input type='Button' color='steelblue' value="Save" onClick={setThePost} /></td>
        </tr>
    )
}

export default AddBooking;