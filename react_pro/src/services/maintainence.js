import axios from 'axios';



export const Listmaintainence = () => axios.get('http://localhost:8090/api/maintenance-plans/${planId}');


export const createmaintainence = (maintainence) => axios.post('http://localhost:8090/api/maintenance-plans',maintainence);

export const updateemaintainence=(planId,maintainence)=>axios.put('http://localhost:8090/api/maintenance-plans'+ '/' + planId,maintainence)
