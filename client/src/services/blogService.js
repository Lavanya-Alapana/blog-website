import api from '../config/api';

class BlogService {
  async createBlog(blogData) {
    const response = await api.post('/blogs', blogData);
    return response.data;
  }

  async getAllBlogs(params = {}) {
    const response = await api.get('/blogs', { params });
    return response.data;
  }

  async getBlog(id) {
    const response = await api.get(`/blogs/${id}`);
    return response.data;
  }

  async updateBlog(id, blogData) {
    const response = await api.put(`/blogs/${id}`, blogData);
    return response.data;
  }

  async deleteBlog(id) {
    const response = await api.delete(`/blogs/${id}`);
    return response.data;
  }

  async getMyBlogs(params = {}) {
    const response = await api.get('/blogs/user/my-blogs', { params });
    return response.data;
  }

  async toggleLike(id) {
    const response = await api.post(`/blogs/${id}/like`);
    return response.data;
  }

  async getBlogStats() {
    const response = await api.get('/blogs/user/stats');
    return response.data;
  }
}

export default new BlogService();
