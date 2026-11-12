import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NotificationService } from './core/services/notification.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-dark bg-dark">
      <div class="container flex-wrap gap-2">
        <a class="navbar-brand fw-semibold" routerLink="/">Gestion de Ordenes</a>
        <div class="d-flex gap-3">
          <a class="nav-link text-white-50" routerLink="/dashboard" routerLinkActive="text-white fw-semibold">Dashboard</a>
          <a class="nav-link text-white-50" routerLink="/orders" routerLinkActive="text-white fw-semibold">Ordenes</a>
        </div>
      </div>
    </nav>

    <main class="container py-4">
      <router-outlet />
    </main>

    <div class="toast-container position-fixed bottom-0 end-0 p-3">
      @for (t of notify.toasts(); track t.id) {
        <div class="toast show align-items-center border-0" [class]="'text-bg-' + t.type" role="alert">
          <div class="d-flex">
            <div class="toast-body">{{ t.text }}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" aria-label="Cerrar" (click)="notify.dismiss(t.id)"></button>
          </div>
        </div>
      }
    </div>
  `,
})
export class App {
  protected notify = inject(NotificationService);
}