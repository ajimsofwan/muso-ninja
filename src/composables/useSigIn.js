import { ref } from "vue";
import { auth } from "../firebase/config";

const error = ref(null);

const signIn = async (email, password) => {
  error.value = null;

  try {
    const res = await auth.signInWithEmailAndPassword(email, password);
    if (!res) {
      throw new Error("");
    }
    return res;
  } catch (err) {
    console.log(err.message);
    error.value = "Incorrect login credentials.";
  }
};

const useSignIn = () => {
  return { signIn, error };
};

export default useSignIn;
