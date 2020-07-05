// ./src/index.js

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';
import { BASE_URL} from './constants';

import Header from './components/Header.js';
import Nav from './components/Nav.js';
import Search from './components/Search.js'
import BookmarkUI from './components/Bookmark-UI.js';

import Image from 'react-bootstrap/Image'

import './app.scss';

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
    const [ welcomeImageSuccess, setWelcomeImageSuccess ] = useState(true);

    
    function clearLocalStorage() {
        localStorage.setItem('token', '');
        localStorage.setItem('name', '');
    }


    async function attemptTokenLogin(){

        const token = localStorage.getItem('token');

        //If there is a stored token and it is current (less than 30 minutes), attempt to validate token
        if(token){
            
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

    const handleWelcomeImageSuccess = () => setWelcomeImageSuccess(false);

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
                    { welcomeImageSuccess
                        ? <Image id='chain-welcome' src="/assets/chain-link.png" alt='Stylized chain link' onError={ handleWelcomeImageSuccess } rounded />

                        : <div></div>
                    }
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
                        <h2 id='body-header-title'>Your Bookmarks</h2>
                        <Search searchTerm={ searchTerm } setSearchTerm={ setSearchTerm }/>
                    </div>
                
                    < BookmarkUI links={ links.filter((link) => link.url.toLowerCase().includes(searchTerm.toLowerCase()) || link.name.toLowerCase().includes(searchTerm.toLowerCase())) } setLinks={ setLinks } setEditBkmrkModal={ setEditBkmrkModal } setDeleteBookmarkNotice ={setDeleteBookmarkNotice} deleteBookmarkNotice={ deleteBookmarkNotice } setVisibility={setVisibility} visibility={visibility} setModalTags={ setModalTags }/>
                    

                </main>
            </>   
           
        )
    }
}

const app = document.getElementById('root');

ReactDOM.render(
    <App />, app
);