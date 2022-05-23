import React , {useState} from 'react'
import BookingR from '../../models/booking'
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import useCollapse from 'react-collapsed';
import AddPassenger from '../passengers/AddPassenger';
import EditBooking from '../bookings/EditBooking';

type props = {
    booking: BookingR
    //addItem: (bookingA: BookingR) => void
}

const PassengerToBooking = (props:props) => {        
    const [ isExpanded, setExpanded ] = useState(false);
    const [booking,setBooking] = useState(props.booking)
    //const [ editId, setEditId] = useState(-1);
    const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });
    const modifyItemHandler = (bookingA:BookingR) => {
        setBooking(x=> bookingA);
    }

    function handleOnClick() {
        setExpanded(!isExpanded);
    }
    return(
    <React.Fragment key={props.booking.Id}>
    <tr id={"booking-" + props.booking.Id}>
        <td>{props.booking.Id}</td>
        <td>{props.booking.flightRId}</td>
        <td>{props.booking.passengerRId}</td>
        <td>
            <LinkContainer to={"/Flight/" + props.booking.flightRId}>
                <Nav.Link>Select Flight</Nav.Link>
            </LinkContainer>
        </td>
        <td><input type="button" value="Delete Booking"></input></td>
        <td><div {...getToggleProps({onClick: handleOnClick})}>Edit Booking</div></td>
        
    </tr>
        <div {...getCollapseProps()}>
                <table>
                 <tbody>
                <div className="content">
                    <EditBooking booking={props.booking} modifyItem={modifyItemHandler}/>
                </div>
                </tbody>
                </table>
        </div>
    </React.Fragment>
    
    )
}
export default PassengerToBooking;//