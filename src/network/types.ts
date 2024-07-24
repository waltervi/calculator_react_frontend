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

export type { User ,OperationRecord}