import { toast } from 'react-toastify';
import * as api from './api';
import { setShopReducer } from './reducer';




export const createShopAction =(payload) =>async (dispatch) =>{
    try {
        const {data} = await api.createShop(payload);
        if(data.success === true){
            dispatch(setShopReducer(data.data))
            toast.success("Shop created successfully")

        }
        else{
            toast.error("An error occured please try again")
        }
    } catch (error) {
        
    }
}

export const editShopAction =(id,payload) =>async (dispatch) =>{
    try {
        const {data} = await api.editShop(id,payload);
        if(data.success === true){
            dispatch(getShopAction())
            toast.success("Shop Updated successfully")

        }
        else{
            toast.error("An error occured please try again")
        }
    } catch (error) {
        
    }
}

export const getShopAction = () =>async (dispatch) =>{
    try {
        const {data} = await api.getShop()
        if(data){
            dispatch(setShopReducer(data[0] || {}))
        }
    } catch (error) {
        
    }
}

export const getIsValidPath = (path) =>async (dispatch) =>{
    try {
        const {data} = await api.getShopPathValid(path)
     
        return data;
    } catch (error) {
        
    }
}

export const getPublicShopAction = (path) =>async (dispatch) =>{
    try {
        const {data} = await api.getPublicShop(path)
        if(data){
            dispatch(setShopReducer(data[0] || {}))
        }
    } catch (error) {
        
    }
}