import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-usage',
  templateUrl: './usage.component.html',
  styleUrls: ['./usage.component.css']
})
export class UsageComponent implements OnInit {
  months = [];
  customer: number;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  usageSearch() {
    this.authService.getUsage(this.customer)
    .subscribe(
      response => {
        this.months = response;
      },
      error => {
        alert(error.error);
        this.months = [];
      }
    );
  }
}
