import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {


  isOpen: boolean = false

  isTrue() {
    this.isOpen = !this.isOpen
    console.log(this.isOpen)
  }

}
