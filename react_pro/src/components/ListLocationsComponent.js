// import React, { useEffect, useState } from 'react';
 
// import { ListLocations } from '../services/AssetService';
 
// function ListLocationsComponent() {
//   const [locations, setLocations] = useState([]);
 
 
//   useEffect(() => {
//     ListLocations()
//       .then((response) => {
//         console.log(response.data);
//         setLocations(response.data);
//         // alert(JSON.stringify(locations));
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);
 
 
 
 
//   return (
//     <div className="container">
//       <h2>List of Locations</h2>
     
//       <table className="table table-striped table-bordered">
//         <thead>
//           <tr>
//             <th>Location ID</th>
//             <th>Region</th>
//             <th>Site Code</th>
//             <th>Asset ID</th>
           
//           </tr>
//         </thead>
//         <tbody>
         
//           {locations.map((location) => (
//             <tr key={location.locationId}>
//               <td>{location.locationId}</td>
//               <td>{location.region}</td>
//               <td>{location.siteCode}</td>
//               <td>{location.asset.assetId}</td>
             
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
 
// export default ListLocationsComponent;
 
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListLocations } from '../services/AssetService';
 
function ListLocationsComponent() {
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();
 
  useEffect(() => {
    ListLocations()
      .then((response) => {
        console.log(response.data);
        setLocations(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
 
  const handleAddLocation = () => {
    navigate('/add-location'); // Make sure this route exists in your router
  };
 
  return (
    <div className="container">
      <h2 className="text-center">List of Locations</h2>
 
      <div className="row mb-3">
        <button className="btn btn-primary" onClick={handleAddLocation}>
          Add New Location
        </button>
      </div>
 
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Location ID</th>
            <th>Region</th>
            <th>Site Code</th>
            <th>Asset ID</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location) => (
            <tr key={location.locationId}>
              <td>{location.locationId}</td>
              <td>{location.region}</td>
              <td>{location.siteCode}</td>
              <td>{location.asset ? location.asset.assetId : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
 
export default ListLocationsComponent;
 
 