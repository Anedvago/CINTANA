import { Injectable } from '@angular/core';
import { RealtimeChannel, SupabaseClient, createClient } from '@supabase/supabase-js';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { DateService } from './date.service';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private supabaseClient!: SupabaseClient;
  private supabaseEnvironments: { apiKey: string; url: string } =
    environment.supabase;

  constructor(private dateService: DateService) {
    this.supabaseClient = createClient(
      this.supabaseEnvironments.url,
      this.supabaseEnvironments.apiKey
    );
  }

  public async getAllRooms(): Promise<any[] | null> {
    let { data: Rooms, error } = await this.supabaseClient
      .from('Rooms')
      .select('*').order("name");
    return Rooms;
  }

  public async getAllRoomsWhitState() {
    const Bookings = this.supabaseClient.channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'Bookings' },
        (payload) => {
          console.log('Change received!', payload)
          return
        }
      )

  }

  public async getRoomsReserved(): Promise<any[] | null> {
    const currentDate = new Date();
    const now = this.dateService.getDateTimeNow();
    const tomorrow = `${currentDate.getFullYear()}-${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}-${(currentDate.getDate() + 1)
        .toString()
        .padStart(2, '0')} ${currentDate
          .getHours()
          .toString()
          .padStart(2, '0')}:${currentDate
            .getMinutes()
            .toString()
            .padStart(2, '0')}:${currentDate
              .getSeconds()
              .toString()
              .padStart(2, '0')}`;

    let { data: Rooms, error } = await this.supabaseClient
      .from('Bookings')
      .select('room')
      .gt('start', now)
      .lt('start', tomorrow);
    /*  .or(`end.eq.${now},start.eq.${now}`); */

    return Rooms;
  }

  public async getRoomsOcuped(): Promise<any[] | null> {
    const currentDate = new Date();
    const now = this.dateService.getDateTimeNow();

    let { data: Rooms, error } = await this.supabaseClient
      .from('Bookings')
      .select('room')
      .gt('end', now)
      .lt('start', now);

    return Rooms;
  }

  public getRoomsOcupedSuscribe() {
    const changes = new Subject();
    this.supabaseClient.channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'Bookings' },
        async (payload) => {
          const now = this.dateService.getDateTimeNow();
          let { data: Rooms, error } = await this.supabaseClient
            .from('Bookings')
            .select('room')
            .gt('end', now)
            .lt('start', now);
          changes.next(Rooms)
        }
      )
      .subscribe(async () => {
        const now = this.dateService.getDateTimeNow();

        let { data: Rooms, error } = await this.supabaseClient
          .from('Bookings')
          .select('room')
          .gt('end', now)
          .lt('start', now);
        changes.next(Rooms);
      })

    return changes.asObservable();
  }

  public getRoomsReservedSuscribe() {
    const changes = new Subject();
    this.supabaseClient.channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'Bookings' },
        async (payload) => {
          const now = this.dateService.getDateTimeNow();
          const tomorrow = this.dateService.getDateTimeTomorrow()
          let { data: Rooms, error } = await this.supabaseClient
            .from('Bookings')
            .select('room')
            .gt('start', now)
            .lt('start', tomorrow);
          changes.next(Rooms)
        }
      )
      .subscribe(async () => {
        const now = this.dateService.getDateTimeNow();
        const tomorrow = this.dateService.getDateTimeTomorrow()
        let { data: Rooms, error } = await this.supabaseClient
          .from('Bookings')
          .select('room')
          .gt('start', now)
          .lt('start', tomorrow);
        changes.next(Rooms);
      })

    return changes.asObservable();
  }
}
