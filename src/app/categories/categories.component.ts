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
  // we are creating a form status for the form and we can do the logic depending on the variable if we click on the edit button then we will be the edit otherwise we will be in the add
  formStatus: string = 'New'
  categoryId!: string
  constructor(private CategoryService: CategoriesService) { }

  categoryArray!: any;

  forms(formsData: any) {
    // we are getting the value inside the formsData we have somany methods also
    let categoryData: Category = {
      category: formsData.value.category,
    }

    if (this.formStatus === 'New') {
      this.CategoryService.saveData(categoryData)

    } else if (this.formStatus === 'Edit') {

      this.CategoryService.updateData(this.categoryId, categoryData)
      this.formStatus = 'New'
    }

    formsData.reset()
  }
  ngOnInit(): void {
    this.CategoryService.loadData().subscribe(value => {
      this.categoryArray = value
    })
  }
  onEdit(category: string, id: string) {
    this.formStatus = "Edit"
    this.formCategory = category
    this.categoryId = id
  }

  onDelete(id: string) {
    this.CategoryService.deleteData(id)
  }


}
