// /src/components/LoginForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'
import Fade from 'react-bootstrap/Fade';

const BASE_URL = 'http://localhost:3000/api/users';




function LoginForm({ show, hideEvent, setShow, setLoginNotice, setUser, setSignupNotice, setLogoutNotice, setLocalStorage, clearLocalStorage, setBookmarkNotice }){
    
    const [userError, setUserError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    async function isLoggedIn(){

        const token = localStorage.getItem('token');
        const timeSinceLogin = (+(new Date(Date.now()))/1000/60) - Number(localStorage.getItem('login-time'));

        //If there is a stored token and it is current (less than 30 minutes), attempt to validate token
        if(token && timeSinceLogin < 30){
            
            const { data: { name }} = await axios.post(BASE_URL + '/test', {token});
    
            if(name === 'VerificationSuccessful'){
                return true;
            }
            else{
                clearLocalStorage();
                return false;
            }
    
        }
        else {return false}
    }

    async function loginUser (){
            console.log('1')
        const loginUsername = document.getElementById('login-username').value;
        const loginPassword = document.getElementById('login-password').value;
            
        try{
    
            const { data: { messageName, name, token, id } } = await axios.post(BASE_URL + '/login',
            {
                username: loginUsername,
                password: loginPassword
            });
            console.log('messagename is ', messageName);

            if(messageName === 'IncorrectCredentialsError'){
                setUserError(false);
                setPasswordError(true);
                return;
            }
            else if(messageName === 'UserExistsError'){
                setPasswordError(false);
                setUserError(true);
                return;
            }
            else if(messageName==='MissingCredentialsError'){
                setUserError(false);
                setPasswordError(false);
                return;
            }
            else if(messageName==='LoginSuccess'){
                setLocalStorage(token, name);
                setLogoutNotice(false);
                setSignupNotice(false);
                setLoginNotice(true);
                setBookmarkNotice(false)
                setUser({
                    id,
                    username: loginUsername,
                    name
                });

                return {token, name};
            }

        }
        catch(err){
            console.error('Error attempting to login user in /src/components/Nav @ loginUser(). Error ', err);
            throw err;
        }
        
    }


    async function handleLogin (event){
        
        event.preventDefault();
        event.stopPropagation();
        
        const isLoggedIn = await loginUser();
         
        //If login is successful, update state accordingly
        if(isLoggedIn){
            setShow(false);
        }
        //If unsuccessful, display notice to user
        else{ 
            clearLocalStorage();
        }
        //TODO "Remember Me"
    
    }



    //Checks if login is current and recent and, if not, renews login token
    //TODO
    async function renewToken() {
        if(!isLoggedIn()){
            const username = localStorage.getItem('username');
            const password = localStorage.getItem('password');
            // loginUser(username, password);
        }
    }


    return(

        <Modal
        size='lg'
        show={ show }
        onHide={ hideEvent }
        id='login-modal'
        >
            <Modal.Header closeButton>

                <Modal.Title id='login-header'>Login</Modal.Title>

            </Modal.Header>
                
            <Modal.Body>

                <Form onSubmit={ handleLogin }>
                    <Form.Group>
                
                        {/* Error messages */}
                        <Fade>
                            <Alert id='user-not-found' variant='danger' dismissible show={ userError }  onClose={ () => setUserError(false)} >
                                <Alert.Heading> Username not found! Please try again.</Alert.Heading>
                            </Alert>
                        </Fade>

                        <Fade>
                            <Alert id='incorrect-password' variant='danger' dismissible show={ passwordError }  onClose={ () => setPasswordError(false)} >
                                <Alert.Heading> Incorrect password! Please try again.</Alert.Heading>
                            </Alert>
                        </Fade>

                        {/* Form elements */}
                        <Form.Label>Enter Username</Form.Label>
                        <Form.Control as='input' id='login-username' required></Form.Control>
                        <Form.Label>Enter Password</Form.Label>
                        <Form.Control as='input' id='login-password' type='password' required></Form.Control>


                        

                        
                        {/* Modal buttons */}
                        <div id='loginForm-btns'>
                            <Button id='submit-loginForm' type='submit' >Login</Button>
                            <Button id='close-loginForm' onClick={ hideEvent } >Close</Button>
                        </div>
                        
                    </Form.Group>
                </Form>
                
            </Modal.Body>

        </Modal>
    )

}

export default LoginForm