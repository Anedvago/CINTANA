import { Injectable } from '@angular/core';
import { SupabaseClient, User, createClient } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PusrchaseService {

  private supabaseClient!: SupabaseClient;
  private supabaseEnvironments: { apiKey: string; url: string } =
    environment.supabase;

  constructor() {
    this.supabaseClient = createClient(
      this.supabaseEnvironments.url,
      this.supabaseEnvironments.apiKey
    );
  }

  public async getAllPurchasesCab(): Promise<any[] | null> {
    let { data: PurchasesCab, error } = await this.supabaseClient
      .from('PurchasesCab')
      .select('*')
    return PurchasesCab;
  }

  public async getPurchasesLinById(id: number): Promise<any[] | null> {
    let { data: PurchasesCab, error } = await this.supabaseClient
      .from('PurchasesLin')
      .select('*').eq("facture", id)
    return PurchasesCab;
  }
}
