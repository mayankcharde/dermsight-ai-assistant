
-- Create storage bucket for skin images
INSERT INTO storage.buckets (id, name, public) VALUES ('skin-images', 'skin-images', true);

-- Allow anyone to upload images
CREATE POLICY "Anyone can upload skin images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'skin-images');

-- Allow anyone to read images
CREATE POLICY "Anyone can view skin images"
ON storage.objects FOR SELECT
USING (bucket_id = 'skin-images');
