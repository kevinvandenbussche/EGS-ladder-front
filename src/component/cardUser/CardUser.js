import './CardUser.scss';
import { useEffect, useState} from 'react';
import { ReactComponent as Edit } from '../../asset/logo/edit.svg';
import { ReactComponent as Delete } from '../../asset/logo/delete.svg';
import { DetailPlayer } from '../detailUser/DetailPlayer.js';
import { Load } from '../load/Load.js';

export function CardUser(){
    const entrypoint = 'http://localhost:8000/';
    const [users, setUsers] = useState([]);
    const [toggleModal, setToggleModal] = useState(false);
    const [userDatas, setUserDatas] = useState([]);
    const [load, setLoad] = useState(false);
    const [searchTerm, setSearchTerm] = useState([]);
    console.log(searchTerm);

    useEffect(() =>{
        let url = entrypoint;
        if(searchTerm.length == 0){
        url += 'api/data-user-for-main-page';
        }else{
        url += 'api/search-player/' + searchTerm;
        }
        fetch( url ,   { headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }})
        .then(res => res.json())
        .then(
            (result) =>{
                setUsers([]);
                setUsers(result);
                setLoad(true);
            }  
        )
    },[searchTerm]);  

    console.log(users);
    const clickModal = () =>{
        setToggleModal(current => !current)
    }

    let modalCss = 'container-detail-user ';
    if(toggleModal === true){
        modalCss += 'modal-open';
    }

    const handleChange = event => {
        setSearchTerm(event.target.value);
    };

    return(
        <div>
            <h1 className='title-player text-align-center'>suivi de tous les joueurs</h1>
            <form className='search-barre'>
                <input
                    type="text"
                    placeholder="Nom ou Prenom..."
                    value={searchTerm}
                    onChange={handleChange}
                />
            </form>
            {load === true ? 
            <div className='flex wrap'>
                {users.map((user)=>{ 
                        return(
                        <div key={user.id} onClick={e => 
                        {
                            setUserDatas([user.name, user.firstname, user.pseudonyme, user.id]); 
                            clickModal(true)}} 
                            className='flex card-user space-arround align-items-center'>
                            <div>
                                <p>prenom: <span>&nbsp;{user.firstname}</span></p>
                                <p>nom: <span>&nbsp;{user.name}</span></p>
                            </div>
                            <div className='flex space-arround management-profil'>
                                <a><Edit/></a>
                                <a><Delete/></a>
                            </div>                      
                        </div>);  
                    })     
                }
                {toggleModal === true ?
                    <div className={modalCss}>
                        <DetailPlayer
                        userName = {userDatas[0]}
                        userFirstname = {userDatas[1]} 
                        userPseudonyme = {userDatas[2]}
                        idUser = {userDatas[3]}
                        setToggleModal = {setToggleModal}
                    />
                    </div>: <></>
                }
            </div> : <Load/>}
        </div>
    )
}