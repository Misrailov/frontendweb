import React from 'react';

import DropDownPlaylist from '../dropdownComponents/DropDownPlaylist';
import usePersons from '../../api/newPerson';
import {toast} from 'react-toastify';
import "../../App.css"


export default function BestSellerBooks({playlists,books}){
    const personApi = usePersons();
    
    const goToBookForm = async({collectionName,item}) =>{
        const BookC = playlists.find((x) => x.title === collectionName);
        const booktitle = item.title;
        const bookId = item.primary_isbn10; 
        const personId = BookC.personId;
        const bookCId = BookC.id;
        const imgLink = item.book_image;
        const subtitle = item.description;
        const authors = item.author;
        await personApi.addBookToBookCL({booktitle,
            bookId,
            personId,
            bookCId,
            imgLink,
            subtitle,
            authors, });


        toast("added book")
    }



    return(
        <div className = " w-80 container text-center "  >
{         books.map((item,index) =>{
            return(
            <div className="row align-items-start border border-success p-2 mb-2 " key = {index} value = {item}>
                <div className="col " >
                    <img  id ="imageBestSeller"className='imageBestSeller' alt = {`${item.title}'s coverart`} src = {item.book_image} />
                    </div>
                    <div className="col"  >
                    <p className = "m-2 "><b>{item.title}</b></p>
                    <p className='text-black-50' >by {item.author}</p>
                    <DropDownPlaylist playlists = {playlists}  addBookCL = {goToBookForm} item ={item}  />

                </div>
            </div>

        )})}

       
    </div>
    
    
  
        
    )
}