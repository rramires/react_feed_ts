import styles from './Avatar.module.css'

interface AvatarProps {
    src: string
    hasBorder?: boolean 
    alt?: string
}

export function Avatar({ src, hasBorder = true, alt = '' }: AvatarProps){

    return(
        <img className={`${styles.avatar} ${hasBorder ? styles.border : ''}`}
            src={src}
            alt={alt}/>
    )
}