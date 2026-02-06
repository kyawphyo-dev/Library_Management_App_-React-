import React from "react";
import CleanCode from "../assets/bookcovers/Clean_code.jpeg";
import { Link } from "react-router";

export default function Book({ book }) {
  return (
    <div>
      {/* Books */}
      <div
        className={`border p-4 rounded-lg shadow hover:shadow-lg bg-card transition min-h-80 md:min-h-110 ${
          book.available ? "border-border" : "border-danger"
        }`}
      >
        <div className="flex flex-col h-full">
          <Link to={`/books/${book.id}`}>
            <div className="md:h-48 h-35 bg-bg mb-4 items-center justify-center">
              <img
                src={CleanCode}
                alt="Book cover"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </Link>
          <div className="text-center space-y-2">
            <h5 className="text-lg font-semibold text-text ">{book.title}</h5>
            <p className="text-text-muted">{book.author}</p>
            <div className="hidden md:block space-y-2 my-2">
              {book.genre.map((genre) => (
                <span
                  key={genre}
                  className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full mr-1"
                >
                  {genre}
                </span>
              ))}
            </div>
            <div className="mt-auto">
              <Link
                to={`/books/${book.id}`}
                className="mt-2 bg-primary text-white px-4 py-2 rounded hover:bg-primary-hover transition inline-block text-sm"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
