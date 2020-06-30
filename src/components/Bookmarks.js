import React from 'react';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import dropdown from 'react-bootstrap/Dropdown';

import axios from 'axios';
import moment from 'moment';
import Dropdown from 'react-bootstrap/Dropdown';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';

const BASE_URL = 'http://localhost:3000/api/links';
const token = localStorage.getItem('token');
const headers = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ token }`} 
    }

function CustomToggle({ children, eventKey }) {


    const decoratedOnClick = useAccordionToggle(eventKey, () =>
        console.log('totally custom!'),
    );

    console.log('decoratedOnClick is ', decoratedOnClick.toString());

    const handleClick = (event) => {
        
        const element = event.target.tagName.toLowerCase();
        console.log('element is ', element);

        if( element !== 'span' && element !== 'a'){
            decoratedOnClick(event);
        }

    }
    
    return (
        <div
        onClick={handleClick}
        >
        {children}
        </div>
    );

}

export default function Bookmark( { id, name, url , comment, tags, clickCount , dateCreated, dateModified, lastAccessed} ){


    const handleClick = async () =>{

        let newCount = +clickCount + 1;
        let newDate = moment().format('YYYY-MM-DD');
        
        console.log('new count is ', newCount, 'and new date is ', newDate);
        console.log('Parse attempt is ', moment('12-05-2000').format('YYYY-MM-DD'));

        const updates={
            name,
            url,
            comment,
            tags,
            newCount,
            dateCreated,
            dateModified,
            lastAccessed
        }
        
        try{
            const data = await axios.patch(BASE_URL + `/${id}`, updates, headers);
            console.log(data);
            return data;
        }
        catch(err){
            console.error("There's been an error updating click count and date last accessed at /src/components/Bookmarks @ handleEventClick. Error: ", err );
            throw err;
        }

    }

    

    return(
        <Accordion defaultActiveKey='0'>
    
            <CustomToggle eventKey={ id }>
                    <Card.Header className='bookmark-header' >
                    
                        <Accordion.Toggle className='bookmark-name' as='h2' eventKey={ id }> 
                            { name }
                        </Accordion.Toggle>

                        <h2>
                            <a className='bookmark-link' target='_blank' href={ url } title={ comment } onClick={ handleClick }>{ url }</a>
                        </h2>

                        <div className='bookmark-icons'>
                            
                            <Dropdown drop='left'>
                                <Dropdown.Toggle id={ `settngs-${id}` } as='span' className="material-icons settings">
                                    {/* <span className="material-icons settings " onClick={(e) => e.stopPropagation()}> */}
                                        settings
                                    {/* </span> */}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item className='edit-button' >Edit Bookmark</Dropdown.Item>
                                    <Dropdown.Item className='delete-button' >Delete Bookmark</Dropdown.Item>
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

                    <div className='card-comment'>
                        <h3>Description:</h3>
                        <p className='comment'>{ comment }</p> 
                    </div>

                    <div className='card-info'>
                        
                        <div className='card-tags'>
                            <h3>Tags:</h3>
                            <p>{ tags }</p> 
                        </div>

                        <div className='card-stats'>
                            <h3>Date Created:</h3>           
                            <p> { dateCreated} </p>
                            <h3>Date Modified:</h3>
                            <p>{dateModified}</p>
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