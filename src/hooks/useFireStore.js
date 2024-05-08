import { useEffect, useState } from "react";
import { db } from "../firebase/config";

export const useFireStore = (collection, condition) => {
  const [document, setDocument] = useState([]);
  useEffect(() => {
    let collectionRef = db.collection(collection).orderBy("createdAt");

    if (condition) {
      if (!condition.valueCompare || !condition.valueCompare.length) {
        return;
      }
      collectionRef = collectionRef.where(
        condition.fieldName,
        condition.operator,
        condition.valueCompare
      );
    }
    // Listen for new documents in the collection
    const unsubscribe = collectionRef.onSnapshot((snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setDocument(documents);
    });

    return unsubscribe;
  }, [collection, condition]);

  return document;
};
