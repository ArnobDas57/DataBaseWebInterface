import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-create-popup',
  templateUrl: './create-popup.component.html',
  styleUrls: ['./create-popup.component.css']
})
export class CreatePopupComponent implements OnInit {
  constructor(private authService: AuthService, public dialogRef: MatDialogRef<CreatePopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  tempData: any;

  ngOnInit(): void {
    this.tempData = {
      "firstName": undefined,
      "lastName": undefined,
      "street": undefined,
      "city": undefined,
      "zip": undefined
    }
  }

  addCustomer() {
    this.authService.addCustomer(this.tempData)
    .subscribe(
      response => {
        alert("Customer added successfully.");
        this.close();
      },
      error => {
        alert("Customer could not be added.");
      }
    );
  }


  save() {
      if(this.tempData.firstName == undefined || this.tempData.lastName == undefined || this.tempData.firstName == undefined || this.tempData.street == undefined || this.tempData.city == undefined || this.tempData.zip == undefined) {
        alert("Please enter all fields");
      } else {
          this.tempData = {
            "firstName": String(this.tempData.firstName),
            "lastName": String(this.tempData.lastName),
            "street": String(this.tempData.street),
            "city": String(this.tempData.city),
            "zip": String(this.tempData.zip)
          }
          this.addCustomer();
      }
  }

  //Closes the popup
  close() {
    this.dialogRef.close();
  }
}
