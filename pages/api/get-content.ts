import metaphor from "@/config/metaphor";
import { obj } from "@/types/global";
import { NextApiRequest, NextApiResponse } from "next";
import validObj from "@/utils/validObj";

export default async function getContent(req: NextApiRequest, res: NextApiResponse) {
    let success = false, msg = '', data: obj = {}, status = 200;

    if(req.method === 'POST') {
        try {
            const id = (req.body?.id && typeof req.body?.id === 'string' && req.body?.id?.trim()) || '';
            
            if(!id) {
                status = 422;
                msg = 'ID is invalid!'
                throw new Error(msg);
            }

            data = await metaphor.getContents([id]);

            if(data?.contents && Array.isArray(data?.contents) && data?.contents?.length > 0) {
                data = data?.contents;
                success = true;
                msg = 'Successfully fetched content for URL';
            }
        } catch(e) {
            console.error(`Error occured in serverless function getContent -> `, e);
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