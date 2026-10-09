import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Divider } from '@mui/material';


const UpdateProduct = ({ row, formik, cancel, materials }) => {
   
    
    return (
        <form onSubmit={formik.handleSubmit} style={{ margin: 1, display: "flex", flexDirection: "column", rowGap: 1 }}>
            <Typography variant="h6" gutterBottom component="div">
                Quick Edit
            </Typography>
            <Box sx={{ display: "flex" }}>
                <Typography sx={{ alignSelf: "center", flexGrow: 1 }}>Title {`${row.product.name} ${row.grade.name}  ${row.material.name}`}</Typography>
                <Box sx={{ position: "relative", flexGrow: 2, }}>
                    <div>


                        <Typography sx={{ alignSelf: "center", mr: 2 }}>Price </Typography>

                        <select
                            value={formik.values.currency}
                            name="currency"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={{ borderRight: "none", borderRadius: "30px 0 0 30px", backgroundColor: "#fff", height: "30px" }}
                        >
                            {["INR", "EUR", "USD", "GBP"].map((currency) => {
                                return <option value={currency}>{currency}</option>
                            })}
                        </select>
                        <input
                            style={{ paddingLeft: "1rem", height: "30px" }}
                            type="text"
                            name="price"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.price}
                        />

                        <select

                            value={formik.values.unit}
                            name="unit"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={{ width: "75px", backgroundColor: "#333", color: "#fff", position: "absolute", left: "190px", borderRadius: "30px", height: "30px" }}
                        >
                            <option value="" disabled>Unit</option>
                            {["KG"].map((unit) => {
                                return <option value={unit}>{unit}</option>
                            })}
                        </select>
                    </div>
                    {formik.errors.price && formik.touched.price ? (
                        <Typography sx={{ padding: "0 1rem" }} variant='caption' color="error">{formik.errors.price}</Typography>
                    ) : null}

                </Box>
            </Box>
            <Divider sx={{mt:2,mb:2}} />
            <Typography>Product Detail</Typography>
            <Box sx={{ display: "flex", mt: 2 }}>
                <Box sx={{ display: "flex", columnGap: "60px", width: { lg: "33%" } }}>
                    <Typography >Material</Typography>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formik.values.material}
                        name="material"
                        sx={{ borderRadius: "20px", width: "60%", height: 35, backgroundColor: "#fff" }}
                        displayEmpty
                        fullWidth
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    >
                        <MenuItem value="" disabled>
                            Materials
                        </MenuItem>

                        {
                            materials.map((material) => {
                                return <MenuItem key={material?._id} value={JSON.stringify(material)}>{material?.name}</MenuItem>
                            })
                        }

                    </Select>
                </Box>
                <Box sx={{ width: { lg: "33%" } }}>
                    <div style={{ display: "flex", columnGap: "20px", }}>
                        <Typography sx={{ alignSelf: "center" }}>Shape</Typography>
                        <input
                            type="text"
                            name="shape"
                            onBlur={formik.handleBlur}
                            value={formik.values.shape}
                            onChange={formik.handleChange}
                            style={{ border: "1px solid #bdbbbb", borderRadius: "20px", padding: "0 1rem", width: "60%", height: 35, }}
                        />
                    </div>
                    {formik.errors.shape && formik.touched.shape ? (
                        <Typography sx={{ padding: "0 1rem" }} variant='caption' color="error">{formik.errors.shape}</Typography>
                    ) : null}
                </Box>
                <Box sx={{ width: { lg: "33%" } }}>
                    <div style={{ display: "flex", columnGap: "20px", }}>
                        <Typography sx={{ alignSelf: "center" }}>Length</Typography>
                        <input
                            type="text"
                            name="length"
                            onBlur={formik.handleBlur}
                            value={formik.values.length}
                            onChange={formik.handleChange}
                            style={{ border: "1px solid #bdbbbb", borderRadius: "20px", padding: "0 1rem", width: "60%", height: 35, }}
                        />
                    </div>
                    {formik.errors.length && formik.touched.length ? (
                        <Typography sx={{ padding: "0 1rem" }} variant='caption' color="error">{formik.errors.length}</Typography>
                    ) : null}
                </Box>
            </Box>
            <Box sx={{ display: "flex", mt: 2, mb: 2 }}>
                <Box sx={{ display: "flex", columnGap: "40px", width: { lg: "33%" } }}>

                    <Typography >Thickness</Typography>
                    <input
                        type="text"
                        name="thickness"
                        onBlur={formik.handleBlur}
                        value={formik.values.thickness}
                        onChange={formik.handleChange}
                        style={{ border: "1px solid #bdbbbb", borderRadius: "20px", padding: "0 1rem", width: "60%", height: 35, }}
                    />
                </Box>
                <Box sx={{ display: "flex", columnGap: "40px", width: { lg: "33%" } }}>

                    <Typography >Description</Typography>
                    <textarea
                        type="text"
                        name="description"
                        rows="4"
                        onBlur={formik.handleBlur}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        style={{ border: "1px solid #bdbbbb", borderRadius: "8px", padding: "0 1rem", width: "60%" }}
                    />
                </Box>

            </Box>
            <Box display="flex" columnGap={2} sx={{mb:2}}>

                <Button type="submit" variant='contained'>Update</Button>
                <Button variant='outlined' onClick={(e) => cancel(e)}>Cancel</Button>
            </Box>
        </form>
    )
}

export default UpdateProduct