import './Login.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Wrapper from '../Wrapper/Wrapper'
import { useState } from 'react'
import Axios from 'axios'

export default function Login(){

    const [classNames , setClassName] = useState(['','','','']);
    const [isLoading , setIsLoading] = useState('Login');


    const [input , setInput ] = useState(
        {
            email:'',
            password:'',
        }
    );


    function handleSubmit(){
        setIsLoading('');
    }

    function handleChange({target :{ name , value}}){
        setInput(prevValue => ({...prevValue,[name]:value}))
    }

    return (
        <Wrapper>
            <div className="flex-col borders" style={{gap:"2rem"}}>
                <h1 className='fs-800 title fc-white extrabold'>{">Login"}</h1>
                <div className='login flex-col'>
                    <div className="form-floating">
                        <input 
                            type="email" 
                            id='floatingName' 
                            onChange={handleChange} 
                            className={`form-control inputFeilds ${classNames[0]}`} 
                            placeholder="Email"
                            name='email'
                            value={input.email}
                        />
                        <label htmlFor="floatingName">Email</label>
                    </div>
                    <div className="form-floating">
                        <input 
                            type="password" 
                            id='floatingInput' 
                            onChange={handleChange} 
                            className={`form-control inputFeilds ${classNames[1]}`} 
                            placeholder="Password"
                            name='password'
                            value={input.password}
                        />
                        <label htmlFor="floatingInput">Password</label>
                    </div>
                    <div className="link">
						Don't have an account? <Link to="/PromptBattle/Register">Register</Link>
					</div>
                    <button className='button fs-50 extrabold fc-white' onClick={handleSubmit}>
                        {isLoading === "" ? 
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 
                        :isLoading}
                    </button>
                </div>
            </div>
        </Wrapper>
    )
}