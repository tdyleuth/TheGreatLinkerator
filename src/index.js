// ./src/index.js

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

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
    
    const [ deleteBookmarkNotice, setDeleteBookmarkNotice ] = useState(false);
    const [ editBkmrkModal, setEditBkmrkModal ] = useState(false);
    const[ visibility, setVisibility ] = useState(true);
    const[ modalTags, setModalTags ] = useState([]);
    const[ links, setLinks ] = useState([]);
    const [ searchTerm, setSearchTerm ] = useState('');
    
    
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
        return links;

    }

    useEffect(() => {

        attemptTokenLogin();

    }, []);

    useEffect(() =>{

        if(user.id){
            getBookmarks()
            .then((data) => setLinks(data))
            .catch(console.error);
        }

    }, [user]);

    if(!user.id){

        return (
            <>
            <header>
                    <Header />
                    <Nav user={ user } setUser={ setUser } editBkmrkModal={ editBkmrkModal } setEditBkmrkModal={ setEditBkmrkModal } setDeleteBookmarkNotice ={setDeleteBookmarkNotice} deleteBookmarkNotice={ deleteBookmarkNotice } setVisibility={setVisibility} visibility={visibility} links={links} setLinks={setLinks} modalTags={ modalTags } setModalTags={ setModalTags } />
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
                        <Nav user={ user } setUser={ setUser } editBkmrkModal={ editBkmrkModal } setEditBkmrkModal={ setEditBkmrkModal } setDeleteBookmarkNotice ={setDeleteBookmarkNotice} deleteBookmarkNotice={ deleteBookmarkNotice } setVisibility={setVisibility} visibility={visibility}  links={links} setLinks={setLinks} modalTags={ modalTags } setModalTags={ setModalTags } />
                </header>
                
                <main>
                    <div id='body-header'>
                        {/* {breadcrumb} */}
                        <h2 id='body-header-title'>Your Bookmarks</h2>
                        <Search searchTerm={ searchTerm } setSearchTerm={ setSearchTerm }/>
                    </div>
                
                    < BookmarkUI links={ links.filter((link) => link.url.includes(searchTerm) || link.name.includes(searchTerm) ) } setLinks={ setLinks } setEditBkmrkModal={ setEditBkmrkModal } setDeleteBookmarkNotice ={setDeleteBookmarkNotice} deleteBookmarkNotice={ deleteBookmarkNotice } setVisibility={setVisibility} visibility={visibility} setModalTags={ setModalTags }/>
                    

                </main>
            </>   
           
        )
    }
}

const app = document.getElementById('root');

ReactDOM.render(
    <App />, app
);