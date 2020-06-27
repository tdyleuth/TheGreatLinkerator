// /src/components/header.js

import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';

import axios from 'axios';

import NavButtons from "./NavButtons";
import NewBookmark from './New-Bookmark';
import LoginForm from './Login';
import SignUpForm from './SignUP';


export default function Nav (){
    
    const [name, setName] = useState('');
    const [display, setDisplay] = useState(false);

    const [LoginModal, setLoginModal] = useState(false)
    const [SignUpModal, setSignUpModal] = useState(false)


    async function loginUser (){
        const { data: {name} } = await axios.post('http://localhost:3000/api/users/login',
        {
            username: 'yhafez',
            password: 'passwored121'
        });
        
        setName(name);
    
    }



    return(name
        ? (
            <Navbar className='theme-bg theme-variant'>

                <div id='greeting'>
                    <Image src="/assets/avatar.png" alt='Generic avatar image' roundedCircle />
                    <Navbar.Text id='nav-text'>Welcome, { name }!</Navbar.Text>
                </div>

           

                <div className="navButtons">

                    {/* TODO: LINE BREAK */}
                    <NavButtons className='new-bkmrk' text={`New\nBookmark`} clickEvent={ () => setDisplay(true) } />
                    <NavButtons className='new-fldr' text={`New\nFolder`} clickEvent={ null } />
                </div>
                
                <NewBookmark show={ display } hideEvent={() => setDisplay(false)} closeEvent={() => setDisplay(false)}/>

            </Navbar>
        )

        : (
            <Navbar className='theme-bg theme-variant'>

                <Navbar.Text id='nav-text'>Welcome! Please sign-up or log-in to continue<span id='arrow'> &nbsp; ➡️</span></Navbar.Text>
             

                <div className="navButtons">
                    <NavButtons className='login' text='Log-In' clickEvent={ () => setLoginModal(true) } />
                    <NavButtons className='signup' text='Sign-Up' clickEvent={ () => setSignUpModal(true)  } />
                </div>

                <LoginForm show={LoginModal} hideEvent={ () => setLoginModal(false) } />

                <SignUpForm show={SignUpModal} hideEvent={ () => setSignUpModal(false) } />
                
            </Navbar>
        )
    );

};