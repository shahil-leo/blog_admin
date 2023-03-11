import { CategoriesService } from './../../services/categories.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
      permalink: [{ value: '', disabled: true }, [Validators.required]],
      excerpt: ['', [Validators.required, Validators.minLength(50)]],
      category: ['', Validators.required],
      postImg: ['', Validators.required,],
      content: ['', Validators.required]
    })
    // ng model in the form title and for the permalink
    this.newForm.get('title')?.valueChanges.subscribe((value) => {
      this.permalink = value.replace(/\s/g, '-')

    })
  }



  get fc() {
    return this.newForm.controls
  }



  ngOnInit(): void {
    this.categoryService.loadData().subscribe(value => {
      this.categories = value
    })
  }


  showPreview($event: any) {
    const reader = new FileReader()
    reader.onload = (e) => {
      this.imgSrc = e.target?.result
    }
    reader.readAsDataURL($event.target.files[0])
  }


}
