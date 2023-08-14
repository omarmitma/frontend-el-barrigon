import { Component } from '@angular/core';
import { Alert } from 'src/app/shared/functions/alerts';
import { ValidationForms } from 'src/app/shared/functions/validation';

@Component({
  selector: 'app-credit-card-form',
  templateUrl: './credit-card-form.component.html',
  styleUrls: ['./credit-card-form.component.scss']
})
export class CreditCardFormComponent {
  currentCardBackground: number;
  cardName: string;
  cardNumber: string;
  cardMonth: string;
  cardYear: string;
  cardCvv: string;
  minCardYear: number;
  amexCardMask: string;
  otherCardMask: string;
  amexCardMaskArray:string[];
  otherCardMaskArray:string[];
  cardNumberTemp: string;
  isCardFlipped: boolean;
  focusElementStyle: {
    width: string;
    height: string;
    transform: string;
  } | null;
  isInputFocused: boolean;
  cardNumberMaxLength:number = 15;

  qtyMes:number[] = [];

  constructor(private alert:Alert, private validationForms:ValidationForms) {
    this.currentCardBackground = Math.floor(Math.random() * 25 + 1); // just for fun :D
    this.cardName = '';
    this.cardNumber = '';
    this.cardMonth = '';
    this.cardYear = '';
    this.cardCvv = '';
    this.minCardYear = new Date().getFullYear();
    this.amexCardMask = '#### ###### #####';
    this.otherCardMask = '#### #### #### ####';
    this.amexCardMaskArray = this.amexCardMask.split('');
    this.otherCardMaskArray = this.otherCardMask.split('');
    this.cardNumberTemp = '';
    this.isCardFlipped = false;
    this.focusElementStyle = null;
    this.isInputFocused = false;
    this.qtyMes = [1,2,3,4,5,6,7,8,9,10,11,12];
  }

  ngAfterViewInit() {
    this.cardNumberTemp = this.otherCardMask;
    document.getElementById('cardNumber')?.focus();
  }

  getCardType() {
    let number = this.cardNumber;
    let re = new RegExp('^4');
    if (number.match(re) !== null) return 'visa';

    re = new RegExp('^(34|37)');
    if (number.match(re) !== null) return 'amex';

    re = new RegExp('^5[1-5]');
    if (number.match(re) !== null) return 'mastercard';

    re = new RegExp('^6011');
    if (number.match(re) !== null) return 'discover';

    re = new RegExp('^9792');
    if (number.match(re) !== null) return 'troy';

    return 'visa'; // default type
  }

  generateCardNumberMask() {
    return this.getCardType() === 'amex' ? this.amexCardMask : this.otherCardMask;
  }

  minCardMonth() {
    if (this.cardYear === this.minCardYear.toString()) return new Date().getMonth() + 1;
    return 1;
  }

  flipCard(status: boolean) {
    this.isCardFlipped = status;
  }

  focusInput(e: any) {
    this.isInputFocused = true;
    let targetRef = e.target.dataset.ref;
    let target = document.querySelector(`[ref="${targetRef}"]`) as HTMLElement;;
    if (target) {
      this.focusElementStyle = {
        width: `${target.offsetWidth}px`,
        height: `${target.offsetHeight}px`,
        transform: `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`
      };
    }
  }



  blurInput() {
    setTimeout(() => {
      if (!this.isInputFocused) {
        this.focusElementStyle = null;
      }
    }, 300);
    this.isInputFocused = false;
  }

  returnTextArray(text:string){
    let textArray:string[] = text.split('');
    return textArray;
  }

  returnFecha(cardYear:string){
    return String(cardYear).slice(2,4)
  }

  onKeyPressSomeNumber(event: KeyboardEvent) {
    const inputCharCode = event.which || event.keyCode;
    const isValidInput = (inputCharCode >= 48 && inputCharCode <= 57);
    if (!isValidInput) {
      event.preventDefault();
    }
  }

  changeNumber (e:any) {
    this.cardNumber = e.target.value;
    let value = this.cardNumber.replace(/\D/g, '')
    // american express, 15 digits
    if ((/^3[47]\d{0,13}$/).test(value)) {
      this.cardNumber = value.replace(/(\d{4})/, '$1 ').replace(/(\d{4}) (\d{6})/, '$1 $2 ')
      this.cardNumberMaxLength = 17
    } else if ((/^3(?:0[0-5]|[68]\d)\d{0,11}$/).test(value)) { // diner's club, 14 digits
      this.cardNumber = value.replace(/(\d{4})/, '$1 ').replace(/(\d{4}) (\d{6})/, '$1 $2 ')
      this.cardNumberMaxLength = 16
    } else if ((/^\d{0,16}$/).test(value)) { // regular cc number, 16 digits
      this.cardNumber = value.replace(/(\d{4})/, '$1 ').replace(/(\d{4}) (\d{4})/, '$1 $2 ').replace(/(\d{4}) (\d{4}) (\d{4})/, '$1 $2 $3 ')
      this.cardNumberMaxLength = 19
    }
    // eslint-disable-next-line eqeqeq
    if (e.inputType == 'deleteContentBackward') {
      let lastChar = this.cardNumber.substring(this.cardNumber.length, this.cardNumber.length - 1)
      // eslint-disable-next-line eqeqeq
      if (lastChar == ' ') { this.cardNumber = this.cardNumber.substring(0, this.cardNumber.length - 1) }
    }
  }

  async btnPagar(){

    // let validate:boolean = await this.validationForms.validateCreditCardForm(this.plato);
    // if(!validate)return;

    this.alert.alertConfirm("¿Desea pagar?","").then(resolve => {
      if(resolve.isConfirmed){

        this.alert.alertSucces("Pagado existosamente");
      }
    });
  }
}
