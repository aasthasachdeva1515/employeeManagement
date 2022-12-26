import { createAction, props } from "@ngrx/store";
import { Employee } from "./employee";

export const addEmp= createAction('[Employee] Add Employee', props<{emp: Employee}>());
export const editEmp= createAction('[Employee] Edit Employee', props<{emp: Employee}>());
export const deleteEmp= createAction('[Employee] Delete Employee',props<{id: number}>());