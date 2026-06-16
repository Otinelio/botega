import { createClient } from '@supabase/supabase-js';

import WebSocket from 'ws';
(global as any).WebSocket = WebSocket;
(globalThis as any).WebSocket = WebSocket;

const SUPABASE_URL = 'https://ohmhfksoslpqblixarhp.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_okYEU2pV5Yz-B1Di-euRcA_lmcFGRWo';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function run() {
  console.log('Updating pizza image in Supabase...');
  const { error } = await supabase
    .from('menu_items')
    .update({ image_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80' })
    .eq('name', 'Pizza Bodega Spéciale');
    
  if (error) console.error(error);
  else console.log('Done!');
}

run();
