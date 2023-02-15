import Accordion from 'react-bootstrap/Accordion';
import UpdateBookPage from '../Pages/UpdateBookPage';

function DropDownEditBook({bookInfo,onSaveBook,rating}) {

    const updateBook = async(data) =>{
    onSaveBook(data)
    }


    return (
    <Accordion defaultActiveKey="1" flush>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Edit Book</Accordion.Header>

        <Accordion.Body>
        <UpdateBookPage bookInfo={bookInfo}  onSaveBook = {updateBook}/>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default DropDownEditBook;