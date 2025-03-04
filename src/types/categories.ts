export type Category = {
  id: string;
  name: string;
  description: string;
  icon: string;
};

export type WordCategory = 
  | 'animals'
  | 'technology'
  | 'sports'
  | 'food'
  | 'movies'
  | 'programming'
  | 'countries'
  | 'random';

export const CATEGORIES: Category[] = [
  {
    id: 'animals',
    name: 'Animals',
    description: 'Guess animal names from around the world',
    icon: '🐘'
  },
  {
    id: 'technology',
    name: 'Technology',
    description: 'Modern tech terms and gadgets',
    icon: '💻'
  },
  {
    id: 'sports',
    name: 'Sports',
    description: 'Sports terminology and famous athletes',
    icon: '⚽'
  },
  {
    id: 'food',
    name: 'Food',
    description: 'Delicious foods from around the world',
    icon: '🍕'
  },
  {
    id: 'movies',
    name: 'Movies',
    description: 'Famous movie titles and characters',
    icon: '🎬'
  },
  {
    id: 'programming',
    name: 'Programming',
    description: 'Coding terms and languages',
    icon: '👨‍💻'
  },
  {
    id: 'countries',
    name: 'Countries',
    description: 'Countries from around the world',
    icon: '🌎'
  },
  {
    id: 'random',
    name: 'Random',
    description: 'Words from all categories',
    icon: '🎲'
  }
];

// Predefined word lists for each category
export const CATEGORY_WORDS: Record<Exclude<WordCategory, 'random'>, string[]> = {
  animals: [
    'ELEPHANT', 'GIRAFFE', 'PENGUIN', 'DOLPHIN', 'KANGAROO',
    'LEOPARD', 'OCTOPUS', 'RHINOCEROS', 'SQUIRREL', 'TIGER',
    'ZEBRA', 'ALLIGATOR', 'BUTTERFLY', 'CROCODILE', 'FLAMINGO',
    'HUMMINGBIRD', 'JELLYFISH', 'NIGHTINGALE', 'PORCUPINE',
    'SALAMANDER', 'WOODPECKER', 'ARMADILLO', 'CHAMELEON',
    'HEDGEHOG', 'KOOKABURRA', 'MANTIS', 'OSTRICH', 'PELICAN',
    'RACCOON', 'SCORPION', 'TARANTULA', 'WOLVERINE', 'YAK'
  ],
  technology: [
    'SMARTPHONE', 'COMPUTER', 'INTERNET', 'BLUETOOTH', 'VIRTUAL',
    'WIRELESS', 'DIGITAL', 'ROBOT', 'ARTIFICIAL', 'NETWORK',
    'PROCESSOR', 'DATABASE', 'ALGORITHM', 'ENCRYPTION', 'INTERFACE',
    'PROGRAMMING', 'SOFTWARE', 'HARDWARE', 'WEBSITE', 'BROWSER',
    'FIREWALL', 'KEYBOARD', 'MONITOR', 'PRINTER', 'SCANNER',
    'WEBCAM', 'MICROPHONE', 'SPEAKER', 'HEADPHONES', 'MOUSE',
    'ROUTER', 'MODEM', 'ETHERNET', 'FIBER', 'CLOUD', 'SERVER',
    'DOMAIN', 'IP ADDRESS', 'FIRMWARE', 'BIOS', 'OPERATING SYSTEM',
    'APPLICATION', 'INTERFACE', 'PERIPHERAL', 'RESOLUTION',
    'TOUCHSCREEN', 'TRACKPAD', 'TRACKBALL', 'JOYSTICK', 'GAMEPAD',
    'CONSOLE', 'CONTROLLER', 'SATELLITE', 'TELESCOPE', 'MICROSCOPE',
    'PROJECTOR', 'CAMERA', 'CAMCORDER', 'DRONE', 'ROBOTICS',
    'AUTOMATION', 'INNOVATION', 'TECHNOLOGY', 'ELECTRONICS',
    'ENGINEERING', 'INFORMATION', 'COMMUNICATION', 'TELECOMMUNICATION',
    'TELEVISION', 'RADIO', 'BROADCAST', 'SATELLITE', 'TRANSMISSION',
  ],
  sports: [
    'BASKETBALL', 'FOOTBALL', 'BASEBALL', 'VOLLEYBALL', 'TENNIS',
    'SWIMMING', 'MARATHON', 'CYCLING', 'GYMNASTICS', 'HOCKEY',
    'CRICKET', 'BADMINTON', 'WRESTLING', 'BOXING', 'ARCHERY',
    'SKIING', 'SNOWBOARDING', 'SURFING', 'SKATEBOARDING', 'DIVING',
    'RUGBY', 'SOCCER', 'GOLF', 'TRACK AND FIELD', 'WEIGHTLIFTING',
    'JUDO', 'KARATE', 'MARTIALARTS', 'FENCING', 'ROWING',
    'SAILING', 'CANOEING', 'KAYAKING', 'RAFTING', 'WATERPOLO',
    'POLO', 'EQUESTRIAN', 'HORSEBACK RIDING', 'POLO', 'MOTORSPORTS',
    'FORMULA1', 'NASCAR', 'INDYCAR', 'RALLY', 'DRAGRACING',
    'MOTOCROSS', 'BMX', 'SKATEBOARDING', 'SURFING', 'SNOWBOARDING',
    'SKIING', 'CURLING', 'BOBSLEDDING', 'LUGE', 'SKELETON',
    'ICE HOCKEY', 'FIGURE SKATING', 'SPEEDSKATING', 'SHORT TRACK',
  ],
  food: [
    'HAMBURGER', 'SPAGHETTI', 'CHOCOLATE', 'PANCAKES', 'SANDWICH',
    'AVOCADO', 'BROCCOLI', 'STRAWBERRY', 'PINEAPPLE', 'LASAGNA',
    'CROISSANT', 'BURRITO', 'CHEESECAKE', 'MUSHROOM', 'POPCORN',
    'SUSHI', 'PIZZA', 'TACOS', 'DONUTS', 'WAFFLES',
    'CUPCAKE', 'ICECREAM', 'MACARON', 'CINNAMON ROLL', 'COTTON CANDY',
    'GINGERBREAD', 'MARSHMALLOW', 'PEANUT BUTTER', 'JELLYBEAN', 'GUMMYBEAR',
    'CHOCOLATE CHIP', 'BUTTERSCOTCH', 'CARAMEL', 'TOFFEE', 'FUDGE',
    'BROWNIE', 'BLONDIE', 'COOKIE', 'BISCUIT', 'CRACKER',
    'CHIPS', 'PRETZEL', 'NACHOS', 'DORITOS', 'CHEETOS',
    'FRENCH FRIES', 'ONION RINGS', 'MOZZARELLA STICKS', 'CHICKEN NUGGETS', 'FISH STICKS',
    'HOTDOG', 'CORNDOG', 'BURGER', 'SANDWICH', 'WRAP',
    'TACO', 'BURRITO', 'PIZZA', 'CALZONE', 'PASTA',
    'RICE', 'NOODLES', 'SALAD', 'SOUP', 'STEAK',
    'CHICKEN', 'PORK', 'BEEF', 'FISH', 'SHRIMP',
    'LOBSTER', 'CRAB', 'OYSTER', 'CLAM', 'MUSSEL',
    'SCALLOP', 'SQUID', 'CUTTLEFISH', 'OCTOPUS', 'SNAIL',
    'FROG', 'TURTLE', 'ALLIGATOR', 'KANGAROO', 'BUFFALO',
    'ELK', 'DEER', 'MOOSE', 'REINDEER', 'CARIBOU',
  ],
  movies: [
    'TITANIC', 'AVATAR', 'INCEPTION', 'GLADIATOR', 'INTERSTELLAR',
    'MATRIX', 'FROZEN', 'JOKER', 'AVENGERS', 'GODFATHER',
    'JURASSIC', 'TERMINATOR', 'SHREK', 'BATMAN', 'SPIDERMAN',
    'STARWARS', 'CASABLANCA', 'FORREST GUMP', 'PULP FICTION',
    'SCHINDLERS LIST', 'GOODFELLAS', 'CITIZEN KANE', 'PSYCHO',
    'SILENCE OF THE LAMBS', 'SEVEN', 'FIGHT CLUB', 'MATRIX', 'INCEPTION',

  ],
  programming: [
    'JAVASCRIPT', 'PYTHON', 'TYPESCRIPT', 'FUNCTION', 'VARIABLE',
    'ALGORITHM', 'DATABASE', 'FRAMEWORK', 'COMPONENT', 'INTERFACE',
    'PROMISE', 'ASYNC', 'AWAIT', 'RENDER', 'VIRTUAL', 'COMPILER',
    'TRANSPILER', 'BABEL', 'WEBPACK', 'PARCEL', 'ROLLUP',
    'NODEJS', 'EXPRESS', 'KOA', 'HAPI', 'REST', 'GRAPHQL',
    'APOLLO', 'PRISMA', 'MONGODB', 'POSTGRESQL', 'MYSQL',
    'SQLITE', 'REDIS', 'MEMCACHED', 'ELASTICSEARCH', 'KIBANA',
    'LOGSTASH', 'NGINX', 'APACHE', 'DOCKER', 'KUBERNETES',
    'JENKINS', 'TRAVIS', 'CIRCLECI', 'GITHUB', 'GITLAB',
    'BITBUCKET', 'HEROKU', 'NETLIFY', 'VERCEL', 'VAPOR',
    'SWIFT', 'OBJECTIVEC', 'REACT', 'VUE', 'ANGULAR',
  ],
  countries: [
    'AUSTRALIA', 'BRAZIL', 'CANADA', 'DENMARK', 'EGYPT',
    'FRANCE', 'GERMANY', 'HUNGARY', 'ICELAND', 'JAPAN',
    'KENYA', 'MEXICO', 'NORWAY', 'PORTUGAL', 'SWITZERLAND',
    'THAILAND', 'UKRAINE', 'VIETNAM', 'ARGENTINA', 'BOLIVIA',
    'CHILE', 'COLOMBIA', 'CUBA', 'ECUADOR', 'GUATEMALA',
    'HAITI', 'HONDURAS', 'JAMAICA', 'NICARAGUA',
    'PANAMA', 'PARAGUAY', 'PERU', 'URUGUAY', 'VENEZUELA',
    'ALBANIA', 'BELGIUM', 'CROATIA', 'DENMARK', 'ESTONIA',
  ]
};