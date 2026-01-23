import { useState } from "react";
export default function Create() {
  const [preview, setPreview] = useState("https://via.placeholder.com/200x300");
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
  // Handle add genre
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

  // Handle file input change for img
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create preview URL
    const imageUrl = URL.createObjectURL(file);
    console.log(imageUrl);

    setPreview(imageUrl);
  };

  return (
    <div className="max-w-4xl mx-auto p-5 md:p-10 shadow-primary bg-white rounded-lg shadow md:mt-10 mt-5">
      <form>
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
              className="
                        block w-[80%] text-sm mt-3 text-gray-700
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-lg file:border-0
                        file:text-sm file:font-medium
                        file:bg-indigo-50 file:text-indigo-700
                        hover:file:bg-indigo-100
                        border border-indigo-300/70 rounded-lg
                        cursor-pointer
                      "
              onChange={handleFileChange}
            />
          </div>
          <div className=" space-y-2">
            {/* Title */}
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full border rounded-lg p-2 border-indigo-300/70 "
              placeholder="Book Title"
            />
            {/* Author */}
            <input
              type="text"
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full border rounded-lg p-2 border-indigo-300/70 "
              placeholder="Author Name"
            />
            {/* Description */}
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full border rounded-lg p-2 border-indigo-300/70 "
              placeholder="Book Description"
              rows="4"
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
                        className="w-4 h-4 border border-indigo-300 rounded-lg text-indigo-600 focus:ring-0"
                      />
                      {g}
                    </label>
                  ))}
                  <button
                    type="button"
                    onClick={() => setShowAddGenre(!showAddGenre)}
                    className={`px-2 py-1 border border-indigo-300/70 rounded-lg text-xs text-indigo-600 hover:bg-indigo-50 transition ml-2 `}
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
                                w-full border rounded-lg p-2 border-indigo-300/70 
                                px-3 py-2 text-sm
                                text-gray-700
                                placeholder-gray-400
                                focus:border-indigo-500
                                focus:ring-2 focus:ring-indigo-500/30
                                outline-none
                              "
                  />

                  <button
                    type="button"
                    className="
                                flex items-center justify-center
                                rounded-md
                                bg-indigo-600 px-3 py-2
                                text-sm font-semibold text-white
                                hover:bg-indigo-700
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
              min="1900"
              max={new Date().getFullYear()}
              className="w-full border rounded-lg p-2 border-indigo-300/70 "
              placeholder="Public year: e.g. 2008 "
            />

            {/* Available */}
            <label className="flex items-center gap-2 text-sm text-primary">
              <input
                type="checkbox"
                name="available"
                className="w-4 h-4 border border-indigo-300 rounded-lg text-indigo-600 focus:ring-0 "
              />
              Available
            </label>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
            >
              Save Book
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
