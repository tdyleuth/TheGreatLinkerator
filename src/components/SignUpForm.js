// /src/components/SignUpForm.js

import React, { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Fade from 'react-bootstrap/Fade';


import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/users';

function SignUpForm({ show, hideEvent }){

    const [ userError, setUserError ] = useState(false);
    const [ passwordError, setPasswordError ] = useState(false);

    async function handleSignup(event){

        event.preventDefault();
        event.stopPropagation();

        const name = document.getElementById('signup-name').value;
        const username = document.getElementById('signup-username').value;
        const password = document.getElementById('signup-password').value;

        const { data: { name: messageName, token } } = await axios.post(BASE_URL + '/register', {
            username,
            password,
            name
        })

        if(messageName === 'UserExistsError' ){
            setUserError(true);
        }
        if(messageName === 'PasswordLengthError'){
            setPasswordError(true);
        }

    }


    return(

        <Modal
        size='lg'
        show={ show }
        onHide={ hideEvent }
        id='signup-modal'
        >
            <Modal.Header closeButton>

                <Modal.Title id='signup-header'>Register</Modal.Title>

            </Modal.Header>
                
            <Modal.Body>

                <Form onSubmit={ handleSignup }>
                    <Form.Group>

                        <Fade>
                            <Alert id='user-exists-error' variant='danger' dismissible show={ userError }  onClose={ () => setUserError(false)} >
                                <Alert.Heading> A user by this username already exists! Please try registering with a different username. </Alert.Heading>
                            </Alert>
                        </Fade>

                        <Fade>
                            <Alert id='short-password' variant='danger' dismissible show={ passwordError }  onClose={ () => setPasswordError(false)} >
                                <Alert.Heading> Password must be at least 8 characters in length </Alert.Heading>
                            </Alert>
                        </Fade>
                        
                        
                        <Form.Label>Enter New Name</Form.Label>
                        <Form.Control id='signup-name' as='input' required></Form.Control>
                
                        <Form.Label>Enter New Username</Form.Label>
                        <Form.Control id='signup-username' as='input' required></Form.Control>

                        <Form.Label>Enter New Password</Form.Label>
                        <Form.Control id='signup-password' as='input' type='password' required></Form.Control>
                        
                        <div id='signUpForm-btns'>
                            <Button id='submit-signUpForm' type='submit' >Register</Button>
                            <Button id='close-signUpForm' onClick={ hideEvent } >Close</Button>
                        </div>
                        
                    </Form.Group>
                </Form>
                
            </Modal.Body>

        </Modal>
    )

}

export default SignUpForm