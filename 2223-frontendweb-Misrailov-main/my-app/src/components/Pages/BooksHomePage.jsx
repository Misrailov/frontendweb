import React, {useState,useEffect} from 'react';

import   BestSellerBooks  from '../DisplayBookComponents/BestSellerBooks';
import usePersons from '../../api/newPerson';
import RegisterPage from './RegisterPage';
import useBooks from '../../api/bookGoogle';
import Book from '../Book';


export default function FindBook(){
    const booksApi = useBooks();
    const personApi = usePersons();
    const [id,setId] = useState("ppjUtAEACAAJ");
    const [personExists, setPersonExists] = useState(false);
    const [books,setBooks] = useState([])
    const[bookCL,setBookCL] = useState([]);
    const [bestSellers,setBestSellers] = useState([]);
    const[loading,setLoading] = useState(true);
    useEffect(() => {
        const getPerson = async() =>{
            const person = await personApi.getPerson();
            setPersonExists(person?true:false);
            setLoading(false);
        }
        const getBooks = 
        async() =>{
            const data = await booksApi.bestSeller();
            setBestSellers([data[0],data[1],data[2]]);
         const bookCollection = await personApi.getBookCL();
         setBookCL(bookCollection)
         const mijnboeken = await personApi.individualBooksFromPerson();
          setBooks(mijnboeken.slice(0,3));
     }
        getPerson();
        getBooks();
      },[])





    const ShowCurrentlyReading = () =>{
        return(
            <>
            <h2>Your Books</h2>
            { !loading && books.map((item,index) =>{
                return(
                    
                <div className = "col" key ={index}>
                


                     <Book bookInfo = {item}  playlists ={bookCL} inDB = {true}/>
                </div>
                    )
                })

            }
            </> 
        )
    }
    const ShowPopular = () =>{
        return(
            <>
            {!loading&&<BestSellerBooks playlists ={bookCL} books={bestSellers}  />}

            </> 
        )
    }
    return(
        <>
      
        <div className="container text-center" data-cy = "BooksHomePage">

            <div className="row">
                <div className="col">
                        {!loading &&personExists &&<ShowCurrentlyReading   />}
                      

                        
                        {/* {!loading &&(!personExists && (localStorage.key(0)===null||localStorage.key(0).length===0)) && <h2>You should press the login button to see your books</h2>} */}
                        
                        {/* {!loading  &&!personExists&&<RegisterPage/> } */}
                        {!loading  &&!personExists &&(localStorage.key(0)!=null)?<RegisterPage/>:!personExists&& <h2>You should press the login button to see your books</h2> }

            
            

                </div>
            <div className="col">
                   <h2>Popular</h2>
                   <ShowPopular/>
            </div>

            </div>
        </div>
     
        </>
    )

};