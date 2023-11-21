import { ref } from "vue";
import { firestore } from "../firebase/config";

const useCollection = (collection) => {
  const error = ref(null);
  const isPending = ref(false);

  const addDoc = async (doc) => {
    error.value = null;
    isPending.value = true;

    try {
      const res = await firestore.collection(collection).add(doc);
      return res;
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
    } finally {
      isPending.value = false;
    }
  };
  return { addDoc, isPending, error };
};

export default useCollection;
