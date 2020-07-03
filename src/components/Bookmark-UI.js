import React from 'react';
import Bookmarks from './Bookmarks';
import moment from 'moment';


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