import React, {useState,useEffect,memo} from 'react';

import usePersons from '../../api/newPerson';

import BookCLForm from '../forms/BookCollectionForm';
import { toast } from 'react-toastify';


export default function CreateBookCollectionPAge({bookInfo}){
  const personApi = usePersons();
    const [personLocal,setPersonLocal] = useState(null);
    const [bookC,setBookC] = useState([]);
    const[loading,setLoading] = useState(true);


    useEffect(() => {
        const getPerson = 
         async() =>{
            const person = await personApi.getPerson();
            setPersonLocal(person);
            const bookCollections = await personApi.getBookCL();
            setBookC(bookCollections);

            
      }
      getPerson();
   
   
      
    },[])

    const createBookCl = async(data) => {
        const title = data.collectionTitle;
        const imgLink = data.imgLink;
        const description = data.description;
       const newBookCl = {title:title, personId: personLocal.id,imgLink:imgLink,description:description};
        if(bookC.find(book => book.title === title )){
            toast("FAILED: You already have a collection with this name");
            return;
        }

        await personApi.createNewBookC(newBookCl);
         await personApi.getAll
         toast("Collection created");
        
    }

    return(
        <>
          <BookCLForm onSaveBookCl ={createBookCl} bookInfo ={bookInfo}/>
        </>
    )
}