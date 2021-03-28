import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {
  plans = [];
  planName: String;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  planSearch() {
    this.authService.getActivePlans(this.planName)
    .subscribe(
      response => {
        this.plans = response;
      },
      error => {
        alert(error.error);
        this.plans = [];
      }
    );
  }
}
