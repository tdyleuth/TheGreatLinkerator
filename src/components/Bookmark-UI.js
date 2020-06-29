import React, { useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Bookmarks from './Bookmarks'
import axios from 'axios';


const BASE_URL = "http://localhost:3000/api/links"



export default function BookmarkUI({ user, setUser }){

    async function createBookMark() {

    const token = localStorage.getItem('token')

    const headers = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ token }`} 
            }
    try{
        const { data: { links } } = await axios.get(BASE_URL + '/user', headers)
     
        return links;
       
            
        
    } catch(err){
        console.error(err)
        throw err;
     }
    }

    // useEffect(() => {

       
    //     }, [user] )

    
        createBookMark () .then((data) => {
              data.forEach ( (bookmark) => {
                   const { id, name, url, comment, tags, clicks, datecreated } = bookmark
                 
                   console.log("test10", bookmark)
                 
                   const bookmarkCard = (
   
                      <Accordion>
                      
                      <Bookmarks key={id} name={name} url={url} tags={tags} clickCount={clicks} dateCreated={datecreated} comment={comment}/>
           
                      </Accordion>
                  
               
                  ) 
                    console.log("BMcard",bookmarkCard)
                  return bookmarkCard;
                });
                           
          })
                //  console.log("Test88",bookmarks)
  
                 return (
                    // <Accordion>
                               
                    // <Bookmarks name="google" url="www.google.com" tags= "tech" clickCount="1" dateCreated="datehere" comment="comment here"/>
            
                    // </Accordion>
                    <div></div>
                 )          
  
 } 

   