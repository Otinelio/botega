import { supabase } from './supabase';
import { 
  defaultCategories, 
  defaultMenu, 
  defaultGallery, 
  defaultTestimonials, 
  defaultInfo 
} from '../data/store';

/**
 * Migre les données du store local vers Supabase
 * À exécuter une seule fois au démarrage de l'app
 */
export async function migrateDataToSupabase() {
  try {
    console.log('🚀 Démarrage de la migration vers Supabase...');

    // 1. Vérifier si les données existent déjà
    const { data: existingCategories } = await supabase
      .from('categories')
      .select('id')
      .limit(1);

    if (existingCategories && existingCategories.length > 0) {
      console.log('✅ Les données existent déjà dans Supabase, migration ignorée');
      return;
    }

    // 2. Migrer les catégories
    console.log('📦 Migration des catégories...');
    const { error: catError } = await supabase
      .from('categories')
      .upsert(defaultCategories, { onConflict: 'id' });
    if (catError) throw catError;
    console.log(`✅ ${defaultCategories.length} catégories migrées`);

    // 3. Migrer les items du menu
    console.log('🍽️  Migration du menu...');
    const { error: menuError } = await supabase
      .from('menu_items')
      .upsert(
        defaultMenu.map(item => {
          const categoryObj = defaultCategories.find(c => c.name === item.category);
          return {
            id: item.id,
            name: item.name,
            description: item.description,
            price: item.price,
            category_id: categoryObj ? categoryObj.id : item.category,
            badges: item.badges,
            available: item.available,
            image_url: item.image,
          };
        }),
        { onConflict: 'id' }
      );
    if (menuError) throw menuError;
    console.log(`✅ ${defaultMenu.length} items de menu migrés`);

    // 4. Migrer la galerie
    console.log('🖼️  Migration de la galerie...');
    const { error: galleryError } = await supabase
      .from('gallery')
      .upsert(defaultGallery, { onConflict: 'id' });
    if (galleryError) throw galleryError;
    console.log(`✅ ${defaultGallery.length} images de galerie migrées`);

    // 5. Migrer les témoignages
    console.log('💬 Migration des témoignages...');
    const { error: testError } = await supabase
      .from('testimonials')
      .upsert(defaultTestimonials, { onConflict: 'id' });
    if (testError) throw testError;
    console.log(`✅ ${defaultTestimonials.length} témoignages migrés`);

    // 6. Migrer les infos du restaurant
    console.log('🏪 Migration des infos du restaurant...');
    const { adminPassword, ...restInfo } = defaultInfo;
    const restaurantData = {
      id: 'main',
      ...restInfo,
      admin_password_hash: adminPassword,
    };
    const { error: restError } = await supabase
      .from('restaurant_info')
      .upsert(restaurantData, { onConflict: 'id' });
    if (restError) throw restError;
    console.log('✅ Infos du restaurant migrées');

    console.log('🎉 Migration complète !');
    return true;
  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error);
    throw error;
  }
}
