import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailService } from './detail.service';

export interface Move {
  name: string;
  level_learned: number;
  learn_method: string;
};

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  providers: [DetailService]
})
export class DetailComponent implements OnInit {

  profileImageUrl: string = '';
  routeNameParameter: string = '';
  weight: number = 0;
  abilities: Array<any> = [];
  moves: Move[] = [];
  displayedColumns: string[] = ['name', 'level_learned', 'learn_method'];
  movesLength: number = 0;

  constructor(
    private route: ActivatedRoute,
    private detailService: DetailService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params) {
        this.capitalizeFirstNameCharacter(params['name']);
        this.getPokemonDetails(params['name']);
      }
    });
  }

  capitalizeFirstNameCharacter(name: string) {
    this.routeNameParameter = name.charAt(0).toUpperCase() + name.slice(1) + ' Stats';
  }

  getPokemonDetails(name: string) {
    this.detailService.getPokemonDetails(name).subscribe(results => {
      if (results) {
        console.log(results);
        this.profileImageUrl = results.sprites.front_shiny;
        this.weight = results.weight;
        this.abilities = results.abilities;
        this.populateMoves(results.moves);
      }
    });
  }

  populateMoves(moves: any) {
    moves.forEach((element: any) => {
      this.moves.push({
        name: element.move.name,
        level_learned: element.version_group_details[0].level_learned_at,
        learn_method: element.version_group_details[0].move_learn_method.name
      });
    });
    this.movesLength = this.moves.length;
  }

}
