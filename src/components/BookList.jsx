/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Book from "./Book";
import { useLocation } from "react-router-dom";
import db from "../firebase/index";
import {
  collection,
  doc,
  deleteDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

export default function BookList() {
  let location = useLocation();
  let param = new URLSearchParams(location.search);
  let search = param.get("search");
  let [books, setBooks] = useState([]);
  let [error, setError] = useState("");
  let [loading, setLoading] = useState(false);
  // let {
  //   data: books,
  //   loading,
  //   error,
  // } = useFetch(`http://localhost:4000/books?q=${search || ""}`);
  // Fetch books from Firestore
  useEffect(() => {
    let Fetchbooks = async () => {
      setLoading(true);
      let ref = collection(db, "books");
      let q = await query(ref, orderBy("date", "desc"));

      onSnapshot(
        q,
        (snapshot) => {
          if (snapshot.empty) {
            setBooks([]);
            setError("No books found");
          } else {
            let booksData = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));

            setBooks(booksData);
            setError("");
          }
          setLoading(false);
        },
        (err) => {
          setError("Failed to fetch books");
          setLoading(false);
        }
      );
    };
    Fetchbooks();
    // ✅ cleanup (important!)
  }, []);
  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  let deleteBook = async (id) => {
    let ref = doc(db, "books", id);
    await deleteDoc(ref);
    setBooks((prev) => prev.filter((book) => book.id !== id));
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
