export interface LoveButtonData {
  id: string;
  label: string;
  title: string;
  message: string;
  accent: string;
  isFullScreen?: boolean;
}

export interface CapsuleData {
  id: string;
  num: string;
  subtitle: string;
  message: string;
  iconName: string;
}

export interface BirthdayConfig {
  birthdayName: string;
  creatorName: string;
  relationship: string;
  tagline: string;
  heroHeading: string;
  heroSubheading: string;
  heroMessage: string;
  grandTitle: string;
  cakeSubtitle: string;
  cakeWishCompleted: string;
  surpriseMessage1: string;
  surpriseMessage2: string;
  finaleHeading: string;
  finaleSubtext: string;
  finaleSignatureTag: string;

  // Part 2 & 5: A Little Piece of My Heart
  pieceOfMyHeart: {
    heading: string;
    subheading: string;
    heartReveal1: string;
    heartReveal2: string;
    secretNote: {
      intro: string;
      line1: string;
      line2: string;
      line3: string;
      line4: string;
      signature: string;
    };
  };

  // Part 4: Personal Love Message ("THERE'S SOMETHING I WANT TO TELL YOU...")
  somethingToTellYou: {
    heading: string;
    paragraphs: string[];
    closing: string;
    signOff: string;
  };

  // Part 4: Natural & Emotional Story Messages
  loveStoryMessages: string[];
  loveStoryBottomText: string;

  // Love Buttons
  loveButtons: LoveButtonData[];

  // Capsules
  capsules: CapsuleData[];

  // Romantic Quotes
  romanticQuotes: string[];

  // Love Letter 2.0
  loveLetter: {
    salutation: string;
    paragraphs: string[];
    closing: string;
    signOff: string;
  };

  // Hidden Heart Secret
  hiddenHeartSecret: {
    message1: string;
    message2: string;
    signature: string;
  };

  // Upgraded Final Letter
  finalLetter: {
    salutation: string;
    paragraphs: string[];
    closingLine: string;
    signOff: string;
    highlightBanner: string;
  };

  themeColors: {
    burgundy: string;
    plum: string;
    rose: string;
    blush: string;
    gold: string;
    lavender: string;
    ivory: string;
  };
}

export const birthdayConfig: BirthdayConfig = {
  birthdayName: "Nafisa",
  creatorName: "Abdul Ahad",
  relationship: "Someone deeply special and loved",
  tagline: "A little world, made just for you...",

  // Rewritten Hero Copy (Part 4)
  heroHeading: "Happy Birthday, Nafisa!",
  heroSubheading: "I wanted to make something a little different for you today.",
  heroMessage: "I wanted to create something that could bring a genuine smile to your face and remind you how special you are to me.",

  grandTitle: "IT'S YOUR SPECIAL DAY, NAFISA!",
  cakeSubtitle: "Close your eyes, make a wish, and let your dreams fly.",
  cakeWishCompleted: "MAY ALL YOUR BEAUTIFUL DREAMS COME TRUE!",
  surpriseMessage1: "NAFISA, NEVER FORGET HOW SPECIAL YOU ARE.",
  surpriseMessage2: "The world is more beautiful with you in it.",
  finaleHeading: "NAFISA, YOU DESERVE ALL THE HAPPINESS IN THE WORLD.",
  finaleSubtext: "May your smile always shine, your dreams come true, and your life be filled with peaceful, beautiful moments.",
  finaleSignatureTag: "FOREVER SPECIAL.",

  // Part 2 & 5: A Little Piece of My Heart
  pieceOfMyHeart: {
    heading: "A LITTLE PIECE OF MY HEART",
    subheading: "A quiet space made just for you to feel loved and cherished.",
    heartReveal1: "Nafisa, I don't know how to explain it perfectly, but you have a way of making my days feel a little more beautiful.",
    heartReveal2: "And that means more to me than you know.",
    secretNote: {
      intro: "There's something I don't say often enough...",
      line1: "You are important to me, Nafisa.",
      line2: "I hope you always find reasons to smile, even on the days when things don't go exactly as planned.",
      line3: "I wish you happiness, peace, and everything beautiful that life can bring.",
      line4: "And I hope this little surprise makes you smile today.",
      signature: "— Abdul Ahad"
    }
  },

  // Part 4: Personal Love Message ("THERE'S SOMETHING I WANT TO TELL YOU...")
  somethingToTellYou: {
    heading: "THERE'S SOMETHING I WANT TO TELL YOU...",
    paragraphs: [
      "Nafisa, I made this little website because I wanted to do something different for your birthday.",
      "I know a website cannot express everything someone feels, but I still wanted to try.",
      "I hope every little animation, every message, and every surprise brings a smile to your face.",
      "You deserve beautiful moments, genuine happiness, and all the good things life has to offer.",
      "And honestly, I'm really happy that I get to make something special for you today."
    ],
    closing: "Always wishing the best for you,",
    signOff: "Abdul Ahad"
  },

  // Part 4: Natural & Emotional Story Messages ("IF I COULD TELL YOU ONE THING...")
  loveStoryMessages: [
    "I don't always know how to put my feelings into words, but I hope you can feel how much you mean to me.",
    "Sometimes, just thinking about you is enough to bring a smile to my face. I guess that's one of the little things that makes you so special to me.",
    "I hope life gives you every beautiful thing your heart has been wishing for. You genuinely deserve to be happy.",
    "I may not have the perfect words, but I really do wish to see you smiling, growing, and achieving everything you dream of.",
    "If there's one thing I want you to remember today, it's that you are much more special than you probably realize."
  ],
  loveStoryBottomText: "AND THAT SOMEONE WILL ALWAYS BE SPECIAL TO ME.",

  // Part 2: Interactive Love Buttons
  loveButtons: [
    {
      id: "special",
      label: "WHY YOU ARE SPECIAL",
      title: "Why You Are Truly Special",
      message: "Because your presence brings a kind of warmth that words can never fully explain. You are special simply because you are YOU.",
      accent: "from-[#bd244b] to-[#70102b]"
    },
    {
      id: "secret",
      label: "A LITTLE SECRET",
      title: "A Little Secret",
      message: "Sometimes, I find myself smiling at the simplest thought of you. That's how naturally you brighten my day.",
      accent: "from-[#D9B76E] to-[#9e7c33]"
    },
    {
      id: "wish",
      label: "MY FAVORITE WISH",
      title: "My Favorite Wish For You",
      message: "If happiness had a home, I would wish for you to wake up in it every single morning.",
      accent: "from-[#E88CA8] to-[#ab4a6b]"
    },
    {
      id: "promise",
      label: "ONE PROMISE",
      title: "A Sincere Promise",
      message: "I cannot promise that every single day will be effortless, but I can promise that your happiness, your dreams, and your peace will always matter deeply to me.",
      accent: "from-[#B9A5E8] to-[#6a4f9e]"
    },
    {
      id: "open-heart",
      label: "OPEN MY HEART",
      title: "From Abdul Ahad to Nafisa",
      message: "Nafisa, there are feelings that are difficult to put into sentences, but so easy to feel. You are one of those beautiful feelings.",
      accent: "from-[#f48fb1] via-[#e91e63] to-[#880e4f]",
      isFullScreen: true
    }
  ],

  // Capsules
  capsules: [
    {
      id: "cap-1",
      num: "01",
      subtitle: "A Gentle Thought",
      message: "Somewhere in this big world, someone is wishing you the most beautiful birthday and countless reasons to smile.",
      iconName: "Sparkles"
    },
    {
      id: "cap-2",
      num: "02",
      subtitle: "A Quiet Reminder",
      message: "Never forget how valuable, wonderful, and deserving of happiness you are.",
      iconName: "Heart"
    },
    {
      id: "cap-3",
      num: "03",
      subtitle: "A Special Wish",
      message: "May your life be filled with beautiful opportunities, peaceful mornings, unforgettable adventures, and genuine happiness.",
      iconName: "Stars"
    },
    {
      id: "cap-4",
      num: "04",
      subtitle: "A Simple Truth",
      message: "You do not have to be perfect to be special. You already are, just by being yourself.",
      iconName: "Smile"
    },
    {
      id: "cap-5",
      num: "05",
      subtitle: "From My Heart",
      message: "Today, I celebrate you, Nafisa, and all the happiness you so genuinely deserve.",
      iconName: "Gift"
    }
  ],

  // 15 Romantic Quotes
  romanticQuotes: [
    "If my thoughts could become stars, your name would light up the entire sky.",
    "Some moments are unforgettable simply because they remind me of you.",
    "You are not just a beautiful thought; you are the reason behind many of my happiest smiles.",
    "The world is full of wonderful things, and I hope you get to experience every single one.",
    "May your heart always find gentle reasons to smile, even on the quietest days.",
    "In a world that is always in a hurry, you bring a quiet peace that makes everything feel right.",
    "Your laughter is the sweetest melody this world has ever known.",
    "Every flower that blooms today carries a little whisper of happiness dedicated to you.",
    "You have a way of brightening even the gloomiest days just by being yourself.",
    "If I had a single flower for every time I thought of you, I could walk through an eternal rose garden.",
    "Kindness looks beautiful on you, and your gentle soul makes this world a softer place.",
    "Wherever life leads you, may your footsteps always be surrounded by warmth, joy, and peace.",
    "To know someone like you is a blessing that words can never measure.",
    "May every wish you whisper to the stars find its way back to your arms as a reality.",
    "You are the poetry that life forgot to write down, but my heart never fails to remember."
  ],

  // Love Letter 2.0 (Complete Heartfelt Letter)
  loveLetter: {
    salutation: "My Dear Nafisa,",
    paragraphs: [
      "I have been thinking about what to write to you today, and honestly, I don't think there are enough words to express everything I feel. Still, I wanted to put some of my feelings into words because your birthday is not just another day to me. It is a beautiful reminder of how lucky I am to have someone as special as you in my life.",
      "Nafisa, I don't know if I tell you this often enough, but you truly mean so much to me. There is something about you that makes you different from everyone else. Your smile, your laughter, your little ways of expressing yourself, and even the simplest things about you have a special place in my heart.",
      "Sometimes, I find myself smiling just by thinking about you. And those little moments make me realize how deeply someone can matter without even trying. You may not always understand how special you are to me, but I hope you never doubt that you hold a very beautiful place in my heart.",
      "I wish I could make every day of your life as beautiful as you deserve. I wish I could take away every worry that makes you sad, turn your difficult days into easier ones, and give you countless reasons to smile. Even though I cannot make everything perfect, I genuinely hope that life always treats you kindly.",
      "On your birthday, I want to wish you more than just happiness. I wish you a heart that always feels peaceful, a life filled with beautiful opportunities, the courage to follow your dreams, and the strength to overcome every challenge that comes your way.",
      "I hope you achieve everything you have ever wished for. I hope you wake up every morning with a reason to smile and go to sleep every night with a heart full of peace. And whenever life feels difficult, I hope you remember how precious, capable, and wonderful you truly are.",
      "There are so many things I would love to tell you, but sometimes feelings are much bigger than the words we choose. I may not always express myself perfectly, and I may not always find the right way to say what is in my heart. But one thing I know for sure is that you are genuinely important to me.",
      "If I could make one birthday wish for you, it would be that you never lose the beautiful smile that makes you so special. Keep being yourself, keep dreaming big, and never let anything take away the light inside you.",
      "Thank you for being you, Nafisa. Thank you for bringing your own kind of beauty into my world. I hope this little surprise makes you smile, because making you feel special today was something I truly wanted to do.",
      "Happy Birthday, My Dearest Nafisa.",
      "No matter how many words I write, they will never be enough to explain how special you are to me. But I hope you can feel the love and sincerity behind every single line."
    ],
    closing: "Your Love ,",
    signOff: "Abdul Ahad"
  },

  // Hidden Heart Secret
  hiddenHeartSecret: {
    message1: "YOU ARE TRULY ONE OF A KIND, NAFISA.",
    message2: "No matter how big the world is, you will always hold a very special place in my heart.",
    signature: "— Abdul Ahad"
  },

  // Part 4: Personalized Final Message
  finalLetter: {
    salutation: "Nafisa,",
    paragraphs: [
      "I hope you had a beautiful time exploring this little surprise.",
      "I made every part of it with one simple thought: I wanted to make your birthday feel a little more special.",
      "Keep smiling, keep dreaming, and never stop being the wonderful person you are.",
      "Happy Birthday once again."
    ],
    closingLine: "With all my love,",
    signOff: "Abdul Ahad.",
    highlightBanner: "THIS WORLD IS A LITTLE MORE BEAUTIFUL WITH YOU IN IT."
  },

  themeColors: {
    burgundy: "#400D24",
    plum: "#24132F",
    rose: "#E88CA8",
    blush: "#F7C5D0",
    gold: "#D9B76E",
    lavender: "#B9A5E8",
    ivory: "#FFF4EA"
  }
};
