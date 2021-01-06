import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestService } from 'src/app/test.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private testService: TestService
  ) {}
  get num() {
    return this.testService.testNum;
  }
  add() {
    this.testService.addTestNum();
  }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {});
  }
}
