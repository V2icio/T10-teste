import admin, { ServiceAccount } from 'firebase-admin';
import serviceAccount from './firebase.json';

admin.initializeApp({
  credential: admin.credential.cert(<ServiceAccount>serviceAccount),
});

const db = admin.firestore();
export default db;
