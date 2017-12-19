import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase';
import { Food } from '../../providers/bistro/classes/food';
import { FirebaseFile } from '../../providers/firebase/classes/firebase-file';


class SearchableFood extends Food {
  query: string = "";
}

@IonicPage()
@Component({
  selector: 'page-bistro-foods',
  templateUrl: 'bistro-foods.html',
})
export class BistroFoodsPage {
  foodsRef: AngularFirestoreCollection<Food>;
  mFoodDatas: Array<SearchableFood> = [];
  mFoods: Array<SearchableFood> = [];
  mSearchStr: string = "";
  mPageNumber: number = 1;
  mCollectionPath: string = "products/bistro/foods";

  _DownloadUrls: Map<string, string> = new Map<string, string>();

  constructor(public mAngularHttpClient: HttpClient, public mAngularFirestore: AngularFirestore, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidEnter() {
    console.log("View Bistro foods enter");




    this._ConnectToFirebase();

    this.mAngularFirestore.collection("storage/uploads/files").valueChanges().subscribe(data => {
      data.forEach(item => {
        this._DownloadUrls.set(item['name'], item['url']);
      });
      this._UploadFoods();
    });

    // this._UploadTypes();
    // this._UploadCategories();
    // this._UploadUnits();
    // this._UploadSizes();
    // this._UploadStates();
    // this._UploadSales();
    // this._UploadOptions();
  }

  onClickFood(food: Food) {
    this.navCtrl.push("FoodDetailPage", {
      food: food
    });
  }

  onClickBack() {
    this._GoHome();
  }

  _GoHome() {
    if (this.navCtrl.getViews().length > 1) {
      this.navCtrl.pop();
    } else {
      this.navCtrl.setRoot("HomePage");
    }
  }


  _ConnectToFirebase() {
    this.foodsRef = this.mAngularFirestore.collection(this.mCollectionPath);
    this.foodsRef.snapshotChanges().subscribe(
      snapshot => {
        this.mFoodDatas = [];
        snapshot.forEach(item => {
          let foodData = item.payload.doc.data();
          this.mFoodDatas.push(this.getFoodFromFirebaseData(foodData));
        });
        this._DoSearch();
      }
    );
  }

  getFoodFromFirebaseData(foodData: any): SearchableFood {
    let food: SearchableFood = {
      firebase_id: foodData.id,
      firebase_reference: foodData.firebase_reference,
      id: foodData.id,
      album_id: foodData.album_id,
      category: foodData.category,
      currency: foodData.currency,
      description: foodData.description,
      en_name: foodData.en_name,
      image: foodData.image,
      name: foodData.name,
      options: foodData.options,
      paper: foodData.paper,
      price: foodData.price,
      sales: foodData.sales,
      size: foodData.size,
      state: foodData.state,
      type: foodData.type,
      unit: foodData.unit,
      query: ""
    };
    food.query = this._GetSearchString(food);
    return food;
  }

  _UploadUnits() {

    this.mAngularHttpClient.get('./assets/data/food_units.json').subscribe(data => {
      let collectionPath = "products/bistro/food_units";
      let unitsRef = this.mAngularFirestore.collection(collectionPath);
      let units = data["units"];
      for (var dataKey in units) {
        let unit = units[dataKey];
        if (unit) {
          unit.firebase_id = unit.id;
          unit.firebase_reference = collectionPath + "/" + unit.id;
          unitsRef.doc(unit.id).set(unit);
        }
      }
    });
  }
  _UploadSizes() {
    this.mAngularHttpClient.get('./assets/data/food_sizes.json').subscribe(data => {
      let collectionPath = "products/bistro/food_sizes";
      let sizesRef = this.mAngularFirestore.collection(collectionPath);
      let sizes = data["sizes"];
      for (var dataKey in sizes) {
        let size = sizes[dataKey];
        if (size) {
          size.firebase_id = size.id;
          size.firebase_reference = collectionPath + "/" + size.id;
          sizesRef.doc(size.id).set(size);
        }
      }
    });
  }
  _UploadStates() {
    this.mAngularHttpClient.get('./assets/data/food_states.json').subscribe(data => {
      let collectionPath = "products/bistro/food_states";
      let statesRef = this.mAngularFirestore.collection(collectionPath);
      let states = data["states"];
      for (var dataKey in states) {
        let state = states[dataKey];
        if (state) {
          state.firebase_id = state.id;
          state.firebase_reference = collectionPath + "/" + state.id;
          statesRef.doc(state.id).set(state);
        }
      }
    });
  }

  _UploadTypes() {
    this.mAngularHttpClient.get('./assets/data/food_types.json').subscribe(data => {
      let collectionPath: string = "products/bistro/food_types";
      let typesRef = this.mAngularFirestore.collection(collectionPath);
      let types = data["types"];
      for (var dataKey in types) {
        let type = types[dataKey];
        if (type) {
          type.firebase_id = type.id;
          type.firebase_reference = collectionPath + "/" + type.id;
          typesRef.doc(type.id).set(type);
        }
      }
    });
  }
  _UploadSales() {
    this.mAngularHttpClient.get('./assets/data/food_sales.json').subscribe(data => {
      let collectionPath: string = "products/bistro/food_sales";
      let salesRef = this.mAngularFirestore.collection(collectionPath);
      let sales = data["sales"];
      for (var dataKey in sales) {
        let sale = sales[dataKey];
        if (sale) {
          sale.firebase_id = sale.id;
          sale.firebase_reference = collectionPath + "/" + sale.id;
          salesRef.doc(sale.id).set(sale);
        }
      }
    });
  }
  _UploadOptions() {
    this.mAngularHttpClient.get('./assets/data/food_options.json').subscribe(data => {
      let collectionPath: string = "products/bistro/food_options";
      let optionsRef = this.mAngularFirestore.collection(collectionPath);
      let options = data["options"];
      for (var dataKey in options) {
        let option = options[dataKey];
        if (option) {
          option.firebase_id = option.id;
          option.firebase_reference = collectionPath + "/" + option.id;
          optionsRef.doc(option.id).set(option);
        }
      }
    });
  }
  _UploadCategories() {
    this.mAngularHttpClient.get('./assets/data/food_categories.json').subscribe(data => {
      let collectionPath: string = "products/bistro/food_categories";
      let categoriesRef = this.mAngularFirestore.collection(collectionPath);
      let categories = data["categories"];
      for (var dataKey in categories) {
        let category = categories[dataKey];
        if (category) {
          category.firebase_id = category.id;
          category.firebase_reference = collectionPath + "/" + category.id;
          categoriesRef.doc(category.id).set(category);
        }
      }
    });
  }

  _UploadFoods() {

    this.mAngularHttpClient.get('./assets/data/bistro_foods.json').subscribe(data => {
      let collectionPath: string = "products/bistro/foods";
      let foodsRef = this.mAngularFirestore.collection(collectionPath);
      let foods = data["foods"];
      for (var foodDataKey in foods) {
        let food = foods[foodDataKey];
        food.firebase_id = food.id;
        food.firebase_reference = collectionPath + "/" + food.id;        
        if (this._DownloadUrls.has(food.image)) {
          food.image = this._DownloadUrls.get(food.image);
        } else {
          food.image = "";
        }
        foodsRef.doc(food.id).set(food);
      }
    });

  }


  onSearchInput(event) {
    this._DoSearch();
  }

  _GetSearchString(food: Food) {
    let strToSearch = food.name + "  #" + food.id + "  " + food.en_name;
    strToSearch = strToSearch.toLowerCase();
    strToSearch = this._BodauTiengViet(strToSearch);

    let firstLetters = food.name.split(" ");
    let firstString = "#";
    firstLetters.forEach(letter => {
      letter = letter.trim();
      if (letter.length > 0) {
        firstString += letter[0];
      }
    });
    return firstString + " " + strToSearch;
  }
  _SearchMatch(food: Food, search: string) {
    let strToSearch = food.name + "  #" + food.id + "  " + food.en_name;
    strToSearch = strToSearch.toLowerCase();
    strToSearch = this._BodauTiengViet(strToSearch);

    let firstLetters = food.name.split(" ");
    let firstString = "#";
    firstLetters.forEach(letter => {
      letter = letter.trim();
      if (letter.length > 0) {
        firstString += letter[0];
      }
    });
    strToSearch = firstString + " " + strToSearch;
    return strToSearch.indexOf(search) != -1;

  }
  _BodauTiengViet(str: string): string {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    return str;
  }
  _DoSearch() {
    let strSearch: string = this.mSearchStr.trim().toLowerCase();
    strSearch = this._BodauTiengViet(strSearch);
    this.mFoods = this.mFoodDatas.filter(item => {
      return item.query.indexOf(strSearch) != -1;
    });
  }

  onClickAddFood() {
    this.navCtrl.push("AddFoodPage");
  }
}
