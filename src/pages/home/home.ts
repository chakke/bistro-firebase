import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

interface ItemPage {
  name: string;
  page: string;
}


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  items: Array<ItemPage> = [
    { name: "Firebase Storage", page: "FirebaseStoragePage" },
    { name: "Bistro Restaurants", page: "BistroRestaurantsPage" },
    { name: "Bistro Staffs", page: "BistroStaffsPage" },
    { name: "Bistro Tables", page: "BistroTablesPage" },
    { name: "Bistro Foods", page: "BistroFoodsPage" },
    
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  onClickItem(itemPage: ItemPage) {
    if (itemPage.page.length > 0) {
      this.navCtrl.push(itemPage.page);
    }
  }

}
