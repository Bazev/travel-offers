import {Component, OnInit} from '@angular/core';
import {OfferService} from "../../services/offer/offer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Offer} from "../../models/offer.model";

@Component({
  selector: 'app-single-offer',
  templateUrl: './single-offer.component.html',
  styleUrls: ['./single-offer.component.css']
})
export class SingleOfferComponent implements OnInit {

  offer: Offer | undefined;

  constructor(private offerService: OfferService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    // permet de récupéer l'url, la découpe et la rend acceccible
    const id = this.route.snapshot.params.id;
    this.offerService
      .getOfferById(id)
      .then((offer: Offer) => this.offer = offer);
  }

  onClickDeleteBtn(): void {
    if (this.offer) {
      this.offerService
        .delete(this.offer.id)
        .then(() => this.router.navigateByUrl('offers'));
    }
  }
}
