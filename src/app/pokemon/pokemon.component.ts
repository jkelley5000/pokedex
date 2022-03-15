import { Component, OnInit } from '@angular/core';
import { PokemonService } from './pokemon.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
  providers: [PageEvent]
})
export class PokemonComponent implements OnInit {

  searchValue: string = '';
  displayedColumns: string[] = [
    'stats', 
    'name', 
    'caught', 
    'wish_list'
  ];
  dataSource: any = [];
  allPokemon: any = [];
  length = 1000;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  newEmptyCaughtListArray: string[] = [];
  newEmptyWishListArray: string[] = [];
  caughtList: string[] = [];
  wishList: string[] = [];
  paginationDisabled: boolean = false;

  constructor(
    private pokemonService: PokemonService,
    private pageEvent: PageEvent
  ) { }

  ngOnInit(): void {
    this.getPaginatedPokemonList();
    this.getAllPokemon();
    this.createLocalStorageArrays();
  }

  ngOnDestroy() {}

  getPaginatedPokemonList() {
    this.pokemonService.getPokemonPaginated(0)
      .subscribe((data: any) => {
        if (data && data.results) {
          this.dataSource = data.results;
        } else {
          console.log(data);
        }
      });
  }

  getAllPokemon() {
    this.pokemonService.getAllPokemon()
      .subscribe((data: any) => {
        if (data && data.results) {
          this.allPokemon = data.results;
        } else {
          console.log(data);
        }
      });
  }

  createLocalStorageArrays() {
    if (
      localStorage &&
      !localStorage.getItem('caught_list')
    ) {
      localStorage['caught_list'] = JSON.stringify(this.newEmptyCaughtListArray);
      this.caughtList = this.parseLocalStorageArray('caught');
    }

    if (
      localStorage &&
      !localStorage.getItem('wish_list')
    ) {
      localStorage['wish_list'] = JSON.stringify(this.newEmptyWishListArray);
      this.wishList = this.parseLocalStorageArray('wish');
    }
  }

  searchPokemon(searchInput: any) {
    let searchValue = searchInput.target.value.trim().toLocaleLowerCase();
    if (searchValue.length >= 2) {
      this.paginationDisabled = true;
      this.dataSource = this.allPokemon.filter((pokemon: { [x: string]: string | any[]; }) => 
        pokemon['name'].includes(searchValue)
      );
    } else {
      this.paginationDisabled = false;
      this.getPaginatedPokemonList();
    }
  }

  pageChanged(pageEvent: PageEvent) {
    this.pokemonService.getPokemonPaginated(pageEvent.pageIndex)
      .subscribe((data: any) => {
        if (data) {
          this.dataSource = data.results;
        }
      });
  }

  parseLocalStorageArray(listName: string) {
    const localStorageParsed = JSON.parse(localStorage[listName + '_list']);
    return localStorageParsed;
  }

  convertLocalStorageArrayToString(localStorageArray: any) {
    const localStorageStringified = JSON.stringify(localStorageArray);
    return localStorageStringified;
  }

  checkIfPokemonInCaughtList(pokemonName: string) {
    return this.caughtList.includes(pokemonName);
  }

  checkIfPokemonInWishList(pokemonName: string) {
    return this.wishList.includes(pokemonName);
  }

  addPokemonToCaughtList(pokemonName: string) {
    if (!this.caughtList.includes(pokemonName)) {
      this.caughtList.push(pokemonName);
      localStorage['caught_list'] = this.convertLocalStorageArrayToString(this.caughtList);
    }
  }

  removePokemonFromCaughtList(pokemonName: string) {
    let parsedLocalStorageArray = this.parseLocalStorageArray('caught');
    if (this.caughtList.includes(pokemonName)) {
      this.caughtList.splice(
        this.caughtList.indexOf(pokemonName),
        1
      );

      parsedLocalStorageArray.splice(
        parsedLocalStorageArray.indexOf(pokemonName),
        1
      );

      localStorage['caught_list'] = this.convertLocalStorageArrayToString(parsedLocalStorageArray);
    }
  }

  addPokemonToWishList(pokemonName: string) {
    if (!this.wishList.includes(pokemonName)) {
      this.wishList.push(pokemonName);
      localStorage['wish_list'] = this.convertLocalStorageArrayToString(this.wishList);
    }
  }

  removePokemonFromWishList(pokemonName: string) {
    let parsedLocalStorageArray = this.parseLocalStorageArray('wish');
    if (this.wishList.includes(pokemonName)) {
      this.wishList.splice(
        this.wishList.indexOf(pokemonName),
        1
      );

      parsedLocalStorageArray.splice(
        parsedLocalStorageArray.indexOf(pokemonName),
        1
      );

      localStorage['wish_list'] = this.convertLocalStorageArrayToString(parsedLocalStorageArray);
    }
  }

}
