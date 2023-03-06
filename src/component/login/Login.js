import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ENTRYPOINT } from '../../config.js';
import{useForm} from 'react-hook-form';
import jwt_decode from 'jwt-decode';
import { Link } from "react-router-dom";
import {FormUser} from '../formUser/FromUser.js';
import '../login/login.scss';
import { linkStyle } from '../../asset/linkstyle.js';
import { Error } from '../error/Error.js';
import { SelectGame } from '../selectGame/SelectGame.js';


export function Login(props){
    const [error, setError] = useState(false);
    const [load, setLoad] = useState(false);
    const {handleSubmit, register, formState :  {errors} } = useForm();
    const entrypoint = ENTRYPOINT;
    const navigate = useNavigate();
    const [userIdCreateUser, setUserIdCreateUser] = useState(0);
    if(props.userId){
        setUserIdCreateUser(props.userId);
    }

    const onSubmit = (data)=>{
        const event = new Event('submit');
        console.log('form', data.email)
        event.preventDefault();
        setLoad(true);
        let url = entrypoint + 'login';
        console.log(url)
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
                    navigate('/users');
                }
                else if (userId){
                    navigate('/selectGames/' + userId);
                }
                navigate('/graph/' + userId);
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
                    <Link style={linkStyle} to="/form-user" element={<FormUser/>}>Pas Inscrit Créer un compte</Link>
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
                    <button type="submit" className='glowing-btn'>
                                            <span className='glowing-txt'>S</span><span className='faulty-letter'>A</span><span className='glowing-txt'>VE</span>
                    </button>
                </form>
            </>:
        <Error setError={setError}/>
        }
        {userIdCreateUser !== 0 && !error && <SelectGame userId={userIdCreateUser} />}
        </div>
    )
}