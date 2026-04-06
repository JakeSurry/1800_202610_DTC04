export default async function uploadImage(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "FansFeast1");
  formData.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dit7odkob/image/upload",
    {
      method: "POST",
      body: formData,
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || "Failed to upload image");
  }
  return data.url;
}
