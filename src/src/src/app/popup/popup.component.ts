import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  tempData: any;

  constructor(private authService: AuthService, public dialogRef: MatDialogRef<PopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.tempData = JSON.parse(JSON.stringify(this.data));
  }

  save() {
    if(this.tempData.additionalData) {
      this.tempData = {
        "featureType": this.tempData.featureType,
        "value": this.tempData.additionalData
      }
      this.authService.changeAddData(this.tempData)
      .subscribe(
        response => {
          alert("Amount updated successfully.");
          this.close();
        },
        error => {
          alert("Amount could not be updated.");
        }
      );
    }
    if(this.tempData.additionalMessage) {
      this.tempData = {
        "featureType": this.tempData.featureType,
        "value": this.tempData.additionalMessage
      }
      this.authService.changeAddMes(this.tempData)
      .subscribe(
        response => {
          alert("Amount updated successfully.");
          this.close();
        },
        error => {
          alert("Amount could not be updated.");
        }
      );
    }
    if(this.tempData.additionalMinutes) {
      this.tempData = {
        "featureType": this.tempData.featureType,
        "value": this.tempData.additionalMinutes
      }
      this.authService.changeAddMin(this.tempData)
      .subscribe(
        response => {
          alert("Amount updated successfully.");
          this.close();
        },
        error => {
          alert("Amount could not be updated.");
        }
      );
    }
  }

  close() {
    this.dialogRef.close();
  }
}
