import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import { Store } from '@ngrx/store';
import { addEmp, editEmp } from '../store/employee-store/employee.action';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  
  employeeForm!: FormGroup;
  actionBtn: string= "Save";
  constructor(private formBuilder: FormBuilder, private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>, private store: Store) { }

  ngOnInit(): void {
    this.employeeForm= this.formBuilder.group({
      employeeId: [,Validators.required],
      employeeName: ['',Validators.required],
      employeeBranch: ['',Validators.required],
      employeeLocation: ['',Validators.required],
      joiningDate: ['',Validators.required]
    });

//patching value
    if(this.editData){
      this.actionBtn= "Update"
      this.employeeForm.controls['employeeId'].setValue(this.editData.employeeId);
      this.employeeForm.controls['employeeName'].setValue(this.editData.employeeName);
      this.employeeForm.controls['employeeBranch'].setValue(this.editData.employeeBranch);
      this.employeeForm.controls['employeeLocation'].setValue(this.editData.employeeLocation);
      this.employeeForm.controls['joiningDate'].setValue(this.editData.joiningDate);
    }
  }

  checkmethod(){
    if (this.actionBtn==='Update'){
  
      
      this.updateEmployee();
    }
    else if (this.actionBtn==='Save'){
      
      this.addEmployee();
    } 
  }
  addEmployee(){
    
    this.store.dispatch(addEmp({emp: this.employeeForm.value}))
    this.employeeForm.reset();
    this.dialogRef.close('save');

    if(!this.editData){
      if(this.employeeForm.valid)
      {
        // this.api.postEmployee(this.employeeForm.value)
        // .subscribe({
        //   next:(res)=>{
      //       this.employeeForm.reset();
      //       this.dialogRef.close('save');
      alert("Employee Added Successfully");
      //     },
      //     error:()=>{
      //       alert("Failed !");
      //     }
      //   })
      // }
    } 
      // else
      // {
      //   this.updateEmployee()
      // }
  };
}
  updateEmployee(){
    
    // this.api.putEmployee(this.employeeForm.value, this.editData.id)
    // .subscribe({
    //   next:(res)=>{
    //     alert("Employee Details Updated");
    //     this.employeeForm.reset();
    //     this.dialogRef.close('update');
    //   },
    //   error:()=>{
    //     alert("Error !");
    //   }
    // })
        
        this.dialogRef.close('update');
        console.log(this.employeeForm.value)
        this.store.dispatch(editEmp({emp: this.employeeForm.value}))
        alert("Employee Details Updated");
  }
}

