import styles from './Avatar.module.css'

export function Avatar({ src, hasBorder = true }){

    return(
        <img className={`${styles.avatar} ${hasBorder ? styles.border : ''}`}
            src={src} />
    )
}