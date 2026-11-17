import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { environment } from '../../environments/environment'
import { Category } from './category.model'

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private httpClient = inject(HttpClient)

  baseUrl = environment.apiUrl + 'categories'

  getCategories() {
    return this.httpClient.get<Category[]>(this.baseUrl)
  }
}
