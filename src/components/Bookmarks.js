import React from 'react';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

import axios from 'axios';
import moment from 'moment';
import Dropdown from 'react-bootstrap/Dropdown';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';

import { BASE_URL } from '../constants';

const token = localStorage.getItem('token');
const headers = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ token }`} 
    }

function CustomToggle({ children, eventKey }) {

    const decoratedOnClick = useAccordionToggle(eventKey, () => null);

    const handleClick = (event) => {
        const element = event.target.tagName.toLowerCase();
        if( element !== 'span' && element !== 'a'){decoratedOnClick(event);}
    }
    
    return (
        <div
        onClick={handleClick}
        >
        {children}
        </div>
    );

}

export default function Bookmark( { id, name, url , comment, tags, clickCount , dateCreated, dateModified, lastAccessed, setLinks, links, setEditBkmrkModal, setDeleteBookmarkNotice, setVisibility, setModalTags} ){

    const handleLinkClick = async () =>{

        let newCount = +clickCount + 1;
        let newDate = moment().format('YYYY-MM-DD');
        
        const updates={
            clicks: newCount,
            'lastAccessed': newDate
        }

        try{
            const { data: { link: updatedLink } } = await axios.patch(BASE_URL + `/links/${id}`, updates, headers);
            const updatedLinksArr = links.map((link) => link.id != id ? link : updatedLink);
            setLinks(updatedLinksArr);
        }
        catch(err){
            console.error("There's been an error updating click count and date last accessed at /src/components/Bookmarks @ handleEventClick. Error: ", err );
            throw err;
        }

    }

   async function deleteBookmark(linkId){
    
        const token = localStorage.getItem('token');
        const headers = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ token }`} 
        }
         
        try {
           
            const deletedLink = await axios.delete(BASE_URL + `/links/${linkId}`, headers)
            if(deletedLink){
            const updatedLinks = links.filter((link) => {
                if(link.id != linkId){
                    return link;
                }
            }) 
           
            setLinks(updatedLinks)
            
            setDeleteBookmarkNotice(true)
            setTimeout(() => {
                setVisibility(false);
            }, 200);
            setTimeout(() => {
                setVisibility(true);
            }, 2500);
            setTimeout(() => {
                setDeleteBookmarkNotice(false);
            }, 3000);
          
            return deletedLink
            
         }
        }
        catch(err){
                console.error(err);
                throw err;
        }
    }

    function handleDelete(e){
        const linkId= e.target.getAttribute("id");
        deleteBookmark(linkId);
    }


    function handleEdit(e){
            
        const linkId= +(e.target.getAttribute("id"));
        const [ response ] = links.filter((link) => link.id === linkId );
        localStorage.setItem('linkId', JSON.stringify(linkId));

        const { name: editName, url: editUrl, comment: description, tags: editTags } = response;

        setModalTags(editTags);
        setEditBkmrkModal(true);

        setTimeout(() => {
            document.getElementById('bkmrk-input-name').value = editName;
            document.getElementById('bkmrk-input-url').value = editUrl;
            document.getElementById('bkmrk-input-desc').value = description;
        }, 100)
    }

    function createTagElements(){

        const tagElemArr = tags.map((tagObj) => (<div key={`${tagObj.id}`} className='tag' id={`tag-${tagObj.id}`}>{tagObj.name}</div>));

        return tagElemArr;
    }

    createTagElements();
    
    return(
        <Accordion id={id} key={id} defaultActiveKey='0'>
    
            <CustomToggle eventKey={ id }>
                    <Card.Header className='bookmark-header' >
                    
                        <Accordion.Toggle className='bookmark-name' as='h2' eventKey={ id }> 
                            { name }
                        </Accordion.Toggle>
                        
                        <a className='bookmark-link' target='_blank' href={ url } title={ comment } onClick={ handleLinkClick }>{ url }</a>
                        

                        <div className='bookmark-icons'>
                            
                            <Dropdown drop='left'>
                                <Dropdown.Toggle id={ `settngs-${id}` } as='span' className="material-icons settings">
                                        settings
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item className='edit-button' id={id} onClick={ (e) => handleEdit(e) }>Edit Bookmark</Dropdown.Item>
                                    <Dropdown.Item className='delete-button' id={id} onClick={ (e) => handleDelete(e) } >Delete Bookmark</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            <Accordion.Toggle as={ Button } variant="link" eventKey={ id }>
                                <span className="material-icons dropdown">
                                    arrow_drop_down
                                </span>
                            </Accordion.Toggle>
                        </div>
                        
                    </Card.Header>
            </CustomToggle >

            <Accordion.Collapse eventKey={ id }>
                <Card.Body>

                    <div className='card-main'>
                        <div className='card-comment'>
                            <h3>Description:</h3>
                            <p className='comment'>{ comment }</p> 
                        </div>

                        <div className='card-tags'>
                            <h3>Tags:</h3>
                            <div className='tag-container'>
                                { createTagElements() }
                            </div>
                        </div>
                    </div>

                    <div className='card-info'>
                        

                        <div className='card-stats'>
                            <h3>Date Created:</h3>           
                            <p> { dateCreated } </p>
                            <h3>Date Modified:</h3>
                            <p>{ dateModified }</p>
                            <h3>Last Accessed:</h3>
                            <p>{ lastAccessed }</p>
                            <h3>Click Count:</h3>
                            <p>{ clickCount }</p>
                            
                        </div>
                    </div>

                </Card.Body>
            </Accordion.Collapse>

        </Accordion>

    )

}