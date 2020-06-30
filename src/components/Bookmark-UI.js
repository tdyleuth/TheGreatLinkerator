import React, { useReducer } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Bookmarks from './Bookmarks'
import axios from 'axios';

const BASE_URL = "http://localhost:3000/api/links"

export default function BookmarkUI({ links, setLinks, setDeleteBookmarkNotice, setVisibility }){


    return(
        
        <div id='bookmark-ui'>

            {
                links.map((bookmark) => {

                    const { id, name, url, comment, tags, clicks, datecreated, dateModified, lastAccessed } = bookmark;
        
                    const bookmarkCard = (
                            <Bookmarks key={id} id={id} name={name} url={url} tags={tags} clickCount={clicks} dateCreated={datecreated} dateModified={dateModified} comment={comment} lastAccessed={ lastAccessed } setLinks={setLinks} links={links} setDeleteBookmarkNotice ={setDeleteBookmarkNotice} setVisibility={setVisibility} />
                    );
        
                    return bookmarkCard;
                })
            }
        

            <Bookmarks id='2' key='1' name='Test' url='https://www.google.com' tags='something' clickCount='5' dateCreated='2020-05-06' dateModified='2020-06-06' lastAccessed='2020-05-09' comment='I am a comment. I cant be short, but I can also be long. This is just filler content though.sabvazadevishuzatanapemusceregmacowmewzewzugfuvpalupdozejoiferinirizkuriagrovgebkugezmujjimbacjocaebsahgehbuduneflodirmoheahuzaufravkancuelladrazhebhucocgujorpurvizurbupfuvhasalcihionewerajguznenoupvupfezumibaedecomvejaminhowebiditgutaodovaebaijoesefivzuvijzilhucjuhzudpiocfurcijiwfebzepakhacogrubitzoheponbategdoznazotadjaniovdeecvaehairac' setLinks={setLinks} links={links} setDeleteBookmarkNotice={setDeleteBookmarkNotice} setVisibility={setVisibility} />

            <Bookmarks id='8' key='8' name='Test' url='https://www.google.com' tags='something' clickCount='5' dateCreated='June 5th, 2020' dateModified='July 1st, 2020' lastAccessed='June 13th, 2020' comment='I am a comment. I cant be short, but I can also be long. This is just filler content though.sabvazadevishuzatanapemusceregmacowmewzewzugfuvpalupdozejoiferinirizkuriagrovgebkugezmujjimbacjocaebsahgehbuduneflodirmoheahuzaufravkancuelladrazhebhucocgujorpurvizurbupfuvhasalcihionewerajguznenoupvupfezumibaedecomvejaminhowebiditgutaodovaebaijoesefivzuvijzilhucjuhzudpiocfurcijiwfebzepakhacogrubitzoheponbategdoznazotadjaniovdeecvaehairac' setLinks={setLinks} links={links} setDeleteBookmarkNotice ={setDeleteBookmarkNotice} setVisibility={setVisibility}/>

            <Bookmarks id='7' key='7' name='Test' url='https://www.google.com' tags='something' clickCount='5' dateCreated='June 5th, 2020' dateModified='July 1st, 2020' lastAccessed='June 13th, 2020' comment='I am a comment. I cant be short, but I can also be long. This is just filler content though.sabvazadevishuzatanapemusceregmacowmewzewzugfuvpalupdozejoiferinirizkuriagrovgebkugezmujjimbacjocaebsahgehbuduneflodirmoheahuzaufravkancuelladrazhebhucocgujorpurvizurbupfuvhasalcihionewerajguznenoupvupfezumibaedecomvejaminhowebiditgutaodovaebaijoesefivzuvijzilhucjuhzudpiocfurcijiwfebzepakhacogrubitzoheponbategdoznazotadjaniovdeecvaehairac' setLinks={setLinks} links={links} setDeleteBookmarkNotice ={setDeleteBookmarkNotice} setVisibility={setVisibility}/>

            <Bookmarks id='6' key='6' name='Test' url='https://www.google.com' tags='something' clickCount='5' dateCreated='June 5th, 2020' dateModified='July 1st, 2020' lastAccessed='June 13th, 2020' comment='I am a comment. I cant be short, but I can also be long. This is just filler content though.sabvazadevishuzatanapemusceregmacowmewzewzugfuvpalupdozejoiferinirizkuriagrovgebkugezmujjimbacjocaebsahgehbuduneflodirmoheahuzaufravkancuelladrazhebhucocgujorpurvizurbupfuvhasalcihionewerajguznenoupvupfezumibaedecomvejaminhowebiditgutaodovaebaijoesefivzuvijzilhucjuhzudpiocfurcijiwfebzepakhacogrubitzoheponbategdoznazotadjaniovdeecvaehairac' setLinks={setLinks} links={links} setDeleteBookmarkNotice ={setDeleteBookmarkNotice} setVisibility={setVisibility}/>

            <Bookmarks id='5' key='5' name='Test' url='https://www.google.com' tags='something' clickCount='5' dateCreated='June 5th, 2020' dateModified='July 1st, 2020' lastAccessed='June 13th, 2020' comment='I am a comment. I cant be short, but I can also be long. This is just filler content though.sabvazadevishuzatanapemusceregmacowmewzewzugfuvpalupdozejoiferinirizkuriagrovgebkugezmujjimbacjocaebsahgehbuduneflodirmoheahuzaufravkancuelladrazhebhucocgujorpurvizurbupfuvhasalcihionewerajguznenoupvupfezumibaedecomvejaminhowebiditgutaodovaebaijoesefivzuvijzilhucjuhzudpiocfurcijiwfebzepakhacogrubitzoheponbategdoznazotadjaniovdeecvaehairac' setLinks={setLinks} links={links} setDeleteBookmarkNotice ={setDeleteBookmarkNotice} setVisibility={setVisibility}/>

            <Bookmarks id='4' key='4' name='Test' url='https://www.google.com' tags='something' clickCount='5' dateCreated='June 5th, 2020' dateModified='July 1st, 2020' lastAccessed='June 13th, 2020' comment='I am a comment. I cant be short, but I can also be long. This is just filler content though.sabvazadevishuzatanapemusceregmacowmewzewzugfuvpalupdozejoiferinirizkuriagrovgebkugezmujjimbacjocaebsahgehbuduneflodirmoheahuzaufravkancuelladrazhebhucocgujorpurvizurbupfuvhasalcihionewerajguznenoupvupfezumibaedecomvejaminhowebiditgutaodovaebaijoesefivzuvijzilhucjuhzudpiocfurcijiwfebzepakhacogrubitzoheponbategdoznazotadjaniovdeecvaehairac' setLinks={setLinks} links={links} setDeleteBookmarkNotice ={setDeleteBookmarkNotice} setVisibility={setVisibility}/>

        </div>
    );
    
    
    
    
    
}