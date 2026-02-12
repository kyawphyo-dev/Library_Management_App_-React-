import React, { useEffect, useState } from "react";
import Book from "./Book";
import { useLocation } from "react-router-dom";
import db from "../firebase/index";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

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

  useEffect(function () {
    const fetchBooks = async () => {
      setLoading(true);
      let ref = collection(db, "books");
      let q = query(ref, orderBy("date", "desc"));
      try {
        let docs = await getDocs(q);
        if (docs.empty) {
          setError("No books found");
        } else {
          let booksData = [];
          docs.forEach((doc) => {
            let book = { id: doc.id, ...doc.data() };
            booksData.push(book);
          });
          setBooks(booksData);
          setError("");
        }
      } catch (err) {
        setError("Failed to fetch books");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);
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
