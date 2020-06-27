// /src/components/New-Bookmark.js

import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import axios from 'axios';

export default function NewBookmark({ show, hideEvent }){

    async function createBookmark(event) {
        
        event.preventDefault();

        const name = document.getElementById('new-bkmrk-name').value;
        const url = document.getElementById('new-bkmrk-url').value;
        const tags = document.getElementById('new-bkmrk-tags').value;
        const comment = document.getElementById('new-bkmrk-desc').value;

        const bookmark = await axios.post('http://localhost:3000/api/links', {
            name, url, tags, comment
        });

        console.log('bookmark is ', bookmark);
        
        hideEvent();
    }

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
                        <Form.Control as='input' id='new-bkmrk-name' required></Form.Control>

                        <Form.Label>URL:</Form.Label>
                        <Form.Control as='input' id='new-bkmrk-url' required></Form.Control>

                        <Form.Label>Tags (separated by commas):</Form.Label>
                        <Form.Control as='input' id='new-bkmrk-tags'></Form.Control>

                        <Form.Label>Description (optional):</Form.Label>
                        <Form.Control as='textarea' 
                        id='new-bkmrk-desc'
// @ts-ignore
                        rows='5'></Form.Control>
                        
                        <div id='new-bkmrk-btns'>
                            <Button id='submit-new-bkmrk'type='submit' onClick={ createBookmark }>Submit</Button>
                            <Button id='close-new-bkmrk' onClick={ hideEvent } >Close</Button>
                        </div>
                        
                    </Form.Group>
                </Form>
                
            </Modal.Body>

        </Modal>
    )

}