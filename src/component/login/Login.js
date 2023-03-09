import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ENTRYPOINT } from '../../config.js';
import{useForm} from 'react-hook-form';
import jwt_decode from 'jwt-decode';
import { Link } from "react-router-dom";
import {FormUser} from '../formUser/FromUser.js';
import '../login/login.scss';
import { linkStyle } from '../../asset/linkstyle.js';
import { Error } from '../error/Error.js';


export function Login(){
    const [error, setError] = useState(false);
    const [load, setLoad] = useState(false);
    const {handleSubmit, register, formState :  {errors} } = useForm();
    const entrypoint = ENTRYPOINT;
    const navigate = useNavigate();
    const location = useLocation();

    const onSubmit = (data)=>{
        const event = new Event('submit');
        event.preventDefault();
        setLoad(true);
        let url = entrypoint + 'login';
        fetch( url ,   {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password,
            })  
        })
        .then((response) =>
            response.json()
        )
        .then((response) => {
            if(!response.token){
                setError(true);
            }else if (response.token){
                const decoded = jwt_decode(response.token);
                localStorage.setItem('token', response.token);
                const userId = decoded.id;
                if(decoded.roles[0] === 'ROLE_ADMIN'){
                    navigate('/user-management');
                }
                else if(location.state !== null){
                    if(userId && location.state.previousUrl === '/create-account'){
                        navigate('/select-game/' + userId);
                    }
                } 
                else{
                    navigate('/graph/' + userId);
                }  
            }
            setLoad(false);
        })
        .catch((error) => {
            setError(true);
        });
    };


    return( 
        <div>
        {!error ?
            <>
                <h1 className='text-align-center'>Connecte toi</h1>
                <div className='text-align-center'>
                    <Link style={linkStyle} to="/create-account" element={<FormUser/>}>Pas Inscrit Créer un compte</Link>
                </div>
                <form className = 'form-create-user' onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <div className='container-input'>
                            <input type="email" className="form-control" id="email" placeholder="Enter email" {...register("email", {required:true, minLength:2, pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/})}/>
                        </div>
                        {errors.email && <p>*le mail n'est pas correct</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className='container-input'>
                            <input type="password" className="form-control" id="password" placeholder="Password" {...register("password", {required:true, minLength:6, pattern: /^(?!.*script\s)/})}/>
                        </div>
                        {errors.password && <p>*le mot de passe doit contenir au moins 6 caractères</p>}
                    </div>
                    <button data-testid="submit" type="submit" className='glowing-btn'>
                                            <span className='glowing-txt'>S</span><span className='faulty-letter'>A</span><span className='glowing-txt'>VE</span>
                    </button>
                </form>
            </>:
        <Error setError={setError}/>
        }
        </div>
    )
}