import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFirestore from "../hooks/useFirestore";
import { AuthContext } from "../contexts/AuthContext";

export default function NoteForm({ type = "create", setEditNote, editNote }) {
  let { user } = useContext(AuthContext);
  let { addDocument, updateDocument } = useFirestore();
  let { id } = useParams();
  let [note, setNote] = useState("");
  //trigger of update and create
  useEffect(() => {
    if (type === "update") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setNote(editNote.note);
    }
  }, [type]);

  //submit
  let handleSubmit = async (e) => {
    e.preventDefault();
    if (type === "create") {
      let data = {
        note,
        uid: user.uid,
        bookId: id,
      };

      if (!note.trim()) {
        return;
      }
      await addDocument("notes", data);
      setNote("");
    } else {
      // eslint-disable-next-line react-hooks/immutability
      editNote.note = note;
      await updateDocument("notes", editNote.id, editNote);
      setEditNote(null);
    }
  };
  return (
    <form action="" className="max-w-3xl mx-auto mt-5" onSubmit={handleSubmit}>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full border p-3 shadow-md rounded"
        name=""
        id=""
        placeholder="Write your notes here..."
        rows={1}
      ></textarea>
      <div className="flex space-x-2">
        <button className="md:border border-primary text-primary px-3 py-2 rounded hover:bg-primary hover:text-white transition duration-300 flex">
          <span className="hidden md:block text-sm lg:text-base">
            {type === "update" ? "Update" : "Save"} Note
          </span>
        </button>
        {type === "update" && (
          <button
            type="button"
            onClick={() => setEditNote(null)}
            className="md:border bg-primary text-white px-3 py-2 rounded hover:bg-primary-hover transition duration-300 flex"
          >
            <span className="hidden md:block text-sm lg:text-base">Cancel</span>
          </button>
        )}
      </div>
    </form>
  );
}
