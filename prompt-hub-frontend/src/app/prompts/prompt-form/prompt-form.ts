import { Component, effect, inject, input } from '@angular/core'
import { Card } from 'primeng/card'
import { InputText } from 'primeng/inputtext'
import { Select } from 'primeng/select'
import { Textarea } from 'primeng/textarea'
import { CategoryService } from '../category-service'
import { toSignal } from '@angular/core/rxjs-interop'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Button } from 'primeng/button'
import { PromptService } from '../prompt-service'
import { Router, RouterLink } from '@angular/router'

@Component({
  selector: 'app-prompt-form',
  imports: [Card, InputText, Textarea, Select, ReactiveFormsModule, Button, RouterLink],
  templateUrl: './prompt-form.html',
  styleUrl: './prompt-form.scss',
})
export class PromptForm {
  categoryService = inject(CategoryService)
  promptService = inject(PromptService)
  router = inject(Router)

  promptId = input<number>()

  categories = toSignal(this.categoryService.getCategories(), { initialValue: [] })

  form = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(30)],
      nonNullable: true,
    }),
    content: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    categoryId: new FormControl(-1, {
      validators: [Validators.required, Validators.min(0)],
      nonNullable: true,
    }),
  })

  constructor() {
    effect(() => {
      const promptId = this.promptId()
      if (promptId) {
        this.promptService.getPrompt(promptId).subscribe((prompt) =>
          this.form.patchValue({
            title: prompt.title,
            content: prompt.content,
            categoryId: prompt.category.id,
          }),
        )
      }
    })
  }

  submit() {
    this.form.markAllAsTouched()
    if (this.form.invalid) return

    const prompt = this.form.getRawValue()
    const promptId = this.promptId()

    if (promptId) {
      this.promptService.updatePrompt(promptId, prompt).subscribe(() => {
        this.router.navigate(['/'])
      })
    } else {
      this.promptService.createPrompt(prompt).subscribe(() => {
        this.router.navigate(['/'])
      })
    }
  }

  deletePrompt() {
    this.promptService.deletePromp(this.promptId()!).subscribe(() => {
      void this.router.navigate(['/'])
    })
  }
}
