import { AxiosError } from "axios";
import { OperationAPI } from "../network/api";
import { ApiError, CalculatorActionEnum, CalculatorDispatcher, CalculatorState, OperandDto, OperationEnum, OperationStatus } from "../network/types";

const Helper = {
    getOperandValue(calcState: CalculatorState): OperandDto {
        const useFirstOperand = calcState.currentOperation === undefined;

        let operandValue = useFirstOperand ? calcState.firstOperand : calcState.secondOperand;

        //operandValue = operandValue === undefined ? "0" : operandValue;

        return {
            useFirstOperand: useFirstOperand,
            operandValue: operandValue
        };
    },

    containsDot(operandValue?: string): boolean {
        if( operandValue === undefined){
            return false;
        }
        return operandValue.indexOf(".") >= 0;
    },

    getSignToShow(op: OperationEnum) {
        let sign: string = "";
        switch (op) {
            case OperationEnum.ADDITION:
                sign = "+";
                break
            case OperationEnum.SUBSTRACTION:
                sign = "-";
                break
            case OperationEnum.DIVISION:
                sign = "/";
                break
            case OperationEnum.MULTIPLICATION:
                sign = "*";
                break

        }
        return sign;

    },

}

const FirstOperandHelper = {
    addNegativeSignIfNeeded (calcState: CalculatorState,payload: CalculatorState, value : string) {
        
        if (calcState.firstOperandIsNegative === true) {
            if ( calcState.firstOperand != undefined && calcState.firstOperand.indexOf("-") >= 0){
                payload.firstOperand = value
            }
            else {
                payload.currentText = "-" + payload.currentText
                payload.firstOperand = "-" + value
            }
        }
        else {
            payload.firstOperand = value
        }
    }
}

const CalculatorService = {
    addDot(calcState: CalculatorState, dispatch: CalculatorDispatcher) {
        const result = Helper.getOperandValue(calcState);

        const alreadyHasDot = Helper.containsDot(result.operandValue);

        if (!alreadyHasDot) {
            const value = result.operandValue + ".";

            if (result.useFirstOperand) {
                //this is the first number
                const payload: CalculatorState = { currentText: calcState.currentText + "." }


                //Check possible cleanup of currentText
                if (calcState.operationStatus === OperationStatus.PROCESSED) {
                    payload.currentText = calcState.currentText
                }
                else {
                    payload.currentText = calcState.currentText + "."
                }


                FirstOperandHelper.addNegativeSignIfNeeded(calcState,payload,value)

                dispatch({ type: CalculatorActionEnum.SET_FIRST_OPERAND, payload });

            } else {
                //this is the second number
                const payload: CalculatorState = { currentText: calcState.currentText + "." }
                if (calcState.operationStatus === OperationStatus.PROCESSED) {
                    payload.currentText = calcState.currentText
                }
                else {
                    payload.currentText = calcState.currentText + "."
                }

                payload.secondOperand = value
                dispatch({ type: CalculatorActionEnum.SET_SECOND_OPERAND, payload });

            }
        }
    },


    addNumber(inputValue: number, calcState: CalculatorState, dispatch: CalculatorDispatcher) {
        const dto = Helper.getOperandValue(calcState);

        //avoid adding multiple zeros on the left

        // console.log("calcState.firstOperand", calcState.firstOperand)
        // console.log("calcState.secondOperand", calcState.secondOperand)
        // console.log("operandValue.useFirstOperand " ,dto.useFirstOperand )
        // console.log("operandValue.operandValue " ,dto.operandValue )
        //

        let valueToSave : string = ""

        if( dto.operandValue === undefined){
            // console.log("path 1")
            // console.log("dto.operandValue:",dto.operandValue)
            valueToSave = inputValue.toString()
        }
        else{

            const currentFloatValue = parseFloat(dto.operandValue);
            // console.log("currentFloatValue:",currentFloatValue)

            if( inputValue === 0 && currentFloatValue === 0){
                // console.log("path 2")
                //Here, we can only add a zero to the right if the operandValue has a dot.
                const alreadyHasDot = Helper.containsDot(dto.operandValue);
                // console.log("alreadyHasDot:",alreadyHasDot)
                if( alreadyHasDot ){
                    // console.log("path 3")
                    valueToSave = dto.operandValue + "0"
                }
                else {
                    // console.log("path 4")
                    // console.log("returning: pressing zero without a dot inside")
                    return
                }
                
            }
            else{
                // console.log("path 5")
                valueToSave = dto.operandValue + inputValue.toString()
            }


        }

         console.log("value:", valueToSave)
         

        if (dto.useFirstOperand) {
            //this is the first number
            const payload: CalculatorState = { firstOperand: valueToSave }

            if (calcState.operationStatus === OperationStatus.PROCESSED) {
                //in case of already new operation, we have to cleanup the currentText
                payload.currentText = inputValue.toString();
            }
            else {
                payload.currentText = calcState.currentText + inputValue.toString();
            }

            FirstOperandHelper.addNegativeSignIfNeeded(calcState,payload,valueToSave)

            dispatch({ type: CalculatorActionEnum.SET_FIRST_OPERAND, payload });

        } else {
            //this is the second number
            const payload: CalculatorState = {
                secondOperand: valueToSave,
                currentText: calcState.currentText + inputValue.toString()
            }
            dispatch({ type: CalculatorActionEnum.SET_SECOND_OPERAND, payload });
        }

    },

    async executeEquals(calcState: CalculatorState, dispatch: CalculatorDispatcher) {
        if (calcState.firstOperand === undefined || calcState.currentOperation === undefined || calcState.secondOperand === undefined) {
            return;
        }

        const validatedFirstOperandValue = parseFloat(calcState.firstOperand);
        const validatedSecondOperandValue = parseFloat(calcState.secondOperand);

        await CalculatorService.executeRemoteOperation(validatedFirstOperandValue, validatedSecondOperandValue, calcState.currentOperation, dispatch);
    },

    async operationPressed(op: OperationEnum, calcState: CalculatorState, dispatch: CalculatorDispatcher) {
        if (op === OperationEnum.RANDOM_STRING) {
            await CalculatorService.executeRemoteOperation(null, null, op, dispatch);
            return;
        }

        console.log("operationPressed.state", calcState)

        if (calcState.firstOperand === undefined) {
            if (op === OperationEnum.SUBSTRACTION) {
                const payload: CalculatorState = { firstOperandIsNegative: true, currentText: "-" }
                dispatch({ type: CalculatorActionEnum.SET_FIRST_OPERAND_NEGATIVE, payload: payload });
            }
            return;
        }

        if (op === OperationEnum.SQUARE_ROOT) {
            await CalculatorService.executeRemoteOperation(parseFloat(calcState.firstOperand), null, op, dispatch);
        }
        else {

            const signToShow = Helper.getSignToShow(op)
            //Here we cast the firstOperand to its real float value.
            const floatValue = parseFloat(calcState.firstOperand).toString() 

            const payload: CalculatorState = {  firstOperand : floatValue, currentText: floatValue + signToShow, currentOperation: op }
            dispatch({ type: CalculatorActionEnum.SET_CURRENT_OPERATION, payload });
        }
    }
    ,
    async executeRemoteOperation(firstOperandValue: number | null, secondOperandValue: number | null, operator: OperationEnum, dispatch: CalculatorDispatcher): Promise<void> {
        const operation: string = OperationEnum[operator];

        try {
            const response = await OperationAPI.executeOperation(operation, firstOperandValue, secondOperandValue);

            const payload: CalculatorState = { balance: response.balance, currentText: response.result, firstOperand: response.result }
            dispatch({
                type: CalculatorActionEnum.CLEAN_VALUES_ON_SUCCESS, payload
            });

        } catch (e) {
            const errx = e as AxiosError

            let userMessage: string;
            if (errx.response !== undefined && errx.response.data !== undefined) {
                const apiError = errx.response!.data! as ApiError;
                userMessage = apiError.errorMessage;
            }
            else {
                userMessage = errx.message;
            }

            const payload: CalculatorState = { errorMessage: userMessage }
            dispatch({ type: CalculatorActionEnum.CLEAN_VALUES_ON_ERROR, payload });

        }
    }
}

export default CalculatorService