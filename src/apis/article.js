import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from './firebase';
import { userStore } from '../store/user';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import Swal from 'sweetalert2';

export const uploadImage = async (fileData, refId) => {
  const storageRef = ref(storage, refId);
  await uploadBytes(storageRef, fileData);
  const imageUrl = await getDownloadURL(storageRef);
  return imageUrl;
};

export const uploadArticleData = async (data) => {
  const uid = userStore.state.user.uid;
  try {
    await addDoc(collection(db, 'article'), {
      ...data,
      uid,
      date: serverTimestamp(),
    });
    await Swal.fire('작성 완료!');
  } catch (error) {
    console.log(error);
    Swal.fire('알 수 없는 오류입니다');
  }
};
