import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { DateService } from './date.service';
import { BookingService } from './booking.service';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
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

  public getRoomsSuscribe() {
    const changes = new Subject();

    this.bookingService.detectChangesInBookings().subscribe(() => {
      this.getAllRooms().then((data) => {
        changes.next(data);
      });
    });

    return changes.asObservable();
  }

  /*public detectChangesInRooms() {
    const changes = new Subject();
    this.supabaseClient
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'Rooms' },
        (payload) => {
          changes.next(payload);
        }
      )
      .subscribe(() => {
        changes.next('SUSCRIPCION INICIAL');
      });

    return changes.asObservable();
  }*/

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
      .gt('start', this.dateService.getDateTimeNow())
      .lt('start', this.dateService.getDateTimeTomorrowInit());

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

  public async getRoomsNotSuscribe() {
    let { data: AllRooms } = await this.supabaseClient
      .from('Rooms')
      .select('*')
      .order('name');
    return AllRooms;
  }

  public async createNewRoom(room: any) {
    const { data, error } = await this.supabaseClient
      .from('Rooms')
      .insert([room])
      .select();
    return data;
  }
  public async updateRoom(room: any) {
    const { data, error } = await this.supabaseClient
      .from('Rooms')
      .update([{ name: room.name, type: room.type, color: room.color }])
      .eq('id', room.id)
      .select();
    return data;
  }

  public async deleteRoom(id: number) {
    const { data, error } = await this.supabaseClient
      .from('Rooms')
      .delete()
      .eq('id', id)
      .select();
    return data;
  }
}
