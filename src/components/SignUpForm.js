// /src/components/SignUpForm.js

import React, { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { Animated } from "react-animated-css";
import { BASE_URL } from '../constants';

import axios from 'axios';

function SignUpForm({ show, hideEvent, setUser, setSignupNotice, setSignUpModal, setLoginNotice, setLogoutNotice, setLocalStorage, setNewBookmarkNotice, setEditBookmarkNotice, setVisibility, visibility }){

    const [ userError, setUserError ] = useState(false);
    const [ usernameError, setUsernameError ] = useState(false);
    const [ passwordError, setPasswordError ] = useState(false);

    async function handleSignup(event){
        
        console.log('here1');
        event.preventDefault();
        event.stopPropagation();
        console.log('here2');
        
        const newName = document.getElementById('signup-name').value;
        const newUsername = document.getElementById('signup-username').value;
        const password = document.getElementById('signup-password').value;
        
        const { data: { messageName, token, username, name, id } } = await axios.post(BASE_URL + '/users/register', {
            username: newUsername,
            password,
            name: newName
        });

        console.log('signup data is ', messageName, token, username, name, id);

        if(messageName === 'UserExistsError' ){
            setUsernameError(false);
            setPasswordError(false);
            setUserError(true);
            setTimeout(() => {
                setVisibility(false);
            }, 200);
            setTimeout(() => {
                setVisibility(true);
            }, 2500);
            setTimeout(() => {
                setUserError(false);
            }, 3000);
        }
        else if(messageName === 'UsernameLengthError'){
            setPasswordError(false);
            setUserError(false);
            setUsernameError(true);
            setTimeout(() => {
                setVisibility(false);
            }, 200);
            setTimeout(() => {
                setVisibility(true);
            }, 2500);
            setTimeout(() => {
                setUsernameError(false);
            }, 3000);
        }
        else if(messageName === 'PasswordLengthError'){
            setUsernameError(false);
            setUserError(false);
            setPasswordError(true);
            setTimeout(() => {
                setVisibility(false);
            }, 200);
            setTimeout(() => {
                setVisibility(true);
            }, 2500);
            setTimeout(() => {
                setPasswordError(false);
            }, 3000);
        }
        else if(messageName==='SignupSuccessful'){
            setSignupNotice(true);
            setSignUpModal(false);
            setLogoutNotice(false);
            setLoginNotice(false);
            setNewBookmarkNotice(false);
            setEditBookmarkNotice(false);
            setLocalStorage(token, name);
            setUser({
                username,
                name,
                id
            });
            setTimeout(() => {
                setVisibility(false);
            }, 200);
            setTimeout(() => {
                setVisibility(true);
            }, 2500);
            setTimeout(() => {
                setSignupNotice(false);
            }, 3000);
        }


    }


    return(

        <Modal
        size='lg'
        show={ show }
        onHide={ hideEvent }
        id='signup-modal'
        >
            <Modal.Header closeButton>

                <Modal.Title id='signup-header'>Register</Modal.Title>

            </Modal.Header>
                
            <Modal.Body>

                <Form onSubmit={ handleSignup }>
                    <Form.Group>

                    <Animated animationIn='fadeOut' animationOut='fadeIn' isVisible={ visibility } >
                            <Alert id='user-exists-error' variant='danger' show={ userError }  onClose={ () => setUserError(false)} dismissible>
                                <Alert.Heading> A user by this username already exists! Please try registering with a different username. </Alert.Heading>
                            </Alert>
                        </Animated>

                        <Animated animationIn='fadeOut' animationOut='fadeIn' isVisible={ visibility } >
                            <Alert id='password-length-error' variant='danger' show={ passwordError }  onClose={ () => setPasswordError(false)} dismissible>
                                <Alert.Heading> Password must be 8-25 characters in length </Alert.Heading>
                            </Alert>
                        </Animated>
                        
                        <Animated animationIn='fadeOut' animationOut='fadeIn' isVisible={ visibility } >
                            <Alert id='username-length-error' variant='danger' show={ usernameError }  onClose={ () => setUsernameError(false)} dismissible>
                                <Alert.Heading> Username must be 8-25 characters in length </Alert.Heading>
                            </Alert>
                        </Animated>
                        
                        <Form.Label>Enter New Name</Form.Label>
                        <Form.Control id='signup-name' as='input' placeholder='Name' required></Form.Control>
                
                        <Form.Label>Enter New Username</Form.Label>
                        <Form.Control id='signup-username' as='input' placeholder='Username' required></Form.Control>

                        <Form.Label>Enter New Password</Form.Label>
                        <Form.Control id='signup-password' as='input' type='password' placeholder='Password' required></Form.Control>
                        
                        <div id='signUpForm-btns'>
                            <Button id='submit-signUpForm' type='submit' >Register</Button>
                            <Button id='close-signUpForm' onClick={ hideEvent } >Close</Button>
                        </div>
                        
                    </Form.Group>
                </Form>
                
            </Modal.Body>

        </Modal>
    )

}

export default SignUpForm