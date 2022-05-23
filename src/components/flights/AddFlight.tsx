import React, { useState } from 'react'
import FlightR from '../../models/flight'
import APIService from "../../services/apiServices";
import { Axios, AxiosResponse } from 'axios';
//import Button from './Button'
import "react-widgets/styles.css";
import '../../App.css'
import Combobox from "react-widgets/Combobox";
import DatePicker from "react-widgets/DatePicker";
import TimeInput from "react-widgets/TimeInput";
import NumberPicker from "react-widgets/NumberPicker";


import UsefulFunctions from '../../UsefulFunctions';

type AddFlightProp = {
    Airports: string[]
    addItem: (flight: FlightR) => void
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
const AddFlight = (props:AddFlightProp) => {
    const [DepartureTime, setDepartureTime] = useState<Date | null | undefined>(new Date(''))
    const [ArrivalTime, setArrivalTime] = useState<Date | null | undefined>(new Date(''))
    const [DepartureDate, setDepartureDate] = useState<Date | null | undefined>(new Date())//)//
    const [ArrivalDate, setArrivalDate] = useState<Date | null | undefined>(new Date(''))
    const [DepartureAirport, setDepartureAirport] = useState('')
    const [ArrivalAirport, setArrivalAirport] = useState('')
    const [PassengerLimit, setPassengerLimit] = useState<number| null>(160)
    const setThePost = () =>{
        /*console.log(DepartureAirport)
        console.log(ArrivalAirport)
        console.log(DepartureDate)
        console.log(UsefulFunctions.JSDateToDateTime(DepartureDate))
        console.log(ArrivalDate)
        console.log(DepartureTime)
        console.log(ArrivalTime)
        console.log(PassengerLimit)*/
        // Check if the service name input field is empty
        if(!DepartureTime){
            alert('Please enter a Departure Time')
            return
        }

        if(!ArrivalTime){
            alert('Please enter an ArrivalTime')
            return
        }
        if(!DepartureDate){
            alert('Please enter a Departure Date')
            return
        }

        if(!ArrivalDate){
            alert('Please enter an Arrival Date')
            return
        }
        if(!DepartureAirport){
            alert('Please enter a Departure Airport')
            return
        }

        if(!ArrivalAirport){
            alert('Please enter an Arrival Airport')
            return
        }
        if(!PassengerLimit){
            alert('Please enter an Passenger Limit')
            return
        }

        // Create json to send to service
        let prod = {
            Id: 0,
            "DepartureTime": UsefulFunctions.timeToDateTime(DepartureTime),
            "ArrivalTime": UsefulFunctions.timeToDateTime(ArrivalTime),
            "DepartureDate": UsefulFunctions.JSDateToDateTime(DepartureDate),
            "ArrivalDate": UsefulFunctions.JSDateToDateTime(ArrivalDate),
            "DepartureAirport": DepartureAirport,
            "ArrivalAirport": ArrivalAirport,
            "PassengerLimit": PassengerLimit
        }

        // Use service to send post json and to add the account
        let FlightProm = APIService.postFlightR(prod);

        FlightProm.then((res) => {
            //setItem(res.data);
            props.addItem(res.data);
        })
        
        

        // Clear the form text fields
        setDepartureTime(new Date(''))
        setArrivalTime(new Date(''))
        setDepartureDate(new Date(''))
        setArrivalDate(new Date(''))
        setDepartureAirport('')
        setArrivalAirport('')
        setPassengerLimit(160)
    }
    //const saveText:string = "Save"//const setDepartureDate: React.Dispatch<React.SetStateAction<Date>>
    return (//selected={startDate} onChange={date => date && setStartDate(date)}
        <tr >
            <td></td>
            <td><Combobox hideCaret hideEmptyPopup data = {props.Airports} placeholder="Departure Airport" onChange={value => setDepartureAirport(value)}/> </td>
            <td><Combobox hideCaret hideEmptyPopup data={props.Airports} placeholder="Arrival Airport" onChange={value => setArrivalAirport(value)}/> </td>            
            <td><DatePicker placeholder="m/dd/yy" onChange={value => {setDepartureDate(value)}}/></td>
            <td><TimeInput style={{ width: "auto" }} onChange={value => {setDepartureTime(value)}}/></td>
            <td><DatePicker placeholder="m/dd/yy" onChange={value => {setArrivalDate(value)}}/></td>
            <td><TimeInput style={{ width: "auto" }} onChange={value => {setArrivalTime(value)}}/></td>
            <td><NumberPicker defaultValue={0} onChange={value => {setPassengerLimit(value)}}/></td>
            <td><span role="button" className="material-icons-none"  onClick={setThePost} >check_circle</span></td>
        </tr>
    )
}
//<input type='text' placeholder='Add Departure Airport' value={DepartureAirport} onChange={(e) => setDepartureAirport(e.target.value)} />
//<input type='text' placeholder='Add ArrivalAirport' value={ArrivalAirport} onChange={(e) => setArrivalAirport(e.target.value)} />
//<input type='text' placeholder='Add Departure Date' value={DepartureDate} onChange={(e) => setDepartureDate(e.target.value)} />
//<input type='text' className='standard' placeholder='Add Departure Time' value={DepartureTime} onChange={(e) => setDepartureTime(e.target.value)} />
//<input type='text' placeholder='Add Arrival Date' value={ArrivalDate} onChange={(e) => setArrivalDate(e.target.value)} />
//<input type='text' placeholder='Add Arrival Time' value={ArrivalTime} onChange={(e) => setArrivalTime(e.target.value)} />
//<input type='text' placeholder='Add Passenger Limit' value={PassengerLimit} onChange={(e) => setPassengerLimit(e.target.value)} />
//
export default AddFlight;