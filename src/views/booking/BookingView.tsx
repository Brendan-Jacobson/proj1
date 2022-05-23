import React, { Component , useState, useEffect} from "react";
import BookingR from "../../models/booking";
import APIService from "../../services/apiServices";
import useCollapse from 'react-collapsed';
import EditBooking from '../../components/bookings/EditBooking';
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import PassengerToBooking from "../../components/passengers/PassengerToBooking"
import AddBooking from "../../components/bookings/AddBooking";
//import AddBooking from '../../components/AddPassenger';
import { Axios, AxiosResponse } from 'axios';
import UsefulFunctions from '../../UsefulFunctions';

type BookingViewProps = {
    Bookings: BookingR[];
}

/*class BookingView extends React.Component<BookingViewProps, BookingViewState> {
    render(): React.ReactNode {*/
    const BookingView = (/*props:BookingViewProps*/) => {
        const [bookings,setBookings] = useState<BookingR[]>(new Array<BookingR>())
        const addItemHandler = (Booking:BookingR) => {
            setBookings(Bookings => [...Bookings, Booking]);
        }//
        useEffect(() => {
            APIService.getBookings().then((response: AxiosResponse<Array<BookingR>>) => {
              setBookings(response.data)})

              return(()=>{})
          },[])

          const OnClickDeleteBooking = (id:number) => {
            const updatedBookings = bookings.filter(pass => pass.Id !== id);
            setBookings(updatedBookings);
        }

        return (
            <div className="App container">
                <div className="jumbotron">
                    <h2>Bookings List</h2>
                </div>
                <table>
                    {UsefulFunctions.listToThread(["Id","FlightId","PassengerId",""])}                      
                    <tbody>
                        <AddBooking addItem={addItemHandler}/>
                        {bookings.map( (booking: BookingR) =>  (           
                            <PassengerToBooking key={booking.Id} booking={booking} deleteBooking={OnClickDeleteBooking}/>
                        ))}
                  </tbody>
                </table>
            </div>

        );
    }
export default BookingView;
/*
<React.Fragment key={booking.Id}>
                        <tr id={"booking-" + booking.Id}>
                            <td>{booking.Id}</td>
                            <td>{booking.flightRId}</td>
                            <td>{booking.passengerRId}</td>
                            <td>
                                <LinkContainer to={"/Booking/" + booking.Id}>
                                    <Nav.Link>Select</Nav.Link>
                                </LinkContainer>
                            </td>
                        </tr>
                        </React.Fragment>*/