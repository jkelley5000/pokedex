import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  wishList: any = [];

  constructor() { }

  ngOnInit(): void {
    this.getWishListFromLocalStorage();
  }

  getWishListFromLocalStorage() {
    if (localStorage['wish_list']) {
      this.wishList = JSON.parse(localStorage['wish_list']);
    }
  }

}
