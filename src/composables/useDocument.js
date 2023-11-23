import { ref } from "vue";
import { firestore } from "../firebase/config";

const useDocument = (collection, id) => {
  const error = ref(null);
  const isPending = ref(false);

  const docRef = firestore.collection(collection).doc(id);

  const deleteDoc = async () => {
    isPending.value = true;
    error.value = null;

    try {
      const res = await docRef.delete();
      return res;
    } catch (err) {
      console.log(err.message);
      error.value = "Couldn't delete the document";
    }
  };

  return { deleteDoc, isPending, error };
};

export default useDocument;
