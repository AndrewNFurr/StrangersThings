import axios from 'axios';

const BASE_URL =
  "https://strangers-things.herokuapp.com/api/2007-LSU-RM-WEB-PT";

export const getToken = () => {
  return localStorage.getItem("auth-token");
};

export const clearToken = () => {
  localStorage.removeItem("auth-token");
};

const setToken = (token) => {
    localStorage.setItem("auth-token", token);
  };

export function makeHeaders() {
    if (getToken()) {
        return  {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${ getToken() }` 
            }
    } else return {
            "Content-Type": "application/json", 
        }
    }


export const makeUserPost = async(title, description, price) => {
    const response = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${ getToken() }`
        },
        body: JSON.stringify({
          post: {
            title: title,
            description: description,
            price: price
          },
        }),
      });

      const data = await response.json();
      return data;
}

export async function getUser() {
  const { data } = await axios.get(`${BASE_URL}/users/me`, {
  headers: makeHeaders(),
})
    
    return data
}

export async function getPosts() {
    try {
        const { data } = await axios.get(`${BASE_URL}/posts`);
        return data;
    } catch(error) {
        throw error;
    }
}
 
  export const auth = async (username, password, isNew = false) => {
    const url = `${BASE_URL}/users` + (isNew ? "/register" : "/login");
  
    const response = await fetch(url, {
      method: "POST",
      headers: makeHeaders(),
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
        },
      }),
    });
  
    const { error, data } = await response.json();
  
    if (error) {
      throw Error(error.message);
    }
  
    if (data && data.token) {
      setToken(data.token);
    }
  
    return data;
  };
  
  export const hitAPI = async (method, endpoint, bodyObj) => {
    const payload = {
      method: method,
      headers: makeHeaders(),
    };
  
    if (bodyObj) {
      payload.body = JSON.stringify(bodyObj);
    }
  
    const response = await fetch(`${BASE_URL}${endpoint}`, payload);
  
    const { error, data } = await response.json();
  
    /*if (error) {
      throw Error(error.message);
    } */
  
    if (data && data.token) {
      setToken(data.token);
    }
  
    return data;
  };


  export const createMessage = async(content, id) => {
    const response = await fetch(`${BASE_URL}/posts/${id}/messages`, {
        method: "POST",
        headers: makeHeaders(),
        body: JSON.stringify({
          message: {
            content: content
          },
        }),
      });

      const data = await response.json();
      console.log(data);
      return data;
}