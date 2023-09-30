import styles from "@/styles/result_card/result_card.module.scss";

interface Props {
    title: string;
    id: string;
    url: string;
    publishedDate: string
}

const ResultCard = ({title, id, url, publishedDate}: Props) => {
    return (
        <div className={styles['result-card']}>
            <h3>{title ?? ''}</h3>
            <a href={url ?? ''} target="_blank">Visit URL &#129109;</a>
            <p><b>Published On: </b>{publishedDate}</p>
        </div>
    )
}

export default ResultCard