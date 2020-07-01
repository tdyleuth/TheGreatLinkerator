import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Search({searchTerm, setSearchTerm}) {



    function handleSubmit(e){e.preventDefault()}

    return(

        <Form className='search-form' onSubmit={(e) => handleSubmit(e)}>
            <Form.Control id='search-bar' type="search" placeholder="Search..." value={ searchTerm } onChange={ (e) => {
                setSearchTerm(e.target.value);
            }} />
            {/* <Button id='search-button' type='submit'>Search</Button> */}
        </Form>

    )
    

}