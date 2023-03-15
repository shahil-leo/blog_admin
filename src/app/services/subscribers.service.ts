import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  constructor(private afs: AngularFirestore, private toastr: ToastrService) { }

  loadData() {
    return this.afs.collection('subscribers').snapshotChanges().pipe(
      map(actions => {
        // console.log(action)
        //  in there we will get the the DocumentChangeAction objects whenever the collection changes and contain
        // the information such as the type of change (added or modified ) and the id also
        // the return will give the result to the next operation and then finally we will return the id and data and that we will get using the return
        return actions.map(a => {
          const data = a.payload.doc.data()
          const id = a.payload.doc.id
          return { id, data }
        })
      })
    )
  }

  deleteData(id: string) {

    this.afs.collection('subscribers').doc(id).delete().then(doc => {
      this.toastr.success("element removed")
    })
  }

}
