import { useEffect, useState } from "react";
import { ENTRYPOINT } from '../../config';
import { useForm } from 'react-hook-form';
import "../selectGame/selectGame.scss";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';



export function SelectGame() {
  const location = useLocation();
  const paramUserId = location.pathname.split('/')[2];
  const [data, setData] = useState([]); 
  const { handleSubmit, register, formState: { errors } } = useForm();
  const [formData, setFormData] = useState({});
  const [showInput, setShowInput] = useState(false);
  const [selectedGame, setSelectedGame] = useState('');
  const [idGame, setIdGame] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [userId] = useState(paramUserId);
  const [popIn, setPopIn] = useState(true);
  


  //je recuepre les jeux de la base de donnée
  useEffect(() => {
    let url = ENTRYPOINT;  
    url += 'api/data-game'
    fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
  }, []);
  //je recupere les données du formulaire
  const onSubmit = (data) => {
    const event = new Event('submit');
    event.preventDefault();
    // console.log(data.pseudo);
    setFormData({
        pseudonyme: data.pseudo,
        game: idGame,
        dateStart: new Date(),
        user: userId
    })
    setFormSubmitted(true);
    // console.log(formData);
  }
  
  //j'affiche le formulaire
  const handleClick = (game) => {
    setShowInput(true);
    setSelectedGame(game.name);
    setIdGame(game.id);
  };

  const close = () => {
    setPopIn(false);
  }
  

  return (
    <>
      <h1 className="text-align-center title-select-game">Selectionnes tes jeux</h1>
      {popIn === true ? 
      <div className="tutorial">
        <ul onClick={close} className="cross">
          <li></li>
          <li></li>
        </ul>
        
        <p className="text-align-center">Pour commencer, selectionne tes jeux préférés
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
      {showInput && (
        <>
        <form className="form-create-pseudo" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="pseudo">Saisi ton pseudo pour {selectedGame}</label>
          <input type="text" name="pseudo" id="pseudo" {...register("pseudo", { required: true, minLength: 2, pattern: /^(?!.*script\s)/ })} />
          {errors.pseudo && <p>*le prenom doit contenir au moins 2 caractères</p>}
            <input type="submit" value="Valider" />
        </form>
        <div className="text-align-center">
          <Link to={`/graph/${userId}`}>Suivant</Link>
        </div>
        </>
      )}

    </>
  )
}
