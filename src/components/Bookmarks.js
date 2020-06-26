import React from 'react';
import Card from 'react-bootstrap/Card';


//Create bookmark => modal => (name, description (optional), url, tags, submit, cancel )
// => Name, url


export default function Bookmark(){

    return(
        <div>
            <Card.Header>
                {/* {Bookmark name} */}
            </Card.Header>
            <Card.Header>
                {/* {Bookmark url} */}
            </Card.Header>
            <Card.Header>
                {/* {Options icon} */}
            </Card.Header>
            <Card.Header>
                {/* {Expand button} */}
            </Card.Header>
            
            
            <Card.Body>
                <h3>Description:</h3>
                {/* <p>{Bookmark description}</p> */}


                <h3>Tags:</h3>
                {/* <p>{tags}</p> */}
      
                <h3>Date Created:</h3>           
                {/* <p>{DateCreated}</p> */}
                <h3>Date Modified:</h3>
                {/* <p>{DateModified}</p> */}
                <h3>Click Count:</h3>
                {/* <p>{ClickCount}</p> */}
            </Card.Body>
        </div>

    )

}