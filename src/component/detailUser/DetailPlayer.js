import { useEffect, useState} from 'react';
import { MenuBurger } from '../menuBurger/MenuBurger.js';
import './detailUser.scss';
import pictureUser from '../../asset/logo/user.png';

export function DetailPlayer(props){
    const entrypoint = 'http://localhost:8000/';
    const [gamesByUser, setGamesByUser] = useState([]);
    const idUser = props.idUser;
    
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

            }
        )
    },[]); 
   
    return(
        <div>
            <MenuBurger toggleModal = {props.toggleModal} setToggleModal = {props.setToggleModal()}/>
            <div className='picture-profil'>
                <img  className='img-fluid' src={pictureUser} alt="profil"/>
            </div>
            <div className='flex space-arround identity'>
                <p>{props.userName}</p>
                <p>{props.userFirstname}</p>
            </div>
            <div className='flex space-arround identity-game'>
                <ul>
                    <li>liste des pseudo</li>
                    <li>{props.userPseudonyme}</li>
                </ul>
                <ul>
                    <li>liste des jeux</li>
                    {gamesByUser.map((game)=>{
                        return(
                            <li key={game.idGame}>{game.nameGame}</li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}