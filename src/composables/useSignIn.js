import { ref } from "vue";
import { auth } from "../firebase/config";

const error = ref(null);
const isPending = ref(false);

const signIn = async (email, password) => {
  error.value = null;
  isPending.value = true;

  try {
    const res = await auth.signInWithEmailAndPassword(email, password);
    if (!res) {
      throw new Error("");
    }
    return res;
  } catch (err) {
    console.log(err.message);
    error.value = "Incorrect login credentials.";
  } finally {
    isPending.value = false;
  }
};

const useSignIn = () => {
  return { signIn, isPending, error };
};

export default useSignIn;
