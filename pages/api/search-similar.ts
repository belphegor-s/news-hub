import metaphor from "@/config/metaphor";
import { obj } from "@/types/global";
import { NextApiRequest, NextApiResponse } from "next";
import validObj from "@/utils/validObj";

export default async function searchSimilar(req: NextApiRequest, res: NextApiResponse) {
    let success = false, msg = '', data: obj = {}, status = 200;

    if(req.method === 'POST') {
        try {
            const url = (req.body?.url && typeof req.body?.url === 'string' && req.body?.url?.trim()) || '',
                numOfResults = (req.body?.numOfResults && typeof req.body?.searchQuery === 'string' && req.body?.numOfResults > 0 && parseInt(req.body?.numOfResults)) || 10;
            
            if(!url) {
                status = 422;
                msg = 'URL is invalid!'
                throw new Error(msg);
            }


            data = await metaphor.findSimilar(url, {
                numResults: numOfResults,
            });

            if(data?.results && Array.isArray(data?.results) && data?.results?.length > 0) {
                data = data?.results;
                success = true;
                msg = 'Successfully fetched results for similar URL';
            }
        } catch(e) {
            console.error(`Error occured in serverless function searchSimilar -> `, e);
            msg = msg || 'Internal server error!';
        } finally {
            res.status(status).json({ success, msg, ...validObj(data) ? { data } : {}});
        }
    } else {
        status = 400;
        msg = 'Method not allowed!'
        res.status(status).json({ success, msg })
    }
}