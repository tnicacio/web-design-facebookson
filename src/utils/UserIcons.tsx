const iconList = [
  'Alligator',
  'Anteater',
  'Armadillo',
  'Auroch',
  'Axolotl',
  'Badger',
  'Bat',
  'Beaver',
  'Buffalo',
  'Camel',
  'Capybara',
  'Chameleon',
  'Cheetah',
  'Chinchilla',
  'Chipmunk',
  'Chupacabra',
  'Cormorant',
  'Coyote',
  'Crow',
  'Dingo',
  'Dinosaur',
  'Dolphin',
  'Duck',
  'Elephant',
  'Ferret',
  'Fox',
  'Frog',
  'Giraffe',
  'Gopher',
  'Grizzly',
  'Hedgehog',
  'Hippo',
  'Hyena',
  'Ibex',
  'Ifrit',
  'Iguana',
  'Jackal',
  'Kangaroo',
  'Koala',
  'Kraken',
  'Lemur',
  'Leopard',
  'Liger',
  'Llama',
  'Manatee',
  'Mink',
  'Monkey',
  'Moose',
  'Narwhal',
  'Nyan Cat',
  'Orangutan',
  'Otter',
  'Panda',
  'Penguin',
  'Platypus',
  'Pumpkin',
  'Python',
  'Quagga',
  'Rabbit',
  'Raccoon',
  'Rhino',
  'Sheep',
  'Shrew',
  'Skunk',
  'Squirrel',
  'Tiger',
  'Turtle',
  'Walrus',
  'Wolf',
  'Wolverine',
  'Wombat',
];

const colorList = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple',
  'teal',
  'black',
  '#0025d6',
];

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

interface IAvatar {
  imgUri: string;
  bgColor: string;
  dbUri: string;
}

export function getRandomAvatar(): IAvatar {
  const randomInt = getRandomInt(0, iconList.length);
  const randomColor = colorList[getRandomInt(0, colorList.length)];
  const avatar = {
    imgUri: `https://github.com/tnicacio/anonymous-animals/raw/master/icons/${iconList[randomInt]}.png`,
    bgColor: randomColor,
    dbUri: `https://github.com/tnicacio/anonymous-animals/raw/master/icons/${iconList[randomInt]}.png_${randomColor}`,
  };
  return avatar;
}
