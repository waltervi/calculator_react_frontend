import { CalculatorActionEnum, OperationStatus, type CalculatorAction, type CalculatorState } from "../network/types";


const calculatorReducer  = (state: CalculatorState, action: CalculatorAction): CalculatorState => {
   // console.log("state", state)
    //console.log("action.payload", action.payload)
    const { type, payload } = action;

    let result: CalculatorState;

    switch (type) {
        case CalculatorActionEnum.SET_FIRST_OPERAND:
            result = {
                ...state,
                firstOperand: payload!.firstOperand,
                currentText: payload!.currentText!,
                errorMessage: undefined,
                operationStatus: payload!.operationStatus!
            }
            break;

        case CalculatorActionEnum.SET_SECOND_OPERAND:
            result = {
                ...state,
                secondOperand: payload!.secondOperand,
                currentText: payload!.currentText!,
                operationStatus: payload!.operationStatus!,
                errorMessage: undefined
            }
            break;


        case CalculatorActionEnum.SET_CURRENT_OPERATION:
            result = {
                ...state,
                firstOperand : payload!.firstOperand!,
                currentOperation : payload!.currentOperation!,
                currentText: payload!.currentText!
            }
            break;

        case CalculatorActionEnum.CLEAN_VALUES:
            result = {
                ...state,
                firstOperand: undefined,
                secondOperand: undefined,
                currentText: "",
                currentOperation: undefined,
                errorMessage: undefined,
                operationStatus: OperationStatus.PROCESSED,
                firstOperandIsNegative : false
            }
            break;

        case CalculatorActionEnum.CLEAN_VALUES_ON_ERROR:
            result = {
                ...state,
                firstOperand: undefined,
                secondOperand: undefined,
                currentText: "",
                currentOperation: undefined,
                errorMessage: payload!.errorMessage,
                operationStatus: OperationStatus.PROCESSED,
                firstOperandIsNegative : false
            }
            break;

        case CalculatorActionEnum.CLEAN_VALUES_ON_SUCCESS:
            result = {
                ...state,
                balance: payload!.balance!,
                firstOperand: payload!.firstOperand,
                secondOperand: undefined,
                currentOperation: undefined,
                currentText: payload!.currentText!,
                errorMessage: undefined,
                operationStatus: OperationStatus.PROCESSED,
                firstOperandIsNegative : false
            }
            break;

        case CalculatorActionEnum.SET_FIRST_OPERAND_NEGATIVE:
            result = {
                ...state,
                firstOperandIsNegative: payload!.firstOperandIsNegative!,
                currentText : payload!.currentText!,
            }
            break;

        default:
            result = state;
    }

    //console.log("result", result)
    return result
}

export default calculatorReducer