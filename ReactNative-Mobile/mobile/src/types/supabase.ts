export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      transactions: {
        Row: {
          id: string
          created_at: string
          amount: number
          type: 'income' | 'expense'
          category: string
          description: string
          date: string
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          amount: number
          type: 'income' | 'expense'
          category: string
          description: string
          date: string
          user_id: string
        }
        Update: {
          id?: string
          created_at?: string
          amount?: number
          type?: 'income' | 'expense'
          category?: string
          description?: string
          date?: string
          user_id?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          type: 'income' | 'expense'
          icon: string
          color: string
          user_id: string
        }
        Insert: {
          id?: string
          name: string
          type: 'income' | 'expense'
          icon: string
          color: string
          user_id: string
        }
        Update: {
          id?: string
          name?: string
          type?: 'income' | 'expense'
          icon?: string
          color?: string
          user_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 