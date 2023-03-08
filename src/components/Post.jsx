import classes from "./Post.module.css";
import { MdOutlineCancel } from "react-icons/md";
import { deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db, auth } from "../config/firebase";


function Post({ id, author, body, email , refresh}) {
  const deletePost = async (id) => {
    try {
      const postDoc = doc(db, "posts", id);
      await deleteDoc(postDoc);
      refresh();
    } catch (err) {
      console.error(err);
    }
  };

  const checkUser = (email) => {
    var emailOK = false; 
    if(auth?.currentUser?.email === email) {
      emailOK = true;
    } else {
      emailOK = false;
    }
    return(emailOK);
  };

  return (
    <li className={classes.post}>
    {checkUser(email)?  <>
      <p className={classes.delete} onClick={() => deletePost(id)}>
        <MdOutlineCancel size={17} />
      </p> </>: null}
      <p className={classes.author}>{author}</p>
      <p className={classes.text}>{body}</p>
      {/* <p className={classes.stext}>User: {email}</p> */}
    </li>
  );
}

export default Post;
