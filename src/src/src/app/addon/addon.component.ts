import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-addon',
  templateUrl: './addon.component.html',
  styleUrls: ['./addon.component.css']
})
export class AddonComponent implements OnInit {
  dataAddons = [];
  mesAddons = [];
  minAddons = [];

  constructor(private authService: AuthService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.authService.getAddData()
    .subscribe(
      response => {
        this.dataAddons = response;
      },
      error => {
        alert(error.error);
        this.dataAddons = [];
      }
    );
    this.authService.getAddMes()
    .subscribe(
      response => {
        this.mesAddons = response;
      },
      error => {
        alert(error.error);
        this.mesAddons = [];
      }
    );
    this.authService.getAddMin()
    .subscribe(
      response => {
        this.minAddons = response;
      },
      error => {
        alert(error.error);
        this.minAddons = [];
      }
    );
  }

  openDialog(addon) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = addon;

    this.matDialog.open(PopupComponent, dialogConfig);
  }
}
