import React, {useEffect, useState} from "react";
import APIService from "../../services/apiServices";
import PassengerR from "../../models/passenger"
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import useCollapse from 'react-collapsed';
import { useParams } from "react-router-dom";
import { Axios, AxiosResponse } from 'axios';
import BookingR from '../../models/booking';
import PassengerToBooking from "../../components/passengers/PassengerToBooking"
import EditPassengers from "../../components/passengers/EditPassenger";
import "react-widgets/styles.css";
import '../../App.css'
import EditBooking from "../../components/bookings/EditBooking";


type prop = {

}

const SinglePassenger = () => {

    const { id } = useParams();
    let passenger_id: number = (typeof id == 'undefined') ? 0 : parseInt(id);
    const [passenger,setPassenger] = useState<PassengerR>({Id:0,Name:"",Email:"",Job:"",Age:0})
    const [bookingsState,setBookings] = useState<BookingR[]>([])
    const [ isExpanded, setExpanded ] = useState(false);
    const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });
    const modifyItemHandler = (bookingA:PassengerR) => {
        setPassenger(bookingA);
    }
    const modifyBooking = (bookingA:BookingR) => {
        
    }

    function handleOnClick() {
        setExpanded(!isExpanded);
    }

    
    const OnClickDeleteBooking = (id:number) => {
        const updatedBookings = bookingsState.filter(pass => pass.Id !== id);
        setBookings(updatedBookings);
    }

    function handleDeleteOnClick() {
        APIService.deletePassengerR(passenger_id).then((response: AxiosResponse<PassengerR>) => {
            setPassenger(response.data)})
        window.location.replace("http://localhost:3000/passengers");
    }

    useEffect(() => {
        APIService.getPassenger(passenger_id).then((response: AxiosResponse<PassengerR>) => {
        setPassenger(response.data)})
        APIService.getPassengerToBookings(passenger_id).then((response: AxiosResponse<Array<BookingR>>) => {
        setBookings(response.data);}).catch((err: Error) => {console.log(err);});  
        return (()=>{})    
    },[]);

    return (
    <div>
        <div>
            <div className="jumbotron">
                <h2>Passenger</h2>
            </div>

            <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Job</th>
                            <th>Age</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>    
                    <tbody>
                      <tr id={"Passenger-" + passenger.Id}>
                        <td>{passenger.Id}</td>
                        <td>{passenger.Name}</td>
                        <td>{passenger.Email}</td>
                        <td>{passenger.Job}</td>
                        <td>{passenger.Age}</td>
                        <td><span role="button" className="material-icons"></span></td>
                        <td><span role='button' className="material-icons" onClick={handleDeleteOnClick}>remove_circle</span></td>
                      </tr>
                      <EditPassengers modifyItem={modifyItemHandler} passenger={passenger}/>
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
                        ))}
                  </tbody>
                </table>
        </div>
    </div>
    )
}
/*class SinglePassenger extends React.Component<prop , stateType> {
    constructor(props: prop){
        super(props);
        
    }
    
    componentDidMount(){}
    
    render(): React.ReactNode {
        return (
            <>
            </>
        );
    }
}
*/
/*
<React.Fragment key={booking.Id}>
<tr id={"booking-" + booking.Id}>
    <td>{booking.Id}</td>
    <td>{booking.flightRId}</td>
    <td>{booking.passengerRId}</td>
    <td>
        <LinkContainer to={"/Flight/" + booking.flightRId}>
            <Nav.Link>Select Flight</Nav.Link>
        </LinkContainer>
    </td>
    <td><input type="button" value="Delete Booking"></input></td>
    <td><div type="button" value="Edit Booking" {...getToggleProps({onClick: handleOnClick})}>Edit Booking</div></td>
    
</tr>
</React.Fragment>
*/
export default SinglePassenger;