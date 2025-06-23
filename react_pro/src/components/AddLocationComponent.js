// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { createLocation } from '../services/AssetService'; // Make sure this service exists
 
// function AddLocationComponent() {
//   const [region, setRegion] = useState('');
//   const [siteCode, setSiteCode] = useState('');
//   const [assetId, setAssetId] = useState('');
 
//   const navigate = useNavigate();
 
//   const handleSubmit = (e) => {
//     e.preventDefault();
 
//     const location = {
//       region,
//       siteCode,
//       asset: { assetId: parseInt(assetId) } // assuming backend expects an Asset object with ID
//     };
 
//     createLocation(location)
//       .then((response) => {
//         console.log('Location created:', response.data);
//         navigate('/locations'); // redirect to location list
//       })
//       .catch((error) => {
//         console.error('Error creating location:', error);
//       });
//   };
 
//   return (
//     <div className="container">
//       <h2 className="text-center">Add New Location</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group mb-3">
//           <label>Region</label>
//           <input
//             type="text"
//             className="form-control"
//             value={region}
//             onChange={(e) => setRegion(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group mb-3">
//           <label>Site Code</label>
//           <input
//             type="text"
//             className="form-control"
//             value={siteCode}
//             onChange={(e) => setSiteCode(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group mb-3">
//           <label>Asset ID</label>
//           <input
//             type="number"
//             className="form-control"
//             value={assetId}
//             onChange={(e) => setAssetId(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-success">Save Location</button>
//       </form>
//     </div>
//   );
// }
 
// export default AddLocationComponent;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
 
function AddLocationComponent() {
  const [region, setRegion] = useState('');
  const [siteCode, setSiteCode] = useState('');
  const [assetId, setAssetId] = useState('');
 
  const navigate = useNavigate();
 
  const handleSubmit = (e) => {
    e.preventDefault();
 
    const location = {
      region,
      siteCode
    };
 
    axios.post(`http://localhost:8090/api/assets/location/${assetId}`, location)
      .then((response) => {
        console.log('Location saved:', response.data);
        navigate('/locations'); // redirect to location list
      })
      .catch((error) => {
        console.error('Error saving location:', error);
        alert('Failed to save location. Please check asset ID and try again.');
      });
  };
 
  return (
    <div className="container">
      <h2 className="text-center">Add New Location</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Region</label>
          <input
            type="text"
            className="form-control"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Site Code</label>
          <input
            type="text"
            className="form-control"
            value={siteCode}
            onChange={(e) => setSiteCode(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Asset ID</label>
          <input
            type="number"
            className="form-control"
            value={assetId}
            onChange={(e) => setAssetId(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">Save Location</button>
      </form>
    </div>
  );
}
 
export default AddLocationComponent;
 
 