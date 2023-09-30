import { obj } from "@/types/global"

const validObj = (object: obj) => {
    return Object.keys(object)?.length > 0;
}

export default validObj