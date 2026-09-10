export type UserRole = 'ADMIN' | 'STAFF' | 'MEMBER' | 'CUSTOMER';

export interface Profile {
  id: string;
  user_id?: string;
  email: string;
  full_name: string;
  phone?: string;
  role: UserRole;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Member {
  id: string;
  member_code: string;
  profile_id?: string;
  full_name: string;
  phone: string;
  email: string;
  status: 'ACTIVE' | 'INACTIVE' | 'EXPIRED' | 'SUSPENDED';
  current_membership_plan_id?: string;
  start_date: string;
  expiry_date?: string;
  emergency_contact?: string;
  created_at: string;
  updated_at: string;
}

export interface DBMembershipPlan {
  id: string;
  slug: string;
  name: string;
  tag?: string;
  price: number;
  benefits: string[];
  duration_months: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DBTrainer {
  id: string;
  name: string;
  title: string;
  specialization: string;
  experience: string;
  image_url: string;
  bio: string;
  availability?: any;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DBPTpackage {
  id: string;
  slug: string;
  type: 'PERSONAL' | 'DUO';
  sessions: string;
  session_count: number;
  price: number;
  tag?: string;
  benefits: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DBClass {
  id: string;
  name: string;
  trainer_id?: string;
  trainer_name: string;
  time: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  category: 'strength' | 'cardio' | 'hiit' | 'functional' | 'mobility';
  day: string;
  slots_taken: number;
  max_slots: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DBProduct {
  id: string;
  slug: string;
  sku: string;
  name: string;
  brand: string;
  category: 'supplements' | 'merch' | 'equipment' | 'bundles';
  price: number;
  original_price?: number;
  rating: number;
  reviews_count: number;
  stock: number;
  low_stock_threshold: number;
  description: string;
  image_url: string;
  images?: string[];
  tag?: string;
  bundle_items?: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DBInventoryLog {
  id: string;
  product_id: string;
  variant_id?: string;
  sku: string;
  previous_stock: number;
  new_stock: number;
  change_type: 'ORDER_COMPLETED' | 'MANUAL_ADJUSTMENT' | 'RESTOCK' | 'RETURN';
  notes?: string;
  created_at: string;
}

export interface DBOrder {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  city: string;
  postal_code: string;
  subtotal: number;
  discount_amount: number;
  shipping_fee: number;
  total_amount: number;
  status: 'PENDING' | 'PAID' | 'PROCESSING' | 'SHIPPED' | 'COMPLETED' | 'CANCELLED';
  payment_method: string;
  promo_code?: string;
  created_at: string;
  updated_at: string;
  items?: DBOrderItem[];
}

export interface DBOrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  variant_info?: string;
  price: number;
  quantity: number;
  subtotal: number;
  created_at: string;
}

export interface DBFreeTrialLead {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  visit_date: string;
  visit_time: string;
  fitness_goal: string;
  status: 'NEW' | 'CONTACTED' | 'VISITED' | 'CONVERTED' | 'CANCELLED';
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface DBPromotion {
  id: string;
  code: string;
  description: string;
  discount_type: 'PERCENTAGE' | 'AMOUNT' | 'FREE_SHIPPING';
  discount_value: number;
  promo_category: 'MEMBERSHIP' | 'PT' | 'PRODUCT' | 'MEMBER_EXCLUSIVE' | 'GENERAL';
  start_date: string;
  end_date: string;
  is_active: boolean;
  created_at: string;
}
