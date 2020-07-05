// /src/components/header.js

import React, { useState } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron'


export default function Header (){

    const [ mainImageSuccess, setMainImageSuccess ] = useState(true);
    const [ sideImageSuccess, setSideImageSuccess ] = useState(true);

    const handleLogoError = () => setMainImageSuccess(false);
    const handleSideImageError = () => setSideImageSuccess(false);


    return(
        
        <Jumbotron>

            <div id='header'>

                {sideImageSuccess
                
                    ? <img className='chain' alt='Stylized chain link' src='/assets/chain-link.png' onError={ handleSideImageError } />

                    : <div></div>
                }

                <div>
                    {mainImageSuccess

                        ? <img id='logo' src='/assets/logo.png' alt='"The Great Linkerator" written in a pixelated font in front of a padlock' onError={ handleLogoError } />

                        : <div id='fallback-logo'>
                            <h1>The Great Linkerator</h1>
                            <h2>The new way to bookmark the web</h2>
                        </div>
                    }

                </div>

                {sideImageSuccess
                
                    ? <img className='chain' alt='Stylized chain link' src='/assets/chain-link.png' onError={ handleSideImageError } />

                    : <div></div>
                }
                
            </div>

        </Jumbotron>
    
    );

};
