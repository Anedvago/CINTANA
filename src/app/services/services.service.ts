import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment.development';
import { Service } from '../models/Service';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  private supabaseClient!: SupabaseClient;
  private supabaseEnvironments: { apiKey: string; url: string } =
    environment.supabase;

  constructor() {
    this.supabaseClient = createClient(
      this.supabaseEnvironments.url,
      this.supabaseEnvironments.apiKey
    );
  }

  public async getAllServices(): Promise<any[] | null> {
    let { data: Rooms, error } = await this.supabaseClient
      .from('Services')
      .select('*');
    return Rooms;
  }

  public async insertNewService(service: Service): Promise<any[] | null> {
    let { data: Rooms, error } = await this.supabaseClient
      .from('Services')
      .insert([this.serviceNameUpper(service)])
      .select('*')
    console.log(service);
    
      console.log(error);
      
    return Rooms;
  }

  public async updateService(service: Service): Promise<any[] | null> {
    let { data: Rooms, error } = await this.supabaseClient
      .from('Services')
      .update([this.serviceNameUpper(service)])
      .eq('id', service.id)
      .select('*');
    return Rooms;
  }

  public async deleteService(
    id: number
  ): Promise<any | null> {
    const { error } = await this.supabaseClient
      .from('Services')
      .delete()
      .eq('id', id)

    return error;
  }

  public serviceNameUpper(service: Service) {
    service.name = service.name.toUpperCase();
    return service;
  }
}
