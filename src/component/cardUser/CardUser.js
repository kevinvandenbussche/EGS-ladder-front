import './CardUser.scss';
import { useEffect, useState, useCallback} from 'react';
import { ReactComponent as Edit } from '../../asset/logo/edit.svg';
import { ReactComponent as Delete } from '../../asset/logo/delete.svg';
import { DetailPlayer } from '../detailUser/DetailPlayer.js';
import { Load } from '../load/Load.js';

//http://localhost:8000/api/users
export function CardUser(){
    const entrypoint = 'http://localhost:8000/';
    const [users, setUsers] = useState([]);
    const [toggleModal, setToggleModal] = useState(false);
    const [userDatas, setUserDatas] = useState([]);
    const [load, setLoad] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [clickDelete, setClickDelete] = useState(false);
    const [userId, setIdUser] = useState(0);
    
    useEffect(() =>{
        let url = entrypoint;
        //je verifie si des données sont presentes dans l'input de recherche pour lancer la requete
        if(searchTerm === ''){
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

    //changement de l'etat lors du click sur la croix
    const clickModal = () =>{
        setToggleModal(current => !current)
    }

    //changement de la class css pour l'ouverture de la modal 
    let modalCss = 'container-detail-user ';
    if(toggleModal === true){
        modalCss += 'modal-open';
    }

    //recuperation de la valeur de l'input pour le moteur de recherche
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
                                <div><Edit/></div>
                                <div onClick={()=>{setClickDelete(true); setIdUser(user.id)}}><Delete/></div>
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
                        clickDeleteCard = {clickDelete}
                        setClickDelete = {setClickDelete}
                    />
                    </div>: <></>
                }
            </div> : <Load/>}
        </div>
    )
}