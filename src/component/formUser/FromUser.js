import React, { useEffect, useState} from 'react';
import{useForm} from 'react-hook-form';
import './formUser.scss'
import { ENTRYPOINT } from '../../config';
import { Error } from '../error/Error.js';
import { Load } from '../load/Load.js';
import { useNavigate } from 'react-router-dom';

export function FormUser() {
    //hook pour les input de formulaire
    const {handleSubmit, register, formState :  {errors} } = useForm();
    const entrypoint = ENTRYPOINT;
    //talbeau pour l'envoie des données
    const [formData, setFormData] = useState({});
    //verification que le formulaire est bien envoyé
    const [formSubmitted, setFormSubmitted] = useState(false); 
    //gestion du composant error
    const [error, setError] = useState(false);
    const [load, setLoad] = useState(false);
    //pour la redirection
    const navigate = useNavigate();
    const [userId, setUserId] = useState(0);

    const onSubmit = (data)=>{
        const event = new Event('submit');
        event.preventDefault();
        setFormData({
            email: data.email,
            roles: [
                "ROLE_USER"
              ],
            password: data.password,
            name: data.name,
            firstname: data.firstname,
        })
        setFormSubmitted(true);
    };
    
    useEffect(() =>{
        if(formSubmitted){
            setLoad(true);
            let url = entrypoint;
            url += 'api/users';
            fetch( url ,   {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then((response) => 
                response.json()
            )
            .then((data) => {
                setUserId(data.id);
                if(data.title){
                    setError(true);
                }
                setLoad(false);
            })
            .catch((error) => {
                setError(true);
            });
            setFormSubmitted(false);
        } 
    }, [formData]);

    useEffect(() =>{
        if(userId !== 0){
            //je sauvegarde l'url dans une variable pour l'utiliser dans la page login
            navigate('/',{
                state :{
                    previousUrl : '/create-account'
                }
            });
        }
    }
    ,[userId]);

        return (
            <>
            {load === true ?     
                <>
                    <Load/>
                </>
                :
                error === false ?
                    <>
                        <h1 className='text-align-center'>inscris toi</h1>
                        <div className='flex justify-content-center'>
                            <form  className = 'form-create-user'onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <label htmlFor="name">Saisi ton nom </label>
                                    <div className='container-input'>
                                        <input type="text" name="name" id="name" {...register("name", {required:true, minLength:2, pattern: /^(?!.*script\s)/})}/>
                                    </div>
                                    {errors.name && <p>*le nom doit contenir au moins 2 caractères</p>}
                                </div>
                                <div>
                                    <label htmlFor="firstname">Saisi ton prenom </label>
                                    <div className='container-input'>
                                        <input type="text" name="firstname" id="firstname" {...register("firstname", {required:true, minLength:2, pattern: /^(?!.*script\s)/})}/>
                                    </div>
                                    {errors.firstname && <p>*le prenom doit contenir au moins 2 caractères</p>}
                                </div>
                                <div>
                                    <label htmlFor ="email">Saisi ton mail </label>
                                    <div className='container-input'>
                                        <input type="email" name="email" id="email" {...register("email",{required:true, minLength:2, pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/})}/>
                                    </div>
                                    {errors.email && <p>*le mail n'est pas correct</p>}
                                </div>
                                <div>
                                    <label htmlFor ="password">Saisi ton mot de passe </label>
                                    <div className='container-input'>
                                        <input type="password" name="password" id="password" {...register("password", {required:true, 
                                                                                                                        minLength:6, 
                                                                                                                        max:24, 
                                                                                                                        pattern: /^(?!.*script\s)/
                                                                                                                    })}/>
                                    </div>
                                    {errors.password && <p>*le mot de passe doit contenir au moins 6 caractères et 24 caractères maximnum</p>}
                                </div>
                                <div>
                                    <button type="submit" className='glowing-btn'>
                                        <span className='glowing-txt'>S</span><span className='faulty-letter'>A</span><span className='glowing-txt'>VE</span>
                                    </button>
                                </div>
                        </form>
                    </div>
                </>
                :
                <>
                    <Error setError={setError}/>
                </>
       
            }

    </>
);
}