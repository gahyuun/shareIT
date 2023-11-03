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
  limit,
  orderBy,
  query,
  serverTimestamp,
  startAfter,
  updateDoc,
  where,
} from 'firebase/firestore';
import Swal from 'sweetalert2';
import {
  ARTICLE_COLLECTION,
  DATE_FIELD,
  MAX_ARTICLES_LENGTH,
  MAX_USER_ARTICLES_LENGTH,
} from '../constants/article';

let lastVisibleArticles = '';
let lastVisibleUserArticles = '';
const getLastVisibleDoc = (response) => {
  return response.docs[response.docs.length - 1];
};

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
    limit(MAX_ARTICLES_LENGTH),
  );
  const response = await getDocs(getArticlesQuery);
  lastVisibleArticles = getLastVisibleDoc(response);
  return convertResponseToArray(response);
};

export const getNextArticles = async () => {
  if (!lastVisibleArticles) return;
  const getNextArticlesQuery = query(
    collection(db, ARTICLE_COLLECTION),
    orderBy(DATE_FIELD, 'desc'),
    startAfter(lastVisibleArticles),
    limit(MAX_ARTICLES_LENGTH),
  );
  const response = await getDocs(getNextArticlesQuery);
  lastVisibleArticles = getLastVisibleDoc(response);
  return convertResponseToArray(response);
};

export const getUserArticles = async (uid) => {
  if (!uid) return;
  const getUserArticlesQuery = query(
    collection(db, ARTICLE_COLLECTION),
    where('uid', '==', uid),
    limit(MAX_USER_ARTICLES_LENGTH),
    orderBy(DATE_FIELD, 'desc'),
  );
  const response = await getDocs(getUserArticlesQuery);
  lastVisibleUserArticles = getLastVisibleDoc(response);
  return convertResponseToArray(response);
};

export const getNextUserArticles = async (uid) => {
  if (!uid) return;
  if (!lastVisibleUserArticles) return;
  const getNextUserArticlesQuery = query(
    collection(db, ARTICLE_COLLECTION),
    where('uid', '==', uid),
    orderBy(DATE_FIELD, 'desc'),
    startAfter(lastVisibleUserArticles),
    limit(MAX_USER_ARTICLES_LENGTH),
  );
  const response = await getDocs(getNextUserArticlesQuery);
  lastVisibleUserArticles = getLastVisibleDoc(response);
  return convertResponseToArray(response);
};

export const getArticle = async (id) => {
  if (!id) return;
  const getArticleRef = doc(db, ARTICLE_COLLECTION, id);
  const response = await getDoc(getArticleRef);
  return { ...response.data(), id };
};

export const deleteArticle = async (id, imageUrl) => {
  if (imageUrl) deleteObject(ref(storage, imageUrl));
  await deleteDoc(doc(db, ARTICLE_COLLECTION, id));
};

export const deleteImage = (imageUrl) => {
  deleteObject(ref(storage, imageUrl));
};

export const setArticleData = async (data, id) => {
  await updateDoc(doc(db, ARTICLE_COLLECTION, id), {
    ...data,
  });
};
