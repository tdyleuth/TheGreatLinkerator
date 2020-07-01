import React, { useReducer } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Bookmarks from './Bookmarks'
import axios from 'axios';
import moment from 'moment';

const BASE_URL = 'https://linkeratorthegreat.herokuapp.com/api/users' || "http://localhost:3000/api/links"

export default function BookmarkUI({ links, setLinks, setEditBkmrkModal, deleteBookmarkNotice, setDeleteBookmarkNotice, setVisibility, visibility, setModalTags }){

    return(
        
        <div id='bookmark-ui'>

            {
                links.map((bookmark) => {

                    let { id, name, url, comment, tags, clicks, dateCreated, dateModified, lastAccessed } = bookmark;
                    dateCreated = moment(dateCreated).format("dddd, MMMM Do YYYY");
                    dateModified = moment(dateModified).format("dddd, MMMM Do YYYY");
                    lastAccessed = moment(lastAccessed).format("dddd, MMMM Do YYYY");
        
                    const bookmarkCard = (
                            <Bookmarks key={id} id={id} name={name} url={url} tags={tags} clickCount={clicks} dateCreated={dateCreated} dateModified={dateModified} comment={comment} lastAccessed={ lastAccessed } setLinks={setLinks} setEditBkmrkModal={ setEditBkmrkModal } links={links} setDeleteBookmarkNotice ={setDeleteBookmarkNotice} setVisibility={setVisibility} setModalTags={ setModalTags }/>
                    );
                    return bookmarkCard;
                })
            }

        </div>
    );
    
    
    
    
    
}