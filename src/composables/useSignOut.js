import { ref } from "vue";
import { auth } from "../firebase/config";

const error = ref(null);
const isPending = ref(false);

const signOut = async () => {
  error.value = null;
  isPending.value = true;
  try {
    await auth.signOut();
  } catch (err) {
    console.log(err.message);
    error.value = err.message;
  } finally {
    isPending.value = false;
  }
};

const useSignOut = () => {
  return { signOut, isPending, error };
};

export default useSignOut;
