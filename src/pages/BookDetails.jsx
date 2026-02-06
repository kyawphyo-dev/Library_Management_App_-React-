import React from "react";
import { useParams } from "react-router";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router";

export default function BookDetails() {
  let { id } = useParams();
  let {
    data: book,
    loading,
    error,
  } = useFetch(`http://localhost:4000/books/${id}`);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }
  return (
    <div className="">
      {loading && <div className="text-blue-500">Loading...</div>}
      {book && (
        <div className="max-w-4xl mx-auto p-2 md:p-5 shadow-primary bg-bg rounded-lg shadow md:mt-10 mt-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Left: Book Cover */}
            <div className="flex justify-center my-5">
              <img
                src={book.coverImage || "https://via.placeholder.com/200x300"}
                alt={book.title}
                className="w-[80%] h-72 object-cover rounded-lg shadow shadow-primary"
              />
            </div>

            {/* Right: Book Info */}
            <div className="md:col-span-2 space-y-4 my-5 ">
              <h1 className="text-2xl text-text font-bold text-center md:text-start  text-gray-800">
                {book.title}
              </h1>

              <p className="text-text-muted text-center md:text-start">
                by <span className="font-medium">{book.author}</span>
              </p>

              {/* Genres */}
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                {book.genre.map((g) => (
                  <span
                    key={g}
                    className="px-3 py-1 text-sm bg-indigo-500/50 text-text rounded-full"
                  >
                    {g}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-text-muted leading-relaxed indent-4 sm:indent-0 text-sm sm:text-base">
                {book.description}
              </p>

              {/* Meta Info */}
              <div className="flex gap-6 text-sm text-text-muted">
                <span>Published: {book.publishedYear}</span>
                <span>
                  Status:{" "}
                  <span
                    className={`font-medium ${
                      book.available ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {book.available ? "Available" : "Not Available"}
                  </span>
                </span>
              </div>

              {/* Action Button */}
              <div className="text-center md:text-start">
                <button
                  disabled={!book.available}
                  className={`mt-4 px-6 py-2  rounded-lg font-medium transition
              ${
                book.available
                  ? "bg-primary text-white hover:bg-primary-hover"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }
            `}
                >
                  {book.available ? "Borrow Book" : "Unavailable"}
                </button>
                <Link
                  to={`/`}
                  className="bg-primary text-white hover:bg-primary-hover px-4 py-2 rounded-lg mt-4 inline-block ms-2"
                >
                  Back
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
