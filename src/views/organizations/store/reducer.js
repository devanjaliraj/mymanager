import { createSlice } from "@reduxjs/toolkit";

export const organizations = createSlice({
    name:'organizations',
    initialState:{
        myOrgs:[
        ]
    },
    reducers:{
        setOrgs: (state,action) =>{
            state.myOrgs = action?.payload
        }
    }
})

export const {setOrgs} = organizations?.actions

export default organizations.reducer


// {
//     name:'',
//     email:'',
//     contact:'',
//     address:'',
//     url:'',
//     isVerified:false
//     totals:{
//         users:0,
//     }
// }