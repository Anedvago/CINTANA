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
        .select('*,Customers (name), Rooms (name,color)')
        .then((data) => {
          changes.next(data.data);
        });
    });
    return changes.asObservable();
  }

  public async obtainReservations() {
    let { data: Reservations, error } = await this.supabaseClient
      .from('Bookings')
      .select('*,Customers (name), Rooms (name,color)');
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
        (payload) => {
          changes.next(payload);
        }
      )
      .subscribe(() => {
        changes.next('SUSCRIPCION INICIAL');
      });

    return changes.asObservable();
  }

  public async createReservation(
    start: string,
    end: string,
    room: number,
    customer: number,
    total: number,
    payed: number,
    metodPay: string,
    numberOfPeople: number
  ) {
    const { data, error } = await this.supabaseClient
      .from('Bookings')
      .insert([
        {
          start: start,
          end: end,
          room: room,
          customer: customer,
          total: total,
          paid: payed,
          wayToPay: metodPay,
          numberOfPeople: numberOfPeople,
        },
      ])
      .select();
    return data;
  }

  public async updateReservation(
    start: string,
    end: string,
    room: number,
    customer: number,
    total: number,
    payed: number,
    metodPay: string,
    numberOfPeople: number,
    id: number
  ) {
    const { data, error } = await this.supabaseClient
      .from('Bookings')
      .update([
        {
          start: start,
          end: end,
          room: room,
          customer: customer,
          total: total,
          paid: payed,
          wayToPay: metodPay,
          numberOfPeople: numberOfPeople,
        },
      ])
      .eq('id', id)
      .select();
    return data;
  }
  public async deleteReservation(id: number) {
    const { data: Reservation, error } = await this.supabaseClient
      .from('Bookings')
      .delete()
      .eq('id', id);
    return Reservation;
  }
}
