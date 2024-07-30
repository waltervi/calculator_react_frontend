import axios from "axios";
import { OperationRecord, OperationResponse } from "./types";

const API_BASE_URL = process.env.REACT_APP_API_URL;

console.log("process.env",process.env)

// Set withCredentials to true for all requests
//axios.defaults.withCredentials = true;

let tokenValue = ""
const config = {
    headers : {
      "token" : tokenValue,
      "Cookie" : "token=" + tokenValue
    }
 }
 


export const OperationAPI = {
  listAll : async() : Promise<OperationRecord[]>=> {
    const url = API_BASE_URL + "/v1/records";

    const response = await axios.get(url,config)
    return response.data.records;    
 
  },

  executeOperation : async (operation:string,operand1 : number|null, operand2 : number|null) : Promise<OperationResponse> =>  {
    const url = API_BASE_URL + "/v1/operations";
  
    const body = {
      operation: operation,
      operand1: operand1, 
      operand2: operand2
    };

    const response = await axios.post(url,body,config);
    return response.data;
  },

  deleteOperation : async (operationId:number) => {
    const url = API_BASE_URL + "/v1/records/" + operationId;
  
    return await axios.delete(url,config);
  }  
};

export const UserAPI = {
  loginUser : async (username : string, password:string) => {
    const url = API_BASE_URL + "/v1/auth/login";
    const body = {
      username: username,
      password: password
    };
  
    const response = await axios.post(url,body);

    config.headers.token = response.data.token;
    config.headers.Cookie = response.data.token;

    return response.data;
  },
  
  registerUser : async (username : string, password:string) => {
    const url = API_BASE_URL + "/v1/auth/register";
    const body = {
      username: username,
      password: password
    };
  
    const response = await axios.post(url,body);

    config.headers.token = response.data.token;
    config.headers.Cookie = response.data.token;

    return response.data;
  }
  
};