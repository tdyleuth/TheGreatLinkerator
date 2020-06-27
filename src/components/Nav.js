// /src/components/Nav.js

import React, { useState, useEffect } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';

import NavButtons from "./NavButtons";
import NewBookmark from './New-Bookmark'

import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/'


export default function Nav (){

    const [name, setName] = useState('');
    const [bkmrkModal, setBkmrkModal] = useState(false);
    const [token, setToken] = useState('');

    function setLocalStorage(token, name) {
        localStorage.setItem('token', token);
        localStorage.setItem('name', name);
        localStorage.setItem('login-time', (new Date(Date.now()))/1000/60);
        localStorage.setItem('bookmark-fetch-time', '0');
    }

    function clearLocalStorage() {
        localStorage.setItem('token', '');
        localStorage.setItem('name', '');
        localStorage.setItem('login-time', JSON.stringify(NaN));
        localStorage.setItem('bookmark-fetch-time', JSON.stringify(NaN));
    }
    
    async function loginUser (){
    
        //TODO: Hash password before sending and integrate hash validation to isLoggedIn 
            
        try{

            const { data: { name, token } } = await axios.post(BASE_URL + 'users/login',
            {
                username: 'yhafez',
                password: 'passwored121'
            });
            setLocalStorage(token, name);
            return {token, name};

        }
        catch(err){
            console.error('Error attempting to login user in /src/components/Nav @ loginUser(). Error ', err);
            throw err;
        }
        
    }


    async function handleLogin (){
        
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
        const timeSinceLogin = ((new Date(Date.now()))/1000/60) - Number(localStorage.getItem('login-time'));

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

    
    function handleLogout(){
        setName('');
        setToken('');
        clearLocalStorage();
        //Update bookmark dispay
    }



    useEffect(() => {
        
        const verifyLogin = isLoggedIn().then((loggedIn) => {if(loggedIn){handleLogin()}});
        
    }, []);

    return(name
        ? (
            <Navbar className='theme-bg theme-variant'>

                <div id='greeting'>
                    <Image src="/assets/avatar.png" alt='Generic avatar image' roundedCircle />
                    <Navbar.Text id='nav-text'>Welcome, { name }!</Navbar.Text>
                </div>

                <div className="navButtons">

                    {/* TODO: LINE BREAK */}
                    <NavButtons className='new-bkmrk' text={`New\nBookmark`} clickEvent={ () => setBkmrkModal(true) } />
                    <NavButtons className='new-fldr' text={`New\nFolder`} clickEvent={ null } />
                    <NavButtons className='logout' text='Log Out' clickEvent={ handleLogout } />
                </div>
                
                <NewBookmark show={ bkmrkModal } hideEvent={() => setBkmrkModal(false)} />

            </Navbar>
        )

        : (
            <Navbar className='theme-bg theme-variant'>

                <Navbar.Text id='nav-text'>Welcome! Please sign-up or log-in to continue<span id='arrow'> &nbsp; ➡️</span></Navbar.Text>

                <div className="navButtons">
                    <NavButtons className='login' text='Log-In' clickEvent={ handleLogin } />
                    <NavButtons className='signup' text='Sign-Up' clickEvent={ null } />
                </div>
                
            </Navbar>
        )
    )
}