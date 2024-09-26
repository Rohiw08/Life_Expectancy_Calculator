// import { 
//     createUserWithEmailAndPassword, 
//     signInWithEmailAndPassword, 
//     signOut,
//     GoogleAuthProvider,
//     signInWithPopup
//   } from 'firebase/auth';
//   import { auth } from './firebaseConfig';
  
//   export const registerUser = async (email, password) => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       return userCredential.user;
//     } catch (error) {
//       throw error;
//     }
//   };
  
//   export const loginUser = async (email, password) => {
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       return userCredential.user;
//     } catch (error) {
//       throw error;
//     }
//   };
  
//   export const logoutUser = async () => {
//     try {
//       await signOut(auth);
//     } catch (error) {
//       throw error;
//     }
//   };
  
//   export const signInWithGoogle = async () => {
//     const provider = new GoogleAuthProvider();
//     try {
//       const result = await signInWithPopup(auth, provider);
//       return result.user;
//     } catch (error) {
//       throw error;
//     }
//   };