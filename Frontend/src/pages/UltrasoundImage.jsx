import { useEffect, useRef, useState } from "react";
import upload from "../assets/upload.png";

const UltrasoundImage = () => {
  const inputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    console.log(prediction);
  }, [prediction]);

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Please choose an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:8801/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const result = await response.json();

      if (result.error) {
        setPrediction(result.error);
      } else {
        setPrediction(result.prediction);
      }
    } catch (error) {
      console.error("Error uploading the image:", error);
    }
  };

  return (
    <>
      <div className="p-4 flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <label
            htmlFor="image-upload-input"
            className="text-xl font-semibold mb-4 text-gray-700"
          >
            {image ? image.name : "Choose an image"}
          </label>

          <div
            onClick={handleImageClick}
            style={{ cursor: "pointer" }}
            className="relative w-full max-w-sm mb-4"
          >
            <div className="flex justify-center">
              <img
                src={imagePreview || upload} // Use the preview URL
                alt="Upload Preview"
                className="w-64 h-64 object-contain rounded-lg border-2 border-dashed border-gray-300"
              />
            </div>
            <input
              type="file"
              ref={inputRef}
              onChange={handleImageChange}
              style={{ display: "none" }}
              accept="image/*"
            />
          </div>

          <button
            className="bg-pink-800 text-white font-semibold py-2 px-6 rounded-lg hover:bg-pink-700 transition duration-200"
            onClick={handleUpload}
          >
            Generate Report
          </button>

          {/* Display Prediction Result */}
          {prediction && (
            <div className="mt-4 text-lg font-semibold text-gray-800">
              <p>Prediction: {prediction}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UltrasoundImage;
