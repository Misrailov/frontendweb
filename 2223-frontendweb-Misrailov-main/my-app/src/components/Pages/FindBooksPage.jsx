import FindBook from '../FindBook';
import DisplayMultipleBooksComponent from '../DisplayBookComponents/DisplayMultipleBooksComponent';
import { useEffect,useState } from 'react';

import usePersons from '../../api/newPerson';


export default function FindBooksPage(){
    const personApi = usePersons();
    const [bookCL,setBookCL] = useState([]);
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(true);
    const [search,setSearch] = useState("");
    useEffect(() => {
        const getBooks = 
        async() =>{
         setError("");
        setLoading(true);
       
         const bookCL = await personApi.getBookCL();
        
         setBookCL(bookCL)
         setLoading(false);
     }
     getBooks();
    },[search])

    const handleSearch = (data) =>{
        console.log(data)
        setSearch(data)
        return     <DisplayMultipleBooksComponent  search ={search}  playlists = {bookCL}/>
    }
    return(
        <>
        <p>DISCLAIMER: If a high number of queries have been done, the search function will not work</p>
        <h2>Find Books</h2>
        <FindBook/>
        </>
    )
}