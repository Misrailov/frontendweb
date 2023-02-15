import axios from 'axios';
import * as mock from './mock-data';
import {
  useAuth0,
} from '@auth0/auth0-react';
import { useCallback } from 'react';
import {toast} from 'react-toastify';


const baseUrl = `${process.env.REACT_APP_API_URL}`; 

const usePersons = () =>{
const {getAccessTokenSilently} = useAuth0();

const getAll = useCallback(async () => {
    const token = await getAccessTokenSilently(); // 👈 3
    const authHeader = `Bearer ${token}`;
    const {
      data,
    } = await axios.get(baseUrl+"/persons" ,{headers: {Authorization: authHeader}});
    return data
   
  }, [getAccessTokenSilently]);


  const getPerson = useCallback(async () =>{
    const token = await getAccessTokenSilently();
    const auth0=localStorage.key(0);
    if(localStorage.getItem(auth0)===null){
      return mock.persons;
    }
    const authHeader = `Bearer ${token}`;
    const email = JSON.parse(localStorage.getItem(auth0)).body.decodedToken.user.email;
  
    const url = baseUrl+"/persons";
    const response = await axios.get(url,{headers: {Authorization: authHeader}});
    const personExists = response.data.find(person => person.email === email);
    return personExists
  },[getAccessTokenSilently])

const createPerson = useCallback(async (newPerson) =>{
  const token = await getAccessTokenSilently();
  const body = JSON.parse(localStorage.getItem(localStorage.key(0))).body
  const authHeader = `Bearer ${token}`;
  const person = {firstName: newPerson.firstName, lastName: newPerson.lastName, email: body.decodedToken.user.email, auth0Id:  body.access_token};
  await axios.post(baseUrl + "/persons", person,{headers:{Authorization: authHeader}});
},[getAccessTokenSilently])

const getPersonById = useCallback(async (id) =>{
  const token = await getAccessTokenSilently();
  const authHeader = `Bearer ${token}`;
  const response = await axios.get(baseUrl + "/persons/" + id, {headers:{Authorization: authHeader}});
  return response
},[getAccessTokenSilently])

const getBooksFromCollectionWithId = useCallback(async (id) =>{
  const token = await getAccessTokenSilently();
  const authHeader = `Bearer ${token}`;
  
  const Url = `${baseUrl}/bookc`;
  const response = await axios.get(Url+ `/${id}`,{headers: {Authorization: authHeader}});
  return response.data;
},[getAccessTokenSilently])

const getAllBooks = useCallback(async () =>{
  const token = await getAccessTokenSilently();
  const authHeader = `Bearer ${token}`;
  
  const Url = `${baseUrl}/bookcl`;
  const response = await axios.get(Url,{headers: {Authorization: authHeader}});
  return response.data;
},[getAccessTokenSilently])

const getBookCL = useCallback(async () =>{
  const token = await getAccessTokenSilently();
  const authHeader = `Bearer ${token}`;

  const person = await getPerson();
  if (person === null){
  return false;
  }
  try{
  const foundPerson = await getPersonById(person.id);
  return foundPerson.data.foundBookCollections;
  }catch(error){
    toast("You need to create a profile first");
  }
  

},[getAccessTokenSilently])

const individualBooksFromPerson = useCallback(async () =>{
  const token = await getAccessTokenSilently();
  const authHeader = `Bearer ${token}`;

  const person = await getPerson();
  const foundPerson = await getPersonById(person.id);
  const foundBookCollections = foundPerson.data.foundBookCollections;
 const bookCollectionIds = foundBookCollections.map(bookCollection => bookCollection.id);

 const allBooks = await getAllBooks();
 
 const booksWithId = allBooks.filter(book => bookCollectionIds.includes(book.bookCollectionId));
 return booksWithId;

},[getAccessTokenSilently])


const createNewBookC = useCallback(async (newBookC) =>{
  const token = await getAccessTokenSilently();
  const authHeader = `Bearer ${token}`;
  let newBookCToAdd;
  const person  = await getPerson();
  if(newBookC.imgLink ===""){
     newBookCToAdd = {title: newBookC.title, personId: person.id,description: newBookC.description}
  }else { newBookCToAdd = {title: newBookC.title, personId: person.id,description: newBookC.description,imgLink: newBookC.imgLink}}
  await axios.post (`${baseUrl}/bookc`, newBookCToAdd,{headers: {Authorization: authHeader}});

},[getAccessTokenSilently])


const updateBook = useCallback(async ({id,review,isRead,isFavorite,progress}) =>{
  const token = await getAccessTokenSilently();
  const authHeader = `Bearer ${token}`;


  const newBook = { 
    progress:progress,//
    isFavorite:isFavorite,//done
    isRead:isRead,//done
    review:review//
  }
  await axios.put (`${baseUrl}/bookCL/${id}`, newBook,{headers: {Authorization: authHeader}});
},[getAccessTokenSilently])

const deleteBookCollection = useCallback(async (id) =>{
  const token = await getAccessTokenSilently();
  const authHeader = `Bearer ${token}`;



  await axios.delete (`${baseUrl}/bookC/${id}`,{headers: {Authorization: authHeader}});
},[getAccessTokenSilently])

const deleteBook = useCallback(async (id) =>{
  const token = await getAccessTokenSilently();
  const authHeader = `Bearer ${token}`;



  await axios.delete (`${baseUrl}/bookCl/${id}`,{headers: {Authorization: authHeader}});
},[getAccessTokenSilently])

const addBookToBookCL = useCallback(async ({booktitle,imgLink,subtitle,bookCId,bookId,authors,progress,isFavourite,isRead,review}) =>{
  const token = await getAccessTokenSilently();
  const authHeader = `Bearer ${token}`;
let newBook;
  if(progress === undefined){

     newBook = { 
      title:booktitle,//done
      imgLink:imgLink,//done
      subtitle:subtitle,//done
      authors:authors,//done
      bookCollectionId: bookCId, //done
      bookId: bookId,//done
      progress:1,//
      isFavorite:false,//done
      isRead:false,//done
      review:parseInt(0)//
    }
  }else{

   newBook = { 
    title:booktitle,//done
    imgLink:imgLink,//done
    subtitle:subtitle,//done
    authors:authors,//done
    bookCollectionId: bookCId, //done
    bookId: bookId,//done
    progress:progress,//
    isFavorite:isFavourite,//done
    isRead:isRead,//done
    review:parseInt(review)//
  }}
  await axios.post (`${baseUrl}/bookCL`, newBook,{headers: {Authorization: authHeader}});
},[getAccessTokenSilently])

return{
    getAll,
    deleteBook,
    deleteBookCollection,
    getPerson,
    createPerson,
    getPersonById,
    getAllBooks,
    getBookCL,
    individualBooksFromPerson,
    createNewBookC,
    addBookToBookCL,
    updateBook,
    getBooksFromCollectionWithId

}
}
export default usePersons;