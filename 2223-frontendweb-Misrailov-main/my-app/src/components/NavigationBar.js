import Container from 'react-bootstrap/Container';
import React,{useEffect, useState} from 'react';
import {Navbar,Nav} from 'react-bootstrap';
import AuthenticationButton from './authentication/AuthenticationButton';
import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom';
import usePersons from '../api/newPerson';

export default function NavigationBar()  {
  const [personExists, setPersonExists] = useState(false);
  const personApi = usePersons();
  const [playlists,setPlaylists] = useState([])


  useEffect(() => {
    const getPerson = async() =>{
      
      const person = await personApi.getPerson();
      setPersonExists(person?true:false);

    }
    getPerson();
  },[])
  return (
    <>
    <div>
    <Navbar className= "navbar"  variant ={"dark"} expand="lg">
      <Container>
        <Navbar.Brand as={Link} to ={"/home"}>BetterBooks</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to ={"/home"}>Home</Nav.Link>
            { personExists  &&<Nav.Link as={Link} data-cy={"navToMyBooks"} to ={"/mybooks"}>My Books</Nav.Link>}
            { !personExists  && <Nav.Link as={Link} to ={"/register"}>Registration</Nav.Link>}
            {personExists && <Nav.Link as={Link} to ={"/createcollection"}>Create Book Collection</Nav.Link>}
            {personExists && <Nav.Link as={Link} to ={"/createbook"}>Create Book</Nav.Link>}          
            {personExists && <Nav.Link as={Link} to ={"/findbooks"}>Find Books</Nav.Link>} 
            

          </Nav>

        </Navbar.Collapse>


      </Container>
      <div className = "search">
           
  

      </div>
      <AuthenticationButton />
  </Navbar>
    </div>
    
    </>
   
  );
    }
  



