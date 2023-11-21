import { ref, watchEffect } from "vue";
import { firestore } from "../firebase/config";

const getDocument = (collection, id) => {
  const document = ref(null);
  const error = ref(null);

  const documentRef = firestore.collection(collection).doc(id);

  const unsub = documentRef.onSnapshot(
    (doc) => {
      if (doc.data()) {
        document.value = { ...doc.data(), id: doc.id };
        error.value = null;
      } else {
        error.value = "That data does not exist.";
      }
    },
    (err) => {
      console.log(err.message);
      error.value = "Clould not fetch data.";
    }
  );

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { document, error };
};

export default getDocument;
