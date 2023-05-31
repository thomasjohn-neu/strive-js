import { Navbar, Nav } from 'react-bootstrap';
import React, { useState } from 'react';
import { ReactComponent as Sun } from "./Sun.svg";
import { ReactComponent as Moon } from "./Moon.svg";
import './common.scss'

interface Props {
    selectedTab: string;
    onTabClick: (tab: string) => void;  
  }

export default function Header(props: Props){

    const [darkmode, setDarkmode] = useState(true);
    const handleTabClick = (tab: string) => {
        props.onTabClick(tab);
    }
    const setDarkMode = () => {
        const bodyElement = document.querySelector("body");
        if (bodyElement !== null) {
            bodyElement.setAttribute("data-theme", "light");
        //   bodyElement.setAttribute("data-theme", "dark");
        }
        setDarkmode(true);
    };
      
    const setLightMode = () => {
        const bodyElement = document.querySelector("body");
        if (bodyElement !== null) {
           bodyElement.setAttribute("data-theme", "dark");
        }
        setDarkmode(false);
    };
      
    const toggleTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
          setDarkMode();
        } else {
          setLightMode();
        }
    };

    const logout = () => {
        // clear user session
        localStorage.clear();
        sessionStorage.clear();
        // redirect to login page
        window.location.href = '/';
    }
      

    return (
        <div className='backgroundBlack'>
           <Navbar className="backgroundBlack" bg="light" expand="lg" fixed="top">
                <Navbar.Brand className='backgroundBlack' onClick={() => handleTabClick('dashboard')}><h3 className="LogoHeader backgroundBlack">STRIVE</h3></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className='backgroundBlack' id="navbar-nav">
                    <Nav className="backgroundBlack mr-auto">
                        <Nav.Link className="backgroundBlack" onClick={() => handleTabClick('dashboard')}> Dashboard </Nav.Link>
                        <Nav.Link onClick={() => handleTabClick('list-challenge')} className={`${props.selectedTab === 'list-challenge' ? 'active' : ''} backgroundBlack`}> Challenges </Nav.Link>
                        <Nav.Link onClick={() => handleTabClick('list-group')} className={`${props.selectedTab === 'add-group' ? 'active' : ''} backgroundBlack`}> Group </Nav.Link>
                        <Nav.Link className="backgroundBlack" onClick={() => handleTabClick('log-challenge')}> Activity </Nav.Link>
                        <Nav.Link className="backgroundBlack" onClick={() => handleTabClick('pomodoro')}> Pomodoro </Nav.Link>
                    </Nav>
                    <Nav className="d-flex">
                        <div className='dark_mode'>
                            <input
                                className='dark_mode_input'
                                type='checkbox'
                                checked={darkmode}
                                id='darkmode-toggle'
                                onChange={toggleTheme}
                            />
                            <label className='dark_mode_label'>
                                <Sun />
                                <Moon />
                            </label>
                        </div>
                        <Nav.Link className="backgroundBlack" href="#link" onClick={logout}> Logout </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}