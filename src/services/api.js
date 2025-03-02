const API_BASE_URL = "/api";

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
    if (!response.ok) throw new Error("Failed to fetch categories");
    return response.json();
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`);
    if (!response.ok) throw new Error("Failed to fetch category");
    return response.json();
  },

  create: async (data) => {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to create category");
    return response.json();
  },

  update: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update category");
    return response.json();
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete category");
    return response.json();
  },
};

// Posts API
export const postsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/posts`);
    if (!response.ok) throw new Error("Failed to fetch posts");
    return response.json();
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`);
    if (!response.ok) throw new Error("Failed to fetch post");
    return response.json();
  },

  getByCategory: async (categoryId) => {
    const response = await fetch(
      `${API_BASE_URL}/get_posts_by_category_id/${categoryId}`
    );
    if (!response.ok) throw new Error("Failed to fetch posts by category");
    return response.json();
  },

  create: async (formData) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    try {
      // Log the FormData contents for debugging
      console.log("Sending FormData contents:");
      for (let pair of formData.entries()) {
        console.log(pair[0] + ":", pair[1] instanceof File ? pair[1].name : pair[1]);
      }

      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formData,
      });

      // Log the response status and headers for debugging
      console.log("Response status:", response.status);
      console.log("Response headers:", Object.fromEntries(response.headers.entries()));

      let errorData = null;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        try {
          errorData = await response.json();
        } catch (e) {
          console.error("Failed to parse error response:", e);
        }
      } else {
        try {
          errorData = { message: await response.text() };
        } catch (e) {
          console.error("Failed to read error response:", e);
        }
      }

      if (!response.ok) {
        console.log("Error response data:", errorData);

        if (response.status === 401) {
          throw new Error("Unauthorized. Please log in again.");
        }
        if (response.status === 403) {
          throw new Error("Permission denied. Please check your access rights.");
        }
        if (response.status === 422) {
          const errorMessage = errorData?.detail 
            ? (Array.isArray(errorData.detail) 
                ? errorData.detail.map(err => `${err.loc.join('.')}: ${err.msg}`).join(', ')
                : errorData.detail)
            : "Invalid input data";
          throw new Error(errorMessage);
        }
        if (response.status === 500) {
          const errorMessage = errorData?.message || "Server error. Please try again later.";
          console.error("Server Error Details:", errorData);
          throw new Error(errorMessage);
        }
        
        throw new Error(errorData?.message || `Server error: ${response.status}`);
      }

      return errorData || await response.json();
    } catch (error) {
      console.error("API Error:", error);
      if (error.message === "Failed to fetch") {
        throw new Error("Network error. Please check your connection and try again.");
      }
      throw error;
    }
  },

  update: async (id, formData) => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: "PUT",
      body: formData,
    });
    if (!response.ok) throw new Error("Failed to update post");
    return response.json();
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete post");
    return response.json();
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
