import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
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
    private toaster: ToastrService,
    private router: Router
  ) { }

  // uploading image and data into the firebase
  uploadImage<T>(SelectedImage: T, PostData: Post, formStatus: string, id: string) {
    const filePath = `pathIMG/${Date.now()}`
    // Creating a unique number every time we submit our form that is important only then we can identify the picture otherwise problems will be there
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
        if (formStatus == "Edit") {
          this.updateData(id, PostData)
        } else {
          this.saveData(PostData)
        }
      })
    })

  }

  // saving data into database we will get the object using parameter and we will add that into a new collection called posts
  //  and then add the data into that
  saveData(PostData: Post) {
    this.afs.collection('posts').add(PostData).then((docRef) => {
      this.toaster.success("Data inserted SuccessFully")
      this.router.navigate(['/posts'])
    })
  }

  // loadData from the database reading
  loadData() {
    return this.afs.collection('posts').snapshotChanges().pipe(
      map(actions => {
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
  // if we are editing the form then we need a single data using the params
  loadOneData(id: string) {
    return this.afs.collection('posts').doc(id).valueChanges()
  }

  updateData(id: string, postData: any) {
    console.log(postData)
    this.afs.doc(`posts/${id}`).update(postData).then(() => {
      this.toaster.success('Post updated SuccessFully')
      this.router.navigate(['/posts'])
    })
  }

  deleteImage(postImgPath: string, id: string) {
    this.storage.storage.refFromURL(postImgPath).delete().then(() => {
      this.deleteData(id)
    })
  }

  deleteData(id: string) {
    this.afs.doc(`posts/${id}`).delete().then(() => {
      this.toaster.warning("Data Deleted ....!")
    })
  }

}
