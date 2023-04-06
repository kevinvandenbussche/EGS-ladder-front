import { useEffect, useState } from "react";
import { ENTRYPOINT } from '../../config';
import { useForm } from 'react-hook-form';
import "../selectGame/selectGame.scss";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';



export function SelectGame() {
  const [data, setData] = useState([]); 
  const { handleSubmit, register, formState: { errors } } = useForm();
  const [formData, setFormData] = useState({});
  const [showInput, setShowInput] = useState(false);
  const [selectedGame, setSelectedGame] = useState('');
  const [idGame, setIdGame] = useState(0);
  const [userId] = useState(localStorage.getItem('userId'));
  const [popIn, setPopIn] = useState(true);
  const navigate = useNavigate();
  const [pseudSuccess, setPseudSuccess] = useState(false);
  const [pseudError, setPseudError] = useState(false);
  
  //je recupere les jeux de la base de donnée
  useEffect(() => {
    let url = ENTRYPOINT;  
    url += 'api/data-game'
    fetch(url, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.code === 401 || data.code === 403){
          navigate('/')
        }
        setData(data);
      })
  }, [navigate]);
  //je recupere les données du formulaire
  const onSubmit = (data) => {
    //convertir la date en format sql
    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    const formattedDate = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
    setFormData({
      pseudonyme: data.pseudo,
      game: "api/games/" + idGame,
      dateStart: formattedDate,
      user: "api/users/" + userId,
      dateRegisterElo : formattedDate
    })
    
  }
  useEffect(() => {
    if(formData.pseudonyme){
    setPseudSuccess(false);
    setPseudError(false);
    fetch(ENTRYPOINT + 'api/to_plays', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then((response) => response.json())
    .then((response) => {
      if(response.accountId !== undefined){
        setPseudSuccess(true);
      }else{
        setPseudError(true);
      }
    })
    .catch(() => {
      setPseudError(true);
    })
  }
  }, [formData]);
  
  //j'affiche le formulaire
  const handleClick = (game) => {
    setShowInput(true);
    setSelectedGame(game.name);
    setIdGame(game.id);
  };
  //fermer la popin de l'explication du fonctionnement de la page
  const close = () => {
    setPopIn(false);
  }
  

  return (
    <>
      <h1 className="text-align-center title-select-game">Selectionne tes jeux</h1>
      {popIn === true ? 
      <div className="tutorial">
        <ul onClick={close} className="cross">
          <li></li>
          <li></li>
        </ul>
        <p className="text-align-center">Pour commencer, selectionnes tes jeux préférés. Rentre ton pseudo pour chaque jeu et valide. Une fois que tu as validé pour tous tes jeux, tu peux cliquer sur suivant pour voir tes stats.
        Tu pourras ensuite voir tes stats en cliquant sur suivant</p>
      </div>
      : null}
      <div className="flex wrap container-form-select-game">
        <ul className="text-align-center games flex">
          {data.map((game) => (
            <li className="text-align-center" key={game.id} onClick={() => handleClick(game)}>{game.name}</li>
          ))}
        </ul>
      </div>
      {showInput ?

        <>
        {pseudSuccess === true ? <p className="text-align-center">Ton pseudo a bien été enregistré</p> : null}
        {pseudError === true ? <p className="text-align-center">Une erreur est survenue</p> : null}
        <form className="form-create-pseudo" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="pseudo">Saisi ton pseudo pour {selectedGame}</label>
          <input type="text" name="pseudo" id="pseudo" {...register("pseudo", { required: true, minLength: 2, pattern: /^(?!.*script\s)/ })} />
          {errors.pseudo && <p>*le prenom doit contenir au moins 2 caractères</p>}
            <input type="submit" value="Valider" />
        </form>
        <div className="text-align-center" >
          <Link to={`/graph/${userId}`}>Suivant</Link>
        </div>
        </>
        : null}

    </>
  )
}
