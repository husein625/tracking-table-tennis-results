import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  form: FormGroup;
  playerForm: FormGroup;
  players: FormArray;

  //Public
  public playersList: IUser[] = [];
  public playerOverview: IUser;
  public pickedPlayers: Array<IUser> = [];
  public matchesList: any[] = [];
  public matchStart = false;
  public errorMessages: any[] = [];
  public buttonDisabled: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
  ) {

    this.form = this.formBuilder.group({
      first_player: [null, [Validators.maxLength(128)]],
      first_player_1: [null, [Validators.required, Validators.maxLength(128)]],
      first_player_2: [null, [Validators.required, Validators.maxLength(128)]],
      first_player_3: [null, [Validators.required, Validators.maxLength(128)]],
      first_player_4: [null, [Validators.required, Validators.maxLength(128)]],
      first_player_5: [null, [Validators.required, Validators.maxLength(128)]],

      second_player: [null, [Validators.maxLength(128)]],
      second_player_1: [null, [Validators.required, Validators.maxLength(128)]],
      second_player_2: [null, [Validators.required, Validators.maxLength(128)]],
      second_player_3: [null, [Validators.required, Validators.maxLength(128)]],
      second_player_4: [null, [Validators.required, Validators.maxLength(128)]],
      second_player_5: [null, [Validators.required, Validators.maxLength(128)]],
    });

    this.playerForm = new FormGroup({
      players: this.formBuilder.array([]),
    });
  }

  ngOnInit(): void {
    this.playersList = this.playersList.concat(PLAYERS);

    this.form.valueChanges.subscribe(x => {
      let errorMessage;

      //FIRST CASE - PLAYER 1
      if (x.first_player_1 == 10 && x.second_player_1 == 10) {
        console.log('error 10:10');
        errorMessage = 'error 10:10';
        this.errorMessages.push(errorMessage);
        this.buttonDisabled = true;
      }

      else if (x.first_player_1 >= 10 && x.second_player_1 >= 10 && x.first_player_1 - 1 == x.second_player_1) {
        console.log('error 1 difference')
        errorMessage = 'error 1 difference';
        this.errorMessages.push(errorMessage);
        this.buttonDisabled = true;
      }

      else if (x.first_player_1 >= 10 && x.second_player_1 >= 10 && x.first_player_1 - x.second_player_1 > 2) {
        console.log('error more than two result');
        errorMessage = 'error more than two result';
        this.errorMessages.push(errorMessage);
        this.buttonDisabled = true;
      }

      else if (x.first_player_1 > 11 && x.first_player_1 - x.second_player_1 > 2) {
        this.buttonDisabled = true;
        this.errorMessages = [];
      }

      else if (x.second_player_1 > 11 && x.second_player_1 - x.first_player_1 > 2) {
        this.buttonDisabled = true;
        this.errorMessages = [];
      }

      else if (x.first_player_1 >= 10 && x.second_player_1 >= 10 && x.first_player_1 == x.second_player_1) {
        console.log('error same values')
        errorMessage = 'error same values';
        this.errorMessages.push(errorMessage);
        this.buttonDisabled = true;
      }

      //SECOND CASE - PLAYER 1
      else if (x.first_player_1 >= 10 && x.second_player_1 >= 10 && x.second_player_1 - 1 == x.first_player_1) {
        console.log('error 1 difference')
        errorMessage = 'error 1 difference';
        this.errorMessages.push(errorMessage);
        this.buttonDisabled = true;
      }

      else if (x.first_player_1 >= 10 && x.second_player_1 >= 10 && x.second_player_1 - x.first_player_1 > 2) {
        console.log('error more than two result')
        errorMessage = 'error more than two result';
        this.errorMessages.push(errorMessage);
        this.buttonDisabled = true;
      }

      else if (x.first_player_1 <= 10 && x.second_player_1 <= 10) {
        this.buttonDisabled = true;
      }


      //FIRST CASE - PLAYER 2
      else if (x.first_player_2 == 10 && x.second_player_2 == 10) {
        console.log('error 10:10');
        errorMessage = 'error 10:10';
        this.errorMessages.push(errorMessage);
        this.buttonDisabled = true;
      }

      else if (x.first_player_2 >= 10 && x.second_player_2 >= 10 && x.first_player_2 - 1 == x.second_player_2) {
        console.log('error 1 difference')
        errorMessage = 'error 1 difference';
        this.errorMessages.push(errorMessage);
        this.buttonDisabled = true;
      }

      else if (x.first_player_2 >= 10 && x.second_player_2 >= 10 && x.first_player_2 - x.second_player_2 > 2) {
        console.log('error more than two result');
        errorMessage = 'error more than two result';
        this.errorMessages.push(errorMessage);
        this.buttonDisabled = true;
      }

      else if (x.first_player_2 > 11 && x.first_player_2 - x.second_player_2 > 2) {
        this.buttonDisabled = true;
        this.errorMessages = [];
      }

      else if (x.second_player_2 > 11 && x.second_player_2 - x.first_player_2 > 2) {
        this.buttonDisabled = true;
        this.errorMessages = [];
      }

      else if (x.first_player_2 >= 10 && x.second_player_2 >= 10 && x.first_player_2 == x.second_player_2) {
        console.log('error same values')
        errorMessage = 'error same values';
        this.errorMessages.push(errorMessage);
        this.buttonDisabled = true;
      }

      //SECOND CASE - PLAYER 2
      else if (x.first_player_2 >= 10 && x.second_player_2 >= 10 && x.second_player_2 - 1 == x.first_player_2) {
        console.log('error 1 difference')
        errorMessage = 'error 1 difference';
        this.errorMessages.push(errorMessage);
        this.buttonDisabled = true;
      }

      else if (x.first_player_2 >= 10 && x.second_player_2 >= 10 && x.second_player_2 - x.first_player_2 > 2) {
        console.log('error more than two result')
        errorMessage = 'error more than two result';
        this.errorMessages.push(errorMessage);
        this.buttonDisabled = true;
      }

      else if (x.first_player_2 <= 10 && x.second_player_2 <= 10) {
        this.buttonDisabled = true;
      }


      //FIRST CASE - PLAYER 3
      else if (x.first_player_3 == 10 && x.second_player_3 == 10) {
        console.log('error 10:10');
        errorMessage = 'error 10:10';
        this.errorMessages.push(errorMessage);
        this.buttonDisabled = true;
      }

      else if (x.first_player_3 >= 10 && x.second_player_3 >= 10 && x.first_player_3 - 1 == x.second_player_3) {
        console.log('error 1 difference')
        errorMessage = 'error 1 difference';
        this.errorMessages.push(errorMessage);
        this.buttonDisabled = true;
      }

      else if (x.first_player_3 >= 10 && x.second_player_3 >= 10 && x.first_player_3 - x.second_player_3 > 2) {
        console.log('error more than two result');
        errorMessage = 'error more than two result';
        this.errorMessages.push(errorMessage);
        this.buttonDisabled = true;
      }

      else if (x.first_player_3 > 11 && x.first_player_3 - x.second_player_3 > 2) {
        this.buttonDisabled = true;
        this.errorMessages = [];
      }

      else if (x.second_player_3 > 11 && x.second_player_3 - x.first_player_3 > 2) {
        this.buttonDisabled = true;
        this.errorMessages = [];
      }

      else if (x.first_player_3 >= 10 && x.second_player_3 >= 10 && x.first_player_3 == x.second_player_3) {
        console.log('error same values')
        errorMessage = 'error same values';
        this.errorMessages.push(errorMessage);
        this.buttonDisabled = true;
      }

      //SECOND CASE - PLAYER 3
      else if (x.first_player_3 >= 10 && x.second_player_3 >= 10 && x.second_player_3 - 1 == x.first_player_3) {
        console.log('error 1 difference')
        errorMessage = 'error 1 difference';
        this.errorMessages.push(errorMessage);
        this.buttonDisabled = true;
      }

      else if (x.first_player_3 >= 10 && x.second_player_3 >= 10 && x.second_player_3 - x.first_player_3 > 2) {
        console.log('error more than two result')
        errorMessage = 'error more than two result';
        this.errorMessages.push(errorMessage);
        this.buttonDisabled = true;
      }

      else if (x.first_player_3 <= 10 && x.second_player_3 <= 10) {
        this.buttonDisabled = true;
      }


      //FIRST CASE - PLAYER 4
      else if (x.first_player_4 == 10 && x.second_player_4 == 10) {
        console.log('error 10:10');
        errorMessage = 'error 10:10';
        this.errorMessages.push(errorMessage);
        this.buttonDisabled = true;
      }

      else if (x.first_player_4 >= 10 && x.second_player_4 >= 10 && x.first_player_4 - 1 == x.second_player_4) {
        console.log('error 1 difference')
        errorMessage = 'error 1 difference';
        this.errorMessages.push(errorMessage);
        this.buttonDisabled = true;
      }

      else if (x.first_player_4 >= 10 && x.second_player_4 >= 10 && x.first_player_4 - x.second_player_4 > 2) {
        console.log('error more than two result');
        errorMessage = 'error more than two result';
        this.errorMessages.push(errorMessage);
        this.buttonDisabled = true;
      }

      else if (x.first_player_4 > 11 && x.first_player_4 - x.second_player_4 > 2) {
        this.buttonDisabled = true;
        this.errorMessages = [];
      }

      else if (x.second_player_4 > 11 && x.second_player_4 - x.first_player_4 > 2) {
        this.buttonDisabled = true;
        this.errorMessages = [];
      }

      else if (x.first_player_4 >= 10 && x.second_player_4 >= 10 && x.first_player_4 == x.second_player_4) {
        console.log('error same values')
        errorMessage = 'error same values';
        this.errorMessages.push(errorMessage);
        this.buttonDisabled = true;
      }

      //SECOND CASE - PLAYER 4
      else if (x.first_player_4 >= 10 && x.second_player_4 >= 10 && x.second_player_4 - 1 == x.first_player_4) {
        console.log('error 1 difference')
        errorMessage = 'error 1 difference';
        this.errorMessages.push(errorMessage);
        this.buttonDisabled = true;
      }

      else if (x.first_player_4 >= 10 && x.second_player_4 >= 10 && x.second_player_4 - x.first_player_4 > 2) {
        console.log('error more than two result')
        errorMessage = 'error more than two result';
        this.errorMessages.push(errorMessage);
        this.buttonDisabled = true;
      }

      else if (x.first_player_4 <= 10 && x.second_player_4 <= 10) {
        this.buttonDisabled = true;
      }


      //FIRST CASE - PLAYER 5
      else if (x.first_player_5 == 10 && x.second_player_5 == 10) {
        console.log('error 10:10');
        errorMessage = 'error 10:10';
        this.errorMessages.push(errorMessage);
        this.buttonDisabled = true;
      }

      else if (x.first_player_5 >= 10 && x.second_player_5 >= 10 && x.first_player_5 - 1 == x.second_player_5) {
        console.log('error 1 difference')
        errorMessage = 'error 1 difference';
        this.errorMessages.push(errorMessage);
        this.buttonDisabled = true;
      }

      else if (x.first_player_5 >= 10 && x.second_player_5 >= 10 && x.first_player_5 - x.second_player_5 > 2) {
        console.log('error more than two result');
        errorMessage = 'error more than two result';
        this.errorMessages.push(errorMessage);
        this.buttonDisabled = true;
      }

      else if (x.first_player_5 > 11 && x.first_player_5 - x.second_player_5 > 2) {
        this.buttonDisabled = true;
        this.errorMessages = [];
      }

      else if (x.second_player_5 > 11 && x.second_player_5 - x.first_player_5 > 2) {
        this.buttonDisabled = true;
        this.errorMessages = [];
      }

      else if (x.first_player_5 >= 10 && x.second_player_5 >= 10 && x.first_player_5 == x.second_player_5) {
        console.log('error same values')
        errorMessage = 'error same values';
        this.errorMessages.push(errorMessage);
        this.buttonDisabled = true;
      }

      //SECOND CASE - PLAYER 5
      else if (x.first_player_5 >= 10 && x.second_player_5 >= 10 && x.second_player_5 - 1 == x.first_player_5) {
        console.log('error 1 difference')
        errorMessage = 'error 1 difference';
        this.errorMessages.push(errorMessage);
        this.buttonDisabled = true;
      }

      else if (x.first_player_5 >= 10 && x.second_player_5 >= 10 && x.second_player_5 - x.first_player_5 > 2) {
        console.log('error more than two result')
        errorMessage = 'error more than two result';
        this.errorMessages.push(errorMessage);
        this.buttonDisabled = true;
      }

      else if (x.first_player_5 <= 10 && x.second_player_5 <= 10) {
        this.buttonDisabled = true;
      }

      else {
        this.errorMessages = [];
        this.buttonDisabled = false;
      }
    })
  }

  createPlayer(): FormGroup {
    return this.formBuilder.group({
      first_name: [null, [Validators.required, Validators.maxLength(128)]],
      last_name: [null, [Validators.required, Validators.maxLength(128)]],
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

  finishMatch() {
    this.form.controls['first_player'].setValue(this.pickedPlayers[0]);
    this.form.controls['second_player'].setValue(this.pickedPlayers[1]);
    this.matchesList.push(this.form.value);
    this.pickedPlayers = [];
    this.matchStart = false;
  }

  openDialogOverview(player: IUser): void {
    const ref = this.dialog.open(OverviewModalComponent);
    ref.componentInstance.selectedUser = player;
  }

  togglePlayer(user: IUser) {
    let checker = false;

    console.log('Picked', this.pickedPlayers)
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
    console.log(form.value);
    this.matchesList.push(form.value);
    console.log('list', this.matchesList)
  }
}