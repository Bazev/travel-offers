import { Component, OnInit } from '@angular/core';
import {OfferService} from "../../services/offer/offer.service";
import {Subscription} from "rxjs";
import {Offer} from "../../models/offer.model";

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  offersSubs : Subscription;
  offers: Array<Offer>

  constructor(private offerService: OfferService) {
    this.offers = [];
    this.offersSubs = new Subscription();
  }

  ngOnInit(): void {
    //stocker l'abonnement pour le supprimer lorsque le composant sera détruit.
    this.offersSubs = this.offerService
      .offers
      //subscribe pour écouter toutes les nouvelles valeurs envoyées par la méthode suivante dans le service
      .subscribe(offers =>{
        console.log(offers);
        //mettre à jour la variable des offres pour mettre à jour le modèle
        this.offers = offers;
      });
  }

  ngOnDestroy(): void {
    this.offersSubs.unsubscribe();
  }

}
