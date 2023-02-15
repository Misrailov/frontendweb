import React,{useState} from 'react';
import Card from 'react-bootstrap/Card';
import usePersons from '../api/newPerson';
import DropDownEditBook from './dropdownComponents/DropDownEditBook';
import Rating from '@mui/material/Rating';
import DropDownPlaylist from './dropdownComponents/DropDownPlaylist';
import { toast } from 'react-toastify';
import "../App.css"
export default function Book({bookInfo,playlists,inDB}){


    const [book,setBook] = useState(bookInfo);
    let playlistName
    let review;
    let favorite = bookInfo.isFavorite;
   
    if(inDB === true){
        review = bookInfo.review
    }

    if(inDB && playlists.length !==0){

     playlistName = (playlists.find((x) =>x.id === bookInfo.bookCollectionId)).title;
    }
    const personApi = usePersons();

    if(bookInfo === undefined){
        return <div></div>
    }
    let auteur = "";

    let volumeInfo;
    if(inDB === true){
     volumeInfo = bookInfo;
    }else  volumeInfo = bookInfo.volumeInfo


    if(inDB){
         auteur = volumeInfo.authors
    }else
   {  auteur = (volumeInfo.authors && volumeInfo.authors.map((x) => {
        if(x !== volumeInfo.authors[volumeInfo.authors.length-1]){
            return x + ", "
        }else if( x === undefined){
            toast("No author found")
        }
            else{
                return x;
        }
    }));}
    const title = volumeInfo.title;
    const subtitle = volumeInfo.subtitle;
    if(volumeInfo.description !== undefined){
     const description = (volumeInfo.description).substring(0, 100);
    }else{
        const description = "No description available"
    }
    let img;
    if(inDB === true){
         img = volumeInfo.imgLink
    }else{
     img = volumeInfo.imageLinks !== undefined ?volumeInfo.imageLinks.thumbnail:"https://www.shutterstock.com/image-vector/book-icon-sign-design-260nw-553945819.jpg" ;
    }
    const handleRouteChange = () =>{
        toast("Book added to your collection" )

    } 

    
    const goToBookForm = async({collectionName}) =>{
        let bookId 
        if(!inDB){
             bookId =bookInfo.id
            bookInfo = bookInfo.volumeInfo
        }else{
            bookId =bookInfo.bookId
        }
        let BookC = playlists.find((x) => x.title === collectionName);

        let booktitle = bookInfo.title
        
        let personId = BookC.personId
        let bookCId = BookC.id
        let imgLink = bookInfo.imgLink
        let subtitle = bookInfo.subtitle
        let authors = bookInfo.authors
        if(!inDB){
            imgLink = bookInfo.imageLinks.thumbnail
            subtitle = (bookInfo.description).substring(0, 100) + "...";
            authors = (bookInfo.authors).join(", ")
        }
       

        await personApi.addBookToBookCL({booktitle,
            bookId,
            personId,
            bookCId,
            imgLink,
            subtitle,
            authors, });
        toast("added book to book Collection")
    }
    const updateBook = async(data) =>{

        const newBook = {
            authors: bookInfo.authors,
            bookCollectionId: bookInfo.bookCollectionId,
            bookId: bookInfo.bookId,
            id: bookInfo.id,
            imgLink: bookInfo.imgLink,
            isFavorite: data.isFavourite,
            isRead: data.isRead,
            progress: data.progress,
            review: data.review,
            subtitle: bookInfo.subtitle,
            title: bookInfo.title
        };
        
        const id = bookInfo.id;
        let review
        data.review===null?review = 0:review = data.review;
        const isFavorite = data.isFavourite;
        const isRead = data.isRead;
        const progress = newBook.progress;
        setBook(newBook);

        await personApi.updateBook({id,
            review,
            isFavorite,
            progress,
            isRead});
        toast("updated book")
       
          
    }
    const deleteBook = () =>{
        const id = bookInfo.id;
        personApi.deleteBook(id);
        toast("deleted book")
        window.location.reload();
    }


return(
 
    <div  className=''>
        <div  className = "w-50 d-flex flex-column mb-3 align-items-start justify-content-start">
            <Card >
            <Card.Body >
            
            <img src = {img} className = "imgThumbnail" alt="BoekThumbnail" />

            <Card.Title>
            <blockquote className="blockquote">
                    <p>
                    {book.isFavorite && <i className="fa fa-star" aria-hidden="true"></i>}                    
                    {title}
                    </p>
            </blockquote>
            <figcaption className="blockquote-footer">
                    <p>{auteur}</p>
                    </figcaption>
            </Card.Title>

            <Card.Subtitle className="h-60 mb-2 text-muted" >{subtitle}</Card.Subtitle>
            {inDB && <Card.Subtitle className="mb-2 text-muted">Collection: {playlistName}</Card.Subtitle>}
          
            <button className = "deleteButton"  onClick = {deleteBook} >Delete</button>
            <div className = "m-20">
{         inDB   &&<Rating className="read-only" value={parseInt(book.review)} readOnly />
}            </div>
           {inDB && <DropDownEditBook  onSaveBook = {updateBook} bookInfo = {volumeInfo}/>}
            {!inDB && <DropDownPlaylist playlists = {playlists} addBookCL = {goToBookForm}  />}

                 </Card.Body>
                 </Card> 
    </div>
    </div>

)
            
        
    
      
}