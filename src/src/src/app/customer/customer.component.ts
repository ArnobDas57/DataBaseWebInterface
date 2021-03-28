import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreatePopupComponent } from '../create-popup/create-popup.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customers = [];
  keyword: String;
  tempVal: String;
  subIn: String;
  crseIn: String;

  constructor(private authService: AuthService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.authService.getCustomers()
    .subscribe(
      response => {
        this.customers = response;
      },
      error => {
        alert(error.error);
        this.customers = [];
      }
    );
  }
  
  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.matDialog.open(CreatePopupComponent, dialogConfig);
  }
}
