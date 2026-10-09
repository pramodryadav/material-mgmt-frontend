import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Collapse from '@mui/material/Collapse';


import useProduct from './hooks/useProduct';
import EnhancedTableHead from './components/EnhancedTableHead';
import ProductToolbar from './components/toolbar';
import AddProduct from './components/addProduct';
import useAddProduct from './hooks/useAddProduct';
import Loader from '../../components/Loader';
import { Button, Divider, TextField } from '@mui/material';
import useUpdateProduct from './hooks/useUpdateProduct';
import UpdateProduct from './components/updateProduct';




export default function EnhancedTable() {

  const {
    products,
    materials,
    grades,
    rows,
    orderBy,
    order,
    selected,
    rowsPerPage,
    page,
    age,
    open,
    handleClickOpen,
    handleClose,
    handleRequestSort,
    handleSelectAllClick,
    handleClick,
    handleChangePage,
    handleChangeRowsPerPage,
    visibleRows,
    emptyRows,
    loading,
    setLoading,
    fetchProduts,
    selectedProduct,
    selectedMaterial,
    handleChangeProduct,
    handleChangeMaterial,
    filterRow,
    clearFilter,
    edit,
    selectedRow,
    cancelEdit,
    handleChangeSearch,
    handleChangeBulkAction,
    bulkAction,
    resetBulkAction
  } = useProduct();


  const {
    formik
  } = useAddProduct(handleClose, setLoading, fetchProduts);

  const {
    updateFormik,
    handleBulkUpdate
  } = useUpdateProduct(setLoading, fetchProduts, selectedRow, cancelEdit, selected,bulkAction, resetBulkAction)

  console.log("updateFormik", updateFormik.errors);




  return (
    <>
      <Loader open={loading} />
      <div className='container' >

        <ProductToolbar
          handleClickOpen={handleClickOpen}
          age={age}
          handleChangeProduct={handleChangeProduct}
          handleChangeMaterial={handleChangeMaterial}
          selectedProduct={selectedProduct}
          selectedMaterial={selectedMaterial}
          products={products}
          materials={materials}
          grades={grades}
          filterRow={filterRow}
          clearFilter={clearFilter}
          handleChangeSearch={handleChangeSearch}
          rows={visibleRows}
          handleChangeBulkAction={handleChangeBulkAction}
          handleBulkUpdate={handleBulkUpdate}
          bulkAction={bulkAction}
        />
        <Paper sx={{ width: '100%' }}>

          <TableContainer>
            <Table
              sx={{ width: "100%" }}
              aria-labelledby="tableTitle"

            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = selected.includes(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  console.log("row", row);

                  return (
                    <>
                      {selectedRow?._id !== row._id && <TableRow
                        hover
                        onClick={(event) => handleClick(event, row._id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row._id}
                        selected={isItemSelected}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {`${row.product.name} ${row.grade.name}  ${row.material.name}`}
                        </TableCell>
                        <TableCell align="center">
                          <Button onClick={(e) => edit(e, row)}>Quick Edit</Button>
                          <Button>Add Product Details</Button>
                        </TableCell>
                        <TableCell align="right">{row?.description}</TableCell>
                        <TableCell align="right">{row?.price}</TableCell>

                      </TableRow>}
                      <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                          <Collapse in={selectedRow?._id === row._id} timeout="auto" unmountOnExit>
                            <UpdateProduct
                              formik={updateFormik}
                              cancel={cancelEdit}
                              row={row}
                              materials={materials}
                            />
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

        </Paper>
      </div>

      <AddProduct
        open={open}
        handleClose={handleClose}
        products={products}
        grades={grades}
        materials={materials}
        formik={formik}


      />

    </>

  );
}
