// /src/components/Nav.js

import React, { useState, useEffect } from 'react';
import {Animated} from "react-animated-css";

import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';

import NavButtons from "./NavButtons";
import BookmarkForm from './BookmarkForm';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

export default function Nav ({ user, setUser, setDeleteBookmarkNotice,  deleteBookmarkNotice, visibility, setVisibility} ){

    const [ LoginModal, setLoginModal ] = useState(false);
    const [ SignUpModal, setSignUpModal ] = useState(false);
    const [ newBkmrkModal, setNewBkmrkModal ] = useState(false);
    const [ editBkmrkModal, setEditBkmrkModal ] = useState(false);

    const [ loginNotice, setLoginNotice ] = useState(false);
    const [ logoutNotice, setLogoutNotice ] = useState(false);
    const [ signupNotice, setSignupNotice ] = useState(false);    
    const [ newBookmarkNotice, setNewBookmarkNotice ] = useState(false);
    const [ editBookmarkNotice, setEditBookmarkNotice ] = useState(false);

    const [ duplicateError, setDuplicateError ] = useState(false);


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
        setTimeout(() => {
            setVisibility(false);
        }, 200);
        setTimeout(() => {
            setVisibility(true);
        }, 2500);
        setTimeout(() => {
            setLogoutNotice(false);
        }, 3000);
    }


    return(user.id
        ? (
            <>
                <Navbar className='theme-bg theme-variant'>

                    <div id='greeting'>
                        <Image src="/assets/avatar.png" alt='Generic avatar image' roundedCircle />
                        <Navbar.Text id='nav-text'>Welcome, { user.name }!</Navbar.Text>
                    </div>

            

                    <div className="navButtons-logged-in">

                        {/* TODO: LINE BREAK */}
                        <NavButtons className='new-bkmrk' text={`New\ Bookmark`} clickEvent={ () => {setDuplicateError(false); setNewBookmarkNotice(false); setNewBkmrkModal(true)}} />
                        <NavButtons className='new-fldr' text={`New\ Folder`} clickEvent={ null } />
                        <NavButtons className='logout' text={`Log\ Out`} clickEvent={ handleLogout } />
                    </div>
                    
                    {/* Create new bookmark */}
                    <BookmarkForm show={ newBkmrkModal } hideEvent={() => setNewBkmrkModal(false)}  action='Create New' setBookmarkNotice={ setNewBookmarkNotice }   setLogoutNotice={ setLogoutNotice }  setShow={ setNewBkmrkModal } duplicateError={ duplicateError } setDuplicateError={ setDuplicateError } setLoginNotice={ setLoginNotice } setVisibility={ setVisibility } visibility={ visibility } />

                    {/* Edit bookmark */}
                    <BookmarkForm show={ editBkmrkModal } hideEvent={() => setEditBkmrkModal(false)}  action='Edit' setBookmarkNotice={ setEditBookmarkNotice }   setLogoutNotice={ setLogoutNotice }  setShow={ setEditBkmrkModal } duplicateError={ duplicateError } setDuplicateError={ setDuplicateError } setVisibility={ setVisibility } visibility={ visibility }/>

                </Navbar>

                {/* Alerts */}
                <Animated animationIn = 'fadeOut' animationOut  = 'fadeIn' isVisible={ visibility } >
                <Alert  id  = 'login-success' variant = 'success' dismissible show = { loginNotice } onClose = { () => setLoginNotice(false) } >
                        <Alert.Heading> You are now logged in! </Alert.Heading>
                    </Alert>
                </Animated>

                <Animated animationIn='fadeOut' animationOut='fadeIn' isVisible={ visibility } >
                    <Alert id='sign-up-success' variant='success' dismissible show={ signupNotice }  onClose={ () => setSignupNotice(false)} >
                        <Alert.Heading> You have successfully signed up! </Alert.Heading>
                    </Alert>
                </Animated>

                <Animated animationIn='fadeOut' animationOut='fadeIn' isVisible={ visibility } >
                    <Alert id='create-bookmark-success' variant='success' dismissible show={ newBookmarkNotice }  onClose={ () => setNewBookmarkNotice(false)} >
                        <Alert.Heading> You have successfully created bookmark! </Alert.Heading>
                    </Alert>
                </Animated>

                <Animated animationIn='fadeOut' animationOut='fadeIn' isVisible={ visibility } >
                    <Alert id='create-bookmark-success' variant='success' dismissible show={ editBookmarkNotice }  onClose={ () => setEditBookmarkNotice(false)} >
                        <Alert.Heading> Bookmark has been successfully edited! </Alert.Heading>
                    </Alert>
                </Animated>

                <Animated animationIn='fadeOut' animationOut='fadeIn' isVisible={ visibility } >
                    <Alert id='deleted-bookmark' variant='success' dismissible show={ deleteBookmarkNotice }  onClose={ () => setDeleteBookmarkNotice(false)} >
                        <Alert.Heading> Bookmark has been deleted! </Alert.Heading>
                    </Alert>
                </Animated>
            </>
        )

        : (
            <>
                <Navbar className='theme-bg theme-variant'>

                    <div className="navButtons-logged-out">
                        <NavButtons className='login' text='Log-In' clickEvent={ () => setLoginModal(true) }/>
                        <NavButtons className='signup' text='Sign-Up' clickEvent={ () => setSignUpModal(true)  } />
                    </div>
                    
                    <LoginForm show={ LoginModal } hideEvent={ () => setLoginModal(false) } setShow={ setLoginModal } setLoginNotice={ setLoginNotice } setSignupNotice={ setSignupNotice } setLogoutNotice={ setLogoutNotice } setUser={ setUser } setLocalStorage={ setLocalStorage } clearLocalStorage={ clearLocalStorage } setNewBookmarkNotice ={ setNewBookmarkNotice } setEditBookmarkNotice ={ setEditBookmarkNotice } setVisibility={ setVisibility } visibility={ visibility }/>

                    <SignUpForm show={ SignUpModal } hideEvent={ () => setSignUpModal(false) } setUser={ setUser } setSignupNotice={ setSignupNotice } setSignUpModal={ setSignUpModal } setLoginNotice={ setLoginNotice } setLogoutNotice={ setLogoutNotice } setLocalStorage={ setLocalStorage } setNewBookmarkNotice ={ setNewBookmarkNotice } setEditBookmarkNotice ={ setEditBookmarkNotice } setVisibility={ setVisibility } visibility={ visibility } />

                </Navbar>
                
                <Animated animationIn='fadeOut' animationOut='fadeIn' isVisible={ visibility } >
                    <Alert id='logout-success' variant='success' dismissible show={ logoutNotice } onClose={ () => setLogoutNotice(false)} onLoad={ () => { setSignupNotice(false); setLoginNotice(false); }} >
                        <Alert.Heading> You have successfully logged out! </Alert.Heading>
                    </Alert>
                </Animated>
            </>
        )
    )
}