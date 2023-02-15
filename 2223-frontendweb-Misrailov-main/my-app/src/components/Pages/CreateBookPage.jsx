import React, {useState,useEffect,memo} from 'react';

import usePersons from '../../api/newPerson';

import BookLinkTableForm from '../forms/BookCollectionLinktableForm';
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

    const createBookCl = async(data,chosenPlaylist) => {
        console.log(chosenPlaylist)
        console.log(bookC)
        const bookCId = bookC.find(bookC => bookC.title === chosenPlaylist).id;
        console.log(bookCId)
        const booktitle = data.title;
        const imgLink = data.imgLink;
        const subtitle = data.subtitle;
        const authors= data.authors;
        const review = data.review;
        const isRead = data.isRead;
        const isFavourite = data.isFavourite;
        const progress = data.progress;
       
        const bookId = "selfCreatedBook";

        
       const newBook = {bookCollectionId: bookCId,title:booktitle, personId: personLocal.id,imgLink:imgLink,description:subtitle, bookId:"selfCreatedBook",authors:authors,review:review,isRead:isRead,isFavourite:isFavourite,subtitle:subtitle};
        if(bookC.find(book => book.title === booktitle )){
            toast("FAILED: You already have a book with this name in your collection");
            return;
        }
        console.log(newBook)

        await personApi.addBookToBookCL({booktitle,imgLink,subtitle,bookCId,bookId,authors,progress,isFavourite,isRead,review});
         await personApi.getAll
         toast("Book added to collection")
        
    }

    return(
        <>
        <h1>BOOK</h1>
          <BookLinkTableForm onSaveBook ={createBookCl} playlists = {bookC} />
        </>
    )
}