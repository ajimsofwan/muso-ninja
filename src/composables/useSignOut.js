import { ref } from "vue";
import { auth } from "../firebase/config";

const error = ref(null);

const signOut = async () => {
  error.value = null;
  try {
    await auth.signOut();
  } catch (err) {
    console.log(err.message);
    error.value = err.message;
  }
};

const useSignOut = () => {
  return { signOut, error };
};

export default useSignOut;
