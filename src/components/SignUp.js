import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function SignUpForm({ show, hideEvent }){

    return(

        <Modal
        size='lg'
        show={ show }
        onHide={ hideEvent }
        id='new-bkmrk-modal'
        >
            <Modal.Header closeButton>

                <Modal.Title id='new-bkmk-header'>Register</Modal.Title>

            </Modal.Header>
                
            <Modal.Body>

                <Form>
                    <Form.Group>

                        <Form.Label>Enter New Name</Form.Label>
                        <Form.Control as='input' required></Form.Control>
                
                        <Form.Label>Enter New Username</Form.Label>
                        <Form.Control as='input' required></Form.Control>

                        <Form.Label>Enter New Password</Form.Label>
                        <Form.Control as='input' required></Form.Control>
                        
                        <div id='signUpForm-btns'>
                            <Button id='submit-signUpForm'type='submit' >Register</Button>
                            <Button id='close-signUpForm' onClick={ hideEvent } >Close</Button>
                        </div>
                        
                    </Form.Group>
                </Form>
                
            </Modal.Body>

        </Modal>
    )

}

export default SignUpForm