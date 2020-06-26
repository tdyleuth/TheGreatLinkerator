// ./public/app.js

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';
import chalk from 'chalk';

import Header from './components/header';
import './app.scss';

const App = () => {

    return (
        <Header />
    );
    
}

const app = document.getElementById('root');

ReactDOM.render(
    <App />, app
);