// /src/components/header.js

import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron'


export default function Header (){
    
    return(
        
        <Jumbotron>

            <div id='header'>

                <img className='chain' alt='Stylized chain link' src='/assets/chain-link.png' />
                <div>
                    <h1>The Great Linkerator</h1>
                    <h2>The new way to bookmark the web</h2>
                </div>
                <img className='chain' alt='Stylized chain link' src='/assets/chain-link.png' />
                
            </div>
            
            {/* Error handler in case of image load failure */}
            {/* {onError
                ? null
                : <img src='./logo' alt='A three link chain with left and right displaying only half links'/>
            } */}

        </Jumbotron>
    
    );

};