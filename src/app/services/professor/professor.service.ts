import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, tap, map } from 'rxjs/operators';
import { Professor } from '../../shared/Professor';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {
  private BASE_URL: string = environment.baseUrl;
  private apiUrl = `${this.BASE_URL}/v1/professors`;
 
  constructor(private http: HttpClient) {}

  get(): Observable<Professor[]> {
    return this.http.get<Professor[]>(this.apiUrl, httpOptions).pipe(
      tap(professor => console.log('get all professor' + professor)),
      catchError(this.handleError('get-professor', []))
    );
  }

  add(professor: Professor): Observable<Professor> {
    return this.http.post<Professor>(this.apiUrl, professor, httpOptions).pipe(
      tap((cprofessorandidate: Professor) => console.log('adicionou o professor' + professor)),
      catchError(this.handleError<Professor>('add-Candidate'))
    );
  }

  update(id: number, professor: Professor): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, professor, httpOptions).pipe(
      tap(professor => console.log(`updated professor id=${id}`)),
      catchError(this.handleError<any>('update-professor'))
    );
  }

  getById(id: number): Observable<Professor> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Professor>(url, httpOptions).pipe(
      tap(professor => console.log(`professor by id=${id}`)),
      catchError(this.handleError<Professor>(`professor by id=${id}`))
    );
  }

  remove(id: number): Observable<Professor> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Professor>(url, httpOptions).pipe(
      tap(professor => console.log(`remove professor by id=${id}`)),
      catchError(this.handleError<Professor>('remove - professor'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    }
  }
}
