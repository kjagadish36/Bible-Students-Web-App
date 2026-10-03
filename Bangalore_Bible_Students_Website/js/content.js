/* =====================================================================
   CONTENT FILE — THE ONLY FILE MOST EDITORS NEED TO CHANGE
   ---------------------------------------------------------------------
   Everything that changes week to week lives here:
     settings       → service times, address, map link, email, phone
     taglines       → rotating lines under the church name (home page)
     sermons        → YouTube / audio / slides list (newest first)
     announcements  → news & events
     books          → Studies in the Scriptures (PDFs go in the /pdfs folder)

   EASIEST WAY TO EDIT: open  admin/index.html , make changes, then press
   "Download content.js" and replace this file with the downloaded one.

   EDITING BY HAND:
   • Text that appears in 4 languages is written like
        { "en": "English", "kn": "ಕನ್ನಡ", "ta": "தமிழ்", "hi": "हिन्दी" }
     If a language is left empty, the English text is shown instead.
   • Dates use the format "YYYY-MM-DD" (e.g. "2026-10-04").
   • youtube: paste the full YouTube link, e.g. "https://youtu.be/abc123XYZ".
   • Keep the commas between items. If the site goes blank after an edit,
     a missing comma or quote is the usual cause – open admin/index.html,
     the Health Check will point it out.
   • settings.demoSermons = true fills the list with 100 sample sermons so
     you can see the page numbers. SET IT TO false WHEN REAL SERMONS ARE ADDED.
   ===================================================================== */

window.CONTENT = {
  "settings": {
    "churchName": "The Bangalore Bible Students",
    "startTime": "9:00 AM",
    "endTime": "12:00 PM",
    "serviceText": {
      "en": "Sunday · 9:00 AM – 12:00 PM",
      "kn": "ಭಾನುವಾರ · ಬೆಳಿಗ್ಗೆ 9:00 – ಮಧ್ಯಾಹ್ನ 12:00",
      "ta": "ஞாயிறு · காலை 9:00 – மதியம் 12:00",
      "hi": "रविवार · सुबह 9:00 – दोपहर 12:00"
    },
    "address": {
      "en": "Bengaluru, Karnataka",
      "kn": "ಬೆಂಗಳೂರು, ಕರ್ನಾಟಕ",
      "ta": "பெங்களூரு, கர்நாடகா",
      "hi": "बेंगलुरु, कर्नाटक"
    },
    "mapLink": "https://maps.app.goo.gl/ftEemd6AVg5hzXLV8?g_st=iw",
    "mapEmbed": "https://maps.google.com/maps?q=Bengaluru&z=12&output=embed",
    "email": "[your email]",
    "phone": "[your phone]",
    "maxSermons": 100,
    "sermonsPerPage": 9,
    "demoSermons": false,
    "youtubePlaylist": "https://www.youtube.com/playlist?list=PLQdNi13yrPSuQZfYEMJtjDSalVmPQ4pys"
  },
  "taglines": [
    {
      "en": "Opening the Scriptures, revealing the Plan of God",
      "kn": "ಶಾಸ್ತ್ರಗಳನ್ನು ತೆರೆದು, ದೇವರ ಯೋಜನೆಯನ್ನು ಪ್ರಕಟಿಸುತ್ತಾ",
      "ta": "வேதத்தைத் திறந்து, தேவனின் திட்டத்தை வெளிப்படுத்துகிறோம்",
      "hi": "शास्त्रों को खोलते हुए, परमेश्वर की योजना को प्रकट करते हुए"
    },
    {
      "en": "Searching the Word, finding the Light",
      "kn": "ವಚನವನ್ನು ಶೋಧಿಸಿ, ಬೆಳಕನ್ನು ಕಂಡುಕೊಳ್ಳುತ್ತಾ",
      "ta": "வசனத்தை ஆராய்ந்து, ஒளியைக் கண்டடைகிறோம்",
      "hi": "वचन को खोजते हुए, ज्योति को पाते हुए"
    },
    {
      "en": "A people of the Book, a hope for all mankind",
      "kn": "ಗ್ರಂಥದ ಜನರು, ಎಲ್ಲಾ ಮಾನವಕುಲಕ್ಕೆ ನಿರೀಕ್ಷೆ",
      "ta": "வேதத்தின் மக்கள், மனுக்குலம் அனைத்திற்கும் நம்பிக்கை",
      "hi": "पवित्रशास्त्र के लोग, समस्त मानवजाति के लिए आशा"
    },
    {
      "en": "Where every question leads to the Word",
      "kn": "ಪ್ರತಿಯೊಂದು ಪ್ರಶ್ನೆಯೂ ವಚನದ ಕಡೆಗೆ ನಡೆಸುವ ಸ್ಥಳ",
      "ta": "ஒவ்வொரு கேள்வியும் வசனத்திற்கு வழிநடத்தும் இடம்",
      "hi": "जहाँ हर प्रश्न वचन तक ले जाता है"
    }
  ],
  "sermons": [
    {
      "title": {
        "en": "Red Sea",
        "kn": "",
        "ta": "செங்கடல்",
        "hi": ""
      },
      "scripture": "Hebrews 11:29",
      "speaker": {
        "en": "Bro Chintan",
        "kn": "",
        "ta": "",
        "hi": ""
      },
      "type": "Video",
      "date": "2026-09-27",
      "youtube": "https://www.youtube.com/watch?v=FvwTVuW_2Mo",
      "slides": ""
    },
    {
      "title": {
        "en": "Solomon's Last Discourse",
        "kn": "ಸೊಲೊಮೋನನ ಅಂತಿಮ ಉಪದೇಶ",
        "ta": "",
        "hi": ""
      },
      "scripture": "Ecclesiastes 1:2-3",
      "speaker": {
        "en": "Bro Raghu",
        "kn": "",
        "ta": "",
        "hi": ""
      },
      "type": "Video",
      "date": "2026-09-13",
      "youtube": "https://www.youtube.com/watch?v=mQOq1Sqz4Q0",
      "slides": ""
    },
    {
      "title": {
        "en": "Consider the Lilies",
        "kn": "",
        "ta": "காட்டு புஷ்பங்களை கவனித்துப் பாருங்கள்",
        "hi": ""
      },
      "scripture": "Matthew 6:28",
      "speaker": {
        "en": "Bro Stalin",
        "kn": "",
        "ta": "",
        "hi": ""
      },
      "type": "Video",
      "date": "2026-09-06",
      "youtube": "https://www.youtube.com/watch?v=P4gm3P2i8DA",
      "slides": ""
    },
    {
      "title": {
        "en": "The House of Rechab",
        "kn": "",
        "ta": "ரேகாப்பின் வீட்டார்",
        "hi": ""
      },
      "scripture": "Jeremiah 35:1,2",
      "speaker": {
        "en": "Bro Muthukumar",
        "kn": "",
        "ta": "",
        "hi": ""
      },
      "type": "Video",
      "date": "2026-08-30",
      "youtube": "https://www.youtube.com/watch?v=jNQv32bvVpI",
      "slides": ""
    },
    {
      "title": {
        "en": "Neither Hot Nor Cold",
        "kn": "",
        "ta": "அனலும் இல்லை, குளிரும் இல்லை",
        "hi": ""
      },
      "scripture": "Revelation 3:15,16",
      "speaker": {
        "en": "Bro Roy",
        "kn": "",
        "ta": "",
        "hi": ""
      },
      "type": "Video",
      "date": "2026-08-23",
      "youtube": "https://www.youtube.com/watch?v=YIKKlTxUte8",
      "slides": ""
    },
    {
      "title": {
        "en": "Importance of Holy Spirit",
        "kn": "",
        "ta": "பரிசுத்த ஆவியின் முக்கியத்துவம்",
        "hi": ""
      },
      "scripture": "2 Timothy 1:7",
      "speaker": {
        "en": "Bro Moses",
        "kn": "",
        "ta": "",
        "hi": ""
      },
      "type": "Video",
      "date": "2026-08-16",
      "youtube": "https://www.youtube.com/watch?v=8xEXrLhk5UQ",
      "slides": ""
    },
    {
      "title": {
        "en": "Joel's Prophecy of the Locusts — A Spiritual Application",
        "kn": "",
        "ta": "",
        "hi": ""
      },
      "scripture": "Ephesians 4:16",
      "speaker": {
        "en": "Br Rajan",
        "kn": "",
        "ta": "",
        "hi": ""
      },
      "type": "Video",
      "date": "2026-08-09",
      "youtube": "https://www.youtube.com/watch?v=9fdcSprP2_w",
      "slides": ""
    },
    {
      "title": {
        "en": "The Church's Part in the Sin-Offering",
        "kn": "",
        "ta": "",
        "hi": ""
      },
      "scripture": "1 Peter 2:21 · R5195",
      "speaker": {
        "en": "Br Ranjith",
        "kn": "",
        "ta": "",
        "hi": ""
      },
      "type": "Video",
      "date": "2026-08-02",
      "youtube": "https://www.youtube.com/watch?v=OoEvVSnBjbc",
      "slides": ""
    },
    {
      "title": {
        "en": "Justice, The Foundation of True Character",
        "kn": "",
        "ta": "",
        "hi": ""
      },
      "scripture": "Matthew 7:12",
      "speaker": {
        "en": "Bro Socrates",
        "kn": "",
        "ta": "",
        "hi": ""
      },
      "type": "Video",
      "date": "2026-07-26",
      "youtube": "https://www.youtube.com/watch?v=EmahL9VQ8so",
      "slides": ""
    },
    {
      "title": {
        "en": "Women Architects of Redemption",
        "kn": "",
        "ta": "",
        "hi": ""
      },
      "scripture": "Proverbs 31:10",
      "speaker": {
        "en": "Bro Raghu",
        "kn": "",
        "ta": "",
        "hi": ""
      },
      "type": "Video",
      "date": "2026-07-19",
      "youtube": "https://www.youtube.com/watch?v=ehP9Cy1eCwU",
      "slides": ""
    },
    {
      "title": {
        "en": "Self-Restraint in Liberty",
        "kn": "",
        "ta": "சுயாதினத்தில் சுய கட்டுப்பாடு",
        "hi": ""
      },
      "scripture": "Romans 15:2 · R4478",
      "speaker": {
        "en": "Bro Stephen",
        "kn": "",
        "ta": "",
        "hi": ""
      },
      "type": "Video",
      "date": "2026-07-12",
      "youtube": "https://www.youtube.com/watch?v=YUTRZcfXZNE",
      "slides": ""
    },
    {
      "title": {
        "en": "Brain Rewiring",
        "kn": "",
        "ta": "",
        "hi": ""
      },
      "scripture": "Romans 12:2",
      "speaker": {
        "en": "Bro Deepan",
        "kn": "",
        "ta": "",
        "hi": ""
      },
      "type": "Video",
      "date": "2026-07-05",
      "youtube": "https://www.youtube.com/watch?v=rakd5fyz8uU",
      "slides": ""
    }
  ],
  "announcements": [
    {
      "date": "2026-10-04",
      "title": {
        "en": "Special Study: Tabernacle Shadows",
        "kn": "ವಿಶೇಷ ಅಧ್ಯಯನ: ಗುಡಾರದ ಛಾಯೆಗಳು",
        "ta": "சிறப்பு ஆய்வு: ஆசரிப்புக்கூடார நிழல்கள்",
        "hi": "विशेष अध्ययन: तम्बू की छायाएँ"
      },
      "text": {
        "en": "A new weekly study series on the Tabernacle in the wilderness — its priesthood, sacrifices and furnishings — and what each reveals about God's plan for the Church and the world.",
        "kn": "ಅರಣ್ಯದಲ್ಲಿನ ಗುಡಾರದ ಕುರಿತು ಹೊಸ ವಾರದ ಅಧ್ಯಯನ ಸರಣಿ — ಅದರ ಯಾಜಕತ್ವ, ಯಜ್ಞಗಳು ಮತ್ತು ಉಪಕರಣಗಳು — ಮತ್ತು ಸಭೆ ಹಾಗೂ ಜಗತ್ತಿಗಾಗಿ ದೇವರ ಯೋಜನೆಯ ಕುರಿತು ಅವು ಏನನ್ನು ಪ್ರಕಟಿಸುತ್ತವೆ.",
        "ta": "வனாந்தரத்தில் இருந்த ஆசரிப்புக்கூடாரம் பற்றிய புதிய வாராந்திர ஆய்வுத் தொடர் — அதன் ஆசாரியத்துவம், பலிகள், பொருட்கள் — சபைக்கும் உலகிற்குமான தேவனின் திட்டத்தைப் பற்றி ஒவ்வொன்றும் வெளிப்படுத்துவது.",
        "hi": "जंगल में मिलापवाले तम्बू पर एक नई साप्ताहिक अध्ययन श्रृंखला — उसका याजकपद, बलिदान और सामग्री — और प्रत्येक कलीसिया और संसार के लिए परमेश्वर की योजना के बारे में क्या प्रकट करता है।"
      }
    },
    {
      "date": "2026-10-18",
      "title": {
        "en": "Visiting Speaker Sunday",
        "kn": "ಅತಿಥಿ ಭಾಷಣಕಾರರ ಭಾನುವಾರ",
        "ta": "விருந்தினர் பேச்சாளர் ஞாயிறு",
        "hi": "अतिथि वक्ता रविवार"
      },
      "text": {
        "en": "A guest brother will deliver the Sunday discourse. All are welcome.",
        "kn": "ಅತಿಥಿ ಸಹೋದರರೊಬ್ಬರು ಭಾನುವಾರದ ಪ್ರವಚನ ನೀಡುವರು. ಎಲ್ಲರಿಗೂ ಸ್ವಾಗತ.",
        "ta": "ஒரு விருந்தினர் சகோதரர் ஞாயிறு பிரசங்கம் செய்வார். அனைவருக்கும் வரவேற்பு.",
        "hi": "एक अतिथि भाई रविवार का प्रवचन देंगे। सभी का स्वागत है।"
      }
    },
    {
      "date": "2026-11-14",
      "title": {
        "en": "Convention Weekend",
        "kn": "ಸಮಾವೇಶ ವಾರಾಂತ್ಯ",
        "ta": "மாநாட்டு வார இறுதி",
        "hi": "सम्मेलन सप्ताहांत"
      },
      "text": {
        "en": "Brethren from across India gather for two days of discourses, testimonies and fellowship.",
        "kn": "ಭಾರತದಾದ್ಯಂತದ ಸಹೋದರರು ಎರಡು ದಿನಗಳ ಪ್ರವಚನ, ಸಾಕ್ಷ್ಯ ಮತ್ತು ಸಹಭಾಗಿತ್ವಕ್ಕಾಗಿ ಸೇರುತ್ತಾರೆ.",
        "ta": "இந்தியா முழுவதிலுமுள்ள சகோதரர்கள் இரண்டு நாள் பிரசங்கங்கள், சாட்சிகள், ஐக்கியத்திற்காகக் கூடுகிறார்கள்.",
        "hi": "पूरे भारत से भाई-बहन दो दिनों के प्रवचन, गवाही और संगति के लिए एकत्र होते हैं।"
      }
    },
    {
      "date": "2026-12-20",
      "title": {
        "en": "Year-End Fellowship",
        "kn": "ವರ್ಷಾಂತ್ಯದ ಸಹಭಾಗಿತ್ವ",
        "ta": "ஆண்டு இறுதி ஐக்கியம்",
        "hi": "वर्षांत संगति"
      },
      "text": {
        "en": "An evening of hymns, testimonies and thanksgiving together.",
        "kn": "ಕೀರ್ತನೆಗಳು, ಸಾಕ್ಷ್ಯಗಳು ಮತ್ತು ಕೃತಜ್ಞತೆಯ ಒಂದು ಸಂಜೆ.",
        "ta": "பாடல்கள், சாட்சிகள், நன்றி செலுத்துதலின் ஒரு மாலை.",
        "hi": "भजन, गवाही और धन्यवाद की एक संध्या।"
      }
    },
    {
      "date": "2027-01-10",
      "title": {
        "en": "New Study Year Begins",
        "kn": "ಹೊಸ ಅಧ್ಯಯನ ವರ್ಷ ಆರಂಭ",
        "ta": "புதிய ஆய்வு ஆண்டு தொடக்கம்",
        "hi": "नया अध्ययन वर्ष आरंभ"
      },
      "text": {
        "en": "We begin 2027 with a fresh reading of Volume I, The Divine Plan of the Ages. Ideal for newcomers.",
        "kn": "ಸಂಪುಟ I, ಯುಗಗಳ ದೈವಿಕ ಯೋಜನೆಯ ಹೊಸ ಓದಿನೊಂದಿಗೆ 2027 ಅನ್ನು ಆರಂಭಿಸುತ್ತೇವೆ. ಹೊಸಬರಿಗೆ ಸೂಕ್ತ.",
        "ta": "தொகுதி I, யுகங்களின் தெய்வீகத் திட்டத்தின் புதிய வாசிப்புடன் 2027ஐத் தொடங்குகிறோம். புதியவர்களுக்கு ஏற்றது.",
        "hi": "हम 2027 का आरंभ खंड I, युगों की ईश्वरीय योजना के नए पाठ से करते हैं। नए लोगों के लिए आदर्श।"
      }
    }
  ],
  "books": [
    {
      "coverTop": "VOLUME I",
      "coverLine1": "THE DIVINE PLAN",
      "coverLine2": "OF THE AGES",
      "pdf": "01.voulme-01.pdf",
      "title": {
        "en": "The Divine Plan of the Ages",
        "kn": "ಯುಗಗಳ ದೈವಿಕ ಯೋಜನೆ",
        "ta": "யுகங்களின் தெய்வீகத் திட்டம்",
        "hi": "युगों की ईश्वरीय योजना"
      },
      "description": {
        "en": "God's purpose through the ages, from creation to restitution.",
        "kn": "ಸೃಷ್ಟಿಯಿಂದ ಪುನಃಸ್ಥಾಪನೆಯವರೆಗೆ ಯುಗಗಳಲ್ಲಿ ದೇವರ ಉದ್ದೇಶ.",
        "ta": "சிருஷ்டி முதல் சீர்பொருந்துதல் வரை யுகங்களில் தேவனின் நோக்கம்.",
        "hi": "सृष्टि से पुनर्स्थापना तक युगों में परमेश्वर का उद्देश्य।"
      }
    },
    {
      "coverTop": "VOLUME II",
      "coverLine1": "THE TIME",
      "coverLine2": "IS AT HAND",
      "pdf": "02.voulme-02.pdf",
      "title": {
        "en": "The Time Is At Hand",
        "kn": "ಸಮಯವು ಸಮೀಪವಾಗಿದೆ",
        "ta": "காலம் சமீபமாயிருக்கிறது",
        "hi": "समय निकट है"
      },
      "description": {
        "en": "Bible chronology and the time of Christ's second advent.",
        "kn": "ಬೈಬಲ್ ಕಾಲಗಣನೆ ಮತ್ತು ಕ್ರಿಸ್ತನ ಎರಡನೇ ಆಗಮನದ ಸಮಯ.",
        "ta": "வேதாகமக் காலக்கணக்கும் கிறிஸ்துவின் இரண்டாம் வருகையின் காலமும்.",
        "hi": "बाइबल कालक्रम और मसीह के दूसरे आगमन का समय।"
      }
    },
    {
      "coverTop": "VOLUME III",
      "coverLine1": "THY KINGDOM",
      "coverLine2": "COME",
      "pdf": "03.voulme-03.pdf",
      "title": {
        "en": "Thy Kingdom Come",
        "kn": "ನಿನ್ನ ರಾಜ್ಯವು ಬರಲಿ",
        "ta": "உம்முடைய ராஜ்யம் வருவதாக",
        "hi": "तेरा राज्य आए"
      },
      "description": {
        "en": "Prophecies of the Kingdom and the harvest of the age.",
        "kn": "ರಾಜ್ಯದ ಪ್ರವಾದನೆಗಳು ಮತ್ತು ಯುಗದ ಸುಗ್ಗಿ.",
        "ta": "ராஜ்யத்தின் தீர்க்கதரிசனங்களும் யுகத்தின் அறுவடையும்.",
        "hi": "राज्य की भविष्यवाणियाँ और युग की कटनी।"
      }
    },
    {
      "coverTop": "VOLUME IV",
      "coverLine1": "THE BATTLE OF",
      "coverLine2": "ARMAGEDDON",
      "pdf": "04.voulme-04.pdf",
      "title": {
        "en": "The Battle of Armageddon",
        "kn": "ಹರ್ಮಗೆದೋನ್ ಯುದ್ಧ",
        "ta": "அர்மகெதோன் யுத்தம்",
        "hi": "हर-मगिदोन का युद्ध"
      },
      "description": {
        "en": "The great time of trouble and the Kingdom that follows.",
        "kn": "ಮಹಾ ಸಂಕಟದ ಕಾಲ ಮತ್ತು ಅನಂತರದ ರಾಜ್ಯ.",
        "ta": "மகா உபத்திரவ காலமும் அதைத் தொடரும் ராஜ்யமும்.",
        "hi": "महान संकट का समय और उसके बाद आने वाला राज्य।"
      }
    },
    {
      "coverTop": "VOLUME V",
      "coverLine1": "AT-ONE-MENT",
      "coverLine2": "GOD AND MAN",
      "pdf": "05.voulme-05.pdf",
      "title": {
        "en": "At-One-Ment Between God and Man",
        "kn": "ದೇವರು ಮತ್ತು ಮನುಷ್ಯನ ನಡುವಿನ ಐಕ್ಯತೆ",
        "ta": "தேவனுக்கும் மனிதனுக்கும் இடையேயான ஒப்புரவு",
        "hi": "परमेश्वर और मनुष्य के बीच मेल-मिलाप"
      },
      "description": {
        "en": "The ransom, the Holy Spirit and reconciliation.",
        "kn": "ವಿಮೋಚನೆ, ಪವಿತ್ರಾತ್ಮ ಮತ್ತು ಸಮಾಧಾನ.",
        "ta": "மீட்கும்பொருள், பரிசுத்த ஆவி மற்றும் ஒப்புரவு.",
        "hi": "छुड़ौती, पवित्र आत्मा और मेल-मिलाप।"
      }
    },
    {
      "coverTop": "VOLUME VI",
      "coverLine1": "THE NEW",
      "coverLine2": "CREATION",
      "pdf": "06.voulme-06.pdf",
      "title": {
        "en": "The New Creation",
        "kn": "ಹೊಸ ಸೃಷ್ಟಿ",
        "ta": "புதிய சிருஷ்டி",
        "hi": "नई सृष्टि"
      },
      "description": {
        "en": "The calling, life and duties of the Church.",
        "kn": "ಸಭೆಯ ಕರೆ, ಜೀವನ ಮತ್ತು ಕರ್ತವ್ಯಗಳು.",
        "ta": "சபையின் அழைப்பு, வாழ்க்கை மற்றும் கடமைகள்.",
        "hi": "कलीसिया की बुलाहट, जीवन और कर्तव्य।"
      }
    },
    {
      "coverTop": "COMPANION",
      "coverLine1": "TABERNACLE",
      "coverLine2": "SHADOWS",
      "pdf": "07.Tabernacle.pdf",
      "title": {
        "en": "Tabernacle Shadows of the “Better Sacrifices”",
        "kn": "“ಉತ್ತಮ ಯಜ್ಞಗಳ” ಗುಡಾರದ ಛಾಯೆಗಳು",
        "ta": "“மேன்மையான பலிகளின்” ஆசரிப்புக்கூடார நிழல்கள்",
        "hi": "“उत्तम बलिदानों” की मिलापवाले तम्बू की छायाएँ"
      },
      "description": {
        "en": "The Tabernacle's types and their deeper meaning.",
        "kn": "ಗುಡಾರದ ಮುನ್ಸೂಚನೆಗಳು ಮತ್ತು ಅವುಗಳ ಆಳವಾದ ಅರ್ಥ.",
        "ta": "ஆசரிப்புக்கூடாரத்தின் நிழலாட்டங்களும் அவற்றின் ஆழ்ந்த பொருளும்.",
        "hi": "तम्बू के प्रतीक और उनका गहरा अर्थ।"
      }
    }
  ]
};
