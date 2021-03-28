import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css']
})
export class PhoneComponent implements OnInit {
  contracts = [1, 2, 3];
  model: String;
  mins = [];
  mes = [];
  data = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  phoneSearch() {
    this.authService.getMins(this.model)
    .subscribe(
      response => {
        this.mins = response;
      },
      error => {
        alert(error.error);
        this.mins = [];
      }
    );
    this.authService.getMes(this.model)
    .subscribe(
      response => {
        this.mes = response;
      },
      error => {
        alert(error.error);
        this.mes = [];
      }
    );
    this.authService.getData(this.model)
    .subscribe(
      response => {
        this.data = response;
      },
      error => {
        alert(error.error);
        this.data = [];
      }
    );
  }
}
