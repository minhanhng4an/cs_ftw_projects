import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Container, Col, Row, Button, Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import SaveAlert from "../components/SaveAlert";
import api from "../apiService";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const BookDetailPage = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [book, setBook] = useState({});
  const [bookExisted, setBookExisted] = useState(undefined);

  const params = useParams();

  const checkFavorite = useCallback(
    async (func) => {
      try {
        const response = await api.get(`/favorites/`);
        const data = await response.data;

        if (response.status === 200) {
          const ids = data.map((x) => x.id);
          if (!ids.includes(book.id)) {
            await func();
          } else {
            setBookExisted(true);
          }
        } else {
          setErrorMsg(`FETCH BOOKS ERROR: ${data.message}`);
        }
      } catch (error) {
        setErrorMsg(`FETCH BOOKS ERROR: ${error.message}`);
      }
    },
    [book.id]
  );

  const saveBook = async () => {
    console.log("save");
    await api.post(`/favorites`, book);
    setBookExisted(true);
  };

  const removeBook = async () => {
    await api.delete(`/favorites/${book.id}`);
    setBookExisted(false);
  };

  const notify = () => {
    if (bookExisted) {
      toast.error(`${book.title} has been removed from your Reading List.`);
    } else {
      toast.success(`${book.title} has been added to your Reading List.`);
    }
  };

  useEffect(() => {
    if (!params || !params.id) return;
    const fetchData = async () => {
      try {
        let url = `/books/${params.id}`;
        const response = await api.get(url);
        const data = await response.data;

        if (response.status === 200) {
          setBook(data);
        } else {
          setErrorMsg(`FETCH BOOKS ERROR: ${data.message}`);
        }
      } catch (error) {
        setErrorMsg(`FETCH BOOK ERROR: ${error.message}`);
      }
    };
    fetchData();
    checkFavorite(() => {
      setBookExisted(false); // When page loaded
    });
  }, [params, checkFavorite]);

  return (
    <Container>
      <div className="d-flex flex-column align-items-center">
        {errorMsg && (
          <Alert variant="danger" className="mt-4">
            {errorMsg}
          </Alert>
        )}
      </div>
      {book && (
        <>
          <hr />
          <Row className="align-items-center">
            <Col md={6}>
              <img src={BACKEND_API + "/" + book.imageLink} alt={book.title} />
            </Col>
            <Col md={6}>
              <h1 className="book-title">{book.title}</h1>
              <p className="book-desc">
                <span className="text-bold">{"Author: "}</span>
                {book.author}
              </p>
              <p className="book-desc">
                <span className="text-bold">{"Country: "}</span>
                {book.country}
              </p>
              <p className="book-desc">
                <span className="text-bold">{"Language: "}</span>
                {book.language}
              </p>
              <p className="book-desc">
                <span className="text-bold">{"Year: "}</span>
                {book.year}
              </p>

              <Row>
                <Button href={book.link} target="_blank" className="book-btn">
                  See on Wiki
                </Button>
                {bookExisted !== undefined && (
                  <Button
                    href="#"
                    variant={bookExisted ? "danger" : "success"}
                    className="book-btn"
                    onClick={() => {
                      bookExisted ? removeBook() : checkFavorite(saveBook);
                      notify();
                    }}
                  >
                    {bookExisted ? "Unsave" : "Save"}
                  </Button>
                )}
              </Row>
            </Col>
          </Row>
        </>
      )}

      <SaveAlert />
    </Container>
  );
};

export default BookDetailPage;
