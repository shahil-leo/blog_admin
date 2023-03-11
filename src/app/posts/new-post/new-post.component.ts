import { CategoriesService } from './../../services/categories.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/modals/post';
import { PostsService } from 'src/app/services/posts.service';
import { async } from '@firebase/util';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
  selectedImage: any
  permalink: string = ''
  imgSrc: any = 'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg';
  categories!: Array<any>
  newForm: FormGroup
  titleValue: string = ''
  postData!: Post
  shahil: any
  // Reactive forms

  constructor(
    private categoryService: CategoriesService,
    private fb: FormBuilder,
    private postService: PostsService
  ) {
    this.newForm = fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      permalink: [this.permalink],
      excerpt: ['', [Validators.required, Validators.minLength(50)]],
      category: ['', Validators.required],
      postImg: ['', Validators.required,],
      content: ['', Validators.required]
    })
  }
  // getting all the form controls name
  get fc() {
    return this.newForm.controls
  }
  // onInit function
  ngOnInit(): void {
    this.categoryService.loadData().subscribe(value => {
      this.categories = value
    })
    // ng model in the form title and for the permalink
    this.newForm.get('title')?.valueChanges.subscribe((value) => {
      this.permalink = value.replace(/\s/g, '-')

    })

  }
  // uploading image into the field for showing a demo
  showPreview($event: any) {
    const reader = new FileReader()
    reader.onload = (e) => {
      this.imgSrc = e.target?.result
    }
    reader.readAsDataURL($event.target.files[0])
    this.selectedImage = $event.target.files[0]

  }
  // this helped me to debug the code in the form i was not able to find which form is not validating using this method i get
  checking() {
    const invalid = [];
    const controls = this.newForm.controls;
    console.log(controls)
    for (const name in controls) {
      console.log(name)
      console.log(controls[name]);

      if (controls[name].invalid) {
        console.log(controls);

        invalid.push(name);
      }
    }
    console.log(invalid)
    return invalid;
  }
  // submit button when we click the submit button the values of all the input will get
  onSubmit() {
    // this.checking()
    const DataSorted = this.newForm.value.category.split('-')

    this.postData = {
      title: this.newForm.value.title,
      permalink: this.permalink,
      category: {
        categoryId: DataSorted[0],
        category: DataSorted[1]
      },
      postImgPath: '',
      excerpt: this.newForm.value.excerpt,
      content: this.newForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'New',
      createdAt: new Date()
    }

    this.postService.uploadImage(this.selectedImage, this.postData)
  }

}

