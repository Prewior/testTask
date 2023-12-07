// src/components/BookList.tsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { deleteBook } from '../../redux/bookSlice';
import styled from 'styled-components';

interface BookListProps {
  onEditClick: (id: number) => void;
  setShowEditModal: (show: boolean) => void;
}

const BookListContainer = styled.div`
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const BookItemContainer = styled.div`
  margin-bottom: 10px;
  border: 1px solid #ccc;
  padding: 10px;
  width: 300px;
`;

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

const ButtonBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 10px;
`;

const BookName = styled.div`
  font-weight: bold;
  display: flex;
  justify-content: center;
`;

const BookList: React.FC<BookListProps> = ({ onEditClick, setShowEditModal }) => {
  const dispatch = useDispatch();
  const books = useSelector((state: RootState) => state.book.books);

  const [selectedBook, setSelectedBook] = useState<any | null>(null);

  const handleDelete = (id: number, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(deleteBook(id));
  };

  const handleBookClick = (book: any) => {
    setSelectedBook(book);
  };

  useEffect(() => {
    if (selectedBook) onEditClick(selectedBook.id);
  }, [selectedBook, onEditClick]);

  return (
    <BookListContainer>
      {books.map((book) => (
        <BookItemContainer key={`${book.id}.${book.description}`} onClick={() => {
          handleBookClick(book);
          setShowEditModal(true);
        }}>
          <BookName>{book.name}</BookName>
          <div><b>Price:</b> ${book.price}</div>
          <div><b>Category:</b> {book.category}</div>
          <ButtonBlock>
            <Button 
              onClick={() =>  {
              setShowEditModal(true);
              onEditClick(book.id)
            }}>
              Edit
            </Button>
            <Button onClick={(e) => handleDelete(book.id, e)}>Delete</Button>
          </ButtonBlock>
        </BookItemContainer>
      ))}
    </BookListContainer>
  );
};

export default BookList;
