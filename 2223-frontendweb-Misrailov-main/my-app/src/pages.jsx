import { LoremIpsum } from 'react-lorem-ipsum';
import { useLocation } from 'react-router-dom';
import React from 'react';
import BooksHomePage from './components/Pages/BooksHomePage';

import MyBooksPage from './components/Pages/MyBooksPage';


export const Home = () =>  <BooksHomePage/>




export const MyBooks = () => {
  return <MyBooksPage/>
  };

export const NotFound = () => {
    const {pathname} = useLocation();
  return (
    <div>

      <h1>Pagina niet gevonden</h1>
      <p>
        Er is geen pagina met op deze url {pathname}, probeer iets anders.
      </p>
    </div>
  );
};
