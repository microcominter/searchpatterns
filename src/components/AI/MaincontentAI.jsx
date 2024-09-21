import React, { useEffect, useRef } from 'react';
import '../../assets/css/mainai.css'
import { CloudDownload, Mic, Search } from 'react-bootstrap-icons';
import { setIsSidebarClosed } from '../../slices/query.js';
import RightBar from './RightBar.jsx';
import { IoIosSend } from 'react-icons/io';
const MainPageContent = ({query,setQuery,handleKeyPress,handleSearchClick,isSidebarClosed}) => {
    const inputRef2=useRef(null);

    
    useEffect(() => {
        if (inputRef2.current) {
            inputRef2.current.style.height = '48px';
            inputRef2.current.style.height = `${Math.min(inputRef2.current.scrollHeight, 300)}px`;
        }
      }, [query]);
    return (
        <>
        <div className="mainsection" style={{display:"flex",justifyContent:"center",alignItems:"center",width:isSidebarClosed? "-webkit-fill-available" : "1000px",flexDirection:"column" }}>
            {/* Uncommented div */}
            {/* <div className="home text-center"> */}
            {/* <h2>Search <b>Patterns</b></h2> */}
            <h3 style={{ fontSize: '80px', fontWeight: 100, marginTop: '0px', marginBottom: '10px',fontFamily:"Denton",color:'white' }}>Where <span style={{color:"#ff4102"}}>search</span> begins...</h3>
            <div className="search-bar" style={{width:"50rem",fontFamily:'gilroy'}}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    
                    {/* <input type="text" placeholder="Ask anything..."
                    cols={10} rows={10}
                    value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        style={{width:"inherit",textAlign:"left"}}
                        onKeyPress={handleKeyPress} /> */}
                         <textarea
                              ref={inputRef2}
                              className="search-input"
                              placeholder='Ask anything...'
                              value={query}
                              onChange={(e) => setQuery(e.target.value)}
                              onKeyPress={handleKeyPress}
                              style={{ height: '50px !important' }} // Set the fixed height here
                              />
               <div className='ms-2'><IoIosSend onClick={handleSearchClick} style={{color:'#ff4102', fontSize:'40px', cursor:'pointer',paddingRight:'10px'}} /></div>
                              </div>
            </div>
            {/* <p className="text-center">This code will display a prompt asking the user for their name, and then it will display a greeting message with the name entered by the user.</p> */}
            {/* <div className="prompts">
                <div className="prompt">
                <h3><CloudDownload/></h3>
                    <h4>Saved Prompt Templates</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                    <div className="prompt">
                    <h3><CloudDownload/></h3>
                    
                    <h4>Media Type Selection</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                    <div className="prompt">
                        <h3><CloudDownload/></h3>
                        
                        <h4>Multilingual Support</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        </div>
                        </div> */}
        </div>
                        {/* <RightBar/> */}
                
            {/* // <div className="search-bar">
            //         <div style={{ display: 'flex', alignItems: 'center' }}>
            //             <Mic />
            //             <input type="text" placeholder="Type Something..." />
            //         </div>
            //         <div><Search /></div>
            //     </div> */}
                        </>
    );
}

export default MainPageContent;