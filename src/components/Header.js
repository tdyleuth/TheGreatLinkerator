// /src/components/header.js

import React, { useState } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron'


export default function Header (){

    const [ imageSuccess, setImageSuccess ] = useState(true);

    const handleLogoError = () => {
        
        setImageSuccess(false);

    }

    return(
        
        <Jumbotron>

            <div id='header'>

                <img className='chain' alt='Stylized chain link' src='/assets/chain-link.png' />
                <div>
                    {imageSuccess

                        ? <img id='logo' src='/assets/logo.png' alt='"The Great Linkerator" written in a pixelated font in front of a padlock' onError={ handleLogoError } />

                        : <div id='fallback-logo'>
                            <h1>The Great Linkerator</h1>
                            <h2>The new way to bookmark the web</h2>
                        </div>
                    }

                </div>
                <img className='chain' alt='Stylized chain link' src='/assets/chain-link.png' />
                
            </div>

        </Jumbotron>
    
    );

};
