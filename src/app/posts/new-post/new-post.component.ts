import { CategoriesService } from './../../services/categories.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/modals/post';
import { PostsService } from 'src/app/services/posts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
  // Global variables
  selectedImage: any
  permalink: string = ''
  imgSrc: any = 'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg';
  categories!: Array<any>
  newForm!: FormGroup
  titleValue: string = ''
  postData!: Post
  singlePost!: any
  editParamId!: string
  formStatus: string = 'Add New'

  // Reactive forms
  constructor(
    private categoryService: CategoriesService,
    private fb: FormBuilder,
    private postService: PostsService,
    private route: ActivatedRoute,
  ) {
    // getting the router parameter for the edit option in the all component we need to get the id in the others section
    this.route.queryParams.subscribe(value => {
      this.editParamId = value.id
      if (this.editParamId) {
        // we are loading one data using the getting id from the route parameter we will get all the contents about the single post
        // This part is for the edited posts not for the new
        this.postService.loadOneData(this.editParamId).subscribe((form) => {
          this.singlePost = form
          this.newForm = fb.group({
            title: [this.singlePost.title, [Validators.required, Validators.minLength(10)]],
            permalink: [this.permalink],
            excerpt: [this.singlePost.excerpt, [Validators.required, Validators.minLength(50)]],
            category: [`${this.singlePost.category.categoryId}-${this.singlePost.category.category}`, Validators.required],
            postImg: ['', Validators.required,],
            content: [this.singlePost.content, Validators.required]
          })
          this.formStatus = 'Edit'
          this.imgSrc = this.singlePost.postImgPath
          this.permalinkChange()
        })

      }
      // This form is for the new forms
      this.newForm = fb.group({
        title: ['', [Validators.required, Validators.minLength(10)]],
        permalink: [this.permalink],
        excerpt: ['', [Validators.required, Validators.minLength(50)]],
        category: ['', Validators.required],
        postImg: ['', Validators.required,],
        content: ['', Validators.required]
      })
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
      // first we will get all the data from the firebase store for the categories
    })
    // ng model in the form title and for the permalink
    this.permalinkChange()
    // getting query params from the query
  }
  //  image
  // when any type of change happens this event will trigger then we will retrieve the data
  showPreview($event: any) {
    const reader = new FileReader()
    reader.onload = (e) => {
      this.imgSrc = e.target?.result
      // here we are only getting the details and the files of the image and the
    }
    reader.readAsDataURL($event.target.files[0])
    // this selected image is for converting the file into a data url for the firebase
    this.selectedImage = $event.target.files[0]

  }
  // this helped me to debug the code in the form i was not able to find which form is not validating using this method i get
  checking() {
    const invalid = [];
    const controls = this.newForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
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

    this.postService.uploadImage(this.selectedImage, this.postData, this.formStatus, this.editParamId)

  }
  //  change in the permalink text in the edit and the function also function
  permalinkChange() {
    this.newForm.get('title')?.valueChanges.subscribe((value) => {

      this.permalink = value.replace(/\s/g, '-')
    })
  }

}

