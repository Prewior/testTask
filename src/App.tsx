import React, { useState } from 'react';
import BookList from './components/BookList';
import AddBookModal from './components/AddBookModal';
import EditBookModal from './components/EditBookModal';
import styled from 'styled-components';

const AddBookButton = styled.button`
  width: 100%;
  background-color: #007bff;
  color: #fff;
  padding: 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Main = styled.div`
  padding: 20px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  text-align: center;
`;

const App: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

  const handleEditClick = (id: number) => {
    setSelectedBookId(id);
  };

  const handleCloseModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setSelectedBookId(null);
  };

  return (
    <Main>
      <Title>Bookstore</Title>
      <AddBookButton onClick={() => setShowAddModal(true)}>Add Book</AddBookButton>

      <BookList
        onEditClick={handleEditClick} 
        setShowEditModal={setShowEditModal}
      />

      {showAddModal && (
        <AddBookModal 
          onClose={handleCloseModals} 
          isOpen={true} 
        />
      )}

      {selectedBookId !== null && (
        <EditBookModal 
          isOpen={showEditModal} 
          onClose={handleCloseModals} 
          bookId={selectedBookId} 
        />
      )}
    </Main>
  );
};

export default App;
