import React from "react";
import CleanCode from "../assets/bookcovers/Clean_code.jpeg";
import { Link } from "react-router";
import trash from "../assets/Icons/trash.svg";
import edit from "../assets/Icons/edit.svg";

export default function Book({ book, deleteBook }) {
  return (
    <div>
      {/* Books */}
      <div
        className={`border p-4 rounded-lg shadow hover:shadow-lg bg-card transition min-h-80 md:min-h-110 lg:min-h-120 ${
          book.available ? "border-border" : "border-danger"
        }`}
      >
        {/* Image */}
        <div className="flex flex-col h-full">
          <Link to={`/books/${book.id}`}>
            <div className="md:h-48 lg:h-55 h-35 bg-bg mb-4 items-center justify-center">
              <img
                src={CleanCode}
                alt="Book cover"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </Link>
          {/* Book Info Section */}
          <div className="text-center space-y-2">
            <h5 className="text-lg font-semibold text-text ">{book.title}</h5>
            <p className="text-text-muted">{book.author}</p>
            <div className="hidden md:block space-y-2 my-2">
              {book.genre?.map((genre) => (
                <span
                  key={genre}
                  className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full mr-1"
                >
                  {genre}
                </span>
              ))}
            </div>
            {/* Action Button Section */}
            <div className="mt-auto flex items-center justify-between">
              {/* Detail button */}
              <Link
                to={`/books/${book.id}`}
                className="mt-2 bg-primary text-white px-4 py-2 rounded hover:bg-primary-hover transition inline-block text-sm"
              >
                <span className="lg:hidden">Details</span>
                <span className="hidden lg:inline">View Details</span>
              </Link>

              {/* Edit */}
              <Link to={`/edit/${book.id}`} className="mt-2">
                <img
                  src={edit}
                  alt=""
                  className="border border-primary text-white px-4 py-2 rounded hover:bg-blue-200 transition inline-block text-sm"
                />
              </Link>

              {/* Delete */}
              <img
                className="mt-2 border cursor-pointer border-red-200 text-white px-4 py-2 rounded hover:bg-red-400 hover:text-white transition inline-block text-sm"
                src={trash}
                alt=""
                onClick={() => deleteBook(book.id)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
