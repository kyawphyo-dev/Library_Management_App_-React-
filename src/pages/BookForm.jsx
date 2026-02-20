import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import PlaceHolderImg from "../assets/images/image_placeholder.jpeg";
import { Link } from "react-router-dom";
import { collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/index";
import { addDoc, doc, getDoc, updateDoc } from "firebase/firestore";

export default function Create() {
  let { id } = useParams();

  let navigate = useNavigate();
  // Form States
  const [isEdit, setIsEdit] = useState(false);
  const [preview, setPreview] = useState(PlaceHolderImg);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: [],
    publishedYear: "",
    available: false,
    coverImage: null,
    description: "",
  });
  const [showAddGenre, setShowAddGenre] = useState(false);
  //Genres
  const [newGenre, setNewGenre] = useState("");
  const [genres, setGenres] = useState([
    "Programming",
    "Software Engineering",
    "Web Development",
    "Database",
  ]);

  // Handle add genre input
  const handleAddGenre = () => {
    if (!newGenre.trim()) {
      setShowAddGenre(false);
      return;
    }
    if (!genres.includes(newGenre)) {
      setGenres((prev) => [...prev, newGenre]); // ✅ state update
    }
    setNewGenre("");
    setShowAddGenre(false); // close form & show checkboxes again
  };

  // Handle change genre
  const handleChangeGenre = (e) => {
    const { value, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      genre: checked
        ? [...prev.genre, value] // add
        : prev.genre.filter((g) => g !== value), // remove
    }));
  };

  // Handle file input change for img
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create preview URL
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
    setFormData((prev) => ({
      ...prev,
      coverImage: file,
    }));
  };

  //Trigger edit mode
  useEffect(() => {
    let formSwitch = async () => {
      if (id) {
        setIsEdit(true);
        let docRef = doc(db, "books", id);
        let docSnap = await getDoc(docRef);
        let data = docSnap.data();
        setPreview(data.coverImage || PlaceHolderImg);
        setGenres(data.genre || []);
        setFormData((prev) => ({
          ...prev,
          title: data.title,
          author: data.author,
          description: data.description,
          publishedYear: data.publishedYear,
          available: data.available,
          genre: data.genre || [],
        }));
      } else {
        setIsEdit(false);
        setPreview(PlaceHolderImg);

        setFormData({
          title: "",
          author: "",
          genre: [],
          publishedYear: "",
          available: false,
          coverImage: null,
          description: "",
        });
      }
    };
    formSwitch();
  }, []);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let data = {
        ...formData,
        date: serverTimestamp(),
      };

      if (isEdit) {
        let ref = doc(db, "books", id);
        await updateDoc(ref, data);
      } else {
        let ref = collection(db, "books");
        await addDoc(ref, data);
      }
      navigate("/");
    } catch (error) {
      console.log("Error adding book:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-5 md:p-10 shadow-primary bg-card rounded-lg shadow md:mt-10 mt-5">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
          <div className="">
            <div className="">
              <img
                src={preview}
                alt="book cover"
                className="w-[80%] h-90 object-cover rounded-lg shadow shadow-primary"
              />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="
                        block w-[80%] text-sm mt-3 text-text
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-lg file:border-0
                        file:text-sm file:font-medium
                        file:bg-indigo-50 file:text-indigo-600
                        hover:file:bg-indigo-100
                        border border-border rounded-lg
                        cursor-pointer
                      "
            />
            <Link
              to={`/`}
              className="mt-5 inline-block text-sm text-primary hover:underline d-flex"
            >
              Back to Home
            </Link>
          </div>
          <div className=" space-y-2">
            {/* Title */}
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full text-text border rounded-lg p-2 border-border "
              required
              placeholder="Book Title"
            />
            {/* Author */}
            <input
              type="text"
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
              className="w-full text-text border rounded-lg p-2 border-border "
              placeholder="Author Name"
              required
            />
            {/* Description */}
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full border rounded-lg p-2 text-text border-border "
              placeholder="Book Description"
              rows="4"
              required
            />
            {/* {Genre} */}
            <div>
              <p className="text-sm font-medium mb-1">Genre </p>
              {!showAddGenre && (
                <div className="flex flex-wrap gap-2">
                  {genres.map((g) => (
                    <label
                      key={g}
                      className="flex items-center gap-1 text-sm text-primary"
                    >
                      <input
                        type="checkbox"
                        value={g}
                        checked={formData.genre?.includes(g)}
                        onChange={handleChangeGenre}
                        className="w-4 h-4 border bordborder rounded-lg text-indigo-600 focus:ring-0"
                      />
                      {g}
                    </label>
                  ))}
                  <button
                    type="button"
                    onClick={() => setShowAddGenre(!showAddGenre)}
                    className={`px-2 py-1 border border-border rounded-lg text-xs text-indigo-600 hover:bg-indigo-50 transition ml-2 `}
                  >
                    +Genre
                  </button>
                </div>
              )}
              {showAddGenre && (
                <div className="flex items-center gap-2 p-2">
                  <input
                    type="text"
                    value={newGenre}
                    onChange={(e) => setNewGenre(e.target.value)}
                    placeholder="Add new genre"
                    className="
                                flex-1
                                w-full border rounded-lg p-2 border-border 
                                px-3 py-2 text-sm
                                text-text
                                placeholder-gray-400
                                focus:border-indigo-500
                                focus:ring-2 focus:ring-indigo-500/30
                                outline-none
                              "
                  />
                  {/* Add Genre button */}
                  <button
                    type="button"
                    className="
                                flex items-center justify-center
                                rounded-md
                                bg-primary px-3 py-2
                                text-sm font-semibold text-white
                                hover:bg-primary-hover
                                active:scale-95
                                transition
                              "
                    onClick={handleAddGenre}
                  >
                    +
                  </button>
                </div>
              )}
            </div>

            {/* Public year */}
            <input
              type="number"
              value={formData.publishedYear}
              onChange={(e) =>
                setFormData({ ...formData, publishedYear: e.target.value })
              }
              min="1900"
              max={new Date().getFullYear()}
              className="w-full border text-text rounded-lg p-2 border-indigo-300/70 "
              placeholder="Public year: e.g. 2008 "
              required
            />

            {/* Available */}
            <label className="flex items-center gap-2 text-sm text-primary">
              <input
                type="checkbox"
                checked={formData.available}
                onChange={(e) =>
                  setFormData({ ...formData, available: e.target.checked })
                }
                name="available"
                className="w-4 h-4 border border-indigo-300 rounded-lg text-indigo-600 focus:ring-0 "
              />
              Available
            </label>

            {/* Submit */}
            <button
              type="submit"
              className={`w-full py-2 rounded-lg text-white transition bg-primary hover:bg-primary-hover active:scale-95s
            `}
            >
              {isEdit ? "Update Book" : "Save Book"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
