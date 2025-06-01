import {
  DataGrid,
  type GridColDef,
  GridLoadingOverlay,
  useGridApiRef,
} from "@mui/x-data-grid";
import { useInfiniteItems } from "../../hooks/useInfiniteItems.ts";
import { useEffect, useMemo } from "react";
import { Box, LinearProgress } from "@mui/material";
import debounce from "lodash.debounce";

const columns: GridColDef[] = [
  {
    field: "title",
    headerName: "Название",
    headerAlign: "left",
    flex: 1,
    sortable: true,
  },
  {
    field: "category",
    headerName: "Категория",
    headerAlign: "left",
    flex: 1,
    sortable: true,
  },
  {
    field: "price",
    headerName: "Цена",
    headerAlign: "left",
    flex: 1,
    type: "number",
    sortable: true,
    renderCell: ({ row }) => <>{row.price != null ? `${row.price} ₽` : ""}</>,
  },
  {
    field: "inStock",
    headerName: "В наличии",
    headerAlign: "left",
    flex: 1,
    type: "boolean",
    renderCell: (params) => (params.value ? "Да" : "Нет"),
    sortable: true,
  },
];

export const DataTable = () => {
  const { data, fetchNextPage, isFetching } = useInfiniteItems();
  const allRows = useMemo(
    () => data?.pages.flatMap((page) => page.items) || [],
    [data]
  );
  const gridApiRef = useGridApiRef();

  useEffect(() => {
    const gridRootEl = gridApiRef.current?.rootElementRef?.current;
    if (!gridRootEl) return;

    const scrollContainer = gridRootEl.querySelector(
      ".MuiDataGrid-virtualScroller"
    );
    if (!scrollContainer) return;

    const handleScroll = debounce(() => {
      const { scrollTop, scrollHeight, clientHeight } =
        scrollContainer as HTMLElement;
      const nearBottom = scrollTop + clientHeight >= scrollHeight - 200;

      if (nearBottom && !isFetching) {
        fetchNextPage();
      }
    }, 300);

    scrollContainer.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
      handleScroll.cancel();
    };
  }, [fetchNextPage, isFetching, gridApiRef]);

  return (
    <Box style={{ height: 600, width: "500px" }}>
      <DataGrid
        apiRef={gridApiRef}
        rows={allRows}
        columns={columns}
        getRowId={(row) => row.id.toString()}
        loading={isFetching}
        disableColumnFilter
        disableColumnMenu
        disableRowSelectionOnClick
        slots={{ loadingOverlay: GridLoadingOverlay }}
        sx={{
          "& .MuiDataGrid-cell": {
            whiteSpace: "normal",
            wordWrap: "break-word",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f5f5f5",
          },
        }}
      />
      {isFetching && <LinearProgress />}
    </Box>
  );
};
