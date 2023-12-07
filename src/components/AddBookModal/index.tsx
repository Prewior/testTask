import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../../redux/bookSlice';
import Modal from 'react-modal';
import styled from 'styled-components';

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  book?: any;
}

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;

const AddBookForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const AddBookLabel = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Label = styled.label`
  width: 100px;
  min-width: 100px;
`;

const Error = styled.div`
  color: red;
  padding-bottom: 10px;
`;

const AddBookModal: React.FC<AddBookModalProps> = ({ isOpen, onClose, book = {} }) => {
  const dispatch = useDispatch();
  const [newBook, setNewBook] = useState({ ...book });
  const [validationError, setValidationError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewBook((prev: any) => ({ ...prev, [name]: value }));
  };

  const isFormValid = () => {
    const requiredFields = ['name', 'price', 'category', 'description'];
    for (const field of requiredFields) {
      if (!newBook[field]) {
        setValidationError(`Please enter a value for ${field}.`);
        return false;
      }
    }
    setValidationError('');
    return true;
  };

  const handleSaveBook = () => {
    if (isFormValid()) {
      dispatch(addBook(newBook));
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Edit Book Modal">
      <h2>Add New Book</h2>
      {validationError && <Error>{validationError}</Error>}
      <AddBookForm>
        <AddBookLabel>
          <Label>Name:</Label>
          <input type="text" name="name" value={newBook.name || ''} onChange={handleInputChange} />
        </AddBookLabel>
        <AddBookLabel>
          <Label>Price:</Label>
          <input type="number" name="price" value={newBook.price || ''} onChange={handleInputChange} />
        </AddBookLabel>
        <AddBookLabel>
          <Label>Category:</Label>
          <input type="text" name="category" value={newBook.category || ''} onChange={handleInputChange} />
        </AddBookLabel>
        <AddBookLabel>
          <Label>Description:</Label>
          <textarea name="description" value={newBook.description || ''} onChange={handleInputChange} />
        </AddBookLabel>
        <Button type="button" onClick={handleSaveBook}>
          Save Book
        </Button>
      </AddBookForm>
    </Modal>
  );
};

export default AddBookModal;
