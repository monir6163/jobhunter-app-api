import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//single image upload
const cloudinaryUpload = async (localFilePath, folderName) => {
  try {
    if (!localFilePath) return null;
    const result = await cloudinary.uploader.upload(localFilePath, {
      folder: folderName,
      resource_type: "auto",
    });
    fs.unlinkSync(localFilePath);
    return {
      public_id: result.public_id,
      url: result.secure_url,
    };
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

// Delete image from cloudinary
const deleteOnCloudinary = (publicId) => {
  return cloudinary.uploader.destroy(publicId);
};

//multiple image upload
const cloudinaryMultipleUpload = async (localFilePaths, folderName) => {
  try {
    if (!localFilePaths) return null;
    const result = await Promise.all(
      localFilePaths.map((file) =>
        cloudinary.uploader.upload(file, {
          folder: folderName,
          resource_type: "auto",
        })
      )
    );
    localFilePaths.forEach((file) => fs.unlinkSync(file));
    return result.map((res) => ({
      public_id: res.public_id,
      url: res.secure_url,
    }));
  } catch (error) {
    localFilePaths.forEach((file) => fs.unlinkSync(file));
    return null;
  }
};
export { cloudinaryMultipleUpload, cloudinaryUpload, deleteOnCloudinary };
