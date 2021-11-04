import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OfferService} from "../../services/offer/offer.service";
import {Offer} from "../../models/offer.model";

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.css']
})
export class EditOfferComponent implements OnInit {

  offer: Offer | undefined

  constructor(private route: ActivatedRoute, private offerService: OfferService, private router: Router) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id; // string

    this.offerService
      .getOfferById(id)
      .then((offer: Offer) => this.offer = offer);
  }

  onSubmitEditOffer(offerEdited: Offer): void {
    this.offerService
      .update(offerEdited)
      .then(() => this.router.navigateByUrl('offers'))
  }
}
