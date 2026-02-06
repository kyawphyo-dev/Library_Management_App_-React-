import React from "react";
import Book from "./Book";
import useFetch from "../hooks/useFetch";
import { useLocation } from "react-router-dom";

export default function BookList() {
  let location = useLocation();
  let param = new URLSearchParams(location.search);
  let search = param.get("search");
  let {
    data: books,
    loading,
    error,
  } = useFetch(`http://localhost:4000/books?q=${search || ""}`);
  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <>
      {loading && <div className="text-blue-500">Loading...</div>}
      {!!books && (
        <div className=" grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4 mt-5 min-h-110">
          {books.map((book) => (
            <Book key={book.id} book={book} />
          ))}
        </div>
      )}
      {!books?.length && !loading && (
        <p className=" text-center text-gray-500">No search result Found</p>
      )}
    </>
  );
}
