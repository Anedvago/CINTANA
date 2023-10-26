import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment.development';
import { DateService } from './date.service';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private supabaseClient!: SupabaseClient;
  private supabaseEnvironments: { apiKey: string; url: string } =
    environment.supabase;

  constructor(private dateService: DateService) {
    this.supabaseClient = createClient(
      this.supabaseEnvironments.url,
      this.supabaseEnvironments.apiKey
    );
  }

  public async getClientsReserved(): Promise<any[] | null> {
    let { data: Customers, error } = await this.supabaseClient
      .from('Bookings')
      .select('Customers(*),Rooms(*)')
      .gt('start', this.dateService.getDateTimeNow())
      .lt('start', this.dateService.getDateTimeTomorrow());
    console.log();
    return Customers;
  }
  public async getClientsOcuped(): Promise<any[] | null> {
    let { data: Rooms, error } = await this.supabaseClient
      .from('Bookings')
      .select('Customers(*),Rooms(*)')
      .gt('end', this.dateService.getDateTimeNow())
      .lt('start', this.dateService.getDateTimeNow());
    return Rooms;
  }
}
