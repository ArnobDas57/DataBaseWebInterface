import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient) { }

  regUser(user) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.post('http://localhost:3000/users/register', user, httpOptions);
  }

  authenticateUser(user) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.post('http://localhost:3000/users/authenticate', user, httpOptions);
  }

  storeUser(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  public getCustomers(): Observable<any>  {
    const httpOptions = {
      headers: {
        "Content-Type":"application/json",
        "Authorization": `Bearer ${this.authToken}`
      }
    };
    return this.http.get(`http://localhost:3000/secure/getCustomers`, httpOptions);
  }

  public addCustomer(data): Observable<any>  {
    const httpOptions = {
      headers: {
        "Content-Type":"application/json",
        "Authorization": `Bearer ${this.authToken}`
      }
    };
    return this.http.post(`http://localhost:3000/secure/addCustomer`, data, httpOptions);
  }

  public getActivePlans(plan: String): Observable<any>  {
    const httpOptions = {
      headers: {
        "Content-Type":"application/json",
        "Authorization": `Bearer ${this.authToken}`
      }
    };
    return this.http.get(`http://localhost:3000/secure/activePlan/${plan}`, httpOptions);
  }

  public getMins(model: String): Observable<any>  {
    const httpOptions = {
      headers: {
        "Content-Type":"application/json",
        "Authorization": `Bearer ${this.authToken}`
      }
    };
    return this.http.get(`http://localhost:3000/secure/getMins/${model}`, httpOptions);
  }

  public getMes(model: String): Observable<any>  {
    const httpOptions = {
      headers: {
        "Content-Type":"application/json",
        "Authorization": `Bearer ${this.authToken}`
      }
    };
    return this.http.get(`http://localhost:3000/secure/getMes/${model}`, httpOptions);
  }

  public getData(model: String): Observable<any>  {
    const httpOptions = {
      headers: {
        "Content-Type":"application/json",
        "Authorization": `Bearer ${this.authToken}`
      }
    };
    return this.http.get(`http://localhost:3000/secure/getData/${model}`, httpOptions);
  }

  public getUsage(id: number): Observable<any>  {
    const httpOptions = {
      headers: {
        "Content-Type":"application/json",
        "Authorization": `Bearer ${this.authToken}`
      }
    };
    return this.http.get(`http://localhost:3000/secure/monthlyUsage/${id}`, httpOptions);
  }

  public getAddData(): Observable<any>  {
    const httpOptions = {
      headers: {
        "Content-Type":"application/json",
        "Authorization": `Bearer ${this.authToken}`
      }
    };
    return this.http.get(`http://localhost:3000/secure/getAddData`, httpOptions);
  }

  public getAddMes(): Observable<any>  {
    const httpOptions = {
      headers: {
        "Content-Type":"application/json",
        "Authorization": `Bearer ${this.authToken}`
      }
    };
    return this.http.get(`http://localhost:3000/secure/getAddMes`, httpOptions);
  }

  public getAddMin(): Observable<any>  {
    const httpOptions = {
      headers: {
        "Content-Type":"application/json",
        "Authorization": `Bearer ${this.authToken}`
      }
    };
    return this.http.get(`http://localhost:3000/secure/getAddMin`, httpOptions);
  }

  public changeAddData(data): Observable<any>  {
    const httpOptions = {
      headers: {
        "Content-Type":"application/json",
        "Authorization": `Bearer ${this.authToken}`
      }
    };
    console.log(data);
    return this.http.put(`http://localhost:3000/secure/changeAddData`, data, httpOptions);
  }

  public changeAddMes(data): Observable<any>  {
    const httpOptions = {
      headers: {
        "Content-Type":"application/json",
        "Authorization": `Bearer ${this.authToken}`
      }
    };
    return this.http.put(`http://localhost:3000/secure/changeAddMes`, data, httpOptions);
  }

  public changeAddMin(data): Observable<any>  {
    const httpOptions = {
      headers: {
        "Content-Type":"application/json",
        "Authorization": `Bearer ${this.authToken}`
      }
    };
    return this.http.put(`http://localhost:3000/secure/changeAddMin`, data, httpOptions);
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return helper.isTokenExpired(this.authToken);
  }
}
