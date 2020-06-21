import React from 'react';
import './header.css'
import Jumbotron from 'react-bootstrap/Jumbotron'


export default function Header (){
    
    return(
        <header>
            <Jumbotron>

                <div id='header'>
                    <h1>The Great Linkerator</h1>
                    <h2>The new way to bookmark the web</h2>
                </div>
                
                {/* Error handler in case of image load failure */}
                {/* {onError
                    ? null
                    : <img src='./logo' alt='A three link chain with left and right displaying only half links'/>
                } */}

            </Jumbotron>
    </header>
    );

};