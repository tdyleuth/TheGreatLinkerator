// /src/components/Nav.js

import React, { useState, useEffect } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import Fade from 'react-bootstrap/Fade';

import NavButtons from "./NavButtons";
import NewBookmarkForm from './New-Bookmark';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

export default function Nav ({ user, setUser }){

    const [bkmrkModal, setBkmrkModal] = useState(false);
    const [LoginModal, setLoginModal] = useState(false);
    const [SignUpModal, setSignUpModal] = useState(false);

    const [ signupNotice, setSignupNotice ] = useState(false);
    const [ loginNotice, setLoginNotice ] = useState(false);
    const [ logoutNotice, setLogoutNotice ] = useState(false);

    const [ bookmarkNotice, setBookmarkNotice ] = useState(false);

    const [duplicateError, setDuplicateError] = useState(false);

    function setLocalStorage(token, name) {

        localStorage.setItem('token', token);
        localStorage.setItem('name', name);

        //Get epoch time for time of function call and convert from milliseconds to seconds to minutes, and store in local storage
        localStorage.setItem('login-time', JSON.stringify(+(new Date(Date.now()))/1000/60));
        localStorage.setItem('bookmark-fetch-time', '0');
    }

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
        setLogoutNotice(true);
        clearLocalStorage();
        //Update bookmark dispay
    }


    return(user.id
        ? (
            <>
                <Navbar className='theme-bg theme-variant'>

                    <div id='greeting'>
                        <Image src="/assets/avatar.png" alt='Generic avatar image' roundedCircle />
                        <Navbar.Text id='nav-text'>Welcome, { user.name }!</Navbar.Text>
                    </div>

            

                    <div className="navButtons">

                        {/* TODO: LINE BREAK */}
                        <NavButtons className='new-bkmrk' text={`New\ Bookmark`} clickEvent={ () => {setDuplicateError(false); setBookmarkNotice(false); setBkmrkModal(true)}} />
                        <NavButtons className='new-fldr' text={`New\ Folder`} clickEvent={ null } />
                        <NavButtons className='logout' text={`Log\ Out`} clickEvent={ handleLogout } />
                    </div>
                    
                    <NewBookmarkForm show={ bkmrkModal } hideEvent={() => setBkmrkModal(false)}  setBookmarkNotice={ setBookmarkNotice }   setLogoutNotice={ setLogoutNotice }  setShow={ setBkmrkModal } duplicateError={ duplicateError } setDuplicateError={ setDuplicateError }/>

                </Navbar>
                <Fade>
                    <Alert id='login-success' variant='success' dismissible show={ loginNotice } onClose={ () => setLoginNotice(false) } >
                        <Alert.Heading> You are now logged in! </Alert.Heading>
                    </Alert>
                </Fade>
                <Fade>
                    <Alert id='sign-up-success' variant='success' dismissible show={ signupNotice }  onClose={ () => setSignupNotice(false)} >
                        <Alert.Heading> You have successfully signed up! </Alert.Heading>
                    </Alert>
                </Fade>

                <Fade>
                    <Alert id='create-bookmark-success' variant='success' dismissible show={ bookmarkNotice }  onClose={ () => setBookmarkNotice(false)} >
                        <Alert.Heading> You have successfully created bookmark! </Alert.Heading>
                    </Alert>
                </Fade>
            </>
        )

        : (
            <>
                <Navbar className='theme-bg theme-variant'>

                    <Navbar.Text id='nav-text'>Welcome! Please sign-up or log-in to continue<span id='arrow'> &nbsp; ➡️</span></Navbar.Text>
                

                    <div className="navButtons">
                        <NavButtons className='login' text='Log-In' clickEvent={ () => setLoginModal(true) }/>
                        <NavButtons className='signup' text='Sign-Up' clickEvent={ () => setSignUpModal(true)  } />
                    </div>
                    
                    <LoginForm show={ LoginModal } hideEvent={ () => setLoginModal(false) } setShow={ setLoginModal } setLoginNotice={ setLoginNotice } setSignupNotice={ setSignupNotice } setLogoutNotice={ setLogoutNotice } setUser={ setUser } setLocalStorage={ setLocalStorage } clearLocalStorage={ clearLocalStorage } setBookmarkNotice ={ setBookmarkNotice }/>

                    <SignUpForm show={ SignUpModal } hideEvent={ () => setSignUpModal(false) } setUser={ setUser } setSignupNotice={ setSignupNotice } setSignUpModal={ setSignUpModal } setLoginNotice={ setLoginNotice } setLogoutNotice={ setLogoutNotice } setLocalStorage={ setLocalStorage } setBookmarkNotice ={ setBookmarkNotice } />

                </Navbar>
                
                <Fade>
                    <Alert id='logout-success' variant='success' dismissible show={ logoutNotice } onClose={ () => setLogoutNotice(false)} onLoad={ () => { setSignupNotice(false); setLoginNotice(false); }} >
                        <Alert.Heading> You have successfully logged out! </Alert.Heading>
                    </Alert>
                </Fade>
            </>
        )
    )
}