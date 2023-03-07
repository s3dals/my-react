import { auth, googleProvider } from "../config/firebase";
import { signInWithPopup, signOut } from "firebase/auth";

import classes from "./NewPost.module.css";

function Login({ onCancel, authUser }) {
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.err(err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.err(err);
    }
  };

  function submitHandler(event) {
    event.preventDefault();
  }
  if (authUser) {
    logout();
    onCancel();
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <p className={classes.actions}>
        <button onClick={signInWithGoogle}>Sign in with Google!</button>
      </p>

      <p className={classes.actions}>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        
      </p>
    </form>
  );
}

export default Login;
