import { Injectable } from '@angular/core';
import {
  RealtimeChannel,
  SupabaseClient,
  createClient,
} from '@supabase/supabase-js';
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

  public getRoomsSuscribe() {
    const changes = new Subject();
    this.supabaseClient
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'Bookings' },
        async (payload) => {
          this.getAllRooms().then((data) => {
            changes.next(data);
          });
        }
      )
      .subscribe(async () => {
        this.getAllRooms().then((data) => {
          changes.next(data);
        });
      });

    return changes.asObservable();
  }
  async getAllRooms() {
    const now = this.dateService.getDateTimeNow();
    const tomorrow = this.dateService.getDateTimeTomorrow();
    let { data: AllRooms } = await this.supabaseClient
      .from('Rooms')
      .select('*')
      .order('name');

    let { data: OcupedRooms } = await this.supabaseClient
      .from('Bookings')
      .select('room')
      .gt('end', now)
      .lt('start', now);

    let { data: ReservedRooms } = await this.supabaseClient
      .from('Bookings')
      .select('room')
      .gt('start', now)
      .lt('start', tomorrow);

    AllRooms = AllRooms!.map((obj) => {
      return { ...obj, state: 'libre' };
    });

    ReservedRooms?.forEach((element: any) => {
      AllRooms!.find((obj) => obj.id == element.room).state = 'reservada';
    });
    OcupedRooms?.forEach((element: any) => {
      AllRooms!.find((obj) => obj.id == element.room).state = 'ocupada';
    });
    return AllRooms;
  }
}
