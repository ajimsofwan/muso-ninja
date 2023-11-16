import { ref } from "vue";
import { auth } from "../firebase/config";

const error = ref(null);
const isPending = ref(false);

const signUp = async (email, password, displayName) => {
  error.value = null;
  isPending.value = true;

  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    if (!res) {
      throw new Error("Could not complete the sign up");
    }
    error.value = null;

    await res.user.updateProfile({ displayName });

    return res;
  } catch (err) {
    console.log(err.message);
    error.value = err.message;
  } finally {
    isPending.value = false;
  }
};

const useSignUp = () => {
  return { signUp, isPending, error };
};

export default useSignUp;
