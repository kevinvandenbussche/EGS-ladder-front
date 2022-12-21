
export function Graph(){
    
    const entrypoint = 'http://localhost:8000/';
    const [page, setPage] = useState(1);
    const [users, setUsers] = useState([]);
    useEffect(() =>{
        const url = entrypoint + "api/users/1";
        fetch( url ,   { headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }})
        .then(res => res.json())
        .then(
            (result) =>{
                //thread operator
                let arrayData = [...users, ...result];
                setUsers(arrayData); 
            }
        )
        
    }, [page]);
}