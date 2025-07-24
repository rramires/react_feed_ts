import styles from './Post.module.css'
import { Comment } from './Comment'
import { Avatar } from './Avatar'

import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR';
import { useState, useRef } from 'react';

export function Post({ author, publishedAt, content }) {

    const [comments, setComments] = useState([
        { id: 1, msg: 'Muito bom Dev, parabéns!!!' }
    ])

    const [commentText, setCommentText] = useState('')

    const btnPublish = useRef(null)

    const isCommentEmpty = commentText.length < 3;

    /* function handleInvalidNewComment(event){
        event.target.setCustomValidity('Esse campo é obrigatório!')
    } */

    function handleNewComment(event) {
        event.preventDefault()

        setComments([...comments, { id: comments.length + 1, msg: commentText } ])
        setCommentText('')
        // remove focus
        btnPublish.current.blur()
    }

    function deleteComment(id){
        //console.log('deleteComment:', id)
        const diffComments = comments.filter(comment => {
            return comment.id !== id;
        })
        setComments(diffComments)
    }

    /* 
    // Javascript native lib
    const dateFormat = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
    }).format(publishedAt) 
    */

    const dateFormat = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", { locale: ptBR })
    const dateRelativeToNow = formatDistanceToNow(publishedAt, { locale: ptBR, addSuffix: true })

    return (
        <article className={styles.post}>
            <header>
                <Avatar src={author.avatarUrl}/>
                <div>
                    <strong>{author.name}</strong>
                    <span>{author.role}</span>
                </div>
                <time title={dateFormat} 
                    dateTime={publishedAt.toISOString()}>
                    Publicado {dateRelativeToNow}
                </time>
            </header>

            <div id='content'>
                {content.map((line, index) => {
                    switch(line.type) {
                        case 'paragraph' : 
                            return (
                                <p key={index}>{line.content}</p>
                            )
                        case 'link' : 
                            return ( 
                                <p key={index}>
                                    <a href={line.content} target='_blank'>{line.content}</a>
                                </p>
                            )
                    }
                })}
            </div>

            <form id='feedback' onSubmit={handleNewComment}>
                <strong>Deixe seu feedback</strong>
                <textarea 
                    placeholder='Deixe um comentário'
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    required
                />
                <footer>
                    <button type='submit'
                        ref={btnPublish}
                        disabled={isCommentEmpty}>
                        Publicar
                    </button>
                </footer>
            </form>

            <div id='comments'>
                {comments.map((comment) => {
                    return (
                        <Comment 
                            key={comment.id} 
                            id={comment.id} 
                            content={comment.msg} 
                            onDelete={deleteComment}
                        />
                    )
                })}
            </div>
        </article>
    )
}