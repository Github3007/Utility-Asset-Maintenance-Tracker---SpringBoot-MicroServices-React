import React,{useEffect, useState} from 'react'
import {ListAssets} from '../services/AssetService'
import { useNavigate } from 'react-router-dom'
 
function ListAssetsComponent() {
     
const [assets,setAssets]= useState([])
const navigator= useNavigate();
useEffect(()=>{
    ListAssets().then((response) =>{
      console.log(response.data);
        setAssets(response.data);
    }).catch(error=>{
        console.error(error);
    })
},[])
function addNewAsset(){
  navigator('/add-asset')
}
 function UpdateAsset(assetId){
  navigator(`/update-Asset/${assetId}`)
 }
 function getLocation(){
  navigator('/locations')
 }
  return (
    <div className="container">
  <h2>list of assets</h2>
  <button className='btn btn-primary' onClick={addNewAsset}>add asset</button>
  <button className='btn btn-primary' onClick={getLocation}>location</button>
  <table className='table table-striped table-bordered'>
    <thead>
        <tr>
            <th>asset id</th>
            <th>asset name</th>
            <th>asset type</th>
            <th>asset date</th>
            <th>asset status</th>
            <th>action</th>
 
           
        </tr>
    </thead>
    <tbody>
       {
       assets.map(asset =>
            <tr key={asset.assetId}>
            <td>{asset.assetId}</td>
            <td>{asset.name}</td>
            <td>{asset.type}</td>
            <td>{asset.installationDate}</td>
            <td>{asset.status}</td>
            <td>
              <btn className='btn btn-success' onClick={()=>UpdateAsset(asset.assetId)}>update</btn>
              </td>
            </tr>
        )
       }
    </tbody>
  </table>
    </div>
  )
}
 
export default ListAssetsComponent
 