import { createToast } from '../toast';
import { GENERIC_ERROR_MSG } from '../constants';
import { MutationCache, QueryCache } from "@tanstack/vue-query";

export const vueQueryConfig = {
    queryClientConfig: {
        defaultOptions: {
            queries: {
                retry: 0
            },
            mutations: {
                retry: 0
            }
        },
        queryCache: new QueryCache({
            onError: err => {
                console.error(err)

                createToast(GENERIC_ERROR_MSG, true)
            }
        }),
        mutationCache: new MutationCache({
            onError: err => {
                console.error(err)

                createToast(GENERIC_ERROR_MSG, true)
            }
        })
    }
} as const