-- Enable Row Level Security (redundant if already enabled, but safe)
alter table public.products enable row level security;

-- Policy to allow authenticated users to INSERT products
create policy "Allow authenticated users to insert products"
on public.products
for insert
to authenticated
with check (true);

-- Policy to allow authenticated users to UPDATE products
create policy "Allow authenticated users to update products"
on public.products
for update
to authenticated
using (true)
with check (true);

-- Policy to allow authenticated users to DELETE products
create policy "Allow authenticated users to delete products"
on public.products
for delete
to authenticated
using (true);

-- STORAGE POLICIES (If you use Supabase Storage) --
-- You usually set this in the Dashboard GUI, but here is a SQL way if you have the "storage" extension enabled.
-- NOTE: If this fails, please set 'Public' on your bucket in the Dashboard.

-- Ensure the bucket exists (this logic is usually handled via Dashboard in standard Supabase setup)
-- insert into storage.buckets (id, name, public) values ('images', 'images', true);

-- Policy to allow public read access to images
-- create policy "Public Access"
-- on storage.objects for select
-- using ( bucket_id = 'images' );

-- Policy to allow authenticated users to upload images
-- create policy "Authenticated users can upload images"
-- on storage.objects for insert
-- to authenticated
-- with check ( bucket_id = 'images' );
