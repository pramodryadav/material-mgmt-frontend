import apiClient from "../apiClient";
import { CONFIG } from "../config";
const API_ENDPOINTS = CONFIG.endpoints;
// Fetch products
export const fetchProducts = async () => {
    try {
        const response = await apiClient.get(API_ENDPOINTS["get-porducts"]);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Fetch materials
export const fetchMaterials = async () => {
    try {
        const response = await apiClient.get(API_ENDPOINTS["get-materials"]);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Fetch grades
export const fetchGrades = async () => {
    try {
        const response = await apiClient.get(API_ENDPOINTS["get-grades"]);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// add product-combination

export const addProduct = async (data = {}) => {
    try {
        const response = await apiClient.post(API_ENDPOINTS["add-product"], data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateProduct = async (id, data = {}) => {
    try {
        const response = await apiClient.post(API_ENDPOINTS["update-product"].replace(":id", id), data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const listProducts = async () => {
    try {
        const response = await apiClient.get(API_ENDPOINTS["list-product"]);
        return response.data;
    } catch (error) {
        throw error;
    }
};



