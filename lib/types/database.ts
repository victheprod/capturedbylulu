export type BookingStatus =
  | "New"
  | "Contacted"
  | "Booked"
  | "Completed"
  | "Cancelled";

export type AvailabilityBlockType = "blocked" | "vacation" | "booked";

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          is_admin: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          is_admin?: boolean;
        };
        Update: {
          email?: string;
          is_admin?: boolean;
        };
      };
      bookings: {
        Row: {
          id: string;
          client_name: string;
          email: string;
          phone: string;
          session_type: string;
          package: string;
          preferred_date: string;
          location: string | null;
          message: string | null;
          status: BookingStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          client_name: string;
          email: string;
          phone: string;
          session_type: string;
          package: string;
          preferred_date: string;
          location?: string | null;
          message?: string | null;
          status?: BookingStatus;
        };
        Update: Partial<Database["public"]["Tables"]["bookings"]["Insert"]>;
      };
      package_categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          note: string | null;
          link_href: string | null;
          link_label: string | null;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          slug: string;
          note?: string | null;
          link_href?: string | null;
          link_label?: string | null;
          display_order?: number;
          is_active?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["package_categories"]["Insert"]>;
      };
      packages: {
        Row: {
          id: string;
          category_id: string;
          name: string;
          price: string;
          description: string | null;
          duration: string;
          features: string[];
          is_popular: boolean;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          category_id: string;
          name: string;
          price: string;
          description?: string | null;
          duration?: string;
          features?: string[];
          is_popular?: boolean;
          display_order?: number;
          is_active?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["packages"]["Insert"]>;
      };
      portfolio_images: {
        Row: {
          id: string;
          title: string;
          category: string;
          location: string | null;
          alt_text: string | null;
          tags: string[];
          storage_path: string;
          public_url: string;
          is_featured: boolean;
          display_order: number;
          height: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          category: string;
          location?: string | null;
          alt_text?: string | null;
          tags?: string[];
          storage_path: string;
          public_url: string;
          is_featured?: boolean;
          display_order?: number;
          height?: number;
        };
        Update: Partial<Database["public"]["Tables"]["portfolio_images"]["Insert"]>;
      };
      testimonials: {
        Row: {
          id: string;
          client_name: string;
          review: string;
          rating: number;
          session_type: string;
          photo_url: string | null;
          is_featured: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          client_name: string;
          review: string;
          rating: number;
          session_type: string;
          photo_url?: string | null;
          is_featured?: boolean;
          display_order?: number;
        };
        Update: Partial<Database["public"]["Tables"]["testimonials"]["Insert"]>;
      };
      site_content: {
        Row: {
          key: string;
          value: Record<string, unknown>;
          updated_at: string;
        };
        Insert: {
          key: string;
          value: Record<string, unknown>;
        };
        Update: {
          value?: Record<string, unknown>;
        };
      };
      availability_blocks: {
        Row: {
          id: string;
          block_date: string;
          block_type: AvailabilityBlockType;
          note: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          block_date: string;
          block_type: AvailabilityBlockType;
          note?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["availability_blocks"]["Insert"]>;
      };
      media_assets: {
        Row: {
          id: string;
          filename: string;
          storage_path: string;
          public_url: string;
          mime_type: string | null;
          size_bytes: number | null;
          alt_text: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          filename: string;
          storage_path: string;
          public_url: string;
          mime_type?: string | null;
          size_bytes?: number | null;
          alt_text?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["media_assets"]["Insert"]>;
      };
      site_settings: {
        Row: {
          key: string;
          value: Record<string, unknown>;
          updated_at: string;
        };
        Insert: {
          key: string;
          value: Record<string, unknown>;
        };
        Update: {
          value?: Record<string, unknown>;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

export type Booking = Tables<"bookings">;
export type PackageRow = Tables<"packages">;
export type PackageCategoryRow = Tables<"package_categories">;
export type PortfolioImage = Tables<"portfolio_images">;
export type TestimonialRow = Tables<"testimonials">;
export type AvailabilityBlock = Tables<"availability_blocks">;
export type MediaAsset = Tables<"media_assets">;
