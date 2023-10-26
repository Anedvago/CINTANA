import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private supabaseClient!: SupabaseClient;
  private supabaseEnvironments: { apiKey: string; url: string } =
    environment.supabase;

  constructor() {
    this.supabaseClient = createClient(
      this.supabaseEnvironments.url,
      this.supabaseEnvironments.apiKey
    );
  }

  public async getAllRooms(): Promise<any[] | null> {
    let { data: Rooms, error } = await this.supabaseClient
      .from('Rooms')
      .select('*');
    return Rooms;
  }

  public async getRoomsReserved(): Promise<any[] | null> {
    const currentDate = new Date();
    const now = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${currentDate
      .getDate()
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
    const now = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${currentDate
      .getDate()
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
      .gt('end', now)
      .lt('start', now);

    return Rooms;
  }
}
