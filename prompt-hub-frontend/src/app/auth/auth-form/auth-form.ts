import { Component, inject, signal } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Button } from 'primeng/button'
import { Card } from 'primeng/card'
import { InputText } from 'primeng/inputtext'
import { Password } from 'primeng/password'
import { AuthService } from '../auth-service'
import { Router } from '@angular/router'
import { MessageService } from 'primeng/api'

@Component({
  selector: 'app-auth-form',
  imports: [ReactiveFormsModule, Button, Card, InputText, Password],
  templateUrl: './auth-form.html',
  styleUrl: './auth-form.scss',
})
export class AuthForm {
  mode = signal<'login' | 'register'>('login')

  authService = inject(AuthService)
  messageService = inject(MessageService)

  submitting = signal(false)

  router = inject(Router)

  form = new FormGroup({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(4)],
    }),
  })

  toggleMode() {
    this.mode.update((value) => (value === 'login' ? 'register' : 'login'))
  }

  submit() {
    this.form.markAllAsTouched()
    if (this.form.invalid) return

    const { password, username } = this.form.getRawValue()
    this.submitting.set(true)
    if (this.mode() === 'login') {
      this.login(username, password)
    } else {
      this.register(username, password)
    }
  }

  login(username: string, password: string) {
    this.authService.login(username, password).subscribe({
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Connexion impossible, réessayez',
        })
        this.submitting.set(false)
      },
      next: () => {
        void this.router.navigate(['/'])
        this.submitting.set(false)
      },
    })
  }

  register(username: string, password: string) {
    this.authService.register(username, password).subscribe(() => this.router.navigate(['/']))
  }
}
