// /src/components/header.js

import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron'


export default function Header (){
    
    return(
        
        <Jumbotron>

            
                <h1>The Great Linkerator</h1>
                <h2>The new way to bookmark the web</h2>
            
            
            {/* Error handler in case of image load failure */}
            {/* {onError
                ? null
                : <img src='./logo' alt='A three link chain with left and right displaying only half links'/>
            } */}

        </Jumbotron>
    
    );

};