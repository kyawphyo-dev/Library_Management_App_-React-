import React, { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router";
import CV from "../assets/bookcovers/cover_1.jpg";
import useFirestore from "../hooks/useFirestore";
import NoteForm from "../components/NoteForm";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import moment from "moment";
import trash from "../assets/Icons/trash.svg";
import edit from "../assets/Icons/edit.svg";
export default function BookDetails() {
  let { user } = useContext(AuthContext);
  let [editNote, setEditNote] = useState(null);
  let { id } = useParams();
  let { getDocument, getCollection, deleteDocument } = useFirestore();
  let { data: book, loading, error } = getDocument("books", id);
  // Fetch notes related to the book
  let { data: notes } = getCollection(
    "notes",
    user?.uid
      ? [
          ["bookId", "==", id],
          ["uid", "==", user.uid],
        ]
      : [["bookId", "==", id]]
  );
  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  //delet note
  let deleteNote = async (id) => {
    await deleteDocument("notes", id);
  };
  return (
    <>
      {loading && <div className="text-blue-500">Loading...</div>}
      {book && (
        <>
          <div className="max-w-3xl p-3 md:p-5 shadow-primary bg-bg rounded-lg shadow md:mt-10 mt-5 mx-auto ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 ">
              {/* Left: Book Cover */}
              <div className="h-full flex justify-center flex-col">
                <img
                  src={CV}
                  alt={book.title}
                  className="w-full md:w-[80%] h-60 md:h-90 border rounded-lg object-cover md:ms-5"
                />
                <Link
                  to={`/`}
                  className="mt-3 ms-5 inline-block text-sm text-primary hover:underline d-flex"
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
          <NoteForm />
          <div>
            <h3 className="text-text text-center my-3">MY NOTES</h3>
            <div className="max-w-3xl mx-auto mt-5 space-y-3">
              {notes?.length ? (
                notes.map((note) => (
                  <div
                    key={note.id}
                    className="border border-border p-3 rounded shadow bg-card"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src="https://lh3.googleusercontent.com/a/ACg8ocKhLm_BGPuQWHk9yTA_LlJ71ULC2sYNqKJGKrjg0BrywXUmlVE=s96-c"
                        alt=""
                        className="w-12 h-12 rounded-full border border-primary"
                      />
                      <div>
                        <p className="text-text text-sm">Kyaw Phyo Win</p>
                        <p className=" text-text-muted text-sm">
                          {moment(note.date?.toDate()).fromNow()}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-3 ">
                      <div>
                        {editNote?.id !== note.id && (
                          <p className=" text-text">{note.note}</p>
                        )}
                      </div>

                      <div className="flex space-x-2">
                        <img
                          src={edit}
                          className="cursor-pointer"
                          onClick={() => setEditNote(note)}
                        />
                        <img
                          src={trash}
                          className="cursor-pointer"
                          onClick={() => deleteNote(note.id)}
                        />
                      </div>
                    </div>
                    {editNote?.id === note.id && (
                      <NoteForm
                        type="update"
                        setEditNote={setEditNote}
                        editNote={editNote}
                      />
                    )}
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No notes found.</p>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
