// /src/components/Nav.js

import React, { useState, useEffect } from 'react';
import {Animated} from "react-animated-css";

import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';

import BookmarkForm from './BookmarkForm';
import NavButtons from "./NavButtons";
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';


export default function Nav ({ user, setUser, editBkmrkModal, setEditBkmrkModal }){
    
    //State handlers
    const [ editBookmarkNotice, setEditBookmarkNotice ] = useState(false);
    const [ newBookmarkNotice, setNewBookmarkNotice ] = useState(false);
    const [ duplicateError, setDuplicateError ] = useState(false);
    const [ newBkmrkModal, setNewBkmrkModal ] = useState(false);
    const [ signupNotice, setSignupNotice ] = useState(false);
    const [ logoutNotice, setLogoutNotice ] = useState(false);
    const [ loginNotice, setLoginNotice ] = useState(false);
    const [ SignUpModal, setSignUpModal ] = useState(false);
    const [ LoginModal, setLoginModal ] = useState(false);
    const [ visibility, setVisibility ] = useState(true);


    //Helper function to set current time, token, and name in local storage
    function setLocalStorage(token, name) {
        //Get epoch time for time of function call and convert from milliseconds to seconds to minutes, and store in local storage
        localStorage.setItem('login-time', JSON.stringify(+(new Date(Date.now()))/1000/60));
        localStorage.setItem('token', token);
        localStorage.setItem('name', name);
    }

    //Clears local storage on logout or expired/missing token
    function clearLocalStorage() {
        localStorage.setItem('login-time', JSON.stringify(NaN));
        localStorage.setItem('token', '');
        localStorage.setItem('name', '');
    }

    //Event handler for logout button click
    function handleLogout(){
        setLogoutNotice(true);
        clearLocalStorage();
        setUser({
            id: '',
            username: '',
            name: ''
        });

        setTimeout(() => {setVisibility(false)}, 200);
        setTimeout(() => {setVisibility(true)}, 2500);
        setTimeout(() => {setLogoutNotice(false)}, 3000);
    }


    return(user.id

        ? ( /* ------------------------------------------------------------- Logged In Nav Menu ------------------------------------------------------------- */


            <>
                <Navbar className='theme-bg theme-variant'>
                    

                                                                                {/* Greeting */}


                    <div id='greeting'>

                        <Image
                            alt='Generic avatar image'
                            src="/assets/avatar.png"
                            roundedCircle 
                        />

                        <Navbar.Text id='nav-text'>
                            Welcome, { user.name }!
                        </Navbar.Text>

                    </div>

            
                                                                                {/* Buttons */}


                    <div className="navButtons-logged-in">

                        {/* Create New Bookmark Button */}
                        <NavButtons
                            clickEvent={ () => {
                                setNewBookmarkNotice(false);
                                setDuplicateError(false);
                                setNewBkmrkModal(true)
                            }}
                            text={'New Bookmark'}
                            className='new-bkmrk'
                        />

                        {/* Log Out Button */}
                        <NavButtons
                            clickEvent={ handleLogout }
                            className='logout'
                            text={'Log Out'}
                        />

                        {/* Create New Folder Button */}
                        {/* <NavButtons
                            className='new-fldr'
                            text={'New Folder'}
                            clickEvent={ null }
                        /> */}

                    </div>

                    
                                                                                {/* Modals */}

                    
                    {/* Create New Bookmark Modal */}
                    <BookmarkForm
                        setEditBookmarkNotice={ setEditBookmarkNotice }
                        setNewBookmarkNotice={ setNewBookmarkNotice }
                        hideEvent={ () => setNewBkmrkModal(false) }
                        setDuplicateError={ setDuplicateError }
                        setLogoutNotice={ setLogoutNotice }
                        duplicateError={ duplicateError }
                        setLoginNotice={ setLoginNotice }
                        setVisibility={ setVisibility }
                        setShow={ setNewBkmrkModal }
                        visibility={ visibility }
                        show={ newBkmrkModal }
                        action='Create New'
                    />

                    {/* Edit Bookmark Modal */}
                    <BookmarkForm
                        setEditBookmarkNotice={ setEditBookmarkNotice }
                        setNewBookmarkNotice={ setNewBookmarkNotice }
                        hideEvent={ () => setEditBkmrkModal(false) }
                        setDuplicateError={ setDuplicateError }
                        setLogoutNotice={ setLogoutNotice }
                        duplicateError={ duplicateError }
                        setLoginNotice={ setLoginNotice }
                        setVisibility={ setVisibility }
                        setShow={ setEditBkmrkModal }
                        visibility={ visibility }
                        show={ editBkmrkModal }
                        action='Edit'
                    />

                </Navbar>


                                                                                    {/* Alerts */}


                {/* Successful Login Notice */}
                <Animated
                isVisible={ visibility }
                animationOut ='fadeIn'
                animationIn='fadeOut'>

                    <Alert
                    onClose = { () => setLoginNotice(false) }
                    show = { loginNotice }
                    id='login-success'
                    variant='success'
                    dismissible>

                        <Alert.Heading>You are now logged in!</Alert.Heading>
                        
                    </Alert>
                </Animated>


                {/* Successful Signup Notice */}
                <Animated
                isVisible={ visibility }
                animationIn='fadeOut'
                animationOut='fadeIn'>

                    <Alert
                    className='animate__animated animate__fadeOut'
                    onClose={ () => setSignupNotice(false) }
                    show={ signupNotice } 
                    id='sign-up-success'
                    variant='success'
                    dismissible>

                        <Alert.Heading>You have successfully signed up!

                        </Alert.Heading>

                    </Alert>
                </Animated>


                {/* Successful Bookmark Creation Notice */}
                <Animated
                isVisible={ visibility }
                animationIn='fadeOut'
                animationOut='fadeIn'>

                    <Alert
                    onClose={ () => setNewBookmarkNotice(false) }
                    id='create-bookmark-success'
                    show={ newBookmarkNotice }
                    variant='success'
                    dismissible>

                        <Alert.Heading> You have successfully created bookmark! </Alert.Heading>

                    </Alert>
                </Animated>

                
                {/* Bookmark Successfully Edited Notice */}
                <Animated
                isVisible={ visibility }
                animationIn='fadeOut'
                animationOut='fadeIn'>

                    <Alert
                    onClose={ () => setEditBookmarkNotice(false) }
                    show={ editBookmarkNotice }
                    id='create-bookmark-success'
                    variant='success'
                    dismissible>

                        <Alert.Heading> Bookmark has been successfully edited! </Alert.Heading>

                    </Alert>
                </Animated>
            </>
        )

        
        : ( /* ------------------------------------------------------------- Logged Out Nav Menu ------------------------------------------------------------- */

            
            <>
                <Navbar className='theme-bg theme-variant'>


                                                                            {/* Nav Buttons */}


                    <div className="navButtons-logged-out">

                        {/* Log-In Button */}
                        <NavButtons
                            clickEvent={ () => setLoginModal(true) }
                            className='login'
                            text='Log-In'
                        />

                        {/* Sign-Up Button */}
                        <NavButtons
                            clickEvent={ () => setSignUpModal(true)  }
                            className='signup'
                            text='Sign-Up'
                        />
                        
                    </div>

                    
                                                                                {/* Modals */}


                    {/* Signup Modal */}
                    <LoginForm
                        setEditBookmarkNotice ={ setEditBookmarkNotice }
                        setNewBookmarkNotice ={ setNewBookmarkNotice }
                        hideEvent={ () => setLoginModal(false) }
                        clearLocalStorage={ clearLocalStorage }
                        setLoginNotice={ setLoginNotice }
                        setSignupNotice={ setSignupNotice }
                        setLogoutNotice={ setLogoutNotice }
                        setLocalStorage={ setLocalStorage }
                        setVisibility={ setVisibility }
                        visibility={ visibility }
                        setShow={ setLoginModal }
                        setUser={ setUser }
                        show={ LoginModal }
                    />


                    {/* Signup Modal */}
                    <SignUpForm
                        setEditBookmarkNotice={ setEditBookmarkNotice }
                        setNewBookmarkNotice={ setNewBookmarkNotice }
                        hideEvent={ () => setSignUpModal(false) }
                        setLogoutNotice={ setLogoutNotice }
                        setLocalStorage={ setLocalStorage }
                        setSignupNotice={ setSignupNotice }
                        setSignUpModal={ setSignUpModal }
                        setLoginNotice={ setLoginNotice }
                        setVisibility={ setVisibility }
                        visibility={ visibility }
                        show={ SignUpModal }
                        setUser={ setUser }
                    />

                </Navbar>
                

                                                                                            {/* Notices */}


                {/* Logout successful notice */}
                <Animated
                isVisible={ visibility }
                animationIn='fadeOut'
                animationOut='fadeIn'>

                    <Alert
                    onClose={ () => setLogoutNotice(false) }
                    onLoad={ () => {
                    setSignupNotice(false);
                    setLoginNotice(false);
                    }}
                    show={ logoutNotice }
                    id='logout-success'
                    variant='success'
                    dismissible>

                        <Alert.Heading>You have successfully logged out!</Alert.Heading>

                    </Alert>
                </Animated>

            </>
        )
    )
}