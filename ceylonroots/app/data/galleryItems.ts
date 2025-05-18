import { GalleryItem } from '../types/gallery';

export const galleryItems: GalleryItem[] = [
  {
    id: 'gallery-1',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1586185618635-913721197102?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    caption: 'Sigiriya Rock Fortress',
    location: 'Sigiriya, Cultural Triangle',
    description: 'The ancient rock fortress and palace ruins of Sigiriya, a UNESCO World Heritage site.',
    categories: ['cultural', 'adventure'],
    featured: true,
    dateAdded: '2023-05-15'
  },
  {
    id: 'gallery-2',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1575991442192-b253753ff621?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    caption: 'Galle Fort at Sunset',
    location: 'Galle, Southern Coast',
    description: 'The historic Galle Fort illuminated by the golden light of sunset.',
    categories: ['cultural', 'beaches'],
    dateAdded: '2023-06-22'
  },
  {
    id: 'gallery-3',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1594402105032-5fe5fecd4e3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    caption: 'Leopard Sighting',
    location: 'Yala National Park',
    description: 'A rare leopard sighting during a safari in Yala National Park, home to one of the highest leopard densities in the world.',
    categories: ['wildlife', 'adventure'],
    featured: true,
    dateAdded: '2023-07-08'
  },
  {
    id: 'gallery-4',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1546866712-566f042ae2b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    caption: 'Nine Arch Bridge',
    location: 'Ella, Hill Country',
    description: 'The iconic Nine Arch Bridge in Ella, surrounded by lush green tea plantations.',
    categories: ['cultural', 'adventure'],
    dateAdded: '2023-08-14'
  },
  {
    id: 'gallery-5',
    type: 'video',
    url: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f62636cc0b51f696f393032126104e0f86&profile_id=139&oauth2_token_id=57447761',
    thumbnailUrl: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    caption: 'Waves on Unawatuna Beach',
    location: 'Unawatuna, Southern Coast',
    description: 'Gentle waves washing ashore on the beautiful Unawatuna Beach.',
    categories: ['beaches', 'adventure'],
    dateAdded: '2023-09-03'
  },
  {
    id: 'gallery-6',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1606046604972-77cc76aee944?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    caption: 'Temple of the Sacred Tooth Relic',
    location: 'Kandy, Central Highlands',
    description: 'The Temple of the Sacred Tooth Relic (Sri Dalada Maligawa) in Kandy, one of the most sacred Buddhist sites.',
    categories: ['cultural'],
    dateAdded: '2023-09-27'
  },
  {
    id: 'gallery-7',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1586699253884-e199770f52d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    caption: 'Tea Plantations',
    location: 'Nuwara Eliya, Hill Country',
    description: 'Rolling hills of verdant tea plantations in Nuwara Eliya, the heart of Sri Lanka\'s tea country.',
    categories: ['adventure', 'food'],
    featured: true,
    dateAdded: '2023-10-11'
  },
  {
    id: 'gallery-8',
    type: 'video',
    url: 'https://player.vimeo.com/external/370467031.sd.mp4?s=7550d8e6e8e2a15e64ef64a51566c3af3ca8429e&profile_id=139&oauth2_token_id=57447761',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581517317483-0977e8efef5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    caption: 'Elephant Bathing',
    location: 'Pinnawala, Central Province',
    description: 'Elephants enjoying a refreshing bath in the river at Pinnawala Elephant Orphanage.',
    categories: ['wildlife', 'adventure'],
    dateAdded: '2023-10-29'
  },
  {
    id: 'gallery-9',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1625380334954-3669606e0084?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    caption: 'Kandy Lake',
    location: 'Kandy, Central Highlands',
    description: 'The serene Kandy Lake with the Temple of the Sacred Tooth Relic in the background.',
    categories: ['cultural'],
    dateAdded: '2023-11-15'
  },
  {
    id: 'gallery-10',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1596367407372-96cb88503db6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    caption: 'Sigiriya Frescoes',
    location: 'Sigiriya, Cultural Triangle',
    description: 'The famous frescoes on Sigiriya Rock, depicting celestial nymphs.',
    categories: ['cultural'],
    dateAdded: '2023-12-03'
  },
  {
    id: 'gallery-11',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1596431051169-83e910c7b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    caption: 'Galle Lighthouse',
    location: 'Galle, Southern Coast',
    description: 'The historic lighthouse in Galle Fort, dating back to colonial times.',
    categories: ['beaches', 'cultural'],
    dateAdded: '2024-01-08'
  },
  {
    id: 'gallery-12',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1606046518244-c0f91c65c5df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    caption: 'Ruwanwelisaya Stupa',
    location: 'Anuradhapura, Cultural Triangle',
    description: 'The magnificent Ruwanwelisaya Stupa, one of the world\'s oldest and most venerated Buddhist monuments.',
    categories: ['cultural'],
    dateAdded: '2024-01-27'
  },
  {
    id: 'gallery-13',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1596267788189-4983421c0c03?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    caption: 'Traditional Sri Lankan Food',
    location: 'Colombo',
    description: 'A colorful spread of traditional Sri Lankan rice and curry dishes.',
    categories: ['food'],
    featured: true,
    dateAdded: '2024-02-14'
  },
  {
    id: 'gallery-14',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1578559284795-49dbd11b4c1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    caption: 'Little Adam\'s Peak Sunrise',
    location: 'Ella, Hill Country',
    description: 'The breathtaking view from Little Adam\'s Peak at sunrise, showing mist-covered valleys below.',
    categories: ['adventure'],
    dateAdded: '2024-03-01'
  },
  {
    id: 'gallery-15',
    type: 'video',
    url: 'https://player.vimeo.com/external/368770431.sd.mp4?s=be39a248db7e4b08c699abe14e7b87e0acd32a0f&profile_id=139&oauth2_token_id=57447761',
    thumbnailUrl: 'https://images.unsplash.com/photo-1623645481161-0d8160281cbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    caption: 'Sea Turtles at Hikkaduwa',
    location: 'Hikkaduwa, Southern Coast',
    description: 'Sea turtles swimming in the clear waters of Hikkaduwa Marine Sanctuary.',
    categories: ['wildlife', 'beaches'],
    dateAdded: '2024-03-18'
  },
  {
    id: 'gallery-16',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1568393837075-aee3118b5575?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    caption: 'Wild Elephants',
    location: 'Udawalawe National Park',
    description: 'A herd of wild elephants grazing in Udawalawe National Park, one of the best places to see elephants in their natural habitat.',
    categories: ['wildlife'],
    dateAdded: '2024-04-05'
  }
];