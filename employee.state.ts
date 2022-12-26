import { Employee } from "./employee";

export interface initialEmployeeInterface{
    empData: Employee[]
}
export const initialEmployeeState: initialEmployeeInterface={
    empData:[]
}