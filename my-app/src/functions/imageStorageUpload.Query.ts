import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from "../firebase/firebase";
import { v4 } from 'uuid'
export const uploadImageToStorage = async (image: File | undefined) => {
  if (!image) return;
  const imageRef = ref(storage, `images/${image.name + v4()}}`)
  await uploadBytes(imageRef, image);
  const downloadUrl = await getDownloadURL(imageRef);
  console.log(downloadUrl)
  return downloadUrl
}