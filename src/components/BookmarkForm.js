// /src/components/New-Bookmark.js

import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import {Animated} from "react-animated-css";
import moment from 'moment';

import axios from 'axios';
import { BASE_URL } from '../constants';


function BookmarkForm({ show, hideEvent, setShow, setNewBookmarkNotice, setEditBookmarkNotice, setLogoutNotice, setLoginNotice, duplicateError, setDuplicateError, setVisibility, visibility, action, links, setLinks, modalTags, setModalTags }){
  

    async function createBookmark() {
        
       
        const name = document.getElementById('bkmrk-input-name').value;
        const url = document.getElementById('bkmrk-input-url').value;
        const tags= document.getElementById('bkmrk-input-tags').value;
        const comment = document.getElementById('bkmrk-input-desc').value
 
        const token = localStorage.getItem('token');
        
        const headers = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ token }`
            } 
        }
        
        let linkData = {};
        if(tags){
            const tagsArray = tags.split(",")
            linkData = {
                name, 
                url, 
                tags: tagsArray, 
                comment
            }
        }
        else{
            linkData = {
                name, 
                url, 
                comment
            }
        }
        
        try {
            const { data } = await axios.post(BASE_URL + '/links', linkData, headers)
            const{ message, link } = data;

            if( message === `duplicate key value violates unique constraint "links_creatorId_url_key"`){
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
                newLinksArr.unshift(link);
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

            return data;
        
        }
        catch (err) {
            console.error('Error creating bookmark at /src/components/New-Bookmark @ createBookmark(event). Error', err)
            throw err;
        }
        
    }

    async function editBookmark(){

        const name = document.getElementById('bkmrk-input-name').value;
        const url = document.getElementById('bkmrk-input-url').value;
        const tags= document.getElementById('bkmrk-input-tags').value;
        const comment = document.getElementById('bkmrk-input-desc').value
        const dateModified = moment().format('YYYY-MM-DD');
 
        const token = localStorage.getItem('token');
        
        const headers = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ token }`
            } 
        }
        
        let linkData = {};
        if(tags){
            const tagsArray = tags.split(",")
            linkData = {
                name, 
                url, 
                tags: tagsArray, 
                comment,
                dateModified
            }
        }
        else{
            linkData = {
                name, 
                url,
                comment,
                dateModified
            }
        }
        
        try {
            
            const linkId = localStorage.getItem('linkId');
            const { data } = await axios.patch(BASE_URL + `/links/${linkId}`, linkData, headers)
            const{ message, link } = data;

            if( message === `duplicate key value violates unique constraint "links_creatorId_url_key"`){
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

            if ( message === 'Link has been updated'){
                const newLinksArr = links.filter((linkObj) => linkObj.id !== +linkId)
                newLinksArr.push(link);
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

            return data;
        
        }
        catch (err) {
            console.error('Error creating bookmark at /src/components/New-Bookmark @ createBookmark(event). Error', err)
            throw err;
        }
    }

    async function handleCreateOrEditBookMark (event){

        event.preventDefault();
        event.stopPropagation();
        setDuplicateError(false);

        if(action === 'Create New'){
            
            const newBookmark = await createBookmark();
            //  If bookmark is successful, close modal
            if(newBookmark){
                setShow(false);
            }
        }
        else if(action === 'Edit'){
            
            const newBookmark = await editBookmark();

            if(newBookmark){
                setShow(false);
            }
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
        
        if(event.which === 32){
            const newTag = {id: '', name: event.target.value};
            const newTags = modalTags;
            newTags.push(newTag);
            setModalTags(newTags);
            document.getElementById('bkmrk-input-tags').value = '';
        }
        
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

                <Form onSubmit = { handleCreateOrEditBookMark }>
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
                        <Form.Control as='input' onKeyPress={ (e) => handleTagInput(e) } id='bkmrk-input-tags' placeholder='Tag1, Tag2, Tag3, ...'></Form.Control>
                        <div id='tag-area'>
                            {modalTags.map((tagObj) => {
                                let tempTagId = 9999;

                                if(tagObj.id){
                                    return (
                                        <div className='modal-tag' id={`${tagObj.id}`}  key={`${tagObj.id}`}>
                                            <div onClick={ (e) => handleTagEdit(e) }>
                                                { tagObj.name }
                                            </div>
                                            <span className="material-icons" id={`${tagObj.name}-delete`} onClick={ (e) => handleTagRemove(e) }>
                                                clear
                                            </span>
                                        </div>
                                    )
                                }
                                else{
                                    --tempTagId;
                                    return (
                                        <div className='modal-tag' id={`${tempTagId}`}  key={`${tempTagId}`}>
                                            <div onClick={ (e) => handleTagEdit(e) }>
                                                { tagObj.name }
                                            </div>
                                            <span className="material-icons" id={`${tagObj.name}-delete`} onClick={ (e) => handleTagRemove(e) }>
                                                clear
                                            </span>
                                        </div>
                                    )
                                }
                            })}
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