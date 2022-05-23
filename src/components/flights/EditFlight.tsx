import React, { useEffect, useState } from 'react'
import FlightR from '../../models/flight'
import APIService from "../../services/apiServices";
import { Axios, AxiosResponse } from 'axios';
//import Button from './Button'
import Combobox from "react-widgets/Combobox";
import DatePicker from "react-widgets/DatePicker";
import TimeInput from "react-widgets/TimeInput";
import NumberPicker from "react-widgets/NumberPicker";
import "react-widgets/styles.css";
import '../../App.css'
import UsefulFunctions from '../../UsefulFunctions';
import { setgroups } from 'process';

type EditFlightProp = {
    //id2: number
    editVisible: boolean
    Airports: string[]
    flight: FlightR
    modifyItem: (flight: FlightR) => void
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
const EditFlight = (props:EditFlightProp) => {
    const [DepartureTime, setDepartureTime] = useState<Date | null | undefined>(new Date(''))
    const [ArrivalTime, setArrivalTime] = useState<Date | null | undefined>(new Date(''))
    const [DepartureDate, setDepartureDate] = useState<Date | null | undefined>(new Date(''))
    const [ArrivalDate, setArrivalDate] = useState<Date | null | undefined>(new Date(''))
    const [DepartureAirport, setDepartureAirport] = useState('')
    const [ArrivalAirport, setArrivalAirport] = useState('')
    const [PassengerLimit, setPassengerLimit] = useState<number| null>(160)

    useEffect(()=>{

        return(()=>{})
    },[])

    useEffect(()=>{

    },[props.flight.DepartureAirport])
    
    

    const setThePost = () =>{

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

        let prod = {
            "Id" : props.flight.Id,
            "DepartureTime": UsefulFunctions.timeToDateTime(DepartureTime),
            "ArrivalTime": UsefulFunctions.timeToDateTime(ArrivalTime),
            "DepartureDate": UsefulFunctions.JSDateToDateTime(DepartureDate),
            "ArrivalDate": UsefulFunctions.JSDateToDateTime(ArrivalDate),
            "DepartureAirport": DepartureAirport,
            "ArrivalAirport": ArrivalAirport,
            "PassengerLimit": PassengerLimit
        }

        console.log(prod)
        let FlightProm = APIService.putFlightR(prod,prod.Id);

        FlightProm.then((res) => {
            props.modifyItem(res.data);
        })
        window.location.replace(window.location.href);

    }

    return (
        <tr className={props.editVisible ? "" : "hidekids"}>
            <td></td>
            <td><Combobox hideCaret hideEmptyPopup  data = {props.Airports} placeholder="Departure Airport" onChange={value => setDepartureAirport(value)}/> </td>
            <td><Combobox hideCaret hideEmptyPopup  data={props.Airports} placeholder="Arrival Airport" onChange={value => setArrivalAirport(value)}/> </td>            
            <td><DatePicker placeholder="m/dd/yy" value={new Date()} onChange={value => {setDepartureDate(value)}}/></td>
            <td><TimeInput style={{ width: "auto" }} value={new Date()} onChange={value => {setDepartureTime(value)}}/></td>
            <td><DatePicker placeholder="m/dd/yy" value={new Date()} onChange={value => {setArrivalDate(value)}}/></td>
            <td><TimeInput style={{ width: "auto" }} value={new Date()} onChange={value => {setArrivalTime(value)}}/></td>
            <td><NumberPicker defaultValue={0} onChange={value => {setPassengerLimit(value)}}/></td>
            <td><span role="button" className="material-icons"  onClick={setThePost} >check_circle</span></td>
        </tr>
    )
}

export default EditFlight;