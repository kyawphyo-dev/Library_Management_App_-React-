import React from "react";
import Book from "./Book";

export default function BookList() {
  return (
    <>
      <div className=" grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4 mt-5">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((book) => (
          <Book key={book} book={book} />
        ))}
      </div>
    </>
  );
}
