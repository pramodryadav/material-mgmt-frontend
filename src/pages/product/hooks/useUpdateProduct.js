import { useFormik } from 'formik';
import * as Yup from "yup";
import { updateProduct } from "../../../services/product"; // Ensure updateProduct is imported

const useUpdateProduct = (setLoading, fetchProduts, selectedRow, cancelEdit, selected, bulkAction,resetBulkAction) => {
    const formik = useFormik({
        initialValues: {
            product: selectedRow?.product?._id || '',
            material: JSON.stringify(selectedRow?.material) || '',
            grade: selectedRow?.grade?._id || '',
            price: selectedRow?.price || '',
            length: selectedRow?.length || '',
            thickness: selectedRow?.thickness || '',
            shape: selectedRow?.shape || '',
            currency: selectedRow?.currency || 'INR',
            unit: selectedRow?.unit || 'KG',
            description: selectedRow?.description || ""
        },
        enableReinitialize: true, // Ensures form updates when selectedRow changes
        validationSchema: Yup.object().shape({
            currency: Yup.string().required("Currency is required"),
            price: Yup.number().required("Price is required"),
            length: Yup.number().required("length is required"),
            thickness: Yup.number(),
            shape: Yup.string().required("Shape is required"),
            unit: Yup.string().required("Unit is required"),
        }),
        onSubmit: async (values) => {
            if (!selectedRow?._id) {
                console.error("No product ID found for update");
                return;
            }

            try {
                let material = JSON.parse(values.material);

                setLoading(true);
                await updateProduct(selectedRow._id, { ...values, material: material?._id }); // Pass ID for update
                setLoading(false);
                fetchProduts();
                cancelEdit();
            } catch (error) {
                console.error("Update failed:", error);
                setLoading(false);
            }
        },
    });

    console.log("bulkEdits", selected);


    const handleBulkUpdate = async () => {
        try {
            switch (bulkAction) {
                case "edit":
                    if (selected.length === 0) {
                        alert("Please select rows to update");
                        return
                    }
                    // 🔹 Validate Formik fields before updating
                    const isValid = await formik.validateForm();
                    if (Object.keys(isValid).length > 0) {
                        console.error("Validation failed:", isValid);
                        alert("Please Edit a row before bulk edit.");
                        return;
                    }
                    setLoading(true);
                    // Parse the material object from Formik values
                    let material = JSON.parse(formik.values.material);

                    // Update each selected product using Promise.all for parallel execution
                    await Promise.all(
                        selected.map(async (productId) => {
                            await updateProduct(productId, { ...formik.values, material: material?._id });
                        })
                    );

                    setLoading(false);
                    fetchProduts(); // Refresh product list
                    cancelEdit(); // Exit edit mode
                    resetBulkAction();
                    break;

                default:
                    alert("Select an action")
                    break;
            }

        } catch (error) {
            console.error("Bulk Update failed:", error);
            setLoading(false);
        }
    };

    return {
        updateFormik: formik,
        handleBulkUpdate
    };
};

export default useUpdateProduct;
