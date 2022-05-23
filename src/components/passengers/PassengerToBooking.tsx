import React , {useState} from 'react'
import BookingR from '../../models/booking'
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import useCollapse from 'react-collapsed';
import AddPassenger from './AddPassenger';
import APIService from "../../services/apiServices";
import EditBooking from '../bookings/EditBooking';
import "react-widgets/styles.css";
import '../../App.css'

type props = {
    booking: BookingR
    deleteBooking: (bookingId: number) => void
    //addItem: (bookingA: BookingR) => void
}

const PassengerToBooking = (props:props) => {        
    const [booking,setBooking] = useState(props.booking)
    const [visibility, setvisiblity] = useState(false)
    const changeHide=()=>{
        setvisiblity(!visibility)
      }

      function OnDeleteBooking(id:number){
        let FlightProm = APIService.deleteBookingR(id);

        FlightProm.then((res) => {
            //setItem(res.data);
            //props.addItem(res.data);
        })
      }
    const modifyItemHandler = (bookingA:BookingR) => {
        setBooking(x=> bookingA);
    }
    return(
    <React.Fragment key={props.booking.Id}>
    <tr id={"booking-" + props.booking.Id}>
        <td>{props.booking.Id}</td>
        <td>
            <LinkContainer to={"/Flight/" + props.booking.flightRId}>
                <Nav.Link>{props.booking.flightRId}</Nav.Link>
            </LinkContainer>
        </td>
        <td>
            <LinkContainer to={"/Passenger/" + props.booking.passengerRId}>
                <Nav.Link>{props.booking.passengerRId}</Nav.Link>
            </LinkContainer>
        </td>
        <td><span role="button" className="material-icons"  onClick={()=>props.deleteBooking(props.booking.Id)} >delete</span></td>
        <td><span role="button" className="material-icons"  onClick={changeHide} >edit</span></td>
        
    </tr>
    {visibility?<EditBooking booking={props.booking} modifyItem={modifyItemHandler}/>:<tr></tr>}
    </React.Fragment>
    
    )
}
export default PassengerToBooking;//