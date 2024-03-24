import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from 'jwt-decode'
 
const initialState ={
    _id:'',
    token:''
}
const extractuserinfo=(token)=>{
    try {
        const decodetoken=jwtDecode(token);

        console.log(decodetoken)
        return{
            _id:decodetoken.id
        }
    } catch (error) {
        
        return{
            _id:''
        }
    }
}
export const userslice=createSlice({
    name:'userdata',
    initialState,
    reducers:{
        addtoken:(state,action)=>{
            console.log("slice ahcla")
           state.token=action.payload
           const {_id}=extractuserinfo(action.payload)
        //    console.log(_id)
            state._id=_id
        },
        resetstate:()=>initialState
    }
})

export const {addtoken}=userslice.actions
export default userslice.reducer