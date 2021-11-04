import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Offer} from "../../models/offer.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.css']
})
export class OfferFormComponent implements OnInit {

  @Input() offerToEdit: Offer | undefined
  @Input() submitLabel : string;

  @Output() formSumitted: EventEmitter<Offer>

  form : FormGroup;
  offer : Offer;

  constructor() {
    this.offer = new Offer('', '', new Date(), new Date(),'', new Date(), new Date());
    this.form = new FormGroup({});
    this.formSumitted = new EventEmitter<Offer>();
    this.submitLabel = '';
  }

  ngOnInit(): void {
    if (this.offerToEdit) {
      this.offer = this.offerToEdit;
    }
    this.initForm();
  }

  onSubmitForm() : void {
    if (this.form.valid) {
      this.formSumitted.emit(this.offer);
    }
  }

  private initForm() {
    this.form.addControl(
      'name',
      new FormControl(
        null,
        [Validators.required, Validators.minLength(4), Validators.maxLength(50)]
      )
    );
    this.form.addControl(
      'description',
      new FormControl(
        null,
        [Validators.required, Validators.minLength(10), Validators.maxLength(250)]
      )
    );

    this.form.addControl(
      'dateBegin',
      new FormControl(
        null,
        [Validators.required]
      )
    );

    this.form.addControl(
      'dateEnd',
      new FormControl(
        null,
        [Validators.required]
      )
    );

    this.form.addControl(
      'imgUrl',
      new FormControl(
        null,
        [Validators.required]
      )
    );
  }
}
