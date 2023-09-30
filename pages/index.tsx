import Loader from "@/components/Loader";
import ResultCard from "@/components/ResultCard";
import styles from "@/styles/Home.module.scss";
import { obj } from "@/types/global";
import axiosPost from "@/utils/axiosPost";
import sortByDate, { SortFormat } from "@/utils/sortByDate";
import Head from "next/head";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState<obj[]>([]);
    const [keyword, setKeyword] = useState('');
    const [sortFormat, setSortFormat] = useState<SortFormat>(SortFormat.DESCENDING);

    const onFormSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(loading) return;

        setLoading(true);

        const formData = new FormData(e.currentTarget),
            searchQuery = formData.get('search-query') ?? '',
            numOfResults = formData.get('num-results') ?? 10;

        try {
            const response = await axiosPost(`/api/search`, {
                searchQuery,
                numOfResults
            });

            if(response && response?.status === 200) {
                toast.success(response.data?.msg);
                setResultData(response.data?.data);
            } else {
                toast.error(response.data?.msg);
            }
        } catch(e) {
            console.error(`Error making request -> `, e);
            toast.error('Something went wrong! Please try again.');
        } finally {
            setLoading(false);
        }
    }

    const onFindSimilarClickHandler = async (url: string) => {
        if(loading) return;

        setLoading(true);

        try {
            const response = await axiosPost(`/api/search-similar`, {
                url,
                numOfResults: resultData?.length ?? 10
            });

            if(response && response?.status === 200) {
                toast.success(response.data?.msg);
                setResultData(response.data?.data);
            } else {
                toast.error(response.data?.msg);
            }
        } catch(e) {
            console.error(`Error making request -> `, e);
            toast.error('Something went wrong! Please try again.');
        } finally {
            setLoading(false);
        }
    }

    const onSortFormatChangeHandler = () => {
        if(sortFormat === SortFormat.ASCENDING) {
            setSortFormat(SortFormat.DESCENDING);
        } else {
            setSortFormat(SortFormat.ASCENDING);
        }
    }

    return (
        <>
            <Head>
                <title>News Hub</title>
            </Head>
            <main className={'container ' + styles.main}>
                <form onSubmit={onFormSubmitHandler}>
                    <label htmlFor="search-query">
                        <div>Enter Search Query:</div>    
                        <input type="text" name="search-query" placeholder="e.g. Latest articles on BunJS"/>
                    </label>
                    <label htmlFor="num-results">
                        <div>Enter number of Search Results:</div>
                        <input type="number" name="num-results" placeholder="e.g. 5" min={1} max={1000}/>
                    </label>
                    {loading ? <Loader/> :
                        <button className="btn">Make a Search</button>
                    }
                </form>
                {resultData && resultData?.length > 0 && !loading &&
                    <>
                        <h2>Results</h2>
                        <div className={styles['sort-wrap']}>
                            <label htmlFor="sort-data" className="switch" onClick={onSortFormatChangeHandler}>
                                <input type="checkbox" checked={sortFormat === SortFormat.DESCENDING}/>
                                <span className="slider round"></span>
                            </label>
                            <div>Latest on {sortFormat === SortFormat.DESCENDING ? 'Top' : 'Bottom'}</div>
                        </div>
                        <input type="text" placeholder="Filter your search" onChange={(e) => setKeyword(e.target.value)}/>
                        <div className={styles.results}>
                            {sortByDate(resultData, sortFormat)?.filter((data: obj) => keyword.toLowerCase() === '' ? data : data?.title?.toLowerCase()?.includes(keyword?.toLowerCase()))?.map((data: obj, i: number) => {
                                return (
                                    <ResultCard key={`result-card-${i}`} title={data?.title} id={data?.id} url={data?.url} publishedDate={data?.publishedDate} onFindSimilarClickHandler={onFindSimilarClickHandler}/>
                                )
                            })}
                        </div>
                    </>
                }
            </main>
        </>
    )
}

export default Home