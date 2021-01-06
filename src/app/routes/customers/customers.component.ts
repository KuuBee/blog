import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/test.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  constructor(private testService: TestService) {}

  ngOnInit(): void {}
  get num() {
    return this.testService.testNum;
  }
  add() {
    this.testService.addTestNum();
  }
}
