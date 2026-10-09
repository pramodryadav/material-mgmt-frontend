import React from 'react';
import PropTypes from 'prop-types';
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';

const headCells = [
  {
    id: 'product',
    numeric: false,
    disablePadding: true,
    label: 'Products',
  },
  {
    id: 'actions',
    numeric: true,
    disablePadding: false,
    label: 'Actions',
  },
  {
    id: 'description',
    numeric: true,
    disablePadding: false,
    label: 'Product Detail',
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'Price in Unit',
  }
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  console.log("orderBy", orderBy);

  return (
    <TableHead >
      <TableRow sx={{ backgroundColor: "#41a0c5" }}>
        <TableCell padding="checkbox" >
          <Checkbox
            sx={{ color: "#fff" }}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
           sx={{color:"#fff"}}
          >
            {headCell.id === "product" ? ( //Show sorting arrow only for 'product'
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
               
              >
                <span  style={{ color: "#fff" }}>{headCell.label}</span>
                {orderBy === headCell.id ? (
                  <Box  component="span" sx={visuallyHidden}>
                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label 
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}


EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default EnhancedTableHead