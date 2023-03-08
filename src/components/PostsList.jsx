import { useState, useEffect } from 'react';
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";

import Post from './Post';
import NewPost from './NewPost';
import Modal from './Modal';
import classes from './PostsList.module.css';
import Login from './Login';

function PostsList({ isPosting, onStopPosting, isLogin, onStopLogin, authUser}) {
  const [posts, setPosts] = useState([]);

  const postsCollectionRef = collection(db, "posts");

  const getPostsList = async () => {
    // console.log(Math.random());
    //Read the data
    // set the movie list equal to the data
    try {
      const data = await getDocs(postsCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // console.log(filteredData);
      setPosts(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPostsList();
  }, []);

  function addPostHandler(postData) {
    setPosts((existingPosts) => [postData, ...existingPosts]);
  }

  return (
    <>
      {isPosting && (
        <Modal onClose={onStopPosting}>
          <NewPost onCancel={onStopPosting} onAddPost={addPostHandler} />
        </Modal>
      )}
      {isLogin && (
        <Modal onClose={onStopLogin}>
          <Login onCancel={onStopLogin} authUser={authUser} />
        </Modal>
      )}
      {posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map((post) => (
            authUser? <Post key={post.body} id={post.id} author={post.author} body={post.body} email={post.email} refresh={getPostsList} />:null
          ))}
        </ul>
      )}
      {authUser?<>
      {posts.length === 0 && (
        <div style={{ textAlign: 'center', color: 'white' }}>
         <h2>There are no posts yet.</h2>
          <p>Start adding some!</p>
        </div>
      )}</> : <><h2>Please login!</h2></>}
    </>
  );
}

export default PostsList;