import {
  get,
  patch,
  put,
  deleteApi,
  post,
  fetchApi
} from "../helpers/apiRequest";

export const getInfoWeb = req => {
  return fetchApi("/info", req);
};

export const updateInfoWeb = body => {
  return patch("/info", body);
};

export const updateLogo = body => {
  return put("/logo", body);
};

export const deleteLogo = () => {
  return deleteApi("/logo");
};

export const getAllBanner = req => {
  return fetchApi("/banner", req);
};

export const createBanner = body => {
  return post("/banner", body);
};

export const deleteBanner = id => {
  return deleteApi(`/banner/${id}`);
};

export const getBannerById = (id, req) => {
  return fetchApi(`/banner/${id}`, req);
};

export const updateBanner = (id, body) => {
  return put(`/banner/${id}`, body);
};

export const getCategoryBlog = req => {
  return fetchApi("/blog/category", req);
};

export const createCategoryBlog = body => {
  return post("/blog/category", body);
};

export const deleteCategoryBlog = id => {
  return deleteApi(`/blog/category/${id}`);
};

export const getCategoryBlogById = id => {
  return get(`/blog/category/${id}`);
};

export const updateCategoryBlog = (id, body) => {
  return put(`/blog/category/${id}`, body);
};

export const getAllBlog = (filter, req) => {
  return fetchApi(`/blog?page=${filter.page}&limit=${filter.limit}`, req);
};

export const getBlogById = (id, req) => {
  return fetchApi(`/blog/id/${id}`, req);
};

export const getBlogBySlug = (slug, req) => {
  return fetchApi(`/blog/${slug}`, req);
};

export const createBlog = body => {
  return post("/blog", body);
};

export const deleteBlog = id => {
  return deleteApi(`/blog/${id}`);
};

export const updateBlog = (id, body) => {
  return put(`/blog/${id}`, body);
};

export const getAllCategoryProduct = req => {
  return fetchApi(`/product/category`, req);
};

export const deleteCategoryProduct = id => {
  return deleteApi(`/product/category/${id}`);
};

export const createCategoryProduct = body => {
  return post(`/product/category`, body);
};

export const getCategoryProductById = (id, req) => {
  return fetchApi(`/product/category/${id}`, req);
};

export const updateCatgoryProduct = (id, body) => {
  return put(`/product/category/${id}`, body);
};

export const getAllPartner = req => {
  return fetchApi(`/partner`, req);
};

export const createPartner = body => {
  return post(`/partner`, body);
};

export const deletePartner = id => {
  return deleteApi(`/partner/${id}`);
};

export const getPartnerById = (id, req) => {
  return fetchApi(`/partner/${id}`, req);
};

export const updatePartner = (id, body) => {
  return put(`/partner/${id}`, body);
};

export const getAllProduct = (filter, req) => {
  let query = Object.entries(filter)
    .map(([key, val]) => `${key}=${val}`)
    .join("&");
  return fetchApi(`/product?${query}`, req);
};

export const deleteProduct = id => {
  return deleteApi(`/product/${id}`);
};

export const createProduct = body => {
  return post(`/product`, body);
};

export const getProductById = (id, req) => {
  return fetchApi(`/product/id/${id}`, req);
};

export const getProductBySlug = (slug, req) => {
  return fetchApi(`/product/${slug}`, req);
};

export const updateProduct = (id, body) => {
  return put(`/product/${id}`, body);
};

export const deleteProductImage = (id, index) => {
  return deleteApi(`/product/${id}/image?index=${index}`);
};

export const getProductSale = req => {
  return fetchApi(`/product?page=${1}&limit=${16}&saleProduct=true`, req);
};

export const getProductNew = req => {
  return fetchApi(`/product?page=${1}&limit=${5}&newProduct=true`, req);
};

export const getProductHot = req => {
  return fetchApi(`/product?page=${1}&limit=${16}&hotProduct=true`, req);
};

export const getAllBannerAdvertising = req => {
  return fetchApi("/banner?isSlider=false", req);
};

export const getAllBannerHome = req => {
  return fetchApi("/banner?isSlider=true", req);
};

export const getAllTestimonial = req => {
  return fetchApi("/testimonial", req);
};

export const createTestimonial = body => {
  return post("/testimonial", body);
};

export const deleteTestimonial = id => {
  return deleteApi(`/testimonial/${id}`);
};

export const updatedTestimonial = (id, body) => {
  return put(`/testimonial/${id}`, body);
};

export const getTestimonialById = (id, req) => {
  return fetchApi(`/testimonial/${id}`, req);
};

export const getAllMenu = req => {
  return fetchApi(`/menu`, req);
};

export const getMenuById = (id, req) => {
  return fetchApi(`/menu/${id}`, req);
};

export const createMenu = body => {
  return post("/menu", body);
};

export const updatedMenu = (id, body) => {
  return put(`/menu/${id}`, body);
};

export const deleteMenu = id => {
  return deleteApi(`/menu/${id}`);
};

export const getAllVideo = (filter, req) => {
  return fetchApi(`/video?page=${filter.page}&limit=${filter.limit}`, req);
};

export const getVideoById = (id, req) => {
  return fetchApi(`/video/${id}`, req);
};

export const createVideo = body => {
  return post("/video", body);
};

export const updatedVideo = (id, body) => {
  return put(`/video/${id}`, body);
};

export const deleteVideo = id => {
  return deleteApi(`/video/${id}`);
};
export const getAllPage = req => {
  return fetchApi(`/page`, req);
};

export const createPage = body => {
  return post("/page", body);
};

export const getPageById = id => {
  return fetchApi(`/page/${id}`);
};

export const updatePage = (id, body) => {
  return put(`/page/${id}`, body);
};

export const deletePage = id => {
  return deleteApi(`/page/${id}`);
};
