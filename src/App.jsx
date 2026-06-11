import { useState, createContext, useContext } from 'react'
import { Container, Navbar, NavLink, Card, Col, Row, Button } from 'react-bootstrap'
import DatePicker from 'react-datepicker';
import { BrowserRouter, Link, Route, Router, Routes } from 'react-router'
import { HashLink } from 'react-router-hash-link';
import 'react-datepicker/dist/react-datepicker.css'

//chatgpt code
const AppContext = createContext();
export function AppProvider({ children }) {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [email, setEmail] = useState("");
    const [service, setService] = useState("");
    return (
    <AppContext.Provider
      value={{
        date,
        setDate,
        time,
        setTime,
        email,
        setEmail,
        service,
        setService,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
export const useAppContext = () => useContext(AppContext);

function NavbarMain() {

    return (
    <Navbar className="bg-primary ">
        <Container className='justify-content-start mx-1 p-2 d-flex'>
                <Link className='nav-link bg-secondary px-1 pb-1 me-2 fs-5 rounded' to='/'>Home</Link>
                <Link className='nav-link text-black px-1 ' to='/Book'>Book</Link>
                <Link className='nav-link text-black px-1' to='/Services'>Services</Link>
                <Link className='nav-link text-black px-1' href="/">Bikes</Link>
                <Navbar.Brand className='position-absolute start-50 translate-middle-x text-black'>John's Bikes</Navbar.Brand>
                
               <HashLink className='nav-link text-black  px-5 position-absolute end-0' to='/#Contact'>Contant Us</HashLink> 
        </Container>
    </Navbar>
    );
}

function Home(){

    return (
        <Container>
            <Card className='bg-seconday text-white'>
                <Card.Img src="src\assets\arantxa-aguirrebengoa-HNvf5kFDKOk-unsplash.jpg" className='img-thumbnail ' />
                <Card.ImgOverlay className='d-flex align-items-center justify-content-center'>
                    <Container>
                       <Card.Title className='bg-secondary-subtle mx-5 my-5 text-black p-3'>Serving the community for over 20+ years we are a family owned bike shop dedicated on providing excellent service to you.</Card.Title>

                       <Container className='text-center'>
                            <Button className='mx-2 p-3 bg-secondary'><Link className="nav-link text-black" to="/book">Book</Link></Button>
                            <Button className='mx-2 p-3 bg-secondary'><Link className="nav-link text-black" to="/Services">Services</Link></Button>
                            <Button className='mx-2 p-3 bg-secondary'><Link className="nav-link text-black" to="/">Bikes</Link></Button>
                        </Container>
                    </Container>
                </Card.ImgOverlay>  
            </Card>

                            

            <Container id='Contact' className='justify-content-center'>
                <h3 className="bg-secondary rounded w-50 mx-auto mt-5 p-2 text-center">Contact Us</h3>
                <Container className='bg-secondary-subtle rounded w-25 mt-3 p-2 text-center'>
                    <h6>(613) 555-4322</h6>
                    <h6><Link href="mailto:bikes@johnsbikes.ca">bikes@johnsbikes.ca</Link></h6>
                    <Container className=''>
                        <a className='text-decoration-none' href="https://facebook.com"><img src="src\assets\facebook.svg" class="img-fluid" className='p-3' style={{height: "60px"}} /> </a>
                        <a className='text-decoration-none' href="https://instagram.com"> <img src="src\assets\instagram.svg" class="img-fluid" className='p-3' style={{height: "60px"}} /> </a>
                        <a className='text-decoration-none' href="https://x.com"><img src="src\assets\twitter-x.svg" class="img-fluid" className='p-3' style={{height: "60px"}} /> </a>
                    </Container>
                    <h5>Designed By: Joshua Caron</h5>
                    <Link href="mailto:jcaro033@uottawa.ca">jcaro033@uottawa.ca</Link>
                </Container>
            </Container>
        </Container>
    );
} 

function Book() {
    return (

        <Container >
            <h3 className="bg-primary-subtle w-25 mx-auto mt-5 p-2 text-center">Bookings</h3>
            
            <Container className='bg-primary mt-5 mx-auto w-50'>
                
                {listing("Break Cleaning")}
                {listing("Tire change/repair")}
                {listing("Chain Replacement")}
                {listing("Tune up")}
                {listing("Seat Swap")}
                {listing("Suspension Servicing")}
                {listing("Other")}
            </Container>
        </Container>
    )
}

function listing(Name) {
const {service,setService} = useAppContext();
    return (
    <Container className='d-flex p-3'>
        <h3 className='text-start mx-1'>{Name}</h3>
                <Button className='ms-auto bg-secondary' onClick={() => setService(Name)}><Link className="nav-link text-black" to="/booking">Book</Link></Button>
    </Container>
    )
}

function Booking() {

    const [showDates, setShowDates] = useState(false);

    const {date,setDate} = useAppContext();
    return (

        <Container>
            <h3 className="bg-primary-subtle w-25 mx-auto my-5 p-2 text-center">Bookings</h3>
            <Container className='align-items-center d-flex flex-column'>
                <h3 className="text-center">Dates</h3>
                <DatePicker
                selected={date}
                    onChange={(d) => {setDate(d); setShowDates(true);}}
                    placeholderText='Select Date'
                    className='form-control ' />
                {date != "" && (<Container className='border w-50 mt-2'>
                    <Row className='justify-content-center'>
                {DateButton("3:30PM")}
                {DateButton("4:00PM")}
                {DateButton("5:30PM")}
                </Row>
                </Container>)}
            </Container>
        </Container>

    )

}

function DateButton(newTime) {
const { time, setTime } = useAppContext();

    return (
    <Container className='col-2 m-3 d-flex justify-content-center'>
    
    <Button className=' p-3 bg-secondary' onClick={() => {setTime(newTime);console.log(newTime)}}><Link className="nav-link text-black" to="/Result">{newTime}</Link></Button>
    
    </Container>
    )

}

function Results() {
    const {time, setTime} = useAppContext();
    const {date, setDate} = useAppContext();
    const {service, setService} = useAppContext();

    return (

        <Container>
            

            <Container className="bg-secondary-subtle text-black rounded justify-content-center text-center mx-auto my-5 p-2 w-25">
                <h3 className="">Booking Confirmed!</h3>
                <h5 className="">{service}</h5>
                <h5>{date.toLocaleDateString("en-US",{day: "2-digit", month: "long", year: "numeric",})}</h5>
                <h5>{time}</h5>
            </Container>
        <Container className='text-center'>
        <Button className='bg-secondary text-center justify-content-center text-black rounded mx-auto' onClick={() => {setTime("");setDate(null);setService("");}}><Link className = "nav-link" to="/">Done</Link></Button>
        </Container>
        </Container>

    )
}

function Services() {
   
    return (
    <Container className='' >
        <h3 className="bg-primary rounded p-3 mx-auto my-4 text-center w-25">Services</h3>

        <Row className='g-5 justify-content-center'>
           {servicesCard("./assets/breaks.jpg","Break Cleaning","/BreakCleaning")}
           {servicesCard("./assets/tire.jpg","Tire Change/Repair")}
           {servicesCard("./assets/chain.jpg","Chain Replacement")}
           {servicesCard("./assets/tuneUp.jpg", "Tune up")}
           {servicesCard("./assets/bikeSeat.jpg","Seat Swap")}
           {servicesCard("./assets/bikeSuspention.jpg", "Suspention Servicing")}
        </Row>

    </Container>
    )
}

function BreakCleaning() {

    return (
        <Container className="w-75 my-5">
        <Row className='g-5'>
        <Col>
        <h3 className="my-2 mb-4 text-center">Breaks Cleaning</h3>
          <Card.Img 
             variant="top"
             src="src/assets/tuneUp.jpg"
             className='rounded'
             style={{
                 objectFit: "cover",
                 height: "300px", 
                }}
        />
        </Col>
        <Col>
            <Container className="bg-primary mt-2 h-100 d-flex flex-column">
                <h4 className=" p-2">Replace your worn break pads with brand new high quality break pads, increase your stopping power and improving safety. After installing we check the break alignment to provide a smooth ride.</h4>

                <h2 className="mb-2  text-center rounded mt-auto">Cost $100-$200</h2>
            </Container>
        </Col>
        </Row>

        <Container className = "d-flex">
        <Button className='bg-secondary text-center text-black rounded mt-5 mx-auto p-2'><Link className = "nav-link" to="/Services"><h5>See More Services</h5></Link></Button>
        </Container>
        </Container>
    )
}

function servicesCard(image="https://picsum.photos/1000/1000",Service="Default",page="/") {

    return (
        <Col sm={12} md={6} lg={4}>
    <Card className='bg-primary-subtle p-1'>
        <Card.Img 
             variant="top"
             src={image}
             className='rounded'
             style={{
                 objectFit: "cover",
                 height: "300px",
                 
                }}
        />
        <Card.Title className="text-center">{Service}</Card.Title>
        
        <Button className='bg-secondary text-center justify-content-center text-black rounded mx-auto'><Link className = "nav-link" to={page}>Done</Link></Button>
    </Card>
    </Col>
    )
}

function App() {

    return (
        <AppProvider>
       <BrowserRouter>
        <NavbarMain />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Book" element={<Book />} />
        <Route path="/Booking" element={<Booking />} />
        <Route path="/Result" element={<Results />} />
        <Route path="/Services" element={<Services/>} />
        <Route path="/BreakCleaning" element={<BreakCleaning />} />
        </Routes>
       </BrowserRouter>
        </AppProvider>
    );
}

export default App
