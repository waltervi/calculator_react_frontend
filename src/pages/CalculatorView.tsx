import React, { ReactElement } from "react";
import "./calculatorStyles.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { CalculatorActionEnum, CalculatorState, OperationEnum, OperationStatus, User } from "../network/types";
import calculatorReducer from "../service/stateManagement";
import CalculatorService from "../service/CalculatorService";

interface CalculatorViewProps {
  userLoggedIn : User;
}

interface OperandDto{
  useFirstOperand : boolean;
  operandValue:string 
}


function CalculatorView(props: CalculatorViewProps) {
  const initialState : CalculatorState = {
    balance : props.userLoggedIn.balance, 
    currentText : "",
    operationStatus : OperationStatus.PROCESSED,
    firstOperandIsNegative : false
  }

  const [calcState, dispatch] = React.useReducer(calculatorReducer,initialState);

  let errorAlert: ReactElement|undefined;
  if (calcState.errorMessage !== undefined) {
    errorAlert = (
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Alert key="danger" variant="danger">
          {calcState.errorMessage}
        </Alert>
      </Form.Group>
    );
  }

  return (
    <div className="calculator">
      {errorAlert}
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label className="btn2" style={{ textAlign: "right" }}>
          Current balance : {calcState.balance}
        </Form.Label>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control className="btn2" placeholder={calcState.currentText} style={{ textAlign: "right" }} disabled />
      </Form.Group>
      <div className="buttons">
        {/* NUMBERS */}
        <Button key="zero" className="btn2 btn-primary letter-zero" onClick={() => CalculatorService.addNumber(0,calcState, dispatch)}>
          0
        </Button>
        <Button key="one" className="btn2 btn-primary letter-one" onClick={() => CalculatorService.addNumber(1,calcState, dispatch)}>
          1
        </Button>
        <Button key="two" className="btn2 btn-primary letter-two" onClick={() => CalculatorService.addNumber(2,calcState, dispatch)}>
          2
        </Button>
        <Button key="three" className="btn2 btn-primary letter-three" onClick={() => CalculatorService.addNumber(3,calcState, dispatch)}>
          3
        </Button>
        <Button key="four" className="btn2 btn-primary letter-four" onClick={() => CalculatorService.addNumber(4,calcState, dispatch)}>
          4
        </Button>
        <Button key="five" className="btn2 btn-primary letter-five" onClick={() => CalculatorService.addNumber(5,calcState, dispatch)}>
          5
        </Button>
        <Button key="six" className="btn2 btn-primary letter-six" onClick={() => CalculatorService.addNumber(6,calcState, dispatch)}>
          6
        </Button>
        <Button key="seven" className="btn2 btn-primary letter-seven" onClick={() => CalculatorService.addNumber(7,calcState, dispatch)}>
          7
        </Button>
        <Button key="eigth" className="btn2 btn-primary letter-eigth" onClick={() => CalculatorService.addNumber(8,calcState, dispatch)}>
          8
        </Button>
        <Button key="nine" className="btn2 btn-primary letter-nine" onClick={() => CalculatorService.addNumber(9,calcState, dispatch)}>
          9
        </Button>
        <Button key="dot" className="btn2 btn-primary letter-dot" onClick={() => CalculatorService.addDot(calcState, dispatch)}>
          .
        </Button>

        {/* OPERATIONS */}
        <Button key="substract" className="btn2 btn-secondary letter-subtract" onClick={ async () => await CalculatorService.operationPressed(OperationEnum.SUBSTRACTION,calcState,dispatch)}>
          -
        </Button>
        <Button key="add" className="btn2 btn-secondary letter-add" onClick={async () => await CalculatorService.operationPressed(OperationEnum.ADDITION,calcState,dispatch)}>
          +
        </Button>
        <Button key="multiply" className="btn2 btn-secondary letter-multiply" onClick={async () => await CalculatorService.operationPressed(OperationEnum.MULTIPLICATION,calcState,dispatch)}>
          x
        </Button>
        <Button key="divide" className="btn2 btn-secondary letter-divide" onClick={async () => await CalculatorService.operationPressed(OperationEnum.DIVISION,calcState,dispatch)}>
          /
        </Button>
        <Button key="square_root" className="btn2 btn-secondary letter-square_root" onClick={async () => await CalculatorService.operationPressed(OperationEnum.SQUARE_ROOT,calcState,dispatch)}>
          √
        </Button>
        <Button key="random" className="btn2 btn-secondary letter-random" onClick={async () => await CalculatorService.operationPressed(OperationEnum.RANDOM_STRING,calcState,dispatch)}>
          R
        </Button>

        <Button key="equals" className="btn2 btn-success letter-equals" onClick={async () => await CalculatorService.executeEquals(calcState,dispatch)}>
          =
        </Button>
        <Button key="clear" className="btn2 btn-danger letter-clear" onClick={ () => dispatch({type : CalculatorActionEnum.CLEAN_VALUES})}>
          C
        </Button>
      </div>
    </div>
  );
}

export default CalculatorView;
