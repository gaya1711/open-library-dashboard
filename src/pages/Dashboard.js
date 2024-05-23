import React, { useState, useEffect } from 'react';
import { fetchBooks } from '../api';
import BookTable from '../components/BookTable';
import Pagination from '../components/Pagination';
import { MenuItem, Select, FormControl, InputLabel, Box, Typography, Button, TextField, CircularProgress } from '@mui/material';
import styled from '@emotion/styled';
import { saveAs } from 'file-saver';

const StyledBox = styled(Box)`
  padding: 40px;
  background-color: #FFE6E6;
  font-family: 'Comic Sans MS', cursive, sans-serif;
`;

const StyledHeaderBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const StyledTitle = styled(Typography)`
  font-size: 2.5rem;
  color: #7469B6;
  font-family: 'Dancing Script', cursive; /* Ensure you import this font or use a similar cursive font */
`;

const StyledSelect = styled(FormControl)`
  min-width: 120px;
  margin-right: 10px;
`;

const StyledInputLabel = styled(InputLabel)`
  font-family: 'Comic Sans MS', cursive, sans-serif;
  color: #AD88C6;
`;

const StyledMenuItem = styled(MenuItem)`
  font-family: 'Comic Sans MS', cursive, sans-serif;
  color: #7469B6;
`;

const StyledSearchBox = styled(Box)`
  display: flex;
  align-items: center;
`;

const StyledSearchInput = styled(TextField)`
  margin-left: 70px;
`;

const StyledSearchButton = styled(Button)`
  background-color: #7469B6; 
  color: #fff;
`;

const StyledDownloadButton = styled(Button)`
  background-color: #7469B6;
  color: #fff;
`;

const StyledPaginationBox = styled(Box)`
  margin-top: 20px;
`;

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState('title');
  const [order, setOrder] = useState('asc');
  const [totalPages, setTotalPages] = useState(1);
  const [searchAuthor, setSearchAuthor] = useState('');
  const [loading, setLoading] = useState(false); //track loading

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true); //loading to true before fetching data
      const data = await fetchBooks(page, limit, sort, order);
      setBooks(data.books);
      setTotalPages(data.totalPages);
      setLoading(false); //loading to false after fetching data
    };
    loadBooks();
  }, [page, limit, sort, order]);

  const handleSort = (column) => {
    const isAsc = sort === column && order === 'asc';
    setSort(column);
    setOrder(isAsc ? 'desc' : 'asc');
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handleDownloadCSV = () => {
    const csvData = books.map((book) => `${book.title},${book.author_name},${book.first_publish_year},${book.ratings_average},${book.author_birth_date},${book.author_top_work}`).join('\n');
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'books_data.csv');
  };

  const handleSearchAuthor = async (page, limit, sort, order, setBooks, setTotalPages) => {
    setLoading(true); //loading to true before fetching data
    // search logic here, fetch books by author
    const data = await fetchBooks(page, limit, sort, order); 
    setBooks(data.books);
    setTotalPages(data.totalPages);
    setLoading(false); 
  };

  return (
    <StyledBox>
      <StyledHeaderBox>
        <Box display="flex" alignItems="center">
          <StyledTitle variant="h4">Dashboard</StyledTitle>
          <StyledSearchBox>
            <StyledSearchInput
              label="Search by Author"
              value={searchAuthor}
              onChange={(e) => setSearchAuthor(e.target.value)}
              variant="outlined"
              size="small"
            />
            <StyledSearchButton variant="contained" color="primary" onClick={() => handleSearchAuthor(page, limit, sort, order, setBooks, setTotalPages)}>Search</StyledSearchButton>
          </StyledSearchBox>
        </Box>
        <Box display="flex" alignItems="center">
          <StyledSelect variant="outlined">
            <StyledInputLabel id="limit-label">Records per page</StyledInputLabel>
            <Select
              labelId="limit-label"
              value={limit}
              onChange={handleLimitChange}
              label="Records per page"
              size="small"
            >
              <StyledMenuItem value={10}>10</StyledMenuItem>
              <StyledMenuItem value={50}>50</StyledMenuItem>
              <StyledMenuItem value={100}>100</StyledMenuItem>
            </Select>
          </StyledSelect>
          <StyledDownloadButton variant="contained" onClick={handleDownloadCSV}>Download CSV</StyledDownloadButton>
        </Box>
      </StyledHeaderBox>
      <BookTable books={books} sort={{ column: sort, direction: order }} onSort={handleSort} />
      <StyledPaginationBox>
        <Box display="flex" justifyContent="center" marginTop={2}>
          {loading ? (
            <CircularProgress color="primary" />
          ) : (
            <Pagination count={totalPages} page={page} onPageChange={handlePageChange} />
          )}
        </Box>
      </StyledPaginationBox>
    </StyledBox>
  );
};

export default Dashboard;
