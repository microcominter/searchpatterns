import { createSlice } from "@reduxjs/toolkit";


// const [loggedin,setLoggedin]=useState(false);
// const [user,setUser]=useState(null);
// const [loading,setLoading]=useState(true);

export const slice = createSlice({
  name: 'searchdata',
  initialState: {
    chartsLoading:false,
    loading:false,
    suggestions:null,
    prepositions:null,
    comparisons:null,
    alphabet:null,
    hasSearched:false,
    useCustomPrompt:false,
    searchCount:0,
    isVisible:false,
    articles:[],
    selectedTopic: 'General'
  },
  reducers: {
    setchartsLoading:(state,action)=>{
        
        state.chartsLoading=action.payload;
    },
    setLoading:(state,action)=>{
      
        state.loading=action.payload;
    },
    setSuggestions:(state,action)=>{
        
        state.suggestions=action.payload;
    },
    setPrepositions:(state,action)=>{
       
        state.prepositions=action.payload;
    },
    setcomparison:(state,action)=>{
        state.comparisons=action.payload;
    },
    setAlphabet:(state,action)=>{
        state.alphabet=action.payload;
    },
    setHasSearched:(state,action)=>{
       
        state.hasSearched=action.payload;
    },
    setUseCustomPrompt:(state,action)=>{
        state.useCustomPrompt=action.payload;
        },
    setSearchCount:(state,action)=>{
        state.searchCount=action.payload
    },
    setIsVisible:(state,action)=>{
        state.isVisible=action.payload
    },
    setArticles:(state,action)=>{
        state.articles=action.payload
    },
    setSelectedTopic: (state, action) => {
        state.selectedTopic = action.payload;
    }
  },
});

export const { setSelectedTopic,setArticles,setLoading,setAlphabet,setPrepositions,setSuggestions,setcomparison,setchartsLoading,setHasSearched ,setUseCustomPrompt,setSearchCount,setIsVisible} = slice.actions;


// export const {movItems,showItems} =  slice.maindata;

export default slice.reducer;
