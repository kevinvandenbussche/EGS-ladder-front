import React, { useEffect, useState} from 'react';
import{useForm} from 'react-hook-form';
import './formUser.scss'

export function FormUser() {
    const {handleSubmit, register, formState :  {errors} } = useForm();
    const entrypoint = 'http://localhost:8000/';
    const [formData, setFormData] = useState({});
  
    const onSubmit = (data)=>{
        setFormData({
            email: data.email,
            roles: [
                "ROLE_USER"
              ],
            password: data.password,
            name: data.name,
            firstname: data.firstname,
        })
    };
        useEffect(() =>{
            let url = entrypoint;
            url += 'api/users';
            console.log(formData);
            fetch( url ,   {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
            });
        }, [formData]);
        

    return (
        <>
        <h1 className='text-align-center'>inscrit toi</h1>
        <div className='flex justify-content-center'>
            <form  className = 'form-create-user'onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Enter your name: </label>
                    <input type="text" name="name" id="name" {...register("name")}/>
                </div>
                <div>
                    <label htmlFor="firstname">Enter your prenom: </label>
                    <input type="text" name="firstname" id="firstname" {...register("firstname")}/>
                </div>
                <div>
                    <label htmlFor ="email">Enter your email: </label>
                    <input type="email" name="email" id="email" {...register("email")}/>
                </div>
                <div>
                    <label htmlFor ="password">Enter your password: </label>
                    <input type="password" name="password" id="password" {...register("password")}/>
                </div>
                <div>
                    <input type="submit" value="Subscribe!"/>
                </div>
            </form>
        </div>
        </>
    );
}