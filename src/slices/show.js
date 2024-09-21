import { createSlice } from "@reduxjs/toolkit";
import { setPrepositions } from "./search.js";

export const slice=createSlice({
    name:"showvariables",
    initialState:{
        showQuestions:true,
        showPrepositions:false,
        showComparison:false,
        showQuestionsTable:true,
        showPrepositionsTable:false,
        showComparisonTable:false,
    },
    reducers:{
        setShowQuestions:(state,action)=>{
            state.showQuestions=action.payload;
            },
        setShowPrepositions:(state,action)=>{
            state.showPrepositions=action.payload;
        },
        setShowComparison:(state,action)=>{
            state.showComparison=action.payload;
        },
        setShowQuestionsTable:(state,action)=>{
            state.showQuestionsTable=action.payload;
        },
        setShowPrepositionsTable:(state,action)=>{
            state.showPrepositionsTable=action.payload;
            },
            setShowComparisonTable:(state,action)=>{
                state.showComparisonTable=action.payload;
                }
                
        
        
            
    }
})
    export const {setShowQuestions,setShowPrepositions,setShowComparison,setShowComparisonTable,setShowPrepositionsTable,setShowQuestionsTable}=slice.actions;
    export default slice.reducer;
