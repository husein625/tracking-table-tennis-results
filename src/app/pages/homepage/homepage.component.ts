import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IUser } from 'src/app/interfaces/User';
import { PLAYERS } from 'src/app/services/mock-data/players';
import { OverviewModalComponent } from '../../components/overview-modal/overview-modal.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  //Form
  playerForm: FormGroup;
  players: FormArray;
  matchForm: FormGroup;
  matches: FormArray;

  //Public
  public playersList: IUser[] = [];
  public playerOverview: IUser;
  public pickedPlayers: Array<IUser> = [];
  public matchesList: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
  ) {

    this.playerForm = new FormGroup({
      players: this.formBuilder.array([]),
    });

    this.matchForm = new FormGroup({
      matches: this.formBuilder.array([]),
    });
  }

  ngOnInit(): void {
    this.playersList = this.playersList.concat(PLAYERS);
   }

  createPlayer(): FormGroup {
    return this.formBuilder.group({
      first_name: [null, [Validators.required, Validators.maxLength(128)]],
      last_name: [null, [Validators.required, Validators.maxLength(128)]],
    });
  }

  createMatch(): FormGroup {
    return this.formBuilder.group({
      first_player: this.pickedPlayers[0],
      first_player_1: [null, [Validators.required, Validators.maxLength(128)]],
      first_player_2: [null, [Validators.required, Validators.maxLength(128)]],
      first_player_3: [null, [Validators.required, Validators.maxLength(128)]],
      first_player_4: [null, [Validators.required, Validators.maxLength(128)]],
      first_player_5: [null, [Validators.required, Validators.maxLength(128)]],

      second_player: this.pickedPlayers[1],
      second_player_1: [null, [Validators.required, Validators.maxLength(128)]],
      second_player_2: [null, [Validators.required, Validators.maxLength(128)]],
      second_player_3: [null, [Validators.required, Validators.maxLength(128)]],
      second_player_4: [null, [Validators.required, Validators.maxLength(128)]],
      second_player_5: [null, [Validators.required, Validators.maxLength(128)]],
    });
  }

  addPlayer(): void {
    this.players = this.playerForm.get('players') as FormArray;
    this.players.push(this.createPlayer());
    this.playersList = this.playersList.concat(this.playerForm.value.players);
  }

  deletePlayerRow(index: any) {
    this.Players.removeAt(index);
  }

  get Players() {
    return this.playerForm.get('players') as FormArray;
  }

  get Matches() {
    return this.matchForm.get('matches') as FormArray;
  }

  addMatch(): void {
    this.matches = this.matchForm.get('matches') as FormArray;
    this.matches.push(this.createMatch());
    if(this.Matches.length > 1){
      this.Matches.removeAt(0);
    }
  }

  finishMatch(){
    this.matchesList = this.matchesList.concat(this.matches.value);
    this.matches.removeAt(0);
    this.pickedPlayers = [];
  }

  openDialogOverview(player: IUser): void {
    const ref = this.dialog.open(OverviewModalComponent);
    ref.componentInstance.selectedUser = player;
  }

  togglePlayer(user: IUser) {
    let checker = false;

    console.log('Picked',this.pickedPlayers)
    this.pickedPlayers.forEach((obj) => {
      if (obj === user) {
        checker = true;
      }
    });

    if (checker) {
      const index: number = this.pickedPlayers.indexOf(user);
      if (index !== -1) {
        this.pickedPlayers.splice(index, 1);
      }
    } else {
      this.pickedPlayers.push(user);
    }
  }

  async finish(form: any): Promise<void> {
    console.log(form.value)
  }

}
