

import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



export default function NewBookmark({ show, hideEvent, closeEvent }){

    return(

        <Modal
        size='lg'
        show={ show }
        onHide={ hideEvent }
        id='new-bkmrk-modal'
        >
            <Modal.Header closeButton>

                <Modal.Title id='new-bkmk-header'>Create New Bookmark</Modal.Title>

            </Modal.Header>
                
            <Modal.Body>

                <Form>
                    <Form.Group>
                
                        <Form.Label>Name:</Form.Label>
                        <Form.Control as='input' required></Form.Control>

                        <Form.Label>URL:</Form.Label>
                        <Form.Control as='input' required></Form.Control>

                        <Form.Label>Tags (separated by commas):</Form.Label>
                        <Form.Control as='input'></Form.Control>

                        <Form.Label>Description (optional):</Form.Label>
                        <Form.Control as='textarea' 
// @ts-ignore
                        rows='5'></Form.Control>
                        
                        <div id='new-bkmrk-btns'>
                            <Button id='submit-new-bkmrk'type='submit' >Submit</Button>
                            <Button id='close-new-bkmrk' onClick={ closeEvent } >Close</Button>
                        </div>
                        
                    </Form.Group>
                </Form>
                
            </Modal.Body>

        </Modal>
    )

}