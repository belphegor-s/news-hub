import Loader from "@/components/Loader";
import ResultCard from "@/components/ResultCard";
import styles from "@/styles/Home.module.scss";
import { obj } from "@/types/global";
import axiosPost from "@/utils/axiosPost";
import Head from "next/head";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState<obj[]>([]);

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
                {resultData && resultData?.length > 0 &&
                    <div className={styles.results}>
                        {resultData?.map((data: obj, i: number) => {
                            return (
                                <ResultCard key={`result-card-${i}`} title={data?.title} id={data?.id} url={data?.url} publishedDate={data?.publishedDate}/>
                            )
                        })}
                    </div>
                }
            </main>
        </>
    )
}

export default Home