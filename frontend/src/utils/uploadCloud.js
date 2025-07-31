const upload_preset = import.meta.env.VITE_UPLOAD_PRESET;
const cloud_name = import.meta.env.VITE_CLOUD_NAME;

const uploadImageToCloudinary = async (file) => {
  const uploadData = new FormData();
  uploadData.append("file", file);
  uploadData.append("upload_preset", upload_preset);

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
      method: "POST",
      body: uploadData,
    });

    const data = await res.json();
    if (data.secure_url) {
      return { url: data.secure_url };
    } else {
      console.error("Upload failed:", data);
      return null;
    }
  } catch (err) {
    console.error("Error uploading image:", err);
    return null;
  }
};

export default uploadImageToCloudinary;
