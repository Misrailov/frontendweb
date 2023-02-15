import React from 'react';
import Card from 'react-bootstrap/Card';

import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export default function DisplayCollection({deletePlaylist,playlist,person,books}){
const navigate = useNavigate();
const img = playlist.imgLink;
const title = playlist.title;

const description = playlist.description;
const firstName= person.firstName
const lastName =  person.lastName


const showBooks = () => {
      const goTo = () =>{
     
        navigate(`/bookcollection/${playlist.id}`);
      }
      goTo();

}
const deleteP = () => {
        if(title === "Favourites"|| title === "Read Books" ){
                toast("You can't delete this playlist")
                return;
        }else deletePlaylist(playlist.id);
}

return(
<div className='cardCollection'>
        <div  >
            <Card >
            <Card.Body >
            <img src = {img} className = "img-thumbnail" alt="BoekThumbnail"></img>

            <Card.Title>
            <blockquote className="blockquote">
                    <p>
                    {title}
                    </p>
            </blockquote>
            <figcaption className="blockquote-footer">
                    <p>{description}</p>
                    </figcaption>
            </Card.Title>

            <Card.Subtitle className="mb-2 text-muted">{`Creator: ${firstName} ${lastName}`}</Card.Subtitle>
          
            <button className='seeAllBooksCollection' onClick = {showBooks} data-cy="seeAllButton">See All Books</button>
              <button className = 'deleteBookCollectionButton' onClick = {deleteP} >Delete</button>
           

                 </Card.Body>
                 </Card> 
    </div>

    </div>
)
            
        
    
      
}