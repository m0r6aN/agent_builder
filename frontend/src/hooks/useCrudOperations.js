// useCrudOperations.js
import axios from 'axios';

const useCrudOperations = (url) => {
    const addItem = async (item) => {
        try {
            await axios.post(url, item);
        } catch (error) {
            console.error('Failed to add item:', error);
        }
    };

    const deleteItem = async (id) => {
        try {
            await axios.delete(`${url}/${id}`);
        } catch (error) {
            console.error('Failed to delete item:', error);
        }
    };

    const updateItem = async (id, updatedItem) => {
        try {
            await axios.put(`${url}/${id}`, updatedItem);
        } catch (error) {
            console.error('Failed to update item:', error);
        }
    };

    return { addItem, deleteItem, updateItem };
};

export default useCrudOperations;
