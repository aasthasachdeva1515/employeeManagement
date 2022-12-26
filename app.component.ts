import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { deleteEmp, editEmp } from './store/employee-store/employee.action';
import { Store } from '@ngrx/store';
import { getEmployeeData } from './store/employee-store/employee.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular-poc';

  displayedColumns: string[] = ['employeeId', 'employeeName', 'employeeBranch', 'employeeLocation', 'joiningDate', 'action'];
  dataSource!: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  employeeForm: any;
  
  constructor(private dialog: MatDialog, private api: ApiService, private store: Store)
    {

    }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val=>{
      if(val=='save'){
        this.getAllEmployees();
      }
    })
}
getAllEmployees(){
  this.store.select(getEmployeeData).subscribe((data)=>{
    this.dataSource= data;
  })

  // this.api.getEmployee()
  // .subscribe({
  //   next:(res)=>{
  //     console.log(res);
  //     this.dataSource= new MatTableDataSource(res);
  //     this.dataSource.paginator= this.paginator;
  //     this.dataSource.sort= this.sort;
  //   },
  //   error:(err)=>{
  //     alert("Error !");
  //   }
  // })
 }
 editEmployee(row:any){
  this.dialog.open(DialogComponent, {
    width:'30%',
    data: row
  }).afterClosed().subscribe(val=>{
    if(val==='update'){
      this.getAllEmployees();
    }
  })
  // console.log(this.employeeForm.value);
  this.store.dispatch(editEmp({emp: this.employeeForm.value}))
  
 }
  deleteEmployee(sId:number){
    
  this.store.dispatch(deleteEmp({id: sId}))
  // this.api.deleteEmployee(id)
  // .subscribe({
  //   next:(res)=>{
  //     alert("Employee Deleted Successfully");
  //     this.getAllEmployees();
  //   },
  //   error:()=>{
  //     alert("Error !");
  //   }
  // })
 }
 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
}
