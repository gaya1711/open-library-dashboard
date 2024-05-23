import axios from 'axios';

const BASE_URL = 'https://openlibrary.org';

const fetchAuthorDetails = async (authorName) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/authors.json`, {
      params: { q: authorName },
      headers: { 'User-Agent': 'open-library-dashboard (gayatrikoramoni@gmail.com)' }
    });

    if (response.data.docs.length > 0) {
      return {
        birth_date: response.data.docs[0].birth_date || 'N/A',
        top_work: response.data.docs[0].top_work || 'N/A'
      };
    }
  } catch (error) {
    console.error(`Failed to fetch author details for ${authorName}:`, error);
  }
  return { birth_date: 'N/A', top_work: 'N/A' };
};

const getRandomRating = () => (Math.random() * 5 + 5).toFixed(1);

export const fetchBooks = async (page = 1, limit = 10, sort = 'title', order = 'asc') => {
  try {
    const offset = (page - 1) * limit;
    const response = await axios.get(`${BASE_URL}/search.json`, {
      params: {
        q: 'subject:fiction',
        offset,
        limit,
        sort,
        order,
      },
      headers: {
        'User-Agent': 'open-library-dashboard (gayatrikoramoni@gmail.com)'
      }
    });

    const books = response.data.docs.map((book, index) => ({
      serial_number: offset + index + 1,
      key: book.key,
      ratings_average: getRandomRating(), //random rating
      author_name: book.author_name ? book.author_name.join(', ') : 'Unknown',
      title: book.title ? book.title.replace(/[^a-zA-Z0-9\s]/g, '').trim() : 'No Title',
      first_publish_year: book.first_publish_year,
      subject: book.subject ? book.subject.join(', ') : 'N/A',
      author_birth_date: 'Loading...', 
      author_top_work: 'Loading...', 
    }));

    return {
      books,
      totalPages: Math.ceil(response.data.numFound / limit),
    };
  } catch (error) {
    console.error('Failed to fetch books:', error);
    return {
      books: [],
      totalPages: 1,
    };
  }
};

export const fetchAndUpdateAuthorDetails = async (books) => {
  const updatedBooks = await Promise.all(books.map(async (book) => {
    if (book.author_name !== 'Unknown') {
      try {
        const authorDetails = await fetchAuthorDetails(book.author_name);
        return {
          ...book,
          author_birth_date: authorDetails.birth_date,
          author_top_work: authorDetails.top_work,
        };
      } catch (error) {
        console.error(`Failed to fetch author details for ${book.author_name}:`, error);
        return book; //return the book as it is in case of an error
      }
    }
    return book;
  }));

  return updatedBooks;
};
