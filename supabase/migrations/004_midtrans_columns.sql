-- Add Midtrans columns to orders table
ALTER TABLE orders ADD COLUMN IF NOT EXISTS midtrans_order_id TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS snap_token TEXT;

-- Index for faster webhook lookups
CREATE INDEX IF NOT EXISTS idx_orders_midtrans_order_id ON orders(midtrans_order_id);
