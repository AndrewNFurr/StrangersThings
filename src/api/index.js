import axios from 'axios';

const setToken = (token) => {
    localStorage.setItem('auth-token', token);
}

const getToken = () => {
    return localStorage.getItem('auth-token');
}

export const setList = (userlist) => {
    localStorage.setItem('userlist', JSON.stringify(userlist))
}
export const getList = () => {
    let list = localStorage.getItem('userlist');
    return JSON.parse(list);
}

const BASE_URL = 'https://strangers-things.herokuapp.com/api/2007-LSU-RM-WEB-PT';

export async function registerUser(username, password) {
    try {
        const { data } = await axios.post(BASE_URL + '/users/register')
        setToken(data.token);
    } catch (error) {
        
    }
}

async function makePost(postData) {
    const userToken = getToken();

    axios.post(url, {
        data: {

        },
        header: {
            'Authorization': 'Bearer ' + userToken
        }
    })
}

export async function fetchPosts() {
    try {
        const { data } = await axios.get(`${ BASE_URL }/posts`);
        console.log(data);
        return data;
      } catch (error) {
        throw error;
      }
    }
