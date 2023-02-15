import React from 'react';
import RequireAuth  from './components/authentication/RequireAuth';
import AuthLanding from './components/authentication/AuthLanding';
import {Routes,Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/NavigationBar';
import {Home,NotFound,MyBooks} from './pages';
import ScrollToTop from './ScrollToTop';
import RegistrationPage from './components/Pages/RegisterPage';
import CreateBookCollectionPage from './components/Pages/CreateBookCollectionPage';
import FindBooksPage from './components/Pages/FindBooksPage';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import BookCollection from './components/Pages/BookCollection';
import CreateBookPage from './components/Pages/CreateBookPage';





function App() {

  return (
    <>
    <NavigationBar/>
    

    <ScrollToTop />
    <Routes>
    <Route index element={<Home />} />
    <Route path="/home" element={<Home />} />
    <Route path="/findbooks" element={<FindBooksPage />} />
    <Route path="/bookform" element={<RequireAuth><CreateBookPage /> </RequireAuth>} />
    <Route path="/bookCollection/:id" element={<RequireAuth><BookCollection/> </RequireAuth>} /> 
    <Route path="/createbook" element={<RequireAuth><CreateBookPage/> </RequireAuth>} /> 
    <Route path="/mybooks" element={<RequireAuth><MyBooks /> </RequireAuth>} /> 
    <Route path="/createcollection" element={<RequireAuth><CreateBookCollectionPage /> </RequireAuth>} /> 
    <Route path="/*" element={<NotFound />} />
    <Route path ="/register" element={<RegistrationPage  />}/>
    <Route path ="/login" element= { <AuthLanding />} />
</Routes>

<ToastContainer />
</>
  );
}

export default App;

///https://www.googleapis.com/books/v1/volumes?q=react&key=AIzaSyDIapqEvPICcxofv_6nhID1obKs_oBs6vQ boeken api