import Loader from "@/components/Loader";
import styles from "@/styles/results/result.module.scss";
import { obj } from "@/types/global";
import axiosPost from "@/utils/axiosPost";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Result = () => {
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState<obj>();
    const router = useRouter();
    const id = router.query?.id;

    useEffect(() => {
        if(id) {
            (async () => {
                 try {
                    const response = await axiosPost(`/api/get-content`, {
                        id,
                    });

                    if(response && response?.status === 200) {
                        toast.success(response.data?.msg, {
                            toastId: 'fetch-success'
                        });
                        setContent(response.data?.data[0])
                    } else {
                        toast.error(response.data?.msg, {
                            toastId: 'fetch-error'
                        });
                    }
                } catch(e) {
                    console.error(`Error making request -> `, e);
                    toast.error('Something went wrong! Please try again.');
                } finally {
                    setLoading(false);
                }
            })()
        }
    }, [id]);

    return (
        <main className={'container ' + styles.main}>
            <button className="btn" onClick={() => Router.push('/')}>Go back</button>
            <div className={styles.content}>
                {loading ? <Loader/> :
                    <>
                        <h2>{content?.title ?? ''}</h2>
                        <br />
                        <div className="small-italic">(Extract)</div>
                        <div dangerouslySetInnerHTML={{ __html: content?.extract }}/>
                    </>
                }
            </div>
        </main>
    )
}

export default Result