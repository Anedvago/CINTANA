import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private supabaseClient!: SupabaseClient;
  private supabaseEnvironments: { apiKey: string; url: string } =
    environment.supabase;
  constructor() {
    this.supabaseClient = createClient(
      this.supabaseEnvironments.url,
      this.supabaseEnvironments.apiKey
    );
  }

  public getAllReservations() {
    const changes = new Subject();
    this.detectChangesInBookings().subscribe(() => {
      this.supabaseClient
        .from('Bookings')
        .select('*,Customers (name), Rooms (name,color,textColor)')
        .then((data) => {
          changes.next(data.data);
        });
    });
    return changes.asObservable();
  }

  public async obtainReservations() {
    let { data: Reservations, error } = await this.supabaseClient
      .from('Bookings')
      .select('*,Customers (name), Rooms (name,color,textColor)');
    console.log(Reservations);

    return Reservations;
  }

  public detectChangesInBookings() {
    const changes = new Subject();
    this.supabaseClient
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'Bookings' },
        async (payload) => {
          changes.next('CAMBIO DETECTADO');
        }
      )
      .subscribe(() => {
        changes.next('SUSCRIPCION INICIAL');
      });

    return changes.asObservable();
  }
}
