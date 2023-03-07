import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators'
// importing toaster service
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  // we are importing the angular fire store module to connect with the angular firestore database and to do crud operation with the firestore
  constructor(
    private afs: AngularFirestore,
    private toaster: ToastrService) { }

  saveData(data: any) {
    // this is the method that we are doing with connecting our firebase database with our application and then creating a collection inside the database called the categories and adding data inside the collection and passing the object and then we are getting a asynchronous code we will have a success and error so we have to catch both from the response we have a callback function
    this.afs.collection('categories').add(data)
      .then(docRef => {
        console.log(docRef);
        this.toaster.success('Data inserted successfully')
      })
      .catch(error => {
        console.log(error)
      })
  }

  // loads and retrieve every data in a collection using the method

  loadData() {
    this.afs.collection('categories').snapshotChanges().pipe(
      map(action => {
        action.map(a => {
          const data = a.payload.doc.data
          const id = a.payload.doc.id
        })
      })
    )
  }

}

 //  line 16 we are creating a nested collection inside one collection so first we need the collection name second we need the id of the created one
      // categories collection inside that collection we have a document inside that document we have a collection called subcategories and inside that collection we will add the subcategoryData as a document
      // ? this.afs.collection('categories').doc(docRef.id).collection('subcategories').add(this.subcategoryData)
      // this is the structure
      // first collection , id
      // second collection ,id
      // third collection ,id
      //  Another method of doing the same thing
      // this.afs.doc(`categories/${docRef.id}/subcategories/${docRef.id}`)
