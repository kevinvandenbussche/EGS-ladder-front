import { useEffect, useState, useCallback } from 'react';
import './detailUser.scss';
import pictureUser from '../../asset/logo/user.png';
import { Load } from '../load/Load.js';
import { ReactComponent as Delete } from '../../asset/logo/delete.svg';

export function DetailPlayer(props){
    const entrypoint = 'http://localhost:8000/';
    const [gamesByUser, setGamesByUser] = useState([]);
    const idUser = props.idUser;
    const [load, setLoad] = useState(false);
    const clickDeleteCard = props.clickDeleteCard;
    const [confirmDelete, setConfirmDelete] = useState(false);

    useEffect(() =>{
        const url = entrypoint + 'api/games-by-player/'+idUser;
        fetch( url ,   { headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }})
        .then(res => res.json())
        .then(
            (result)=>{
                setGamesByUser(result);
                setLoad(true);
            }
        )
    },[]); 

    //suppression d'un utlisateur
    useEffect(() =>{
        if(confirmDelete){
            let url = entrypoint;
            url += 'api/users/' + idUser;
            fetch( url ,   {
                method: 'DELETE',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                }})
            .then(
                () =>{
                    setConfirmDelete(false);
                    handleClick();
                    
                }  
            )}
    },[confirmDelete]);

    const { setClickDelete } = props;
    const { setToggleModal } = props;
    const handleClick = useCallback(() => {
        setToggleModal(false);
        setClickDelete(false);
      }, [setToggleModal]);

    return(
        <div>
            {load === true ?
            <>
                <ul onClick={handleClick} className='cross'>
                    <li></li>
                    <li></li>
                </ul>
                <div className='picture-profil'>
                    <img  className='img-fluid' src={pictureUser} alt="profil"/>
                </div>
                <div className='flex space-arround identity'>
                    <p>{props.userName}</p>
                    <p>{props.userFirstname}</p>
                </div>
                <div className='flex wrap space-arround container-identity-game'>
                {clickDeleteCard === true ?
                    <div>
                        <p>Etes vous sur de vouloir supprimer cet utilisateur</p>
                        <div className='text-align-center' onClick={()=>setConfirmDelete(true)}><Delete/></div>
                    </div>
                    :
                    <>
                        {gamesByUser.map((game)=>{
                            return(
                            <ul key={game.idGame} className='identity-game'>
                                <li>{game.nameGame}</li> 
                                <li>{game.pseudo}</li>
                                <li>Max: {game.maxElo}</li>
                                <li>Min: {game.minElo}</li>                   
                            </ul>
                            )
                        })}
                    </>
                    }
                </div>
            </>
           :
            <>
                <Load/>
            </>
        }
        </div>
    
    )
}