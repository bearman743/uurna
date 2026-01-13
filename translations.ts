
import { Language, UrnSize, Side } from './types';

export const translations = {
  fi: {
    customizer: {
      back: '← Takaisin',
      title: 'Suunnittele Muistomerkki',
      subtitle: 'Muokkaa neliöuurnan kaikkia 4 sivua.',
      reset: 'Tyhjennä valinnat',
      resetConfirm: 'Haluatko varmasti poistaa kaikki tekemäsi muokkaukset?',
      woodLabel: 'Puu:',
      woodValue: 'Suomalainen Koivu',
      sizeLabel: 'Valitse Koko',
      petInfoTitle: 'Lemmikin Tiedot',
      petInfoDesc: 'Nämä tiedot tulevat uurnan etuosaan.',
      nameLabel: 'Lemmikin Nimi',
      birthLabel: 'Syntymävuosi',
      passLabel: 'Poismenovuosi',
      sidesTitle: 'Muokkaa Sivuja',
      photoTitle: 'Kuva',
      bwNotice: 'Kuva muunnetaan mustavalkoiseksi.',
      photoAdded: 'Kuva lisätty',
      change: 'Vaihda',
      remove: 'Poista',
      upload: 'Lataa kuva',
      textTitle: 'Teksti',
      textPlaceholder: 'Kirjoita viesti tälle sivulle...',
      addToCart: 'Tilaa Gmaililla',
      addedAlert: 'Tilausluonnos luotu! Gmail avautuu nyt. Ole hyvä ja liitä suunnitelmassasi käytetyt kuvat sähköpostin vastaaviin kohtiin (Slot 1-4).',
      secure: 'Tilaus käsitellään sähköpostitse • rainbowpine444@gmail.com',
      emailSubject: 'Uusi Uurnatilaus: ',
      emailBody: {
        intro: 'Hei RainBowPine,\n\nHaluaisin tilata uurnan seuraavilla tiedoilla:\n\n',
        details: 'TILAUKSET TIEDOT:',
        size: 'Koko: ',
        petName: 'Nimi: ',
        years: 'Vuodet: ',
        sides: 'SIVUJEN TIEDOT (SLOTIT 1-4):',
        photoNote: '\n--- TÄRKEÄÄ ---\nOle hyvä ja liitä suunnitelmasi mukaiset kuvat tähän sähköpostiin ennen lähettämistä. Merkitse ne numeroilla 1-4, jotta tiedämme mille sivulle kukin kuva kuuluu.'
      }
    },
    sides: {
      front: 'Etuosa',
      right: 'Oikea',
      back: 'Takaosa',
      left: 'Vasen'
    },
    preview: {
      addPhoto: 'Lisää Kuva',
      noText: '(Ei tekstiä tällä sivulla)',
      turnLeft: 'Käännä Vasemmalle',
      turnRight: 'Käännä Oikealle',
      note: 'Esikatselu. Käytä painikkeita kääntääksesi.'
    },
    ai: {
      trigger: 'Tarvitsetko apua muistotekstin kanssa?',
      title: 'AI Muistokirjoittaja',
      imRemembering: 'Muistelen...',
      dog: 'Koiraa',
      cat: 'Kissaa',
      rabbit: 'Kania',
      bird: 'Lintua',
      friend: 'Rakasta ystävää',
      traitsLabel: 'Hän oli... (Luonteenpiirteet)',
      traitsPlace: 'esim. uskollinen, leikkisä',
      generate: 'Luo teksti',
      cancel: 'Peruuta'
    },
    sizes: {
      [UrnSize.SMALL]: 'Pieni',
      [UrnSize.MEDIUM]: 'Keskikoko',
      [UrnSize.LARGE]: 'Suuri'
    }
  },
  en: {
    customizer: {
      back: '← Back',
      title: 'Design Your Memorial',
      subtitle: 'Customize all 4 sides of your square wooden urn.',
      reset: 'Reset All',
      resetConfirm: 'Are you sure you want to clear all your customizations?',
      woodLabel: 'Wood:',
      woodValue: 'Finnish Birch',
      sizeLabel: 'Select Size',
      petInfoTitle: 'Pet Information',
      petInfoDesc: 'This information appears on the Front of the urn.',
      nameLabel: 'Pet\'s Name',
      birthLabel: 'Year of Birth',
      passLabel: 'Year of Passing',
      sidesTitle: 'Customize Sides',
      photoTitle: 'Photo',
      bwNotice: 'Photo will be Black & White.',
      photoAdded: 'Photo Added',
      change: 'Click to change',
      remove: 'Remove',
      upload: 'Upload photo',
      textTitle: 'Text',
      textPlaceholder: 'Write a message for this side...',
      addToCart: 'Order via Gmail',
      addedAlert: 'Order draft created! Gmail will open now. Please attach the photos you used to their respective slots (1-4) in the email.',
      secure: 'Order processed via email • rainbowpine444@gmail.com',
      emailSubject: 'New Urn Order: ',
      emailBody: {
        intro: 'Hello RainBowPine,\n\nI would like to order a custom urn with the following details:\n\n',
        details: 'ORDER DETAILS:',
        size: 'Size: ',
        petName: 'Name: ',
        years: 'Years: ',
        sides: 'SIDE SLOTS (1-4):',
        photoNote: '\n--- IMPORTANT ---\nPlease attach the high-quality photos you used for your design to this email. Label them 1-4 so we know which photo belongs to which side.'
      }
    },
    sides: {
      front: 'Front',
      right: 'Right',
      back: 'Back',
      left: 'Left'
    },
    preview: {
      addPhoto: 'Add Photo',
      noText: '(No text on this side)',
      turnLeft: 'Turn Left',
      turnRight: 'Turn Right',
      note: 'Preview. Use buttons to view all sides.'
    },
    ai: {
      trigger: 'Need help writing a tribute?',
      title: 'AI Tribute Assistant',
      imRemembering: 'I am remembering a...',
      dog: 'Dog',
      cat: 'Cat',
      rabbit: 'Rabbit',
      bird: 'Bird',
      friend: 'Beloved Friend',
      traitsLabel: 'They were... (Traits)',
      traitsPlace: 'e.g., loyal, playful',
      generate: 'Generate',
      cancel: 'Cancel'
    },
    sizes: {
      [UrnSize.SMALL]: 'Small',
      [UrnSize.MEDIUM]: 'Medium',
      [UrnSize.LARGE]: 'Large'
    }
  },
  sv: {
    customizer: {
      back: '← Tillbaka',
      title: 'Designa Ditt Minnesmärke',
      subtitle: 'Anpassa alla 4 sidor av din fyrkantiga träurna.',
      reset: 'Återställ allt',
      resetConfirm: 'Är du säker på att du vill rensa alla dina anpassningar?',
      woodLabel: 'Träslag:',
      woodValue: 'Finsk Björk',
      sizeLabel: 'Välj Storlek',
      petInfoTitle: 'Husdjursinformation',
      petInfoDesc: 'Denna information visas på urnans framsida.',
      nameLabel: 'Husdjurets Namn',
      birthLabel: 'Födelseår',
      passLabel: 'Bortgångsår',
      sidesTitle: 'Anpassa Sidor',
      photoTitle: 'Foto',
      bwNotice: 'Fotot konverteras till svartvitt.',
      photoAdded: 'Foto tillagt',
      change: 'Klicka för att ändra',
      remove: 'Ta bort',
      upload: 'Ladda upp foto',
      textTitle: 'Text',
      textPlaceholder: 'Skriv ett meddelande för denna sida...',
      addToCart: 'Beställ med Gmail',
      addedAlert: 'Beställningsutkast skapat! Gmail öppnas nu. Bifoga bilderna du använde i motsvarande slots (1-4) i e-postmeddelandet.',
      secure: 'Beställning sker via e-post • rainbowpine444@gmail.com',
      emailSubject: 'Ny Urnbeställning: ',
      emailBody: {
        intro: 'Hej RainBowPine,\n\nJag skulle vilja beställa en urna med följande detaljer:\n\n',
        details: 'ORDERDETALJER:',
        size: 'Storlek: ',
        petName: 'Namn: ',
        years: 'År: ',
        sides: 'SIDO-SLOTS (1-4):',
        photoNote: '\n--- VIKTIGT ---\nVänligen bifoga de högupplösta bilderna du använde för din design i det här e-postmeddelandet. Märk dem 1-4 så att vi vet vilken bild som hör till vilken sida.'
      }
    },
    sides: {
      front: 'Framsida',
      right: 'Höger',
      back: 'Baksida',
      left: 'Vänster'
    },
    preview: {
      addPhoto: 'Lägg till Foto',
      noText: '(Ingen text på denna sida)',
      turnLeft: 'Vrid Vänster',
      turnRight: 'Vrid Höger',
      note: 'Förhandsgranskning. Använd knappar för att rotera.'
    },
    ai: {
      trigger: 'Behöver du hjälp med minnestexten?',
      title: 'AI Minnesassistent',
      imRemembering: 'Jag minns en...',
      dog: 'Hund',
      cat: 'Katt',
      rabbit: 'Kanin',
      bird: 'Fågel',
      friend: 'Älskad Vän',
      traitsLabel: 'De var... (Egenskaper)',
      traitsPlace: 't.ex. lojal, lekfull',
      generate: 'Skapa Text',
      cancel: 'Avbryt'
    },
    sizes: {
      [UrnSize.SMALL]: 'Liten',
      [UrnSize.MEDIUM]: 'Medium',
      [UrnSize.LARGE]: 'Stor'
    }
  }
};
