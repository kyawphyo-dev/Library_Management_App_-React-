/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Book from "./Book";
import { useLocation } from "react-router-dom";
import { db } from "../firebase/index";
import {
  collection,
  doc,
  deleteDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import useFirestore from "../hooks/useFirestore";

export default function BookList() {
  let location = useLocation();
  let param = new URLSearchParams(location.search);
  let search = param.get("search");

  // Fetch books from Firestore
  let { getCollection, deleteDocument } = useFirestore();
  let { data: books, loading, error } = getCollection("books");
  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  // Delete book from Firestore
  let deleteBook = async (id) => {
    deleteDocument("books", id);
    //  setBooks((prev) => prev.filter((book) => book.id !== id));
  };

  return (
    <>
      {loading && <div className="text-blue-500">Loading...</div>}
      {!!books && (
        <div className=" grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mt-5 min-h-110">
          {books.map((book) => (
            <Book key={book.id} book={book} deleteBook={deleteBook} />
          ))}
        </div>
      )}
      {!books?.length && !loading && (
        <p className=" text-center text-gray-500">No search result Found</p>
      )}
    </>
  );
}
