import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment.development';
import { DateService } from './date.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PasadiaService {
  private supabaseClient!: SupabaseClient;
  private supabaseEnvironments: { apiKey: string; url: string } =
    environment.supabase;
  constructor(private dateService: DateService) {
    this.supabaseClient = createClient(
      this.supabaseEnvironments.url,
      this.supabaseEnvironments.apiKey
    );
  }

  public obtenerPasadias() {
    const changes = new Subject();
    this.detectChangesInPasadias().subscribe(() => {
      this.supabaseClient
        .from('Pasadias')
        .select('*,Customers (name)')
        .then((data) => {
          changes.next(data.data);
        });
    });
    return changes.asObservable();
  }

  public detectChangesInPasadias() {
    const changes = new Subject();
    this.supabaseClient
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'Pasadias' },
        (payload) => {
          changes.next(payload);
        }
      )
      .subscribe(() => {
        changes.next('SUSCRIPCION INICIAL');
      });

    return changes.asObservable();
  }

  public async crearPasadia(cliente: number, fecha: string) {
    const { data, error } = await this.supabaseClient
      .from('Pasadias')
      .insert([
        {
          cliente: cliente,
          fecha: fecha,
        },
      ])
      .select();
    return data;
  }
  public async actualizarPasadia(cliente: number, fecha: string, id: number) {
    const { data, error } = await this.supabaseClient
      .from('Pasadias')
      .update([
        {
          cliente: cliente,
          fecha: fecha,
        },
      ])
      .eq('id', id)
      .select();
    return data;
  }
  public async eliminarPasadia(id: number) {
    const { data: Reservation, error } = await this.supabaseClient
      .from('Pasadias')
      .delete()
      .eq('id', id);
    return Reservation;
  }
}
