import { initializeApp } from 'firebase/app';
// Функція для підключення авторизації в проект
import { getAuth } from 'firebase/auth';
// Функція для підключення бази даних у проект
import { getFirestore } from 'firebase/firestore';
// Функція для підключення сховища файлів в проект
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCtURKs4hrO77-G6KIUvPBC2B9zY1S2D6A',
  authDomain: 'awesome-project-cb684.firebaseapp.com',
  databaseURL: 'https://awesome-project-cb684.firebaseio.com',
  projectId: 'awesome-project-cb684',
  storageBucket: 'awesome-project-cb684.appspot.com',
  messagingSenderId: '194576496659',
  appId: '1:194576496659:android:0ab5c4d2a084b1cff227e6',
  measurementId: 'G-measurement-id',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
