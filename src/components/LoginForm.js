// /src/components/LoginForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const BASE_URL = 'http://localhost:3000/api/'

function LoginForm({ show, hideEvent, name, setName, token, setToken, clearLocalStorage }){
    
    function setLocalStorage(token, name) {

        
        localStorage.setItem('token', token);
        localStorage.setItem('name', name);

        //Get epoch time for time of function call and convert from milliseconds to seconds to minutes, and store in local storage
        localStorage.setItem('login-time', JSON.stringify(+(new Date(Date.now()))/1000/60));
        localStorage.setItem('bookmark-fetch-time', '0');
    }
    
    async function loginUser (){
    
        //TODO: Hash password before sending and integrate hash validation to isLoggedIn 

        console.log('here3');
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        console.log('here4');
        
        console.log('username is ', username);
        console.log('password is ', password);

            
        try{

            const { data: { name, token } } = await axios.post(BASE_URL + 'users/login',
            {
                username: 'yhafez',
                password: 'passwored121'
            });
            console.log('returned name and token are ', name, token);
            

            
            setLocalStorage(token, name);
            return {token, name};

        }
        catch(err){
            console.error('Error attempting to login user in /src/components/Nav @ loginUser(). Error ', err);
            throw err;
        }
        
    }


    async function handleLogin (){

        console.log('here2')

        const isLoggedIn = await loginUser();
         
        //If login is successful, update state accordingly
        if(isLoggedIn){
            setName(isLoggedIn.name);
            setToken(isLoggedIn.token);
        }
        //If unsuccessful, display notice to user
        else{ 
            //TODO give notice that login is invalid
            clearLocalStorage();
        }
        //TODO "Remember Me"
    
    }

    async function isLoggedIn(){

        const token = localStorage.getItem('token');
        const timeSinceLogin = (+(new Date(Date.now()))/1000/60) - Number(localStorage.getItem('login-time'));

        //If there is a stored token and it is current (less than 30 minutes), attempt to validate token
        if(token && timeSinceLogin < 30){
            
            const { data: { name }} = await axios.post(BASE_URL + 'users/test', {token});
    
            if(name === 'VerificationSuccessful'){
                return true;
            }
            else if(token){
                //Give notice that user has been signed out due to inactivity
                clearLocalStorage();
                return false;
            }
            else{
                clearLocalStorage();
                return false;
            }
    
        }
        else {return false}
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



    useEffect(() => {
        
        const verifyLogin = isLoggedIn().then((loggedIn) => {if(loggedIn){handleLogin()}});
        
    }, []);

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

                <Form>
                    <Form.Group>
                
                        <Form.Label>Enter Username</Form.Label>
                        <Form.Control as='input' id='login-username' required></Form.Control>

                        <Form.Label>Enter Password</Form.Label>
                        <Form.Control as='input' id='login-password' required></Form.Control>
                        
                        <div id='loginForm-btns'>
                            <Button id='submit-loginForm' type='submit' onClick={ handleLogin } >Login</Button>
                            <Button id='close-loginForm' onClick={ hideEvent } >Close</Button>
                        </div>
                        
                    </Form.Group>
                </Form>
                
            </Modal.Body>

        </Modal>
    )

}

export default LoginForm