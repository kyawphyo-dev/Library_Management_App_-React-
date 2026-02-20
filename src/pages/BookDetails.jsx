import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router";
import { db } from "../firebase/index";
import { doc, onSnapshot } from "firebase/firestore";
import CV from "../assets/bookcovers/cover_1.jpg";

export default function BookDetails() {
  let [error, setError] = useState("");
  let [loading, setLoading] = useState(false);
  let [book, setBook] = useState();
  let { id } = useParams();
  useEffect(() => {
    let FetchDetail = async () => {
      setLoading(true);

      let ref = doc(db, "books", id);

      onSnapshot(
        ref,
        (bookdata) => {
          if (bookdata.exists()) {
            setBook({ id: bookdata.id, ...bookdata.data() });
            setError("");
          } else {
            setError("Book not found");
          }
          setLoading(false);
        },
        // eslint-disable-next-line no-unused-vars
        (err) => {
          setError("Failed to fetch book");
          setLoading(false);
        }
      );
    };
    FetchDetail();
  }, [id]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }
  return (
    <div className="">
      {loading && <div className="text-blue-500">Loading...</div>}
      {book && (
        <div className="max-w-3xl p-3 md:p-5 shadow-primary bg-bg rounded-lg shadow md:mt-10 mt-5 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
            {/* Left: Book Cover */}
            <div className="h-full flex items-center justify-center flex flex-col">
              <img
                src={CV}
                alt={book.title}
                className="w-full md:w-[80%] h-80 md:h-100 border rounded-lg object-cover md:ms-5"
              />
              <Link
                to={`/`}
                className="mt-5 inline-block text-sm text-primary hover:underline d-flex"
              >
                Back to Home
              </Link>
            </div>
            {/* Right Book data */}
            <div className=" text-text  text-center md:text-left">
              <div className="mt-2 space-y-4 ">
                <p className="text-2xl">{book.title}</p>
                <p className="text-lg text-text-muted">by {book.author}</p>
                <p className="">{book.description}</p>

                <p>
                  {book.genre?.map((genre) => (
                    <span
                      key={genre}
                      className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full mr-1"
                    >
                      {genre}
                    </span>
                  ))}
                </p>
                <p>
                  <span className="font-semibold">Published Year: </span>
                  {book.publishedYear}
                </p>
                <p>
                  <span className={`font-semibold`}>Available: </span>
                  <span
                    className={`${
                      book.available ? "text-success" : "text-danger"
                    }`}
                  >
                    {" "}
                    {book.available ? "In Stock" : "Out of Stock"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
