export const CONFIG = {
    baseURL: "http://localhost:5000/api",
    endpoints: {
        "get-porducts": "/product/fetch",
        "get-materials": "/material/fetch",
        "get-grades": "/grade/fetch",
        "add-product": "/product-combination/create",
        "list-product":"/product-combination/list",
        "update-product":"/product-combination/update/:id"
    }
}