import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
const ProductToolbar = ({
    handleClickOpen,
    age,
    products,
    materials,
    selectedProduct,
    selectedMaterial,
    handleChangeProduct,
    handleChangeMaterial,
    filterRow,
    clearFilter,
    handleChangeSearch,
    handleBulkUpdate,
    handleChangeBulkAction,
    bulkAction
}) => {


    return (
        <>
            <div className='addProductContainer' >
                <Box sx={{ alignSelf: "center" }}>
                    <Button onClick={handleClickOpen} sx={{ borderRadius: "25px" }} startIcon={<AddIcon />} variant='contained'>Add Products</Button>
                </Box>
                <span className='product-count' style={{ alignSelf: "center" }}>280/400 Products</span>
            </div>
            <div style={{display:"flex",flexWrap:"nowrap"}}>
                <input onChange={handleChangeSearch} className='searchBar' type="text" /><button className='searchBtn'>Search</button>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", rowGap:"10px", columnGap: "10px", }}>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedProduct}
                    sx={{ maxWidth: 300,width:"100%", height: 35, backgroundColor: "#fff" }}
                    displayEmpty
                    onChange={handleChangeProduct}
                >
                    <MenuItem value="" disabled>
                        Products
                    </MenuItem>
                    {
                        products.map((product) => {
                            return <MenuItem key={product?._id} value={product?.name}>{product?.name}</MenuItem>
                        })
                    }

                </Select>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedMaterial}
                    sx={{ maxWidth: 300,width:"100%", height: 35, backgroundColor: "#fff" }}
                    displayEmpty
                    onChange={handleChangeMaterial}
                >
                    <MenuItem value="" disabled>
                        Materials
                    </MenuItem>

                    {
                        materials.map((material) => {
                            return <MenuItem key={material?._id} value={material?.name}>{material?.name}</MenuItem>
                        })
                    }

                </Select>
                <Button onClick={filterRow} sx={{ borderRadius: "25px", height: "35px", maxWidth: "100px" }} startIcon={<FilterAltIcon />} variant='contained'>Filter</Button>

                <Button onClick={clearFilter} sx={{ borderRadius: "25px", height: "35px", maxWidth: "100px" }} startIcon={<FilterAltOffIcon />} variant='contained'>Clear</Button>

                <div style={{ marginLeft: "50px", display: "flex", justifyContent: "space-between", columnGap: "10px" }}>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={bulkAction}
                        sx={{ maxWidth: 200,width:"100%", height: 35, backgroundColor: "#fff" }}
                        displayEmpty

                        onChange={handleChangeBulkAction}

                    >
                        <MenuItem value="" disabled>
                            Bulk Action
                        </MenuItem>
                        <MenuItem value="edit">Edit</MenuItem>

                    </Select>
                    <Button onClick={handleBulkUpdate} sx={{ borderRadius: "25px", height: "35px", }} variant='contained'>Apply</Button>
                </div>
                <div style={{ marginLeft: "50px", display: "flex", flexGrow: "1", justifyContent: "flex-end", columnGap: "10px" }}>
                    <p style={{ alignSelf: "center" }}>Products</p>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={"25"}
                        sx={{ maxWidth: 100,width:"100%", height: 35, backgroundColor: "#fff" }}
                        displayEmpty

                    >
                        <MenuItem value="25" selected>25</MenuItem>
                    
                    </Select>

                </div>
            </div>
        </>
    )
}

export default ProductToolbar