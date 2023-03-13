import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private authSer: AuthService) { }
  loggedUser!: string
  localStorage!: any
  isLoggedIn$!: Observable<boolean>

  ngOnInit(): void {
    // we are getting all the details from the local storage from the login user
    //  And it will be in a string format so we want to convert into object so we can manipulate and get the login user details using that
    this.localStorage = localStorage.getItem('user')
    // converting string into json format
    this.loggedUser = JSON.parse(this.localStorage).email
    this.authSer.isLoggedIn()

  }

  isOpen: boolean = false

  isTrue() {
    this.isOpen = !this.isOpen
    console.log(this.isOpen)
  }

  logOut() {
    this.authSer.logout()

  }
}
