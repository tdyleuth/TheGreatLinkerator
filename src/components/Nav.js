// /src/components/Nav.js

import React, { useState, useEffect } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';

import NavButtons from "./NavButtons";
import NewBookmark from './New-Bookmark';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

export default function Nav ({ user, setUser }){

    const [bkmrkModal, setBkmrkModal] = useState(false);
    const [LoginModal, setLoginModal] = useState(false)
    const [SignUpModal, setSignUpModal] = useState(false)

    function clearLocalStorage() {
        localStorage.setItem('token', '');
        localStorage.setItem('name', '');
        localStorage.setItem('login-time', JSON.stringify(NaN));
    }

    function handleLogout(){
        setUser({
            id: '',
            username: '',
            name: ''
        });
        clearLocalStorage();
        //Update bookmark dispay
    }


    return(user.id
        ? (
            <Navbar className='theme-bg theme-variant'>

                <div id='greeting'>
                    <Image src="/assets/avatar.png" alt='Generic avatar image' roundedCircle />
                    <Navbar.Text id='nav-text'>Welcome, { user.name }!</Navbar.Text>
                </div>

           

                <div className="navButtons">

                    {/* TODO: LINE BREAK */}
                    <NavButtons className='new-bkmrk' text={`New\ Bookmark`} clickEvent={ () => setBkmrkModal(true) } />
                    <NavButtons className='new-fldr' text={`New\ Folder`} clickEvent={ null } />
                    <NavButtons className='logout' text={`Log\ Out`} clickEvent={ handleLogout } />
                </div>
                
                <NewBookmark show={ bkmrkModal } hideEvent={() => setBkmrkModal(false)} />

            </Navbar>
        )

        : (
            <Navbar className='theme-bg theme-variant'>

                <Navbar.Text id='nav-text'>Welcome! Please sign-up or log-in to continue<span id='arrow'> &nbsp; ➡️</span></Navbar.Text>
             

                <div className="navButtons">
                    <NavButtons className='login' text='Log-In' clickEvent={ () => setLoginModal(true) }/>
                    <NavButtons className='signup' text='Sign-Up' clickEvent={ () => setSignUpModal(true)  } />
                </div>
                
                <LoginForm show={ LoginModal } setShow={ setLoginModal } hideEvent={ () => setLoginModal(false) } user={ user } setUser={ setUser } clearLocalStorage={ clearLocalStorage }/>
                <SignUpForm show={ SignUpModal } hideEvent={ () => setSignUpModal(false) } />

            </Navbar>
        )
    )
}