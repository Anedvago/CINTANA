import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment.development';
import { DateService } from './date.service';
import { BookingService } from './booking.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private supabaseClient!: SupabaseClient;
  private supabaseEnvironments: { apiKey: string; url: string } =
    environment.supabase;

  constructor(
    private dateService: DateService,
    private bookingService: BookingService
  ) {
    this.supabaseClient = createClient(
      this.supabaseEnvironments.url,
      this.supabaseEnvironments.apiKey
    );
  }

  public getClientsReserved() {
    const changes = new Subject();
    this.bookingService.detectChangesInBookings().subscribe(() => {
      this.supabaseClient
        .from('Bookings')
        .select('Customers(*),Rooms(*)')
        .gt('start', this.dateService.getDateTimeNow())
        .lt('start', this.dateService.getDateTimeTomorrow())
        .then((data) => {
          changes.next(data.data);
        });
    });
    return changes.asObservable();
  }

  public getClientsOcuped() {
    const changes = new Subject();
    this.bookingService.detectChangesInBookings().subscribe(() => {
      this.supabaseClient
        .from('Bookings')
        .select('Customers(*),Rooms(*)')
        .gt('end', this.dateService.getDateTimeNow())
        .lt('start', this.dateService.getDateTimeNow())
        .then((data) => {
          changes.next(data.data);
        });
    });

    return changes.asObservable();
  }
}
