import { useDispatch , useSelector} from 'react-redux';
import {
    app
} from '../../firebase.js';
import style from '../../styles/component.module.css';

import {
    GoogleAuthProvider,
    getAuth,signInWithPopup
} from '@firebase/auth'

import { signInSuccess , signInStart} from '../../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';



const OAuth = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {loading} = useSelector((state)=> state.user)

    const handleGoogleAuth = async() => {
        dispatch(signInStart())
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
    
        const result =  await signInWithPopup(auth, provider);
        const res = await fetch('/api/auth/google-auth',{
            method:'POST',
            headers:{
              'content-type':'application/json',
            },
            body:JSON.stringify({name : result.user.email, email: result.user.displayName,  photo: result.user.photoURL})
          });
          const data = await res.json();
          console.log(data);
          dispatch(signInSuccess(data))
          navigate('/')

    
        } catch (error) {
            console.log(error);
        }
    }
    return ( 
        <button disabled={loading}
    onClick={handleGoogleAuth} 
    type='button' 
    style={{ backgroundColor: "cadetblue" }} 
    className={style.obutton}
>{loading ? "loading..." : "Continue with Google"}
</button>
    )
}

export default OAuth