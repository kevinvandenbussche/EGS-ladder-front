import { useEffect, useState} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  import { useLocation } from 'react-router-dom';

export function Graph(){
    const location = useLocation();
    const param = location.pathname.split('/')[2];
    const idUser = param;
    const entrypoint = 'http://localhost:8000/';
    const [datas, setdatas] = useState([]);
    useEffect(() =>{
        const url = entrypoint + 'api/find-elo-by-user/' + idUser;
        fetch( url ,   { headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }})
        .then(res => res.json())
        .then(
            (result) =>{
                setdatas(result);
            }
        )
    }, []);

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
            title:'de'
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
    return <Line options={options} data={data} />;
        
        
}