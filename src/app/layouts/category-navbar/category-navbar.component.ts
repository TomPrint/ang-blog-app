import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-category-navbar',
  templateUrl: './category-navbar.component.html',
  styleUrls: ['./category-navbar.component.css']
})
export class CategoryNavbarComponent implements OnInit {
  categoryArray: Category[] =[]

  constructor (private categoryService: CategoriesService){}


  ngOnInit(): void {
    this.categoryService.getData().subscribe(val =>{
      this.categoryArray = val

    })
    
  }



}
