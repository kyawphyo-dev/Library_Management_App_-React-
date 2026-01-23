import React from "react";
import Book from "./Book";
import useFetch from "../hooks/useFetch";

export default function BookList() {
  let { data: books, loading, error } = useFetch("http://localhost:4000/books");
  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <>
      {loading && <div className="text-blue-500">Loading...</div>}
      {!!books && (
        <div className=" grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4 mt-5">
          {books.map((book) => (
            <Book key={book.id} book={book} />
          ))}
        </div>
      )}
    </>
  );
}
