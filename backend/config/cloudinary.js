import  {v2 as cloudinary} from 'cloudinary';
import fs from 'fs'
const uploadOnCloudinary=async(file)=>{
  try{
      cloudinary.config({ 
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
  api_key:process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,

});

/*responsible (cloudinary.uploader.upload)for uploading the file*/
const result=await cloudinary.uploader
.upload(file,{
    resource_type:'auto'    /*set to auto mean sit can upload video or images*/
})

// Delete local file after successful upload
if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }

return result.secure_url

  }catch(error){
console.log("Cloudinary upload error",error)
 // Ensure we attempt to delete file if it exists
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }

    throw error; // rethrow so caller knows it failed
  }

}
export default uploadOnCloudinary