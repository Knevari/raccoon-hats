export type HatMock = {
  name: string;
  imageUrl: string;
  price: number;
  colors: string[];
  sizes: string[];
  style: string;
  details: string;
};

export const hats = [
  {
    name: 'Wool Spacecap',
    imageUrl: './images/kangool-wool-spacecap.jpeg',
    price: 75,
    colors: ['#FF0000', '#C4C4C4'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    style: 'Baseball & Sport Caps',
    details: `The Wool SpaceCap by Kangol is a fresh take on Kangol's seamless knit Baseball hat. Crafted from wool that is perfectly warm and casual for everyday wear, it is sure to be a new fall favorite. The seamless, knitted & blocked construction is purely a Kangol? innovation. The hat is unlined and finished with an embroidered Kangol kangaroo logo on the front.`,
  },
  {
    name: 'Wool 504',
    imageUrl: './images/wool-504.jpeg',
    price: 61,
    colors: [''],
    details: `Wool 504

    Flat caps have gained a lot of popularity in recent years, and for good reason. Nearly any well-dressed gentleman of any age can pull one off in style. The high-quality Kangol Wool 504 flat cap is an iconic cap that makes a statement, and is easier and less intimidating to pair with a wide range of spring, fall, and winter outfits. With a soft fabric construction and a short well-rounded front brim the Wool 504 is comfortable and low-profile. 
    
    A Modern Classic
    
    From royals to aristocrats, public figures to every day gentlemen, flat caps continue to be worn for leisure activities. The Wool 504 is the original Kangol wool cap, introduced back in 1954. It’s fashionable, breathable, and comfortable. This is an accessory for the modern man or woman looking for a versatile, traditional look.
    
    The designer brand Kangol Wool 504 flat cap is entirely made of 100% seamless wool and is imported. This flat cap can be worn any day for comfort and warmth. Order at Hats.com today. Check out our new arrivals and enjoy free shipping for orders over $75.`,
  },
] as HatMock[];
