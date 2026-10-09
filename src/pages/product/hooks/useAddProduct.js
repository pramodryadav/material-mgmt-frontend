import { useState } from "react";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { addProduct } from "../../../services/product";

const useAddProduct = (handleClose,setLoading,fetchProduts) => {


    const formik = useFormik({

        initialValues: {
            product: '',
            material: '',
            grade: [],
        },
        validationSchema: Yup.object().shape({
            product: Yup.string().required("Product is required"),
            material: Yup.string().required("Material is required"),
            grade: Yup.array()
                .of(Yup.string().required("Invalid grade")) // Ensures each item is a valid string
                .min(1, "At least one grade must be selected") // Ensures at least one grade is selected
                .required("Grade is required"),
        }),
        onSubmit: values => {
            createProduct(values)
        },

    })


    const createProduct = async (values) => {
        try {
            const params = {
                product: values.product,
                material: values.material,
                grade: values.grade
            }
            setLoading(true);
            const res = await addProduct(params);
            setLoading(false)
            handleClose();
            fetchProduts()
        } catch (error) {
            setLoading(false)
        }
    }



    return {

        formik,


    }
}

export default useAddProduct