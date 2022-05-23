import BookingR from '../models/booking';
import FlightR from '../models/flight';
import PassengerR from '../models/passenger';
import axios from "axios";


const http = axios.create({
    baseURL: "https://localhost:7010",
    headers: {
        'Content-Type': 'application/json'
    }
});
const getBookings = () => {
    return http.get<Array<BookingR>>("api/BookingRs");
};
const getFlights = () => {
    return http.get<Array<FlightR>>("api/FlightRs");
};
const getPassengers = () => {
    return http.get<Array<PassengerR>>("api/PassengerRs");
};

const getPassenger = (id: number) => {
    return http.get<PassengerR>(`api/PassengerRs/${id}`);
}

const getFlight = (id: number) => {
    return http.get<FlightR>(`api/FlightRs/${id}`);
}

const getPassengerToBookings = (id: number) => {
    return http.get<Array<BookingR>>(`api/BookingRs/${id}/BookingRs`)
}

const getFlightToBookings = (id: number) => {
    return http.get<Array<BookingR>>(`api/FlightRs/${id}/BookingRs`)
}

const postPassengerR = (passenger: PassengerR) => {
    return http.post<PassengerR>(`api/PassengerRs`, passenger)
}

const postBookingRApart = (FlightId:number,PassengerId:number) => {
    return http.post<PassengerR>(`api/BookingR/PassengerR/${PassengerId}/FlightR/${FlightId}`/*, booking*/ )
}

const postFlightR = (flightR: FlightR) => {
    return http.post<FlightR>(`api/FlightRs`, flightR)
}

const postBookingR = (booking: BookingR) => {
    return http.post<BookingR>(`api/BookingRs`, booking)
}

const deletePassengerR = (id: number) => {
    return http.delete<PassengerR>(`api/PassengerRs/${id}`);
};

const deleteFlightR = (id: number) => {
    return http.delete<FlightR>(`api/FlightRs/${id}`);
};

const putPassengerR = (passenger:PassengerR, id:number) => {
    return http.put<PassengerR>(`api/PassengerRs/${passenger.Id}`, passenger);
};

const putBookingR = (booking:BookingR)=>{
    return http.put<BookingR>(`api/BookingRs/${booking.Id}`, booking);
};

const putFlightR = (flight:FlightR, id:number)=>{
    return http.put<FlightR>(`api/FlightRs/${flight.Id}`, flight);
};

const getAirports = () =>{
    return http.get<Array<string>>(`api/FlightRs/Airports`);
}

const deleteBookingR = (id: number)=>{
    return http.delete<BookingR>(`api/BookingRs/${id}`);
}

// const getSongs = () => {
//     return http.get<Array<Song>>("/api/Music");
// };

// const getSong = (id: number) => {
//     return http.get<Song>(`api/Music/${id}`);
// }

// const createSong = (song: Song) => {
//     return http.post<Song>("api/Music", song);
// };

// const updateSong = (song: Song) => {
//     return http.put<Song>(`api/Music/${song.Id}`, song);
// };

// const deleteSong = (id: number) => {
//     return http.delete<Song>(`api/Music/${id}`);
// };

const APIService = {
    getBookings,
    getFlights,
    getPassengers,
    getPassenger ,
    getFlight,
    getPassengerToBookings,
    getFlightToBookings,
    postPassengerR,
    postBookingR,
    postFlightR,
    deletePassengerR,
    deleteBookingR,
    deleteFlightR,    
    putPassengerR,
    putBookingR,
    putFlightR,
    postBookingRApart,
    getAirports

    
    /*getSongs,
    getSong,
    createSong,
    updateSong,
    deleteSong*/
};

export default APIService;