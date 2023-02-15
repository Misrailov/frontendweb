import React, {useState,useEffect} from 'react';
import usePersons from '../../api/newPerson';
import BookUpdateLinkTableForm from '../forms/BookUpdateLinkTableForm';

import BookCLForm from '../forms/BookCollectionForm';


const  CreateBookPage = ({bookInfo,onSaveBook}) =>{
    const book = {bookInfo}
    const handleClick = (data) =>{
        onSaveBook(data)
    }
    return(
        <div>
            <BookUpdateLinkTableForm onSaveBook = {handleClick} bookInfo = {bookInfo}/>
        </div>
    )

}
export default CreateBookPage;