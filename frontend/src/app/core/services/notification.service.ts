import { Injectable, signal } from '@angular/core';

export interface Toast { id: number; text: string; type: 'success' | 'danger'; }

@Injectable({ providedIn: 'root' })
export class NotificationService {
  readonly toasts = signal<Toast[]>([]);
  private nextId = 0;

  success(text: string) { this.push(text, 'success'); }
  error(text: string) { this.push(text, 'danger'); }

  dismiss(id: number) {
    this.toasts.update(list => list.filter(t => t.id !== id));
  }

  private push(text: string, type: Toast['type']) {
    const id = ++this.nextId;
    this.toasts.update(list => [...list, { id, text, type }]);
    setTimeout(() => this.dismiss(id), 5000);
  }
}