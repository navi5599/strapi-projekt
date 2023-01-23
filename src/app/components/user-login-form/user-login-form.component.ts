import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchDataService } from '../../services/fetch-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.css'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userCredentials: any = {
    Username: '',
    Password: '',
  };

  constructor(
    public fetchApiData: FetchDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  loginUser(): void {
    this.fetchApiData.userLogin(this.userCredentials).subscribe(
      (response) => {
        console.log('ovo je rezultat koji trazimo');
        console.log(response);
        localStorage.setItem('token', response.jwt);
        localStorage.setItem('user', response.user.Username);
        this.dialogRef.close(); // This will close the modal on success!
        this.snackBar.open('Welcome back!', 'OK', {
          duration: 2000,
        });
        // this.router.navigate(['home']);
      },

      (response) => {
        console.log(response);
        this.snackBar.open(response, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
