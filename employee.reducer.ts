import { createReducer, on } from "@ngrx/store";
import { initialEmployeeState } from "./employee.state";
import { addEmp, editEmp, deleteEmp} from "./employee.action";

const _empReducer = createReducer(
    initialEmployeeState,

    on(addEmp,(state,action)=>{
        return{
            ...state,
            empData:[...state.empData, action.emp]
        }
    }),
    on(editEmp,(state,action)=>{
        return{
            ...state,
            empData:[...state.empData.filter(data=>data.employeeId===action.emp.employeeId),action.emp]
        }
    }),
    on(deleteEmp,(state,action)=>{
        return{
            ...state,
            empData:state.empData.filter(data=> +data.employeeId !== +action.id)
        }
    })
)
export function empReducer(state: any, action: any){
    return _empReducer(state,action)
}