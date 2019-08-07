import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, tap, map } from 'rxjs/operators';
import { Course } from '../../shared/Course';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private BASE_URL: string = environment.baseUrl;
  private apiUrl = `${this.BASE_URL}/v1/courses`;
 
  constructor(private http: HttpClient) {}

  get(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl, httpOptions).pipe(
      tap(course => console.log('get all course' + course)),
      catchError(this.handleError('get-course', []))
    );
  }

  add(course: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course, httpOptions).pipe(
      tap((course: Course) => console.log('adicionou o course' + course)),
      catchError(this.handleError<Course>('add-course'))
    );
  }

  update(id: number, course: Course): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, course, httpOptions).pipe(
      tap(course => console.log(`updated course id=${id}`)),
      catchError(this.handleError<any>('update-course'))
    );
  }

  getById(id: number): Observable<Course> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Course>(url, httpOptions).pipe(
      tap(course => console.log(`course by id=${id}`)),
      catchError(this.handleError<Course>(`course by id=${id}`))
    );
  }

  remove(id: number): Observable<Course> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Course>(url, httpOptions).pipe(
      tap(course => console.log(`remove course by id=${id}`)),
      catchError(this.handleError<Course>('remove - course'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    }
  }
}
