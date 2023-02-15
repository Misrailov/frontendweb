import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';
import "../App.css"

export default function Footer() {
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-left ' style ={{position:"relative",
    left:"0",
    bottom:"0",
    right:"0"}}>
      <div className='footer' >
        &copy; {new Date().getFullYear()} Copyright:{'Musa Israilov'}
        <p className='text-white'>
           BetterReads.be
        </p>
      </div>
    </MDBFooter>
  );
}