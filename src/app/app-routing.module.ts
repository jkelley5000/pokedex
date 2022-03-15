import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaughtComponent } from './caught/caught.component';
import { CompareComponent } from './compare/compare.component';
import { DetailComponent } from './detail/detail.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { ProfileComponent } from './profile/profile.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'pokemon' },
  { path: 'pokemon', component: PokemonComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'caught', component: CaughtComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'compare', component: CompareComponent },
  { path: 'stats/:name', component: DetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
