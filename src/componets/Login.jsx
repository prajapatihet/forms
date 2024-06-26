import React from 'react'
import '../App.css';
import { useState } from 'react';

export default function Login() {
    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')

    let handleSubmit = (event) => {
        event.preventDefault()
        console.log(username, password);
    }

    // let getUsername = (event) => {
    //   setUsername(event.target.value)
    // }

    return (
        <div className='App'>
            <div className='container'>
                <div className='row'>
                    <h1 >Log-In</h1>
                    <div className='col-lg-6'>
                        <form onSubmit={handleSubmit}>
                            <div className='text-start my-3'>
                                <label>Username: </label>
                                <input type='text' onChange={(event) => setUsername(event.target.value)} className='form-control' value={username} />
                            </div>
                            <div className='text-start my-3'>
                                <label>Password: </label>
                                <input type='password' onChange={(event) => setPassword(event.target.value)} className='form-control' value={password} />
                            </div>
                            <div className='text-start my-3'>
                                <button>Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
