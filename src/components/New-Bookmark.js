// /src/components/New-Bookmark.js

import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'
import Fade from 'react-bootstrap/Fade';

import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/links';


function NewBookmarkForm({ show, hideEvent, setShow, setBookmarkNotice, setLogoutNotice, duplicateError, setDuplicateError }){

    
  

    async function createBookmark() {
       
        const name = document.getElementById('new-bkmrk-name').value;
        const url = document.getElementById('new-bkmrk-url').value;
        const tags= document.getElementById('new-bkmrk-tags').value;
        const comment = document.getElementById('new-bkmrk-desc').value
 
        const tagsArray = tags.split(",")

      
        const token = localStorage.getItem('token');
        
       
        const headers = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ token }`} 
            }
        const data = {
            name, 
            url, 
            tags: tagsArray, 
            comment }
        
        try {
        

        const { data: { message } } = await axios.post(BASE_URL, data, headers)

        console.log("Messageasas:", message)

        if( message === `duplicate key value violates unique constraint "links_url_key"`){
            setDuplicateError(true)
            return;
        }

        if ( message === `New link created!`){
            setBookmarkNotice(true)
            setLogoutNotice(false);
        }
        
       
        console.log('New bookmark is ', data);

        return data;
        


     
        } catch (err) {
            console.error('Error creating bookmark at /src/components/New-Bookmark @ createBookmark(event). Error', err)
            throw error;
        }
        
    }


    async function handleCreateBookMark (event){

        event.preventDefault();
        event.stopPropagation();
        setDuplicateError(false);

        
        const newBookmark = await createBookmark();
         
//  Bookmark is successful, update state accordingly
        if(newBookmark){
            setShow(false);

        } 
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

                <Form onSubmit = { handleCreateBookMark }>
                    <Form.Group>

                        <Fade>
                            <Alert id='duplicate-link-found' variant='danger' dismissible show={ duplicateError }  onClose={ () => setDuplicateError(false)} >
                                <Alert.Heading> Duplicate bookmark found! Please try again.</Alert.Heading>
                            </Alert>
                        </Fade>
                
                        <Form.Label>Name:</Form.Label>
                        <Form.Control as='input' id='new-bkmrk-name' required></Form.Control>

                        <Form.Label>URL:</Form.Label>
                        <Form.Control as='input' id='new-bkmrk-url' placeholder="https://example.com"
                        pattern="https://.*" size="30" required></Form.Control>

                        <Form.Label>Tags (separated by commas):</Form.Label>
                        <Form.Control as='input' id='new-bkmrk-tags'></Form.Control>

                        <Form.Label>Description (optional):</Form.Label>
                        <Form.Control as='textarea' 
                        id='new-bkmrk-desc'rows='5'></Form.Control>
                        
                        <div id='new-bkmrk-btns'>
                            <Button id='submit-new-bkmrk' type='submit'>Submit</Button>
                            <Button id='close-new-bkmrk' onClick={ hideEvent } >Close</Button>
                        </div>
                        
                    </Form.Group>
                </Form>
                
            </Modal.Body>

        </Modal>
    )

}


export default NewBookmarkForm