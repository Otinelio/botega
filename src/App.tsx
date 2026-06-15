import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { seedAllData } from './data/store';
import { migrateDataToSupabase } from './lib/migrate';
import Home from './pages/Home';
import ScanMenu from './pages/ScanMenu';
import MenuPublic from './pages/MenuPublic';
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import MenuManager from './admin/MenuManager';
import CategoriesManager from './admin/CategoriesManager';
import GalleryManager from './admin/GalleryManager';
import TestimonialsManager from './admin/TestimonialsManager';
import SettingsManager from './admin/SettingsManager';

// Seed default data on first load
seedAllData();

function App() {
  useEffect(() => {
    // Migrate data to Supabase on first load
    // This runs silently in the background and only happens once
    migrateDataToSupabase().catch(err => {
      console.error('Migration failed, but app will use local data as fallback:', err);
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Site */}
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<MenuPublic />} />

        {/* Table Scan Menu */}
        <Route path="/menu/scan" element={<ScanMenu />} />

        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="menu" element={<MenuManager />} />
          <Route path="categories" element={<CategoriesManager />} />
          <Route path="gallery" element={<GalleryManager />} />
          <Route path="testimonials" element={<TestimonialsManager />} />
          <Route path="settings" element={<SettingsManager />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
