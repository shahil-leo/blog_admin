import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Post } from '../modals/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private storage: AngularFireStorage) { }

  // uploading image and data
  uploadImage<T>(SelectedImage: T, PostData: Post) {
    const filePath = `pathIMG/${Date.now()}`
    console.log(filePath)
    this.storage.upload(filePath, SelectedImage).then(() => {
      this.storage.ref(filePath).getDownloadURL().subscribe((URL) => {
        PostData.postImgPath = URL;
        console.log(PostData)
      })
    })

  }
}
