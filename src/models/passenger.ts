interface PassengerR{
    Id: number;
    Name: string;
    Job: string;
    Email: string;
    Age: number;
}

export default PassengerR;

// public class PassengerR
// {
//     public int Id { get; set; }
//     public String? Name { get; set; }

//     public String? Job { get; set; }
//     public String? Email { get; set; }
//     public int? Age { get; set; }
//     public ICollection<BookingR> bookings { get; set; } = new List<BookingR>();
//     public ICollection<FlightR> flightRs { get; set; } = new List<FlightR>();