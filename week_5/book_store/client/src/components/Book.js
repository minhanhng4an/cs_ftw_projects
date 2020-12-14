import React from "react";
import { Card } from "react-bootstrap";

const Book = ({ book, handleClickOnBook }) => {
  const BACKEND_API = process.env.REACT_APP_BACKEND_API;

  return (
    <Card
      className="book"
      onClick={() => {
        handleClickOnBook(book.id);
      }}
    >
      <Card.Img
        variant="top"
        width="100px"
        src={BACKEND_API + "/" + book.imageLink}
      />
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Text>{`Author: ${book.author}`}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Book;
