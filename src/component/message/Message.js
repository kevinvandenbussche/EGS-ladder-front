import {useState, useEffect} from 'react'; 
import { ENTRYPOINT } from '../../config';
import { useNavigate } from 'react-router-dom';
import{useForm} from 'react-hook-form';


export function Message() {
    const [messages, setMessages] = useState([]);
    const entrypoint = ENTRYPOINT;
    const [idUser] = useState(localStorage.getItem('userId'));
    const navigate = useNavigate();
    const {handleSubmit, register } = useForm();
    const [formData, setFormData] = useState({});
    // console.log(idUser);

    const onSubmit = (data) => {
        const date = new Date();
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);
        const seconds = ('0' + date.getSeconds()).slice(-2);
        const formattedDate = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
        setFormData({
            text: data.text,
            send: "api/users/" + idUser,
            receive: "api/users/" + 2,
            timeStamp: formattedDate,
        })
    }
    useEffect(() => {
        const url = entrypoint + 'api/find-message-by-user/' + idUser;
        fetch(url, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then(
            (result) => {
                if(result.code === 401 || result.code === 403){
                    navigate('/')
                }
                setMessages(result);
            }
        )
    }, []);
    // console.log(messages);
    useEffect(() => {
        if(formData.text !== undefined){
            const url = entrypoint + 'api/messages';
            console.log(JSON.stringify(formData));
            fetch(url , {
                method: 'POST',
                headers: {
                    'Autorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vaXBib2FyZC50ZXN0IiwibWVyY3VyZSI6eyJzdWJzY3JpYmUiOlsiKiIsImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC8ud2VsbC1rbm93bi9tZXJjdXJlL3VpLyJdLCJwdWJsaXNoIjpbIioiLCJodHRwOi8vbG9jYWxob3N0OjMwMDAvLndlbGwta25vd24vbWVyY3VyZS91aS8iXX19.RPsSmMdUkN87jqEdm7x2OQ5fTg7XepGwOrBcw1AEx-w',
                    'Accept': 'application/json',
                    'Content-Type': 'application/ld+json',
                },
                body: JSON.stringify(formData)
            })
            .then((res) => res.json())
            .then(
                (result) => {
                    console.log("dans le psot",result);
                }
            )
        }
    }, [formData]);
    
    // const url = new URL('http://localhost:3000/.well-known/mercure/ui/');
    // url.searchParams.append('topic', "https://egs-ladder.com/users/messages")
    // const eventSource = new EventSource(url);
////////////////////////////////////////////////////:
    const tokenMercure = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vaXBib2FyZC50ZXN0IiwibWVyY3VyZSI6eyJzdWJzY3JpYmUiOlsiKiIsImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC8ud2VsbC1rbm93bi9tZXJjdXJlL3VpLyJdLCJwdWJsaXNoIjpbIioiLCJodHRwOi8vbG9jYWxob3N0OjMwMDAvLndlbGwta25vd24vbWVyY3VyZS91aS8iXX19.RPsSmMdUkN87jqEdm7x2OQ5fTg7XepGwOrBcw1AEx-w'

    var mercureToken = 'Bearer ' + tokenMercure;
    var url = new URL('http://localhost:3000/.well-known/mercure');
    // url.searchParams.append('topic', 'https://egs-ladder.com/api/messages');

    // Create event source and connect to hub
    var eventSource = new EventSource(url, {
        headers: {
            'Authorization': mercureToken,
            'Accept': 'text/event-stream' 
        },
    });

    // This never will be called when another connection is established
    // What exactly is wrong here?
     eventSource.onmessage = event => {
            const message = JSON.parse(event.data);
            console.log('Received notification from server', message);
        }

   
    return(
        <>
        <h1 className='text-align-center'>Messagerie</h1>
        <form action="" onSubmit={ handleSubmit(onSubmit) }>
            <label htmlFor="message">Message</label>
            <input type="text" name="message" id="message" {...register("text")}/>
            <button type='submit'>Envoyer</button>
        </form>
        {messages.map((message) => {
                return(
                    <div key={message.id} className="message">
                        <p>{message.text}</p>
                    </div>
                )
            }
        )}
        </>
    )
}