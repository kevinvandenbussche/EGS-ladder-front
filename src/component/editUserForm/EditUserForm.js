import React, { useEffect, useState} from 'react';
import{useForm} from 'react-hook-form';
import { ENTRYPOINT } from '../../config';
import { Error } from '../error/Error.js';
import { Load } from '../load/Load.js';
import './editUserForm.scss'


export function EditUserForm(props) {
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
    const [message, setMessage] = useState(false);

    const onSubmit = (data)=>{
        setFormData({
            email: data.email,
            roles: [
                data.roles
              ],
            name: data.name,
            firstname: data.firstname,
        })
        setFormSubmitted(true);
    };

    useEffect(() =>{
            setLoad(true);
            let url = entrypoint;
            url += 'api/users/'+idUser;
            fetch( url ,   {
                headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
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
                setValue("roles", user.roles[0]);
                setLoad(false);
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
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'accept': 'application/ld+json',
                'Content-Type': 'application/merge-patch+json'
                },
                body: JSON.stringify(formData)
            })

            .then((data) => {
                console.log(data.ok);
                if(data.ok){
                    setLoad(false);
                    setMessage(true);
                }else{
                    setLoad(false);
                    setError(true);
                }
            })
            .catch(() => {
                setError(true);
            });
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
                        <h2 className='text-align-center'>Modifier l'utilisateur</h2>
                        {message === true ? <p className='text-align-center'>*l'utisateur a été mis à jour</p> : null}
                        <div className='flex justify-content-center container-edit-form'>
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
                                <div className='container-input'>
                                    <select onChange={e => setUserData({...userData, roles: e.target.value})} type="select" id="roles" {...register("roles",{required:true, minLength:2, pattern: /^(ROLE_ADMIN|ROLE_COACH|ROLE_USER)$(?!.*script)/})}>
                                        <option value="ROLE_USER">utilisateur</option>
                                        <option value="ROLE_ADMIN">administrateur</option>
                                        <option value="ROLE_COACH">coach</option>
                                    </select>
                                </div>
                                <div>
                                    <input  type="submit" value="Valider"/>
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