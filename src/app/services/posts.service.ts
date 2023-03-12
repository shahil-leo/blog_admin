import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { Post } from '../modals/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private toaster: ToastrService
  ) { }

  // uploading image and data into the firebase
  uploadImage<T>(SelectedImage: T, PostData: Post) {
    const filePath = `pathIMG/${Date.now()}`
    // Creating a unique number every time we submit our form that is important only then we can identify the picture otherwise problems will be there
    console.log(filePath)
    // this is the angularFireStorage upload method for uploading images first parameter we need is the unique path and the next parameter is the image
    // and if the uploading is done inside that arrow function we will get the download url of the image uploaded
    this.storage.upload(filePath, SelectedImage).then(() => {
      // in Firebase, a "ref" refers to a database reference object that points to a specific location in the Firebase Realtime Database.
      //  we will give the path of the file inside the ref method and ref will give us the specific data
      //  thats way are saying in the starting we need a unique key for every image in that only we can get that image using ref
      // then we will call the getDownloadUrl method and then it will be a observable and we will subscribe to the observable and get the downloadable url
      this.storage.ref(filePath).getDownloadURL().subscribe((URL) => {
        // and once we get the downloadable Url then we will insert that into our Post Data PostImage path
        PostData.postImgPath = URL;

        this.saveData(PostData)
      })
    })

  }
  // saving data into database we will get the object using parameter and we will add that into a new collection called posts
  //  and then add the data into that
  saveData(PostData: Post) {
    this.afs.collection('posts').add(PostData).then((docRef) => {
      this.toaster.success("Data inserted SuccessFully")

    })
  }


  // loadData from the database reading

  loadData() {
    return this.afs.collection('posts').snapshotChanges().pipe(
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



}
