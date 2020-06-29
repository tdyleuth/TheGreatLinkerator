import React from 'react';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'


//Create bookmark => modal => (name, description (optional), url, tags, submit, cancel )
// => Name, url


export default function Bookmark( { name, url , comment, tags, clickCount , dateCreated} ){

    return(
        <div>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link">
              { name }
             </Accordion.Toggle> 

            </Card.Header>
            <Card.Header>
                { url }
            </Card.Header>
            <Card.Header>
                {/* {Options icon} */}
            </Card.Header>
            <Card.Header>
                {/* {Expand button} */}
            </Card.Header>
            
            
            <Card.Body>
                <h3>Description:</h3>
                 <p>{ comment }</p> 

                <h3>Tags:</h3>
                 <p>{ tags }</p> 
      
                <h3>Date Created:</h3>           
                <p> { dateCreated} </p>
                <h3>Date Modified:</h3>
                {/* <p>{DateModified}</p> */}
                <h3>Click Count:</h3>
                <p>{clickCount }</p>
            </Card.Body>
        </div>

    )

}