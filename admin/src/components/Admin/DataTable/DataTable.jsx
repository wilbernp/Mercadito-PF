import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

export default function DataTable({setOrder, setFilter, rowCount, rows, columns, loading, sx, setPage, setPageSize, pageSize, page }) {

  // pageSize = productsPerPage
  // page = currentPage
  return (
    <Box sx={{ height: 400, width: 1 }}>

      <DataGrid
        filterMode="server"
         onFilterModelChange={(e)=>setFilter(e.quickFilterValues[0]||"")}
        components={{ Toolbar: GridToolbar }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}

        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        page={page}
        onPageChange={(newPage) => setPage(newPage)}
        rows={rows}
        columns={columns}
        loading={loading}
        sx={sx}
        checkboxSelection
        rowCount={rowCount}
        pagination
        paginationMode="server"
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[2, 5, 10]}

        sortingMode="server"
  onSortModelChange={(e)=>setOrder(e[0]||{field:"",sort:""})}
      />
    </Box>
  );
}






// import { DataGrid,  } from '@mui/x-data-grid';
// import { useDemoData } from '@mui/x-data-grid-generator';

// const VISIBLE_FIELDS = ['name', 'rating', 'country', 'dateCreated', 'isAdmin'];

// export default function QuickFilteringGrid() {
//   const { data } = useDemoData({
//     dataSet: 'Employee',
//     visibleFields: VISIBLE_FIELDS,
//     rowLength: 100,
//   });

//   // Otherwise filter will be applied on fields such as the hidden column id
//   const columns = React.useMemo(
//     () => data.columns.filter((column) => VISIBLE_FIELDS.includes(column.field)),
//     [data.columns],
//   );

//   return (
//     <Box sx={{ height: 400, width: 1 }}>
//       <DataGrid
//         {...data}
//         disableColumnFilter
//         disableColumnSelector
//         disableDensitySelector
//         columns={columns}
//         components={{ Toolbar: GridToolbar }}
//         componentsProps={{
//           toolbar: {
//             showQuickFilter: true,
//             quickFilterProps: { debounceMs: 500 },
//           },
//         }}
//       />
//     </Box>
//   );
// }
