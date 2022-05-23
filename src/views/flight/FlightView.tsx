import React, { Component , useState, useEffect } from "react";
import APIService from "../../services/apiServices";
import FlightR from "../../models/flight";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AddFlight from "../../components/flights/AddFlight";
import { Axios, AxiosResponse } from 'axios';
import UsefulFunctions from '../../UsefulFunctions';
import '../../App.css'

type FlightViewProps = {
    //Flights: FlightR[];
}

type FlightViewState = {


}

const FlightView = () => {
    const [Flights,setFlights] = useState<FlightR[]>([])
    const [Airports,setAirports] = useState<string[]>([])
    useEffect(() => {
        APIService.getFlights().then((response: AxiosResponse<Array<FlightR>>) => {
          setFlights(response.data)})
        APIService.getAirports().then((response: AxiosResponse<Array<string>>) => {
            setAirports(response.data)
        })
        return(()=>{})
      },[])
    const addItemHandler = (flight:FlightR) => {
        setFlights(flights => typeof flights ? [...flights,flight] : [flight]);
    }
    return (
        <div className="App containerfdas">
            <div className="jumbotrondsfaa">
                <h2>Flights List</h2>
            </div>
            <table>
                <thead>
                    <tr>
                    <th>Id</th>
                    <th>Departure Airport</th>
                    <th>Arrival Airport</th>
                    <th>Departure Date</th>
                    <th>Departure Time</th>
                    <th>Arrival Date</th>
                    <th>Arrival Time</th>
                    <th>Passenger Limit</th>
                    <th></th>
                    <th></th>
                    </tr>
                </thead>    
                <tbody>
                    <AddFlight addItem={addItemHandler} Airports={Airports}/>
                    {Flights.map( (flight: FlightR) =>  (           
                        <React.Fragment key={flight.Id}>
                        <tr id={"flight-" + flight.Id} className="tableRow">
                        <td>
                                <LinkContainer to={"/Flight/" + flight.Id}>
                                    <Nav.Link>{flight.Id}</Nav.Link>
                                </LinkContainer></td>
                        <td>{flight.DepartureAirport}</td>
                        <td>{flight.ArrivalAirport}</td>
                        <td>{UsefulFunctions.DateTimeToDate(flight.DepartureDate)}</td>
                        <td>{flight.DepartureTime}</td>
                        <td>{UsefulFunctions.DateTimeToDate(flight.ArrivalDate)}</td>
                        <td>{flight.ArrivalTime}</td>
                        <td>{flight.PassengerLimit}</td>
                        <td></td>
                        </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>

    );
}

export default FlightView;