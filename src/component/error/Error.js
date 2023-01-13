import './error.scss';
import { useCallback } from 'react';

export function Error(props) {
    const setError = props.setError;

    const handleClick = useCallback(() => {
        setError(false);
      }, [setError]);
    

    return (
        <div className="error flex align-items-center">
            <div className=''>
                <ul className="cross" onClick={handleClick}>
                    <li></li>
                    <li></li>
                </ul>
                <h1 className='text-align-center'>Oups ...</h1>
                <p className='text-align-center'>Une erreur est survenue</p>
            </div>   
        </div>
    )
}