import { 
  NicheStrategy, 
  ContentPillar, 
  SeriesPath, 
  FAQItem, 
  ServicePackage, 
  CaseStudy,
  TikTokSection
} from "./tiktok-types";

export const NICHES: NicheStrategy[] = [
  {
    id: "tech_ceo",
    name: "CEO CÃ´ng nghá»‡ / SaaS",
    audience: "Doanh nghiá»‡p vá»«a vÃ  nhá» (SMEs), GiÃ¡m Ä‘á»‘c nhÃ¢n sá»±, Founder, C-level Ä‘ang tÃ¬m kiáº¿m giáº£i phÃ¡p chuyá»ƒn Ä‘á»•i sá»‘.",
    persona: "NhÃ  thÃ´ng thÃ¡i cÃ´ng nghá»‡, sáº¯c bÃ©n, Ä‘Ã¡ng tin cáº­y, thá»±c táº¿ nhÆ°ng cá»Ÿi má»Ÿ vÃ  tiÃªn phong.",
    coreMessage: "CÃ´ng nghá»‡ khÃ´ng cáº§n phá»©c táº¡p, nÃ³ sinh ra Ä‘á»ƒ giáº£i phÃ³ng thá»i gian vÃ  nhÃ¢n Ä‘Ã´i hiá»‡u suáº¥t doanh nghiá»‡p cá»§a báº¡n.",
    differentiation: "Show trá»±c tiáº¿p mÃ n hÃ¬nh quáº£n trá»‹ (No-code / AI workflows), phÃ¢n tÃ­ch sá»‘ liá»‡u thá»±c táº¿ thay vÃ¬ nÃ³i lÃ½ thuyáº¿t suÃ´ng.",
    cta: "Nháº­n báº£n demo tá»± Ä‘á»™ng hoÃ¡ quy trÃ¬nh vÃ  tÃ i liá»‡u tá»‘i Æ°u váº­n hÃ nh miá»…n phÃ­.",
    exampleTopic: "á»¨ng dá»¥ng AI tá»± Ä‘á»™ng hÃ³a chÄƒm sÃ³c khÃ¡ch hÃ ng 24/7"
  },
  {
    id: "b2b_consulting",
    name: "ChuyÃªn gia TÆ° váº¥n B2B",
    audience: "Chá»§ doanh nghiá»‡p, TrÆ°á»Ÿng phÃ²ng Kinh doanh Ä‘ang báº¿ táº¯c trong khÃ¢u tÃ¬m kiáº¿m khÃ¡ch hÃ ng tiá»m nÄƒng vÃ  tá»‘i Æ°u chi phÃ­ Ads.",
    persona: "NhÃ  tÆ° váº¥n chiáº¿n lÆ°á»£c chuyÃªn sÃ¢u, Ä‘iá»m tÄ©nh, táº­p trung vÃ o sá»‘ liá»‡u thá»±c táº¿, minh báº¡ch vÃ  cam káº¿t káº¿t quáº£.",
    coreMessage: "Äá»«ng Ä‘á»‘t tiá»n cháº¡y quáº£ng cÃ¡o rá»i ráº¡c. Báº¡n cáº§n má»™t há»‡ thá»‘ng thu hÃºt lead tá»± Ä‘á»™ng báº±ng ná»™i dung chuyÃªn mÃ´n vá»¯ng cháº¯c.",
    differentiation: "Má»• xáº» trá»±c tiáº¿p báº£ng tÃ­nh tÃ i chÃ­nh (P&L), váº½ mÃ´ hÃ¬nh tÄƒng trÆ°á»Ÿng báº±ng báº£ng tráº¯ng (Whiteboard), trá»±c quan hÃ³a quy trÃ¬nh.",
    cta: "ÄÄƒng kÃ½ buá»•i cháº©n Ä‘oÃ¡n sá»©c khá»e Marketing 1-1 miá»…n phÃ­ cÃ¹ng PGS Agency.",
    exampleTopic: "Thiáº¿t káº¿ phá»…u ná»™i dung chuyá»ƒn Ä‘á»•i B2B Ä‘áº¡t 12% tá»· lá»‡ nháº¥p chuá»™t"
  },
  {
    id: "luxury_brand",
    name: "NhÃ£n hÃ ng Cao cáº¥p / Lifestyle",
    audience: "Tá»‡p khÃ¡ch hÃ ng cÃ³ thu nháº­p cao (High-income), yÃªu thÃ­ch sá»± tinh táº¿, tháº©m má»¹ cao vÃ  tráº£i nghiá»‡m cÃ¡ nhÃ¢n hÃ³a.",
    persona: "NgÆ°á»i Ä‘á»‹nh hÃ¬nh xu hÆ°á»›ng thá»i thÆ°á»£ng, sang trá»ng, duy má»¹, chÃº trá»ng tiá»ƒu tiáº¿t vÃ  tráº£i nghiá»‡m tinh hoa.",
    coreMessage: "Sáº£n pháº©m cao cáº¥p khÃ´ng bÃ¡n báº±ng tÃ­nh nÄƒng. NÃ³ bÃ¡n báº±ng cáº£m xÃºc, phong cÃ¡ch sá»‘ng vÃ  niá»m kiÃªu hÃ£nh cá»§a ngÆ°á»i sá»Ÿ há»¯u.",
    differentiation: "Quay gÃ³c rá»™ng cinematic, phá»‘i mÃ u áº¥m Ã¡p sang trá»ng (Light Premium Cream & Gold), lá»“ng Ã¢m nháº¡c cello du dÆ°Æ¡ng.",
    cta: "Nháº­n thiá»‡p má»i tham dá»± workshop tráº£i nghiá»‡m sáº£n pháº©m riÃªng tÆ° giá»›i háº¡n.",
    exampleTopic: "Nghá»‡ thuáº­t ká»ƒ cÃ¢u chuyá»‡n thÆ°Æ¡ng hiá»‡u Ä‘áº±ng sau táº¥m da thuá»™c thá»§ cÃ´ng Ã"
  },
  {
    id: "real_estate",
    name: "Founder Báº¥t Ä‘á»™ng sáº£n",
    audience: "NhÃ  Ä‘áº§u tÆ° cÃ¡ nhÃ¢n, gia Ä‘Ã¬nh trung lÆ°u Ä‘ang tÃ¬m kiáº¿m cÆ¡ há»™i tÃ­ch lÅ©y tÃ i sáº£n an toÃ n vÃ  bá»n vá»¯ng.",
    persona: "NhÃ  Ä‘áº§u tÆ° lÃ£o luyá»‡n, trung thá»±c, am hiá»ƒu luáº­t phÃ¡p vÃ  quy hoáº¡ch, nÃ³i chuyá»‡n dá»±a trÃªn báº±ng chá»©ng thá»±c Ä‘á»‹a.",
    coreMessage: "Äáº§u tÆ° báº¥t Ä‘á»™ng sáº£n khÃ´ng pháº£i lÃ  Ä‘Ã¡nh báº¡c. ÄÃ³ lÃ  khoa há»c cá»§a viá»‡c phÃ¢n tÃ­ch dÃ²ng tiá»n vÃ  Ä‘Ã¡nh giÃ¡ rá»§i ro phÃ¡p lÃ½.",
    differentiation: "Quay thá»±c Ä‘á»‹a báº±ng flycam sáº¯c nÃ©t, trá»±c tiáº¿p kiá»ƒm tra sá»• Ä‘á» táº¡i hiá»‡n trÆ°á»ng, minh báº¡ch hÃ³a Ä‘iá»ƒm yáº¿u cá»§a dá»± Ã¡n.",
    cta: "Táº£i xuá»‘ng tÃ i liá»‡u phÃ¢n tÃ­ch rá»§i ro quy hoáº¡ch 3 khu vá»±c tiá»m nÄƒng nháº¥t nÄƒm nay.",
    exampleTopic: "3 cáº¡m báº«y phÃ¡p lÃ½ trong há»£p Ä‘á»“ng mua bÃ¡n nhÃ  Ä‘áº¥t CEO cáº§n biáº¿t"
  }
];

export const PILLARS: ContentPillar[] = [
  {
    name: "GiÃ¡o dá»¥c & Giáº£i quyáº¿t Ná»—i Ä‘au (40%)",
    ratio: 40,
    color: "#C5933A",
    description: "Cung cáº¥p kiáº¿n thá»©c chuyÃªn sÃ¢u giáº£i quyáº¿t cÃ¡c váº¥n Ä‘á» cáº¥p bÃ¡ch cá»§a khÃ¡ch hÃ ng má»¥c tiÃªu Ä‘á»ƒ táº¡o láº­p uy tÃ­n chuyÃªn gia vá»¯ng cháº¯c.",
    videoFormat: "Whiteboard sharing, Talking head + B-roll thá»±c táº¿, Mini-tutorial quay cáº­n cáº£nh.",
    example: "LÃ m tháº¿ nÃ o Ä‘á»ƒ giáº£m 30% chi phÃ­ cháº¡y quáº£ng cÃ¡o nhá» cáº¥u trÃºc láº¡i phá»…u ká»‹ch báº£n video ngáº¯n."
  },
  {
    name: "Chá»©ng minh NÄƒng lá»±c & Case Study (25%)",
    ratio: 25,
    color: "#E2C37B",
    description: "Chia sáº» cÃ¢u chuyá»‡n thÃ nh cÃ´ng thá»±c táº¿ cá»§a cÃ¡c khÃ¡ch hÃ ng cÅ©, Ä‘á»‘i tÃ¡c, má»• xáº» sá»‘ liá»‡u tÄƒng trÆ°á»Ÿng thá»±c táº¿ Ä‘á»ƒ táº¡o báº±ng chá»©ng xÃ£ há»™i.",
    videoFormat: "Phá»ng váº¥n khÃ¡ch hÃ ng, BÃ¡o cÃ¡o KPI trá»±c diá»‡n mÃ n hÃ¬nh, HÃ nh trÃ¬nh lá»™t xÃ¡c (Before/After).",
    example: "HÃ nh trÃ¬nh xÃ¢y kÃªnh TikTok 0 follower Ä‘áº¡t 120 leads cháº¥t lÆ°á»£ng sau Ä‘Ãºng 30 ngÃ y cho dá»‹ch vá»¥ luáº­t B2B."
  },
  {
    name: "Háº­u trÆ°á»ng & GiÃ¡ trá»‹ Doanh nghiá»‡p (20%)",
    ratio: 20,
    color: "#825D1F",
    description: "NhÃ¢n vÄƒn hÃ³a thÆ°Æ¡ng hiá»‡u báº±ng cÃ¡ch hÃ© lá»™ quy trÃ¬nh lÃ m viá»‡c nghiÃªm tÃºc, vÄƒn hÃ³a PGS Agency, cÃ¢u chuyá»‡n Ä‘áº±ng sau sáº£n pháº©m.",
    videoFormat: "Day in the Life of CEO, Unboxing tÃ i liá»‡u bÃ n giao dá»± Ã¡n, PhÃºt ngáº«u há»©ng táº¡i phÃ²ng quay dá»±ng.",
    example: "Má»™t ngÃ y lÃ m viá»‡c Ã¡p lá»±c cá»§a Content Director táº¡i PGS Agency Ä‘á»ƒ duyá»‡t 50 ká»‹ch báº£n TikTok má»—i ngÃ y."
  },
  {
    name: "BÃ¡n hÃ ng Má»m & Chuyá»ƒn Ä‘á»•i (15%)",
    ratio: 15,
    color: "#3D2B0D",
    description: "KÃªu gá»i hÃ nh Ä‘á»™ng trá»±c tiáº¿p nhÆ°ng tinh táº¿ báº±ng cÃ¡ch táº·ng giÃ¡ trá»‹ miá»…n phÃ­ hoáº·c cung cáº¥p lá»i giáº£i Ä‘áº·c biá»‡t giá»›i háº¡n.",
    videoFormat: "Quy trÃ¬nh Ä‘Äƒng kÃ½ nháº­n quÃ  táº·ng, QuÃ  táº·ng Ä‘á»™c quyá»n cuá»‘i video, Lá»i má»i há»£p tÃ¡c trá»±c tiáº¿p tá»« Founder.",
    example: "Nháº­n vÃ© má»i miá»…n phÃ­ tham gia Mini-course: Tá»± xÃ¢y kÃªnh TikTok Doanh nghiá»‡p chuáº©n chá»‰nh cÃ¹ng PGS."
  }
];

export const SERIES_PATHS: SeriesPath[] = [
  {
    title: "30 NgÃ y TÃ¡i Äá»‹nh Vá»‹ ThÆ°Æ¡ng Hiá»‡u Doanh Nghiá»‡p",
    duration: "60 giÃ¢y / Táº­p",
    objective: "Táº¡o nháº­n diá»‡n sÃ¢u rá»™ng, kháº³ng Ä‘á»‹nh vá»‹ tháº¿ dáº«n Ä‘áº§u ngÃ nh cá»§a CEO.",
    hookType: "Cáº£nh bÃ¡o + Giáº£i phÃ¡p",
    steps: [
      "Táº­p 1: Sai láº§m Ä‘á»‘t tiá»n khi lÃ m thÆ°Æ¡ng hiá»‡u cÃ¡ nhÃ¢n ná»­a vá»i.",
      "Táº­p 5: CÃ´ng thá»©c xÃ¡c Ä‘á»‹nh Ä‘iá»ƒm Ä‘á»™c báº£n (USP) cá»§a báº¡n trong 5 phÃºt.",
      "Táº­p 15: BÃ­ máº­t háº­u trÆ°á»ng quay video triá»‡u view cá»§a má»™t CEO báº­n rá»™n.",
      "Táº­p 30: Trá»±c quan hÃ³a phá»…u chuyá»ƒn Ä‘á»•i tá»« view thÃ nh tiá»n máº·t."
    ]
  },
  {
    title: "Má»• Xáº» Case Study TÄƒng TrÆ°á»Ÿng Thá»±c Chiáº¿n",
    duration: "90 giÃ¢y / Táº­p",
    objective: "Chá»©ng minh nÄƒng lá»±c, xÃ¢y dá»±ng niá»m tin tuyá»‡t Ä‘á»‘i báº±ng dá»¯ liá»‡u.",
    hookType: "Káº¿t quáº£ giáº­t mÃ¬nh + PhÃ¢n tÃ­ch ngÆ°á»£c",
    steps: [
      "Táº­p 1: CÃ¡ch má»™t chuá»—i spa thu vá» 350 triá»‡u Ä‘á»“ng tá»« 1 clip TikTok 45 giÃ¢y.",
      "Táº­p 3: PhÃ¢n tÃ­ch ká»‹ch báº£n giá»¯ chÃ¢n ngÆ°á»i xem 80% cá»§a thÆ°Æ¡ng hiá»‡u thá»i trang Ã.",
      "Táº­p 5: Quy trÃ¬nh xá»­ lÃ½ khá»§ng hoáº£ng truyá»n thÃ´ng khi bá»‹ Ä‘á»‘i thá»§ chÆ¡i xáº¥u.",
      "Táº­p 10: Tá»•ng káº¿t 5 bÃ i há»c xÆ°Æ¡ng mÃ¡u sau khi chi 2 tá»· cháº¡y Ads TikTok."
    ]
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "PGS Agency cÃ³ bao gá»“m dá»‹ch vá»¥ quay phim vÃ  dá»±ng video trá»n gÃ³i khÃ´ng?",
    answer: "CÃ³. GÃ³i dá»‹ch vá»¥ TikTok Channel Builder vÃ  TikTok Content System cá»§a chÃºng tÃ´i bao gá»“m toÃ n bá»™ quy trÃ¬nh: Tá»« xÃ¢y dá»±ng chiáº¿n lÆ°á»£c, viáº¿t ká»‹ch báº£n chi tiáº¿t, Ä‘áº¡o diá»…n buá»•i quay, setup Ã¡nh sÃ¡ng, quay phim cháº¥t lÆ°á»£ng 4K báº±ng thiáº¿t bá»‹ chuyÃªn nghiá»‡p, dá»±ng phim háº­u ká»³ (lá»“ng hiá»‡u á»©ng, Ã¢m thanh, text on screen) cho Ä‘áº¿n Ä‘Äƒng táº£i tá»‘i Æ°u SEO."
  },
  {
    question: "Bao lÃ¢u thÃ¬ kÃªnh TikTok cá»§a chÃºng tÃ´i báº¯t Ä‘áº§u cÃ³ chuyá»ƒn Ä‘á»•i hoáº·c ra khÃ¡ch hÃ ng?",
    answer: "ThÃ´ng thÆ°á»ng, dá»±a trÃªn há»‡ thá»‘ng ká»‹ch báº£n Ä‘á»‹nh hÆ°á»›ng chuyá»ƒn Ä‘á»•i cá»§a PGS, khÃ¡ch hÃ ng báº¯t Ä‘áº§u nháº­n Ä‘Æ°á»£c nhá»¯ng Leads (khÃ¡ch hÃ ng tiá»m nÄƒng nháº¯n tin, Ä‘iá»n form hoáº·c báº¥m vÃ o bio link) tá»« tuáº§n thá»© 3 sau khi Ä‘Äƒng táº£i loáº¡t video thuá»™c Pillar GiÃ¡o dá»¥c vÃ  Case study Ä‘áº§u tiÃªn. ChÃºng tÃ´i khÃ´ng cam káº¿t lÆ°á»£t xem áº£o (views triá»‡u view vÃ´ nghÄ©a), mÃ  cam káº¿t cháº¥t lÆ°á»£ng tá»‡p ngÆ°á»i xem vÃ  lÆ°á»£t Ä‘Äƒng kÃ½ thá»±c táº¿."
  },
  {
    question: "Doanh nghiá»‡p B2B (bÃ¡n cho doanh nghiá»‡p) cÃ³ phÃ¹ há»£p lÃ m kÃªnh TikTok khÃ´ng?",
    answer: "HoÃ n toÃ n phÃ¹ há»£p vÃ  tháº­m chÃ­ Ä‘ang lÃ  'má» vÃ ng'. Quyáº¿t Ä‘á»‹nh mua hÃ ng B2B thuá»™c vá» cÃ¡c CEO, TrÆ°á»Ÿng phÃ²ng, Quáº£n lÃ½ - nhá»¯ng ngÆ°á»i cÅ©ng Ä‘ang lÆ°á»›t TikTok hÃ ng ngÃ y Ä‘á»ƒ tÃ¬m kiáº¿m giáº£i phÃ¡p tá»‘i Æ°u hÃ³a doanh nghiá»‡p cá»§a há». Ká»‹ch báº£n B2B cá»§a PGS táº­p trung sÃ¢u vÃ o phÃ¢n tÃ­ch bÃ i toÃ¡n chi phÃ­, quy trÃ¬nh quáº£n trá»‹, má»• xáº» case study thá»±c táº¿, giÃºp CEO doanh nghiá»‡p tin tÆ°á»Ÿng vÃ  chá»§ Ä‘á»™ng liÃªn há»‡ tÆ° váº¥n."
  },
  {
    question: "Náº¿u CEO báº­n rá»™n, khÃ´ng cÃ³ thá»i gian viáº¿t ká»‹ch báº£n hoáº·c chuáº©n bá»‹ thÃ¬ sao?",
    answer: "Quy trÃ¬nh cá»§a PGS Agency Ä‘Æ°á»£c tá»‘i Æ°u cÃ´ng nghiá»‡p cho ngÆ°á»i báº­n rá»™n. CEO chá»‰ cáº§n dÃ nh ra 2 tiáº¿ng má»—i thÃ¡ng Ä‘á»ƒ PGS phá»ng váº¥n nhanh nháº±m khai thÃ¡c chuyÃªn mÃ´n sÃ¢u (Raw insight). ToÃ n bá»™ khÃ¢u viáº¿t ká»‹ch báº£n, láº­p lá»‹ch Ä‘Äƒng, chuáº©n bá»‹ Ä‘áº¡o cá»¥ quay, Ä‘áº¡o diá»…n diá»…n xuáº¥t sáº½ do PGS lo trá»n gÃ³i. Báº¡n chá»‰ cáº§n xuáº¥t hiá»‡n trÆ°á»›c á»‘ng kÃ­nh vÃ  nÃ³i theo sá»± hÆ°á»›ng dáº«n cá»§a Ä‘áº¡o diá»…n trong vÃ²ng 1 buá»•i quay duy nháº¥t."
  },
  {
    question: "ChÃºng tÃ´i cÃ³ cáº§n cháº¡y quáº£ng cÃ¡o kÃ¨m theo khi xÃ¢y kÃªnh TikTok khÃ´ng?",
    answer: "Quáº£ng cÃ¡o (TikTok Ads) lÃ  cháº¥t xÃºc tÃ¡c máº¡nh máº½. PGS Agency khuyÃªn dÃ¹ng chiáº¿n lÆ°á»£c 'Organic-Led Ads'. NghÄ©a lÃ  chÃºng tÃ´i sáº½ theo dÃµi nhá»¯ng video cÃ³ chá»‰ sá»‘ giá»¯ chÃ¢n tá»± nhiÃªn (retention rate) cao nháº¥t trÃªn kÃªnh cá»§a báº¡n, sau Ä‘Ã³ dÃ¹ng chÃ­nh video Ä‘Ã³ Ä‘á»ƒ cháº¡y Spark Ads nháº¯m tháº³ng má»¥c tiÃªu Lead Generation. CÃ¡ch lÃ m nÃ y giÃºp giáº£m tá»›i 40% chi phÃ­ CPA so vá»›i viá»‡c cháº¡y quáº£ng cÃ¡o báº±ng video rÃ¡c thÃ´ng thÆ°á»ng."
  }
];

export const PACKAGES: ServicePackage[] = [
  {
    name: "TikTok Strategy",
    badge: "Khá»Ÿi táº¡o ná»n mÃ³ng",
    price: "15,000,000Ä‘",
    priceNum: 15000000,
    description: "Giáº£i phÃ¡p nghiÃªn cá»©u thá»‹ trÆ°á»ng, xÃ¢y dá»±ng chÃ¢n dung tá»‡p khÃ¡ch hÃ ng vÃ  Ä‘á»‹nh hÃ¬nh bá»™ khung Content Pillar Ä‘á»™c quyá»n cho thÆ°Æ¡ng hiá»‡u.",
    features: [
      "NghiÃªn cá»©u 3 Ä‘á»‘i thá»§ cáº¡nh tranh trá»±c tiáº¿p",
      "XÃ¡c Ä‘á»‹nh Ä‘iá»ƒm Ä‘á»™c báº£n (USP) & Äá»‹nh vá»‹ kÃªnh",
      "Thiáº¿t láº­p cáº¥u trÃºc 3 Content Pillars",
      "PhÃ¡c tháº£o Concept quay dá»±ng vÃ  Ã¢m thanh",
      "BÃ n giao 10 tiÃªu Ä‘á» ká»‹ch báº£n Demo cuá»‘n hÃºt"
    ],
    deliverables: [
      "File BÃ¡o cÃ¡o Äá»‹nh vá»‹ KÃªnh & ChÃ¢n dung khÃ¡ch hÃ ng (PDF/Mindmap)",
      "Báº£ng hÆ°á»›ng dáº«n Style quay dá»±ng & Moodboard visual",
      "TÃ i liá»‡u hÆ°á»›ng dáº«n tá»‘i Æ°u há»“ sÆ¡ kÃªnh chuáº©n SEO"
    ],
    recommendedFor: "Doanh nghiá»‡p Ä‘Ã£ cÃ³ Ä‘á»™i ngÅ© quay dá»±ng riÃªng nhÆ°ng báº¿ táº¯c vá» máº·t Ã½ tÆ°á»Ÿng vÃ  thiáº¿u Ä‘á»‹nh hÆ°á»›ng chiáº¿n lÆ°á»£c dÃ i háº¡n."
  },
  {
    name: "TikTok Channel Builder",
    badge: "Phá»• biáº¿n nháº¥t",
    price: "35,000,000Ä‘",
    priceNum: 35000000,
    description: "GÃ³i Ä‘á»“ng hÃ nh sáº£n xuáº¥t trá»n gÃ³i chuáº©n PGS, giÃºp báº¡n xÃ¢y dá»±ng kÃªnh TikTok chuyÃªn nghiá»‡p tá»« con sá»‘ 0 vá»›i 12 video cháº¥t lÆ°á»£ng cao má»—i thÃ¡ng.",
    features: [
      "Bao gá»“m toÃ n bá»™ quyá»n lá»£i cá»§a gÃ³i Strategy",
      "BiÃªn ká»‹ch 12 ká»‹ch báº£n chi tiáº¿t (100% lá»i thoáº¡i, hÃ nh Ä‘á»™ng, visual)",
      "1 Buá»•i quay trá»n gÃ³i táº¡i Studio cao cáº¥p cá»§a PGS",
      "Thiáº¿t bá»‹ quay phim 4K, setup Ã¡nh sÃ¡ng, mic khÃ´ng dÃ¢y cao cáº¥p",
      "Háº­u ká»³ 12 video ngáº¯n (lá»“ng nháº¡c, caption hiá»‡u á»©ng, sound effects)",
      "ÄÄƒng táº£i chuáº©n SEO TikTok, thiáº¿t láº­p Bio link chuyá»ƒn Ä‘á»•i"
    ],
    deliverables: [
      "12 video TikTok hoÃ n thiá»‡n cháº¥t lÆ°á»£ng cao",
      "Lá»‹ch Ä‘Äƒng bÃ i vÃ  bÃ¡o cÃ¡o KPI tÆ°Æ¡ng tÃ¡c hÃ ng tuáº§n",
      "Trang Bio Link thiáº¿t káº¿ riÃªng Ä‘á»“ng bá»™ thÆ°Æ¡ng hiá»‡u"
    ],
    recommendedFor: "CEO, Founders, ChuyÃªn gia muá»‘n xÃ¢y dá»±ng nhÃ¢n hiá»‡u uy tÃ­n nhanh chÃ³ng mÃ  khÃ´ng cáº§n tá»‘n thá»i gian tá»± viáº¿t ká»‹ch báº£n hay quay dá»±ng."
  },
  {
    name: "TikTok Content System",
    badge: "TÄƒng trÆ°á»Ÿng Ä‘á»™t phÃ¡",
    price: "60,000,000Ä‘",
    priceNum: 60000000,
    description: "Há»‡ thá»‘ng ná»™i dung Ä‘a ná»n táº£ng tá»‘i Ä‘a hÃ³a chuyá»ƒn Ä‘á»•i. Sáº£n xuáº¥t 24 video cháº¥t lÆ°á»£ng cao má»—i thÃ¡ng, tÃ­ch há»£p phá»…u thu tháº­p Lead.",
    features: [
      "Bao gá»“m toÃ n bá»™ quyá»n lá»£i gÃ³i Channel Builder",
      "BiÃªn ká»‹ch & sáº£n xuáº¥t 24 ká»‹ch báº£n video ngáº¯n má»—i thÃ¡ng",
      "2 Buá»•i quay dá»±ng trá»n gÃ³i thiáº¿t káº¿ riÃªng táº¡i vÄƒn phÃ²ng khÃ¡ch hÃ ng",
      "Quy hoáº¡ch ná»™i dung thÃ nh 3 Series chá»§ chá»‘t tÄƒng trust sÃ¢u",
      "Tá»‘i Æ°u hÃ³a Ä‘á»ƒ phÃ¢n phá»‘i chÃ©o lÃªn Facebook Reels, YouTube Shorts, Instagram",
      "Setup tÃ i khoáº£n TikTok Ads vÃ  khá»Ÿi cháº¡y chiáº¿n dá»‹ch Spark Ads thu lead"
    ],
    deliverables: [
      "24 video hoÃ n thiá»‡n tá»‘i Æ°u Ä‘a ná»n táº£ng",
      "Há»‡ thá»‘ng Landing Page/Form thu tháº­p Lead Ä‘á»“ng bá»™",
      "Dashboard theo dÃµi Lead, chi phÃ­ CPA vÃ  doanh sá»‘ chuyá»ƒn Ä‘á»•i thá»i gian thá»±c"
    ],
    recommendedFor: "Doanh nghiá»‡p lá»›n cáº§n phá»§ sÃ³ng máº¡nh máº½, xÃ¢y dá»±ng há»‡ thá»‘ng phá»…u khÃ¡ch hÃ ng khÃ©p kÃ­n Ä‘á»ƒ bá»©t phÃ¡ doanh thu bá»n vá»¯ng."
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    clientName: "Dr. Minh Tuáº¥n - Viá»‡n Nha khoa Elite",
    niche: "ChuyÃªn gia / Y khoa Tháº©m má»¹",
    followersGained: "45,000+",
    viewsTotal: "2.4 Triá»‡u+",
    leadsGenerated: "312 KhÃ¡ch hÃ ng Ä‘áº·t lá»‹ch",
    conversionIncrease: "TÄƒng 18%",
    duration: "60 ngÃ y",
    story: "Khai thÃ¡c sÃ¢u vÃ o ná»—i sá»£ biáº¿n chá»©ng khi niá»ng rÄƒng giÃ¡ ráº» táº¡i cÃ¡c cÆ¡ sá»Ÿ khÃ´ng uy tÃ­n thÃ´ng qua chuá»—i series 'Cáº£nh BÃ¡o Y Khoa'. Káº¿t há»£p cÃ¹ng nhá»¯ng ká»‹ch báº£n giáº£i Ä‘Ã¡p trá»±c quan trÃªn mÃ´ hÃ¬nh 3D giÃºp kÃªnh nhanh chÃ³ng nháº­n Ä‘Æ°á»£c sá»± tin tÆ°á»Ÿng tuyá»‡t Ä‘á»‘i cá»§a tá»‡p khÃ¡ch hÃ ng thu nháº­p cao.",
    image: "https://picsum.photos/seed/dentist/400/300"
  },
  {
    clientName: "SaaS Váº­n HÃ nh - LogiTech Vietnam",
    niche: "B2B / Giáº£i phÃ¡p CÃ´ng nghá»‡",
    followersGained: "12,500+",
    viewsTotal: "850,000+",
    leadsGenerated: "148 Doanh nghiá»‡p Ä‘Äƒng kÃ½ dÃ¹ng thá»­",
    conversionIncrease: "TÄƒng 35%",
    duration: "45 ngÃ y",
    story: "Sá»­ dá»¥ng concept quay 'Whiteboard' má»• xáº» tá»•n tháº¥t dÃ²ng tiá»n do tháº¥t thoÃ¡t kho bÃ£i cá»§a cÃ¡c doanh nghiá»‡p logistics truyá»n thá»‘ng. Thay vÃ¬ kÃªu gá»i mua hÃ ng thÃ´ báº¡o, PGS thiáº¿t káº¿ series chia sáº» bá»™ file Excel quáº£n trá»‹ miá»…n phÃ­ á»Ÿ Bio Link Ä‘á»ƒ gom phá»…u lead cá»±c ká»³ thÃ nh cÃ´ng.",
    image: "https://picsum.photos/seed/tech/400/300"
  },
  {
    clientName: "Founder HoÃ ng Yáº¿n - Elite Tailor",
    niche: "ThÆ°Æ¡ng hiá»‡u Thá»i trang Cao cáº¥p",
    followersGained: "68,000+",
    viewsTotal: "4.1 Triá»‡u+",
    leadsGenerated: "520+ Cuá»™c gá»i tÆ° váº¥n may Ä‘o",
    conversionIncrease: "TÄƒng 22%",
    duration: "90 ngÃ y",
    story: "HÆ°á»›ng Ä‘áº¿n Ä‘á»‘i tÆ°á»£ng doanh nhÃ¢n thÃ nh Ä‘áº¡t, cÃ¡c video khai thÃ¡c ká»¹ thuáº­t may Ä‘o bespoke chuáº©n Savile Row cá»§a Anh Quá»‘c káº¿t há»£p vá»›i series 'Phong CÃ¡ch QuÃ½ Ã”ng'. Visual mang mÃ u sáº¯c cá»• Ä‘iá»ƒn áº¥m Ã¡p, Ã¢m thanh sang trá»ng, khÆ¡i gá»£i khÃ¡t khao kháº³ng Ä‘á»‹nh Ä‘áº³ng cáº¥p cá»§a khÃ¡ch hÃ ng má»¥c tiÃªu.",
    image: "https://picsum.photos/seed/tailor/400/300"
  }
];

export const SECTIONS: TikTokSection[] = [
  {
    id: 1,
    title: "Hero TikTok Channel Builder",
    slug: "hero-tiktok-channel-builder",
    spec: {
      searchIntent: "KhÃ¡ch hÃ ng tÃ¬m kiáº¿m giáº£i phÃ¡p xÃ¢y kÃªnh TikTok chuyÃªn nghiá»‡p, bÃ i báº£n cho doanh nghiá»‡p hoáº·c cÃ¡ nhÃ¢n CEO, mong muá»‘n tháº¥y nÄƒng lá»±c Ä‘á»‹nh vá»‹ vÃ  sá»± khÃ¡c biá»‡t cao cáº¥p cá»§a PGS Agency ngay láº­p tá»©c.",
      conceptUI: "TikTok Channel Builder UI - Sá»­ dá»¥ng layout Light Premium sang trá»ng vá»›i má»™t Hero 3D trung tÃ¢m tÆ°á»£ng trÆ°ng cho cáº¥u trÃºc xÃ¢y dá»±ng kÃªnh. Káº¿t há»£p cÃ¡c floating cards tráº¯ng ngÃ  viá»n gold lÆ¡ lá»­ng hiá»ƒn thá»‹ chá»‰ sá»‘ tÄƒng trÆ°á»Ÿng thá»±c táº¿, cÃ¹ng má»™t Mockup giao diá»‡n video Ä‘á»©ng cá»±c ká»³ áº¥n tÆ°á»£ng.",
      hero3D: "MÃ´ hÃ¬nh Phone Stack 3D sÃ¡ng láº¥p lÃ¡nh (váº­t liá»‡u kÃ­nh má» vÃ  viá»n kim loáº¡i vÃ ng gold), cÃ¡c content pillar orbit xoay quanh Ä‘iá»‡n thoáº¡i, thá»ƒ hiá»‡n sá»± váº­n hÃ nh nhá»‹p nhÃ ng cá»§a luá»“ng ná»™i dung.",
      metaTitle: "Dá»‹ch Vá»¥ XÃ¢y KÃªnh TikTok Doanh Nghiá»‡p & CEO Trá»n GÃ³i | PGS Agency",
      metaDescription: "PGS Agency cung cáº¥p giáº£i phÃ¡p xÃ¢y kÃªnh TikTok toÃ n diá»‡n cho Doanh nghiá»‡p, CEO, ChuyÃªn gia. Thiáº¿t láº­p Ä‘á»‹nh hÆ°á»›ng ná»™i dung bÃ i báº£n, cam káº¿t chuyá»ƒn Ä‘á»•i thá»±c táº¿.",
      h1: "Dá»‹ch vá»¥ xÃ¢y kÃªnh TikTok giÃºp doanh nghiá»‡p vÃ  CEO phÃ¡t triá»ƒn ná»™i dung video ngáº¯n cÃ³ Ä‘á»‹nh hÆ°á»›ng",
      h2AndH3: ["TÄƒng trÆ°á»Ÿng sá»‘ bá»n vá»¯ng vá»›i há»‡ thá»‘ng ká»‹ch báº£n chuyá»ƒn Ä‘á»•i", "Giáº£i phÃ¡p xÃ¢y kÃªnh TikTok trá»n gÃ³i", "PGS Agency - Äá»‘i tÃ¡c Ä‘á»“ng hÃ nh tÄƒng trÆ°á»Ÿng"],
      internalLinkOut: ["/dich-vu/tiktok-ads", "/dich-vu/content-social"],
      internalLinkIn: ["/", "/ve-chung-toi"],
      schemaCode: `{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Dá»‹ch vá»¥ XÃ¢y kÃªnh TikTok cÃ³ Ä‘á»‹nh hÆ°á»›ng",
  "provider": {
    "@type": "Organization",
    "name": "PGS Agency",
    "url": "https://pgsagency.vn"
  },
  "description": "Dá»‹ch vá»¥ xÃ¢y dá»±ng chiáº¿n lÆ°á»£c ná»™i dung, sáº£n xuáº¥t video ngáº¯n TikTok chuyÃªn nghiá»‡p cho Doanh nghiá»‡p vÃ  CEO giÃºp tÄƒng trÆ°á»Ÿng doanh thu vÃ  thÆ°Æ¡ng hiá»‡u."
}`,
      checklistDesigner: [
        "Sá»­ dá»¥ng ná»n sÃ¡ng ngÃ  (#FCFBFA) táº¡o cáº£m giÃ¡c dá»… chá»‹u, sáº¡ch sáº½ vÃ  cao cáº¥p.",
        "Thiáº¿t láº­p khoáº£ng tráº¯ng (padding-y) tá»‘i thiá»ƒu 96px Ä‘á»ƒ táº¡o sá»± thoÃ¡ng Ä‘Ã£ng tá»‘i Ä‘a.",
        "CÃ¡c Ä‘Æ°á»ng viá»n (borders) má»ng 1px mÃ u vÃ ng gold nháº¡t (#EEDDAB) káº¿t há»£p hiá»‡u á»©ng backdrop-blur.",
        "NÃºt CTA ná»•i báº­t vá»›i ná»n vÃ ng gold sang trá»ng (#C5933A), chá»¯ Ä‘en than, hover sÃ¡ng nháº¹ vÃ  cÃ³ hiá»‡u á»©ng bÃ³ng Ä‘á»• má»m máº¡i."
      ],
      checklistDeveloper: [
        "TÃ­ch há»£p thÆ° viá»‡n motion/react Ä‘á»ƒ táº¡o hiá»‡u á»©ng trÆ°á»£t nháº¹ (swipe) cho cÃ¡c tháº» phone mockup.",
        "Sá»­ dá»¥ng staggered fade-in cho tiÃªu Ä‘á» H1 vÃ  cÃ¡c nÃºt báº¥m Ä‘á»ƒ táº¡o cáº£m xÃºc dáº«n dáº¯t mÆ°á»£t mÃ .",
        "Tá»‘i Æ°u hiá»‡u á»©ng hover tilt (nghiÃªng nháº¹ theo con trá») trÃªn cÃ¡c floating cards.",
        "Thiáº¿t láº­p thuá»™c tÃ­nh prefers-reduced-motion Ä‘á»ƒ táº¯t toÃ n bá»™ animation náº¿u thiáº¿t bá»‹ ngÆ°á»i dÃ¹ng yÃªu cáº§u."
      ],
      checklistContentSEO: [
        "Äáº·t tá»« khÃ³a chÃ­nh 'Dá»‹ch vá»¥ xÃ¢y kÃªnh TikTok' ngay táº¡i tháº» H1 duy nháº¥t cá»§a trang.",
        "Äoáº¡n mÃ´ táº£ ngáº¯n dÆ°á»›i H1 pháº£i giáº£i quyáº¿t trá»±c diá»‡n bÄƒn khoÄƒn cá»§a khÃ¡ch hÃ ng: 'Video ngáº¯n cÃ³ Ä‘á»‹nh hÆ°á»›ng lÃ  gÃ¬? LÃ m tháº¿ nÃ o Ä‘á»ƒ tÄƒng lead?'.",
        "Tá»‘i Æ°u tá»« ngá»¯ chuyá»ƒn Ä‘á»•i cao, trÃ¡nh dÃ¹ng tá»« ngá»¯ sÃ¡o rá»—ng kiá»ƒu 'chuyÃªn nghiá»‡p sá»‘ má»™t' mÃ  dÃ¹ng 'bÃ i báº£n, tÄƒng trÆ°á»Ÿng bá»n vá»¯ng'."
      ]
    }
  },
  {
    id: 2,
    title: "XÃ¢y kÃªnh TikTok lÃ  gÃ¬",
    slug: "xay-kenh-tiktok-la-gi",
    spec: {
      searchIntent: "NgÆ°á»i dÃ¹ng tháº¯c máº¯c dá»‹ch vá»¥ xÃ¢y kÃªnh thá»±c sá»± bao gá»“m nhá»¯ng háº¡ng má»¥c gÃ¬, hay chá»‰ Ä‘Æ¡n giáº£n lÃ  cáº§m Ä‘iá»‡n thoáº¡i lÃªn quay rá»“i Ä‘Äƒng. Há» cáº§n má»™t Ä‘á»‹nh nghÄ©a trá»±c diá»‡n, chuáº©n xÃ¡c Ä‘á»ƒ so sÃ¡nh.",
      conceptUI: "Definition Bento Cards - Há»‡ thá»‘ng cÃ¡c Ã´ lÆ°á»›i (grid layout) phÃ¢n chia rÃµ rÃ ng cÃ¡c cáº¥u thÃ nh cá»‘t lÃµi cá»§a dá»‹ch vá»¥ xÃ¢y kÃªnh: Strategy, Pillar, Format, Script, Shooting, SEO Optimization.",
      hero3D: "Biá»ƒu tÆ°á»£ng 3D khá»‘i láº­p phÆ°Æ¡ng trong suá»‘t (translucent glass cube) lÆ¡ lá»­ng, pháº£n chiáº¿u Ã¡nh sÃ¡ng vÃ ng gold áº¥m Ã¡p.",
      metaTitle: "XÃ¢y KÃªnh TikTok Doanh Nghiá»‡p LÃ  GÃ¬? Quy TrÃ¬nh Chuáº©n | PGS Agency",
      metaDescription: "TÃ¬m hiá»ƒu Ä‘á»‹nh nghÄ©a thá»±c táº¿ vá» xÃ¢y kÃªnh TikTok chuyÃªn nghiá»‡p. KhÃ´ng chá»‰ quay dá»±ng video, Ä‘Ã³ lÃ  cáº£ má»™t há»‡ thá»‘ng chiáº¿n lÆ°á»£c Ä‘á»‹nh vá»‹ vÃ  thu tháº­p leads.",
      h1: "XÃ¢y kÃªnh TikTok cÃ³ Ä‘á»‹nh hÆ°á»›ng lÃ  gÃ¬?",
      h2AndH3: ["Äá»‹nh nghÄ©a xÃ¢y kÃªnh TikTok chuáº©n doanh nghiá»‡p", "Sá»± káº¿t há»£p giá»¯a nghá»‡ thuáº­t ná»™i dung vÃ  dá»¯ liá»‡u chuyá»ƒn Ä‘á»•i"],
      internalLinkOut: ["/dich-vu/dich-vu-seo", "/dich-vu/social-media"],
      internalLinkIn: ["/tin-tuc/bi-quyet-xay-kenh"],
      schemaCode: `{
  "@context": "https://schema.org",
  "@type": "DefinedTerm",
  "name": "XÃ¢y kÃªnh TikTok doanh nghiá»‡p",
  "description": "Quy trÃ¬nh thiáº¿t láº­p Ä‘á»‹nh vá»‹, biÃªn ká»‹ch ká»‹ch báº£n, sáº£n xuáº¥t video ngáº¯n, tá»‘i Æ°u hÃ³a tÃ¬m kiáº¿m SEO vÃ  xÃ¢y dá»±ng phá»…u chuyá»ƒn Ä‘á»•i khÃ¡ch hÃ ng tiá»m nÄƒng trÃªn ná»n táº£ng TikTok."
}`,
      checklistDesigner: [
        "Thiáº¿t káº¿ lÆ°á»›i 3 cá»™t cÃ¢n Ä‘á»‘i trÃªn desktop, thu vá» 1 cá»™t trÃªn mobile.",
        "Má»—i tháº» Ä‘á»‹nh nghÄ©a cÃ³ biá»ƒu tÆ°á»£ng SVG vÃ ng gold tinh táº¿ nháº­p kháº©u tá»« lucide-react.",
        "Äá»™ tÆ°Æ¡ng pháº£n chá»¯ tá»‘i thiá»ƒu Ä‘áº¡t tiÃªu chuáº©n WCAG AAA Ä‘á»ƒ báº£o vá»‡ máº¯t ngÆ°á»i Ä‘á»c."
      ],
      checklistDeveloper: [
        "Sá»­ dá»¥ng grid-cols-1 md:grid-cols-3 Ä‘á»ƒ hiá»ƒn thá»‹ responsive hoÃ n háº£o.",
        "Táº¡o hiá»‡u á»©ng border-color chuyá»ƒn tiáº¿p mÆ°á»£t mÃ  khi hover vÃ o tháº» Ä‘á»‹nh nghÄ©a.",
        "Thiáº¿t láº­p click-to-reveal chi tiáº¿t mÃ  khÃ´ng táº£i láº¡i trang."
      ],
      checklistContentSEO: [
        "Äá»‹nh nghÄ©a rÃµ rÃ ng báº±ng ngÃ´n tá»« khoa há»c, dá»… hiá»ƒu á»Ÿ ngay 2 cÃ¢u Ä‘áº§u tiÃªn.",
        "Lá»“ng ghÃ©p tá»± nhiÃªn cÃ¡c tá»« khÃ³a phá»¥: 'tÆ° váº¥n chiáº¿n lÆ°á»£c', 'content pillar', 'ká»‹ch báº£n TikTok'."
      ]
    }
  },
  {
    id: 3,
    title: "KhÃ¡c gÃ¬ Ä‘Äƒng video ngáº«u nhiÃªn",
    slug: "khac-gi-dang-video-ngau-nhien",
    spec: {
      searchIntent: "KhÃ¡ch hÃ ng muá»‘n tá»± biá»‡n minh xem cÃ³ nÃªn tá»± lÃ m, tá»± Ä‘Äƒng theo cáº£m há»©ng hay pháº£i thuÃª agency bÃ i báº£n. Há» cáº§n tháº¥y sá»± lÃ£ng phÃ­ cá»§a viá»‡c Ä‘Äƒng video ngáº«u nhiÃªn Ä‘á»ƒ Ä‘Æ°a ra quyáº¿t Ä‘á»‹nh mua hÃ ng (CRO).",
      conceptUI: "Dual Column Comparison Table - Báº£ng so sÃ¡nh trá»±c quan cao cáº¥p, phÃ¢n chia cá»™t Ä‘á»/xÃ¡m nháº¡t (ÄÄƒng tá»± do) bÃªn trÃ¡i vÃ  cá»™t vÃ ng gold/tráº¯ng ngÃ  sÃ¡ng bÃ³ng (Äá»“ng hÃ nh cÃ¹ng PGS) bÃªn pháº£i.",
      hero3D: "Biá»ƒu tÆ°á»£ng 3D chiáº¿c cÃ¢n thÄƒng báº±ng báº±ng cháº¥t liá»‡u kim loáº¡i vÃ ng Ä‘Ã¡nh bÃ³ng (polished chrome & gold balance scale) nghiÃªng háº³n vá» phÃ­a giáº£i phÃ¡p tá»‘i Æ°u há»‡ thá»‘ng.",
      metaTitle: "So SÃ¡nh XÃ¢y KÃªnh TikTok Chiáº¿n LÆ°á»£c Vs ÄÄƒng Tá»± Do | PGS Agency",
      metaDescription: "Táº¡i sao Ä‘Äƒng video TikTok ngáº«u nhiÃªn khiáº¿n doanh nghiá»‡p máº¥t tiá»n quáº£ng cÃ¡o? HÃ£y xem báº£ng so sÃ¡nh chi tiáº¿t Ä‘á»ƒ hiá»ƒu sá»©c máº¡nh cá»§a há»‡ thá»‘ng pillar chuyá»ƒn Ä‘á»•i.",
      h1: "Sá»± khÃ¡c biá»‡t giá»¯a xÃ¢y kÃªnh chiáº¿n lÆ°á»£c vÃ  Ä‘Äƒng video ngáº«u nhiÃªn",
      h2AndH3: ["Táº¡i sao 90% doanh nghiá»‡p tháº¥t báº¡i khi tá»± xÃ¢y kÃªnh?", "Há»‡ thá»‘ng ná»™i dung dÃ i háº¡n tá»‘i Æ°u ROI"],
      internalLinkOut: ["/blog/sai-lam-xay-kenh"],
      internalLinkIn: ["/dich-vu/dich-vu-xay-kenh-tiktok"],
      schemaCode: `{
  "@context": "https://schema.org",
  "@type": "Table",
  "about": "So sÃ¡nh xÃ¢y kÃªnh TikTok chiáº¿n lÆ°á»£c vÃ  Ä‘Äƒng ngáº«u nhiÃªn"
}`,
      checklistDesigner: [
        "TrÃ¡nh thiáº¿t káº¿ báº£ng dá»¯ liá»‡u thÃ´ ká»‡ch máº·c Ä‘á»‹nh. HÃ£y bo gÃ³c báº£ng R=16px.",
        "Cá»™t PGS Agency pháº£i cÃ³ viá»n vÃ ng gold láº¥p lÃ¡nh nháº¹ vÃ  nhÃ£n 'KhuyÃªn dÃ¹ng' sang trá»ng.",
        "Sá»­ dá»¥ng cÃ¡c biá»ƒu tÆ°á»£ng checkmark mÆ°á»£t mÃ  vÃ  chá»¯ X tinh táº¿."
      ],
      checklistDeveloper: [
        "XÃ¢y dá»±ng báº£ng hoÃ n toÃ n báº±ng tháº» HTML semantic <table>, <thead>, <tbody>, <tr>, <td> Ä‘á»ƒ bot tÃ¬m kiáº¿m dá»… dÃ ng thu tháº­p.",
        "Äáº£m báº£o báº£ng cÃ³ thanh cuá»™n ngang (overflow-x-auto) trÃªn thiáº¿t bá»‹ di Ä‘á»™ng cÃ³ mÃ n hÃ¬nh siÃªu háº¹p."
      ],
      checklistContentSEO: [
        "DÃ¹ng ngÃ´n tá»« sáº¯c sáº£o cháº¡m Ä‘Ãºng ná»—i Ä‘au cá»§a CEO: 'cáº¡n kiá»‡t Ã½ tÆ°á»Ÿng', 'tá»‘n kÃ©m chi phÃ­', 'view áº£o khÃ´ng ra tiá»n'.",
        "ÄÆ°a ra sá»‘ liá»‡u Ä‘á»‘i chiáº¿u cá»¥ thá»ƒ nhÆ° 'Giá»¯ chÃ¢n ngÆ°á»i xem > 60%' so vá»›i '<10%'."
      ]
    }
  },
  {
    id: 4,
    title: "Khi nÃ o nÃªn xÃ¢y kÃªnh TikTok",
    slug: "khi-nao-nen-xay-kenh-tiktok",
    spec: {
      searchIntent: "Chá»§ doanh nghiá»‡p Ä‘ang Ä‘áº¯n Ä‘o tá»± há»i ngÃ nh cá»§a mÃ¬nh cÃ³ há»£p khÃ´ng, thá»i Ä‘iá»ƒm nÃ y lÃ m cÃ³ muá»™n quÃ¡ khÃ´ng, lÃ m TikTok cÃ³ áº£nh hÆ°á»Ÿng uy tÃ­n thÆ°Æ¡ng hiá»‡u cao cáº¥p khÃ´ng.",
      conceptUI: "Interactive Checklist Board - Bá»™ tháº» tá»± cháº©n Ä‘oÃ¡n (Self-diagnostic grid) vá»›i cÃ¡c cÃ¢u há»i tÆ°Æ¡ng tÃ¡c, ngÆ°á»i dÃ¹ng click chá»n triá»‡u chá»©ng vÃ  nháº­n lá»i khuyÃªn giáº£i phÃ¡p tá»©c thÃ¬.",
      hero3D: "Khá»‘i 3D Ä‘á»“ng há»“ cÃ¡t báº±ng thá»§y tinh trong suá»‘t (hourglass translucency), cÃ¡t cháº£y mÃ u vÃ ng gold má»‹n mÃ ng, bÃ¡o hiá»‡u thá»i cÆ¡ vÃ ng Ä‘Ã£ Ä‘áº¿n.",
      metaTitle: "Doanh Nghiá»‡p NÃ o Cáº§n XÃ¢y KÃªnh TikTok Ngay HÃ´m Nay? | PGS",
      metaDescription: "Khi nÃ o lÃ  thá»i cÆ¡ thÃ­ch há»£p Ä‘á»ƒ xÃ¢y kÃªnh TikTok thÆ°Æ¡ng hiá»‡u? ÄÃ¡nh giÃ¡ nhu cáº§u tÄƒng trÆ°á»Ÿng sá»‘, thu tháº­p data cháº¡y ads sáº¡ch vÃ  xÃ¢y thÆ°Æ¡ng hiá»‡u cÃ¡ nhÃ¢n CEO.",
      h1: "Khi nÃ o doanh nghiá»‡p vÃ  CEO báº¯t buá»™c pháº£i xÃ¢y kÃªnh TikTok?",
      h2AndH3: ["Bá»‘n tá»‡p Ä‘á»‘i tÆ°á»£ng cáº§n bá»©t phÃ¡ video ngáº¯n", "Tá»‘i Æ°u hÃ³a phá»…u dá»¯ liá»‡u quáº£ng cÃ¡o"],
      internalLinkOut: ["/ve-chung-toi"],
      internalLinkIn: ["/blog/xu-huong-video-ngan"],
      schemaCode: `{
  "@context": "https://schema.org",
  "@type": "CheckAction",
  "name": "ÄÃ¡nh giÃ¡ nhu cáº§u xÃ¢y kÃªnh TikTok doanh nghiá»‡p"
}`,
      checklistDesigner: [
        "Sá»­ dá»¥ng hover effect Ä‘á»•i mÃ u ná»n nháº¹ nhÃ ng tá»« tráº¯ng xÃ¡m sang vÃ ng kem nháº¡t.",
        "Khoáº£ng cÃ¡ch giá»¯a cÃ¡c checkbox tÆ°Æ¡ng tÃ¡c rá»™ng rÃ£i, kÃ­ch thÆ°á»›c cháº¡m ngÃ³n tay tá»‘i thiá»ƒu 44px trÃªn mobile."
      ],
      checklistDeveloper: [
        "Sá»­ dá»¥ng state trong React Ä‘á»ƒ tÃ­nh toÃ¡n tá»· lá»‡ pháº§n trÄƒm 'Sáºµn sÃ ng xÃ¢y kÃªnh' cá»§a khÃ¡ch hÃ ng dá»±a trÃªn sá»‘ cÃ¢u há» tÃ­ch chá»n.",
        "Táº¡o animation Ä‘áº¿m sá»‘ tÄƒng mÆ°á»£t mÃ  (animated counter) khi tá»· lá»‡ thay Ä‘á»•i."
      ],
      checklistContentSEO: [
        "Khai thÃ¡c Ä‘Ãºng cÃ¡c tá»‡p khÃ¡ch hÃ ng tiá»m nÄƒng cá»‘t lÃµi: 'B2B', 'NhÃ£n hÃ ng cao cáº¥p', 'CEO/Founder', 'ChuyÃªn gia chia sáº» kiáº¿n thá»©c'."
      ]
    }
  },
  {
    id: 5,
    title: "Äá»‹nh vá»‹ kÃªnh",
    slug: "dinh-vi-kenh",
    spec: {
      searchIntent: "KhÃ¡ch hÃ ng muá»‘n biáº¿t PGS sáº½ Ä‘á»‹nh vá»‹ kÃªnh cá»§a há» nhÆ° tháº¿ nÃ o. CÃ³ biáº¿n há» thÃ nh nhá»¯ng ngÆ°á»i nháº£y mÃºa lá»‘ lÄƒng trÃªn máº¡ng khÃ´ng, hay giá»¯ Ä‘Æ°á»£c hÃ¬nh áº£nh chuáº©n má»±c, uy tÃ­n cá»§a doanh nghiá»‡p.",
      conceptUI: "Positioning Matrix Board - Trá»±c quan hÃ³a báº£n Ä‘á»“ Ä‘á»‹nh vá»‹ kÃªnh. NgÆ°á»i dÃ¹ng báº¥m vÃ o tá»«ng tab ngÃ nh nghá» Ä‘á»ƒ xem bá»™ khung Ä‘á»‹nh vá»‹ thá»±c táº¿ Ä‘Æ°á»£c PGS thiáº¿t káº¿ máº«u.",
      hero3D: "Khá»‘i 3D la bÃ n vÃ ng cá»• Ä‘iá»ƒn (golden classic compass) quay mÆ°á»£t mÃ , mÅ©i kim chá»‰ chÃ­nh xÃ¡c vá» hÆ°á»›ng tÄƒng trÆ°á»Ÿng doanh thu.",
      metaTitle: "CÃ¡ch Äá»‹nh Vá»‹ KÃªnh TikTok Doanh Nghiá»‡p Chuáº©n Premium | PGS",
      metaDescription: "PGS Agency Ä‘á»‹nh hÃ¬nh tÃ­nh cÃ¡ch kÃªnh, xÃ¡c Ä‘á»‹nh tá»‡p Ä‘á»™c giáº£ vÃ  thiáº¿t káº¿ thÃ´ng Ä‘iá»‡p cá»‘t lÃµi giÃºp giá»¯ vá»¯ng uy tÃ­n thÆ°Æ¡ng hiá»‡u cao cáº¥p cá»§a CEO.",
      h1: "Chiáº¿n lÆ°á»£c Ä‘á»‹nh vá»‹ kÃªnh TikTok Ä‘á»™c báº£n cho tá»«ng thÆ°Æ¡ng hiá»‡u",
      h2AndH3: ["TÃ­nh cÃ¡ch ná»™i dung vÃ  giÃ¡ trá»‹ khÃ¡c biá»‡t", "NÃ³i chuyá»‡n vá»›i ai vÃ  nÃ³i báº±ng ngÃ´n ngá»¯ nÃ o?"],
      internalLinkOut: ["/dich-vu/dich-vu-seo"],
      internalLinkIn: ["/tin-tuc/dinh-vi-thuong-hieu-ca-nhan"],
      schemaCode: `{
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "Khung Ä‘á»‹nh vá»‹ kÃªnh TikTok doanh nghiá»‡p"
}`,
      checklistDesigner: [
        "Thiáº¿t káº¿ thanh tab chuyá»ƒn Ä‘á»•i sang trá»ng, sá»­ dá»¥ng Ä‘Æ°á»ng káº» line vÃ ng cháº¡y dÆ°á»›i tab Ä‘Æ°á»£c active.",
        "Ná»™i dung hiá»ƒn thá»‹ rÃµ rÃ ng trong cÃ¡c block há»™p bo trÃ²n viá»n vÃ ng má»ng má»m máº¡i."
      ],
      checklistDeveloper: [
        "Tá»‘i Æ°u hÃ³a chuyá»ƒn Ä‘á»•i tab báº±ng state React Ä‘á»ƒ Ä‘áº£m báº£o tá»©c thá»i, khÃ´ng giáº­t lag.",
        "Ãp dá»¥ng hiá»‡u á»©ng fade-in mÆ°á»£t cho pháº§n ná»™i dung thay Ä‘á»•i."
      ],
      checklistContentSEO: [
        "Ná»™i dung Ä‘á»‹nh vá»‹ pháº£i kháº³ng Ä‘á»‹nh triáº¿t lÃ½ thÆ°Æ¡ng hiá»‡u: 'Sá»± uy tÃ­n, chuyÃªn mÃ´n cao, nháº¥t quÃ¡n, minh báº¡ch'."
      ]
    }
  },
  {
    id: 6,
    title: "Content Pillar TikTok",
    slug: "content-pillar-tiktok",
    spec: {
      searchIntent: "Há» muá»‘n biáº¿t PGS cÃ³ há»‡ thá»‘ng quáº£n lÃ½ chá»§ Ä‘á» khoa há»c khÃ´ng, hay chá»‰ nghÄ© Ã½ tÆ°á»Ÿng theo ngÃ y rá»“i quay bá»™c phÃ¡t. Há» cáº§n tháº¥y mÃ´ hÃ¬nh phÃ¢n rÃ£ ná»™i dung.",
      conceptUI: "Content Pillar Orbit Visualization - SÆ¡ Ä‘á»“ quá»¹ Ä‘áº¡o tÆ°Æ¡ng tÃ¡c. á»ž tÃ¢m lÃ  ThÆ°Æ¡ng hiá»‡u, xung quanh lÃ  4 quá»¹ Ä‘áº¡o Ä‘áº¡i diá»‡n cho 4 Pillars cá»‘t lÃµi cÃ¹ng tá»· lá»‡ phÃ¢n phá»‘i vÃ ng.",
      hero3D: "MÃ´ hÃ¬nh 3D nguyÃªn tá»­ (Atomic orbit) vá»›i cÃ¡c háº¡t electron chuyá»ƒn Ä‘á»™ng mÆ°á»£t mÃ  báº±ng cháº¥t liá»‡u vÃ ng gold vÃ  kÃ­nh thá»§y tinh trong suá»‘t.",
      metaTitle: "XÃ¢y Dá»±ng Cáº¥u TrÃºc Content Pillar TikTok Doanh Nghiá»‡p | PGS",
      metaDescription: "CÃ´ng thá»©c phÃ¢n chia tá»· lá»‡ vÃ ng 40-25-20-15 cÃ¡c nhÃ³m chá»§ Ä‘á» TikTok tá»« PGS Agency giÃºp kÃªnh tÄƒng uy tÃ­n bá»n vá»¯ng vÃ  ra Ä‘Æ¡n tá»± nhiÃªn.",
      h1: "Quy hoáº¡ch há»‡ thá»‘ng Content Pillar TikTok khoa há»c",
      h2AndH3: ["CÃ´ng thá»©c tá»· lá»‡ vÃ ng phÃ¢n phá»‘i ná»™i dung", "CÆ¡ cáº¥u chá»§ Ä‘á» thu hÃºt phá»…u khÃ¡ch hÃ ng tiá»m nÄƒng"],
      internalLinkOut: ["/dich-vu/content-social"],
      internalLinkIn: ["/blog/phuong-phap-viet-kich-ban"],
      schemaCode: `{
  "@context": "https://schema.org",
  "@type": "DataCatalog",
  "name": "Há»‡ thá»‘ng Content Pillar PGS"
}`,
      checklistDesigner: [
        "Trá»±c quan hÃ³a vÃ²ng trÃ²n orbit tá»· lá»‡ pháº§n trÄƒm báº±ng mÃ u sáº¯c phÃ¢n cáº¥p rÃµ rÃ ng (vÃ ng Ä‘áº­m, vÃ ng nháº¡t, xÃ¡m than, xÃ¡m nháº¡t).",
        "Hiá»ƒn thá»‹ card tooltip sáº¯c nÃ©t khi hover vÃ o cÃ¡c phÃ¢n vÃ¹ng tá»· lá»‡."
      ],
      checklistDeveloper: [
        "Sá»­ dá»¥ng biá»ƒu Ä‘á»“ trÃ²n Recharts hoáº·c SVG váº½ tay tinh xáº£o Ä‘á»ƒ tÆ°Æ¡ng tÃ¡c trá»±c tiáº¿p.",
        "Táº¡o hiá»‡u á»©ng náº£y nháº¹ (pulse/scale) khi hover vÃ o tá»«ng pillar."
      ],
      checklistContentSEO: [
        "LÃ m rÃµ vai trÃ² tá»«ng pillar: 'GiÃ¡o dá»¥c ná»—i Ä‘au (40%)', 'Case study uy tÃ­n (25%)', 'Háº­u trÆ°á»ng (20%)', 'BÃ¡n hÃ ng tinh táº¿ (15%)'."
      ]
    }
  },
  {
    id: 7,
    title: "Format Series",
    slug: "format-series",
    spec: {
      searchIntent: "NgÆ°á»i xem lÆ°á»›t TikTok theo thÃ³i quen xem tiáº¿p táº­p sau. KhÃ¡ch hÃ ng muá»‘n tháº¥y PGS quy hoáº¡ch cÃ¡c Series ná»™i dung cuá»‘n hÃºt nhÆ° phim truyá»n hÃ¬nh Ä‘á»ƒ nÃ­u chÃ¢n ngÆ°á»i dÃ¹ng nhÆ° tháº¿ nÃ o.",
      conceptUI: "Series Roadmap Map - Báº£n Ä‘á»“ lá»™ trÃ¬nh cÃ¡c táº­p phim dÃ i háº¡n. Trá»±c quan hÃ³a chuá»—i video káº¿t ná»‘i cháº·t cháº½ theo chiá»u dá»c thá»i gian.",
      hero3D: "MÃ´ hÃ¬nh cuá»™n phim Ä‘iá»‡n áº£nh 3D máº¡ vÃ ng gold bÃ³ng (golden cinema film roll) má»Ÿ nháº¹ ra, biá»ƒu thá»‹ cho tÃ­nh liÃªn tá»¥c nghá»‡ thuáº­t.",
      metaTitle: "Thiáº¿t Káº¿ Series Ká»‹ch Báº£n TikTok Cuá»‘n HÃºt Nháº¥t | PGS Agency",
      metaDescription: "BÃ­ quyáº¿t giá»¯ chÃ¢n khÃ¡ch hÃ ng lÆ°á»›t xem liÃªn tá»¥c hÃ ng loáº¡t video ngáº¯n báº±ng cÃ¡ch quy hoáº¡ch Series Pillar thÃ´ng minh cá»§a PGS Agency.",
      h1: "Quy hoáº¡ch Series video - VÅ© khÃ­ giá»¯ chÃ¢n khÃ¡ch hÃ ng tá»‘i thÆ°á»£ng",
      h2AndH3: ["Sá»©c máº¡nh cá»§a tÃ­nh liÃªn tá»¥c ná»™i dung", "Thiáº¿t káº¿ chuá»—i hÃ nh trÃ¬nh tráº£i nghiá»‡m ngÆ°á»i xem"],
      internalLinkOut: ["/dich-vu/social-media"],
      internalLinkIn: ["/dich-vu/dich-vu-xay-kenh-tiktok"],
      schemaCode: `{
  "@context": "https://schema.org",
  "@type": "CreativeWorkSeries",
  "name": "Chuá»—i Series ká»‹ch báº£n TikTok doanh nghiá»‡p"
}`,
      checklistDesigner: [
        "Thiáº¿t káº¿ Ä‘Æ°á»ng line nÃ©t Ä‘á»©t vÃ ng cháº¡y dá»c káº¿t ná»‘i cÃ¡c Ä‘iá»ƒm má»‘c táº­p video (Timeline style).",
        "CÃ¡c má»‘c táº­p phim sá»­ dá»¥ng kiá»ƒu dÃ¡ng bento card tinh táº¿, thoÃ¡ng máº¯t."
      ],
      checklistDeveloper: [
        "Sá»­ dá»¥ng CSS grid vÃ  scroll reveal Ä‘á»ƒ cÃ¡c táº­p phim xuáº¥t hiá»‡n tuáº§n tá»± khi cuá»™n mÃ n hÃ¬nh.",
        "Thiáº¿t láº­p hiá»‡u á»©ng hover zoom mÆ°á»£t mÃ  trÃªn tá»«ng cháº·ng timeline."
      ],
      checklistContentSEO: [
        "Lá»“ng ghÃ©p thuáº­t ngá»¯ 'Series map', 'quy hoáº¡ch ná»™i dung dÃ i háº¡n', 'giá»¯ chÃ¢n ngÆ°á»i xem (retention rate)'."
      ]
    }
  },
  {
    id: 8,
    title: "Hook & CTA",
    slug: "hook-and-cta",
    spec: {
      searchIntent: "KhÃ¡ch hÃ ng muá»‘n tháº¥y kháº£ nÄƒng sÃ¡ng táº¡o cÃ¢u tá»« thá»±c táº¿ cá»§a PGS. Há» muá»‘n tráº£i nghiá»‡m trá»±c tiáº¿p viá»‡c viáº¿t má»™t tiÃªu Ä‘á» giáº­t gÃ¢n, khÆ¡i gá»£i tÃ² mÃ² thu hÃºt leads.",
      conceptUI: "Interactive Hook Engine Workspace - CÃ´ng cá»¥ táº¡o hook thÃ´ng minh. TrÃ¬nh diá»…n cÃ¡c cÃ´ng thá»©c viáº¿t hook chuáº©n cÃ¹ng má»™t khung giáº£ láº­p Ä‘iá»‡n thoáº¡i hiá»ƒn thá»‹ chá»¯ cháº¡y trá»±c tiáº¿p.",
      hero3D: "MÃ´ hÃ¬nh chiáº¿c mÃ³c cÃ¢u 3D báº±ng vÃ ng Ä‘Ãºc cao cáº¥p (golden hook engine) lÆ¡ lá»­ng giá»¯a cÃ¡c háº¡t bá»¥i Ã¡nh sÃ¡ng sang trá»ng.",
      metaTitle: "CÃ´ng Thá»©c Viáº¿t Hook 3 GiÃ¢y Äáº§u Thu HÃºt Leads TikTok | PGS",
      metaDescription: "Tráº£i nghiá»‡m cÃ´ng cá»¥ táº¡o tiÃªu Ä‘á» video ngáº¯n (Hook) thu hÃºt ngay láº­p tá»©c theo chuáº©n PGS Agency. Tá»‘i Æ°u tá»· lá»‡ nháº¥p chuá»™t vÃ  giá»¯ chÃ¢n.",
      h1: "Nghá»‡ thuáº­t viáº¿t Hook & CTA Ä‘á»™t phÃ¡ chuyá»ƒn Ä‘á»•i",
      h2AndH3: ["Giáº£i mÃ£ 3 giÃ¢y Ä‘áº§u quyáº¿t Ä‘á»‹nh sinh tá»­ video ngáº¯n", "KÃªu gá»i hÃ nh Ä‘á»™ng khÃ©o lÃ©o Ä‘á»ƒ thu leads cháº¥t lÆ°á»£ng"],
      internalLinkOut: ["/blog/bi-quyet-viet-hook"],
      internalLinkIn: ["/dich-vu/dich-vu-xay-kenh-tiktok"],
      schemaCode: `{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "PGS Hook Engine API Client"
}`,
      checklistDesigner: [
        "Thiáº¿t káº¿ báº£ng Ä‘iá»u khiá»ƒn táº¡o hook giá»‘ng cÃ´ng cá»¥ SaaS cao cáº¥p.",
        "VÃ¹ng káº¿t quáº£ tráº£ vá» hiá»ƒn thá»‹ sang trá»ng bÃªn trong khung mÃ´ phá»ng mÃ n hÃ¬nh Ä‘iá»‡n thoáº¡i TikTok viá»n má» áº£o."
      ],
      checklistDeveloper: [
        "TÃ­ch há»£p API Route `/api/gemini/generate` Ä‘á»ƒ gá»i model `gemini-3.5-flash` xá»­ lÃ½ prompt táº¡o Hook theo thá»i gian thá»±c.",
        "Táº¡o hiá»‡u á»©ng skeleton loading viá»n nháº¥p nhÃ¡y sang trá»ng khi chá» API pháº£n há»“i.",
        "Xá»­ lÃ½ lá»—i máº¥t máº¡ng hoáº·c thiáº¿u API key báº±ng cÃ¡ch tráº£ vá» dá»¯ liá»‡u fallback chuáº©n Ä‘Ã£ soáº¡n sáºµn á»Ÿ `/lib/data.ts` khÃ´ng lÃ m Ä‘á»©t gÃ£y tráº£i nghiá»‡m ngÆ°á»i dÃ¹ng."
      ],
      checklistContentSEO: [
        "PhÃ¢n tÃ­ch rÃµ cáº¥u trÃºc tÃ¢m lÃ½ há»c hÃ nh vi Ä‘áº±ng sau cÃ¡c hook: 'Loss aversion', 'Curiosity gap', 'Proof-driven'."
      ]
    }
  },
  {
    id: 9,
    title: "Ká»‹ch báº£n Video",
    slug: "kich-ban-video",
    spec: {
      searchIntent: "Há» tÃ² mÃ² muá»‘n biáº¿t PGS viáº¿t má»™t ká»‹ch báº£n 60 giÃ¢y nhÆ° tháº¿ nÃ o, cáº¥u trÃºc ra sao, lá»i thoáº¡i cÃ³ tá»± nhiÃªn khÃ´ng, lÃ m sao lá»“ng ghÃ©p quáº£ng cÃ¡o thÆ°Æ¡ng hiá»‡u mÃ  khÃ´ng gÃ¢y khÃ³ chá»‹u.",
      conceptUI: "Interactive Script Blueprint Builder - Báº£ng phÃ¢n tÃ­ch cáº¥u trÃºc ká»‹ch báº£n theo trá»¥c dá»c thá»i gian. NgÆ°á»i dÃ¹ng cÃ³ thá»ƒ chá»n cÃ¡c má»¥c tiÃªu chuyá»ƒn Ä‘á»•i khÃ¡c nhau Ä‘á»ƒ xem cáº¥u trÃºc ká»‹ch báº£n thay Ä‘á»•i tÆ°Æ¡ng á»©ng.",
      hero3D: "MÃ´ hÃ¬nh cuá»‘n sÃ¡ch ká»‹ch báº£n báº±ng da viá»n máº¡ vÃ ng 3D (golden notebook) má»Ÿ ra, toÃ¡t lÃªn sá»± tá»‰ má»‰ cá»§a biÃªn ká»‹ch.",
      metaTitle: "Máº«u Ká»‹ch Báº£n TikTok Doanh Nghiá»‡p 60s Chuyá»ƒn Äá»•i Cao | PGS",
      metaDescription: "Xem cáº¥u trÃºc ká»‹ch báº£n video TikTok 60 giÃ¢y chuáº©n PGS Agency. CÃ´ng thá»©c Hook-Problem-Insight-Solution-Example-CTA tá»‘i Æ°u hÃ³a phá»…u leads.",
      h1: "Cáº¥u trÃºc ká»‹ch báº£n video ngáº¯n giá»¯ chÃ¢n ngÆ°á»i xem 80%",
      h2AndH3: ["CÃ´ng thá»©c biÃªn ká»‹ch Ä‘á»™c quyá»n táº¡i PGS Agency", "PhÃ¢n rÃ£ ká»‹ch báº£n chi tiáº¿t Ä‘áº¿n tá»«ng mili-giÃ¢y"],
      internalLinkOut: ["/blog/phuong-phap-viet-kich-ban"],
      internalLinkIn: ["/dich-vu/dich-vu-xay-kenh-tiktok"],
      schemaCode: `{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Quy trÃ¬nh biÃªn soáº¡n ká»‹ch báº£n TikTok chuyá»ƒn Ä‘á»•i"
}`,
      checklistDesigner: [
        "Sá»­ dá»¥ng báº£ng phÃ¢n chia cá»™t rÃµ rÃ ng: Lá»i thoáº¡i (Spoken Text), HÃ nh Ä‘á»™ng (Visual Action), Ã‚m thanh (Audio/SFX).",
        "CÃ³ thanh trÆ°á»£t tiáº¿n trÃ¬nh (progress bar) thá»ƒ hiá»‡n dÃ²ng cháº£y thá»i gian cá»§a video."
      ],
      checklistDeveloper: [
        "LiÃªn káº¿t ká»‹ch báº£n Ä‘á»™ng vá»›i API Route `/api/gemini/generate` Ä‘á»ƒ ngÆ°á»i dÃ¹ng tá»± gÃµ Ä‘á» tÃ i vÃ  táº¡o ká»‹ch báº£n nguyÃªn báº£n tá»©c thÃ¬.",
        "Sá»­ dá»¥ng cÃ¡c component chuyá»ƒn Ä‘á»™ng nháº¹ nhÃ ng Ä‘á»ƒ minh há»a viá»‡c kÃ©o dÃ i/co ngáº¯n cÃ¡c phÃ¢n Ä‘oáº¡n video."
      ],
      checklistContentSEO: [
        "NÃªu báº­t sá»± quan trá»ng cá»§a 'Insight' vÃ  'Giáº£i phÃ¡p thá»±c táº¿' thay vÃ¬ chá»‰ nÃ³i nhá»¯ng cÃ¢u tÃ o lao sÃ¡o rá»—ng trÃªn máº¡ng."
      ]
    }
  },
  {
    id: 10,
    title: "Lá»‹ch Ä‘Äƒng",
    slug: "lich-dang",
    spec: {
      searchIntent: "Há» muá»‘n biáº¿t viá»‡c triá»ƒn khai cÃ³ Ä‘Æ°á»£c láº­p káº¿ hoáº¡ch rÃµ rÃ ng, khoa há»c khÃ´ng, hay agency lÃ m viá»‡c theo kiá»ƒu tÃ¹y há»©ng, trá»… náº£i deadline. Há» muá»‘n tháº¥y tÃ­nh ká»· luáº­t váº­n hÃ nh.",
      conceptUI: "Interactive Video Calendar Board - Giao diá»‡n lá»‹ch sáº£n xuáº¥t Kanban/Calendar 3D pháº³ng tuyá»‡t Ä‘áº¹p. Hiá»ƒn thá»‹ lá»‹ch Ä‘Äƒng bÃ i chi tiáº¿t trong tuáº§n vá»›i tráº¡ng thÃ¡i rÃµ rÃ ng (LÃªn ká»‹ch báº£n, Sáº¯p quay, BiÃªn táº­p háº­u ká»³, ÄÃ£ xuáº¥t báº£n).",
      hero3D: "MÃ´ hÃ¬nh táº¥m lá»‹ch Ä‘á»ƒ bÃ n báº±ng kÃ­nh trong suá»‘t (translucent calendar board) vá»›i chiáº¿c ghim vÃ ng láº¥p lÃ¡nh ghim vÃ o ngÃ y Ä‘Äƒng bÃ i.",
      metaTitle: "Lá»‹ch ÄÄƒng Video TikTok Doanh Nghiá»‡p Khoa Há»c | PGS Agency",
      metaDescription: "TÃ¬m hiá»ƒu cÃ¡ch thiáº¿t láº­p lá»‹ch Ä‘Äƒng video TikTok Ä‘á»u Ä‘áº·n theo tuáº§n vÃ  thÃ¡ng cá»§a PGS Agency Ä‘á»ƒ duy trÃ¬ thuáº­t toÃ¡n Ä‘á» xuáº¥t tá»‘t nháº¥t.",
      h1: "Há»‡ thá»‘ng láº­p lá»‹ch sáº£n xuáº¥t vÃ  Ä‘Äƒng bÃ i ká»· luáº­t",
      h2AndH3: ["Äáº£m báº£o táº§n suáº¥t xuáº¥t báº£n video Ä‘á»u Ä‘áº·n", "Tá»‘i Æ°u hÃ³a thá»i gian Ä‘Äƒng táº£i chuáº©n thuáº­t toÃ¡n"],
      internalLinkOut: ["/dich-vu/social-media"],
      internalLinkIn: ["/tin-tuc/thuat-toan-tiktok-moi-nhat"],
      schemaCode: `{
  "@context": "https://schema.org",
  "@type": "Schedule",
  "name": "Lá»‹ch phÃ¡t sÃ³ng TikTok PGS"
}`,
      checklistDesigner: [
        "Bá»‘ cá»¥c lá»‹ch 7 ngÃ y trong tuáº§n dáº¡ng lÆ°á»›i náº±m ngang thoÃ¡ng máº¯t trÃªn PC, cuá»™n dá»c trÃªn Ä‘iá»‡n thoáº¡i.",
        "Má»—i Ã´ lá»‹ch hiá»ƒn thá»‹ nhÃ£n dÃ¡n pillar mÃ u sáº¯c trang nhÃ£, phÃ¢n biá»‡t rÃµ loáº¡i ná»™i dung."
      ],
      checklistDeveloper: [
        "Táº¡o pop-up modal mÆ°á»£t mÃ  khi ngÆ°á»i dÃ¹ng click chá»n má»™t ngÃ y Ä‘Äƒng Ä‘á»ƒ xem chi tiáº¿t ká»‹ch báº£n, ghi chÃº Ä‘áº¡o diá»…n vÃ  file dá»±ng phim.",
        "TÃ­ch há»£p cÃ¡c badge tráº¡ng thÃ¡i sá»‘ng Ä‘á»™ng (active, pending, done) Ä‘á»“ng bá»™ vá»›i tailwind."
      ],
      checklistContentSEO: [
        "LÃ m rÃµ táº§n suáº¥t Ä‘Äƒng bÃ i tá»‘i Æ°u: 'Tá»‘i thiá»ƒu 3 video/tuáº§n', 'Khung giá» vÃ ng 11h30 vÃ  19h30'."
      ]
    }
  },
  {
    id: 11,
    title: "KPI TikTok Channel",
    slug: "kpi-tiktok-channel",
    spec: {
      searchIntent: "Há» muá»‘n biáº¿t agency sáº½ Ä‘o lÆ°á»ng káº¿t quáº£ báº±ng cÃ¡c chá»‰ sá»‘ gÃ¬. PGS cÃ³ cam káº¿t lÆ°á»£t xem áº£o khÃ´ng hay táº­p trung vÃ o tá»‡p khÃ¡ch hÃ ng tiá»m nÄƒng Ä‘Äƒng kÃ½ thá»±c sá»± vÃ  lÆ°á»£t nháº¥p link (CPA/leads).",
      conceptUI: "Interactive KPI Dashboard - Dashboard phÃ¢n tÃ­ch thá»i gian thá»±c vá»›i cÃ¡c biá»ƒu Ä‘á»“ cá»™t, biá»ƒu Ä‘á»“ Ä‘Æ°á»ng váº½ sáº¯c nÃ©t hiá»ƒn thá»‹: follower growth, retention rate, profile clicks, vÃ  lead capture count.",
      hero3D: "Biá»ƒu Ä‘á»“ cá»™t 3D báº±ng kÃ­nh má» sÃ¡ng (glowing light glass bar chart) tÄƒng dáº§n, cá»™t cao nháº¥t lÃ m báº±ng vÃ ng gold metallic, tÆ°á»£ng trÆ°ng cho tÄƒng trÆ°á»Ÿng Ä‘á»™t phÃ¡.",
      metaTitle: "Há»‡ Thá»‘ng Äo LÆ°á»ng KPI KÃªnh TikTok Doanh Nghiá»‡p | PGS",
      metaDescription: "PGS Agency táº­p trung Ä‘o lÆ°á»ng cÃ¡c chá»‰ sá»‘ kinh doanh thá»±c táº¿ cá»§a kÃªnh TikTok: Tá»· lá»‡ giá»¯ chÃ¢n ngÆ°á»i xem, lÆ°á»£t click bio vÃ  tá»‡p lead cháº¥t lÆ°á»£ng.",
      h1: "Äo lÆ°á»ng KPI thá»±c táº¿ - Táº­p trung vÃ o káº¿t quáº£ kinh doanh",
      h2AndH3: ["NÃ³i khÃ´ng vá»›i lÆ°á»£t xem áº£o vÃ´ nghÄ©a", "Theo dÃµi dÃ²ng cháº£y chuyá»ƒn Ä‘á»•i ngÆ°á»i xem thÃ nh khÃ¡ch hÃ ng"],
      internalLinkOut: ["/ve-chung-toi"],
      internalLinkIn: ["/dich-vu/tiktok-ads"],
      schemaCode: `{
  "@context": "https://schema.org",
  "@type": "Observation",
  "name": "Há»‡ thá»‘ng chá»‰ sá»‘ KPI TikTok Doanh nghiá»‡p"
}`,
      checklistDesigner: [
        "Sá»­ dá»¥ng cÃ¡c gam mÃ u trung tÃ­nh cao cáº¥p lÃ m ná»n cho dashboard, Ä‘iá»ƒm xuyáº¿t vÃ ng gold lÃ m mÃ u biá»ƒu Ä‘á»“ chÃ­nh.",
        "Thiáº¿t káº¿ font chá»¯ dáº¡ng JetBrains Mono hoáº·c font chá»¯ ká»¹ thuáº­t sá»‘ cho cÃ¡c Ã´ sá»‘ liá»‡u Ä‘á»ƒ tÄƒng tÃ­nh chÃ­nh xÃ¡c cÃ´ng nghá»‡."
      ],
      checklistDeveloper: [
        "TÃ­ch há»£p thÆ° viá»‡n Recharts váº½ biá»ƒu Ä‘á»“ Ä‘Æ°á»ng sáº¯c nÃ©t trÃªn React.",
        "Táº¡o hiá»‡u á»©ng váº½ Ä‘á»“ thá»‹ mÆ°á»£t mÃ  khi ngÆ°á»i dÃ¹ng load trang láº§n Ä‘áº§u."
      ],
      checklistContentSEO: [
        "Giáº£i thÃ­ch rÃµ Ã½ nghÄ©a cá»§a tá»«ng KPI: 'Retention rate (Tá»· lá»‡ giá»¯ chÃ¢n)', 'Profile click (Tá»· lá»‡ tÃ¬m hiá»ƒu)', 'CPA (Chi phÃ­ thu lead)'."
      ]
    }
  },
  {
    id: 12,
    title: "Dá»± Ã¡n thá»±c táº¿ TikTok Channel",
    slug: "du-an-thuc-te-tiktok-channel",
    spec: {
      searchIntent: "KhÃ¡ch hÃ ng cáº§n báº±ng chá»©ng chá»©ng minh PGS Ä‘Ã£ tá»«ng lÃ m thÃ nh cÃ´ng cho ai chÆ°a, hay chá»‰ nÃ³i lÃ½ thuyáº¿t suÃ´ng trÃªn website. Há» tÃ¬m kiáº¿m cÃ¡c Case Studies sÃ¡t sÆ°á»n vá»›i ngÃ nh hÃ ng cá»§a há».",
      conceptUI: "Real Case Studies Showcase - Bá»‘ cá»¥c bento lá»›n trÆ°ng bÃ y cÃ¡c case study thÃ nh cÃ´ng thá»±c táº¿ cá»§a PGS kÃ¨m hÃ¬nh áº£nh sáº¯c nÃ©t, biá»ƒu Ä‘á»“ tÄƒng trÆ°á»Ÿng sá»‘ vÃ  lá»i bÃ¬nh luáº­n tá»« Ä‘áº¡i diá»‡n doanh nghiá»‡p Ä‘á»‘i tÃ¡c.",
      hero3D: "Biá»ƒu tÆ°á»£ng 3D chiáº¿c cÃºp chiáº¿n tháº¯ng máº¡ vÃ ng gold (golden victory trophy) pháº£n chiáº¿u Ã¡nh sÃ¡ng dá»‹u nháº¹.",
      metaTitle: "Case Studies XÃ¢y KÃªnh TikTok Doanh Nghiá»‡p ThÃ nh CÃ´ng | PGS",
      metaDescription: "KhÃ¡m phÃ¡ cÃ¡c cÃ¢u chuyá»‡n thÃ nh cÃ´ng thá»±c táº¿ tá»« PGS Agency. Doanh nghiá»‡p B2B, Tháº©m má»¹, Thá»i trang tÄƒng leads vÆ°á»£t trá»™i nhá» video cÃ³ Ä‘á»‹nh hÆ°á»›ng.",
      h1: "Báº±ng chá»©ng thÃ nh cÃ´ng thá»±c táº¿ tá»« nhá»¯ng chiáº¿n dá»‹ch xÃ¢y kÃªnh bÃ i báº£n",
      h2AndH3: ["Nhá»¯ng con sá»‘ biáº¿t nÃ³i tá»« Ä‘á»‘i tÃ¡c cá»§a PGS", "HÃ nh trÃ¬nh bá»©t phÃ¡ doanh sá»‘ qua video ngáº¯n"],
      internalLinkOut: ["/ve-chung-toi"],
      internalLinkIn: ["/tin-tuc/case-study-logitech"],
      schemaCode: `{
  "@context": "https://schema.org",
  "@type": "CaseStudy",
  "name": "Dá»± Ã¡n XÃ¢y kÃªnh TikTok Dr. Minh Tuáº¥n"
}`,
      checklistDesigner: [
        "Má»—i tháº» dá»± Ã¡n cÃ³ layout phÃ¢n chia rÃµ rÃ ng: 1 bÃªn hÃ¬nh áº£nh Ä‘iá»‡n thoáº¡i Ä‘ang cháº¡y video, 1 bÃªn lÃ  báº£ng chá»‰ sá»‘ KPI lá»›n sáº¯c nÃ©t.",
        "Sá»­ dá»¥ng shadow má»ng, nháº¹ vÃ  khoáº£ng viá»n lá» rá»™ng rÃ£i."
      ],
      checklistDeveloper: [
        "Táº¡o hiá»‡u á»©ng cuá»™n ngang (horizontal carousel) trÃªn thiáº¿t bá»‹ mobile Ä‘á»ƒ lÆ°á»›t qua cÃ¡c case study.",
        "Xá»­ lÃ½ lazy loading cho toÃ n bá»™ hÃ¬nh áº£nh dá»± Ã¡n báº±ng Next.js Image Ä‘á»ƒ tÄƒng tá»‘c Ä‘á»™ load trang tá»‘i Ä‘a."
      ],
      checklistContentSEO: [
        "Viáº¿t chi tiáº¿t cÃ¢u chuyá»‡n háº­u trÆ°á»ng cá»§a má»—i case study: Váº¥n Ä‘á» ban Ä‘áº§u lÃ  gÃ¬ -> PGS Ä‘Ã£ giáº£i quyáº¿t tháº¿ nÃ o -> Káº¿t quáº£ thu vá» cá»¥ thá»ƒ ra sao."
      ]
    }
  },
  {
    id: 13,
    title: "GÃ³i dá»‹ch vá»¥",
    slug: "goi-dich-vu",
    spec: {
      searchIntent: "KhÃ¡ch hÃ ng muá»‘n biáº¿t giÃ¡ cáº£ cÃ³ minh báº¡ch khÃ´ng, cÃ¡c gÃ³i dá»‹ch vá»¥ cÃ³ phÃ¹ há»£p vá»›i tÃºi tiá»n vÃ  má»¥c tiÃªu phÃ¡t triá»ƒn cá»§a doanh nghiá»‡p há» khÃ´ng. Há» cáº§n má»™t ROI Calculator Æ°á»›c tÃ­nh lá»£i Ã­ch nháº­n vá».",
      conceptUI: "Premium Pricing & ROI Estimator Board - Báº£ng giÃ¡ 3 cá»™t cao cáº¥p, cá»™t chÃ­nh giá»¯a 'Channel Builder' ná»•i báº­t sang trá»ng nháº¥t. BÃªn dÆ°á»›i lÃ  bá»™ cÃ´ng cá»¥ trÆ°á»£t tÃ­nh toÃ¡n ROI trá»±c quan cho khÃ¡ch hÃ ng.",
      hero3D: "Khá»‘i 3D chiáº¿c mÃ¡y tÃ­nh káº¿ toÃ¡n báº±ng kÃ­nh vÃ  vÃ ng gold (golden mechanical calculator) lÆ¡ lá»­ng, hiá»ƒn thá»‹ cÃ¡c con sá»‘ doanh sá»‘ tÄƒng dáº§n.",
      metaTitle: "Báº£ng GiÃ¡ Dá»‹ch Vá»¥ XÃ¢y KÃªnh TikTok Trá»n GÃ³i | PGS Agency",
      metaDescription: "KhÃ¡m phÃ¡ 3 gÃ³i dá»‹ch vá»¥ xÃ¢y kÃªnh TikTok cá»§a PGS: Strategy, Channel Builder, Content System. TÃ­ch há»£p cÃ´ng cá»¥ tÃ­nh toÃ¡n ROI chÃ­nh xÃ¡c.",
      h1: "CÃ¡c giáº£i phÃ¡p xÃ¢y dá»±ng kÃªnh TikTok Ä‘o ni Ä‘Ã³ng giÃ y cho doanh nghiá»‡p",
      h2AndH3: ["BÃ¡o giÃ¡ minh báº¡ch khÃ´ng phÃ¡t sinh chi phÃ­", "CÃ´ng cá»¥ Æ°á»›c lÆ°á»£ng ROI vÃ  doanh sá»‘ tá»« kÃªnh TikTok"],
      internalLinkOut: ["/ve-chung-toi"],
      internalLinkIn: ["/dich-vu/dich-vu-xay-kenh-tiktok"],
      schemaCode: `{
  "@context": "https://schema.org",
  "@type": "PriceSpecification",
  "priceCurrency": "VND",
  "valueAddedTaxIncluded": true
}`,
      checklistDesigner: [
        "Cá»™t dá»‹ch vá»¥ ná»•i báº­t (Channel Builder) cÃ³ Ä‘Æ°á»ng viá»n vÃ ng láº¥p lÃ¡nh nháº¹ bao quanh, kÃ¨m nhÃ£n dÃ¡n tag 'KhuyÃªn dÃ¹ng' á»Ÿ gÃ³c pháº£i phÃ­a trÃªn.",
        "Bá»™ trÆ°á»£t tÃ­nh toÃ¡n (Sliders) thiáº¿t káº¿ nÃºt kÃ©o vÃ ng trÃ²n, cÃ¡c chá»¯ sá»‘ to rÃµ rÃ ng dá»… Ä‘á»c."
      ],
      checklistDeveloper: [
        "Sá»­ dá»¥ng React state liÃªn káº¿t Ä‘á»™ng giá»¯a cÃ¡c thanh trÆ°á»£t (Expected Views, Conversion Rate) Ä‘á»ƒ tÃ­nh toÃ¡n tá»± Ä‘á»™ng sá»‘ lÆ°á»£ng Lead tiá»m nÄƒng vÃ  Doanh thu Æ°á»›c tÃ­nh.",
        "Thiáº¿t láº­p cÆ¡ cháº¿ chuyá»ƒn tiáº¿p tab hoáº·c báº¥m chá»n gÃ³i dá»‹ch vá»¥ Ä‘á»ƒ tá»± Ä‘á»™ng cuá»™n xuá»‘ng pháº§n form Ä‘Äƒng kÃ½ liÃªn há»‡."
      ],
      checklistContentSEO: [
        "BÃ¡o giÃ¡ chi tiáº¿t, rÃµ rÃ ng tá»«ng háº¡ng má»¥c cá»¥ thá»ƒ Ä‘á»ƒ khÃ¡ch hÃ ng dá»… dÃ ng so sÃ¡nh."
      ]
    }
  },
  {
    id: 14,
    title: "FAQ má»Ÿ rá»™ng",
    slug: "faq-mo-rong",
    spec: {
      searchIntent: "KhÃ¡ch hÃ ng tÃ¬m kiáº¿m cÃ¢u tráº£ lá»i cho cÃ¡c tháº¯c máº¯c chuyÃªn sÃ¢u, phÃ¡p lÃ½, cam káº¿t cháº¥t lÆ°á»£ng hoáº·c quy trÃ¬nh lÃ m viá»‡c thá»±c táº¿ trÆ°á»›c khi nháº¥c mÃ¡y liÃªn há»‡ PGS.",
      conceptUI: "Smooth Accordion Board - Há»‡ thá»‘ng cÃ¢u há»i Ä‘Ã¡p dáº¡ng xáº¿p gáº¥p accordion, khung ná»n tráº¯ng ngÃ  bÃ³ng báº©y, viá»n vÃ ng gold má»ng 1px sang trá»ng, Ä‘Ã³ng má»Ÿ cá»±c ká»³ mÆ°á»£t mÃ .",
      hero3D: "Biá»ƒu tÆ°á»£ng 3D dáº¥u cháº¥m há»i báº±ng thá»§y tinh há»¯u cÆ¡ láº¥p lÃ¡nh Ã¡nh vÃ ng (translucent glowing golden question mark) trÃ´i bá»“ng bá»nh tá»± do.",
      metaTitle: "Há»i ÄÃ¡p ChuyÃªn SÃ¢u Dá»‹ch Vá»¥ XÃ¢y KÃªnh TikTok | PGS Agency",
      metaDescription: "Giáº£i Ä‘Ã¡p táº¥t cáº£ cÃ¡c bÄƒn khoÄƒn vá» quy trÃ¬nh xÃ¢y kÃªnh TikTok doanh nghiá»‡p, báº£n quyá»n ká»‹ch báº£n, thá»i gian ra leads vÃ  cam káº¿t tá»« PGS.",
      h1: "Nhá»¯ng cÃ¢u há»i thÆ°á»ng gáº·p khi há»£p tÃ¡c xÃ¢y kÃªnh TikTok cÃ¹ng PGS",
      h2AndH3: ["Giáº£i Ä‘Ã¡p tháº¯c máº¯c chuyÃªn sÃ¢u cá»§a khÃ¡ch hÃ ng", "Quy cháº¿ lÃ m viá»‡c vÃ  cam káº¿t cháº¥t lÆ°á»£ng"],
      internalLinkOut: ["/ve-chung-toi"],
      internalLinkIn: ["/dich-vu/dich-vu-xay-kenh-tiktok"],
      schemaCode: `{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": []
}`,
      checklistDesigner: [
        "Thiáº¿t káº¿ cÃ¡c nÃºt báº¥m cá»™ng/trá»« hoáº·c mÅ©i tÃªn xoay mÆ°á»£t mÃ  biá»ƒu thá»‹ tráº¡ng thÃ¡i Ä‘Ã³ng/má»Ÿ cá»§a accordion.",
        "Khoáº£ng giÃ£n cÃ¡ch giá»¯a cÃ¡c cÃ¢u há»i rá»™ng rÃ£i Ä‘á»ƒ trÃ¡nh click nháº§m."
      ],
      checklistDeveloper: [
        "Tá»‘i Æ°u hÃ³a chuyá»ƒn Ä‘á»™ng má»Ÿ accordion báº±ng CSS transition height hoáº·c motion/react mÆ°á»£t mÃ  khÃ´ng bá»‹ giáº­t khung hÃ¬nh.",
        "XÃ¢y dá»±ng Schema FAQPage chuáº©n cáº¥u trÃºc tá»± Ä‘á»™ng Ä‘á»• vÃ o header."
      ],
      checklistContentSEO: [
        "Ná»™i dung cÃ¢u há»i trá»±c diá»‡n, tráº£ lá»i trung thá»±c, Ä‘áº§y thuyáº¿t phá»¥c vÃ  uy tÃ­n cao (EEAT)."
      ]
    }
  },
  {
    id: 15,
    title: "Dá»‹ch vá»¥ liÃªn quan",
    slug: "dich-vu-lien-quan",
    spec: {
      searchIntent: "KhÃ¡ch hÃ ng sau khi xÃ¢y kÃªnh muá»‘n biáº¿t cÃ³ giáº£i phÃ¡p quáº£ng cÃ¡o hay dá»‹ch vá»¥ váº­n hÃ nh chÄƒm sÃ³c Ä‘a ná»n táº£ng nÃ o kÃ¨m theo Ä‘á»ƒ táº¡o ra sá»± cá»™ng hÆ°á»Ÿng sá»©c máº¡nh tiáº¿p thá»‹ khÃ´ng.",
      conceptUI: "Related Services Cross-linking Board - CÃ¡c tháº» bento nhá» náº±m ngang giá»›i thiá»‡u cÃ¡c dá»‹ch vá»¥ bá»• trá»£ cao cáº¥p cá»§a PGS Agency nhÆ° TikTok Ads, Content Social, Facebook Ads, Instagram Reels.",
      hero3D: "MÃ´ hÃ¬nh 3D cÃ¡c bÃ¡nh rÄƒng liÃªn káº¿t báº±ng vÃ ng máº¡ báº¡c (golden and silver linked gear wheels) quay Ä‘á»u Ä‘á»“ng bá»™.",
      metaTitle: "Dá»‹ch Vá»¥ Marketing Tá»•ng Thá»ƒ Tá»‘i Æ¯u TÄƒng TrÆ°á»Ÿng | PGS",
      metaDescription: "Tham kháº£o cÃ¡c giáº£i phÃ¡p Ä‘i kÃ¨m tá»« PGS Agency: Quáº£ng cÃ¡o TikTok Ads, biÃªn soáº¡n Content Ä‘a kÃªnh, tÄƒng trÆ°á»Ÿng SEO toÃ n diá»‡n.",
      h1: "Há»‡ sinh thÃ¡i dá»‹ch vá»¥ Marketing tá»•ng thá»ƒ táº¡i PGS Agency",
      h2AndH3: ["CÃ¡c giáº£i phÃ¡p bá»• trá»£ bá»©t phÃ¡ doanh sá»‘", "Äá»“ng bá»™ phá»…u marketing Ä‘a ná»n táº£ng"],
      internalLinkOut: ["/dich-vu/tiktok-ads", "/dich-vu/content-social"],
      internalLinkIn: ["/dich-vu/dich-vu-seo"],
      schemaCode: `{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Dá»‹ch vá»¥ Quáº£ng cÃ¡o TikTok Ads"
}`,
      checklistDesigner: [
        "CÃ¡c tháº» liÃªn quan cÃ³ kÃ­ch thÆ°á»›c vá»«a pháº£i, khÃ´ng Ä‘Æ°á»£c tranh giÃ nh visual chÃ­nh cá»§a trang dá»‹ch vá»¥ xÃ¢y kÃªnh.",
        "Sá»­ dá»¥ng icon mÆ°á»£t mÃ u nhÃ£ nháº·n, sang quÃ½."
      ],
      checklistDeveloper: [
        "Äáº£m báº£o cÃ¡c tháº» cÃ³ liÃªn káº¿t href trá» chÃ­nh xÃ¡c Ä‘áº¿n cÃ¡c trang dá»‹ch vá»¥ Ä‘Ã­ch liÃªn quan.",
        "Táº¡o hiá»‡u á»©ng lÆ°á»›t nháº¹ khi rÃª chuá»™t (hover translate-y)."
      ],
      checklistContentSEO: [
        "NÃªu báº­t giÃ¡ trá»‹ cá»™ng hÆ°á»Ÿng: 'Cáº¥u trÃºc ná»™i dung chuáº©n giÃºp cháº¡y Ads ráº» hÆ¡n 40%', 'Váº­n hÃ nh Ä‘a kÃªnh giÃºp tiáº¿p cáº­n khÃ¡ch hÃ ng á»Ÿ má»i Ä‘iá»ƒm cháº¡m'."
      ]
    }
  },
  {
    id: 16,
    title: "CTA cuá»‘i trang",
    slug: "cta-cuoi-trang",
    spec: {
      searchIntent: "NgÆ°á»i dÃ¹ng Ä‘Ã£ Ä‘á»c Ä‘áº¿n cuá»‘i trang, hoÃ n toÃ n bá»‹ thuyáº¿t phá»¥c vÃ  Ä‘ang á»Ÿ tráº¡ng thÃ¡i nÃ³ng lÃ²ng muá»‘n Ä‘Äƒng kÃ½ Ä‘áº·t lá»‹ch háº¹n tÆ° váº¥n chiáº¿n lÆ°á»£c xÃ¢y kÃªnh ngay láº­p tá»©c.",
      conceptUI: "High-conversion Booking Portal - Khung form Ä‘Äƒng kÃ½ cuá»‘i trang lá»“ng ghÃ©p hÃ¬nh áº£nh mockup series bÃ i báº£n, form Ä‘iá»n 4 trÆ°á»ng thÃ´ng tin tinh gá»n (Há» tÃªn, SÄT, Doanh nghiá»‡p, LÄ©nh vá»±c).",
      hero3D: "Khá»‘i 3D chiáº¿c phong thÆ° báº±ng vÃ ng bay lÃªn (golden flying envelope) láº¥p lÃ¡nh háº¡t bá»¥i sao vÃ ng, bÃ¡o hiá»‡u thÃ´ng tin Ä‘Ã£ Ä‘Æ°á»£c gá»­i Ä‘i thÃ nh cÃ´ng.",
      metaTitle: "ÄÄƒng KÃ½ TÆ° Váº¥n Chiáº¿n LÆ°á»£c XÃ¢y KÃªnh TikTok Miá»…n PhÃ­ | PGS",
      metaDescription: "Äá»«ng lÃ£ng phÃ­ thá»i gian tá»± Ä‘Äƒng video ngáº«u nhiÃªn ná»¯a. HÃ£y Ä‘Äƒng kÃ½ Ä‘áº·t lá»‹ch tÆ° váº¥n 30 phÃºt cÃ¹ng chuyÃªn gia PGS Agency ngay hÃ´m nay.",
      h1: "Báº¡n muá»‘n xÃ¢y kÃªnh TikTok cÃ³ Ä‘á»‹nh hÆ°á»›ng thay vÃ¬ Ä‘Äƒng video ngáº«u nhiÃªn?",
      h2AndH3: ["Äáº·t lá»‹ch tÆ° váº¥n chiáº¿n lÆ°á»£c 1-1 miá»…n phÃ­", "CÆ¡ há»™i Ä‘á»“ng hÃ nh cÃ¹ng PGS Agency"],
      internalLinkOut: ["/privacy-policy"],
      internalLinkIn: ["/dich-vu/dich-vu-xay-kenh-tiktok"],
      schemaCode: `{
  "@context": "https://schema.org",
  "@type": "ContactPage"
}`,
      checklistDesigner: [
        "Form Ä‘Äƒng kÃ½ Ä‘Æ°á»£c bo trÃ²n cao cáº¥p, ná»n tráº¯ng tinh khÃ´i tÆ°Æ¡ng pháº£n ná»•i báº­t trÃªn background xÃ¡m ngÃ  dá»‹u nháº¹.",
        "NÃºt Submit lá»›n, ghi rÃµ thÃ´ng Ä‘iá»‡p 'ÄÄƒng kÃ½ tÆ° váº¥n miá»…n phÃ­ ngay'."
      ],
      checklistDeveloper: [
        "Xá»­ lÃ½ state gá»­i form, táº¡o hiá»‡u á»©ng chuyá»ƒn Ä‘á»•i mÆ°á»£t mÃ  sang tráº¡ng thÃ¡i 'Gá»­i thÃ nh cÃ´ng' kÃ¨m hiá»‡u á»©ng phÃ¡o hoa giáº¥y vÃ ng láº¥p lÃ¡nh (confetti).",
        "TÃ­ch há»£p auto-focus vÃ o Ã´ nháº­p há» tÃªn khi ngÆ°á»i dÃ¹ng cuá»™n Ä‘áº¿n CTA nÃ y."
      ],
      checklistContentSEO: [
        "Viáº¿t cam káº¿t báº£o máº­t thÃ´ng tin khÃ¡ch hÃ ng tuyá»‡t Ä‘á»‘i á»Ÿ chÃ¢n form.",
        "TiÃªu Ä‘á» kÃªu gá»i máº¡nh máº½, dá»©t khoÃ¡t vÃ  trÃ n Ä‘áº§y cáº£m há»©ng thá»‹nh vÆ°á»£ng."
      ]
    }
  }
];

