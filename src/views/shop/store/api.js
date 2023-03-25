import { customInterIceptors, publicInterIceptors } from "../../../lib/AxiosProvider";
const API = customInterIceptors();
const PUBLIC_API = publicInterIceptors();


export const createShop = (payload) =>{
    return API.post('/shop/create',payload)
}

export const getShop = () =>{
    return API.get('/shop/get')
}

export const editShop = (id,payload) => {
    return API.put(`/shop/update/${id}`,payload)
}

export const getShopPathValid = (path) => {
    return API.get(`/shop/check-shop-path/${path}`)
}

export const getPublicShop = (path) =>{
    return PUBLIC_API.get(`/shop/public/get/${path}`)
}