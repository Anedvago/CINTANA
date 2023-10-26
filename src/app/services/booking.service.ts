import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { Observable } from 'rxjs';
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

  public async getAllReservations(): Promise<any[] | null> {
    let { data: Reservations, error } = await this.supabaseClient
      .from('Bookings')
      .select('*,Customers (name), Rooms (name,color,textColor)');
    console.log(Reservations);

    return Reservations;
  }
}
