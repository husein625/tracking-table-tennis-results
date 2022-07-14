import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/User';

@Component({
  selector: 'app-overview-modal',
  templateUrl: './overview-modal.component.html',
  styleUrls: ['./overview-modal.component.scss']
})
export class OverviewModalComponent implements OnInit {
  selectedUser: IUser;

  constructor() { }

  ngOnInit(): void {
    console.log('selected user data', this.selectedUser)
  }

}
