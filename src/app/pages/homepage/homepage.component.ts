import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
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
  public errorMessages: any;
  public buttonDisabled: boolean;
  public winMatches: any[] = [];
  public winsPlayer1: number = 0;
  public winsPlayer2: number = 0;
  public file: any;
  public fileUrl: any;

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
      first_player_win: [false],

      second_player: [null, [Validators.maxLength(128)]],
      second_player_1: [null, [Validators.required, Validators.maxLength(128)]],
      second_player_2: [null, [Validators.required, Validators.maxLength(128)]],
      second_player_3: [null, [Validators.required, Validators.maxLength(128)]],
      second_player_4: [null, [Validators.required, Validators.maxLength(128)]],
      second_player_5: [null, [Validators.required, Validators.maxLength(128)]],
      second_player_win: [false],
    });

    this.playerForm = new FormGroup({
      players: this.formBuilder.array([]),
    });
  }

  ngOnInit(): void {
    this.playersList = this.playersList.concat(PLAYERS);

    this.form.valueChanges.subscribe(x => {
      let errorMessage;

      //FIRST CASE - SET 1
      if (x.first_player_1 == 10 && x.second_player_1 == 10) {
        errorMessage = 'Error 10:10 in SET 1';
        this.errorMessages = errorMessage;
        this.buttonDisabled = true;
      }

      else if (x.first_player_1 >= 10 && x.second_player_1 >= 10 && x.first_player_1 - 1 == x.second_player_1) {
        errorMessage = 'Error 1 difference in SET 1';
        this.errorMessages = errorMessage;
        this.buttonDisabled = true;
      }

      else if (x.first_player_1 >= 10 && x.second_player_1 >= 10 && x.first_player_1 - x.second_player_1 > 2) {
        errorMessage = 'Error more than two result in SET 1';
        this.errorMessages = errorMessage;
        this.buttonDisabled = true;
      }


      else if (x.first_player_1 >= 10 && x.second_player_1 >= 10 && x.first_player_1 == x.second_player_1) {
        errorMessage = 'Error same values in SET 1';
        this.errorMessages = errorMessage;
        this.buttonDisabled = true;
      }

      //SECOND CASE - SET 1
      else if (x.first_player_1 >= 10 && x.second_player_1 >= 10 && x.second_player_1 - 1 == x.first_player_1) {
        errorMessage = 'Error 1 difference in SET 1';
        this.errorMessages = errorMessage;
        this.buttonDisabled = true;
      }

      else if (x.first_player_1 >= 10 && x.second_player_1 >= 10 && x.second_player_1 - x.first_player_1 > 2) {
        errorMessage = 'Error more than two result in SET 1';
        this.errorMessages = errorMessage;
        this.buttonDisabled = true;
      }

      else if (x.first_player_1 <= 10 && x.second_player_1 <= 10) {
        this.buttonDisabled = true;
      }

      else if (x.first_player_1 > 11 && x.first_player_1 - x.second_player_1 > 2) {
        this.buttonDisabled = true;
        this.errorMessages = '';
      }

      else if (x.second_player_1 > 11 && x.second_player_1 - x.first_player_1 > 2) {
        this.buttonDisabled = true;
        this.errorMessages = '';
      }

      //FIRST CASE - SET 2
      else if (x.first_player_2 == 10 && x.second_player_2 == 10) {
        errorMessage = 'Error 10:10 in SET 2';
        this.errorMessages = errorMessage;
        this.buttonDisabled = true;
      }

      else if (x.first_player_2 >= 10 && x.second_player_2 >= 10 && x.first_player_2 - 1 == x.second_player_2) {
        errorMessage = 'Error 1 difference in SET 2';
        this.errorMessages = errorMessage;
        this.buttonDisabled = true;
      }

      else if (x.first_player_2 >= 10 && x.second_player_2 >= 10 && x.first_player_2 - x.second_player_2 > 2) {
        errorMessage = 'Error more than two result in SET 2';
        this.errorMessages = errorMessage;
        this.buttonDisabled = true;
      }

      else if (x.first_player_2 >= 10 && x.second_player_2 >= 10 && x.first_player_2 == x.second_player_2) {
        errorMessage = 'Error same values in SET 2';
        this.errorMessages = errorMessage;
        this.buttonDisabled = true;
      }

      //SECOND CASE - SET 2
      else if (x.first_player_2 >= 10 && x.second_player_2 >= 10 && x.second_player_2 - 1 == x.first_player_2) {
        errorMessage = 'Error 1 difference in SET 2';
        this.errorMessages = errorMessage;
        this.buttonDisabled = true;
      }

      else if (x.first_player_2 >= 10 && x.second_player_2 >= 10 && x.second_player_2 - x.first_player_2 > 2) {
        errorMessage = 'Error more than two result in SET 2';
        this.errorMessages = errorMessage;
        this.buttonDisabled = true;
      }

      else if (x.first_player_2 <= 10 && x.second_player_2 <= 10) {
        this.buttonDisabled = true;
      }
      
      else if (x.first_player_2 > 11 && x.first_player_2 - x.second_player_2 > 2) {
        this.buttonDisabled = true;
        this.errorMessages = '';
      }

      else if (x.second_player_2 > 11 && x.second_player_2 - x.first_player_2 > 2) {
        this.buttonDisabled = true;
        this.errorMessages = '';
      }



      //FIRST CASE - SET 3
      else if (x.first_player_3 == 10 && x.second_player_3 == 10) {
        errorMessage = 'Error 10:10 in SET 3';
        this.errorMessages = errorMessage;
        this.buttonDisabled = true;
      }

      else if (x.first_player_3 >= 10 && x.second_player_3 >= 10 && x.first_player_3 - 1 == x.second_player_3) {
        errorMessage = 'Error 1 difference in SET 3';
        this.errorMessages = errorMessage;
        this.buttonDisabled = true;
      }

      else if (x.first_player_3 >= 10 && x.second_player_3 >= 10 && x.first_player_3 - x.second_player_3 > 2) {
        errorMessage = 'Error more than two result in SET 3';
        this.errorMessages = errorMessage;
        this.buttonDisabled = true;
      }


      else if (x.first_player_3 >= 10 && x.second_player_3 >= 10 && x.first_player_3 == x.second_player_3) {
        errorMessage = 'Error same values in SET 3';
        this.errorMessages = errorMessage;
        this.buttonDisabled = true;
      }

      //SECOND CASE - SET 3
      else if (x.first_player_3 >= 10 && x.second_player_3 >= 10 && x.second_player_3 - 1 == x.first_player_3) {
        errorMessage = 'Error 1 difference in SET 3';
        this.errorMessages = errorMessage;
        this.buttonDisabled = true;
      }

      else if (x.first_player_3 >= 10 && x.second_player_3 >= 10 && x.second_player_3 - x.first_player_3 > 2) {
        errorMessage = 'Error more than two result in SET 3';
        this.errorMessages = errorMessage;
        this.buttonDisabled = true;
      }

      else if (x.first_player_3 <= 10 && x.second_player_3 <= 10) {
        this.buttonDisabled = true;
      }

      else if (x.first_player_3 > 11 && x.first_player_3 - x.second_player_3 > 2) {
        this.buttonDisabled = true;
        this.errorMessages = '';
      }

      else if (x.second_player_3 > 11 && x.second_player_3 - x.first_player_3 > 2) {
        this.buttonDisabled = true;
        this.errorMessages = '';
      }


      //FIRST CASE - SET 4
      else if (x.first_player_4 == 10 && x.second_player_4 == 10) {
        errorMessage = 'Error 10:10 in SET 4';
        this.errorMessages = errorMessage;
        this.buttonDisabled = true;
      }

      else if (x.first_player_4 >= 10 && x.second_player_4 >= 10 && x.first_player_4 - 1 == x.second_player_4) {
        errorMessage = 'Error 1 difference in SET 4';
        this.errorMessages = errorMessage;
        this.buttonDisabled = true;
      }

      else if (x.first_player_4 >= 10 && x.second_player_4 >= 10 && x.first_player_4 - x.second_player_4 > 2) {
        errorMessage = 'Error more than two result in SET 4';
        this.errorMessages = errorMessage;
        this.buttonDisabled = true;
      }

      else if (x.first_player_4 >= 10 && x.second_player_4 >= 10 && x.first_player_4 == x.second_player_4) {
        errorMessage = 'Error same values in SET 4';
        this.errorMessages = errorMessage;
        this.buttonDisabled = true;
      }

      //SECOND CASE - SET 4
      else if (x.first_player_4 >= 10 && x.second_player_4 >= 10 && x.second_player_4 - 1 == x.first_player_4) {
        errorMessage = 'Error 1 difference in SET 4';
        this.errorMessages = errorMessage;
        this.buttonDisabled = true;
      }

      else if (x.first_player_4 >= 10 && x.second_player_4 >= 10 && x.second_player_4 - x.first_player_4 > 2) {
        errorMessage = 'Error more than two result in SET 4';
        this.errorMessages = errorMessage;
        this.buttonDisabled = true;
      }

      else if (x.first_player_4 <= 10 && x.second_player_4 <= 10) {
        this.buttonDisabled = true;
      }

      
      else if (x.first_player_4 > 11 && x.first_player_4 - x.second_player_4 > 2) {
        this.buttonDisabled = true;
        this.errorMessages = '';
      }

      else if (x.second_player_4 > 11 && x.second_player_4 - x.first_player_4 > 2) {
        this.buttonDisabled = true;
        this.errorMessages = '';
      }


      //FIRST CASE - SET 5
      else if (x.first_player_5 == 10 && x.second_player_5 == 10) {
        errorMessage = 'Error 10:10 in SET 5';
        this.errorMessages = errorMessage;
        this.buttonDisabled = true;
      }

      else if (x.first_player_5 >= 10 && x.second_player_5 >= 10 && x.first_player_5 - 1 == x.second_player_5) {
        errorMessage = 'Error 1 difference in SET 5';
        this.errorMessages = errorMessage;
        this.buttonDisabled = true;
      }

      else if (x.first_player_5 >= 10 && x.second_player_5 >= 10 && x.first_player_5 - x.second_player_5 > 2) {
        errorMessage = 'Error more than two result in SET 5';
        this.errorMessages = errorMessage;
        this.buttonDisabled = true;
      }

      else if (x.first_player_5 >= 10 && x.second_player_5 >= 10 && x.first_player_5 == x.second_player_5) {
        errorMessage = 'Error same values in SET 5';
        this.errorMessages = errorMessage;
        this.buttonDisabled = true;
      }

      //SECOND CASE - SET 5
      else if (x.first_player_5 >= 10 && x.second_player_5 >= 10 && x.second_player_5 - 1 == x.first_player_5) {
        errorMessage = 'Error 1 difference in SET 5';
        this.errorMessages = errorMessage;
        this.buttonDisabled = true;
      }

      else if (x.first_player_5 >= 10 && x.second_player_5 >= 10 && x.second_player_5 - x.first_player_5 > 2) {
        errorMessage = 'Error more than two result ';
        this.errorMessages = errorMessage;
        this.buttonDisabled = true;
      }

      else if (x.first_player_5 <= 10 && x.second_player_5 <= 10) {
        this.buttonDisabled = true;
      }

      
      else if (x.first_player_5 > 11 && x.first_player_5 - x.second_player_5 > 2) {
        this.buttonDisabled = true;
        this.errorMessages = '';
      }

      else if (x.second_player_5 > 11 && x.second_player_5 - x.first_player_5 > 2) {
        this.buttonDisabled = true;
        this.errorMessages = '';
      }

      else {
        this.errorMessages = '';
        this.buttonDisabled = false;
      }
    });

  }

  createPlayer(): FormGroup {
    return this.formBuilder.group({
      first_name: [null, [Validators.required, Validators.maxLength(128)]],
      last_name: [null, [Validators.required, Validators.maxLength(128)]],
      gender: ['', [Validators.required, Validators.maxLength(128)]],
      country: [null, [Validators.required, Validators.maxLength(128)]],
      birthday: [null, [Validators.required, Validators.maxLength(128)]],
      fileSource: [null]
    });
  }

  onImageChange(event: any, index: any) {
    let reader = new FileReader();
    this.file = event.target.files[0];

    reader.readAsDataURL(this.file);
    reader.onload = () => {
      this.fileUrl = reader.result?.toString();
      this.Players.at(index).patchValue(this.fileUrl);

      let players = this.playerForm.get('players') as FormArray;
      players.controls[index].patchValue({ fileSource: this.fileUrl })
    };
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

    if (this.form.value.first_player_1 > this.form.value.second_player_1) {
      this.winsPlayer1 = this.winsPlayer1 + 1;
    } else {
      this.winsPlayer2 = this.winsPlayer2 + 1;
    }

    if (this.form.value.first_player_2 > this.form.value.second_player_2) {
      this.winsPlayer1 = this.winsPlayer1 + 1;
    } else {
      this.winsPlayer2 = this.winsPlayer2 + 1;
    }

    if (this.form.value.first_player_3 > this.form.value.second_player_3) {
      this.winsPlayer1 = this.winsPlayer1 + 1;
    } else {
      this.winsPlayer2 = this.winsPlayer2 + 1;
    }

    if (this.form.value.first_player_4 > this.form.value.second_player_4) {
      this.winsPlayer1 = this.winsPlayer1 + 1;
    } else {
      this.winsPlayer2 = this.winsPlayer2 + 1;
    }

    if (this.form.value.first_player_5 > this.form.value.second_player_5) {
      this.winsPlayer1 = this.winsPlayer1 + 1;
    } else {
      this.winsPlayer2 = this.winsPlayer2 + 1;
    }

    if (this.winsPlayer1 > this.winsPlayer2) {
      this.form.value.first_player_win = true;
    } else {
      this.form.value.first_player_win = false;
    }

    if (this.winsPlayer2 > this.winsPlayer1) {
      this.form.value.second_player_win = true;
    } else {
      this.form.value.second_player_win = false;
    }

    let type = 'winner'
    const ref = this.dialog.open(OverviewModalComponent,{data:  type});
    ref.componentInstance.selectedUser = this.form.value;

    this.pickedPlayers = [];
    this.form.reset();
    this.matchStart = false;
    this.winsPlayer1 = 0;
    this.winsPlayer2 = 0;
  }

  openDialogOverview(player: any, type:string): void {
    const ref = this.dialog.open(OverviewModalComponent,{data:  type});
    ref.componentInstance.selectedUser = player;
  }

  togglePlayer(user: IUser) {
    let checker = false;

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
    this.matchesList.push(form.value);
  }

}