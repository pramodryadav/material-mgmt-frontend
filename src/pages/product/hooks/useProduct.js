import React, { useState, useEffect } from 'react';
import { fetchGrades, fetchProducts, fetchMaterials, listProducts } from '../../../services/product';

function descendingComparator(a, b, orderBy) {
    console.log(a,"a");
    console.log("b",b);
    console.log("orderBy",b[orderBy]);
   
    
    if (b[orderBy]?.name < a[orderBy]?.name) {
        return -1;
    }
    if (b[orderBy]?.name > a[orderBy]?.name) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

const useProduct = () => {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('products');
    const [selected, setSelected] = useState([]);
    const [products, setProducts] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [grades, setGrades] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [age, setAge] = useState('');
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState("");
    const [selectedMaterial, setSelectedMaterial] = useState("");
    const [isFilter, setIsFilter] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [bulkAction,setBulkAction] = useState('');

    const handleChangeProduct = (e) => {
        setSelectedProduct(e.target.value)
    }
    const handleChangeMaterial = (e) => {
        setSelectedMaterial(e.target.value)
    }


    useEffect(() => {
        fetchAllData()
    }, []);

    useEffect(() => {
        fetchProduts()
    }, [])

    const fetchProduts = async () => {
        try {
            setLoading(true);
            const res = await listProducts();
      
            setRows(res);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    const fetchAllData = async () => {
        try {
            setLoading(true);
            const [data_products, data_materials, data_grades] = await Promise.all([
                fetchProducts(),
                fetchMaterials(),
                fetchGrades(),

            ]);
            setLoading(false)

            setProducts(data_products);
            setMaterials(data_materials);
            setGrades(data_grades)

        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false)
            throw error;
        }
    };

console.log("selected",selected);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
  
    const handleRequestSort = (event, property) => {
        console.log("property",property);
        
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n._id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

  
    // Filter rows based on isFilter state
    const filteredRows = React.useMemo(() => {
        return rows.filter((row) => {
            // Ensure product and material exist before accessing properties
            const productName = row?.product?.name?.toLowerCase() || "";
            const materialName = row?.material?.name?.toLowerCase() || "";
    
            const matchesFilter =
                !isFilter || (
                    (selectedProduct ? productName.includes(selectedProduct.toLowerCase()) : true) &&
                    (selectedMaterial ? materialName.includes(selectedMaterial.toLowerCase()) : true)
                );
    
            // Search across all string fields (including nested ones)
            const matchesSearch = searchQuery
                ? Object.values(row)
                    .flatMap(value => 
                        typeof value === "object" && value !== null
                            ? Object.values(value)  // Extract nested values (e.g., row.product.name)
                            : value
                    )
                    .some(value => 
                        typeof value === "string" && value.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                : true;
    
            return matchesFilter && matchesSearch;
        });
    }, [rows, isFilter, selectedProduct, selectedMaterial, searchQuery]);
    
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;


    const visibleRows = React.useMemo(
        () => [...filteredRows].sort(getComparator(order, orderBy)),
        [order, filteredRows, orderBy],
    );

    const filterRow = () => {
        setIsFilter(true)
    }

    const clearFilter = () => {
        setIsFilter(false);
        setSelectedProduct("")
        setSelectedMaterial("")
    }

    const edit = (e, row) => {
        e.stopPropagation();
        if (selectedRow) { setSelectedRow(null) } else {
            setSelectedRow(row)
        }
    }

    const cancelEdit = (e) => {

        if (e) {
            e.stopPropagation();
        }

        setSelectedRow(null)
    }

    const handleChangeSearch = (e) => {
        setSearchQuery(e.target.value)
    }

    const handleChangeBulkAction = (e) => {
        setBulkAction(e.target.value)
    }

    const resetBulkAction = () => {
        setBulkAction("")
    }


    return {
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
    }
}

export default useProduct;