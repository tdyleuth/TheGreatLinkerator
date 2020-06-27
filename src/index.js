// ./src/index.js

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';
import chalk from 'chalk';

import Header from './components/Header';
import Nav from './components/Nav';
import Search from './components/Search'

import './app.scss';

const App = () => {

    return (
        <>
            <header>
                    <Header />
                    <Nav />
            </header>

            <main>
                
                {/* {breadcrumb} */}
                {/* <h1>{folder-name}</h1> */}
                <Search />

            </main>
        </>
    );
    
}

const app = document.getElementById('root');

ReactDOM.render(
    <App />, app
);