import React, {useState,useEffect} from 'react';
import useBooks from '../../api/bookGoogle'
import Book from '../Book';
import "../../App.css"

export default function DisplayMultipleBooksComponent({search,playlists}){
  const booksApi = useBooks();
    const [books,setBooks] = useState([]);
    const[error,setError] = useState("");
    const[loading,setLoading] = useState(true);

    useEffect(() => {
        const getBooks = 
         async() =>{
          setError("");
         setLoading(true);
          const mijnboeken = search !==""?await booksApi.searchBook(search):await booksApi.searchBook("Game of Thrones");
          
          setBooks(mijnboeken)
          setLoading(false);

         
      }
      getBooks();
    
    
      
    },[])
    return(
       
    <div className = "container text-center d-flex flex-row justify-content-start align-items-start flex-wrap">
    
    { !loading && 
      books.map((item,index) =>{
      return(
        <div className = "books" key = {index} >
        <Book bookInfo = {item} playlists = {playlists} inDB={false} className = "multipleBooks" /> 
        </div>
      )
    })
    
    }
    </div>

    )
}