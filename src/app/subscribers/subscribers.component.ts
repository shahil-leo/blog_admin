import { Component } from '@angular/core';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.scss']
})
export class SubscribersComponent {

  subscribersArray: any

  constructor(private subService: SubscribersService) {
    this.subService.loadData().subscribe(val => {
      this.subscribersArray = val
    })
  }

  onDelete(id: string) {
    console.log(id)
    this.subService.deleteData(id)
  }

}
