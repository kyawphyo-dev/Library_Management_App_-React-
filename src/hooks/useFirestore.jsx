/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { db } from "../firebase/index";
import {
  updateDoc,
  addDoc,
  collection,
  doc,
  deleteDoc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";

export default function useFirestore() {
  let getCollection = (colName, _q) => {
    let qRef = useRef(_q).current;
    let [data, setData] = useState([]);
    let [error, setError] = useState("");
    let [loading, setLoading] = useState(false);

    useEffect(() => {
      setLoading(true);
      let ref = collection(db, colName);
      let queries = [];
      if (qRef) {
        queries.push(where(...qRef));
      }
      queries.push(orderBy("date", "desc"));
      let q = query(ref, ...queries);

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          if (snapshot.empty) {
            setData([]);
            setError("No books found");
          } else {
            let collectionData = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));

            setData(collectionData);
            setError("");
          }
          setLoading(false);
        },
        (err) => {
          setError(err.message);
          setLoading(false);
          console.log("Error fetching collection: ", err);
        }
      );
      return () => unsubscribe();
    }, [colName, qRef]);

    return { data, error, loading };
  };

  let getDocument = (colName, id) => {
    let [error, setError] = useState("");
    let [loading, setLoading] = useState(false);
    let [data, setData] = useState();

    useEffect(() => {
      setLoading(true);

      let ref = doc(db, colName, id);

      onSnapshot(
        ref,
        (document) => {
          if (document.exists()) {
            setData({ id: document.id, ...document.data() });
            setError("");
          } else {
            setError("Book not found");
          }
          setLoading(false);
        },
        (err) => {
          setError(err.message);
          setLoading(false);
        }
      );
    }, [id]);
    return { data, error, loading };
  };

  let addDocument = async (colName, data) => {
    data.date = serverTimestamp();
    let ref = collection(db, colName);
    await addDoc(ref, data);
  };

  let deleteDocument = async (colName, id) => {
    try {
      await deleteDoc(doc(db, colName, id));
    } catch (err) {
      console.error("Error deleting document: ", err);
    }
  };

  let updateDocument = async (colName, id, data) => {
    data.date = serverTimestamp();
    let ref = doc(db, colName, id);
    await updateDoc(ref, data);
  };

  return {
    getCollection,
    getDocument,
    addDocument,
    deleteDocument,
    updateDocument,
  };
}
