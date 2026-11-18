import { inject, Injectable } from '@angular/core'
import { Prompt } from './prompt.model'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { delay } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class PromptService {
  private httpClient = inject(HttpClient)

  baseUrl = environment.apiUrl + 'prompts'

  getPrompts() {
    return this.httpClient.get<Prompt[]>(this.baseUrl).pipe(delay(3000))
  }

  createPrompt(prompt: { title: string; content: string; categoryId: number }) {
    return this.httpClient.post<Prompt>(this.baseUrl, prompt).pipe(delay(3000))
  }

  getPrompt(promptId: number) {
    return this.httpClient.get<Prompt>(`${this.baseUrl}/${promptId}`).pipe(delay(3000))
  }

  updatePrompt(promptId: number, prompt: { title: string; content: string; categoryId: number }) {
    return this.httpClient.put<Prompt>(`${this.baseUrl}/${promptId}`, prompt).pipe(delay(3000))
  }

  deletePromp(promptId: number) {
    return this.httpClient.delete(`${this.baseUrl}/${promptId}`).pipe(delay(3000))
  }

  upvotePrompt(promptId: number) {
    return this.httpClient.post<Prompt>(`${this.baseUrl}/${promptId}/upvote`, {}).pipe(delay(3000))
  }

  downvotePrompt(promptId: number) {
    return this.httpClient
      .post<Prompt>(`${this.baseUrl}/${promptId}/downvote`, {})
      .pipe(delay(3000))
  }
}
