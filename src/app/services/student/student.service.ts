import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, tap, map } from 'rxjs/operators';
import { Student } from '../../shared/Student';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private BASE_URL: string = environment.baseUrl;
  private apiUrl = `${this.BASE_URL}/v1/students`;
 
  constructor(private http: HttpClient) {}

  get(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl, httpOptions).pipe(
      tap(student => console.log('get all student' + student)),
      catchError(this.handleError('get-student', []))
    );
  }

  add(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student, httpOptions).pipe(
      tap((student: Student) => console.log('adicionou o student' + student)),
      catchError(this.handleError<Student>('add-student'))
    );
  }

  update(id: number, student: Student): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, student, httpOptions).pipe(
      tap(student => console.log(`updated student id=${id}`)),
      catchError(this.handleError<any>('update-student'))
    );
  }

  getById(id: number): Observable<Student> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Student>(url, httpOptions).pipe(
      tap(student => console.log(`student by id=${id}`)),
      catchError(this.handleError<Student>(`student by id=${id}`))
    );
  }

  remove(id: number): Observable<Student> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Student>(url, httpOptions).pipe(
      tap(student => console.log(`remove student by id=${id}`)),
      catchError(this.handleError<Student>('remove - student'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    }
  }
}
