import './CardUser.scss';
import { useEffect, useState } from 'react';

export function CardUser(){
    const entrypoint = 'http://localhost:8000/';
    const [page, setPage] = useState(1);
    const [users, setUsers] = useState([]);
    
    useEffect(() =>{
        const url = entrypoint + "api/users?page=" + page;
        fetch( url ,   { headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }})
        .then(res => res.json())
        .then(
            (result) =>{
                //thread operator
                let arrayData = [...users, ...result];
                setUsers(arrayData);
                if(result.length === 30){
                    let pageCopy = page;
                    setPage(pageCopy += 1);                    
                }  
            }
        )
        
    }, [page]);
    console.log(users);
    return(
        <div className='position-relative-for-other-element'>
            <h1 className='title-player text-align-center'>suivi de tous les joueurs</h1>
            <div className='flex wrap'>
                {users.map((user)=>{
                        return(
                        <div className='flex card-user space-arround align-items-center'>
                            <div>
                                <p>prenom: <span> {user.firstname}</span></p>
                                <p>nom: <span> {user.name}</span></p>
                                <p>pseudo:</p>
                                <p>jeu:</p>
                            </div>
                            <div className='flex space-arround '>
                                <p>modifier</p>
                                <p>supprimer</p>
                            </div>
                        </div>);  
                    })   
                }
            </div>
        </div>
    )
}