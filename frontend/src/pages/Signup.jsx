/* eslint-disable react/prop-types */
import { Link, useNavigate } from 'react-router-dom';
import style from '../styles/auth.module.css';
import { useState } from 'react';
import OAuth from '../components/util/Oauth';

const Signup = ({title="Property Ease"}) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  const handleSubmit= async (e)=>{
    e.preventDefault();
    try{
      setIsLoading(true)
      const res = await fetch('/api/auth/sign-up',{
        method:'POST',
        headers:{
          'content-type':'application/json',
        },
        body:JSON.stringify({username,email,password})
      });
      console.log('Response status:', res.status);
    const data = await res.json();
    console.log('Response data:', data);
      console.log(data);
      setIsLoading(false);
      setError(null);
      navigate('/sign-in')
    }catch(err){
      setIsLoading(false)
      console.log(err);
      setError(err.message)
    }


    
  

  }
  return (
    <div className={style.signupContainer}>
    <h1>{title}</h1>
    <form onSubmit={handleSubmit}>
      <input type='text' value={username} placeholder='username' id='username' onChange={(e)=> setUsername(e.target.value)}/>
      <input type='text' placeholder='email' value={email}  id='email' onChange={(e)=> setEmail(e.target.value)}/>
      <input type='text' placeholder='password' value={password}  id='password' onChange={(e)=> setPassword(e.target.value)}/>

      <button disabled={isLoading} type='submit'>{isLoading ? "loading..." :"sign-up"}</button><OAuth/>
    </form>
    {error && <p className={style.error}>{error}</p>}
    <div>
      <p>Already registered. <Link to='/sign-in'>sign In</Link></p>
    </div></div>
  )
}

export default Signup