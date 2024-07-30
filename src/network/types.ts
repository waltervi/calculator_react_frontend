import { Dispatch } from "react";

interface User {
    balance: number;
    userName: string;
}

interface OperationRecord {
    amount: number;
    date: string;
    deleted: boolean;
    id: number;
    operationId: number;
    operationType: string;
    operation_response: string;
    userBalance: number;
    userId: number;
}


interface OperationResponse {
    result: string;
    balance: number;
    errorMessage: string;
}


interface ApiError {
    errorMessage : string;
}

enum OperationEnum {
    ADDITION = "ADDITION",
    SUBSTRACTION = "SUBSTRACTION",
    MULTIPLICATION = "MULTIPLICATION",
    DIVISION = "DIVISION",
    SQUARE_ROOT = "SQUARE_ROOT",
    RANDOM_STRING = "RANDOM_STRING"
}

interface CalculatorState {
    balance?: number;
    firstOperand?: string;
    firstOperandIsNegative?: boolean;
    secondOperand?: string;
    currentText?: string;
    currentOperation?: OperationEnum;
    errorMessage?: string;
    operationStatus?: OperationStatus;
}

enum CalculatorActionEnum {
    SET_FIRST_OPERAND = "SET_FIRST_OPERAND",
    SET_SECOND_OPERAND = "SET_SECOND_OPERAND",

    CLEAN_VALUES = "CLEAN_VALUES",
    CLEAN_VALUES_ON_ERROR = "CLEAN_VALUES_ON_ERROR",
    CLEAN_VALUES_ON_SUCCESS = "CLEAN_VALUES_ON_SUCCESS",

    SET_CURRENT_OPERATION = "SET_CURRENT_OPERATION",
    SET_FIRST_OPERAND_NEGATIVE = "SET_FIRST_OPERAND_NEGATIVE"
    
}

enum OperationStatus {
    PROCESSED, IN_PROCESS
}

interface CalculatorAction {
    type: CalculatorActionEnum;
    payload?: CalculatorState;
}

interface CalculatorViewProps {
userLoggedIn : User;
}
  
interface OperandDto{
    useFirstOperand : boolean;
    operandValue?:string 
}

type CalculatorDispatcher = (value: CalculatorAction) => void;

export type { User ,OperationRecord, OperationResponse, ApiError}
export type { CalculatorAction ,CalculatorViewProps, CalculatorState,OperandDto}
export { CalculatorActionEnum, OperationEnum, OperationStatus}
export type {CalculatorDispatcher}