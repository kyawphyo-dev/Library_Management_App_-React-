import React from "react";
import Cover1 from "../assets/images/cover_1.jpg";
import { Link } from "react-router";

export default function Book({ book }) {
  return (
    <div>
      {/* Books */}
      <div className="border border-primary p-4 rounded-lg shadow hover:shadow-lg transition">
        <Link to={`/books/${book.id}`}>
          <div className="md:h-48 h-35 bg-gray-200 mb-4 flex items-center justify-center">
            <img
              src={Cover1}
              alt="Book cover"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </Link>
        <div className="text-center space-y-2">
          <h5 className="text-lg font-semibold ">{book.title}</h5>
          <p className="text-gray-600">{book.author}</p>
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
          <Link
            to={`/books/${book.id}`}
            className="mt-2 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
