import { Injectable } from '@angular/core';
import { SupabaseResponse } from '../models/SupabaseResponse';
import {
  AuthError,
  AuthTokenResponse,
  SupabaseClient,
  User,
  createClient,
} from '@supabase/supabase-js';
import { environment } from 'src/environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabaseClient!: SupabaseClient;
  private supabaseEnvironments: { apiKey: string; url: string } =
    environment.supabase;
  private userSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  constructor() {
    this.supabaseClient = createClient(
      this.supabaseEnvironments.url,
      this.supabaseEnvironments.apiKey
    );
  }

  public async login(
    email: string,
    password: string
  ): Promise<SupabaseResponse> {
    try {
      const { data, error }: AuthTokenResponse =
        await this.supabaseClient.auth.signInWithPassword({
          email: email,
          password: password,
        });
      this.setUser();
      return error ? error : data;
    } catch (error) {
      console.log(error);
      return error as AuthError;
    }
  }

  public setUser(): void {
    const session = localStorage.getItem(
      'supabase.auth.token'
    ) as unknown as User;
    this.userSubject.next(session);
  }

  public getUser(): Observable<User | null> {
    return this.userSubject.asObservable();
  }
}
