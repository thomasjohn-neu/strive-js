import { Navbar, Container } from 'react-bootstrap';
export default function Footer(){
    return (
        <div className='backgroundBlack'>
           <Navbar className='backgroundBlack' bg="dark" variant="dark" fixed="bottom">
                <Container className='backgroundBlack' fluid>
                    <Navbar.Brand className='backgroundBlack'><span className='footer'>© 2023 Strive</span></Navbar.Brand>
                </Container>
            </Navbar>
        </div>
    );
}