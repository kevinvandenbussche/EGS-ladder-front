import './CardUser.scss';
import { useEffect, useState} from 'react';
import { ReactComponent as Edit } from '../../asset/logo/edit.svg';
import { ReactComponent as Delete } from '../../asset/logo/delete.svg';

export function CardUser(){
    const entrypoint = 'http://localhost:8000/';
    const [users, setUsers] = useState([]);
    
    useEffect(() =>{
        const url = entrypoint + 'api/data-user-for-main-page';
        fetch( url ,   { headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }})
        .then(res => res.json())
        .then(
            (result) =>{
                setUsers(result);
            }  
        )
    },[]);    
    return(
        <div>
            <h1 className='title-player text-align-center'>suivi de tous les joueurs</h1>
            <div className='flex wrap'>
                {users.map((user)=>{
                        return(
                        <div key={user.id} className='flex card-user space-arround align-items-center'>
                            <div>
                                <p>prenom: <span>&nbsp;{user.firstname}</span></p>
                                <p>nom: <span>&nbsp;{user.name}</span></p>
                                <p>pseudo: <span>&nbsp;{user.pseudonyme}</span></p>
                            </div>
                            <div className='flex space-arround management-profil'>
                                <a href='#'><Edit/></a>
                                <a href='#'><Delete/></a>
                            </div>
                        </div>);  
                    })   
                }
            </div>
        </div>
    )
}