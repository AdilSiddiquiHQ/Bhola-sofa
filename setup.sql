-- 1. Create the products table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price NUMERIC NOT NULL,
    discount_price NUMERIC,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create the storage bucket for product images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Enable RLS on products table
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- 4. Create Policies for products (Allow all operations for simplicity as per requested frontend-auth)
CREATE POLICY "Enable read access for all users" ON public.products FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON public.products FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON public.products FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON public.products FOR DELETE USING (true);

-- 5. Create Policies for storage bucket (Allow all operations on product-images)
CREATE POLICY "Give public access to product-images" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
CREATE POLICY "Allow public uploads to product-images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product-images');
CREATE POLICY "Allow public updates to product-images" ON storage.objects FOR UPDATE USING (bucket_id = 'product-images');
CREATE POLICY "Allow public deletes to product-images" ON storage.objects FOR DELETE USING (bucket_id = 'product-images');
