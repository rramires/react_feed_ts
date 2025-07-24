import styles from './Comment.module.css'
import trashIcon from '../assets/icons/trash.svg';
import thumbsUpIcon from '../assets/icons/thumbs-up.svg';
import { Avatar } from './Avatar'
import { useState } from 'react';

export function Comment({ id, content, onDelete }) {

    const [clapping, setClapping] = useState(0)

    function handleAddApplause(){
        /* 
        setClapping(clapping + 1)
        // It does not get the updated value because the rendering cycle has not completed.
        console.log('clapping: ', clapping) // clapping: 0  
        */

        /*  const actual = clapping + 1;
        setClapping(actual)
        //console.log('clapping: ', actual) */

        setClapping((actual) => {
            actual ++
            console.log(actual) // Note that it renders 2x
            // Strict mode in main.jsx (<StrictMode>) causes it to render more than once. 
            // This doesn't happen with the build.
            return actual
        })
    }

    function handleDelete() {
        onDelete(id)
    }

    return (
        <div className={styles.comment}>
            <Avatar hasBorder={false} src='https://avatars.githubusercontent.com/u/14129483?s=128&v=4'/>
            <div>
                <div id='comment'>
                    <strong>Ricardo Off</strong>
                    <time title='26 de Junho de 25 às 21:53h' 
                        dateTime='2025-06-26 21:53:43'>
                        Públicado há 1h
                    </time>
                    <p>{content}</p>
                    <button onClick={handleDelete}>
                        <img src={trashIcon} alt='Deletar comentário'/>
                    </button>
                </div>
                <footer>
                    <button onClick={handleAddApplause}>
                        <img src={thumbsUpIcon} alt='Aplaudir comentário'/>
                    </button>
                    Aplaudir
                    <span>{clapping}</span>
                </footer>
            </div>
        </div>
    )
}