import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
@Component({
  selector: 'app-ag-grid',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './ag-grid.component.html',
  styleUrl: './ag-grid.component.css'
})
export class AgGridComponent {
  userList:any[] = [];
  rowSelection : 'single' |'multiple' = "multiple"
  colDefs: ColDef[] = [
    { field: "id", headerName: "User Id", checkboxSelection: true, headerCheckboxSelection:true,
      //With cellRenderer you can modify the data before rendering the UI
      cellRenderer:(item:any)=>{
        return  "EMP-" + item.value
      }
     },
    { field: "name", headerName: "Name", filter:"agTextColumnFilter" },
    { field: "username", headerName: "UserName" },
    { field: "email", headerName: "Email", editable:true },
  ];
  defaultCikDef ={
    flex:1,
    minWidth: 100
  }
  private gridApi!: GridApi<any>;
  constructor(private http: HttpClient){
    
  }
  onBtExport(){
    this.gridApi.exportDataAsCsv();
  }
ngOnInit(){
  this.getUser();
}
  getUser(){
    this.http.get("http://jsonplaceholder.typicode.com/users").subscribe((res:any)=>{
      this.userList = res;
    })
  }
  onGridReady(event: GridReadyEvent<any>){
    this.gridApi = event.api;
  }
}
