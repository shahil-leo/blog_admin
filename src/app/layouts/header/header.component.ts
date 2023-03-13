import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedUser!: string
  localStorage!: any
  ngOnInit(): void {
    // we are getting all the details from the local storage from the login user
    //  And it will be in a string format so we want to convert into object so we can manipulate and get the login user details using that
    this.localStorage = localStorage.getItem('user')
    // converting string into json format
    this.loggedUser = JSON.parse(this.localStorage).email
  }

  isOpen: boolean = false

  isTrue() {
    this.isOpen = !this.isOpen
    console.log(this.isOpen)
  }
}
