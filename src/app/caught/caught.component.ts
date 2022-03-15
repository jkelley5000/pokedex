import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon/pokemon.service';

@Component({
  selector: 'app-caught',
  templateUrl: './caught.component.html',
  styleUrls: ['./caught.component.scss'],
  providers: [PokemonService]
})
export class CaughtComponent implements OnInit {

  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers', 'Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  caughtList: any = [];

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getCaughtListFromLocalStorage();
  }

  getCaughtListFromLocalStorage() {
    if (localStorage['caught_list']) {
      this.caughtList = JSON.parse(localStorage['caught_list']);
    }
  }

}
