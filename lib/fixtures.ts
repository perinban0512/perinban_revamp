// Stub content for the first milestone. Every page reads from this module only,
// so swapping it for Payload CMS queries later is a one-file change.
import type { CategoryId, CharacterId, Side } from './categories'
import type { ReactionType } from './reactions'

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'code'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'list'; items: string[] }

/** A character reaction that fires when `word` reaches the middle of the screen. */
export type ReactionCue = {
  word: string
  side: Side
  reaction: ReactionType
  /** Only this character reacts; otherwise everyone on that side reacts. */
  character?: CharacterId
  say?: string
}

export type Post = {
  slug: string
  title: string
  excerpt: string
  date: string
  categories: CategoryId[]
  /** Label shown on the original perinban.com diary cards. */
  tag: string
  readMins: number
  editor: 'payload' | 'webstudio'
  sample?: boolean
  body: Block[]
  reactions: ReactionCue[]
}

export const posts: Post[] = [
  {
    slug: 'composer-openssl-extension-fix',
    title: 'The fix for “The openssl extension is required for SSL/TLS protection but is not available” error in Composer',
    excerpt:
      'Whenever I tried to do something with Composer I always got this error: “In Factory.php line 654: The openssl extension is required for SSL/TLS protection but is not available.” Here is how I fixed it.',
    date: '2024-04-12',
    categories: ['sysadmin', 'coding'],
    tag: 'CMD',
    readMins: 3,
    editor: 'payload',
    body: [
      { type: 'p', text: 'Whenever I tried to do something with Composer I always got this error in the command prompt:' },
      {
        type: 'code',
        text: 'In Factory.php line 654:\n  The openssl extension is required for SSL/TLS protection but is not available.\n  If you can not enable the openssl extension, you can disable this error, at your\n  own risk, by setting the \'disable-tls\' option to true.',
      },
      { type: 'p', text: 'Disabling TLS is not a good idea, because then your downloads are not protected. The real problem is that PHP is not loading the openssl extension.' },
      { type: 'h2', text: 'Step 1: Find your php.ini' },
      { type: 'p', text: 'Open CMD and run the command below. It tells you which php.ini file PHP is actually reading.' },
      { type: 'code', text: 'php --ini' },
      { type: 'p', text: 'If it says “Loaded Configuration File: (none)”, copy php.ini-development and rename the copy to php.ini in the same folder.' },
      { type: 'h2', text: 'Step 2: Turn on the extension' },
      { type: 'p', text: 'Open php.ini in Notepad, search for openssl and remove the semicolon at the start of the line, so it looks like this:' },
      { type: 'code', text: 'extension_dir = "ext"\nextension=openssl' },
      { type: 'h2', text: 'Step 3: Check it worked' },
      { type: 'code', text: 'php -m | findstr openssl' },
      { type: 'p', text: 'If you see openssl in the list, Composer works again. Yay! Now you can run composer install without any error.' },
    ],
    reactions: [
      { word: 'error', side: 'left', reaction: 'shock', say: 'An error?!' },
      { word: 'semicolon', side: 'right', reaction: 'think', say: 'Just one tiny ; !' },
      { word: 'Yay', side: 'left', reaction: 'cheer' },
      { word: 'Yay', side: 'right', reaction: 'cheer', say: 'It works!' },
    ],
  },
  {
    slug: 'memory-integrity-incompatible-drivers-fix',
    title: 'The fix for “Memory integrity turned off due to incompatible drivers” in Windows Defender',
    excerpt:
      'When you open the arrow button in the taskbar, do you get an annoying warning on the Windows Security icon? If so, here’s the fix for it!',
    date: '2024-03-23',
    categories: ['sysadmin'],
    tag: 'CMD',
    readMins: 4,
    editor: 'payload',
    body: [
      { type: 'p', text: 'When you open the arrow button in the taskbar, do you get an annoying warning on the Windows Security icon? It says memory integrity is off because of incompatible drivers. If so, here’s the fix for it!' },
      { type: 'h2', text: 'Step 1: Find the bad driver' },
      { type: 'p', text: 'Double-click the Windows Security icon, then go to Device security → Core isolation details. Click “Review incompatible drivers” and write down the Published Name. It looks like oem42.inf.' },
      { type: 'h2', text: 'Step 2: Remove it' },
      { type: 'p', text: 'Open Command Prompt as administrator and run this command with your own driver name:' },
      { type: 'code', text: 'pnputil /delete-driver oem42.inf /uninstall /force' },
      { type: 'p', text: 'Be careful: only remove the drivers that Windows listed. They are usually old drivers from devices you do not use anymore.' },
      { type: 'h2', text: 'Step 3: Turn memory integrity on' },
      { type: 'p', text: 'Go back to Core isolation, switch Memory integrity on and restart your computer. The warning is gone and your PC is safer. Done!' },
    ],
    reactions: [
      { word: 'annoying', side: 'right', reaction: 'sleepy', say: 'So annoying…' },
      { word: 'careful', side: 'right', reaction: 'shock', character: 'oldman', say: 'Careful, kanna!' },
      { word: 'Done', side: 'right', reaction: 'cheer' },
    ],
  },
  {
    slug: 'my-first-chess-tournament',
    title: 'My first chess tournament!',
    excerpt:
      'I am truly interested in playing chess — in other words, I love chess. One day I beat my dad in a game of chess and I was boasting about it, so he asked me to…',
    date: '2024-01-11',
    categories: ['experience', 'outside-fun'],
    tag: 'Creativity',
    readMins: 3,
    editor: 'webstudio',
    body: [
      { type: 'p', text: 'I am truly interested in playing chess — in other words, I love chess. One day I beat my dad in a game of chess and I was boasting about it, so he asked me to try playing in a real tournament.' },
      { type: 'p', text: 'I practised every evening on ChessKid and with my dad. I learned openings, forks and pins, and I tried not to lose my queen early.' },
      { type: 'h2', text: 'Tournament day' },
      { type: 'p', text: 'The hall was full of tables and clocks. I was nervous, but after the first move I forgot everything else and just played.' },
      { type: 'quote', text: 'Win or lose, every game teaches you something new.' },
      { type: 'p', text: 'I won some games and lost some games, but I got a certificate and lots of confidence. I can’t wait for the next tournament!' },
    ],
    reactions: [
      { word: 'beat my dad', side: 'left', reaction: 'laugh', say: 'Ha ha, you beat Appa!' },
      { word: 'nervous', side: 'left', reaction: 'think', character: 'oldman', say: 'Take a deep breath.' },
      { word: 'certificate', side: 'right', reaction: 'cheer', say: 'Champion!' },
    ],
  },
  {
    slug: 'my-compering-journey',
    title: 'My compering journey',
    excerpt:
      'In our school there is an annual day function every year. Last year I sang in the choir, but I wanted to do the compering — and this year’s annual day was…',
    date: '2023-12-20',
    categories: ['experience'],
    tag: 'Experience',
    readMins: 3,
    editor: 'webstudio',
    body: [
      { type: 'h2', text: 'Intro' },
      { type: 'p', text: 'In our school there is an annual day function every year. Last year I sang in the choir, but I really wanted to do the compering.' },
      { type: 'p', text: 'This year I told my teacher I wanted to try. She gave me a script, and I practised in front of the mirror, my parents and even my rabbits.' },
      { type: 'h2', text: 'On the stage' },
      { type: 'p', text: 'When I held the microphone, my hands were shaking a little. Then I saw my mother smiling in the audience and I spoke loudly and clearly.' },
      { type: 'p', text: 'Everyone clapped at the end. It was one of the best days of my life!' },
    ],
    reactions: [
      { word: 'rabbits', side: 'left', reaction: 'love', character: 'rabbit', say: 'I was listening!' },
      { word: 'shaking', side: 'left', reaction: 'shock', character: 'oldman' },
      { word: 'clapped', side: 'right', reaction: 'cheer' },
    ],
  },
  {
    slug: 'blender-donut',
    title: 'I made my first 3D donut in Blender',
    excerpt: 'Everyone starts Blender with the famous donut tutorial, so I did too. Icing, sprinkles and a lot of patience.',
    date: '2024-06-02',
    categories: ['3d'],
    tag: '3D',
    readMins: 2,
    editor: 'payload',
    sample: true,
    body: [
      { type: 'p', text: 'Everyone starts Blender with the famous donut tutorial, so I did too.' },
      { type: 'p', text: 'First I added a torus and squished it. Then I duplicated the top half to make the icing and pulled little drips down.' },
      { type: 'p', text: 'The sprinkles were the hardest part. I used particles so they stick to the icing in random directions. When I pressed render, it looked delicious!' },
    ],
    reactions: [
      { word: 'sprinkles', side: 'left', reaction: 'love', say: 'Sprinkles!!' },
      { word: 'delicious', side: 'right', reaction: 'laugh', say: 'Can I eat it?' },
    ],
  },
  {
    slug: 'first-vlog-edit',
    title: 'Editing my first vlog in Premiere Pro',
    excerpt: 'Cutting, trimming, adding music and titles. My first beach vlog took three evenings to edit.',
    date: '2024-05-14',
    categories: ['video-editing'],
    tag: 'Video Editing',
    readMins: 2,
    editor: 'webstudio',
    sample: true,
    body: [
      { type: 'p', text: 'I recorded a vlog at Paradise Beach and wanted to make it look like a real YouTube video.' },
      { type: 'p', text: 'In Premiere Pro I put the clips on the timeline, used the razor tool to cut the boring parts and added a song on the audio track.' },
      { type: 'p', text: 'The final export took a long time, but watching it with my family was so much fun.' },
    ],
    reactions: [
      { word: 'razor', side: 'left', reaction: 'shock', say: 'Snip snip!' },
      { word: 'export', side: 'right', reaction: 'sleepy', say: 'Still exporting…' },
    ],
  },
  {
    slug: 'line-following-robot',
    title: 'Building a line-following robot',
    excerpt: 'Two motors, two IR sensors and an Arduino. My robot follows a black line around the living room.',
    date: '2024-07-08',
    categories: ['robotics', 'coding'],
    tag: 'Robotics',
    readMins: 3,
    editor: 'payload',
    sample: true,
    body: [
      { type: 'p', text: 'My robot has two motors, two IR sensors and an Arduino brain.' },
      { type: 'p', text: 'The sensors look at the floor. When the left sensor sees the black line, the robot turns left. When the right one sees it, it turns right.' },
      { type: 'code', text: 'if (left == BLACK) turnLeft();\nelse if (right == BLACK) turnRight();\nelse forward();' },
      { type: 'p', text: 'The first time it ran, it crashed into the sofa. After tuning the speed it finally followed the whole track!' },
    ],
    reactions: [
      { word: 'Arduino', side: 'left', reaction: 'wave', character: 'robot', say: 'Beep! A friend!' },
      { word: 'crashed', side: 'right', reaction: 'laugh' },
      { word: 'whole track', side: 'left', reaction: 'cheer', say: 'Beep boop yay!' },
    ],
  },
  {
    slug: 'illustrator-pondy-postcard',
    title: 'Drawing a Pondicherry postcard in Illustrator',
    excerpt: 'Yellow houses, bougainvillea and the lighthouse — made with the pen tool, one curve at a time.',
    date: '2024-08-19',
    categories: ['graphics'],
    tag: 'Graphics',
    readMins: 2,
    editor: 'webstudio',
    sample: true,
    body: [
      { type: 'p', text: 'I wanted to draw my favourite place, White Town in Pondicherry, as a postcard.' },
      { type: 'p', text: 'I used the pen tool for the houses and the shape builder for the windows. The bougainvillea flowers were made from one shape repeated many times.' },
      { type: 'p', text: 'At the end I added the lighthouse and the sea. My mother printed it and stuck it on the fridge!' },
    ],
    reactions: [
      { word: 'pen tool', side: 'left', reaction: 'think', say: 'Curves are tricky!' },
      { word: 'fridge', side: 'right', reaction: 'love' },
    ],
  },
  {
    slug: 'weekend-with-my-rabbits',
    title: 'A weekend with my rabbits and hens',
    excerpt: 'Carrots, a tortoise race and very noisy hens. A full report from our backyard.',
    date: '2024-09-01',
    categories: ['outside-fun'],
    tag: 'Outside Fun',
    readMins: 2,
    editor: 'payload',
    sample: true,
    body: [
      { type: 'p', text: 'On Saturday morning I fed my rabbits fresh carrots and cleaned their house.' },
      { type: 'p', text: 'Then we had a race between a rabbit and our neighbour’s tortoise. You know the story — the tortoise won again!' },
      { type: 'p', text: 'The hens were very noisy because they laid three eggs. It was a happy weekend.' },
    ],
    reactions: [
      { word: 'carrots', side: 'left', reaction: 'love', character: 'rabbit', say: 'Carrots!!' },
      { word: 'tortoise won', side: 'left', reaction: 'laugh', character: 'oldman', say: 'Slow and steady!' },
      { word: 'noisy', side: 'right', reaction: 'shock' },
    ],
  },
]

export const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date))

/** The four posts shown in “My Diary” on the home page, as on the original site. */
export const diaryPosts = [
  'composer-openssl-extension-fix',
  'memory-integrity-incompatible-drivers-fix',
  'my-first-chess-tournament',
  'my-compering-journey',
].map((slug) => posts.find((p) => p.slug === slug)!)

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug)
}

export const site = {
  name: 'Perinban.com',
  tagline: 'My learning and fun time',
  email: 'perinbanm@gmail.com',
  /** Swap for a real photo of Perinban (put it in /public/img). */
  aboutPhoto: '/brand/p-mark.png',
}
