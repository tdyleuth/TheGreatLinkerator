import React, { useReducer } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Bookmarks from './Bookmarks'
import axios from 'axios';

const BASE_URL = "http://localhost:3000/api/links"

export default function BookmarkUI({ user, setUser }){


    async function createBookMark() {

        if(user.posts && user.posts.length > 0){return;}

        const token = localStorage.getItem('token')
        const headers = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ token }`} 
                }

        try{
            const { data: { links } } = await axios.get(BASE_URL + '/user', headers);
            console.log('links inner is ', links);
            // return links;

            const bookmarkArr = links.map((bookmark) => {

                const { id, name, url, comment, tags, clicks, datecreated, dateModified, lastAccessed } = bookmark;
    
                const bookmarkCard = (
                        <Bookmarks key={id} id={id} name={name} url={url} tags={tags} clickCount={clicks} dateCreated={datecreated} dateModified={dateModified} comment={comment} lastAccessed={ lastAccessed } />
                );
    
                return bookmarkCard;
            });
        
            
            const userId = user.id;
            const username = user.username;
            const userRealName = user.name;

            
            setUser({
                id: userId,
                username: username,
                name: userRealName,
                posts: bookmarkArr
            })
            return bookmarkArr;
        }
        catch(err){
            console.error(err)
            throw err;
        }
    }
        
    let linksArr = [];
    const links = createBookMark().
    then((links) => linksArr = links) 

    console.log('linksArr is ', linksArr);

    return(
        
        <div id='bookmark-ui'>

            {/* {
                () => {
                    console.log('We made it');
                    const links = createBookMark().
                    then((links) => {
                        const bookmarkArr = links.map((bookmark) => {

                            const { id, name, url, comment, tags, clicks, datecreated, dateModified, lastAccessed } = bookmark;
                
                            const bookmarkCard = (
                                    <Bookmarks key={id} id={id} name={name} url={url} tags={tags} clickCount={clicks} dateCreated={datecreated} dateModified={dateModified} comment={comment} lastAccessed={ lastAccessed } />
                            );
                
                            return bookmarkCard;
                        });
                        console.log('bookmarkArr is ', bookmarkArr);
                        return bookmarkArr;
                    })
                }
            } */}
        

        

            <Bookmarks id='2' key='1' name='Test' url='https://www.google.com' tags='something' clickCount='5' dateCreated='2020-05-06' dateModified='2020-06-06' lastAccessed='2020-05-09' comment='I am a comment. I cant be short, but I can also be long. This is just filler content though.sabvazadevishuzatanapemusceregmacowmewzewzugfuvpalupdozejoiferinirizkuriagrovgebkugezmujjimbacjocaebsahgehbuduneflodirmoheahuzaufravkancuelladrazhebhucocgujorpurvizurbupfuvhasalcihionewerajguznenoupvupfezumibaedecomvejaminhowebiditgutaodovaebaijoesefivzuvijzilhucjuhzudpiocfurcijiwfebzepakhacogrubitzoheponbategdoznazotadjaniovdeecvaehairac' />

            <Bookmarks id='8' key='8' name='Test' url='https://www.google.com' tags='something' clickCount='5' dateCreated='June 5th, 2020' dateModified='July 1st, 2020' lastAccessed='June 13th, 2020' comment='I am a comment. I cant be short, but I can also be long. This is just filler content though.sabvazadevishuzatanapemusceregmacowmewzewzugfuvpalupdozejoiferinirizkuriagrovgebkugezmujjimbacjocaebsahgehbuduneflodirmoheahuzaufravkancuelladrazhebhucocgujorpurvizurbupfuvhasalcihionewerajguznenoupvupfezumibaedecomvejaminhowebiditgutaodovaebaijoesefivzuvijzilhucjuhzudpiocfurcijiwfebzepakhacogrubitzoheponbategdoznazotadjaniovdeecvaehairac' />

            <Bookmarks id='7' key='7' name='Test' url='https://www.google.com' tags='something' clickCount='5' dateCreated='June 5th, 2020' dateModified='July 1st, 2020' lastAccessed='June 13th, 2020' comment='I am a comment. I cant be short, but I can also be long. This is just filler content though.sabvazadevishuzatanapemusceregmacowmewzewzugfuvpalupdozejoiferinirizkuriagrovgebkugezmujjimbacjocaebsahgehbuduneflodirmoheahuzaufravkancuelladrazhebhucocgujorpurvizurbupfuvhasalcihionewerajguznenoupvupfezumibaedecomvejaminhowebiditgutaodovaebaijoesefivzuvijzilhucjuhzudpiocfurcijiwfebzepakhacogrubitzoheponbategdoznazotadjaniovdeecvaehairac' />

            <Bookmarks id='6' key='6' name='Test' url='https://www.google.com' tags='something' clickCount='5' dateCreated='June 5th, 2020' dateModified='July 1st, 2020' lastAccessed='June 13th, 2020' comment='I am a comment. I cant be short, but I can also be long. This is just filler content though.sabvazadevishuzatanapemusceregmacowmewzewzugfuvpalupdozejoiferinirizkuriagrovgebkugezmujjimbacjocaebsahgehbuduneflodirmoheahuzaufravkancuelladrazhebhucocgujorpurvizurbupfuvhasalcihionewerajguznenoupvupfezumibaedecomvejaminhowebiditgutaodovaebaijoesefivzuvijzilhucjuhzudpiocfurcijiwfebzepakhacogrubitzoheponbategdoznazotadjaniovdeecvaehairac' />

            <Bookmarks id='5' key='5' name='Test' url='https://www.google.com' tags='something' clickCount='5' dateCreated='June 5th, 2020' dateModified='July 1st, 2020' lastAccessed='June 13th, 2020' comment='I am a comment. I cant be short, but I can also be long. This is just filler content though.sabvazadevishuzatanapemusceregmacowmewzewzugfuvpalupdozejoiferinirizkuriagrovgebkugezmujjimbacjocaebsahgehbuduneflodirmoheahuzaufravkancuelladrazhebhucocgujorpurvizurbupfuvhasalcihionewerajguznenoupvupfezumibaedecomvejaminhowebiditgutaodovaebaijoesefivzuvijzilhucjuhzudpiocfurcijiwfebzepakhacogrubitzoheponbategdoznazotadjaniovdeecvaehairac' />

            <Bookmarks id='4' key='4' name='Test' url='https://www.google.com' tags='something' clickCount='5' dateCreated='June 5th, 2020' dateModified='July 1st, 2020' lastAccessed='June 13th, 2020' comment='I am a comment. I cant be short, but I can also be long. This is just filler content though.sabvazadevishuzatanapemusceregmacowmewzewzugfuvpalupdozejoiferinirizkuriagrovgebkugezmujjimbacjocaebsahgehbuduneflodirmoheahuzaufravkancuelladrazhebhucocgujorpurvizurbupfuvhasalcihionewerajguznenoupvupfezumibaedecomvejaminhowebiditgutaodovaebaijoesefivzuvijzilhucjuhzudpiocfurcijiwfebzepakhacogrubitzoheponbategdoznazotadjaniovdeecvaehairac' />

        </div>
    );
    
    
    
    
    
}