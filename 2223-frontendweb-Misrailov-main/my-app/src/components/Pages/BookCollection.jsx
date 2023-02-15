import React,{useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import usePerson from '../../api/newPerson';
import Book from '../Book';


export default function BookCollection () {
    const personApi = usePerson();
    const [books,SetBooks] = useState([]);
    const [playlists,setPlaylists] = useState([])
    const [loading,setLoading] = useState(true);
    const {id} = useParams();
    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            const books = await personApi.getBooksFromCollectionWithId(id);
            const playlists = await personApi.getBookCL();
            setPlaylists(playlists);
            SetBooks(books.foundBookCollectionLinktable);
            setLoading(false);
        }
        fetchBooks();

    }, [id])


  
    return (
        <>
        {<h1>Books in this collection</h1>}
        <div className="booksThisCollection" >
        
        {books.length === 0 && !loading && <><h1>There are no books in this collection</h1></>}
        {!loading && console.log(books)}
        { !loading && 
        books.map((item,index) =>{
        return(
    
            <div className = "align-self-start " key ={index}    >
            <Book bookInfo = {item}   playlists= {playlists} inDB = {true}  />
            </div>
  )
})

}
        
        </div>
        </>
    )

}