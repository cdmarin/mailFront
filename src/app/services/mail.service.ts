import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serverUrl } from 'src/baseurl';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class MailService {

  constructor(private http: HttpClient) { }

  setData(user: string): Observable<any> {
    return this.http.post(serverUrl + "envio", {
      mail: user,
      asunto: "Hola buenas JeJe",
      text: "Bbyyyyyyyyyyyyyyy",
      html: "Te mandé el correo :D"
    }, httpOptions);
  }
}
