import { useEffect, useState} from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useLocation, useNavigate } from 'react-router-dom';
import { ENTRYPOINT } from '../../config.js';
import { Header } from '../header/Header.js';

export function Graph(){
    const location = useLocation();
    const param = location.pathname.split('/')[2];
    const idUser = param;
    const entrypoint = ENTRYPOINT;
    const [datas, setdatas] = useState([]);
    const navigate = useNavigate();
    const [games, setGames] = useState([]);
    const [idGame, setIdGame] = useState(0);

    useEffect(() =>{
      const urlGetGame = entrypoint + 'api/data-game';
      fetch(urlGetGame, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(
        (result) => {
          if(result.code === 401 || result.code === 403){
            navigate('/')
          }
          console.log('result',result)
          setGames(result);
        }
        
      )
      if(idGame !== 0){
        console.log('idgameazeaze',idGame)
        console.log(games)
        const url = entrypoint + 'api/find-elo-by-user/' + idUser+ '/' + idGame;
        fetch( url ,   { headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }})
        .then(res => res.json())
        .then(
            (result) =>{
                if(result.code === 401 || result.code === 403){
                    navigate('/')
                }
                setdatas(result);
            }
        )
       }
    }, [idGame]);
    const getIdGame = (e, gameId) => {
      setIdGame(gameId);
    }

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
      );
     const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            display:'false',
            title:'zazeazeaze'
          },
          title: {
            display: true,
            text: 'Données du joueur',
            padding:10
          },
        },
      };

      const labels = [];
      const elo = [];
      datas.forEach(data => {
        labels.push(data.dateRegisterElo.date)
        elo.push(data.elo)
      });
      const data = {
        labels,
        datasets: [
          {
            data: elo,
            backgroundColor: 'white',
            borderColor:'white',

        }
        ],
      };    
    return(
      <>
        <Header />
        <h1 className='text-align-center'>Mon suivi</h1>
        <ul>
        {games.map(game => {
          return(
              <li key={game.id} onClick={e=>getIdGame(e, game.id)}>{game.name}</li>
            )
          }
        )}
        </ul>
       <Line options={options} data={data} />
       </>
    );
        
        
}