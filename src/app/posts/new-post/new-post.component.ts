import { CategoriesService } from './../../services/categories.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/modals/post';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  permalink: string = ''
  imgSrc: string | ArrayBuffer | null | undefined = '../../../assets/template.png'
  categories!: Array<any>
  newForm: FormGroup
  titleValue: string = ''
  // Reactive forms

  constructor(private categoryService: CategoriesService, private fb: FormBuilder) {

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
  }
  // submit button when we click the submit button the values of all the input will get
  checking() {
    const invalid = [];
    const controls = this.newForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    console.log(invalid)
    return invalid;
  }
  onSubmit() {
    this.checking()
    const DataSorted = this.newForm.value.category.split('-')
    const postData: Post = {
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
    console.log(postData)
  }

}

