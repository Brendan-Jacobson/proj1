import React, {useEffect, useState} from "react";
import APIService from "../../services/apiServices";
import FlightR from "../../models/flight"
import useCollapse from 'react-collapsed';
import { useParams } from "react-router-dom";
import { Axios, AxiosResponse } from 'axios';
import BookingR from '../../models/booking';
import FlightToBooking from "../../components/flights/FlightToBooking"
import PassengerToBooking from "../../components/passengers/PassengerToBooking"
import EditFlight from "../../components/flights/EditFlight";
import UsefulFunctions from '../../UsefulFunctions';
import '../../App.css'

const SingleFlight = () => {
    const { id } = useParams();
    let default_flight: FlightR = {
        Id: 0,
        DepartureTime: '',
        ArrivalTime: '',
        DepartureDate: '',
        ArrivalDate: '',
        DepartureAirport: '',
        ArrivalAirport: '',
        PassengerLimit: 0
    }
    let hoo:BookingR[] = []
    let flight_id: number = (typeof id == 'undefined') ? 0 : parseInt(id);
    const [ isExpanded, setExpanded ] = useState(false);
    const [Flight,setFlight] = useState<FlightR>(default_flight)
    const [bookingsState,setBookings] = useState(hoo)
    const [Airports,setAirports] = useState<string[]>([])
    const [editVisible,setEditVisible] = useState<boolean>(false)
    const modifyItemHandler = (bookingA:FlightR) => {
        setFlight(bookingA);
        window.location.replace(window.location.href);
    }    
    /*const modifyBooking = (bookingA:BookingR) => {
        setFlight(bookingA);
        window.location.replace(window.location.href);
    }   */
    const editVisibility = () => {
        setEditVisible(!editVisible)
    }   
    const OnClickDeleteBooking = (id:number) => {
        const updatedBookings = bookingsState.filter(pass => pass.Id !== id);
        setBookings(updatedBookings);
    }

    function handleDeleteOnClick() {
        APIService.deleteFlightR(flight_id).then((response: AxiosResponse<FlightR>) => {
        setFlight(response.data)})
        window.location.replace("http://localhost:3000/flights");
    }
    useEffect(() => {
        APIService.getFlight(flight_id).then((response: AxiosResponse<FlightR>) => {
        setFlight(response.data)})
        APIService.getFlightToBookings(flight_id).then((response: AxiosResponse<Array<BookingR>>) => {
        setBookings(response.data);}).catch((err: Error) => {console.log(err);});
        APIService.getAirports().then((response: AxiosResponse<Array<string>>) => {
        setAirports(response.data) })
        return(()=>{})             
    },[]);

    return (
    <div>
        <div>
            <div className="jumbotron">
                <h2>Flight</h2>
            </div>
            <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>DepartureAirport</th>
                            <th>ArrivalAirport</th>
                            <th>DepartureDate</th>
                            <th>DepartureTime</th>
                            <th>ArrivalDate</th>
                            <th>ArrivalTime</th>
                            <th>PassengerLimit</th>
                        </tr>
                    </thead>    
                    <tbody>
                      <tr id={"Flight-" + Flight.Id}>
                      <td>{Flight.Id}</td>
                      <td>{Flight.DepartureAirport}</td>
                        <td>{Flight.ArrivalAirport}</td>
                        <td>{UsefulFunctions.DateTimeToDate(Flight.DepartureDate)}</td>
                        <td>{Flight.DepartureTime}</td>
                        <td>{UsefulFunctions.DateTimeToDate(Flight.ArrivalDate)}</td>
                        <td>{Flight.ArrivalTime}</td>
                        <td>{Flight.PassengerLimit}</td>
                        <td><span role='button' className="material-icons" onClick={editVisibility}>edit</span></td>
                        <td><span role='button' className="material-icons" onClick={handleDeleteOnClick}>delete</span></td>
                      </tr>
                        <EditFlight flight={Flight} modifyItem={modifyItemHandler} Airports={Airports} editVisible={editVisible}/>
                    </tbody>
            </table>
        </div>
        <div>
            <div className="jumbotron">
                <h2>Bookings List</h2>
            </div>
            <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>FlightId</th>
                            <th>PassengerId</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>    
                    <tbody>
                        {bookingsState.map( (booking: BookingR) =>  (    
                            <PassengerToBooking key={booking.Id} booking={booking} deleteBooking={OnClickDeleteBooking}/>       
                            //<FlightToBooking key={booking.Id} booking={booking}/>
                        ))}
                  </tbody>
                </table>
        </div>
    </div>
    )
}
export default SingleFlight;