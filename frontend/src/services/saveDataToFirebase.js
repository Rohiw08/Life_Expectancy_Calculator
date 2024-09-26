import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const saveToFirebase = async (data) => {
    try {
      const db = getFirestore();
      const auth = getAuth();
      const user = auth.currentUser;
  
      if (!user) {
        console.error("No user is signed in");
        return;
      }
  
      const docRef = await addDoc(collection(db, "userPersonalInfo"), {
        userId: user.uid,
        ...data,
        createdAt: new Date(),
      });
  
      console.log("Document written with ID: ", docRef.id);
      return docRef.id;
    } catch (error) {
      console.error("Error adding document: ", error);
      throw error;
    }
  };

  export { saveToFirebase };