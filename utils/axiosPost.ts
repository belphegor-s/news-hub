import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export default async function axiosPost (url: string, payload?: any, options?: AxiosRequestConfig<any>) {
    let response;
    try {
        response = await axios.post(url, payload, options);
    } catch (error: any) {
        response = error?.response;
        console.log(`An error has occurred in axiosPost for url -> ${url} status -> ${response?.status}`);
    } finally {
        return response;
    }
}