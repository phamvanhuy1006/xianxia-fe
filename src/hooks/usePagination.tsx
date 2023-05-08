import { useCallback, useEffect, useMemo, useState } from "react";
import { usePaginationQuery } from "src/services/pagination";
import { SORT_DIRECTION } from "src/shared/constants";
import { PaginationMeta } from "src/shared/models/table.model";

function usePagination<T>(endpoint: string, params?: Record<string, unknown>) {
  const [meta, setMeta] = useState<PaginationMeta>({
    pageIndex: 0,
    pageSize: 10,
    sortBy: [],
  });

  const [_params, setParams] = useState(params);

  const { data, isFetching, ...queryResult } = usePaginationQuery(
    { url: endpoint, params: { ...meta, ..._params, ...params } },
    {
      skip: !endpoint,
    }
  );

  useEffect(() => {
    if (!data) return;
    const hasMore =
      data?.meta?.pagination?.current_page <
      data?.meta?.pagination?.total_pages;
    if (hasMore) {
      //   queryClient.prefetchQuery([endpoint, { page: meta.page + 1, per_page: meta.per_page }])
    }
  }, [data, endpoint, meta]);

  const handleChangePagination = useCallback(
    (paginationMeta: PaginationMeta) => {
      const clonePaginationMeta = JSON.parse(JSON.stringify(paginationMeta));
      const { sortBy } = clonePaginationMeta;
      const _sortBy =
        sortBy?.length > 0
          ? {
              sortColumn: sortBy[0]?.id,
              sortDirection: sortBy[0]?.[SORT_DIRECTION.DESC]
                ? SORT_DIRECTION.DESC
                : SORT_DIRECTION.ASC,
            }
          : undefined;
      delete clonePaginationMeta?.sortBy;
      setMeta({ ...clonePaginationMeta, ..._sortBy });
    },
    []
  );

  const handleChangeParams = useCallback((newParams: any) => {
    setParams(newParams);
  }, []);

  const paginationData = useMemo(
    () => ({
      data: data?.content?.items || [],
      pageCount: data?.content?.totalItemCount,
      loading: isFetching,
      handleChangePagination,
    }),
    [data, isFetching, handleChangePagination]
  );

  return { paginationData, handleChangeParams, ...queryResult };
}

export { usePagination };
