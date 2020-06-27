// /src/components/header.js

import React from 'react';
import Button from 'react-bootstrap/Button'


export default function NavButtons ({ className, text, clickEvent }){
    
    return(
        
        <Button className={ className } onClick={ clickEvent }>{text}</Button>

    );

};