import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

  category: any = {
    name: ''
  }
  // we are importing the angular fire store module to connect with the angular firestore database and to do crud operation with the firestore
  constructor(private afs: AngularFirestore) { }

  forms(formsData: any) {
    let categoryData = {
      category: formsData.value.category
    }
    // this is the method that we are doing with connecting our firebase database with our application and then creating a collection inside the database called the categories and adding data inside the collection and passing the object and then we are getting a asynchronous code we will have a success and error so we have to catch both from the response we have a callback function
    this.afs.collection('categories').add(categoryData).then((docRef) => { console.log(docRef) }).catch(error => { console.log(error) })

  }

}
