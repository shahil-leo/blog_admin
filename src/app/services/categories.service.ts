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
        //  line 16 we are creating a nested collection inside one collection so first we need the collection name second we need the id of the created one
        // categories collection inside that collection we have a document inside that document we have a collection called subcategories and inside that collection we will add the subcategoryData as a document
        // ? this.afs.collection('categories').doc(docRef.id).collection('subcategories').add(this.subcategoryData)
        // this is the structure
        // first collection , id
        // second collection ,id
        // third collection ,id
        //  Another method of doing the same thing
        // this.afs.doc(`categories/${docRef.id}/subcategories/${docRef.id}`)
        console.log(docRef);
      })
      .catch(error => {
        console.log(error)
      })
  }

  // loads and retrieve every data in a collection using the method
  /***********************  steps in reading data from the database **************************/
  //?  we have to define the collection we want from the database
  //?  from the snapshotChanges we will get all the information and data real time\
  //       * snapshotChanges
  /***
   *In Firebase, snapshotChanges() is a method provided by the AngularFire library that allows you to listen for changes to a Firestore collection and receive updates in real-time.
   * When you call snapshotChanges() on a Firestore collection reference, it returns an Observable that emits an array of DocumentChangeAction objects whenever the collection changes.
   *  These DocumentChangeAction objects represent the changes that were made to the documents in the collection,
   * and contain information such as the type of change (added, modified, or removed), the document ID, and the document data.
   * You can use the snapshotChanges() method to monitor changes to your Firestore data and keep your app's UI up-to-date in real-time.
   * For example, you could subscribe to the Observable returned by snapshotChanges() and update your app's UI whenever a document in the collection is added, modified, or removed.
   * Overall, snapshotChanges() is a powerful tool that enables real-time updates and synchronization between your app and your Firestore database.
   * */


  loadData() {
    return this.afs.collection('categories').snapshotChanges().pipe(
      map(action => {
        // console.log(action)
        //  in there we will get the the DocumentChangeAction objects whenever the collection changes and contain
        // the information such as the type of change (added or modified ) and the id also
        // the return will give the result to the next operation and then finally we will return the id and data and that we will get using the return
        return action.map(a => {
          const data = a.payload.doc.data
          const id = a.payload.doc.id

          return { id, data }
        })
      })
    )
  }

}

