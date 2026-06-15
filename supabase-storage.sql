-- ==========================================
-- SCRIPT DE CONFIGURATION DU STOCKAGE (IMAGES)
-- ==========================================

-- 1. Créer le bucket "gallery" s'il n'existe pas et le rendre PUBLIC
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery', 'gallery', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Supprimer les anciennes règles si elles existent pour éviter les erreurs
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Public Upload" ON storage.objects;
DROP POLICY IF EXISTS "Public Delete" ON storage.objects;
DROP POLICY IF EXISTS "Public Update" ON storage.objects;

-- 3. Créer la règle pour autoriser la LECTURE des images par tout le monde
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'gallery' );

-- 4. Créer la règle pour autoriser l'UPLOAD d'images
CREATE POLICY "Public Upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'gallery' );

-- 5. Créer la règle pour autoriser la SUPPRESSION d'images
CREATE POLICY "Public Delete"
ON storage.objects FOR DELETE
USING ( bucket_id = 'gallery' );

-- 6. Créer la règle pour autoriser la MODIFICATION d'images
CREATE POLICY "Public Update"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'gallery' );
