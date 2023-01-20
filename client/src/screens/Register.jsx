import React from 'react'
import { useState } from 'react'

function Register() {

  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [age,setAge] = useState('')
  const [role,setRole] = useState('')
  

  return (
    <div className='flex flex-column justify-center align-items-center text-center p-1 border-solid-black-1 width-max-300 mt-5 m-center border-radius-12'>
        <p className='fontSize-18 text-bold'>Register Form</p>
        <div>
            <div className='mt-1 flex flex-column'>
                <label htmlFor=''>Name</label>
                <input type="text" placeholder="Your Name" value={name} onChange={(e)=> setName(e.target.value)}/>
            </div>
            <div className='mt-1 flex flex-column'>
                <label htmlFor=''>Email</label>
                <input type="email" placeholder="Your Email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
            </div>
            <div className='mt-1 flex flex-column'>
                <label htmlFor=''>Password</label>
                <input type="password" placeholder="Your Password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
            </div>
            <div className='mt-1 flex flex-column'>
                <label htmlFor=''>Age</label>
                <input type="text" placeholder="Your Age" value={age} onChange={(e)=> setAge(e.target.value)}/>
            </div>
            <div className='mt-1 flex flex-column'>
                <label htmlFor=''>Role</label>
                <input type="text" placeholder="Your Role" value={role} onChange={(e)=> setRole(e.target.value)}/>
            </div>
            <button className='mt-1 pl-0-75 pr-0-75 pt-0-125 pb-0-125'>Register</button>
        </div>
        
    </div>
  )
}

export default Register