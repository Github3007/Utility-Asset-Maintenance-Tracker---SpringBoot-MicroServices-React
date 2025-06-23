import axios from 'axios';

const REST_API_BASE_URL='http://localhost:8090/api/assets';

export const ListAssets = () => axios.get(REST_API_BASE_URL);



export const createAsset = (asset) => axios.post(REST_API_BASE_URL,asset);



export const updateeAsset=(assetId,asset)=>axios.put(REST_API_BASE_URL + '/' + assetId,asset);

export const ListLocations = () => axios.get('http://localhost:8090/api/assets/alllocations');