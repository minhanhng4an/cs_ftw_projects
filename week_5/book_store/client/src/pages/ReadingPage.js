import React, { useState, useEffect } from "react";
import { Alert, Container, CardDeck } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import SearchForm from "../components/SearchForm";
import PaginationBar from "../components/PaginationBar";
import Book from "../components/Book";
import api from "../apiService";

const ReadingPage = () => {
  const totalPageNum = 10;
  const limit = 12;

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [query, setQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [books, setBooks] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const history = useHistory();

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchFormSubmit = (event) => {
    event.preventDefault();
    setQuery(searchInput);
  };

  const handleClickOnBook = (id) => {
    history.push(`/books/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let url = `/favorites?_page=${pageNum}&_limit=${limit}`;
        if (query) url += `&q=${query}`;
        const response = await api.get(url);
        const data = await response.data;
        if (response.status === 200) {
          setBooks(data);
        } else {
          setErrorMsg(`FETCH BOOKS ERROR: ${data.message}`);
        }
      } catch (error) {
        setErrorMsg(`FETCH BOOKS ERROR: ${error.message}`);
      }
      setLoading(false);
    };
    fetchData();
  }, [query, pageNum]);

  return (
    <div>
      <Container>
        <SearchForm
          loading={loading}
          searchInput={searchInput}
          handleSearchChange={handleSearchChange}
          handleSubmit={handleSearchFormSubmit}
        />
        <hr />
        <CardDeck className="justify-content-center">
          {books.map((book) => (
            <Book book={book} handleClickOnBook={handleClickOnBook}></Book>
          ))}
        </CardDeck>
        <hr />
        {errorMsg && (
          <Alert variant="danger" className="mt-4">
            {errorMsg}
          </Alert>
        )}
        <div className="d-flex flex-column align-items-center">
          {errorMsg && (
            <Alert variant="danger" className="mt-4">
              {errorMsg}
            </Alert>
          )}
          <PaginationBar
            pageNum={pageNum}
            setPageNum={setPageNum}
            totalPageNum={totalPageNum}
          />
        </div>
      </Container>
    </div>
  );
};

export default ReadingPage;
