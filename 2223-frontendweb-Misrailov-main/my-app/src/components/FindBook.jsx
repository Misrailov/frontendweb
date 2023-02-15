import React, {useState,useEffect, useCallback} from 'react';

import DisplayMultipleBooksComponent from './DisplayBookComponents/DisplayMultipleBooksComponent';
import usePersons from '../api/newPerson';

export default function FindBook(){
    const personApi = usePersons();
    const [search,setSearch] = useState("Game Of Thrones");
    const [enterWasPressed, setEnterWasPressed] = useState(false);

    const [bookCL, setBookCL] = useState([]);

  
    useEffect(useCallback(() => {
      const getBooks = 
       async() =>{

      
        const bookCL = await personApi.getBookCL();
       
        setBookCL(bookCL)

    }
    getBooks();
    
  },[]),[search]);


    const ShowBooks = () =>{
        return(
            
            <DisplayMultipleBooksComponent  search ={search}  playlists = {bookCL} />
        )
    }
    const handleChange = (e) =>{
        if(e.key === "Enter"){
             setSearch(e.target.value);
                setEnterWasPressed(true);
        }
        
    }
    
    return(
        <>
        <div className = "search">
           
                     <input type = "text" style ={{width:"350px",marginLeft:"60px", marginBottom:"20px"}} className ={["form-control","findBookButton"]} placeholder = "Enter a title"  onKeyDown= {handleChange} />
            
       {enterWasPressed &&<ShowBooks />}
    </div>
    </>
    )

};
