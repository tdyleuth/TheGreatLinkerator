import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function LoginForm({ show, hideEvent }){

    return(

        <Modal
        size='lg'
        show={ show }
        onHide={ hideEvent }
        id='new-bkmrk-modal'
        >
            <Modal.Header closeButton>

                <Modal.Title id='new-bkmk-header'>Login</Modal.Title>

            </Modal.Header>
                
            <Modal.Body>

                <Form>
                    <Form.Group>
                
                        <Form.Label>Enter Username</Form.Label>
                        <Form.Control as='input' required></Form.Control>

                        <Form.Label>Enter Password</Form.Label>
                        <Form.Control as='input' required></Form.Control>
                        
                        <div id='#loginForm-btns'>
                            <Button id='submit-loginForm'type='submit'>Login</Button>
                            <Button id='close-loginForm' onClick={ hideEvent } >Close</Button>
                        </div>
                        
                    </Form.Group>
                </Form>
                
            </Modal.Body>

        </Modal>
    )

}

export default LoginForm