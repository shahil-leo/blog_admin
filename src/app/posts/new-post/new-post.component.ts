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

  title: string = '';
  excerpt: string = ''

  // Reactive forms

  constructor(private categoryService: CategoriesService, private fb: FormBuilder) {

    // this is a method for usiing 2 way data binding in the reactive forms value change will emit data when the

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
