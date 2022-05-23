import React , {useEffect, useState} from "react";
import APIService from "../../services/apiServices";
import { Axios, AxiosResponse } from 'axios';
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import PassengerR from "../../models/passenger";
import AddPassenger from '../../components/passengers/AddPassenger';
import '../../App.css'
//import PassengerR from "../../models/passenger";

type PassengerListViewProps = {
    passengers: PassengerR[];
}

function instanceOfA(object: any): object is PassengerR[] {
  return 'member' in object;
}

/*function instanceOf<Type>(object: any): object is <Type> {
  return 'member' in object;
}*/

/*class PassengerView extends React.Component<PassengerListViewProps, PassengerListViewState> {
    render(): React.ReactNode {*/
    
const PassengerView = () => {
    const [passengers,setPassengers] = useState<PassengerR[]>(new Array<PassengerR>())
    useEffect(() => {
        APIService.getPassengers().then((response: AxiosResponse<Array<PassengerR>>) => {
          setPassengers(response.data)})

          return(()=>{})
      },[])

    const addItemHandler = (passengerA:PassengerR) => {
      setPassengers(passengersA => [...passengersA, passengerA]);
    }

    const removeItemHandler = (id:number) => {
        const updatedPassengers = passengers.filter(pass => pass.Id !== id);
        setPassengers(updatedPassengers);
    }

    const changeHide=()=>{
      setvisiblity(!visibility)
    }
    const [visibility, setvisiblity] = useState(false)
    const [classs, setclasss] = useState("block")

    return (
        <div>
            <div className="jumbotrondfsa">
                <h2>Passenger List</h2>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Job</th>
                        <th>Age</th>
                        <th><span role="button" className="material-icons" onClick={changeHide}>add_circle_outline</span></th>
                    </tr>
                    {visibility?<AddPassenger addItem={addItemHandler} /*visibility={classs}*//>:(<tr></tr>)}
                </thead>
                
                <tbody>
                
                {passengers.map( (Passenger: PassengerR) =>  (           
                <React.Fragment key={Passenger.Id}>
                  <tr id={"Passenger-" + Passenger.Id} className="tableRow">
                    <td>                      
                        <LinkContainer to={"/Passenger/" + Passenger.Id}>
                            <Nav.Link>{Passenger.Id}</Nav.Link>
                        </LinkContainer></td>
                    <td>{Passenger.Name}</td>
                    <td>{Passenger.Email}</td>
                    <td>{Passenger.Job}</td>
                    <td>{Passenger.Age}</td>
                    <td></td>
                  </tr>
                </React.Fragment>
              ))}
              </tbody>
            </table>
        </div>

    );
}


export default PassengerView;