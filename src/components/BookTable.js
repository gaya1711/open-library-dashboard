import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import styled from '@emotion/styled';
import { fetchAndUpdateAuthorDetails } from '../api'; 

const StyledPaper = styled(Paper)`
  padding: 20px;
  border-radius: 15px;
  border: 2px solid #AD88C6;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StyledTable = styled(Table)`
  min-width: 650px;
  border-collapse: separate;
  border-spacing: 0 10px;
`;

const StyledTableHead = styled(TableHead)`
  background-color: #7469B6;
`;

const StyledTableCell = styled(TableCell)`
  padding: 16px;
  font-size: 16px;
  font-family: 'Comic Sans MS', cursive, sans-serif;
`;

const StyledTableCellHead = styled(TableCell)`
  font-weight: bold;
  color: #fff;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  font-size: 18px;
`;

const StyledTableRow = styled(TableRow)`
  transition: background-color 0.3s;
  border-radius: 10px;
  &:hover {
    background-color: #E1AFD1;
  }
`;

const BookTable = ({ books, sort, onSort }) => {
  const [bookList, setBookList] = useState(books);
  const [editBook, setEditBook] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');

  useEffect(() => {
    const updateBooks = async () => {
      const updatedBooks = await fetchAndUpdateAuthorDetails(books);
      setBookList(updatedBooks);
    };
    updateBooks();
  }, [books]);

  const handleEdit = (book) => {
    setEditBook(book);
    setEditedTitle(book.title);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditBook(null);
    setEditedTitle('');
  };

  const handleSaveEdit = () => {
    // Updating the book details or send the edited data to the backend
    handleCloseDialog();
  };

  const handleSort = (column) => {
    const isAsc = sort.column === column && sort.direction === 'asc';
    onSort(column, isAsc ? 'desc' : 'asc');
  };

  return (
    <StyledPaper>
      <StyledTable>
        <StyledTableHead>
          <TableRow>
            <StyledTableCellHead>SI</StyledTableCellHead>
            <StyledTableCellHead>
              <TableSortLabel
                active={sort.column === 'ratings_average'}
                direction={sort.direction}
                onClick={() => handleSort('ratings_average')}
              >
                Rating
              </TableSortLabel>
            </StyledTableCellHead>
            <StyledTableCellHead>
              <TableSortLabel
                active={sort.column === 'author_name'}
                direction={sort.direction}
                onClick={() => handleSort('author_name')}
              >
                Author
              </TableSortLabel>
            </StyledTableCellHead>
            <StyledTableCellHead>
              <TableSortLabel
                active={sort.column === 'title'}
                direction={sort.direction}
                onClick={() => handleSort('title')}
              >
                Title
              </TableSortLabel>
            </StyledTableCellHead>
            <StyledTableCellHead>
              <TableSortLabel
                active={sort.column === 'first_publish_year'}
                direction={sort.direction}
                onClick={() => handleSort('first_publish_year')}
              >
                First Publish Year
              </TableSortLabel>
            </StyledTableCellHead>
            <StyledTableCellHead>Subject</StyledTableCellHead>
            <StyledTableCellHead>Birth Date</StyledTableCellHead>
            <StyledTableCellHead>Top Work</StyledTableCellHead>
            <StyledTableCellHead>Action</StyledTableCellHead>
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {bookList.map((book) => (
            <StyledTableRow key={book.key}>
              <StyledTableCell>{book.serial_number}</StyledTableCell>
              <StyledTableCell>{book.ratings_average}</StyledTableCell>
              <StyledTableCell>{book.author_name}</StyledTableCell>
              <StyledTableCell>{book.title}</StyledTableCell>
              <StyledTableCell>{book.first_publish_year}</StyledTableCell>
              <StyledTableCell>{book.subject}</StyledTableCell>
              <StyledTableCell>{book.author_birth_date}</StyledTableCell>
              <StyledTableCell>{book.author_top_work}</StyledTableCell>
              <StyledTableCell>
                <Button variant="outlined" onClick={() => handleEdit(book)}>Edit</Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </StyledTable>

      {/* Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Book</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveEdit} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </StyledPaper>
  );
};

BookTable.propTypes = {
  books: PropTypes.array.isRequired,
  sort: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
};

export default BookTable;
