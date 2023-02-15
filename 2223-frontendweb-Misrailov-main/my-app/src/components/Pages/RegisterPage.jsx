import React, {useState,useEffect} from 'react';
import RegisterForm from '../forms/registerForm';
import usePersons from '../../api/newPerson';


export default function RegisterPage(){
  const personApi = usePersons();
    const [personLocal,setPersonLocal] = useState(null);
    const[loading,setLoading] = useState(true);


    useEffect(() => {
        const getPerson = 
         async() =>{
            const person = await personApi.getPerson();
            setPersonLocal(person);

            
      }
      getPerson();
   
   
      
    },[])

    const createPerson = async({firstName,lastName,userName}) => {
        console.log(userName,firstName,lastName)
       const newPerson = {firstName: firstName, lastName:lastName};
        await personApi.createPerson(newPerson);
        
    }

    return(
        <>
      
          <RegisterForm onSavePerson ={createPerson}/>
        </>
    )
}