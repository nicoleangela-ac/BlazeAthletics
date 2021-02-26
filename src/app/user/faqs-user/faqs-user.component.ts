import { Component, OnInit } from '@angular/core';
import { FirebaseProductsService } from './../../service/firebase-products.service';
import { map } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailSendingService } from 'src/app/service/email-sending.service';

@Component({
  selector: 'app-faqs-user',
  templateUrl: './faqs-user.component.html',
  styleUrls: ['./faqs-user.component.css']
})
export class FaqsUserComponent implements OnInit {
  noWrapSlides = false;
  showIndicator = true;
  faqForm: FormGroup;
  message: string = null;
  errorMessage: string = null;
  faqs: any;
<<<<<<< HEAD
  slides: any;
  constructor(private sendEmail: EmailSendingService, private service : FirebaseProductsService) {
    this.faqs = service.getFaqsData();
    this.slides = service.getShopImg();
=======
  images: any;
  slides: any;
  constructor(private sendEmail: EmailSendingService, private service : FirebaseProductsService) {
    this.faqs = service.getFaqsData();
    this.images = service.getShopImg();
>>>>>>> b42e0962556a4a1e8be2385a0fb971284f4a0cd5

  }

  ngOnInit(){
    this.faqForm = new FormGroup(
      {
        "name": new FormControl(null, [Validators.required]),
        "email": new FormControl(null, [Validators.required, Validators.email]),
        "message": new FormControl(null, [Validators.required])
      }
    );
    this.getFaqsList();
<<<<<<< HEAD
    this.getSizeChart();
=======
    this.getShopImg();

>>>>>>> b42e0962556a4a1e8be2385a0fb971284f4a0cd5
  }

  onCancel()
  {
    this.faqForm.reset();
  }

  onSubmit()
  {
    this.sendEmail.sendEmail(this.faqForm)
    .subscribe(response => {
        this.message = "Message Sent Successfully";
        this.faqForm.reset();
      }, error => 
      {
        this.errorMessage = "Email was not sent";
      }
    );
  }

 
  getFaqsList() {
    this.service.getFaqsData().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(faq => {
      this.faqs = faq;
    });
  }

<<<<<<< HEAD
  getSizeChart() {
    this.service.getShopPageImg('sizeChart').valueChanges().subscribe(data => {
    this.slides = data;  } ) } 



=======
  getShopImg() {
    this.service.getShopImg().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(images => {
      this.images= images;
    });
    this.slides = Object.values(this.images.sizeChart)

  }
>>>>>>> b42e0962556a4a1e8be2385a0fb971284f4a0cd5

}
