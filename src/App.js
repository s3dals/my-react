import { useState, useEffect } from 'react';
import { auth } from "./config/firebase";
import {
  onAuthStateChanged
} from "firebase/auth";

import PostsList from './components/PostsList';
import MainHeader from './components/MainHeader';

function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [loginIsVisible, seLoginIsVisible] = useState(false);

  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
        if (user) {
            setAuthUser(user);
            hideLoginHandler();
        } else {
            setAuthUser(null);
        }
    });
    // listen();
  }, []);

  function showModalHandler() {
    setModalIsVisible(true);
  }

  function hideModalHandler() {
    setModalIsVisible(false);
  }

  function showLoginHandler() {
    seLoginIsVisible(true);
  }
  function hideLoginHandler() {
    seLoginIsVisible(false);
  }
  return (
    <>
      <MainHeader onCreatePost={showModalHandler} onLogin={showLoginHandler} authUser={authUser} />
      <main>
        <PostsList
          isPosting={modalIsVisible}
          onStopPosting={hideModalHandler}
          isLogin={loginIsVisible}
          onStopLogin={hideLoginHandler}
          authUser={authUser}
        />
      </main>
    </>
  );
}

export default App;