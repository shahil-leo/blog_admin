import { Component, OnInit } from '@angular/core';
import { Category } from '../modals/category';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(private CategoryService: CategoriesService) { }


  forms(formsData: any) {
    let categoryData: Category = {
      category: formsData.value.category
    }
    this.CategoryService.saveData(categoryData)
  }
  ngOnInit(): void {
    this.CategoryService.loadData().subscribe(value => {
      console.log(value)
    })
  }


}
