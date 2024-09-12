import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8000/api/admin';

  constructor(private http: HttpClient) { }

  validateUser(userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/validate-user/${userId}`, {});
  }

  manageRandos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/randos`);
  }

  updateRando(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/randos/${id}`, data);
  }

  deleteRando(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/randos/${id}`);
  }

  approveReview(reviewId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/reviews/${reviewId}/approve`, {});
  }

  deleteReview(reviewId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/reviews/${reviewId}`);
  }

  getReviews(): Observable<any> {
    return this.http.get(`${this.apiUrl}/reviews`);
  }
}
