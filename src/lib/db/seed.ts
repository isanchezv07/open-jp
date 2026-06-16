import { db } from './index';
import { lessons, words } from '../data';

export async function seedDatabase() {
  const lastSeedVersion = localStorage.getItem('db_seed_version');
  const CURRENT_SEED_VERSION = '2';

  const lessonCount = await db.lessons.count();
  
  if (lessonCount === 0 || lastSeedVersion !== CURRENT_SEED_VERSION) {
    console.log('Seeding/Updating Database...');
    
    await db.lessons.clear();
    await db.words.clear();
    
    await db.lessons.bulkAdd(lessons);
    await db.words.bulkAdd(words);

    const statsExists = await db.userStats.get('current');
    if (!statsExists) {
      await db.userStats.add({
        id: 'current',
        xp: 0,
        streak: 0,
        last_active: new Date(),
        badges: []
      });
    }

    localStorage.setItem('db_seed_version', CURRENT_SEED_VERSION);
    console.log('Database seeded successfully.');
  }
}
