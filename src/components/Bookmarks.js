import React from 'react';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'



//Create bookmark => modal => (name, description (optional), url, tags, submit, cancel )
// => Name, url




export default function Bookmark( { id, name, url , comment, tags, clickCount , dateCreated, dateModified} ){


    return(
        <Accordion defaultActiveKey='0'>
    
    <Accordion.Toggle as="div" eventKey={ id }>
            <Card.Header className='bookmark-header' >
            
                <Accordion.Toggle className='bookmark-name' as='h2' eventKey={ id }> 
                    { name }
                </Accordion.Toggle>

                <h2>
                    <a target='_blank' href={ url } title={ comment } onClick={(e) => e.stopPropagation()}>{ url }</a>
                </h2>

                <div className='bookmark-icons'>
                    <span className="material-icons settings " onClick={(e) => e.stopPropagation()}>
                        settings
                    </span>

                    <Accordion.Toggle as={ Button } variant="link" eventKey={ id }>
                        <span className="material-icons dropdown">
                            arrow_drop_down
                        </span>
                    </Accordion.Toggle>
                </div>
                
            </Card.Header>
    </Accordion.Toggle>

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
                            <h3>Click Count:</h3>
                            <p>{ clickCount }</p>
                        </div>
                    </div>

                </Card.Body>
            </Accordion.Collapse>

        </Accordion>

    )

}