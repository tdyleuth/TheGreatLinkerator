// /src/components/New-Bookmark.js

import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import {Animated} from "react-animated-css";

import axios from 'axios';

const BASE_URL = `{ ${process.env.DATABASE_URL}/api/links }` || 'http://localhost:3000/api/links';


function BookmarkForm({ show, hideEvent, setShow, setNewBookmarkNotice, setEditBookmarkNotice, setLogoutNotice, setLoginNotice, duplicateError, setDuplicateError, setVisibility, visibility, action, links, setLinks, modalTags, setModalTags }){
  

    async function createBookmark() {
       
        const name = document.getElementById('bkmrk-input-name').value;
        const url = document.getElementById('bkmrk-input-url').value;
        const tags= document.getElementById('bkmrk-input-tags').value;
        const comment = document.getElementById('bkmrk-input-desc').value
 
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


        if( message === `duplicate key value violates unique constraint "links_url_key"`){
            setDuplicateError(true)
            setTimeout(() => {
                setVisibility(false);
            }, 200);
            setTimeout(() => {
                setVisibility(true);
            }, 2500);
            setTimeout(() => {
                setDuplicateError(false);
            }, 3000);
            return;
        }

        if ( message === `New link created!`){
            
            const newLinksArr = links;
            newLinksArr.push(data);
            setLinks(newLinksArr);
            
            setEditBookmarkNotice(false);
            setNewBookmarkNotice(true);
            setLogoutNotice(false);
            setLoginNotice(false);
            setTimeout(() => {
                setVisibility(false);
            }, 200);
            setTimeout(() => {
                setVisibility(true);
            }, 2500);
            setTimeout(() => {
                setNewBookmarkNotice(false);
            }, 3000);
            
        }
        
        console.log('New bookmark is ', data);

        return data;
        
        } catch (err) {
            console.error('Error creating bookmark at /src/components/New-Bookmark @ createBookmark(event). Error', err)
            throw err;
        }
        
    }


    async function handleCreateBookMark (event){

        event.preventDefault();
        event.stopPropagation();
        setDuplicateError(false);

        const newBookmark = await createBookmark();
         
        //  If bookmark is successful, update state accordingly
        if(newBookmark){
            setShow(false);
        } 
    }

    function handleTagRemove(event){

        const targetId = +(event.target.parentNode.getAttribute('id'));

        const updatedTagsArr = modalTags.filter((tagObj) => {if(targetId != tagObj.id){return tagObj}});

        setModalTags(updatedTagsArr);
    }

    function handleTagEdit(event){
        
        const tagText = event.target.textContent;
        handleTagRemove(event);
        document.getElementById('bkmrk-input-tags').value = tagText;

    }

    function handleTagInput(event){

        const linkId=event;
        console.log('event is ', event);
        

        // console.log('linkId is '), linkId;
        // const [ response ] = links.filter((link) => link.id === linkId );

        // const { name: editName, url: editUrl, comment: description, tags: editTags } = response;

        // setModalTags(editTags);
        
        // setEditBkmrkModal(true);

        // setTimeout(() => {
        // document.getElementById('bkmrk-input-name').value = editName;
        // document.getElementById('bkmrk-input-url').value = editUrl;
        // document.getElementById('bkmrk-input-desc').value = description;
        // }, 100)

    }

    return(

        <Modal
        size='lg'
        show={ show }
        onHide={ hideEvent }
        id='bkmrk-input-modal'
        >
            <Modal.Header closeButton>

                <Modal.Title id='bkmrk-input-header'>{ action } Bookmark</Modal.Title>

            </Modal.Header>
                
            <Modal.Body>

                <Form onSubmit = { handleCreateBookMark }>
                    <Form.Group>

                        <Animated animationIn='fadeOut' animationOut='fadeIn' isVisible={ visibility } >
                            <Alert id='duplicate-link-found' variant='danger' dismissible show={ duplicateError }  onClose={ () => setDuplicateError(false)} >
                                <Alert.Heading> Duplicate bookmark found! Please try again.</Alert.Heading>
                            </Alert>
                        </Animated>
                
                        <Form.Label>Name:</Form.Label>
                        <Form.Control as='input' id='bkmrk-input-name' placeholder='Boomark Name'required></Form.Control>

                        <Form.Label>URL:</Form.Label>
                        <Form.Control as='input' id='bkmrk-input-url' placeholder="https://example.com"
                        pattern="https://.*" size="30" required></Form.Control>

                        <Form.Label>Description (optional):</Form.Label>
                        <Form.Control as='textarea' id='bkmrk-input-desc' rows='5' placeholder='Description...'></Form.Control>
                        
                        <Form.Label>Tags (separated by commas):</Form.Label>
                        <Form.Control as='input' onKeyUp={ (e) => handleTagInput(e) } id='bkmrk-input-tags' placeholder='Tag1, Tag2, Tag3, ...'></Form.Control>
                        <div id='tag-area'>
                            {modalTags.map(

                                (tagObj) =>
                                    (<div className='modal-tag' id={`${tagObj.id}`}  key={`${tagObj.id}`}>
                                        <div onClick={ (e) => handleTagEdit(e) }>
                                            { tagObj.name }
                                        </div>
                                        <span className="material-icons" id={`${tagObj.name}-delete`} onClick={ (e) => handleTagRemove(e) }>
                                            clear
                                        </span>
                                    </div>)
                                )
                            }
                        </div>

                        <div id='bkmrk-input-btns'>
                            <Button id='submit-bkmrk' type='submit'>Submit</Button>
                            <Button id='close-bkmrk-input' onClick={ hideEvent } >Close</Button>
                        </div>
                        
                    </Form.Group>
                </Form>
                
            </Modal.Body>

        </Modal>
    )

}


export default BookmarkForm;