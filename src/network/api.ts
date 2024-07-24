import axios from "axios";
import { OperationRecord } from "./types";

export const OperationAPI = {
  listAll : async() : Promise<OperationRecord[]>=> {
    const url = "/v1/records";

    const response = await axios.get(url)
    return response.data.records;    
 
  },

  executeOperation : async (operation:string,operand1 : number|null, operand2 : number|null) => {
    const url = "/v1/operations";
  
    const body = {
      operation: operation,
      operand1: operand1, 
      operand2: operand2
    };

    const response = await axios.post(url,body);
    return response.data;
  },

  deleteOperation : async (operationId:number) => {
    const url = "/v1/records/" + operationId;
  
    return await axios.delete(url);
  }  
};

export const UserAPI = {
  loginUser : async (username : string, password:string) => {
    const url = "/v1/auth/login";
    const body = {
      username: username,
      password: password
    };
  
    const response = await axios.post(url,body);
    return response.data;
  },
  
  registerUser : async (username : string, password:string) => {
    const url = "/v1/auth/register";
    const body = {
      username: username,
      password: password
    };
  
    const response = await axios.post(url,body);
    return response.data;
  }
  
};