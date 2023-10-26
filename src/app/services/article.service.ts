import { Injectable } from '@angular/core';
import { SupabaseClient, User, createClient } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Article } from '../models/Article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
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

  public async getArticlesWithLowStock(): Promise<any[] | null> {
    let { data: Rooms, error } = await this.supabaseClient
      .from('Articles')
      .select('id,name,stock')
      .lte('stock', 10);
    return Rooms;
  }

  public async getAllArticles(): Promise<any[] | null> {
    let { data: Rooms, error } = await this.supabaseClient
      .from('Articles')
      .select('*').order("id", { "ascending": true });;
    return Rooms;
  }

  public async insertNewArticle(article: Article): Promise<any[] | null> {
    let { data: Rooms, error } = await this.supabaseClient
      .from('Articles')
      .insert([this.articleNameUpper(article)])
      .select('*')

    console.log(error);

    return Rooms;
  }

  public async updateArticle(article: Article): Promise<any[] | null> {
    let { data: Rooms, error } = await this.supabaseClient
      .from('Articles')
      .update([article])
      .eq('id', article.id)
      .select('*');
    return Rooms;
  }

  public async deleteArticle(
    id: number
  ): Promise<any | null> {
    const { error } = await this.supabaseClient
      .from('Articles')
      .delete()
      .eq('id', id)

    return error;
  }

  public articleNameUpper(article: Article) {
    article.name = article.name.toUpperCase();
    article.ref = article.ref.toUpperCase();
    return article;
  }
}
