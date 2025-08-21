import React from 'react'
import { app } from '../../firebase'
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import {useDispatch} from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'

const OAuth = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

  const handleOauthClick = async () =>{
    try{    
        const auth = getAuth(app)
        const provider =new GoogleAuthProvider()

        const result = await signInWithPopup(auth , provider)

        const res = await fetch('/api/auth/google',{
            method:'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                name: result.user.displayName,
                email : result.user.email,
                photo : result.user.photoURL
            })
        })

        const data = await res.json()
        
        dispatch(signInSuccess(data))

        navigate('/')

        
    }catch(error){
        console.log("Unable to login through google" , error)
    }
  }
  return (
    <>
       <button onClick={handleOauthClick}
            type="button"
            className="w-full border border-gray-300 py-2 rounded-xl flex items-center justify-center hover:bg-gray-100 transition text-sm"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Continue with Google
          </button>
    </>
  )
}

export default OAuth