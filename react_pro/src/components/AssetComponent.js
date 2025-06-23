// import React, { useState } from 'react'


// import {createAsset, updateeAsset} from '../services/AssetService'
// import { useNavigate,useParams} from 'react-router-dom'
// function AssetComponent() {
  
//     const [name,setName]=useState('')
//     const [type,setType]=useState('')
//     const [installationDate,setInstallationDate]=useState('')
//     const [status,setStatus]=useState('');
    
//     const navigator = useNavigate();
//    const{assetId} = useParams();

//     function handleAssetName(e){
//         setName(e.target.value)
//         console.log("we are getting",name)
//     }
//     function handleAssetType(e){
//         setType(e.target.value)
//     }
//     function handleInstallationDate(e){
//         setInstallationDate(e.target.value)
//     }
//     function handleStatus(e){
//         setStatus(e.target.value)
//     }
//     function saveandupdateAsset(e){
//         e.preventDefault();
//         const asset = {name,type,installationDate,status}
//         if(assetId){
//         try{
//           updateeAsset(assetId,asset).then((response) =>{
//             console.log(response.data);
//             navigator('/assets');
//           });
//         }catch(error){

//           };
//         }else{
//           try {
//            console.log(asset)
//           createAsset(asset).then((response)=>{
//               console.log(response.data);
//               navigator('/assets');
//           } );
//         }catch (error) {
            
//           };
              
//              // alert(response.data);
        
//         }
        
//       }
//     function pageTitle(){
//       if(assetId){
//         return  <h2 className='text-center'>update Asset</h2>
//       }else{
//         <h2 className='text-center'>Add Asset</h2>
//       }
//     }
      
      
  
//   return (
//     <div className='container'>
//         <div className='row'>
//           <div className='card'>
//              {
//               pageTitle()
//              }
//               <div className='card-body'>
//                          <form >
//                            <div className='form-group mb-2'>
//                             <label className='form-label'>Asset name</label>
//                             <input
//                               type='text'
//                               placeholder='enter the asset name'
//                               name='AssetName'
//                               value={name}
//                               className='form-control'
//                               onChange={handleAssetName}
//                              >

//                              </input>
//                            </div>
//                            <div className='form-group mb-2'>
//                             <label className='form-label'>Asset type</label>
//                             <input
//                               type='text'
//                               placeholder='enter the asset type'
//                               name='AssetType'
//                               value={type}
//                               className='form-control'
//                               onChange={handleAssetType}
//                              >

//                              </input>
//                            </div>

//                            <div className='form-group mb-2'>
//                             <label className='form-label'>Asset installtionDate</label>
//                             <input
//                               type='text'
//                               placeholder='enter the asset installtionDate'
//                               name=' installationDate'
//                               value={installationDate}
//                               className='form-control'
//                               onChange={handleInstallationDate}
//                              >

//                              </input>
//                            </div>

//                            <div className='form-group mb-2'>
//                             <label className='form-label'>Asset status</label>
//                             <input
//                               type='text'
//                               placeholder='enter the asset status'
//                               name='Assetstatus'
//                               value={status}
//                               className='form-control'
//                               onChange={handleStatus}
//                              >

//                              </input>
//                            </div>
//                         <button className='btn btn-success' onClick={saveandupdateAsset}>Submit</button>
                       
                       
//                          </form>
//               </div>


//           </div>

//         </div>



//     </div>
//   )
// }

// export default AssetComponent;

import React, { useState } from 'react';
import { createAsset, updateeAsset } from '../services/AssetService';
import { useNavigate, useParams } from 'react-router-dom';

function AssetComponent() {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [installationDate, setInstallationDate] = useState('');
  const [status, setStatus] = useState('');

  const navigator = useNavigate();
  const { assetId } = useParams();

  function handleAssetName(e) {
    setName(e.target.value);
  }

  function handleAssetType(e) {
    setType(e.target.value);
  }

  function handleInstallationDate(e) {
    setInstallationDate(e.target.value);
  }

  function handleStatus(e) {
    setStatus(e.target.value);
  }

  function saveandupdateAsset(e) {
    e.preventDefault();
    const asset = { name, type, installationDate, status };

    if (assetId) {
      try {
        updateeAsset(assetId, asset).then((response) => {
          console.log(response.data);
          navigator('/assets');
        });
      } catch (error) {
        console.error('Error updating asset:', error);
      }
    } else {
      try {
        console.log(asset);
        createAsset(asset).then((response) => {
          console.log(response.data);
          navigator('/assets');
        });
      } catch (error) {
        console.error('Error creating asset:', error);
      }
    }
  }

  function pageTitle() {
    if (assetId) {
      return <h2 className='text-center'>Update Asset</h2>;
    } else {
      return <h2 className='text-center'>Add Asset</h2>;
    }
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='card'>
          {pageTitle()}
          <div className='card-body'>
            <form>
              <div className='form-group mb-2'>
                <label className='form-label'>Asset Name</label>
                <input
                  type='text'
                  placeholder='Enter the asset name'
                  name='AssetName'
                  value={name}
                  className='form-control'
                  onChange={handleAssetName}
                />
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Asset Type</label>
                <input
                  type='text'
                  placeholder='Enter the asset type'
                  name='AssetType'
                  value={type}
                  className='form-control'
                  onChange={handleAssetType}
                />
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Installation Date</label>
                <input
                  type='date'
                  name='installationDate'
                  value={installationDate}
                  className='form-control'
                  onChange={handleInstallationDate}
                />
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Asset Status</label>
                <select
                  name='AssetStatus'
                  value={status}
                  className='form-control'
                  onChange={handleStatus}
                >
                  <option value=''>Select Status</option>
                  <option value='Active'>Active</option>
                  <option value='Inactive'>Inactive</option>
                </select>
              </div>

              <button className='btn btn-success' onClick={saveandupdateAsset}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssetComponent;
