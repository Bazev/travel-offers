import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./views/login/login.component";
import {OffersComponent} from "./views/offers/offers.component";
import {SingleOfferComponent} from "./views/single-offer/single-offer.component";
import {ErrorComponent} from "./views/error/error.component";
import {AuthGuard} from "./guards/auth/auth.guard";
import {AddOfferComponent} from "./views/add-offer/add-offer.component";
import {EditOfferComponent} from "./views/edit-offer/edit-offer.component";

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'offers', canActivate:[AuthGuard], component: OffersComponent},
  {path:'offers/add', canActivate: [AuthGuard], component:AddOfferComponent},
  {path:'offers/:id', component:SingleOfferComponent},
  {path:'offers/:id/edit', canActivate:[AuthGuard], component:EditOfferComponent},
  {path:'not-found', component:ErrorComponent},
  {path:'**', redirectTo:"not-found"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
