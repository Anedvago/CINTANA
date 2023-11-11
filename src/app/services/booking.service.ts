import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { DateService } from './date.service';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private supabaseClient!: SupabaseClient;
  private supabaseEnvironments: { apiKey: string; url: string } =
    environment.supabase;

  private reservationSelected: any;
  constructor(private dateService: DateService) {
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
    numberOfAdults: number,
    numberOfChilds: number
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
          numberOfAdults: numberOfAdults,
          numberOfChilds: numberOfChilds,
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
    numberOfAdults: number,
    numberOfChilds: number,
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
          numberOfAdults: numberOfAdults,
          numberOfChilds: numberOfChilds,
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

  public async getReservationToCheck(idCustomer: number) {
    const today = this.dateService.getDateTimeNowInit();
    const tomorrow = this.dateService.getDateTimeTomorrowInit();
    const { data: Reservation, error } = await this.supabaseClient
      .from('Bookings')
      .select()
      .gte('start', today)
      .lte('start', tomorrow)
      .is('checkIn', null)
      .eq('customer', idCustomer);

    return Reservation;
  }

  public async getReservationToCheckOut(idCustomer: number) {
    const today = this.dateService.getDateTimeNowInit();
    const tomorrow = this.dateService.getDateTimeTomorrowInit();
    const { data: Reservation, error } = await this.supabaseClient
      .from('Bookings')
      .select()
      .is('checkOut', null)
      .eq('customer', idCustomer);

    return Reservation;
  }

  public async checkIn(id: number) {
    const now = this.dateService.getDateTimeNow();
    const { data, error } = await this.supabaseClient
      .from('Bookings')
      .update({
        checkIn: now,
      })
      .eq('id', id)
      .select();
    console.log(error);

    return data;
  }

  public async checkOut(id: number) {
    const now = this.dateService.getDateTimeNow();
    const { data, error } = await this.supabaseClient
      .from('Bookings')
      .update({
        checkOut: now,
        end: now,
      })
      .eq('id', id)
      .select();
    return data;
  }
}
