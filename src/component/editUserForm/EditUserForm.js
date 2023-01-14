import React, { useEffect, useState} from 'react';
import{useForm} from 'react-hook-form';
import '../formUser/formUser.scss'
import { ENTRYPOINT } from '../../config';
import { Error } from '../error/Error.js';
import { Load } from '../load/Load.js';

export function EditUserForm(props) {
    console.log('je suis dans le form')
    //hook pour les input de fomrulaire
    const {handleSubmit, register, formState :  {errors}, setValue } = useForm();
    const entrypoint = ENTRYPOINT;
    //talbeau pour l'envoie des données
    const [formData, setFormData] = useState({});
    //verification que le formulaire est bien envoyé
    const [formSubmitted, setFormSubmitted] = useState(false); 
    //gestion du composant error
    const [error, setError] = useState(false);
    const [load, setLoad] = useState(false);
    const [userData, setUserData] = useState([]);
    const idUser = props.idUser;

    const onSubmit = (data)=>{
        setFormData({
            email: data.email,
            roles: [
                data.roles
              ],
            password: data.password,
            name: data.name,
            firstname: data.firstname,
        })
        setFormSubmitted(true);
    };
    console.log('coucouc')
    console.log(formData)
    useEffect(() =>{
            let url = entrypoint;
            url += 'api/users/'+idUser;
            fetch( url ,   {
                method: 'GET',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            })
            .then((response) => 
                response.json()
            )
            .then((user) => {
                setUserData(user);
                //le hook form gere pour moi le remplissage des input le setValue est la pour lui donné les valeur que je veux dans mes input
                setValue("name", user.name);
                setValue("firstname", user.firstname);
                setValue("email", user.email);
            })
            .catch((error) => {
                setError(true);

            });
    }, []);

    useEffect(() =>{
        if(formSubmitted){
            setLoad(true);
            let url = entrypoint;
            url += 'api/users/' + idUser;
            fetch( url ,   {
                method: 'PATCH',
                headers: {
                'Accept': 'application/ld+json',
                'Content-Type': 'application/merge-patch+json'
                },
                body: JSON.stringify(formData)
            })
            setFormSubmitted(false);
        } 
    }, [formData]);

        return (
            <>
            {load === true ?     
                <>
                    <Load/>
                </>
                :
                error === false ?
                    <>
                        <h1 className='text-align-center'>Modifier l'utilisateur</h1>
                        <div className='flex justify-content-center'>
                            <form  className = 'form-create-user'onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <label htmlFor="name">modifier nom </label>
                                    <div className='container-input'>
                                        <input  onChange={e => setUserData({...userData, name: e.target.value})} type="text" id="name" {...register("name", {required:true, minLength:2, pattern: /^(?!.*script\s)/})}/>
                                    </div>
                                    {errors.name && <p>*le nom doit contenir au moins 2 caractères</p>}
                                </div>
                                <div>
                                    <label htmlFor="firstname">modifier prenom </label>
                                    <div className='container-input'>
                                        <input onChange={e => setUserData({...userData, firstname: e.target.value})} type="text" id="firstname" {...register("firstname", {required:true, minLength:2, pattern: /^(?!.*script\s)/})}/>
                                    </div>
                                    {errors.firstname && <p>*le prenom doit contenir au moins 2 caractères</p>}
                                </div>
                                <div>
                                    <label htmlFor ="email">modifier mail </label>
                                    <div className='container-input'>
                                        <input onChange={e => setUserData({...userData, email: e.target.value})} type="email" id="email" {...register("email",{required:true, minLength:2, pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/})}/>
                                    </div>
                                    {errors.email && <p>*le mail n'est pas correct</p>}
                                </div>
                                {/* <div>
                                    <label htmlFor ="password">modifier mot de passe</label>
                                    <div className='container-input'>
                                        <input type="password" name="password" id="password" onChange={e => setUserData({...userData, password: e.target.value})} {...register("password", {required:true, 
                                                                                                                        minLength:6, 
                                                                                                                        max:24, 
                                                                                                                        pattern: /^(?!.*script\s)/
                                                                                                                    })}/>
                                    </div>
                                    {errors.password && <p>*le mot de passe doit contenir au moins 6 caractères et 24 caractères maximnum</p>}
                                </div> */}
                                <div className='container-input'>
                                    <select onChange={e => setUserData({...userData, roles: e.target.value})} type="select" id="roles" {...register("roles",{required:true, minLength:2, pattern: /^(ROLE_ADMIN|ROLE_STAFF|ROLE_USER)$(?!.*script)/})}>
                                        <option value="ROLE_USER">user</option>
                                        <option value="ROLE_ADMIN">administrateur</option>
                                        <option value="ROLE_STAFF">staff</option>
                                    </select>
                                </div>
                                <div>
                                    <input  type="submit" value="GO!"/>
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