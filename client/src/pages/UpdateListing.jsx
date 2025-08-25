import { useState, useRef,useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_FOLDER = "real-estate/listings";

export default function UpdateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const params = useParams();


  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      const res = await fetch(`/api/listing/get/${listingId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };

    fetchListing();
  }, []);

  const storeImage = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", UPLOAD_PRESET);
    if (CLOUDINARY_FOLDER) data.append("folder", CLOUDINARY_FOLDER);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: "POST", body: data }
    );

    const json = await res.json();
    if (!res.ok) throw new Error(json?.error?.message || "Cloudinary upload failed");
    return json.secure_url;
  };

  const handleImageSubmit = async () => {
    try {
      const fileArray = Array.isArray(files) ? files : Array.from(files || []);

      if (fileArray.length === 0) {
        setImageUploadError("Please select at least one image");
        return;
      }

      if (fileArray.length + formData.imageUrls.length > 6) {
        setImageUploadError("You can only upload 6 images per listing");
        return;
      }

      for (const f of fileArray) {
        if (f.size > 2 * 1024 * 1024) {
          setImageUploadError("Each image must be ≤ 2 MB");
          return;
        }
      }

      setImageUploadError(false);
      setUploading(true);

      const urls = await Promise.all(fileArray.map((f) => storeImage(f)));

      setFormData((prev) => ({ ...prev, imageUrls: prev.imageUrls.concat(urls) }));

      if (fileInputRef.current) fileInputRef.current.value = "";
      setFiles([]);
    } catch (err) {
      setImageUploadError(err.message || "Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index),
    }));
  };

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({ ...formData, type: e.target.id });
      return;
    }

    if (["parking", "furnished", "offer"].includes(e.target.id)) {
      setFormData({ ...formData, [e.target.id]: e.target.checked });
      return;
    }

    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1) return setError("You must upload at least one image");
      if (+formData.regularPrice < +formData.discountPrice) return setError("Discount must be lower than regular");

      setLoading(true);
      const res = await fetch(`/api/listing/update/${params.listingId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, userRef: currentUser._id }),
      });

      const data = await res.json();
      setLoading(false);
      if (data.success === false) return setError(data.message);

      navigate(`/listing/${data._id}`);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="w-1/3 bg-white shadow-lg flex flex-col items-center justify-center p-6">
        <img
          src={currentUser?.avatar}
          alt="profile"
          className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow-md"
        />
        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          {currentUser?.username}
        </h2>
        <p className="text-gray-500">{currentUser?.email}</p>

        <p className="mt-6 text-gray-600 text-center">
          Fill in the details to Update Your property listing.
        </p>
      </div>

      <div className="flex-1 mt-12 p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Update a Listing</h1>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            id="name"
            maxLength="62"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.name}
          />

          <textarea
            placeholder="Description"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />

          <input
            type="text"
            placeholder="Address"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
          />

          {/* Options */}
          <div className="flex flex-wrap gap-6">
            {["sale", "rent", "parking", "furnished", "offer"].map((opt) => (
              <label key={opt} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={opt}
                  className="w-5 h-5"
                  onChange={handleChange}
                  checked={
                    opt === "sale"
                      ? formData.type === "sale"
                      : opt === "rent"
                      ? formData.type === "rent"
                      : formData[opt]
                  }
                />
                <span className="capitalize">{opt}</span>
              </label>
            ))}
          </div>

         {/* Bedrooms */}
<div className="flex flex-col">
  <label htmlFor="bedrooms" className="font-medium text-gray-700 mb-1">
    Bedrooms
  </label>
  <input
    type="number"
    id="bedrooms"
    min="1"
    max="10"
    required
    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
    onChange={handleChange}
    value={formData.bedrooms}
  />
</div>

{/* Bathrooms */}
<div className="flex flex-col">
  <label htmlFor="bathrooms" className="font-medium text-gray-700 mb-1">
    Bathrooms
  </label>
  <input
    type="number"
    id="bathrooms"
    min="1"
    max="10"
    required
    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
    onChange={handleChange}
    value={formData.bathrooms}
  />
</div>

{/* Regular Price */}
<div className="flex flex-col">
  <label htmlFor="regularPrice" className="font-medium text-gray-700 mb-1">
    Regular Price
  </label>
  <input
    type="number"
    id="regularPrice"
    min="50"
    max="10000000"
    required
    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
    onChange={handleChange}
    value={formData.regularPrice}
  />
</div>

{/* Discount Price (only if offer true) */}
{formData.offer && (
  <div className="flex flex-col">
    <label htmlFor="discountPrice" className="font-medium text-gray-700 mb-1">
      Discount Price
    </label>
    <input
      type="number"
      id="discountPrice"
      min="0"
      max="10000000"
      required
      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
      onChange={handleChange}
      value={formData.discountPrice}
    />
  </div>
)}


          {/* Image Upload */}
          <div>
            <p className="font-semibold text-gray-700 mb-2">
              Images: <span className="text-sm text-gray-500">max 6 (first will be cover)</span>
            </p>
            <div className="flex gap-4">
              <input
                onChange={(e) => setFiles(e.target.files)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                type="file"
                id="images"
                accept="image/*"
                multiple
              />
              <button
                type="button"
                disabled={uploading}
                onClick={handleImageSubmit}
                className="px-4 py-2 bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition disabled:opacity-70"
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
            {imageUploadError && <p className="text-red-600 mt-2">{imageUploadError}</p>}
          </div>

          {/* Uploaded Images */}
          {formData.imageUrls.length > 0 && (
            <div className="space-y-2">
              {formData.imageUrls.map((url, index) => (
                <div key={url} className="flex justify-between items-center border rounded-lg p-2">
                  <img src={url} alt="listing" className="w-20 h-20 object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Submit */}
          <button
            disabled={loading || uploading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-70 shadow-md"
          >
            {loading ? "Updating..." : "Update Listing"}
          </button>

          {error && <p className="text-red-600 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
}
