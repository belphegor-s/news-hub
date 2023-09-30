import { obj } from "@/types/global";

export enum SortFormat {
    ASCENDING = 'asc',
    DESCENDING = 'desc'
}

const sortByDate = (data: obj[], format: SortFormat) => {
    return data.sort((a, b) => {
        const dateA = new Date(a.publishedDate);
        const dateB = new Date(b.publishedDate);

        if(format === SortFormat.ASCENDING) {
            return dateA.getTime() - dateB.getTime();
        } else {
            return dateB.getTime() - dateA.getTime();
        }
    });
}

export default sortByDate