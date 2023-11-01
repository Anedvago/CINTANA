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

  constructor(private dateService: DateService) {
    this.supabaseClient = createClient(
      this.supabaseEnvironments.url,
      this.supabaseEnvironments.apiKey
    );
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

  public getClientsInTransitSubscribe() {
    const changes = new Subject();
    this.detectChangesInBookings().subscribe(() => {
      this.getClientsInTransit().then((data) => {
        changes.next(data);
      });
    });
    return changes.asObservable();
  }

  public async getClientsInTransit() {
    let clients: any[] = [];
    let { data: ClientsReserved } = await this.supabaseClient
      .from('Bookings')
      .select('Customers(*),Rooms(*)')
      .gt('start', this.dateService.getDateTimeNow())
      .lt('start', this.dateService.getDateTimeTomorrow());
    let { data: ClientsOcuped } = await this.supabaseClient
      .from('Bookings')
      .select('Customers(*),Rooms(*)')
      .gt('end', this.dateService.getDateTimeNow())
      .lt('start', this.dateService.getDateTimeNow());

    clients = clients.concat(
      ClientsReserved?.map((elem: any) => {
        return {
          ...elem,
          nombre: elem.Customers.name,
          estado: 'Reservado',
          habitacion: elem.Rooms.name,
        };
      })
    );
    clients = clients.concat(
      ClientsOcuped?.map((elem: any) => {
        return {
          ...elem,
          nombre: elem.Customers.name,
          estado: 'Ocupado',
          habitacion: elem.Rooms.name,
        };
      })
    );
    return clients;
  }

  public async getClientsByDni(type: string, value: string) {
    let { data: Customers } = await this.supabaseClient
      .from('Customers')
      .select('*')
      .eq('typeIdentification', type)
      .eq('identification', value);
    return Customers;
  }

  public async createNewCustomer(
    typeDni: string,
    dni: string,
    name: string,
    phone: string
  ) {
    const { data, error } = await this.supabaseClient
      .from('Customers')
      .insert([
        {
          typeIdentification: typeDni,
          identification: dni,
          name: name,
          phone: phone,
        },
      ])
      .select();
  }
}
