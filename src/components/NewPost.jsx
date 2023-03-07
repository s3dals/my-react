import { useState } from "react";
import { db, auth } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";

import classes from "./NewPost.module.css";

function NewPost({ onCancel, onAddPost }) {
  const [enteredBody, setEnteredBody] = useState("");
  const [enteredAuthor, setEnteredAuthor] = useState("");

  const postsCollectionRef = collection(db, "posts");

  function bodyChangeHandler(event) {
    setEnteredBody(event.target.value);
  }

  function authorChangeHandler(event) {
    setEnteredAuthor(event.target.value);
  }

  function submitHandler(event) {
    event.preventDefault();
    const postData = {
      body: enteredBody,
      author: enteredAuthor,
      email: auth?.currentUser?.email,
    };
    onSubmitPost();
    onAddPost(postData);
    onCancel();
  }

  const onSubmitPost = async () => {
    try {
      await addDoc(postsCollectionRef, {
        body: enteredBody,
        author: enteredAuthor,
        userID: auth?.currentUser?.uid,
        email: auth?.currentUser?.email,
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <p>
        <label htmlFor="name">Title</label>
        <input type="text" id="name" required onChange={authorChangeHandler} />
      </p>
      <p>
        <label htmlFor="body">Text</label>
        <textarea id="body" required rows={3} onChange={bodyChangeHandler} />
      </p>
      <p className={classes.actions}>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button>Submit</button>
      </p>
    </form>
  );
}

export default NewPost;
