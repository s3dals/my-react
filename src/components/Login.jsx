import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import {
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

import classes from "./NewPost.module.css";

function Login({ onCancel, authUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("");
    } catch (err) {
      console.error(err);
      setMessage("Wrong email or password!");
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
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
    <>
      <form className={classes.form} onSubmit={submitHandler}>
        <p>
          <label htmlFor="name">Email</label>
          <input
            type="text"
            id="email"
            required
            placeholder="test@test.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </p>
        <p>
          <label htmlFor="name">Password</label>
          <input
            type="password"
            id="password"
            required
            placeholder="test123"
            onChange={(e) => setPassword(e.target.value)}
          />
        </p>
        <p>{message}</p>
        <p className={classes.actions}>
          <button onClick={signIn}>Sign in</button>
        </p>
      </form>
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
    </>
  );
}

export default Login;
