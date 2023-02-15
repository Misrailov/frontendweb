import Dropdown from 'react-bootstrap/Dropdown';
import React,{memo} from 'react';

 function AddToBookCLDropDown({playlists,addBookCL,item}) {
 
  const addBookToCollection = async (e) => {
  const collectionName = ((e.target).innerHTML);
 
  if(item !== undefined){
    addBookCL({collectionName,item});
  }
  else {addBookCL({collectionName})};
  }
 


  return (
    <div className='m-20'>
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Add to BookCollection
      </Dropdown.Toggle>

      <Dropdown.Menu>
      {playlists !==false&& playlists !==undefined &&  playlists.map((bookCL,index) => {return  <Dropdown.Item key = {index} href={`#/action${index}`} value = {bookCL.title} onClick = {addBookToCollection}>{bookCL.title}</Dropdown.Item> })}
  
      </Dropdown.Menu>
    </Dropdown>
    </div>
  );
}

export default memo(AddToBookCLDropDown);
