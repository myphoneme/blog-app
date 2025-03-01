const API_BASE_URL = "http://fastapi.phoneme.in";

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "API request failed");
  }
  return response.json();
};

// Authentication API
export const authAPI = {
  login: async (username, password) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    return handleResponse(response);
  },
};

// Users API
export const usersAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/users`);
    return handleResponse(response);
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`);
    return handleResponse(response);
  },

  create: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  update: async (id, userData) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "DELETE",
    });
    return handleResponse(response);
  },
};

// Categories API
export const categoriesAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/categories`);
    return handleResponse(response);
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`);
    return handleResponse(response);
  },

  create: async (categoryData) => {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    });
    return handleResponse(response);
  },

  update: async (id, categoryData) => {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: "DELETE",
    });
    return handleResponse(response);
  },
};

// Posts API
export const postsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/posts`);
    return handleResponse(response);
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`);
    return handleResponse(response);
  },

  getByCategory: async (categoryId) => {
    const response = await fetch(
      `${API_BASE_URL}/get_posts_by_category_id/${categoryId}`
    );
    return handleResponse(response);
  },

  create: async (postData) => {
    // Handle FormData for image upload
    const formData = new FormData();
    Object.entries(postData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: "POST",
      body: formData, // Don't set Content-Type header, browser will set it with boundary
    });
    return handleResponse(response);
  },

  update: async (id, postData) => {
    // Handle FormData for image upload
    const formData = new FormData();
    Object.entries(postData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: "PUT",
      body: formData,
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: "DELETE",
    });
    return handleResponse(response);
  },

  search: async (query) => {
    try {
      // This is a mock implementation. Replace with actual API call
      const response = await fetch(
        `/api/posts/search?q=${encodeURIComponent(query)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error searching posts:", error);
      throw error;
    }
  },
};

// Export all APIs
export default {
  auth: authAPI,
  users: usersAPI,
  categories: categoriesAPI,
  posts: postsAPI,
};
