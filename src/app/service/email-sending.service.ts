import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Injectable({
    providedIn:'root'
})
export class EmailSendingService
{

    constructor(private http: HttpClient){}

    sendEmail(form: FormGroup)
    {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
       return this.http.post('https://formspree.io/f/moqpzdya', 
            {
                Name: form.value.name,
                ReplyTo: form.value.email,
                Message: form.value.message
            }, {'headers': headers}
        );
    }
}