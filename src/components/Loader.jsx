import React from 'react'
import ReactLoading from 'react-loading'; 
import { useSelector } from 'react-redux';
import { RingLoader } from 'react-spinners';

export default function Loader({type,color}) {

  const loading=useSelector((state)=> state.searchdata.loading);

  return (
    <>
    {loading && (<div style={{ display: "flex",justifyContent:"center",marginTop:"1rem"}}>
    {/* <ReactLoading type='spin' color='#ffffff' height={'5%'} width={'5%'} /> */}
    <RingLoader color='white' />
    </div>)}
    </>
  )
}
