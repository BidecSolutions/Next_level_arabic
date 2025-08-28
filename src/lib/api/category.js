import axiosClient from './axiosClient';

export const categoriesApi = {
  getAllCategories: (categoryId) =>
    categoryId
      ? axiosClient.get(`/category?status=1&parent_id=${categoryId}`)
      : axiosClient.get('/category'),
};
