import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Offer} from "../../models/offer.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  offers: BehaviorSubject<Array<Offer>>

  constructor(private http: HttpClient, private authService: AuthService) {

    this.offers = new BehaviorSubject<Array<Offer>>([]);
    this.getOffers();
  }

  getOffers(): void {

    //Génère le header pour le token
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", this.authService.token.getValue());

    // httpclient renvoie un observable, nous devons donc utiliser la fonction toPromise() pour transformer l'observable en promesse.
    this.http
      .get('https://angular-eval.herokuapp.com/api/v1/offers', {headers})
      // pipe transforme le data retourné par l'API
      .pipe(
        // map retourne un nouveau tableau avec la data transformée
        map((data: any) => data.offers.map((offerAsJson: any) => Offer.fromJson(offerAsJson)))
      )
      // toPromise transforme l'observable en promesse
      .toPromise()
      // Ecoute la promesse
      .then((offers: Array<Offer>) => {
        // affecte la data transformée dans l'observable "offers"
        // la méthode next envoie la valeur dans l'observable
        this.offers.next(offers);
      })
  }

  getOfferById(id: string): Promise<Offer> {

    let headers = new HttpHeaders();
    headers = headers.append("Authorization", this.authService.token.getValue());

    return this.http
      .get('https://angular-eval.herokuapp.com/api/v1/offers/' + id, {headers})
      .pipe(
        map((data: any) => Offer.fromJson(data.offer))
      )
      .toPromise();
  }

  // Solution with the cache
  // return new Promise<Offer>(
  //   (res, rej) => {
  //     const offers = this.offers.getValue();
  //     for (const offer of offers) {
  //       if (offer.id === id) {
  //         res(offer);
  //         break;
  //       }
  //     }
  //   }
  // );
  save(offer: Offer): Promise<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', this.authService.token.getValue());


    // Seulement parce l'API n'ajoute pas réellement la valeur en BDD
    const offers = this.offers.getValue();
    offers.push(offer)
    this.offers.next(offers)
    return this.http
      .post('https://angular-eval.herokuapp.com/api/v1/offers/', offer.toJson(), {headers})
      .toPromise()
  }

  update(offerEdited: Offer): Promise<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', this.authService.token.getValue());

    const offers = this.offers.getValue();
    offers.push(offerEdited)

    for (const [index, offer] of offers.entries()) {
      if (offer.id === offerEdited.id) {
        offers[index] = offerEdited;
      }
    }
    this.offers.next(offers)
    return this.http
      .post('https://angular-eval.herokuapp.com/api/v1/offers/' + offerEdited.id, offerEdited.toJson(), {headers})
      .toPromise()
  }

  delete(id : string | null) {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', this.authService.token.getValue());

    const offers = this.offers.getValue();

    for (const [index, offer] of offers.entries()) {
      if (offer.id === id) {
        offers.splice(index,1)
        break;
      }
    }
    this.offers.next(offers)
    return this.http
      .get('https://angular-eval.herokuapp.com/api/v1/offers/delete/' + id, {headers})
      .toPromise()

  }
}
