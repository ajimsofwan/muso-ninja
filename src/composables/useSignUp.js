import { ref } from "vue";
import { auth } from "../firebase/config";

const error = ref(null);

const signUp = async (email, password, displayName) => {
  error.value = null;

  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    if (!res) {
      throw new Error("Could not complete the sign up");
    }
    await res.user.updateProfile({ displayName });
    error.value = null;

    return res;
  } catch (err) {
    console.log(err.message);
    error.value = err.message;
  }
};

const useSignUp = () => {
  return { signUp, error };
};

export default useSignUp;
