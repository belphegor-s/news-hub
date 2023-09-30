import styles from "@/styles/result_card/result_card.module.scss";
import Router from "next/router";

interface Props {
    title: string;
    id: string;
    url: string;
    publishedDate: string;
    onFindSimilarClickHandler: (url: string) => void;
}

const ResultCard = ({title, id, url, publishedDate, onFindSimilarClickHandler}: Props) => {
    return (
        <div className={styles['result-card']}>
            <h3>{title ?? ''}</h3>
            <a href={url ?? ''} target="_blank">Visit URL &#129109;</a>
            <p><b>Published On: </b>{publishedDate}</p>
            <button className="btn" onClick={() => onFindSimilarClickHandler(url)}>Find Similar</button>
            <button className="btn-secondary" onClick={() => Router.push(`/results/${id}`)}>Get content</button>
        </div>
    )
}

export default ResultCard