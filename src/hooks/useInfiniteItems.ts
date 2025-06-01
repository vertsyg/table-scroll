import { useInfiniteQuery } from '@tanstack/react-query';
import { getItems } from '../api/endpoints';

export const useInfiniteItems = () => {
    return useInfiniteQuery({
        queryKey: ['items'],
        queryFn: getItems,
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextPage,
    });
};