// ./public/app.js

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';
import chalk from 'chalk';

import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header';

const App = () => {

    return (
        <Header />
    );
    
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);