/* eslint-disable react/prop-types */
import { Link, useNavigate } from 'react-router-dom';
import style from '../styles/auth.module.css';
import { useState } from 'react';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';
import {useDispatch, useSelector} from 'react-redux'
import OAuth from '../components/util/Oauth';


const Signin = ({title="Property Ease"}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {loading, error} = useSelector((state)=> state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit= async (e)=>{
    e.preventDefault();
    try{
      dispatch(signInStart());
      const res = await fetch('/api/auth/sign-in',{
        method:'POST',
        headers:{
          'content-type':'application/json',
        },
        body:JSON.stringify({email,password})
      });
      const data = await res.json();
      dispatch(signInSuccess(data))
      navigate('/')
    }catch(err){
      console.log(err);
      dispatch(signInFailure(err.message))
    }

    

  }
  return (
    <div className={style.signinContainer}>
    <h1>{title}</h1>
    <form onSubmit={handleSubmit}> 
    <input type='text' placeholder='email' value={email}  id='email' onChange={(e)=> setEmail(e.target.value)}/>
      <input type='text' placeholder='password' value={password}  id='password' onChange={(e)=> setPassword(e.target.value)}/>

      <button disabled={loading} type='submit'>{loading ? "loading..." :"sign-in"}</button>
      <OAuth/>
    </form>
    {error && <p>{error}</p>}
    <div>
      <p>Not registered yet <Link to='/sign-up'>sign up</Link></p>
    </div></div>
  )
}

export default Signin