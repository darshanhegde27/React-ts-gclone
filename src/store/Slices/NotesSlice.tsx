import { createSlice, configureStore, Action } from '@reduxjs/toolkit'

interface Inotes{
    id:string,
    title:string|undefined,
    content:string
    pinned:boolean
}
const s:Inotes[]=[]
const counterSlice = createSlice({
  name: 'counter',
  initialState:s,
  reducers: {
    incremented: (state,action:) => {
      
    },
    decremented: state => {
      
    }
  }
})

export const { incremented, decremented } = counterSlice.actions