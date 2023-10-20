import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from './firebase';
import { userStore } from '../store/user';
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import Swal from 'sweetalert2';
import { articlesStore } from '../store/article';
import { sliceContent } from '../utils/common';

export const uploadImage = async (fileData, refId) => {
  const storageRef = ref(storage, refId);
  await uploadBytes(storageRef, fileData);
  const imageUrl = await getDownloadURL(storageRef);
  return imageUrl;
};

export const uploadArticleData = async (data) => {
  const uid = userStore.state.user.uid;
  const userName = userStore.state.user.displayName;
  try {
    await addDoc(collection(db, 'article'), {
      ...data,
      uid,
      userName,
      date: serverTimestamp(),
    });
    await Swal.fire('작성 완료!');
  } catch (error) {
    console.log(error);
    Swal.fire('알 수 없는 오류입니다');
  }
};

const convertResponseToArray = (response) => {
  const responseArray = [];
  response.forEach((doc) => {
    const articles = doc.data();
    responseArray.push({
      title: articles.title,
      date: articles.date,
      imageUrl: articles.imageUrl,
      uid: articles.uid,
      id: doc.id,
      content: articles.content,
      userName: articles.userName,
    });
  });
  return responseArray;
};

export const getArticles = async () => {
  const getArticlesQuery = query(collection(db, 'article'));
  const response = await getDocs(getArticlesQuery);
  const articlesArray = convertResponseToArray(response);
  sliceContent(articlesArray, 0, 70);
  articlesStore.state.articles = articlesArray;
};
