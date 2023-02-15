import { useState, useEffect } from "react";
import useBooks from '../../api/bookGoogle';
import Book from '../Book';
import usePersons from '../../api/newPerson';
import DisplayCollection from "../DisplayBookComponents/DisplayCollectionComponent";
import {toast} from 'react-toastify';
import "../../App.css"

export default function MyBooks(){
  const booksApi = useBooks();
    const personApi = usePersons();
    const [books,setBooks] = useState([]);
    const[error,setError] = useState("");
    const[loading,setLoading] = useState(true);
    const[bookCL,setBookCL] = useState([]);
    const [person,setPerson] = useState();
    
    useEffect(() => {
      const getBooks = 
       async() =>{
        setError("");

        const person = await personApi.getPerson();
        setPerson(person);
        const bookCollection = await personApi.getBookCL();
        setBookCL(bookCollection)
        const mijnboeken = await personApi.individualBooksFromPerson();
       
        
         setBooks([await booksApi.searchById(...mijnboeken)]);

        setBooks(mijnboeken);
        setLoading(false);
      
       
    }
    getBooks();

   
},[])
const deletePlaylist = async (id) => {
  await personApi.deleteBookCollection(id);
  const bookCollection = await personApi.getBookCL();
  setBookCL(bookCollection)
  toast("Playlist deleted")
}




return(<div className = "container text-center  " data-cy = "collections">
<h1>My Books</h1>
<div className = "bookCollectionsPage " >
{!loading &&  bookCL.map((item,index) =>{
  return(
    <div className = "col " key ={index} data-cy="collection" >
    <DisplayCollection playlist = {item} person ={person} books = {books} deletePlaylist={deletePlaylist} />
    </div>
  )
})}
{/* { !loading && 
  books.map((item,index) =>{
  return(
    
    <div className = "col" key ={index}  >
    <Book bookInfo = {item}  playlists ={bookCL}  inDB = {true}  />
    </div>
  )
})

} */}
</div>


</div>)}