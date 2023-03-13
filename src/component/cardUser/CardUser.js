import './cardUser.scss';
import { useEffect, useState} from 'react';
import { ReactComponent as Edit } from '../../asset/logo/edit.svg';
import { ReactComponent as Delete } from '../../asset/logo/delete.svg';
import { DetailPlayer } from '../detailUser/DetailPlayer.js';
import { Load } from '../load/Load.js';
import {ENTRYPOINT} from '../../config.js';
import { EditUserForm } from '../editUserForm/EditUserForm.js';
import { useNavigate } from 'react-router-dom';
import { Header} from '../header/Header.js';


//http://localhost:8000/api/users
export function CardUser(){
    const [users, setUsers] = useState([]);
    const [toggleModal, setToggleModal] = useState(false);
    const [userDatas, setUserDatas] = useState([]);
    const [load, setLoad] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [clickDelete, setClickDelete] = useState(false);
    const [userId, setIdUser] = useState(0);
    const [toggleEdit, setToggleEdit] = useState(false);
    const navigate = useNavigate();
    const [userType, setUserType] = useState('');
    
    useEffect(() =>{
        let url = ENTRYPOINT;
        //je verifie si des données sont presentes dans l'input de recherche pour lancer la requette
        if(userType === 'coach'){
            url += 'api/coaches';
        }else if(searchTerm === '' || userType === 'user'){
            url += 'api/data-user-for-main-page';
        }else{
            url += 'api/search-player/' + searchTerm;
        }
        fetch( url ,   { headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            
            }})
        .then(res => res.json())
        .then(
            (result) =>{
                console.log(result)
                if(result.code === 401 || result.code === 403){
                    navigate('/');
                }else{
                    setUsers(result);
                    setLoad(true);
                }
            }  
        )
    },[searchTerm, clickDelete, userType]);  
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

    //reuperation du mot de ma liste lors du click sur le bouton supprimer liste
    const getTypeUser = (type) =>{
        setUserType(type);
    }
    console.log(userType);
    return(
        <>
        <Header/>
        <div>
            <h1 className='title-player text-align-center'>suivi des joueurs</h1>
            <form className='search-barre'>
                <div className='container-input'>
                        <input
                            type="text"
                            placeholder="Nom ou Prenom..."
                            value={searchTerm}
                            onChange={handleChange}
                            pattern="/^(?!.*script\s)/"
                        />
                </div>
            </form>
            <ul className='flex list-type-user'>
                <li onClick={()=>getTypeUser('user')}>utilisateurs</li>
                <li onClick={()=>getTypeUser('coach')}>coach</li>
            </ul>
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
                                <div onClick={()=>{setToggleEdit(true); setIdUser(user.id)}}><Edit/></div>
                                <div onClick={()=>{setClickDelete(true); setIdUser(user.id)}}><Delete/></div>
                            </div>                      
                        </div>);  
                    })     
                }
                {toggleModal === true ?
                    <div className={modalCss}>
                    <DetailPlayer
                            userName={userDatas[0]}
                            userFirstname={userDatas[1]} 
                            userPseudonyme={userDatas[2]}
                            idUser={userDatas[3]}
                            setToggleModal={setToggleModal}
                            clickDeleteCard={clickDelete}
                            setClickDelete={setClickDelete}
                            toggleEdit={toggleEdit}
                            setToggleEdit={setToggleEdit}
                        >
                    {toggleEdit === true && <EditUserForm idUser={userDatas[3]} />}
                    </DetailPlayer>
                    </div>
                    : <></>
                }
            </div> 
            : 
            <Load/>
            }
            
        </div>
        </>
    )
}