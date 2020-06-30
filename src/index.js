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

const BASE_URL = 'http://localhost:3000/api';

const App = () => {

    const[user, setUser] = useState({
        id: '',
        username: '',
        name: ''
    });
    const[links, setLinks] =useState([]);

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
            
            const { data } = await axios.post(BASE_URL + '/users/test', {token});
            
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

    async function getBookmarks() {


        const token = localStorage.getItem('token');
        const headers = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ token }`} 
                }

        const { data: { links } } = await axios.get(BASE_URL + '/links/user', headers);
        console.log('links inner is ', links);

        return links;

            // const bookmarkArr = links.map((bookmark) => {

            //     const { id, name, url, comment, tags, clicks, datecreated, dateModified, lastAccessed } = bookmark;
    
            //     const bookmarkCard = (
            //             <Bookmarks key={id} id={id} name={name} url={url} tags={tags} clickCount={clicks} dateCreated={datecreated} dateModified={dateModified} comment={comment} lastAccessed={ lastAccessed } />
            //     );
    
            //     return bookmarkCard;
            // });
        
            // return bookmarkArr;
    }

    // const renderBookmarks = () => {
    //     console.log('Here I am');
    //     console.log('user.posts is ', user.posts);
    //     return user.posts;
    // }

    useEffect(() => {

        attemptTokenLogin();

    }, []);

    useEffect(() =>{

        if(user.id){
            getBookmarks()
            .then((data) => setLinks(data))
            .catch(console.error);
        }

    }, [user])
    
    console.log('userObj top-level is ', user);
    console.log('link at the top-level is ', links);
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
                
                    < BookmarkUI links={ links } setLinks={ setLinks } />
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