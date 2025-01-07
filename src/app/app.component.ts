import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';



let menuItems = ['Главная', 'Стройматериалы', 'Инструменты', 'Электрика', 'Интерьер и одежда'];



let upperCaseMenuItems = menuItems.map(
  (item: string) => {
    return item.toUpperCase();
  }
)
let aboutCompany = function(str: string){
  return str
};




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mentoring-first-project';  
  headerItem1 = 'Главная';
  headerItem2 = aboutCompany('О компании');
  headerItem3 = menuItems[0];
  isShowCatalog = !true;
  isShowBanner = !true;
  isUpperCase = true;
  newPages: number[] = [5,4,3,2,1];
  menuItems: string[] = upperCaseMenuItems;
 
  changeMenu() {
    this.menuItems = upperCaseMenuItems.map(
       (item : string) => this.isUpperCase ? item.toLowerCase() : item.toUpperCase() ) 
     
    this.isUpperCase = !this.isUpperCase;
    
  }

  
 
 
};





