
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { initialEmployeeInterface } from "./employee.state";

const getEmployeeState= createFeatureSelector<initialEmployeeInterface>('Employee');

export const getEmployeeData= createSelector(getEmployeeState,(state)=>{
    return state.empData;
})