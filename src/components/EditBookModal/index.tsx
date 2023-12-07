import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { updateBook } from '../../redux/bookSlice';
import styled from 'styled-components';

interface EditBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookId: number;
}

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px;
  margin-top: 10px;
  border: none;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;

const EditBookForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const EditBookLabel = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Label = styled.label`
  width: 100px;
  min-width: 100px;
`;

const EditBookModal: React.FC<EditBookModalProps> = ({ isOpen, onClose, bookId }) => {
  const dispatch = useDispatch();
  const [editedBook, setEditedBook] = useState({
    name: '',
    price: 0,
    category: '',
    description: '',
  });

  const selectedBook = useSelector((state: RootState) => state.book.books.find((book) => book.id === bookId));

  useEffect(() => {
    if (selectedBook) {
      setEditedBook(selectedBook);
    }
  }, [selectedBook]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateBook = () => {
    if (selectedBook) {
      dispatch(updateBook({ ...selectedBook, ...editedBook }));
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Edit Book Modal">
      <h2>Edit Book</h2>
      <EditBookForm>
        <EditBookLabel>
          <Label>Name:</Label>
          <input type="text" name="name" value={editedBook.name} onChange={handleInputChange} />
        </EditBookLabel>
        <EditBookLabel>
          <Label>Price:</Label>
          <input type="number" name="price" value={editedBook.price} onChange={handleInputChange} />
        </EditBookLabel>
        <EditBookLabel>
          <Label>Category:</Label>
          <input type="text" name="category" value={editedBook.category} onChange={handleInputChange} />
        </EditBookLabel>
        <EditBookLabel>
          <Label>Description:</Label>
          <textarea name="description" value={editedBook.description} onChange={handleInputChange} />
        </EditBookLabel>
        <Button type="button" onClick={handleUpdateBook}>
          Save Book
        </Button>
        <Button type="button" onClick={onClose}>
          Close
        </Button>
      </EditBookForm>
    </Modal>
  );
};

export default EditBookModal;
