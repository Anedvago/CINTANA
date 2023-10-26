import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DischargedService {

  private supabaseClient!: SupabaseClient;
  private supabaseEnvironments: { apiKey: string; url: string } =
    environment.supabase;

  constructor() {
    this.supabaseClient = createClient(
      this.supabaseEnvironments.url,
      this.supabaseEnvironments.apiKey
    );
  }

  public async getAllDischargesCab(): Promise<any[] | null> {
    let { data: DischargesCab, error } = await this.supabaseClient
      .from('DischargesCab')
      .select('*')
    return DischargesCab;
  }

  public async getDischargesLinById(id: number): Promise<any[] | null> {
    let { data: DischargesCab, error } = await this.supabaseClient
      .from('DischargesLin')
      .select('*').eq("facture", id)
    return DischargesCab;
  }
}
