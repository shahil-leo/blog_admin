import { Component, OnInit } from '@angular/core';
import { Category } from '../modals/category';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  formCategory: any;
  formStatus: string = 'New'
  categoryId!: string
  constructor(private CategoryService: CategoriesService) { }

  categoryArray!: any;

  forms(formsData: any) {
    let categoryData: Category = {
      category: formsData.value.category,
    }
    console.log(this.formStatus)
    if (this.formStatus === 'Add') {
      console.log(this.formStatus)
      this.CategoryService.saveData(categoryData)
      formsData.reset()
    } else if (this.formStatus === 'Edit') {
      console.log('shahil')
      this.CategoryService.updateData(this.categoryId, categoryData)
    }
  }
  ngOnInit(): void {
    this.CategoryService.loadData().subscribe(value => {
      this.categoryArray = value
      console.log(this.categoryArray)
    })
  }
  onEdit(category: string, id: string) {
    this.formStatus = "Edit"
    this.formCategory = category
    this.categoryId = id
  }


}
