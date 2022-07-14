import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IUser } from 'src/app/interfaces/User';
import { OverviewModalComponent } from '../../components/overview-modal/overview-modal.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  //Form
  form: FormGroup;
  playerForm: FormGroup;
  players: FormArray;

  //Public
  public playersList: any[];
  public playerOverview: { first_name: string, last_name: string };

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
  ) {
    this.form = this.formBuilder.group({
      first_name: [null, [Validators.required, Validators.maxLength(128)]],
      last_name: [null, [Validators.required, Validators.maxLength(128)]],
    });

    this.playerForm = new FormGroup({
      players: this.formBuilder.array([]),
    });
  }

  ngOnInit(): void {
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      first_name: '',
      last_name: '',
    });
  }

  addPlayer(): void {
    this.players = this.playerForm.get('players') as FormArray;
    this.players.push(this.createItem());

    this.playersList = this.playerForm.value.players;
    console.log('items', this.players.value);
    console.log('playersList', this.playersList)
  }

  deletePlayer(index: any) {
    this.Players.removeAt(index);
    this.playersList.splice(index, 1);
  }

  get Players() {
    return this.playerForm.get('players') as FormArray;
  }

  openDialogOverview(player: IUser): void {
    const ref = this.dialog.open(OverviewModalComponent);
    ref.componentInstance.selectedUser = player;
  }

  async finish(form: any): Promise<void> {
    console.log(form.value)
  }

}
