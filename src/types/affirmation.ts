export interface Affirmation {
  id: number;
  text: string;
  timing: number;
  category?: string;
  created_at?: string;
}

export interface Database {
  public: {
    Tables: {
      affirmations: {
        Row: {
          id: number;
          text: string;
          category: string;
          created_at: string;
        };
        Insert: {
          text: string;
          category: string;
          created_at?: string;
        };
        Update: {
          text?: string;
          category?: string;
          created_at?: string;
        };
      };
    };
  };
}