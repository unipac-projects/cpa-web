import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, tap, map } from 'rxjs/operators';
import { Company } from '../../shared/Company';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private BASE_URL: string = environment.baseUrl;
  private apiUrl = `${this.BASE_URL}/v1/companys`;
 
  constructor(private http: HttpClient) {}

  get(): Observable<Company[]> {
    return this.http.get<Company[]>(this.apiUrl, httpOptions).pipe(
      tap(company => console.log('get all companyTypes' + company)),
      catchError(this.handleError('get-CompanyType', []))
    );
  }

  add(companyType: Company): Observable<Company> {
    return this.http.post<Company>(this.apiUrl, companyType, httpOptions).pipe(
      tap((companyType: Company) => console.log('adicionou o companyType' + companyType)),
      catchError(this.handleError<Company>('add-CompanyType'))
    );
  }

  update(id: number, company: Company): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, company, httpOptions).pipe(
      tap(companyType => console.log(`updated companyType id=${id}`)),
      catchError(this.handleError<any>('update-CompanyType'))
    );
  }

  getById(id: number): Observable<Company> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Company>(url, httpOptions).pipe(
      tap(companyType => console.log(`CompanyType by id=${id}`)),
      catchError(this.handleError<Company>(`CompanyType by id=${id}`))
    );
  }

  remove(id: number): Observable<Company> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Company>(url, httpOptions).pipe(
      tap(companyType => console.log(`remove companyType by id=${id}`)),
      catchError(this.handleError<Company>('remove - CompanyType'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    }
  }
}
