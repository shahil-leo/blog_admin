import { Component } from '@angular/core';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

  constructor(private CategoryService: CategoriesService) { }

  category: any = {
    name: ''
  }
  subcategoryData = {
    subCategory: 'subCategory1'
  }
  SubSubcategoryData = {
    subCategory: 'subCategory1'
  }

  forms(formsData: any) {
    let categoryData = {
      category: formsData.value.category
    }
    this.CategoryService.saveData(categoryData)

  }

}
