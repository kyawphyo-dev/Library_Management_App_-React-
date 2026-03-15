import React, { useState, useContext } from "react";
import moment from "moment";
import trash from "../assets/Icons/trash.svg";
import edit from "../assets/Icons/edit.svg";
import { AuthContext } from "../contexts/AuthContext";
import useFirestore from "../hooks/useFirestore";
import { useParams } from "react-router";
import NoteForm from "./NoteForm";

export default function NoteList() {
  let [editNote, setEditNote] = useState(null);
  let { user } = useContext(AuthContext);
  let { id } = useParams();

  let { getCollection, deleteDocument } = useFirestore();
  // Fetch notes related to the book
  let {
    data: notes,
    error,
    loading,
  } = getCollection(
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
  );
}
