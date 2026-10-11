import memory1 from './assets/memory-1.jpeg';
import memory2 from './assets/memory-2.jpeg';
import memory3 from './assets/memory-3.jpeg';
import memory4 from './assets/memory-4.jpeg';
import memory5 from './assets/memory-5.jpeg';
import memory6 from './assets/memory-6.jpeg';

/** A single photo memory with a short caption. */
export type Memory = {
  /** Image source. */
  src: string;
  /** Handwritten-style caption. */
  caption: string;
  /** Small note shown when the memory is opened. */
  note: string;
  /** CSS rotation for the image itself (some phone photos are sideways). */
  imageRotate?: number;
};

/** A promise card shown in the promises section. */
export type LovePromise = {
  /** Emoji shown on the front of the card. */
  icon: string;
  /** Short title on the front. */
  title: string;
  /** Full promise revealed on the back. */
  text: string;
};

/** Our memories, in the order they appear. */
export const memories: Memory[] = [
  { src: memory4, caption: 'Our forever selfie', note: 'The wind in my hair, your arm around me — I knew this was home.' },
  { src: memory1, caption: 'Just us, anywhere', note: 'Even a random store aisle feels magical when I am next to you.' },
  { src: memory2, caption: 'That smile of yours', note: 'Your laugh is my favourite song.', imageRotate: -90 },
  { src: memory5, caption: 'Hand in hand', note: 'The day your hand found mine, everything made sense.' },
  { src: memory3, caption: 'My lazy days with you', note: 'Watching you, quietly, and falling in love again.' },
  { src: memory6, caption: 'Two shadows, one soul', note: 'Wherever you go, my shadow will be right beside yours.' },
];

/** The promises I make to you. */
export const promises: LovePromise[] = [
  { icon: '🌹', title: 'I promise to choose you', text: 'Every single morning, on the easy days and the hard ones — I will choose you, again and again.' },
  { icon: '☕', title: 'I promise to be your calm', text: 'When the world gets loud, I will be your quiet place, your cup of chai and your soft landing.' },
  { icon: '😂', title: 'I promise to laugh with you', text: 'At your silly jokes, at our tiny fights, and at how lucky we got to find each other.' },
  { icon: '🤝', title: 'I promise to hold your hand', text: 'Through every road trip, every storm, every new chapter — never letting go.' },
  { icon: '💌', title: 'I promise to keep falling', text: 'Little by little, day by day, I promise to fall in love with you all over again.' },
  { icon: '♾️', title: 'I promise forever', text: 'This is only the beginning. I want every season, every year, every lifetime — with you.' },
];

/** The love letter, paragraph by paragraph. */
export const letter: string[] = [
  'Mere Chenna,',
  'These past two months as your wife have been the most beautiful chapter of my life. Somewhere between the late-night talks and the silly fights, you became my whole world.',
  'You make ordinary days feel like festivals. You hold my hand like it is the most precious thing you own — and I hope you know your heart is the most precious thing I own.',
  'Thank you for your patience, your laugh, your warm hugs, and the way you look at me when you think I am not watching. I see it. I feel it. And I love you for it.',
  'This is just a tiny surprise, but it carries all of me. Here is to our forever — and to every little moment in between.',
  'Forever yours,',
];
