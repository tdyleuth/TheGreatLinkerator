// ./src/index.js

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';
import chalk from 'chalk';

import Header from './components/Header';
import Nav from './components/Nav';
import Search from './components/Search'
import BookmarkUI from './components/Bookmark-UI';

import Image from 'react-bootstrap/Image'

import './app.scss';

const BASE_URL = 'http://localhost:3000/api/';

const App = () => {

    const[user, setUser] = useState({
        id: '',
        username: '',
        name: '',
        posts: []
    });

    function clearLocalStorage() {
        localStorage.setItem('token', '');
        localStorage.setItem('name', '');
        localStorage.setItem('login-time', JSON.stringify(NaN));
    }


    async function attemptTokenLogin(){

        const token = localStorage.getItem('token');
        const timeSinceLogin = (+(new Date(Date.now()))/1000/60) - Number(localStorage.getItem('login-time'));

        //If there is a stored token and it is current (less than 30 minutes), attempt to validate token
        if(token && timeSinceLogin < 30){
            
            const { data } = await axios.post(BASE_URL + 'users/test', {token});
            
            const {name: messageName, userObj } = data;
            const { id, username, name } = userObj;
            setUser(userObj);

            if(messageName === 'VerificationSuccessful'){return userObj}
            else{
                clearLocalStorage();
                return {};
            }

    
        }
        else {return {}}
    }

    const renderBookmarks = () => {
        console.log('Here I am');
        console.log('user.posts is ', user.posts);
        return user.posts;
    }

    useEffect(() => {

        attemptTokenLogin()

    }, [])
    
    console.log('userObj top-level is ', user);
    if(!user.id){

        return (
            <>
            <header>
                    <Header />
                    <Nav user={ user } setUser={ setUser }/>
            </header>
            
            <main>
                <div id='body-header-welcome'>
                    {/* {breadcrumb} */}
                    <h2 id='body-header-welcome-title'>Welcome! Please sign-up or log in to continue!</h2>
                    <Image id='chain-welcome' src="/assets/chain-link.png" alt='Stylized chain link' rounded />
                </div>
            </main>
            </>   
        )

    } else {
        return (

            <>
                <header>
                        <Header />
                        <Nav user={ user } setUser={ setUser }/>
                </header>
                
                <main>
                    <div id='body-header'>
                        {/* {breadcrumb} */}
                        <h2 id='body-header-title'>Your Bookmarks</h2>
                        <Search />
                    </div>
                
                    < BookmarkUI user={ user } setUser={ setUser } />
                        {/* <div>
                        { renderBookmarks() }
                        </div> */}

                </main>
            </>   
           
        )
    }
}

const app = document.getElementById('root');

ReactDOM.render(
    <App />, app
);