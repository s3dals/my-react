import { MdPostAdd, MdMessage , MdLogin} from 'react-icons/md';

import classes from './MainHeader.module.css';

function MainHeader({ onCreatePost, onLogin,  authUser }) {
  
  return (
    <header className={classes.header}>
      <h1 className={classes.logo}>
        <MdMessage />
        React Poster
      </h1>
      <p> {authUser?
        <button className={classes.button} onClick={onCreatePost}>
          <MdPostAdd size={18} />
          New Post
        </button>: null}
        &nbsp;&nbsp;
        
        <button className={classes.button} onClick={onLogin}>
        <MdLogin  size={18} />
        {authUser? <>Logout</> : <>Login!</>}
        </button>
         
      </p>
    </header>
  );
}

export default MainHeader;