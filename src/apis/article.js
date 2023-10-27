import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { db, storage } from './firebase';
import { userStore } from '../store/user';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore';
import Swal from 'sweetalert2';
import { articlesStore } from '../store/article';
import { sliceContent } from '../utils/common';
import {
  ARTICLE_COLLECTION,
  DATE_FIELD,
  MAX_CONTENT_LENGTH,
  START_INDEX,
} from '../constants/article';

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
    await addDoc(collection(db, ARTICLE_COLLECTION), {
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
  const getArticlesQuery = query(
    collection(db, ARTICLE_COLLECTION),
    orderBy(DATE_FIELD, 'desc'),
  );
  const response = await getDocs(getArticlesQuery);
  const articlesArray = convertResponseToArray(response);
  sliceContent(articlesArray, START_INDEX, MAX_CONTENT_LENGTH);
  articlesStore.state.articles = articlesArray;
};

export const getUserArticles = async (uid) => {
  if (!uid) return;
  const getUserArticlesQuery = query(
    collection(db, ARTICLE_COLLECTION),
    where('uid', '==', uid),
  );
  const response = await getDocs(getUserArticlesQuery);
  const userArticlesArray = convertResponseToArray(response);
  sliceContent(userArticlesArray, START_INDEX, MAX_CONTENT_LENGTH);
  articlesStore.state.userArticles = userArticlesArray;
};

export const getArticle = async (id) => {
  if (!id) return;
  const getArticleRef = doc(db, ARTICLE_COLLECTION, id);
  const response = await getDoc(getArticleRef);
  articlesStore.state.article = { ...response.data(), id };
};

export const deleteArticle = async (id, imageUrl) => {
  if (imageUrl) deleteObject(ref(storage, imageUrl));
  await deleteDoc(doc(db, ARTICLE_COLLECTION, id));
};
