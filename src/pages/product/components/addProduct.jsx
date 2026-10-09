import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Divider, Typography } from '@mui/material';

const AddProduct = ({
  open,
  handleClose,
  products,
  grades,
  materials,
  formik
}) => {

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth="md"
      fullWidth

    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Add Products
      </DialogTitle>
      <Typography sx={{
        position: 'absolute',
        right: 50,
        top: 16,
      }}>{formik.values.grade.length}/{products.length} products selected </Typography>
      <IconButton
        aria-label="close"
        onClick={() => { handleClose(); formik.resetForm() }}
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <form onSubmit={formik.handleSubmit} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: "10px" }}>


          <Box className="option-card">
            <Typography>Products</Typography>
            {formik.errors.product && formik.touched.product ? (
              <Typography sx={{ padding: "0 1rem" }} variant='caption' color="error">{formik.errors.product}</Typography>
            ) : null}
            <Divider />
            <ul>
              {
                products.map((product) => {
                  return <li
                    className={`${product?._id === formik.values.product ? "selectedItem" : ""} `}
                    key={product?._id}
                    onClick={() => formik.setFieldValue("product", product._id)}
                  >
                    <span>{product.name}</span>
                   { (product?._id === formik.values.product && formik.values.grade.length>0 )&& <span>{`(${formik.values.grade.length})`}</span>}
                  </li>
                })
              }
            </ul>
          </Box>
          <Box className="option-card">
            <Typography>Materials</Typography>
            {formik.errors.material && formik.touched.material ? (
              <Typography sx={{ padding: "0 1rem" }} variant='caption' color='error'>{formik.errors.material}</Typography>
            ) : null}
            <Divider />
            <ul>
              {
                materials.map((material) => {
                  return <li
                    className={`${material?._id === formik.values.material ? "selectedItem" : ""} `}
                    key={material?._id}
                    onClick={() => formik.setFieldValue("material", material._id)}
                  >
                
                    <span>{material.name}</span>
                   { (material?._id === formik.values.material && formik.values.grade.length>0) &&<span>{`(${formik.values.grade.length})`}</span>}
                  </li>
                })
              }
            </ul>
          </Box>
          <Box className="option-card">
            <Typography>Grades</Typography>
            {formik.errors.grade && formik.touched.grade ? (
              <Typography sx={{ padding: "0 1rem" }} variant='caption' color='error'>{formik.errors.grade}</Typography>
            ) : null}
            <Divider />
            <ul >
              {
                grades.map((grade) => {

                  const isItemSelected = formik.values.grade.find((id) => id === grade._id);

                  return <li
                    className={`grade-list-item ${isItemSelected ? "selectedItem" : ""} `}
                    key={grade?._id}
                    onClick={() => {
                      const updatedGrades = isItemSelected
                        ? formik.values.grade.filter((id) => id !== grade._id) // Remove if already selected
                        : [...formik.values.grade, grade._id]; // Add if not selected
                      formik.setFieldValue("grade", updatedGrades); // ✅ Update Formik state
                    }}
                  >
                    <span>{grade.name}</span>
                    <input
                      type="checkbox"
                      onChange={() => { }}
                      checked={isItemSelected}
                    />
                  </li>
                })
              }
            </ul>
          </Box>
        </form>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button variant='contained' autoFocus onClick={() => {
          formik.handleSubmit()
        }}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddProduct