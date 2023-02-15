import axios from 'axios'
import { useCallback } from 'react';
import * as mock from './mock-data'
import { toast } from 'react-toastify';

const useBooks = () =>{


const searchBook = useCallback(async(search) =>{
    try{
    const data = await axios.get("https://www.googleapis.com/books/v1/volumes?q=intitle:" + search+ "&orderBy=relevance&key=AIzaSyDIapqEvPICcxofv_6nhID1obKs_oBs6vQ")
    .catch(err =>{ console.log(err)})
    
    const boekArray = data.data.items
    return boekArray;
    }catch(err){
        toast("No books found" , {type: "error"})
    }
 },[])

 const searchByAuthor = useCallback(async(authorName) =>{
    try{
    axios.get("https://www.googleapis.com/books/v1/volumes?q=inauthor" + authorName+ "&key=AIzaSyDIapqEvPICcxofv_6nhID1obKs_oBs6vQ")
    .then(res =>console.log(res.items))
    .catch(err =>console.log(err))
}catch(err){
    toast("No books found with author" , {type: "error"})
}
},[]);

 const  searchById = useCallback(async(id) =>{
    try{
    var books = null
    const data  = await axios.get("https://www.googleapis.com/books/v1/volumes/" + id+ "?key=AIzaSyDIapqEvPICcxofv_6nhID1obKs_oBs6vQ")
    .catch(err =>{ books = mock.books[0].items[0]})

    if(books !== null){
        
       return books
    }
    return data
}catch(err){
    toast("No books found with id" , {type: "error"})
}
},[]);

const bestSeller= useCallback(async() =>{
    try{
    var books = null
    const data = await axios.get("https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=GqOBNtOSb5LBuB3QjircsheVkPIlpTaQ")
    .catch(err =>  books = mock.bestSellers.results.books)
    
   //array of 15 books
   if(books !==null){
    return books
   }
    return data.data.results.books
}catch(err){
    toast("BestSellers not available" , {type: "error"})
}
    
},[]);
return{
    searchBook,
    searchByAuthor,
    searchById,
    bestSeller

}

}
export default useBooks;

