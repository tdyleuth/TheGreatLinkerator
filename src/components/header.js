// /src/components/header.js

import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron'


export default function Header (){

    const handleLogoError = () => {

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
    
            </Jumbotron>
        
        );
        
    }

    return(
        
        <Jumbotron>

            <div id='header'>

                <img className='chain' alt='Stylized chain link' src='/assets/chain-link.png' />
                <div>
                    <img id='logo' src='/assets/logo.png' alt='"The Great Linkerator" written in a pixelated font in front of a padlock' onError={ () => handleLogoError() }/>
                </div>
                <img className='chain' alt='Stylized chain link' src='/assets/chain-link.png' />
                
            </div>

        </Jumbotron>
    
    );

};