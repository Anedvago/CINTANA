import { AuthError, Session, User } from '@supabase/supabase-js';

export type SupabaseResponse =
  | { user: User; session: Session }
  | { user: null; session: null }
  | AuthError
  | null;
