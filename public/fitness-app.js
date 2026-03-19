
// ===== DATA LAYER =====
function ld(key, fallback) {
  try { const d = localStorage.getItem('sb_' + key); return d ? JSON.parse(d) : fallback; }
  catch(e) { return fallback; }
}
function sv(key, data) {
  localStorage.setItem('sb_' + key, JSON.stringify(data));
  if(window.__supabaseSave) {
    clearTimeout(window['__svTimer_' + key]);
    window['__svTimer_' + key] = setTimeout(function(){ window.__supabaseSave(key, data); }, 1500);
  }
}

// ===== DEFAULT PROFILE =====
const DEFAULT_PROFILE = {
  naam: 'Pim',
  gewicht: 85,
  lengte: 180,
  leeftijd: 38,
  geslacht: 'man',
  activiteit: 'actief',
  deficit: -500,
  stappenDoel: 10000,
  trainMinDoel: 30,
  startDatum: new Date().toISOString().split('T')[0]
};

// ===== MOTIVATIE QUOTES =====
const QUOTES = [
  "De enige slechte workout is de workout die je niet hebt gedaan. ðŸ’ª",
  "Discipline is kiezen tussen wat je nu wilt en wat je het meest wilt. ðŸŽ¯",
  "Elke dag is een kans om sterker te worden. ðŸ”¥",
  "Compound lifts + HIIT = de snelste weg naar vetverbranding. ðŸ½ï¸ðŸ’ª",
  "Geef niet op. Het begin is altijd het moeilijkst. ðŸš€",
  "Consistentie verslaat perfectie. Elke dag een beetje beter. ðŸ“ˆ",
  "Je lichaam kan bijna alles aan. Het is je hoofd dat je moet overtuigen. ðŸ§ ",
  "Zweet is vet dat huilt. Laat het maar lopen! ðŸ’§",
  "Over 4 weken zul je blij zijn dat je vandaag bent begonnen. â°",
  "Pain is temporary, pride is forever. ðŸ†",
  "Grote spiergroepen = meer calorieÃ«n verbranden. Squat die vet eraf! ðŸŽ¬",
  "Je hoeft niet perfect te zijn, je moet alleen niet stoppen. âš¡",
  "Kleine stappen, grote resultaten. Dag voor dag. ðŸ‘£",
  "Je concurreert alleen met de persoon die je gisteren was. ðŸªž",
  "Halverwege! Je bent sterker dan je denkt. ðŸ’Ž",
  "Resultaten komen niet van wensen, maar van werken. ðŸ”¨",
  "Elke rep telt, elke maaltijd telt, elk besluit telt. âœ…",
  "Je bent niet moe, je bent niet gemotiveerd. Doe het toch. ðŸ˜¤",
  "Week 3 al! HIIT + compound = metabolisme op volle toeren. ðŸ”„",
  "Het verschil tussen proberen en doen is resultaat. ðŸ’¯",
  "Full body training verbrandt meer dan 100 crunches. Werk slim! ðŸ—ï¸",
  "Spierpijn is je lichaam dat zegt: ik groei. ðŸ“¢",
  "Bijna klaar! De finish is in zicht. Sprint! ðŸƒ",
  "Trots op jezelf? Dat zou je moeten zijn. ðŸŒŸ",
  "Dag 25! Je hebt bewezen dat je het kunt. ðŸ’ªðŸ”¥",
  "De laatste loodjes wegen het zwaarst, maar zijn het meest waard. âš–ï¸",
  "Morgen is de laatste dag. Geef alles wat je hebt! ðŸŽ¯ðŸ”¥",
  "DAG 28! Je hebt het gedaan! Kampioen! ðŸ†ðŸŽ‰ðŸ”¥"
];

// ===== MEAL SUGGESTIONS =====
const MEAL_SUGGESTIONS = {
  ontbijt: [
    {naam:'Havermout met banaan & honing',kcal:350,eiwit:12,koolhydraten:55,vet:8},
    {naam:'Griekse yoghurt met noten & blauwe bessen',kcal:300,eiwit:20,koolhydraten:25,vet:14},
    {naam:'Roerei (3) op volkoren toast',kcal:380,eiwit:24,koolhydraten:30,vet:18},
    {naam:'Smoothie bowl (banaan, spinazie, whey)',kcal:320,eiwit:28,koolhydraten:40,vet:6},
    {naam:'Volkoren brood met avocado & ei',kcal:370,eiwit:16,koolhydraten:32,vet:20},
    {naam:'Kwark met granola & fruit',kcal:310,eiwit:22,koolhydraten:38,vet:8},
    {naam:'Eiwitpannenkoeken (banaan & ei)',kcal:290,eiwit:26,koolhydraten:30,vet:8},
    {naam:'Overnight oats met chiazaad',kcal:340,eiwit:14,koolhydraten:48,vet:10},
    {naam:'Omelet met groenten & feta',kcal:330,eiwit:22,koolhydraten:8,vet:24},
    {naam:'Rijstwafels met pindakaas & banaan',kcal:280,eiwit:10,koolhydraten:38,vet:12}
  ],
  lunch: [
    {naam:'Kip wrap met sla & tomaat',kcal:420,eiwit:32,koolhydraten:38,vet:14},
    {naam:'Tonijnsalade met volkoren brood',kcal:380,eiwit:30,koolhydraten:32,vet:12},
    {naam:'Volkoren brood met hummus & groenten',kcal:350,eiwit:14,koolhydraten:45,vet:12},
    {naam:'Quinoa bowl met kip & avocado',kcal:450,eiwit:30,koolhydraten:42,vet:16},
    {naam:'Griekse salade met kip',kcal:400,eiwit:28,koolhydraten:18,vet:24},
    {naam:'Wraps met zalm & roomkaas',kcal:430,eiwit:26,koolhydraten:36,vet:20},
    {naam:'Linzensoep met volkoren brood',kcal:370,eiwit:20,koolhydraten:50,vet:8},
    {naam:'Turks brood met kip shoarma',kcal:460,eiwit:34,koolhydraten:42,vet:16},
    {naam:'Cottage cheese met tomaat & komkommer',kcal:250,eiwit:24,koolhydraten:12,vet:12},
    {naam:'PokÃ© bowl met rijst & zalm',kcal:480,eiwit:28,koolhydraten:52,vet:16}
  ],
  diner: [
    {naam:'Zalm met gegrilde groenten',kcal:450,eiwit:35,koolhydraten:20,vet:24},
    {naam:'Kipfilet met zoete aardappel',kcal:480,eiwit:38,koolhydraten:45,vet:12},
    {naam:'Roerbak tofu met groenten & rijst',kcal:420,eiwit:22,koolhydraten:50,vet:14},
    {naam:'Volkoren pasta met kip & pesto',kcal:520,eiwit:32,koolhydraten:55,vet:16},
    {naam:'Kabeljauw met aardappel & sperziebonen',kcal:400,eiwit:34,koolhydraten:38,vet:10},
    {naam:'Chili con carne (mager rund)',kcal:460,eiwit:30,koolhydraten:40,vet:18},
    {naam:'Griekse kip met couscous',kcal:470,eiwit:35,koolhydraten:42,vet:16},
    {naam:'Garnalen met noodles & groenten',kcal:390,eiwit:28,koolhydraten:44,vet:10},
    {naam:'Gehaktballen met stamppot',kcal:500,eiwit:28,koolhydraten:48,vet:20},
    {naam:'Omelet met salade (lichte diner)',kcal:350,eiwit:24,koolhydraten:12,vet:22}
  ],
  snacks: [
    {naam:'Appel met pindakaas',kcal:200,eiwit:6,koolhydraten:22,vet:10},
    {naam:'Handvol noten mix (30g)',kcal:180,eiwit:6,koolhydraten:6,vet:16},
    {naam:'Rijstwafels met hÃ¼ttenkÃ¤se',kcal:120,eiwit:8,koolhydraten:14,vet:2},
    {naam:'Eiwitshake (whey + water)',kcal:130,eiwit:25,koolhydraten:4,vet:2},
    {naam:'Wortel & komkommer met hummus',kcal:150,eiwit:6,koolhydraten:16,vet:7},
    {naam:'Gekookt ei',kcal:75,eiwit:6,koolhydraten:1,vet:5},
    {naam:'Skyr naturel met honing',kcal:140,eiwit:16,koolhydraten:14,vet:0},
    {naam:'Edamame bonen (100g)',kcal:120,eiwit:12,koolhydraten:8,vet:5},
    {naam:'Volkoren cracker met avocado',kcal:160,eiwit:4,koolhydraten:14,vet:10},
    {naam:'Banaan',kcal:105,eiwit:1,koolhydraten:27,vet:0}
  ]
};

// ===== EXERCISES DATABASE =====
const EXERCISES = [
  // === CORE OEFENINGEN ===
  {id:'plank',naam:'Plank',beschrijving:'Onderarmen en tenen op de grond, lichaam recht als een plank. Span je buik aan.',spieren:'Rectus abdominis, transversus abdominis, schuine buikspieren',moeilijkheid:1,categorie:'core',type:'tijd',standaard:'30 sec'},
  {id:'side-plank',naam:'Side Plank',beschrijving:'Lig op je zij, steun op onderarm. Hef je heup omhoog zodat je lichaam een rechte lijn vormt.',spieren:'Schuine buikspieren, transversus abdominis',moeilijkheid:1,categorie:'core',type:'tijd',standaard:'20 sec per kant'},
  {id:'crunches',naam:'Crunches',beschrijving:'Lig op je rug, knieÃ«n gebogen. Til je schouders op richting je knieÃ«n door je buik aan te spannen.',spieren:'Rectus abdominis (bovenste deel)',moeilijkheid:1,categorie:'core',type:'reps',standaard:'15 reps'},
  {id:'bicycle-crunches',naam:'Bicycle Crunches',beschrijving:'Lig op je rug, handen achter je hoofd. Breng afwisselend elleboog naar tegenovergestelde knie.',spieren:'Rectus abdominis, schuine buikspieren',moeilijkheid:1,categorie:'core',type:'reps',standaard:'20 reps'},
  {id:'leg-raises',naam:'Leg Raises',beschrijving:'Lig op je rug, benen gestrekt. Til je benen langzaam omhoog tot 90Â° en laat ze gecontroleerd zakken.',spieren:'Rectus abdominis (onderste deel), heupflexoren',moeilijkheid:2,categorie:'core',type:'reps',standaard:'12 reps'},
  {id:'mountain-climbers',naam:'Mountain Climbers',beschrijving:'Push-up positie. Trek afwisselend je knieÃ«n naar je borst in een loopbeweging.',spieren:'Rectus abdominis, schuine buikspieren, heupflexoren',moeilijkheid:2,categorie:'core',type:'tijd',standaard:'30 sec'},
  {id:'russian-twists',naam:'Russian Twists',beschrijving:'Zit met knieÃ«n gebogen, voeten van de grond. Draai je bovenlichaam van links naar rechts.',spieren:'Schuine buikspieren, rectus abdominis',moeilijkheid:1,categorie:'core',type:'reps',standaard:'20 reps'},
  {id:'dead-bug',naam:'Dead Bug',beschrijving:'Lig op je rug, armen omhoog, knieÃ«n 90Â°. Strek afwisselend tegenovergestelde arm en been uit.',spieren:'Transversus abdominis, rectus abdominis',moeilijkheid:1,categorie:'core',type:'reps',standaard:'10 per kant'},
  {id:'flutter-kicks',naam:'Flutter Kicks',beschrijving:'Lig op je rug, benen net boven de grond. Maak kleine op-en-neer schoppende bewegingen.',spieren:'Rectus abdominis (onderste deel), heupflexoren',moeilijkheid:2,categorie:'core',type:'tijd',standaard:'30 sec'},
  {id:'toe-touches',naam:'Toe Touches',beschrijving:'Lig op je rug, benen verticaal omhoog. Reik met je handen naar je tenen door je schouders op te tillen.',spieren:'Rectus abdominis (bovenste deel)',moeilijkheid:1,categorie:'core',type:'reps',standaard:'15 reps'},
  {id:'heel-taps',naam:'Heel Taps',beschrijving:'Lig op je rug, knieÃ«n gebogen, voeten plat. Buig zijwaarts en tik afwisselend je hielen aan.',spieren:'Schuine buikspieren',moeilijkheid:1,categorie:'core',type:'reps',standaard:'20 reps'},
  {id:'v-ups',naam:'V-Ups',beschrijving:'Lig op je rug, armen boven je hoofd. Til tegelijk je benen en bovenlichaam op tot een V-vorm.',spieren:'Rectus abdominis, heupflexoren',moeilijkheid:3,categorie:'core',type:'reps',standaard:'10 reps'},
  {id:'hollow-body',naam:'Hollow Body Hold',beschrijving:'Lig op je rug, armen langs je oren, benen gestrekt. Til alles net van de grond en houd vast.',spieren:'Transversus abdominis, rectus abdominis',moeilijkheid:3,categorie:'core',type:'tijd',standaard:'20 sec'},
  {id:'ab-wheel',naam:'Ab Wheel Rollout',beschrijving:'Kniel met ab wheel in je handen. Rol langzaam naar voren en trek jezelf terug met je buikspieren.',spieren:'Rectus abdominis, transversus abdominis, schouders',moeilijkheid:3,categorie:'core',type:'reps',standaard:'8 reps'},
  {id:'hanging-knee',naam:'Hanging Knee Raises',beschrijving:'Hang aan een stang. Trek je knieÃ«n omhoog richting je borst door je buik aan te spannen.',spieren:'Rectus abdominis (onderste deel), heupflexoren',moeilijkheid:3,categorie:'core',type:'reps',standaard:'10 reps'},
  {id:'woodchoppers',naam:'Woodchoppers',beschrijving:'Sta met voeten op schouderbreedte. Maak een diagonale hak-beweging van hoog naar laag (of omgekeerd).',spieren:'Schuine buikspieren, rectus abdominis',moeilijkheid:2,categorie:'core',type:'reps',standaard:'12 per kant'},
  {id:'bird-dog',naam:'Bird Dog',beschrijving:'Op handen en knieÃ«n. Strek tegelijk je rechterarm en linkerbeen uit. Wissel af.',spieren:'Transversus abdominis, lage rug, core stabiliteit',moeilijkheid:1,categorie:'core',type:'reps',standaard:'10 per kant'},
  {id:'bear-crawl',naam:'Bear Crawl',beschrijving:'Op handen en voeten, knieÃ«n net boven de grond. Kruip naar voren in kleine stappen.',spieren:'Transversus abdominis, schouders, volledige core',moeilijkheid:2,categorie:'core',type:'tijd',standaard:'30 sec'},
  {id:'reverse-crunch',naam:'Reverse Crunch',beschrijving:'Lig op je rug, knieÃ«n 90Â°. Til je heupen van de grond door je knieÃ«n naar je borst te trekken.',spieren:'Rectus abdominis (onderste deel)',moeilijkheid:2,categorie:'core',type:'reps',standaard:'12 reps'},
  {id:'dragon-flag',naam:'Dragon Flag',beschrijving:'Lig op een bank, grijp boven je hoofd vast. Til je hele lichaam als Ã©Ã©n stuk omhoog en laat langzaam zakken.',spieren:'Rectus abdominis, volledige core',moeilijkheid:3,categorie:'core',type:'reps',standaard:'5 reps'},
  {id:'plank-shoulder-tap',naam:'Plank Shoulder Taps',beschrijving:'In plank positie op handen. Tik afwisselend met je hand op je tegenovergestelde schouder.',spieren:'Core stabiliteit, schouders',moeilijkheid:2,categorie:'core',type:'reps',standaard:'16 reps'},
  {id:'scissors',naam:'Scissors',beschrijving:'Lig op je rug, benen gestrekt omhoog. Kruis je benen over elkaar in een schaar-beweging.',spieren:'Rectus abdominis, heupflexoren',moeilijkheid:2,categorie:'core',type:'tijd',standaard:'30 sec'},

  // === COMPOUND / FULL BODY OEFENINGEN ===
  {id:'squats',naam:'Squats',beschrijving:'Sta met voeten op schouderbreedte. Zak door je knieÃ«n alsof je op een stoel gaat zitten. Houd je rug recht en duw door je hakken omhoog. Varianten: goblet squat, sumo squat, jump squat.',spieren:'Quadriceps, gluteus, hamstrings, core',moeilijkheid:1,categorie:'compound',type:'reps',standaard:'12 reps'},
  {id:'deadlifts',naam:'Romanian Deadlift (dumbbells)',beschrijving:'Sta met dumbbells in je handen, voeten heupbreed. Buig vanuit je heupen naar voren met lichte kniebuiging. Houd je rug recht en voel de stretch in je hamstrings. Kom gecontroleerd omhoog.',spieren:'Hamstrings, gluteus, lage rug, core, onderarmen',moeilijkheid:2,categorie:'compound',type:'reps',standaard:'10 reps'},
  {id:'push-ups',naam:'Push-ups',beschrijving:'Handen op schouderbreedte, lichaam in een rechte lijn. Zak tot je borst bijna de grond raakt en duw omhoog. Varianten: diamond (handen dicht bij elkaar), wide (breed), incline (handen op verhoging voor beginners).',spieren:'Borst, triceps, voorste schouder, core',moeilijkheid:1,categorie:'compound',type:'reps',standaard:'12 reps'},
  {id:'pull-ups',naam:'Pull-ups / Bodyweight Rows',beschrijving:'Hang aan een stang met gestrekte armen, handpalmen van je af. Trek jezelf omhoog tot je kin boven de stang is. Alternatief: bodyweight rows (schuin hangen aan een lage stang en naar je borst trekken).',spieren:'Latissimus dorsi, biceps, bovenrug, core',moeilijkheid:3,categorie:'compound',type:'reps',standaard:'6 reps'},
  {id:'lunges',naam:'Lunges',beschrijving:'Maak een grote stap naar voren en zak door je knieÃ«n tot beide knieÃ«n 90Â° zijn. Duw af en keer terug. Varianten: reverse lunge (stap naar achteren), walking lunge (doorlopen).',spieren:'Quadriceps, gluteus, hamstrings, core, balans',moeilijkheid:1,categorie:'compound',type:'reps',standaard:'10 per been'},
  {id:'overhead-press',naam:'Overhead Press',beschrijving:'Sta met dumbbells op schouderhoogte, handpalmen naar voren. Druk de gewichten recht omhoog boven je hoofd. Laat gecontroleerd zakken. Alternatief: pike push-up (voeten op verhoging, heupen hoog, druk omhoog).',spieren:'Schouders (deltoideus), triceps, core',moeilijkheid:2,categorie:'compound',type:'reps',standaard:'10 reps'},
  {id:'bent-over-rows',naam:'Bent-over Rows (dumbbells)',beschrijving:'Buig vanuit je heupen met lichte kniebuiging, rug recht. Trek de dumbbells naar je navel door je schouderbladen samen te knijpen. Laat gecontroleerd zakken.',spieren:'Bovenrug, latissimus dorsi, biceps, achterste schouder',moeilijkheid:2,categorie:'compound',type:'reps',standaard:'10 reps'},
  {id:'step-ups',naam:'Step-ups',beschrijving:'Stap op een verhoogd platform (bank, trap, box) met Ã©Ã©n been. Druk jezelf omhoog tot je helemaal staat. Stap gecontroleerd terug. Wissel van been.',spieren:'Quadriceps, gluteus, hamstrings, balans',moeilijkheid:1,categorie:'compound',type:'reps',standaard:'10 per been'},
  {id:'glute-bridges',naam:'Glute Bridges / Hip Thrusts',beschrijving:'Lig op je rug, knieÃ«n gebogen, voeten plat. Duw je heupen omhoog door je billen aan te spannen. Knijp bovenaan samen en laat gecontroleerd zakken. Voor hip thrusts: schouders op een bank.',spieren:'Gluteus maximus, hamstrings, core',moeilijkheid:1,categorie:'compound',type:'reps',standaard:'15 reps'},
  {id:'farmers-walk',naam:'Farmer\'s Walk',beschrijving:'Pak zware dumbbells of kettlebells op. Loop met rechte rug, schouders naar achteren, in een gecontroleerd tempo. Houd je core aangespannen. Loop een vaste afstand of tijd.',spieren:'Onderarmen, trapezius, core, schouders, benen',moeilijkheid:1,categorie:'compound',type:'tijd',standaard:'30 sec'},

  // === HIIT OEFENINGEN ===
  {id:'burpees',naam:'Burpees',beschrijving:'Sta rechtop, zak door naar een squat, spring naar plank positie, doe een push-up, spring terug naar squat en spring explosief omhoog met armen boven je hoofd.',spieren:'Full body: benen, borst, schouders, core, cardio',moeilijkheid:3,categorie:'hiit',type:'reps',standaard:'10 reps'},
  {id:'jump-squats',naam:'Jump Squats',beschrijving:'Voer een normale squat uit maar spring explosief omhoog vanuit de laagste positie. Land zacht op de ballen van je voeten en ga direct door naar de volgende rep.',spieren:'Quadriceps, gluteus, hamstrings, kuiten, cardio',moeilijkheid:2,categorie:'hiit',type:'reps',standaard:'12 reps'},
  {id:'high-knees',naam:'High Knees',beschrijving:'Ren op de plaats en trek je knieÃ«n zo hoog mogelijk op (minstens heuphoogte). Pompende armbewegingen. Houd een hoog tempo aan.',spieren:'Heupflexoren, quadriceps, core, cardio',moeilijkheid:2,categorie:'hiit',type:'tijd',standaard:'30 sec'},
  {id:'box-jumps',naam:'Box Jumps / Jump Overs',beschrijving:'Sta voor een stabiele box of bank. Spring met twee voeten tegelijk op de box, sta volledig rechtop, stap of spring terug. Alternatief: spring over een lage horde heen en weer.',spieren:'Quadriceps, gluteus, kuiten, core, explosieve kracht',moeilijkheid:3,categorie:'hiit',type:'reps',standaard:'8 reps'},
  {id:'kettlebell-swings',naam:'Kettlebell Swings',beschrijving:'Sta met voeten breder dan schouderbreedte, kettlebell in twee handen. Swing de bell tussen je benen door en drijf hem met je heupen naar schouderhoogte. Alternatief: dumbbell swing.',spieren:'Gluteus, hamstrings, core, schouders, cardio',moeilijkheid:2,categorie:'hiit',type:'reps',standaard:'15 reps'},
  {id:'battle-ropes',naam:'Battle Ropes / Jumping Jacks',beschrijving:'Pak de uiteinden van battle ropes en maak afwisselende golven met je armen. Houd je core strak en knieÃ«n licht gebogen. Alternatief zonder ropes: jumping jacks op hoog tempo.',spieren:'Schouders, armen, core, cardio',moeilijkheid:2,categorie:'hiit',type:'tijd',standaard:'30 sec'},
  {id:'sprint-intervals',naam:'Sprint Intervals',beschrijving:'Sprint 20-30 seconden op maximale intensiteit, gevolgd door 30-40 seconden wandelen of rustig joggen. Herhaal. Kan buiten, op een loopband, of op een fiets.',spieren:'Full body cardio, benen, core',moeilijkheid:3,categorie:'hiit',type:'tijd',standaard:'20 sec sprint'},
  {id:'tabata-protocol',naam:'Tabata Protocol',beschrijving:'Kies een oefening (bijv. squats, burpees). Doe 20 seconden maximale inspanning, 10 seconden rust. Herhaal 8 rondes (= 4 minuten totaal). Extreem effectief voor vetverbranding.',spieren:'Afhankelijk van gekozen oefening, full body cardio',moeilijkheid:3,categorie:'hiit',type:'tijd',standaard:'4 min (8x 20/10)'}
];

// ===== DAY TYPE LABELS =====
const DAY_TYPES = {
  'full-body': {label:'Full Body Compound', emoji:'ðŸ‹ï¸', badge:'day-type-compound', color:'#1565c0'},
  'hiit-core': {label:'HIIT + Core', emoji:'ðŸ”¥', badge:'day-type-hiit', color:'#c62828'},
  'upper-core': {label:'Upper Body + Core', emoji:'ðŸ’ª', badge:'day-type-upper', color:'#2e7d32'},
  'rest': {label:'Rustdag', emoji:'ðŸ§˜', badge:'day-type-rest', color:'#757575'},
  'lower-core': {label:'Lower Body + Core', emoji:'ðŸ¦µ', badge:'day-type-lower', color:'#7b1fa2'},
  'hiit-circuit': {label:'HIIT + Full Body Circuit', emoji:'âš¡', badge:'day-type-circuit', color:'#e65100'},
  'active-rest': {label:'Actief Herstel', emoji:'ðŸš¶', badge:'day-type-rest', color:'#757575'}
};

// ===== 4-WEEK WORKOUT PLAN (REVISED) =====
const WORKOUT_PLAN = {
  // Week 1 - Basis (minder sets, langere rust, focus op techniek)
  1:[
    {dag:1,naam:'Full Body Compound',dagType:'full-body',oefeningen:[
      {id:'squats',sets:3,reps:'10 reps',rust:60},
      {id:'deadlifts',sets:3,reps:'8 reps',rust:60},
      {id:'push-ups',sets:3,reps:'10 reps',rust:60},
      {id:'bent-over-rows',sets:3,reps:'10 reps',rust:60},
      {id:'overhead-press',sets:3,reps:'8 reps',rust:60},
      {id:'glute-bridges',sets:3,reps:'12 reps',rust:45}
    ]},
    {dag:2,naam:'HIIT + Core',dagType:'hiit-core',oefeningen:[
      {id:'high-knees',sets:3,reps:'20 sec',rust:40},
      {id:'jump-squats',sets:3,reps:'8 reps',rust:40},
      {id:'mountain-climbers',sets:3,reps:'20 sec',rust:40},
      {id:'plank',sets:3,reps:'25 sec',rust:30},
      {id:'bicycle-crunches',sets:3,reps:'14 reps',rust:30},
      {id:'dead-bug',sets:3,reps:'8 per kant',rust:30}
    ]},
    {dag:3,naam:'Upper Body + Core',dagType:'upper-core',oefeningen:[
      {id:'push-ups',sets:3,reps:'10 reps',rust:60},
      {id:'pull-ups',sets:3,reps:'4 reps',rust:60},
      {id:'bent-over-rows',sets:3,reps:'10 reps',rust:60},
      {id:'overhead-press',sets:3,reps:'8 reps',rust:60},
      {id:'plank',sets:3,reps:'25 sec',rust:30},
      {id:'russian-twists',sets:3,reps:'16 reps',rust:30}
    ]},
    {dag:4,naam:'ðŸ§˜ Rustdag',dagType:'rest',oefeningen:[]},
    {dag:5,naam:'Lower Body + Core',dagType:'lower-core',oefeningen:[
      {id:'squats',sets:3,reps:'12 reps',rust:60},
      {id:'lunges',sets:3,reps:'8 per been',rust:60},
      {id:'step-ups',sets:3,reps:'8 per been',rust:60},
      {id:'glute-bridges',sets:3,reps:'12 reps',rust:45},
      {id:'leg-raises',sets:3,reps:'10 reps',rust:30},
      {id:'heel-taps',sets:3,reps:'16 reps',rust:30}
    ]},
    {dag:6,naam:'HIIT + Full Body Circuit',dagType:'hiit-circuit',oefeningen:[
      {id:'burpees',sets:3,reps:'6 reps',rust:45},
      {id:'kettlebell-swings',sets:3,reps:'12 reps',rust:40},
      {id:'mountain-climbers',sets:3,reps:'25 sec',rust:40},
      {id:'jump-squats',sets:3,reps:'8 reps',rust:40},
      {id:'battle-ropes',sets:3,reps:'20 sec',rust:40},
      {id:'farmers-walk',sets:2,reps:'20 sec',rust:45}
    ]},
    {dag:7,naam:'ðŸš¶ Actief Herstel',dagType:'active-rest',oefeningen:[]}
  ],
  // Week 2 - Basis+ (iets meer volume, techniek verfijnen)
  2:[
    {dag:1,naam:'Full Body Compound',dagType:'full-body',oefeningen:[
      {id:'squats',sets:3,reps:'12 reps',rust:60},
      {id:'deadlifts',sets:3,reps:'10 reps',rust:60},
      {id:'push-ups',sets:3,reps:'12 reps',rust:60},
      {id:'bent-over-rows',sets:3,reps:'12 reps',rust:50},
      {id:'overhead-press',sets:3,reps:'10 reps',rust:50},
      {id:'glute-bridges',sets:3,reps:'15 reps',rust:45},
      {id:'farmers-walk',sets:2,reps:'30 sec',rust:45}
    ]},
    {dag:2,naam:'HIIT + Core',dagType:'hiit-core',oefeningen:[
      {id:'high-knees',sets:3,reps:'25 sec',rust:35},
      {id:'jump-squats',sets:3,reps:'10 reps',rust:35},
      {id:'sprint-intervals',sets:3,reps:'20 sec sprint',rust:40},
      {id:'mountain-climbers',sets:3,reps:'25 sec',rust:30},
      {id:'plank',sets:3,reps:'30 sec',rust:30},
      {id:'reverse-crunch',sets:3,reps:'12 reps',rust:30},
      {id:'side-plank',sets:2,reps:'20 sec per kant',rust:30}
    ]},
    {dag:3,naam:'Upper Body + Core',dagType:'upper-core',oefeningen:[
      {id:'push-ups',sets:3,reps:'12 reps',rust:50},
      {id:'pull-ups',sets:3,reps:'5 reps',rust:60},
      {id:'bent-over-rows',sets:3,reps:'12 reps',rust:50},
      {id:'overhead-press',sets:3,reps:'10 reps',rust:50},
      {id:'plank-shoulder-tap',sets:3,reps:'12 reps',rust:30},
      {id:'woodchoppers',sets:3,reps:'10 per kant',rust:30},
      {id:'bird-dog',sets:3,reps:'10 per kant',rust:25}
    ]},
    {dag:4,naam:'ðŸ§˜ Rustdag',dagType:'rest',oefeningen:[]},
    {dag:5,naam:'Lower Body + Core',dagType:'lower-core',oefeningen:[
      {id:'squats',sets:3,reps:'14 reps',rust:50},
      {id:'deadlifts',sets:3,reps:'10 reps',rust:60},
      {id:'lunges',sets:3,reps:'10 per been',rust:50},
      {id:'step-ups',sets:3,reps:'10 per been',rust:50},
      {id:'glute-bridges',sets:3,reps:'15 reps',rust:40},
      {id:'leg-raises',sets:3,reps:'12 reps',rust:30},
      {id:'flutter-kicks',sets:3,reps:'25 sec',rust:30}
    ]},
    {dag:6,naam:'HIIT + Full Body Circuit',dagType:'hiit-circuit',oefeningen:[
      {id:'burpees',sets:3,reps:'8 reps',rust:40},
      {id:'kettlebell-swings',sets:3,reps:'15 reps',rust:35},
      {id:'box-jumps',sets:3,reps:'6 reps',rust:40},
      {id:'mountain-climbers',sets:3,reps:'30 sec',rust:35},
      {id:'battle-ropes',sets:3,reps:'25 sec',rust:35},
      {id:'high-knees',sets:3,reps:'25 sec',rust:35},
      {id:'farmers-walk',sets:2,reps:'30 sec',rust:40}
    ]},
    {dag:7,naam:'ðŸš¶ Actief Herstel',dagType:'active-rest',oefeningen:[]}
  ],
  // Week 3 - Intensief (meer sets, kortere rust, zwaardere varianten)
  3:[
    {dag:1,naam:'Full Body Compound',dagType:'full-body',oefeningen:[
      {id:'squats',sets:4,reps:'12 reps',rust:45},
      {id:'deadlifts',sets:4,reps:'10 reps',rust:50},
      {id:'push-ups',sets:4,reps:'14 reps',rust:45},
      {id:'pull-ups',sets:3,reps:'6 reps',rust:60},
      {id:'bent-over-rows',sets:4,reps:'12 reps',rust:45},
      {id:'overhead-press',sets:4,reps:'10 reps',rust:45},
      {id:'farmers-walk',sets:3,reps:'35 sec',rust:40}
    ]},
    {dag:2,naam:'HIIT + Core',dagType:'hiit-core',oefeningen:[
      {id:'burpees',sets:4,reps:'8 reps',rust:30},
      {id:'sprint-intervals',sets:4,reps:'20 sec sprint',rust:30},
      {id:'jump-squats',sets:4,reps:'12 reps',rust:30},
      {id:'high-knees',sets:3,reps:'30 sec',rust:25},
      {id:'plank',sets:3,reps:'40 sec',rust:25},
      {id:'bicycle-crunches',sets:3,reps:'24 reps',rust:20},
      {id:'v-ups',sets:3,reps:'8 reps',rust:25},
      {id:'hollow-body',sets:3,reps:'15 sec',rust:25}
    ]},
    {dag:3,naam:'Upper Body + Core',dagType:'upper-core',oefeningen:[
      {id:'push-ups',sets:4,reps:'15 reps',rust:40},
      {id:'pull-ups',sets:4,reps:'6 reps',rust:50},
      {id:'bent-over-rows',sets:4,reps:'12 reps',rust:40},
      {id:'overhead-press',sets:4,reps:'10 reps',rust:40},
      {id:'plank-shoulder-tap',sets:3,reps:'18 reps',rust:25},
      {id:'woodchoppers',sets:3,reps:'12 per kant',rust:25},
      {id:'hanging-knee',sets:3,reps:'8 reps',rust:30}
    ]},
    {dag:4,naam:'ðŸ§˜ Rustdag',dagType:'rest',oefeningen:[]},
    {dag:5,naam:'Lower Body + Core',dagType:'lower-core',oefeningen:[
      {id:'squats',sets:4,reps:'14 reps',rust:45},
      {id:'deadlifts',sets:4,reps:'10 reps',rust:50},
      {id:'lunges',sets:4,reps:'10 per been',rust:45},
      {id:'step-ups',sets:3,reps:'12 per been',rust:45},
      {id:'glute-bridges',sets:4,reps:'15 reps',rust:35},
      {id:'leg-raises',sets:3,reps:'14 reps',rust:25},
      {id:'scissors',sets:3,reps:'30 sec',rust:25},
      {id:'reverse-crunch',sets:3,reps:'14 reps',rust:25}
    ]},
    {dag:6,naam:'HIIT + Full Body Circuit',dagType:'hiit-circuit',oefeningen:[
      {id:'burpees',sets:4,reps:'10 reps',rust:30},
      {id:'kettlebell-swings',sets:4,reps:'15 reps',rust:30},
      {id:'box-jumps',sets:3,reps:'8 reps',rust:35},
      {id:'tabata-protocol',sets:1,reps:'4 min (squats)',rust:60},
      {id:'mountain-climbers',sets:4,reps:'35 sec',rust:25},
      {id:'battle-ropes',sets:3,reps:'30 sec',rust:30},
      {id:'sprint-intervals',sets:4,reps:'20 sec sprint',rust:30}
    ]},
    {dag:7,naam:'ðŸš¶ Actief Herstel',dagType:'active-rest',oefeningen:[]}
  ],
  // Week 4 - Maximaal (hoogste intensiteit)
  4:[
    {dag:1,naam:'Full Body Compound Beast',dagType:'full-body',oefeningen:[
      {id:'squats',sets:4,reps:'15 reps',rust:40},
      {id:'deadlifts',sets:4,reps:'12 reps',rust:45},
      {id:'push-ups',sets:4,reps:'16 reps',rust:40},
      {id:'pull-ups',sets:4,reps:'8 reps',rust:50},
      {id:'bent-over-rows',sets:4,reps:'14 reps',rust:40},
      {id:'overhead-press',sets:4,reps:'12 reps',rust:40},
      {id:'lunges',sets:3,reps:'12 per been',rust:40},
      {id:'farmers-walk',sets:3,reps:'40 sec',rust:35}
    ]},
    {dag:2,naam:'HIIT Inferno + Core',dagType:'hiit-core',oefeningen:[
      {id:'burpees',sets:4,reps:'12 reps',rust:25},
      {id:'sprint-intervals',sets:5,reps:'25 sec sprint',rust:25},
      {id:'jump-squats',sets:4,reps:'14 reps',rust:25},
      {id:'high-knees',sets:4,reps:'35 sec',rust:20},
      {id:'tabata-protocol',sets:1,reps:'4 min (burpees)',rust:60},
      {id:'plank',sets:3,reps:'50 sec',rust:20},
      {id:'v-ups',sets:3,reps:'12 reps',rust:20},
      {id:'dragon-flag',sets:3,reps:'4 reps',rust:30}
    ]},
    {dag:3,naam:'Upper Body Power + Core',dagType:'upper-core',oefeningen:[
      {id:'push-ups',sets:4,reps:'18 reps',rust:35},
      {id:'pull-ups',sets:4,reps:'8 reps',rust:45},
      {id:'bent-over-rows',sets:4,reps:'14 reps',rust:35},
      {id:'overhead-press',sets:4,reps:'12 reps',rust:35},
      {id:'ab-wheel',sets:3,reps:'8 reps',rust:30},
      {id:'hanging-knee',sets:3,reps:'12 reps',rust:25},
      {id:'plank-shoulder-tap',sets:3,reps:'20 reps',rust:20},
      {id:'woodchoppers',sets:3,reps:'14 per kant',rust:20}
    ]},
    {dag:4,naam:'ðŸ§˜ Rustdag',dagType:'rest',oefeningen:[]},
    {dag:5,naam:'Lower Body Maximum + Core',dagType:'lower-core',oefeningen:[
      {id:'squats',sets:4,reps:'16 reps',rust:40},
      {id:'deadlifts',sets:4,reps:'12 reps',rust:45},
      {id:'lunges',sets:4,reps:'12 per been',rust:40},
      {id:'step-ups',sets:4,reps:'12 per been',rust:40},
      {id:'glute-bridges',sets:4,reps:'18 reps',rust:30},
      {id:'leg-raises',sets:3,reps:'16 reps',rust:20},
      {id:'flutter-kicks',sets:3,reps:'35 sec',rust:20},
      {id:'hollow-body',sets:3,reps:'20 sec',rust:25}
    ]},
    {dag:6,naam:'ðŸ† Grand Finale Circuit',dagType:'hiit-circuit',oefeningen:[
      {id:'burpees',sets:4,reps:'14 reps',rust:25},
      {id:'kettlebell-swings',sets:4,reps:'18 reps',rust:25},
      {id:'box-jumps',sets:4,reps:'10 reps',rust:30},
      {id:'sprint-intervals',sets:5,reps:'25 sec sprint',rust:25},
      {id:'tabata-protocol',sets:1,reps:'4 min (mountain climbers)',rust:60},
      {id:'battle-ropes',sets:4,reps:'30 sec',rust:25},
      {id:'mountain-climbers',sets:4,reps:'40 sec',rust:20},
      {id:'plank',sets:3,reps:'60 sec',rust:15}
    ]},
    {dag:7,naam:'ðŸš¶ Actief Herstel',dagType:'active-rest',oefeningen:[]}
  ]
};

// ===== INJURY MAPPING =====
const INJURY_EXERCISE_MAP = {
  schouder: ['overhead-press','push-ups','pull-ups','bent-over-rows','battle-ropes'],
  knie: ['squats','lunges','jump-squats','box-jumps','step-ups'],
  rug: ['deadlifts','bent-over-rows','farmers-walk'],
  enkel: ['jump-squats','box-jumps','burpees','high-knees','sprint-intervals','step-ups'],
  pols: ['push-ups','plank','farmers-walk','kettlebell-swings'],
  heup: ['lunges','glute-bridges'],
  nek: ['overhead-press']
};
const INJURY_GYM_MAP = {
  schouder: ['Shoulder press machine','Chest press machine','Lat pulldown','Cable row / seated row'],
  knie: ['Leg press','Leg extension','Leg curl','Smith machine squats','Climbmill / Stairmaster'],
  rug: ['Smith machine squats','Lat pulldown'],
  enkel: ['Climbmill / Stairmaster'],
  pols: [],
  heup: ['Hip abduction','Hip adduction','Leg press'],
  nek: ['Shoulder press machine']
};
const INJURY_ALTERNATIVES = {
  'squats': {naam:'Wall sit (isometrisch)',reden:'Minder belasting op knieÃ«n'},
  'lunges': {naam:'Zittende beenlift',reden:'Geen knie/heup belasting'},
  'push-ups': {naam:'Chest fly (liggend, dumbbells)',reden:'Minder pols/schouder belasting'},
  'pull-ups': {naam:'Bicep curls (dumbbells)',reden:'Minder schouder belasting'},
  'overhead-press': {naam:'Lateral raises (licht)',reden:'Minder schouder/nek belasting'},
  'deadlifts': {naam:'Glute bridges',reden:'Minder rug belasting'},
  'bent-over-rows': {naam:'Seated cable row',reden:'Minder rug belasting'},
  'burpees': {naam:'Squat thrusts (zonder sprong)',reden:'Minder enkel belasting'},
  'jump-squats': {naam:'Bodyweight squats (langzaam)',reden:'Zonder impact'},
  'box-jumps': {naam:'Step-ups (laag)',reden:'Minder impact'},
  'high-knees': {naam:'Marching in place',reden:'Minder impact'},
  'sprint-intervals': {naam:'Snelle wandel-intervallen',reden:'Minder enkel belasting'},
  'battle-ropes': {naam:'Band pull-aparts',reden:'Minder schouder belasting'},
  'farmers-walk': {naam:'Dead hang (aan stang hangen)',reden:'Minder pols/rug belasting'},
  'kettlebell-swings': {naam:'Hip thrusts',reden:'Minder pols belasting'},
  'step-ups': {naam:'Liggende beenlift',reden:'Minder knie belasting'},
  'glute-bridges': {naam:'Liggende beenlift zijwaarts',reden:'Minder heup belasting'},
  'plank': {naam:'Plank op onderarmen',reden:'Minder pols belasting'}
};

// ===== DEFAULT FYSIO EXERCISES =====
const DEFAULT_FYSIO_EXERCISES = [
  {id:'fysio_1',naam:'Schouder interne rotatie',beschrijving:'Lig op je zij met elleboog op 90Â°. Draai je onderarm langzaam naar je buik en terug.',sets:3,reps:15,tijd:null,frequentie:'dagelijks',notities:'Gebruik licht weerstandsband indien mogelijk',actief:true},
  {id:'fysio_2',naam:'Knie stabilisatie single leg squat',beschrijving:'Sta op Ã©Ã©n been, zak langzaam door je knie tot ~45Â°. Houd je balans en kom terug omhoog.',sets:3,reps:10,tijd:null,frequentie:'3x per week',notities:'Focus op stabiliteit, niet diepte',actief:true},
  {id:'fysio_3',naam:'Rug: cat-cow stretch',beschrijving:'Op handen en knieÃ«n. Wissel tussen rug hol maken (cow) en rug rond maken (cat). Langzaam ademen.',sets:2,reps:10,tijd:null,frequentie:'dagelijks',notities:'Rustig tempo, synchroniseer met ademhaling',actief:true}
];

// ===== PERIMENOPAUZE WORKOUT ADJUSTMENTS =====
// Reduce HIIT sets by 1, increase compound sets by 1 where applicable
function adjustWorkoutForPeri(oefeningen) {
  return oefeningen.map(ex => {
    const exData = EXERCISES.find(e => e.id === ex.id);
    if(!exData) return ex;
    let adjusted = {...ex};
    if(exData.categorie === 'hiit') {
      adjusted.sets = Math.max(1, ex.sets - 1);
      adjusted.rust = ex.rust + 10; // more rest
    } else if(exData.categorie === 'compound') {
      adjusted.sets = ex.sets + 1; // more strength volume
    }
    return adjusted;
  });
}

// ===== ACTIVITY PRESETS =====
const ACTIVITY_TYPES = {
  hardlopen:{emoji:'ðŸƒ',naam:'Hardlopen',kcalPer30:300},
  fietsen:{emoji:'ðŸš´',naam:'Fietsen',kcalPer30:250},
  padel:{emoji:'ðŸŽ¾',naam:'Padel',kcalPer30:350},
  tennis:{emoji:'ðŸŽ¾',naam:'Tennis',kcalPer30:300},
  voetbal:{emoji:'âš½',naam:'Voetbal',kcalPer30:300},
  zwemmen:{emoji:'ðŸŠ',naam:'Zwemmen',kcalPer30:250},
  wandelen:{emoji:'ðŸš¶',naam:'Wandelen',kcalPer30:150},
  yoga:{emoji:'ðŸ§˜',naam:'Yoga',kcalPer30:200},
  stretchen:{emoji:'ðŸ¤¸',naam:'Stretchen',kcalPer30:100},
  foam_rolling:{emoji:'ðŸ§±',naam:'Foam rolling',kcalPer30:80},
  mobiliteit:{emoji:'ðŸ”„',naam:'Mobiliteit',kcalPer30:100},
  overig:{emoji:'ðŸ‹ï¸',naam:'Overig',kcalPer30:200}
};

// ===== IF SCHEMAS =====
const IF_SCHEMAS = {
  '16:8': {vastenUren:16, eetUren:8, label:'16:8', defaultStart:12, defaultEnd:20},
  '18:6': {vastenUren:18, eetUren:6, label:'18:6', defaultStart:12, defaultEnd:18},
  '20:4': {vastenUren:20, eetUren:4, label:'20:4', defaultStart:14, defaultEnd:18},
  '23:1': {vastenUren:23, eetUren:1, label:'OMAD (23:1)', defaultStart:18, defaultEnd:19},
  'custom': {vastenUren:16, eetUren:8, label:'Custom', defaultStart:12, defaultEnd:20}
};

// ===== STATE =====
let profile = ld('profile', {...DEFAULT_PROFILE});
let meals = ld('meals', {}); 
let water = ld('water', {}); 
let workoutsDone = ld('workoutsDone', {}); 
let activities = ld('activities', {}); 
let steps = ld('steps', {}); 
let weightLog = ld('weightLog', {}); 
let customExercises = ld('customExercises', []);
let ifState = ld('ifState', {
  schema: '16:8',
  eetStart: 12,
  eetEnd: 20,
  vastenActief: false,
  vastenStartTijd: null,
  streak: 0,
  log: {} // { "2024-03-18": true/false }
});

// ===== INJURIES STATE =====
let injuries = ld('injuries', {
  schouder: {actief:false, kant:'beide'},
  knie: {actief:false, kant:'beide'},
  rug: {actief:false, kant:'onder'},
  enkel: {actief:false, kant:'beide'},
  pols: {actief:false, kant:'beide'},
  heup: {actief:false, kant:'beide'},
  nek: {actief:false},
  overig: {actief:false, tekst:''}
});

// ===== FYSIO STATE =====
let fysioExercises = ld('fysioExercises', [...DEFAULT_FYSIO_EXERCISES]);
let fysioLog = ld('fysioLog', {}); // { "2024-03-18": { "fysio_1": true, "fysio_2": false } }

// ===== HABIT TRACKER STATE =====
const DEFAULT_HABITS = [
  {id:'h_train',emoji:'ðŸ’ª',naam:'Getraind vandaag',frequentie:'dagelijks'},
  {id:'h_food',emoji:'ðŸ¥—',naam:'Gezond gegeten',frequentie:'dagelijks'},
  {id:'h_if',emoji:'ðŸ•',naam:'IF schema gehaald',frequentie:'dagelijks'},
  {id:'h_water',emoji:'ðŸ’§',naam:'8 glazen water gedronken',frequentie:'dagelijks'},
  {id:'h_stretch',emoji:'ðŸ§˜',naam:'Gestretcht / yoga',frequentie:'dagelijks'},
  {id:'h_steps',emoji:'ðŸ‘£',naam:'10.000 stappen gehaald',frequentie:'dagelijks'},
  {id:'h_sleep',emoji:'ðŸ˜´',naam:'7+ uur geslapen',frequentie:'dagelijks'},
  {id:'h_fysio',emoji:'ðŸ¥',naam:'Fysio oefeningen gedaan',frequentie:'dagelijks'}
];
let habitList = ld('habitList', [...DEFAULT_HABITS]);
let habitLog = ld('habitLog', {}); // { "2024-03-18": { "h_train": true, "h_food": false, ... } }
let habitAchievements = ld('habitAchievements', []); // ["perfect_day", "streak_3", ...]

// ===== GYM EXERCISES =====
const DEFAULT_GYM_EXERCISES = [
  'Leg press','Leg extension','Leg curl','Hip abduction','Hip adduction',
  'Climbmill / Stairmaster','Crosstrainer / Elliptical','Chest press machine','Lat pulldown',
  'Cable row / seated row','Bicep curl','Tricep pushdown',
  'Shoulder press machine','Smith machine squats','Calf raise machine','Ab crunch machine'
];
let gymExercises = ld('gymExercises', [...DEFAULT_GYM_EXERCISES]);
let gymLog = ld('gymLog', {}); // { "2024-03-18": { "Leg press": {gewicht:80,sets:3,reps:12,stand:"stand 5",notities:""} } }

// ===== STRETCH ROUTINE (for rest days) =====
const STRETCH_ROUTINE = [
  {naam:'Hamstring stretch',duur:'30s per been',emoji:'ðŸ¦µ'},
  {naam:'Quad stretch',duur:'30s per been',emoji:'ðŸ¦µ'},
  {naam:'Hip flexor stretch',duur:'30s per been',emoji:'ðŸ¦µ'},
  {naam:'Schouder stretch',duur:'30s per arm',emoji:'ðŸ’ª'},
  {naam:'Cat-cow stretch',duur:'10 herhalingen',emoji:'ðŸ±'},
  {naam:'Child\'s pose',duur:'60s',emoji:'ðŸ§’'},
  {naam:'Pigeon pose',duur:'30s per been',emoji:'ðŸ¦'},
  {naam:'Downward dog',duur:'45s',emoji:'ðŸ•'}
];

// ===== UTILITY =====
function escHtml(s){const d=document.createElement('div');d.textContent=s||'';return d.innerHTML}
function toast(msg){const t=document.createElement('div');t.className='toast';t.textContent=msg;document.body.appendChild(t);setTimeout(()=>t.remove(),2500)}
function openModal(id){document.getElementById(id).classList.add('open')}
function closeModal(id){document.getElementById(id).classList.remove('open')}
function today(){return new Date().toISOString().split('T')[0]}

function getDayNumber(){
  const start = new Date(profile.startDatum);
  const now = new Date(today());
  const diff = Math.floor((now - start) / 86400000) + 1;
  return Math.max(1, Math.min(diff, 28));
}

function getWeekAndDay(){
  const d = getDayNumber();
  const week = Math.ceil(d / 7);
  const dayInWeek = ((d - 1) % 7) + 1;
  return {week: Math.min(week, 4), dayInWeek, dayNumber: d};
}

// ===== BMR / TDEE =====
function calcBMR(){
  let bmr;
  if(profile.geslacht === 'man'){
    bmr = 10 * profile.gewicht + 6.25 * profile.lengte - 5 * profile.leeftijd + 5;
  } else {
    bmr = 10 * profile.gewicht + 6.25 * profile.lengte - 5 * profile.leeftijd - 161;
  }
  // Perimenopauze: -5% BMR
  if(profile.geslacht === 'vrouw_peri') {
    bmr = Math.round(bmr * 0.95);
  }
  return Math.round(bmr);
}
function isPerimenopauze(){ return profile.geslacht === 'vrouw_peri'; }

function getActivityFactor(){
  const factors = {sedentair:1.2,licht_actief:1.375,actief:1.55,zeer_actief:1.725};
  return factors[profile.activiteit] || 1.55;
}

function calcTDEE(){ return Math.round(calcBMR() * getActivityFactor()); }
function calcTarget(){
  const defaultDeficit = isPerimenopauze() ? -300 : -500;
  return calcTDEE() + (profile.deficit || defaultDeficit);
}

function getMacroTargets(){
  const target = calcTarget();
  let eiwitPct, vetPct;
  if(isPerimenopauze()) {
    // Perimenopauze: 35% eiwit, 25% vet, 40% koolhydraten
    eiwitPct = 0.35;
    vetPct = 0.25;
  } else {
    // Standaard: ~30% eiwit (2g/kg), 25% vet
    eiwitPct = 0.30;
    vetPct = 0.25;
  }
  const eiwit = isPerimenopauze() ? Math.round(target * eiwitPct / 4) : Math.round(profile.gewicht * 2);
  const vet = Math.round(target * vetPct / 9);
  const eiwitKcal = eiwit * 4;
  const vetKcal = vet * 9;
  const koolhydraten = Math.round((target - eiwitKcal - vetKcal) / 4);
  return {eiwit, koolhydraten, vet, eiwitKcal, vetKcal, koolhydratenKcal: koolhydraten * 4};
}

// ===== DAILY DATA =====
function getTodayMeals(){
  const d = today();
  if(!meals[d]) meals[d] = {ontbijt:[],lunch:[],diner:[],snacks:[]};
  return meals[d];
}

function getTodayTotals(){
  const m = getTodayMeals();
  let kcal=0,eiwit=0,koolhydraten=0,vet=0;
  Object.values(m).forEach(arr => arr.forEach(item => {
    kcal += item.kcal||0;
    eiwit += item.eiwit||0;
    koolhydraten += item.koolhydraten||0;
    vet += item.vet||0;
  }));
  return {kcal,eiwit,koolhydraten,vet};
}

function getTodaySteps(){ return steps[today()] || 0; }
function getTodayWater(){ return water[today()] || 0; }

function getTodayExtraBurn(){
  const s = getTodaySteps();
  const stepBurn = Math.round(s * 0.04);
  const acts = activities[today()] || [];
  const actBurn = acts.reduce((sum, a) => sum + (a.kcal||0), 0);
  const wo = workoutsDone[today()];
  const woBurn = wo && wo.done ? Math.round((wo.minutes||25) * 8) : 0; // ~8 kcal/min compound+HIIT
  return {stepBurn, actBurn, woBurn, total: stepBurn + actBurn + woBurn};
}

function getTodayWorkoutMinutes(){
  const wo = workoutsDone[today()];
  return wo && wo.done ? (wo.minutes||25) : 0;
}

// ===== IF (INTERMITTENT FASTING) FUNCTIONS =====
function getIFStatus(){
  const now = new Date();
  const currentHour = now.getHours() + now.getMinutes() / 60;
  const eetStart = ifState.eetStart;
  const eetEnd = ifState.eetEnd;
  
  let isEetvenster = false;
  if(eetStart < eetEnd) {
    isEetvenster = currentHour >= eetStart && currentHour < eetEnd;
  } else {
    isEetvenster = currentHour >= eetStart || currentHour < eetEnd;
  }
  
  let urenTotWissel, statusText, statusEmoji;
  if(isEetvenster) {
    // In eetvenster - bereken uren tot einde
    let uurTotEnd = eetEnd - currentHour;
    if(uurTotEnd < 0) uurTotEnd += 24;
    urenTotWissel = uurTotEnd;
    const uren = Math.floor(urenTotWissel);
    const minuten = Math.round((urenTotWissel - uren) * 60);
    statusText = `Eetvenster open: nog ${uren}u ${minuten}m`;
    statusEmoji = 'ðŸŸ¢';
  } else {
    // Vasten - bereken uren tot eetvenster
    let uurTotStart = eetStart - currentHour;
    if(uurTotStart < 0) uurTotStart += 24;
    urenTotWissel = uurTotStart;
    const uren = Math.floor(urenTotWissel);
    const minuten = Math.round((urenTotWissel - uren) * 60);
    statusText = `Vasten: nog ${uren}u ${minuten}m`;
    statusEmoji = 'ðŸ”´';
  }
  
  // Bereken vasten duur als actief
  let vastenDuur = 0;
  if(ifState.vastenActief && ifState.vastenStartTijd) {
    vastenDuur = (Date.now() - ifState.vastenStartTijd) / 3600000; // uren
  }
  
  // Bereken streak
  let streak = 0;
  const d = new Date();
  d.setDate(d.getDate() - 1); // start bij gisteren
  while(true) {
    const ds = d.toISOString().split('T')[0];
    if(ifState.log[ds] === true) {
      streak++;
      d.setDate(d.getDate() - 1);
    } else {
      break;
    }
  }
  // Tel vandaag mee als gehaald
  if(ifState.log[today()] === true) streak++;
  
  return {isEetvenster, urenTotWissel, statusText, statusEmoji, vastenDuur, streak};
}

function getIFProgress24h(){
  const now = new Date();
  const currentHour = now.getHours() + now.getMinutes() / 60;
  return (currentHour / 24) * 100;
}

function toggleVasten(){
  if(ifState.vastenActief) {
    ifState.vastenActief = false;
    ifState.vastenStartTijd = null;
    toast('Vasten gestopt');
  } else {
    ifState.vastenActief = true;
    ifState.vastenStartTijd = Date.now();
    toast('Vasten gestart! ðŸ’ª');
  }
  sv('ifState', ifState);
  renderVoeding();
}

function logIFDag(gehaald){
  ifState.log[today()] = gehaald;
  sv('ifState', ifState);
  renderVoeding();
  toast(gehaald ? 'IF schema gehaald! ðŸŽ‰' : 'Niet gehaald, morgen beter! ðŸ’ª');
}

function updateIFSchema(schema){
  ifState.schema = schema;
  if(schema !== 'custom') {
    const s = IF_SCHEMAS[schema];
    ifState.eetStart = s.defaultStart;
    ifState.eetEnd = s.defaultEnd;
  }
  sv('ifState', ifState);
  renderVoeding();
}

function updateIFTijden(){
  const startEl = document.getElementById('ifEetStart');
  const endEl = document.getElementById('ifEetEnd');
  if(startEl && endEl) {
    const startParts = startEl.value.split(':');
    const endParts = endEl.value.split(':');
    ifState.eetStart = parseInt(startParts[0]) + parseInt(startParts[1]||0) / 60;
    ifState.eetEnd = parseInt(endParts[0]) + parseInt(endParts[1]||0) / 60;
    sv('ifState', ifState);
    renderVoeding();
  }
}

// ===== TABS =====
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
    renderTab(btn.dataset.tab);
  });
});

function renderTab(tab){
  switch(tab){
    case 'dashboard': renderDashboard(); break;
    case 'voeding': renderVoeding(); break;
    case 'workouts': renderWorkouts(); break;
    case 'activiteit': renderActiviteit(); break;
    case 'profiel': renderProfiel(); break;
    case 'habits': renderHabits(); break;
  }
}

// ===== GET TODAY'S WORKOUT TYPE =====
function getTodayWorkoutType(){
  const {week, dayInWeek} = getWeekAndDay();
  const weekPlan = WORKOUT_PLAN[week];
  if(!weekPlan) return null;
  const dayPlan = weekPlan.find(d => d.dag === dayInWeek);
  if(!dayPlan) return null;
  const typeInfo = DAY_TYPES[dayPlan.dagType];
  return {naam: dayPlan.naam, type: dayPlan.dagType, ...typeInfo};
}

// ===== DASHBOARD =====
function renderDashboard(){
  const {week, dayInWeek, dayNumber} = getWeekAndDay();
  const totals = getTodayTotals();
  const target = calcTarget();
  const extraBurn = getTodayExtraBurn();
  const adjustedTarget = target + extraBurn.total;
  const remainingKcal = adjustedTarget - totals.kcal;
  const stepsToday = getTodaySteps();
  const woMinutes = getTodayWorkoutMinutes();
  const remainingSteps = Math.max(0, (profile.stappenDoel||10000) - stepsToday);
  const remainingMin = Math.max(0, (profile.trainMinDoel||30) - woMinutes);
  const progressPct = Math.round((dayNumber / 28) * 100);
  const ifStatus = getIFStatus();
  const todayWorkout = getTodayWorkoutType();

  // Update header
  document.getElementById('headerSubtitle').textContent = `Dag ${dayNumber} van 28 â€¢ Week ${week}`;

  let html = '';

  // Perimenopauze banner
  if(isPerimenopauze()) {
    html += `<div class="peri-banner"><span class="peri-icon">ðŸŒ¸</span> Perimenopauze modus â€” aangepast programma voor optimale vetverbranding</div>`;
  }

  // Welcome
  html += `<div class="card" style="text-align:center;padding:20px">
    <div style="font-size:1.3rem;font-weight:800;margin-bottom:4px">ðŸ‘‹ Hey ${escHtml(profile.naam)}!</div>
    <div style="color:var(--text-light);font-size:.85rem">Dag ${dayNumber} van 28 â€” Week ${week}, dag ${dayInWeek}</div>
    <div class="progress-bar" style="height:12px;margin-top:12px">
      <div class="progress-fill orange" style="width:${progressPct}%"></div>
    </div>
    <div style="font-size:.75rem;color:var(--text-light);margin-top:4px">${progressPct}% voltooid</div>
    <div class="day-indicator" style="justify-content:center;margin-top:8px">
      ${Array.from({length:28},(_, i) => `<div class="day-dot ${i < dayNumber - 1 ? 'done' : ''} ${i === dayNumber - 1 ? 'today' : ''}"></div>`).join('')}
    </div>
  </div>`;

  // IF Status + Today's workout
  html += `<div class="stat-grid">
    <div class="stat-box" style="border:2px solid ${ifStatus.isEetvenster ? '#43a047' : '#e53935'}">
      <div class="stat-icon">${ifStatus.statusEmoji}</div>
      <div class="stat-value" style="font-size:1rem;color:${ifStatus.isEetvenster ? '#43a047' : '#e53935'}">${ifStatus.isEetvenster ? 'Eetvenster' : 'Vasten'}</div>
      <div class="stat-label">${ifStatus.statusText}</div>
      ${ifStatus.streak > 0 ? `<div style="font-size:.7rem;color:var(--accent);margin-top:2px">ðŸ”¥ ${ifStatus.streak} dagen streak</div>` : ''}
    </div>
    <div class="stat-box" style="border:2px solid ${todayWorkout ? todayWorkout.color || 'var(--accent)' : '#757575'}">
      <div class="stat-icon">${todayWorkout ? todayWorkout.emoji : 'ðŸ§˜'}</div>
      <div class="stat-value" style="font-size:.85rem;color:${todayWorkout ? todayWorkout.color || 'var(--accent)' : '#757575'}">${todayWorkout ? todayWorkout.label : 'Rustdag'}</div>
      <div class="stat-label">Training vandaag</div>
    </div>
  </div>`;

  // Live counters
  html += `<div class="stat-grid">
    <div class="stat-box accent">
      <div class="stat-icon">ðŸ½ï¸</div>
      <div class="stat-value" style="color:${remainingKcal < 0 ? 'var(--red)' : 'var(--accent)'}">${remainingKcal > 0 ? remainingKcal : Math.abs(remainingKcal)}</div>
      <div class="stat-label">${remainingKcal >= 0 ? 'kcal nog eten' : 'kcal OVER budget'}</div>
    </div>
    <div class="stat-box" style="border:2px solid #43a047">
      <div class="stat-icon">ðŸ’ª</div>
      <div class="stat-value" style="color:#43a047">${remainingMin}</div>
      <div class="stat-label">min nog trainen</div>
    </div>
    <div class="stat-box" style="border:2px solid #1e88e5">
      <div class="stat-icon">ðŸ‘£</div>
      <div class="stat-value" style="color:#1e88e5">${remainingSteps.toLocaleString()}</div>
      <div class="stat-label">stappen te gaan</div>
    </div>
    <div class="stat-box" style="border:2px solid #42a5f5">
      <div class="stat-icon">ðŸ’§</div>
      <div class="stat-value" style="color:#42a5f5">${getTodayWater()}/8</div>
      <div class="stat-label">glazen water</div>
    </div>
  </div>`;

  // Smart advice
  if(remainingKcal < -200){
    const extraMin = Math.round(Math.abs(remainingKcal) / 8);
    html += `<div class="card" style="background:#fff3e0;border-left:4px solid var(--accent)">
      <div style="font-size:.85rem">âš ï¸ Je zit <strong>${Math.abs(remainingKcal)} kcal</strong> over je budget. Nog <strong>${extraMin} minuten</strong> extra trainen aanbevolen!</div>
    </div>`;
  } else if(extraBurn.total > 100){
    html += `<div class="card" style="background:#e8f5e9;border-left:4px solid #43a047">
      <div style="font-size:.85rem">ðŸ”¥ Extra verbranding: <strong>${extraBurn.total} kcal</strong> (stappen: ${extraBurn.stepBurn}, activiteit: ${extraBurn.actBurn}, workout: ${extraBurn.woBurn}). Je mag ${extraBurn.total} kcal extra eten!</div>
    </div>`;
  }

  // Habit tracker widget
  const habitScore = getTodayHabitScore();
  const habitScoreColor = getHabitScoreColor(habitScore.pct);
  const longestStreak = getLongestActiveStreak();
  html += `<div class="card">
    <h3>âœ… Habits vandaag</h3>
    <div class="habit-dashboard-widget">
      <div class="hdw-score" style="color:${habitScoreColor}">${habitScore.done}/${habitScore.total}</div>
      <div class="hdw-bar">
        <div class="hdw-bar-fill" style="width:${habitScore.pct}%;background:${habitScoreColor}"></div>
      </div>
      <span style="font-size:.8rem;font-weight:700;color:${habitScoreColor}">${habitScore.pct}%</span>
    </div>
    ${longestStreak > 0 ? `<div style="font-size:.8rem;color:var(--accent);margin-top:6px">ðŸ”¥ Langste actieve streak: ${longestStreak} dagen</div>` : ''}
  </div>`;

  // Today summary
  html += `<div class="card">
    <h3>ðŸ“‹ Vandaag</h3>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px;font-size:.85rem">
      <div>ðŸ½ï¸ Gegeten: <strong>${totals.kcal} kcal</strong></div>
      <div>ðŸ”¥ Verbrand: <strong>${extraBurn.total} kcal</strong></div>
      <div>ðŸ‘£ Stappen: <strong>${stepsToday.toLocaleString()}</strong></div>
      <div>ðŸ’ª Training: <strong>${woMinutes} min</strong></div>
    </div>
    <div style="margin-top:8px;font-size:.8rem;color:var(--text-light)">
      Calorie balans: ${calcTDEE()} (TDEE) + ${extraBurn.total} (extra) âˆ’ ${totals.kcal} (gegeten) = <strong style="color:${adjustedTarget - totals.kcal >= 0 ? 'var(--green)' : 'var(--red)'}">${adjustedTarget - totals.kcal} kcal</strong>
    </div>
  </div>`;

  // Quote
  const quoteIdx = Math.min(dayNumber - 1, QUOTES.length - 1);
  html += `<div class="quote-card">
    <div class="quote-text">"${QUOTES[quoteIdx]}"</div>
    <div class="quote-day">Dag ${dayNumber} van 28</div>
  </div>`;

  // Weight chart
  const weightEntries = Object.entries(weightLog).sort((a,b) => a[0].localeCompare(b[0]));
  if(weightEntries.length > 0){
    html += `<div class="card">
      <h3>âš–ï¸ Gewichtsverloop</h3>
      <div class="chart-container"><canvas id="weightChart" height="150"></canvas></div>
    </div>`;
  } else {
    html += `<div class="card" style="text-align:center">
      <div style="font-size:1.5rem;margin-bottom:4px">âš–ï¸</div>
      <div style="font-size:.85rem;color:var(--text-light)">Log je gewicht bij Profiel om de grafiek te zien</div>
    </div>`;
  }

  document.getElementById('dashboardContent').innerHTML = html;
  if(weightEntries.length > 0) setTimeout(() => drawWeightChart(), 50);
}

function drawWeightChart(){
  const canvas = document.getElementById('weightChart');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = 150 * dpr;
  canvas.style.height = '150px';
  ctx.scale(dpr, dpr);
  const w = rect.width, h = 150;

  const entries = Object.entries(weightLog).sort((a,b) => a[0].localeCompare(b[0]));
  if(entries.length < 1) return;

  const weights = entries.map(e => e[1]);
  const minW = Math.min(...weights) - 1;
  const maxW = Math.max(...weights) + 1;
  const range = maxW - minW || 1;

  const padL = 40, padR = 10, padT = 15, padB = 30;
  const chartW = w - padL - padR;
  const chartH = h - padT - padB;

  ctx.strokeStyle = '#eee';
  ctx.lineWidth = 1;
  for(let i = 0; i <= 4; i++){
    const y = padT + (chartH / 4) * i;
    ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(w - padR, y); ctx.stroke();
    const val = (maxW - (range / 4) * i).toFixed(1);
    ctx.fillStyle = '#999';
    ctx.font = '10px system-ui';
    ctx.textAlign = 'right';
    ctx.fillText(val, padL - 4, y + 3);
  }

  ctx.beginPath();
  ctx.strokeStyle = '#ff6f00';
  ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round';
  entries.forEach((e, i) => {
    const x = padL + (entries.length === 1 ? chartW / 2 : (i / (entries.length - 1)) * chartW);
    const y = padT + ((maxW - e[1]) / range) * chartH;
    if(i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  entries.forEach((e, i) => {
    const x = padL + (entries.length === 1 ? chartW / 2 : (i / (entries.length - 1)) * chartW);
    const y = padT + ((maxW - e[1]) / range) * chartH;
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#ff6f00';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#333';
    ctx.font = 'bold 9px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText(e[1].toFixed(1), x, y - 10);
  });

  ctx.fillStyle = '#999';
  ctx.font = '9px system-ui';
  ctx.textAlign = 'center';
  if(entries.length <= 10){
    entries.forEach((e, i) => {
      const x = padL + (entries.length === 1 ? chartW / 2 : (i / (entries.length - 1)) * chartW);
      ctx.fillText(e[0].slice(5), x, h - 5);
    });
  } else {
    [0, Math.floor(entries.length/2), entries.length-1].forEach(i => {
      const x = padL + (i / (entries.length - 1)) * chartW;
      ctx.fillText(entries[i][0].slice(5), x, h - 5);
    });
  }
}

// ===== VOEDING =====
function renderVoeding(){
  const totals = getTodayTotals();
  const macros = getMacroTargets();
  const target = calcTarget();
  const extraBurn = getTodayExtraBurn();
  const adjustedTarget = target + extraBurn.total;
  const todayMeals = getTodayMeals();
  const ifStatus = getIFStatus();

  let html = '';

  // === IF TRACKER ===
  html += `<div class="card" style="border-left:4px solid ${ifStatus.isEetvenster ? '#43a047' : '#e53935'}">
    <h3>â° Intermittent Fasting</h3>
    
    <div style="display:flex;gap:6px;margin:8px 0;flex-wrap:wrap">
      ${Object.entries(IF_SCHEMAS).map(([key, s]) => 
        `<button class="chip ${ifState.schema === key ? 'active' : ''}" onclick="updateIFSchema('${key}')" style="font-size:.75rem;padding:6px 12px">${s.label}</button>`
      ).join('')}
    </div>

    <div style="display:flex;gap:8px;margin:8px 0;align-items:center">
      <div style="flex:1">
        <label style="margin:0;font-size:.7rem">Eetvenster start</label>
        <input type="time" id="ifEetStart" value="${String(Math.floor(ifState.eetStart)).padStart(2,'0')}:${String(Math.round((ifState.eetStart % 1) * 60)).padStart(2,'0')}" onchange="updateIFTijden()" style="padding:8px;font-size:.8rem">
      </div>
      <div style="flex:1">
        <label style="margin:0;font-size:.7rem">Eetvenster einde</label>
        <input type="time" id="ifEetEnd" value="${String(Math.floor(ifState.eetEnd)).padStart(2,'0')}:${String(Math.round((ifState.eetEnd % 1) * 60)).padStart(2,'0')}" onchange="updateIFTijden()" style="padding:8px;font-size:.8rem">
      </div>
    </div>

    <!-- Visuele 24u balk -->
    <div style="position:relative;margin:12px 0">
      <div style="display:flex;font-size:.6rem;color:var(--text-light);justify-content:space-between;margin-bottom:2px">
        <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>24:00</span>
      </div>
      <div class="if-bar">
        ${(function(){
          const start = ifState.eetStart;
          const end = ifState.eetEnd;
          let segments = '';
          if(start < end) {
            const pctBefore = (start / 24) * 100;
            const pctEat = ((end - start) / 24) * 100;
            const pctAfter = ((24 - end) / 24) * 100;
            segments = `<div class="if-bar-segment if-bar-fast" style="width:${pctBefore}%"></div>`;
            segments += `<div class="if-bar-segment if-bar-eat" style="width:${pctEat}%"></div>`;
            segments += `<div class="if-bar-segment if-bar-fast" style="width:${pctAfter}%"></div>`;
          } else {
            const pctEatStart = (start / 24) * 100;
            const pctFast = ((start - end) / 24) * 100;
            segments = `<div class="if-bar-segment if-bar-eat" style="width:${(end/24)*100}%"></div>`;
            segments += `<div class="if-bar-segment if-bar-fast" style="width:${pctFast}%"></div>`;
            segments += `<div class="if-bar-segment if-bar-eat" style="width:${((24-start)/24)*100}%"></div>`;
          }
          return segments;
        })()}
        <div class="if-bar-marker" style="left:${getIFProgress24h()}%"></div>
      </div>
      <div style="display:flex;justify-content:center;gap:16px;margin-top:4px;font-size:.7rem">
        <span>ðŸŸ¢ Eetvenster (${Math.round(ifState.eetStart)}:00-${Math.round(ifState.eetEnd)}:00)</span>
        <span>ðŸ”´ Vasten</span>
      </div>
    </div>

    <!-- Status -->
    <div class="if-status-text" style="color:${ifStatus.isEetvenster ? '#43a047' : '#e53935'}">
      ${ifStatus.statusEmoji} ${ifStatus.statusText}
    </div>

    <!-- Visuele cirkel -->
    <div class="if-clock">
      <svg viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="52" fill="none" stroke="#eee" stroke-width="8"/>
        ${(function(){
          const schema = IF_SCHEMAS[ifState.schema] || IF_SCHEMAS['16:8'];
          const eetPct = (ifState.eetEnd - ifState.eetStart + (ifState.eetStart > ifState.eetEnd ? 24 : 0)) / 24;
          const startAngle = (ifState.eetStart / 24) * 360;
          const eetAngle = eetPct * 360;
          const r = 52;
          // Groene arc (eetvenster)
          const startRad = (startAngle - 90) * Math.PI / 180;
          const endRad = (startAngle + eetAngle - 90) * Math.PI / 180;
          const x1 = 60 + r * Math.cos(startRad);
          const y1 = 60 + r * Math.sin(startRad);
          const x2 = 60 + r * Math.cos(endRad);
          const y2 = 60 + r * Math.sin(endRad);
          const largeArc = eetAngle > 180 ? 1 : 0;
          // Rode arc (rest)
          const fastStartRad = endRad;
          const fastEndRad = startRad;
          const fastAngle = 360 - eetAngle;
          const x3 = 60 + r * Math.cos(fastStartRad);
          const y3 = 60 + r * Math.sin(fastStartRad);
          const x4 = 60 + r * Math.cos(fastEndRad);
          const y4 = 60 + r * Math.sin(fastEndRad);
          const largeFast = fastAngle > 180 ? 1 : 0;
          // Current position marker
          const now = new Date();
          const currentHour = now.getHours() + now.getMinutes() / 60;
          const currentAngle = (currentHour / 24) * 360 - 90;
          const cx = 60 + (r + 2) * Math.cos(currentAngle * Math.PI / 180);
          const cy = 60 + (r + 2) * Math.sin(currentAngle * Math.PI / 180);
          return `<path d="M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}" fill="none" stroke="#43a047" stroke-width="8" stroke-linecap="round"/>
                  <path d="M ${x3} ${y3} A ${r} ${r} 0 ${largeFast} 1 ${x4} ${y4}" fill="none" stroke="#e53935" stroke-width="8" stroke-linecap="round"/>
                  <circle cx="${cx}" cy="${cy}" r="5" fill="var(--dark)" stroke="#fff" stroke-width="2"/>`;
        })()}
      </svg>
      <div class="if-clock-center">
        <div class="if-clock-status" style="color:${ifStatus.isEetvenster ? '#43a047' : '#e53935'}">${ifStatus.isEetvenster ? 'ðŸ½ï¸ Eten' : 'ðŸš« Vasten'}</div>
        <div class="if-clock-time">${IF_SCHEMAS[ifState.schema]?.label || ifState.schema}</div>
      </div>
    </div>

    <!-- Vasten timer + controls -->
    <div style="display:flex;gap:8px;margin:8px 0">
      <button class="btn ${ifState.vastenActief ? 'btn-danger' : 'btn-primary'} btn-block" onclick="toggleVasten()">
        ${ifState.vastenActief ? 'â¹ï¸ Stop vasten' : 'â–¶ï¸ Start vasten'}
      </button>
    </div>
    ${ifState.vastenActief ? `<div style="text-align:center;font-size:.85rem;color:var(--text-light)">â±ï¸ Je vast nu ${Math.floor(ifStatus.vastenDuur)}u ${Math.round((ifStatus.vastenDuur % 1) * 60)}m</div>` : ''}

    <!-- Dagelijks loggen -->
    <div style="display:flex;gap:8px;margin-top:8px;align-items:center">
      <span style="font-size:.8rem;flex:1">IF gehaald vandaag?</span>
      <button class="btn btn-green btn-small ${ifState.log[today()] === true ? '' : 'btn-secondary'}" onclick="logIFDag(true)" style="padding:6px 14px;min-height:32px">âœ… Ja</button>
      <button class="btn btn-danger btn-small ${ifState.log[today()] === false ? '' : 'btn-secondary'}" onclick="logIFDag(false)" style="padding:6px 14px;min-height:32px">âŒ Nee</button>
    </div>

    ${ifStatus.streak > 0 ? `<div style="text-align:center;margin-top:8px;font-size:.9rem;font-weight:700;color:var(--accent)">ðŸ”¥ ${ifStatus.streak} dagen op rij gevast!</div>` : ''}
  </div>`;

  // Budget overview
  html += `<div class="card">
    <h3>ðŸ“Š Caloriebudget vandaag</h3>
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin:8px 0">
      <span style="font-size:1.5rem;font-weight:800;color:var(--accent)">${totals.kcal}</span>
      <span style="font-size:.85rem;color:var(--text-light)">/ ${adjustedTarget} kcal</span>
    </div>
    <div class="progress-bar" style="height:14px">
      <div class="progress-fill ${totals.kcal > adjustedTarget ? 'red' : 'orange'}" style="width:${Math.min(100, (totals.kcal/adjustedTarget)*100)}%"></div>
    </div>
    <div style="font-size:.75rem;color:var(--text-light);margin-top:4px">
      Basis: ${target} kcal${extraBurn.total > 0 ? ` + ${extraBurn.total} extra verbranding` : ''} = ${adjustedTarget} kcal
    </div>
  </div>`;

  // Macros
  const eiwitPct = macros.eiwit > 0 ? Math.min(100, (totals.eiwit / macros.eiwit) * 100) : 0;
  const khPct = macros.koolhydraten > 0 ? Math.min(100, (totals.koolhydraten / macros.koolhydraten) * 100) : 0;
  const vetPct = macros.vet > 0 ? Math.min(100, (totals.vet / macros.vet) * 100) : 0;

  html += `<div class="card">
    <h3>ðŸ¥© Macro's</h3>
    <div style="margin-top:8px">
      <div style="display:flex;justify-content:space-between;font-size:.8rem;font-weight:600">
        <span>ðŸ¥© Eiwit</span><span>${totals.eiwit}g / ${macros.eiwit}g</span>
      </div>
      <div class="progress-bar"><div class="progress-fill orange" style="width:${eiwitPct}%"></div></div>
    </div>
    <div style="margin-top:8px">
      <div style="display:flex;justify-content:space-between;font-size:.8rem;font-weight:600">
        <span>ðŸž Koolhydraten</span><span>${totals.koolhydraten}g / ${macros.koolhydraten}g</span>
      </div>
      <div class="progress-bar"><div class="progress-fill blue" style="width:${khPct}%"></div></div>
    </div>
    <div style="margin-top:8px">
      <div style="display:flex;justify-content:space-between;font-size:.8rem;font-weight:600">
        <span>ðŸ¥‘ Vet</span><span>${totals.vet}g / ${macros.vet}g</span>
      </div>
      <div class="progress-bar"><div class="progress-fill purple" style="width:${vetPct}%"></div></div>
    </div>
  </div>`;

  // Meal sections
  const mealTypes = [
    {key:'ontbijt',emoji:'ðŸŒ…',naam:'Ontbijt'},
    {key:'lunch',emoji:'â˜€ï¸',naam:'Lunch'},
    {key:'diner',emoji:'ðŸŒ™',naam:'Diner'},
    {key:'snacks',emoji:'ðŸŽ',naam:'Snacks'}
  ];

  mealTypes.forEach(mt => {
    const items = todayMeals[mt.key] || [];
    const mealKcal = items.reduce((s, i) => s + (i.kcal||0), 0);

    html += `<div class="card card-accent">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
        <h3 style="margin:0">${mt.emoji} ${mt.naam}</h3>
        <span style="font-weight:700;color:var(--accent);font-size:.85rem">${mealKcal} kcal</span>
      </div>`;

    if(items.length > 0){
      items.forEach((item, idx) => {
        html += `<div class="meal-card">
          <div style="display:flex;justify-content:space-between;align-items:flex-start">
            <div>
              <div class="meal-name">${escHtml(item.naam)}</div>
              <div class="meal-macros">
                <span>${item.kcal} kcal</span>
                <span>E:${item.eiwit}g</span>
                <span>K:${item.koolhydraten}g</span>
                <span>V:${item.vet}g</span>
              </div>
            </div>
            <button class="btn btn-danger btn-small" style="padding:4px 8px;min-height:28px;font-size:.7rem" onclick="removeMeal('${mt.key}',${idx})">âœ•</button>
          </div>
        </div>`;
      });
    }

    html += `<div style="display:flex;gap:8px;margin-top:8px">
      <button class="btn btn-primary btn-small" style="flex:1" onclick="openAddMeal('${mt.key}')">âž• Toevoegen</button>
      <button class="btn btn-secondary btn-small" style="flex:1" onclick="openSuggestions('${mt.key}')">ðŸ’¡ Suggesties</button>
    </div>`;
    html += `</div>`;
  });

  // Water tracker
  const waterCount = getTodayWater();
  html += `<div class="card">
    <h3>ðŸ’§ Water (${waterCount}/8 glazen)</h3>
    <div class="progress-bar" style="height:8px;margin-bottom:8px"><div class="progress-fill blue" style="width:${Math.min(100,(waterCount/8)*100)}%"></div></div>
    <div class="water-glasses">
      ${Array.from({length:8},(_, i) => `<div class="water-glass ${i < waterCount ? 'filled' : ''}" onclick="setWater(${i+1})">ðŸ’§</div>`).join('')}
    </div>
  </div>`;

  // Suggested plan for today
  const {dayNumber} = getWeekAndDay();
  const mealOrder = ['ontbijt','lunch','diner','snacks'];
  html += `<div class="card">
    <h3>ðŸ“… Voorgesteld voedingsplan dag ${dayNumber}</h3>
    <div style="font-size:.8rem;color:var(--text-light);margin-bottom:8px">Tik op een suggestie om toe te voegen</div>`;
  mealOrder.forEach(mt => {
    const suggestions = MEAL_SUGGESTIONS[mt];
    const idx = (dayNumber - 1) % suggestions.length;
    const s = suggestions[idx];
    html += `<div class="suggestion-item" onclick="quickAddMeal('${mt}',${idx})">
      <div class="si-name">${mealTypes.find(m=>m.key===mt).emoji} ${s.naam}</div>
      <div class="si-macros">${s.kcal} kcal â€¢ E:${s.eiwit}g K:${s.koolhydraten}g V:${s.vet}g</div>
    </div>`;
  });
  html += `</div>`;

  document.getElementById('voedingContent').innerHTML = html;
}

function openAddMeal(type){
  const typeNames = {ontbijt:'Ontbijt',lunch:'Lunch',diner:'Diner',snacks:'Snack'};
  document.getElementById('modalMealTitle').textContent = `${typeNames[type]} toevoegen`;
  document.getElementById('modalMealBody').innerHTML = `
    <label>Naam</label>
    <input type="text" id="mealName" placeholder="bijv. Broodje gezond">
    <label>CalorieÃ«n (kcal)</label>
    <input type="number" id="mealKcal" placeholder="300">
    <label>Eiwit (g)</label>
    <input type="number" id="mealEiwit" placeholder="20">
    <label>Koolhydraten (g)</label>
    <input type="number" id="mealKh" placeholder="30">
    <label>Vet (g)</label>
    <input type="number" id="mealVet" placeholder="10">
    <div style="margin-top:16px">
      <button class="btn btn-primary btn-block" onclick="saveMeal('${type}')">ðŸ’¾ Toevoegen</button>
    </div>
  `;
  openModal('modalMeal');
}

function saveMeal(type){
  const naam = document.getElementById('mealName').value.trim();
  if(!naam){toast('Vul een naam in');return}
  const m = getTodayMeals();
  m[type].push({
    naam,
    kcal: parseInt(document.getElementById('mealKcal').value)||0,
    eiwit: parseInt(document.getElementById('mealEiwit').value)||0,
    koolhydraten: parseInt(document.getElementById('mealKh').value)||0,
    vet: parseInt(document.getElementById('mealVet').value)||0
  });
  meals[today()] = m;
  sv('meals', meals);
  closeModal('modalMeal');
  renderVoeding();
  toast('Maaltijd toegevoegd!');
}

function removeMeal(type, idx){
  const m = getTodayMeals();
  m[type].splice(idx, 1);
  meals[today()] = m;
  sv('meals', meals);
  renderVoeding();
  toast('Verwijderd');
}

function quickAddMeal(type, sugIdx){
  const s = MEAL_SUGGESTIONS[type][sugIdx];
  const m = getTodayMeals();
  m[type].push({...s});
  meals[today()] = m;
  sv('meals', meals);
  renderVoeding();
  toast(`${s.naam} toegevoegd!`);
}

function openSuggestions(type){
  const typeNames = {ontbijt:'Ontbijt',lunch:'Lunch',diner:'Diner',snacks:'Snacks'};
  document.getElementById('modalSuggestionsTitle').textContent = `ðŸ’¡ ${typeNames[type]} suggesties`;
  const suggestions = MEAL_SUGGESTIONS[type];
  document.getElementById('modalSuggestionsBody').innerHTML = suggestions.map((s, i) =>
    `<div class="suggestion-item" onclick="addSuggestion('${type}',${i})">
      <div class="si-name">${s.naam}</div>
      <div class="si-macros">${s.kcal} kcal â€¢ Eiwit: ${s.eiwit}g â€¢ Koolhydraten: ${s.koolhydraten}g â€¢ Vet: ${s.vet}g</div>
    </div>`
  ).join('');
  openModal('modalSuggestions');
}

function addSuggestion(type, idx){
  const s = MEAL_SUGGESTIONS[type][idx];
  const m = getTodayMeals();
  m[type].push({...s});
  meals[today()] = m;
  sv('meals', meals);
  closeModal('modalSuggestions');
  renderVoeding();
  toast(`${s.naam} toegevoegd!`);
}

function setWater(count){
  const current = getTodayWater();
  water[today()] = count === current ? count - 1 : count;
  sv('water', water);
  renderVoeding();
}

// ===== WORKOUTS =====
let selectedWorkoutWeek = null;

function renderWorkouts(){
  const {week, dayInWeek, dayNumber} = getWeekAndDay();
  if(selectedWorkoutWeek === null) selectedWorkoutWeek = week;

  let html = '';

  // === EFFECTIVITEIT INFO (uitklapbaar) ===
  html += `<div class="card" style="border-left:4px solid #1e88e5">
    <div class="collapsible-header" onclick="toggleCollapsible(this)">
      <h3 style="margin:0">ðŸ’¡ Waarom niet alleen buikoefeningen?</h3>
      <span class="collapsible-arrow">â–¼</span>
    </div>
    <div class="collapsible-body">
      <div style="padding-top:12px;font-size:.85rem;line-height:1.6">
        <p style="margin-bottom:10px"><strong>ðŸ‹ï¸ Compound exercises verbranden meer calorieÃ«n</strong><br>
        Squats, deadlifts en push-ups activeren grote spiergroepen tegelijk. Dit verbrandt tot 3x meer calorieÃ«n dan alleen buikoefeningen. Meer spiermassa = hoger basaalmetabolisme = meer vetverbranding in rust.</p>
        
        <p style="margin-bottom:10px"><strong>ðŸ”¥ HIIT verhoogt je metabolisme tot 24 uur</strong><br>
        High Intensity Interval Training zorgt voor het EPOC-effect (Excess Post-exercise Oxygen Consumption). Je lichaam verbrandt tot 24 uur na de training extra calorieÃ«n â€” het zogenaamde "afterburn effect".</p>
        
        <p style="margin-bottom:10px"><strong>ðŸŽ¯ Core training is belangrijk, maar...</strong><br>
        Je kunt geen vet "spot reducen". 1000 crunches per dag geven je sterke buikspieren, maar als er een laag vet overheen zit, zie je er niets van. Je moet EERST het vetpercentage omlaag.</p>
        
        <p style="margin-bottom:10px"><strong>âš¡ De winnende combinatie</strong><br>
        Compound oefeningen + HIIT + core training + calorie deficit = het snelste resultaat. Dit programma combineert alle vier!</p>
        
        <p style="margin-bottom:10px"><strong>â° Intermittent Fasting helpt</strong><br>
        IF verbetert insulinegevoeligheid en stimuleert vetverbranding. In combinatie met training en een calorie deficit is het een krachtig hulpmiddel. Gebruik de IF tracker bij Voeding!</p>
      </div>
    </div>
  </div>`;

  // Sub-tabs: Trainingsschema vs Sportschool vs Fysio
  html += `<div class="gym-sub-tabs">
    <div class="gym-sub-tab ${gymSubTab === 'schema' ? 'active' : ''}" onclick="gymSubTab='schema';renderWorkouts()">ðŸ“‹ Schema</div>
    <div class="gym-sub-tab ${gymSubTab === 'sportschool' ? 'active' : ''}" onclick="gymSubTab='sportschool';renderWorkouts()">ðŸ‹ï¸ Sportschool</div>
    <div class="gym-sub-tab ${gymSubTab === 'fysio' ? 'active' : ''}" onclick="gymSubTab='fysio';renderWorkouts()">ðŸ¥ Fysio</div>
  </div>`;

  // If sportschool sub-tab selected, show gym section
  if(gymSubTab === 'sportschool'){
    html += renderGymSection();
    document.getElementById('workoutsContent').innerHTML = html;
    return;
  }

  // If fysio sub-tab selected, show fysio section
  if(gymSubTab === 'fysio'){
    html += renderFysioSection();
    document.getElementById('workoutsContent').innerHTML = html;
    return;
  }

  // Week tabs
  html += `<div class="week-tabs">
    ${[1,2,3,4].map(w => `<div class="week-tab ${w === selectedWorkoutWeek ? 'active' : ''}" onclick="selectedWorkoutWeek=${w};renderWorkouts()">
      <div>Week ${w}</div>
      <div class="wt-label">${w<=2?'Basis':'Intensief'}</div>
    </div>`).join('')}
  </div>`;

  // Week schedule overview
  const weekPlan = WORKOUT_PLAN[selectedWorkoutWeek];
  html += `<div class="card" style="padding:10px">
    <div style="display:flex;gap:4px;justify-content:center;flex-wrap:wrap">
      ${weekPlan.map(day => {
        const typeInfo = DAY_TYPES[day.dagType] || DAY_TYPES['rest'];
        return `<div style="text-align:center;padding:4px 6px;border-radius:8px;font-size:.65rem;background:${day.dagType === 'rest' || day.dagType === 'active-rest' ? '#f5f5f5' : '#fff3e0'};min-width:42px">
          <div style="font-weight:700">D${day.dag}</div>
          <div>${typeInfo.emoji}</div>
        </div>`;
      }).join('')}
    </div>
  </div>`;

  weekPlan.forEach(day => {
    const globalDay = (selectedWorkoutWeek - 1) * 7 + day.dag;
    const dateStr = getDateForDay(globalDay);
    const isDone = workoutsDone[dateStr] && workoutsDone[dateStr].done;
    const isToday = dateStr === today();
    const isRest = day.oefeningen.length === 0;
    const isPast = globalDay < dayNumber;
    const typeInfo = DAY_TYPES[day.dagType] || {};

    html += `<div class="card ${isDone ? 'workout-done' : ''}" style="${isToday ? 'border:2px solid var(--accent)' : ''};position:relative">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">
        <div>
          <div style="font-size:.7rem;color:var(--text-light)">Dag ${globalDay} ${isToday ? 'â€¢ VANDAAG' : ''}</div>
          <div style="font-weight:800;font-size:1rem">${escHtml(day.naam)}
            ${typeInfo.badge ? `<span class="day-type-badge ${typeInfo.badge}">${typeInfo.emoji} ${typeInfo.label}</span>` : ''}
          </div>
        </div>
        ${!isRest ? `<span style="font-size:.75rem;color:var(--text-light)">${day.oefeningen.length} oefeningen</span>` : ''}
      </div>`;

    if(isRest){
      const isActiveRest = day.dagType === 'active-rest';
      html += `<div style="text-align:center;padding:16px;color:var(--text-light)">
        <div style="font-size:2rem;margin-bottom:4px">${isActiveRest ? 'ðŸš¶' : 'ðŸ§˜'}</div>
        <div>${isActiveRest ? 'Actief herstel â€” wandelen, stretchen, mobiliteit. Lichte beweging helpt bij herstel!' : 'Rustdag â€” herstel is minstens zo belangrijk!'}</div>
      </div>`;
      // Show stretch routine on rest days (dag 4 and dag 7)
      html += renderStretchRoutine();
    } else {
      // Apply perimenopauze adjustments if applicable
      let dayExercises = day.oefeningen;
      if(isPerimenopauze()) {
        dayExercises = adjustWorkoutForPeri(day.oefeningen);
      }

      dayExercises.forEach(ex => {
        const exData = EXERCISES.find(e => e.id === ex.id);
        if(!exData) return;
        const ytUrl = `https://youtube.com/results?search_query=${encodeURIComponent(exData.naam + ' exercise tutorial')}`;
        const diffLevel = exData.moeilijkheid;
        const diffBadge = diffLevel === 1 ? 'badge-easy' : diffLevel === 2 ? 'badge-medium' : 'badge-hard';
        const diffLabel = diffLevel === 1 ? 'â­' : diffLevel === 2 ? 'â­â­' : 'â­â­â­';
        const catBadge = exData.categorie === 'compound' ? 'badge-compound' : exData.categorie === 'hiit' ? 'badge-hiit' : 'badge-core';
        const catLabel = exData.categorie === 'compound' ? 'ðŸ‹ï¸ Compound' : exData.categorie === 'hiit' ? 'ðŸ”¥ HIIT' : 'ðŸŽ¯ Core';
        const borderColor = exData.categorie === 'compound' ? '#1565c0' : exData.categorie === 'hiit' ? '#c62828' : 'var(--accent)';

        // Injury check
        const injuredBy = isExerciseInjured(ex.id);
        const alt = injuredBy ? INJURY_ALTERNATIVES[ex.id] : null;
        const injNames = {schouder:'Schouder',knie:'Knie',rug:'Rug',enkel:'Enkel',pols:'Pols',heup:'Heup',nek:'Nek'};

        if(injuredBy){
          html += `<div class="ex-card injured" style="border-left-color:#e53935">
            <div style="display:flex;justify-content:space-between;align-items:flex-start">
              <div style="flex:1">
                <div class="ex-name" style="text-decoration:line-through;color:#e53935">${escHtml(exData.naam)}</div>
                <div style="font-size:.75rem;color:#e53935;font-weight:600;margin-top:2px">âš ï¸ Overslaan (${injNames[injuredBy] || injuredBy} blessure)</div>
                ${alt ? `<div style="font-size:.8rem;color:#2e7d32;margin-top:6px;padding:6px 8px;background:#e8f5e9;border-radius:8px">
                  âœ… Alternatief: <strong>${alt.naam}</strong><br>
                  <span style="font-size:.7rem">${alt.reden}</span>
                </div>` : `<div style="font-size:.75rem;color:#e65100;margin-top:4px">ðŸ©º Vraag je fysio voor een geschikt alternatief</div>`}
              </div>
            </div>
          </div>`;
        } else {
          html += `<div class="ex-card" style="border-left-color:${borderColor}" onclick="showExerciseDetail('${ex.id}')">
            <div style="display:flex;justify-content:space-between;align-items:flex-start">
              <div style="flex:1">
                <div class="ex-name">${escHtml(exData.naam)}</div>
                <div class="ex-meta">
                  <span>${ex.sets} sets Ã— ${ex.reps}</span>
                  <span>â¸ï¸ ${ex.rust}s rust</span>
                  <span class="badge ${catBadge}">${catLabel}</span>
                  <span>${diffLabel}</span>
                </div>
              </div>
              <div style="display:flex;gap:4px;align-items:center">
                ${exData.type === 'tijd' ? `<button class="btn btn-secondary btn-small" style="padding:4px 8px;min-height:28px" onclick="event.stopPropagation();openTimerForEx('${exData.naam}','${ex.reps}')">â±ï¸</button>` : ''}
                <a href="${ytUrl}" target="_blank" onclick="event.stopPropagation()" style="text-decoration:none;font-size:1.2rem">ðŸ“º</a>
              </div>
            </div>
          </div>`;
        }
      });

      if(!isDone && (isToday || isPast)){
        html += `<button class="btn btn-green btn-block" style="margin-top:8px" onclick="completeWorkout('${dateStr}',${day.oefeningen.length})">
          âœ… Workout voltooien
        </button>`;
      }
    }

    html += `</div>`;
  });

  // Custom exercises
  if(customExercises.length > 0){
    html += `<div class="card"><h3>ðŸ‹ï¸ Eigen oefeningen</h3>`;
    customExercises.forEach((ex, i) => {
      html += `<div class="ex-card" style="border-left-color:#7b1fa2">
        <div style="display:flex;justify-content:space-between">
          <div>
            <div class="ex-name">${escHtml(ex.naam)}</div>
            <div class="ex-meta">
              <span>${ex.sets} sets Ã— ${ex.reps}</span>
              <span>â¸ï¸ ${ex.rust}s rust</span>
            </div>
            ${ex.beschrijving ? `<div class="ex-desc">${escHtml(ex.beschrijving)}</div>` : ''}
          </div>
          <button class="btn btn-danger btn-small" style="padding:4px 8px;min-height:28px" onclick="removeCustomEx(${i})">âœ•</button>
        </div>
      </div>`;
    });
    html += `</div>`;
  }

  html += `<button class="btn btn-secondary btn-block" onclick="openModal('modalCustomExercise')" style="margin-top:8px">
    âž• Eigen oefening toevoegen
  </button>`;

  document.getElementById('workoutsContent').innerHTML = html;
}

function toggleCollapsible(header){
  const body = header.nextElementSibling;
  const arrow = header.querySelector('.collapsible-arrow');
  body.classList.toggle('open');
  arrow.classList.toggle('open');
}

function getDateForDay(dayNum){
  const start = new Date(profile.startDatum);
  start.setDate(start.getDate() + dayNum - 1);
  return start.toISOString().split('T')[0];
}

function showExerciseDetail(id){
  const ex = EXERCISES.find(e => e.id === id);
  if(!ex) return;
  document.getElementById('modalExerciseTitle').textContent = ex.naam;
  const diffLevel = ex.moeilijkheid;
  const diffLabel = diffLevel === 1 ? 'â­ Makkelijk' : diffLevel === 2 ? 'â­â­ Gemiddeld' : 'â­â­â­ Moeilijk';
  const catLabel = ex.categorie === 'compound' ? 'ðŸ‹ï¸ Compound' : ex.categorie === 'hiit' ? 'ðŸ”¥ HIIT' : 'ðŸŽ¯ Core';
  const ytUrl = `https://youtube.com/results?search_query=${encodeURIComponent(ex.naam + ' exercise tutorial')}`;

  document.getElementById('modalExerciseBody').innerHTML = `
    <div style="display:flex;gap:8px;margin-bottom:12px">
      <span class="badge ${ex.categorie === 'compound' ? 'badge-compound' : ex.categorie === 'hiit' ? 'badge-hiit' : 'badge-core'}">${catLabel}</span>
      <span class="badge ${diffLevel === 1 ? 'badge-easy' : diffLevel === 2 ? 'badge-medium' : 'badge-hard'}">${diffLabel}</span>
    </div>
    <p style="line-height:1.6;margin-bottom:12px">${escHtml(ex.beschrijving)}</p>
    <div style="font-size:.85rem;margin-bottom:8px"><strong>ðŸ’ª Spieren:</strong> ${escHtml(ex.spieren)}</div>
    <div style="font-size:.85rem;margin-bottom:8px"><strong>ðŸ“ Standaard:</strong> ${ex.standaard}</div>
    <div style="font-size:.85rem;margin-bottom:16px"><strong>â±ï¸ Type:</strong> ${ex.type === 'tijd' ? 'Tijd-gebaseerd' : 'Herhalingen'}</div>
    <div style="display:flex;gap:8px">
      <a href="${ytUrl}" target="_blank" class="btn btn-primary btn-block" style="text-decoration:none">ðŸ“º Bekijk op YouTube</a>
      ${ex.type === 'tijd' ? `<button class="btn btn-secondary" onclick="closeModal('modalExercise');openTimerForEx('${escHtml(ex.naam)}','${ex.standaard}')">â±ï¸ Timer</button>` : ''}
    </div>
  `;
  openModal('modalExercise');
}

function completeWorkout(dateStr, exCount){
  const minutes = Math.round(exCount * 5);
  workoutsDone[dateStr] = {done: true, minutes, timestamp: Date.now()};
  sv('workoutsDone', workoutsDone);
  renderWorkouts();
  toast('ðŸ’ª Workout voltooid! Goed bezig!');
}

function saveCustomExercise(){
  const naam = document.getElementById('customExName').value.trim();
  if(!naam){toast('Vul een naam in');return}
  customExercises.push({
    id: 'custom_' + Date.now(),
    naam,
    sets: parseInt(document.getElementById('customExSets').value)||3,
    reps: document.getElementById('customExReps').value || '12 reps',
    rust: parseInt(document.getElementById('customExRust').value)||30,
    beschrijving: document.getElementById('customExDesc').value
  });
  sv('customExercises', customExercises);
  closeModal('modalCustomExercise');
  document.getElementById('customExName').value = '';
  document.getElementById('customExDesc').value = '';
  renderWorkouts();
  toast('Oefening toegevoegd!');
}

function removeCustomEx(idx){
  customExercises.splice(idx, 1);
  sv('customExercises', customExercises);
  renderWorkouts();
  toast('Verwijderd');
}

// ===== SPORTSCHOOL TRACKING =====
let gymSubTab = 'schema'; // 'schema' or 'sportschool'

function getGymHistory(exerciseName){
  // Return last 5 entries for this exercise, sorted newest first
  const entries = [];
  Object.entries(gymLog).sort((a,b) => b[0].localeCompare(a[0])).forEach(([date, exMap]) => {
    if(exMap[exerciseName]) {
      entries.push({date, ...exMap[exerciseName]});
    }
  });
  return entries.slice(0, 5);
}

function getGymPR(exerciseName){
  let max = 0;
  Object.values(gymLog).forEach(exMap => {
    if(exMap[exerciseName] && exMap[exerciseName].gewicht > max) {
      max = exMap[exerciseName].gewicht;
    }
  });
  return max;
}

function openGymLog(exerciseName){
  const history = getGymHistory(exerciseName);
  const pr = getGymPR(exerciseName);
  const todayEntry = gymLog[today()] && gymLog[today()][exerciseName] ? gymLog[today()][exerciseName] : null;

  document.getElementById('modalGymLogTitle').textContent = 'ðŸ‹ï¸ ' + exerciseName;

  let html = '';

  // Input form - special fields for Crosstrainer
  const isCrosstrainer = exerciseName.toLowerCase().includes('crosstrainer') || exerciseName.toLowerCase().includes('elliptical');
  
  if(isCrosstrainer) {
    html += `<div style="margin-bottom:16px">
      <div class="gym-input-row">
        <div><label style="margin:0;font-size:.7rem">Tijd (minuten)</label>
          <input type="number" id="gymWeight" value="${todayEntry ? todayEntry.gewicht : ''}" placeholder="min" step="1"></div>
        <div><label style="margin:0;font-size:.7rem">Weerstand/niveau</label>
          <input type="number" id="gymSets" value="${todayEntry ? todayEntry.sets : ''}" placeholder="level" min="1"></div>
        <div><label style="margin:0;font-size:.7rem">Afstand (km)</label>
          <input type="number" id="gymReps" value="${todayEntry ? todayEntry.reps : ''}" placeholder="km" step="0.1"></div>
      </div>
      <div class="gym-input-full">
        <div><label style="margin:0;font-size:.7rem">CalorieÃ«n (optioneel)</label>
          <input type="text" id="gymStand" value="${todayEntry ? escHtml(todayEntry.stand||'') : ''}" placeholder="kcal"></div>
        <div><label style="margin:0;font-size:.7rem">Notities</label>
          <input type="text" id="gymNotes" value="${todayEntry ? escHtml(todayEntry.notities||'') : ''}" placeholder="optioneel"></div>
      </div>
      <button class="btn btn-primary btn-block" onclick="saveGymLog('${escHtml(exerciseName).replace(/'/g,"\\'")}')">ðŸ’¾ ${todayEntry ? 'Bijwerken' : 'Opslaan'}</button>
    </div>`;
  } else {
    html += `<div style="margin-bottom:16px">
      <div class="gym-input-row">
        <div><label style="margin:0;font-size:.7rem">Gewicht (kg)</label>
          <input type="number" id="gymWeight" value="${todayEntry ? todayEntry.gewicht : ''}" placeholder="kg" step="0.5"></div>
        <div><label style="margin:0;font-size:.7rem">Sets</label>
          <input type="number" id="gymSets" value="${todayEntry ? todayEntry.sets : '3'}" placeholder="sets" min="1"></div>
        <div><label style="margin:0;font-size:.7rem">Reps</label>
          <input type="number" id="gymReps" value="${todayEntry ? todayEntry.reps : '12'}" placeholder="reps" min="1"></div>
      </div>
      <div class="gym-input-full">
        <div><label style="margin:0;font-size:.7rem">Stand/instelling</label>
          <input type="text" id="gymStand" value="${todayEntry ? escHtml(todayEntry.stand||'') : ''}" placeholder="bijv. stand 5"></div>
        <div><label style="margin:0;font-size:.7rem">Notities</label>
          <input type="text" id="gymNotes" value="${todayEntry ? escHtml(todayEntry.notities||'') : ''}" placeholder="optioneel"></div>
      </div>
      <button class="btn btn-primary btn-block" onclick="saveGymLog('${escHtml(exerciseName).replace(/'/g,"\\'")}')">ðŸ’¾ ${todayEntry ? 'Bijwerken' : 'Opslaan'}</button>
    </div>`;
  }

  // History
  if(history.length > 0){
    html += `<h3 style="font-size:.9rem;margin-bottom:8px">ðŸ“Š Laatste ${history.length} sessies</h3>`;
    let prevWeight = null;
    // Show newest first but compare with next entry (older)
    history.forEach((entry, i) => {
      const nextEntry = history[i + 1]; // older entry
      const isUp = nextEntry && entry.gewicht > nextEntry.gewicht;
      const isPR = pr > 0 && entry.gewicht >= pr;
      html += `<div class="gym-history-row">
        <span style="font-size:.75rem;min-width:70px">${entry.date.slice(5)}</span>
        <span style="font-weight:700;min-width:50px">${entry.gewicht}kg</span>
        <span style="min-width:60px">${entry.sets}Ã—${entry.reps}</span>
        <span style="font-size:.7rem;color:var(--text-light);flex:1">${entry.stand || ''}</span>
        ${isUp ? '<span class="gym-up-arrow">â†‘</span>' : ''}
        ${isPR && i === 0 ? '<span class="gym-pr-badge">ðŸ† PR</span>' : ''}
      </div>`;
    });
  } else {
    html += `<div class="empty-state" style="padding:16px"><div class="empty-icon">ðŸ“</div><p>Nog geen historie voor deze oefening</p></div>`;
  }

  document.getElementById('modalGymLogBody').innerHTML = html;
  openModal('modalGymLog');
}

function saveGymLog(exerciseName){
  const gewicht = parseFloat(document.getElementById('gymWeight').value) || 0;
  const sets = parseInt(document.getElementById('gymSets').value) || 3;
  const reps = parseInt(document.getElementById('gymReps').value) || 12;
  const stand = document.getElementById('gymStand').value.trim();
  const notities = document.getElementById('gymNotes').value.trim();

  if(!gewicht){toast('Vul gewicht in');return}

  if(!gymLog[today()]) gymLog[today()] = {};
  gymLog[today()][exerciseName] = {gewicht, sets, reps, stand, notities};
  sv('gymLog', gymLog);
  closeModal('modalGymLog');
  renderWorkouts();

  // Check for PR
  const pr = getGymPR(exerciseName);
  if(gewicht >= pr) {
    toast(`ðŸ† Nieuw persoonlijk record: ${gewicht}kg voor ${exerciseName}!`);
  } else {
    toast('Sportschool log opgeslagen!');
  }
}

function addCustomGymExercise(){
  const name = document.getElementById('newGymExName').value.trim();
  if(!name){toast('Vul een naam in');return}
  if(gymExercises.includes(name)){toast('Oefening bestaat al');return}
  gymExercises.push(name);
  sv('gymExercises', gymExercises);
  closeModal('modalAddGymExercise');
  document.getElementById('newGymExName').value = '';
  renderWorkouts();
  toast(`${name} toegevoegd!`);
}

function removeGymExercise(idx){
  const name = gymExercises[idx];
  if(!confirm(`${name} verwijderen?`)) return;
  gymExercises.splice(idx, 1);
  sv('gymExercises', gymExercises);
  renderWorkouts();
  toast('Verwijderd');
}

function renderGymSection(){
  const todayLog = gymLog[today()] || {};
  let html = '';

  html += `<div class="card" style="border-left:4px solid #7b1fa2">
    <h3>ðŸ‹ï¸ Sportschool Oefeningen</h3>
    <div style="font-size:.8rem;color:var(--text-light);margin-bottom:12px">Tik op een oefening om gewicht, sets en reps te loggen</div>`;

  gymExercises.forEach((name, idx) => {
    const history = getGymHistory(name);
    const todayEntry = todayLog[name];
    const pr = getGymPR(name);
    const lastEntry = history.length > 0 ? history[0] : null;
    const gymInjured = isGymExerciseInjured(name);
    const injNames = {schouder:'Schouder',knie:'Knie',rug:'Rug',enkel:'Enkel',pols:'Pols',heup:'Heup',nek:'Nek'};

    if(gymInjured){
      html += `<div class="gym-exercise-card" style="opacity:.6;border-left-color:#e53935">
        <div class="gym-ex-name" style="text-decoration:line-through;color:#e53935">
          ${escHtml(name)}
          <span style="font-size:.7rem;color:#e53935">âš ï¸ Overslaan (${injNames[gymInjured]} blessure)</span>
        </div>
      </div>`;
      return;
    }

    html += `<div class="gym-exercise-card" onclick="openGymLog('${escHtml(name).replace(/'/g,"\\'")}')">
      <div class="gym-ex-name">
        ${escHtml(name)}
        ${todayEntry ? '<span style="font-size:.7rem;color:#43a047">âœ… Vandaag gelogd</span>' : ''}
        ${pr > 0 ? `<span style="font-size:.65rem;color:#ffd600;font-weight:700">PR: ${pr}kg</span>` : ''}
      </div>`;

    if(todayEntry){
      html += `<div style="font-size:.8rem;color:var(--dark)">
        <strong>${todayEntry.gewicht}kg</strong> â€¢ ${todayEntry.sets}Ã—${todayEntry.reps}
        ${todayEntry.stand ? `â€¢ ${escHtml(todayEntry.stand)}` : ''}
      </div>`;
    }

    if(history.length > 0 && !todayEntry){
      html += `<div class="gym-history" style="font-size:.75rem;color:var(--text-light)">
        Laatst: ${lastEntry.date.slice(5)} â€” ${lastEntry.gewicht}kg, ${lastEntry.sets}Ã—${lastEntry.reps}
        ${lastEntry.stand ? `(${escHtml(lastEntry.stand)})` : ''}
      </div>`;
    }

    html += `</div>`;
  });

  html += `<div style="display:flex;gap:8px;margin-top:8px">
    <button class="btn btn-secondary btn-block" onclick="openModal('modalAddGymExercise')">âž• Eigen oefening toevoegen</button>
  </div>`;

  html += `</div>`;
  return html;
}

function renderStretchRoutine(){
  let html = `<div class="card" style="border-left:4px solid #43a047;margin-top:8px">
    <h3>ðŸ§˜ Actief Herstel â€” Stretch & Yoga Routine</h3>
    <div style="font-size:.8rem;color:var(--text-light);margin-bottom:8px">Aanbevolen op rustdagen voor herstel en flexibiliteit</div>`;

  STRETCH_ROUTINE.forEach(s => {
    html += `<div class="stretch-item">
      <span style="font-size:1.2rem">${s.emoji}</span>
      <span class="stretch-name">${escHtml(s.naam)}</span>
      <span class="stretch-dur">${s.duur}</span>
    </div>`;
  });

  html += `<div style="margin-top:12px;padding:10px;background:#e8f5e9;border-radius:var(--radius);font-size:.8rem">
    ðŸ’¡ <strong>Tip:</strong> Doe deze routine op rustdagen als actief herstel. Stretchen verbetert je flexibiliteit, vermindert spierpijn en helpt bij herstel na zware trainingen.
  </div>`;
  html += `</div>`;
  return html;
}

// ===== TIMER =====
let timerInterval = null;
let timerSeconds = 0;
let timerRunning = false;

function openTimerForEx(name, duration){
  document.getElementById('timerExName').textContent = name + ' â€” ' + duration;
  timerSeconds = 0;
  timerRunning = false;
  updateTimerDisplay();
  document.getElementById('timerStartBtn').textContent = 'â–¶ï¸ Start';
  openModal('modalTimer');
}

function toggleTimer(){
  if(timerRunning){
    clearInterval(timerInterval);
    timerRunning = false;
    document.getElementById('timerStartBtn').textContent = 'â–¶ï¸ Start';
  } else {
    timerRunning = true;
    document.getElementById('timerStartBtn').textContent = 'â¸ï¸ Pauze';
    timerInterval = setInterval(() => {
      timerSeconds++;
      updateTimerDisplay();
    }, 1000);
  }
}

function resetTimer(){
  clearInterval(timerInterval);
  timerSeconds = 0;
  timerRunning = false;
  updateTimerDisplay();
  document.getElementById('timerStartBtn').textContent = 'â–¶ï¸ Start';
}

function stopTimer(){
  clearInterval(timerInterval);
  timerRunning = false;
}

function updateTimerDisplay(){
  const min = Math.floor(timerSeconds / 60);
  const sec = timerSeconds % 60;
  document.getElementById('timerDisplay').textContent =
    String(min).padStart(2,'0') + ':' + String(sec).padStart(2,'0');
}

// ===== ACTIVITEIT =====
function renderActiviteit(){
  const stepsToday = getTodaySteps();
  const stepsDoel = profile.stappenDoel || 10000;
  const stepsPct = Math.min(100, (stepsToday / stepsDoel) * 100);
  const todayActs = activities[today()] || [];
  const todayActKcal = todayActs.reduce((s, a) => s + (a.kcal||0), 0);

  const startOfWeek = new Date(today());
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);
  let weekSteps = 0, weekActs = 0, weekBurn = 0;
  for(let i = 0; i < 7; i++){
    const d = new Date(startOfWeek);
    d.setDate(d.getDate() + i);
    const ds = d.toISOString().split('T')[0];
    weekSteps += steps[ds] || 0;
    const dayActs = activities[ds] || [];
    weekActs += dayActs.length;
    weekBurn += dayActs.reduce((s, a) => s + (a.kcal||0), 0);
  }

  let html = '';

  html += `<div class="card">
    <h3>ðŸ‘£ Stappen vandaag</h3>
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin:8px 0">
      <span style="font-size:1.5rem;font-weight:800;color:#1e88e5">${stepsToday.toLocaleString()}</span>
      <span style="font-size:.85rem;color:var(--text-light)">/ ${stepsDoel.toLocaleString()}</span>
    </div>
    <div class="progress-bar" style="height:14px">
      <div class="progress-fill blue" style="width:${stepsPct}%"></div>
    </div>
    <div style="display:flex;gap:8px;margin-top:12px">
      <input type="number" id="stepsInput" placeholder="Stappen invoeren" value="${stepsToday || ''}" style="flex:1">
      <button class="btn btn-primary" onclick="saveSteps()">ðŸ’¾</button>
    </div>
  </div>`;

  html += `<div class="card">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
      <h3 style="margin:0">ðŸƒ Activiteiten vandaag</h3>
      <span style="font-weight:700;color:var(--accent)">${todayActKcal} kcal</span>
    </div>`;

  if(todayActs.length > 0){
    todayActs.forEach((a, i) => {
      const at = ACTIVITY_TYPES[a.type] || ACTIVITY_TYPES.overig;
      html += `<div class="activity-item">
        <div class="ai-icon">${at.emoji}</div>
        <div class="ai-info">
          <div class="ai-name">${at.naam}</div>
          <div class="ai-meta">${a.duur} min</div>
        </div>
        <div class="ai-kcal">${a.kcal} kcal</div>
        <button class="btn btn-danger btn-small" style="padding:4px 8px;min-height:28px" onclick="removeActivity(${i})">âœ•</button>
      </div>`;
    });
  } else {
    html += `<div class="empty-state"><div class="empty-icon">ðŸƒ</div><p>Nog geen activiteiten vandaag</p></div>`;
  }

  html += `<button class="btn btn-primary btn-block" onclick="openAddActivity()" style="margin-top:8px">âž• Activiteit toevoegen</button>`;
  html += `</div>`;

  html += `<div class="card">
    <h3>ðŸ“Š Weekoverzicht</h3>
    <div class="stat-grid" style="margin-top:8px">
      <div class="stat-box">
        <div class="stat-icon">ðŸ‘£</div>
        <div class="stat-value" style="font-size:1.1rem">${weekSteps.toLocaleString()}</div>
        <div class="stat-label">Stappen deze week</div>
      </div>
      <div class="stat-box">
        <div class="stat-icon">ðŸƒ</div>
        <div class="stat-value" style="font-size:1.1rem">${weekActs}</div>
        <div class="stat-label">Activiteiten</div>
      </div>
      <div class="stat-box" style="grid-column:span 2">
        <div class="stat-icon">ðŸ”¥</div>
        <div class="stat-value" style="font-size:1.1rem">${weekBurn.toLocaleString()}</div>
        <div class="stat-label">kcal verbrand (activiteiten)</div>
      </div>
    </div>
  </div>`;

  document.getElementById('activiteitContent').innerHTML = html;
}

function saveSteps(){
  const val = parseInt(document.getElementById('stepsInput').value) || 0;
  steps[today()] = val;
  sv('steps', steps);
  renderActiviteit();
  toast('Stappen opgeslagen!');
}

function openAddActivity(){
  document.getElementById('modalActivityBody').innerHTML = `
    <label>Type activiteit</label>
    <select id="actType">
      ${Object.entries(ACTIVITY_TYPES).map(([k,v]) => `<option value="${k}">${v.emoji} ${v.naam} (~${v.kcalPer30} kcal/30min)</option>`).join('')}
    </select>
    <label>Duur (minuten)</label>
    <input type="number" id="actDuur" value="30" min="1">
    <label>CalorieÃ«n (auto-berekend)</label>
    <input type="number" id="actKcal" placeholder="Wordt berekend">
    <div style="font-size:.75rem;color:var(--text-light);margin-top:4px">Laat leeg voor automatische berekening</div>
    <div style="margin-top:16px">
      <button class="btn btn-primary btn-block" onclick="saveActivity()">ðŸ’¾ Toevoegen</button>
    </div>
  `;
  const calcAct = () => {
    const type = document.getElementById('actType').value;
    const duur = parseInt(document.getElementById('actDuur').value) || 30;
    const at = ACTIVITY_TYPES[type];
    const auto = Math.round((duur / 30) * at.kcalPer30);
    document.getElementById('actKcal').placeholder = auto + ' kcal (auto)';
  };
  openModal('modalActivity');
  setTimeout(() => {
    document.getElementById('actType').addEventListener('change', calcAct);
    document.getElementById('actDuur').addEventListener('input', calcAct);
    calcAct();
  }, 100);
}

function saveActivity(){
  const type = document.getElementById('actType').value;
  const duur = parseInt(document.getElementById('actDuur').value) || 30;
  const at = ACTIVITY_TYPES[type];
  let kcal = parseInt(document.getElementById('actKcal').value);
  if(!kcal || isNaN(kcal)) kcal = Math.round((duur / 30) * at.kcalPer30);

  if(!activities[today()]) activities[today()] = [];
  activities[today()].push({type, duur, kcal});
  sv('activities', activities);
  closeModal('modalActivity');
  renderActiviteit();
  toast('Activiteit toegevoegd!');
}

function removeActivity(idx){
  if(!activities[today()]) return;
  activities[today()].splice(idx, 1);
  sv('activities', activities);
  renderActiviteit();
  toast('Verwijderd');
}

// ===== PROFIEL =====
function renderProfiel(){
  const bmr = calcBMR();
  const tdee = calcTDEE();
  const target = calcTarget();

  let html = '';

  html += `<div class="card">
    <h3>ðŸ‘¤ Persoonlijke gegevens</h3>
    <label>Naam</label>
    <input type="text" id="profNaam" value="${escHtml(profile.naam)}" onchange="updateProfile()">
    <label>Gewicht (kg)</label>
    <input type="number" id="profGewicht" value="${profile.gewicht}" step="0.1" onchange="updateProfile()">
    <label>Lengte (cm)</label>
    <input type="number" id="profLengte" value="${profile.lengte}" onchange="updateProfile()">
    <label>Leeftijd</label>
    <input type="number" id="profLeeftijd" value="${profile.leeftijd}" onchange="updateProfile()">
    <label>Geslacht</label>
    <select id="profGeslacht" onchange="updateProfile()">
      <option value="man" ${profile.geslacht==='man'?'selected':''}>Man</option>
      <option value="vrouw" ${profile.geslacht==='vrouw'?'selected':''}>Vrouw</option>
      <option value="vrouw_peri" ${profile.geslacht==='vrouw_peri'?'selected':''}>Vrouw (45+ / perimenopauze)</option>
    </select>
    <label>Activiteitsniveau</label>
    <select id="profActiviteit" onchange="updateProfile()">
      <option value="sedentair" ${profile.activiteit==='sedentair'?'selected':''}>Sedentair (weinig beweging)</option>
      <option value="licht_actief" ${profile.activiteit==='licht_actief'?'selected':''}>Licht actief (1-3x/week)</option>
      <option value="actief" ${profile.activiteit==='actief'?'selected':''}>Actief (3-5x/week)</option>
      <option value="zeer_actief" ${profile.activiteit==='zeer_actief'?'selected':''}>Zeer actief (6-7x/week)</option>
    </select>
  </div>`;

  html += `<div class="card">
    <h3>ðŸ”¢ Berekeningen</h3>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">
      <div style="text-align:center;padding:12px;background:#f5f5f5;border-radius:var(--radius)">
        <div style="font-size:.7rem;color:var(--text-light)">BMR</div>
        <div style="font-size:1.2rem;font-weight:800">${bmr}</div>
        <div style="font-size:.65rem;color:var(--text-light)">kcal/dag</div>
      </div>
      <div style="text-align:center;padding:12px;background:#f5f5f5;border-radius:var(--radius)">
        <div style="font-size:.7rem;color:var(--text-light)">TDEE</div>
        <div style="font-size:1.2rem;font-weight:800">${tdee}</div>
        <div style="font-size:.65rem;color:var(--text-light)">kcal/dag</div>
      </div>
      <div style="text-align:center;padding:12px;background:#fff3e0;border-radius:var(--radius);grid-column:span 2">
        <div style="font-size:.7rem;color:var(--accent)">Dagelijks doel (TDEE ${profile.deficit >= 0 ? '+' : ''}${profile.deficit})</div>
        <div style="font-size:1.4rem;font-weight:800;color:var(--accent)">${target}</div>
        <div style="font-size:.65rem;color:var(--text-light)">kcal/dag</div>
      </div>
    </div>
  </div>`;

  html += `<div class="card">
    <h3>ðŸŽ¯ Doelen</h3>
    <label>Calorie deficit/surplus (kcal)</label>
    <input type="number" id="profDeficit" value="${profile.deficit}" onchange="updateProfile()">
    <div style="font-size:.75rem;color:var(--text-light);margin-top:2px">Negatief = afvallen, Positief = aankomen. Standaard: -500</div>
    <label>Stappendoel per dag</label>
    <input type="number" id="profStappen" value="${profile.stappenDoel||10000}" onchange="updateProfile()">
    <label>Trainingsdoel (minuten/dag)</label>
    <input type="number" id="profTrainMin" value="${profile.trainMinDoel||30}" onchange="updateProfile()">
    <label>Startdatum programma</label>
    <input type="date" id="profStart" value="${profile.startDatum}" onchange="updateProfile()">
  </div>`;

  // Perimenopauze tips
  if(isPerimenopauze()) {
    html += `<div class="card" style="border-left:4px solid #7b1fa2">
      <h3>ðŸŒ¸ Perimenopauze Tips</h3>
      <div class="peri-tips">
        <ul style="list-style:none;padding:0;margin:0">
          <li>ðŸ’ª Krachttraining is extra belangrijk voor spierbehoud</li>
          <li>ðŸ˜´ Slaap 7-8 uur per nacht â€” cruciaal voor hormoonbalans</li>
          <li>ðŸ§˜ Stress verlaagt oestrogeen â†’ meer buikvet. Yoga/meditatie helpt</li>
          <li>ðŸ¥© Eiwit verspreid over de dag (elke maaltijd 20-30g)</li>
          <li>ðŸ‹ï¸ Weerstandstraining 3x/week minimum</li>
        </ul>
      </div>
      <div style="margin-top:8px;font-size:.75rem;color:var(--text-light)">
        â„¹ï¸ BMR is aangepast (-5%), deficit is milder (-300 kcal), eiwit is hoger (35%).
        Workout schema bevat meer krachttraining en minder HIIT voor minder cortisol-stress.
      </div>
    </div>`;
  }

  // Blessures sectie
  html += `<div class="card">
    <h3>ðŸ©¹ Blessures</h3>
    <div style="font-size:.8rem;color:var(--text-light);margin-bottom:8px">Selecteer actieve blessures. Het workout schema wordt automatisch aangepast.</div>
    <div class="injury-section">
      <div class="injury-item">
        <input type="checkbox" id="inj_schouder" ${injuries.schouder.actief?'checked':''} onchange="updateInjuries()">
        <label for="inj_schouder">Schouder</label>
        <select id="inj_schouder_kant" onchange="updateInjuries()" ${!injuries.schouder.actief?'disabled':''}>
          <option value="links" ${injuries.schouder.kant==='links'?'selected':''}>Links</option>
          <option value="rechts" ${injuries.schouder.kant==='rechts'?'selected':''}>Rechts</option>
          <option value="beide" ${injuries.schouder.kant==='beide'?'selected':''}>Beide</option>
        </select>
      </div>
      <div class="injury-item">
        <input type="checkbox" id="inj_knie" ${injuries.knie.actief?'checked':''} onchange="updateInjuries()">
        <label for="inj_knie">Knie</label>
        <select id="inj_knie_kant" onchange="updateInjuries()" ${!injuries.knie.actief?'disabled':''}>
          <option value="links" ${injuries.knie.kant==='links'?'selected':''}>Links</option>
          <option value="rechts" ${injuries.knie.kant==='rechts'?'selected':''}>Rechts</option>
          <option value="beide" ${injuries.knie.kant==='beide'?'selected':''}>Beide</option>
        </select>
      </div>
      <div class="injury-item">
        <input type="checkbox" id="inj_rug" ${injuries.rug.actief?'checked':''} onchange="updateInjuries()">
        <label for="inj_rug">Rug</label>
        <select id="inj_rug_kant" onchange="updateInjuries()" ${!injuries.rug.actief?'disabled':''}>
          <option value="onder" ${injuries.rug.kant==='onder'?'selected':''}>Onderrug</option>
          <option value="boven" ${injuries.rug.kant==='boven'?'selected':''}>Bovenrug</option>
          <option value="beide" ${injuries.rug.kant==='beide'?'selected':''}>Beide</option>
        </select>
      </div>
      <div class="injury-item">
        <input type="checkbox" id="inj_enkel" ${injuries.enkel.actief?'checked':''} onchange="updateInjuries()">
        <label for="inj_enkel">Enkel</label>
        <select id="inj_enkel_kant" onchange="updateInjuries()" ${!injuries.enkel.actief?'disabled':''}>
          <option value="links" ${injuries.enkel.kant==='links'?'selected':''}>Links</option>
          <option value="rechts" ${injuries.enkel.kant==='rechts'?'selected':''}>Rechts</option>
          <option value="beide" ${injuries.enkel.kant==='beide'?'selected':''}>Beide</option>
        </select>
      </div>
      <div class="injury-item">
        <input type="checkbox" id="inj_pols" ${injuries.pols.actief?'checked':''} onchange="updateInjuries()">
        <label for="inj_pols">Pols</label>
        <select id="inj_pols_kant" onchange="updateInjuries()" ${!injuries.pols.actief?'disabled':''}>
          <option value="links" ${injuries.pols.kant==='links'?'selected':''}>Links</option>
          <option value="rechts" ${injuries.pols.kant==='rechts'?'selected':''}>Rechts</option>
          <option value="beide" ${injuries.pols.kant==='beide'?'selected':''}>Beide</option>
        </select>
      </div>
      <div class="injury-item">
        <input type="checkbox" id="inj_heup" ${injuries.heup.actief?'checked':''} onchange="updateInjuries()">
        <label for="inj_heup">Heup</label>
        <select id="inj_heup_kant" onchange="updateInjuries()" ${!injuries.heup.actief?'disabled':''}>
          <option value="links" ${injuries.heup.kant==='links'?'selected':''}>Links</option>
          <option value="rechts" ${injuries.heup.kant==='rechts'?'selected':''}>Rechts</option>
          <option value="beide" ${injuries.heup.kant==='beide'?'selected':''}>Beide</option>
        </select>
      </div>
      <div class="injury-item">
        <input type="checkbox" id="inj_nek" ${injuries.nek.actief?'checked':''} onchange="updateInjuries()">
        <label for="inj_nek">Nek</label>
      </div>
      <div class="injury-item">
        <input type="checkbox" id="inj_overig" ${injuries.overig.actief?'checked':''} onchange="updateInjuries()">
        <label for="inj_overig">Overig</label>
        <input type="text" id="inj_overig_tekst" value="${escHtml(injuries.overig.tekst||'')}" placeholder="Beschrijf..." style="flex:1;padding:6px 8px;font-size:.75rem" onchange="updateInjuries()" ${!injuries.overig.actief?'disabled':''}>
      </div>
    </div>
    ${getActiveInjurySummary()}
  </div>`;

  html += `<div class="card">
    <h3>âš–ï¸ Gewicht loggen</h3>
    <div style="display:flex;gap:8px;margin-top:8px">
      <input type="number" id="weightInput" placeholder="Gewicht (kg)" step="0.1" value="${weightLog[today()] || ''}" style="flex:1">
      <button class="btn btn-primary" onclick="logWeight()">ðŸ’¾</button>
    </div>
    ${weightLog[today()] ? `<div style="font-size:.8rem;color:var(--green);margin-top:4px">âœ… Vandaag gelogd: ${weightLog[today()]} kg</div>` : ''}
  </div>`;

  html += `<div class="card">
    <h3>ðŸ’¾ Backup & Reset</h3>
    <div style="display:flex;flex-direction:column;gap:8px;margin-top:8px">
      <button class="btn btn-primary btn-block" onclick="exportData()">ðŸ“¤ Export data (JSON)</button>
      <button class="btn btn-secondary btn-block" onclick="document.getElementById('importFile').click()">ðŸ“¥ Import data (JSON)</button>
      <input type="file" id="importFile" accept=".json" style="display:none" onchange="importData(event)">
      <button class="btn btn-danger btn-block" onclick="resetAllData()">ðŸ—‘ï¸ Alle data wissen</button>
    </div>
  </div>`;

  document.getElementById('profielContent').innerHTML = html;
}

function updateProfile(){
  profile.naam = document.getElementById('profNaam').value.trim() || 'Pim';
  profile.gewicht = parseFloat(document.getElementById('profGewicht').value) || 85;
  profile.lengte = parseInt(document.getElementById('profLengte').value) || 180;
  profile.leeftijd = parseInt(document.getElementById('profLeeftijd').value) || 38;
  const prevGeslacht = profile.geslacht;
  profile.geslacht = document.getElementById('profGeslacht').value;
  profile.activiteit = document.getElementById('profActiviteit').value;
  // When switching to perimenopauze, suggest milder deficit
  if(profile.geslacht === 'vrouw_peri' && prevGeslacht !== 'vrouw_peri') {
    profile.deficit = -300;
    toast('ðŸŒ¸ Perimenopauze modus geactiveerd: deficit aangepast naar -300 kcal');
  }
  profile.deficit = parseInt(document.getElementById('profDeficit').value) || (profile.geslacht === 'vrouw_peri' ? -300 : -500);
  profile.stappenDoel = parseInt(document.getElementById('profStappen').value) || 10000;
  profile.trainMinDoel = parseInt(document.getElementById('profTrainMin').value) || 30;
  profile.startDatum = document.getElementById('profStart').value || today();
  sv('profile', profile);
  renderProfiel();
}

function logWeight(){
  const val = parseFloat(document.getElementById('weightInput').value);
  if(!val || isNaN(val)){toast('Vul een geldig gewicht in');return}
  weightLog[today()] = val;
  sv('weightLog', weightLog);
  profile.gewicht = val;
  sv('profile', profile);
  renderProfiel();
  toast(`Gewicht gelogd: ${val} kg`);
}

function exportData(){
  const data = {
    profile, meals, water, workoutsDone, activities, steps, weightLog, customExercises, ifState,
    gymExercises, gymLog, injuries, fysioExercises, fysioLog,
    habitList, habitLog, habitAchievements,
    exportDate: new Date().toISOString(),
    version: '3.1'
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'});
  const a = document.createElement('a');
  a.download = 'vetverbranding-backup-' + today() + '.json';
  a.href = URL.createObjectURL(blob);
  a.click();
  toast('Data geÃ«xporteerd!');
}

function importData(e){
  const file = e.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = function(ev){
    try {
      const data = JSON.parse(ev.target.result);
      if(data.profile){profile = data.profile; sv('profile', profile);}
      if(data.meals){meals = data.meals; sv('meals', meals);}
      if(data.water){water = data.water; sv('water', water);}
      if(data.workoutsDone){workoutsDone = data.workoutsDone; sv('workoutsDone', workoutsDone);}
      if(data.activities){activities = data.activities; sv('activities', activities);}
      if(data.steps){steps = data.steps; sv('steps', steps);}
      if(data.weightLog){weightLog = data.weightLog; sv('weightLog', weightLog);}
      if(data.customExercises){customExercises = data.customExercises; sv('customExercises', customExercises);}
      if(data.ifState){ifState = data.ifState; sv('ifState', ifState);}
      if(data.gymExercises){gymExercises = data.gymExercises; sv('gymExercises', gymExercises);}
      if(data.gymLog){gymLog = data.gymLog; sv('gymLog', gymLog);}
      if(data.injuries){injuries = data.injuries; sv('injuries', injuries);}
      if(data.fysioExercises){fysioExercises = data.fysioExercises; sv('fysioExercises', fysioExercises);}
      if(data.fysioLog){fysioLog = data.fysioLog; sv('fysioLog', fysioLog);}
      if(data.habitList){habitList = data.habitList; sv('habitList', habitList);}
      if(data.habitLog){habitLog = data.habitLog; sv('habitLog', habitLog);}
      if(data.habitAchievements){habitAchievements = data.habitAchievements; sv('habitAchievements', habitAchievements);}
      toast('Data geÃ¯mporteerd!');
      renderDashboard();
    } catch(err){
      toast('Ongeldig bestand');
    }
  };
  reader.readAsText(file);
  e.target.value = '';
}

function resetAllData(){
  if(!confirm('ALLE data wissen? Dit kan niet ongedaan worden!')) return;
  if(!confirm('Weet je het zeker?')) return;
  ['profile','meals','water','workoutsDone','activities','steps','weightLog','customExercises','ifState','gymExercises','gymLog','injuries','fysioExercises','fysioLog','habitList','habitLog','habitAchievements'].forEach(k => localStorage.removeItem('sb_' + k));
  profile = {...DEFAULT_PROFILE};
  meals = {};
  water = {};
  workoutsDone = {};
  activities = {};
  steps = {};
  weightLog = {};
  customExercises = [];
  ifState = {schema:'16:8',eetStart:12,eetEnd:20,vastenActief:false,vastenStartTijd:null,streak:0,log:{}};
  gymExercises = [...DEFAULT_GYM_EXERCISES];
  gymLog = {};
  injuries = {schouder:{actief:false,kant:'beide'},knie:{actief:false,kant:'beide'},rug:{actief:false,kant:'onder'},enkel:{actief:false,kant:'beide'},pols:{actief:false,kant:'beide'},heup:{actief:false,kant:'beide'},nek:{actief:false},overig:{actief:false,tekst:''}};
  fysioExercises = [...DEFAULT_FYSIO_EXERCISES];
  fysioLog = {};
  habitList = [...DEFAULT_HABITS];
  habitLog = {};
  habitAchievements = [];
  sv('gymExercises', gymExercises);
  sv('gymLog', gymLog);
  sv('profile', profile);
  sv('ifState', ifState);
  sv('injuries', injuries);
  sv('fysioExercises', fysioExercises);
  sv('fysioLog', fysioLog);
  sv('habitList', habitList);
  sv('habitLog', habitLog);
  sv('habitAchievements', habitAchievements);
  toast('Alle data gewist');
  renderDashboard();
}

// ===== INJURY FUNCTIONS =====
function updateInjuries(){
  injuries.schouder.actief = document.getElementById('inj_schouder').checked;
  injuries.schouder.kant = document.getElementById('inj_schouder_kant')?.value || 'beide';
  injuries.knie.actief = document.getElementById('inj_knie').checked;
  injuries.knie.kant = document.getElementById('inj_knie_kant')?.value || 'beide';
  injuries.rug.actief = document.getElementById('inj_rug').checked;
  injuries.rug.kant = document.getElementById('inj_rug_kant')?.value || 'onder';
  injuries.enkel.actief = document.getElementById('inj_enkel').checked;
  injuries.enkel.kant = document.getElementById('inj_enkel_kant')?.value || 'beide';
  injuries.pols.actief = document.getElementById('inj_pols').checked;
  injuries.pols.kant = document.getElementById('inj_pols_kant')?.value || 'beide';
  injuries.heup.actief = document.getElementById('inj_heup').checked;
  injuries.heup.kant = document.getElementById('inj_heup_kant')?.value || 'beide';
  injuries.nek.actief = document.getElementById('inj_nek').checked;
  injuries.overig.actief = document.getElementById('inj_overig').checked;
  injuries.overig.tekst = document.getElementById('inj_overig_tekst')?.value || '';
  sv('injuries', injuries);
  renderProfiel();
  toast('Blessures bijgewerkt');
}

function getActiveInjuries(){
  const active = [];
  Object.entries(injuries).forEach(([key, val]) => {
    if(val.actief) active.push(key);
  });
  return active;
}

function isExerciseInjured(exerciseId){
  const activeInj = getActiveInjuries();
  for(const inj of activeInj){
    const blocked = INJURY_EXERCISE_MAP[inj] || [];
    if(blocked.includes(exerciseId)) return inj;
  }
  return null;
}

function getActiveInjurySummary(){
  const active = getActiveInjuries();
  if(active.length === 0) return '<div style="font-size:.8rem;color:var(--green);margin-top:8px">âœ… Geen actieve blessures</div>';
  const names = {schouder:'Schouder',knie:'Knie',rug:'Rug',enkel:'Enkel',pols:'Pols',heup:'Heup',nek:'Nek',overig:'Overig'};
  return `<div class="injury-warning" style="margin-top:8px">âš ï¸ Actieve blessures: ${active.map(a => names[a]).join(', ')} â€” workout schema is aangepast</div>`;
}

function isGymExerciseInjured(exerciseName){
  const activeInj = getActiveInjuries();
  for(const inj of activeInj){
    const blocked = INJURY_GYM_MAP[inj] || [];
    if(blocked.includes(exerciseName)) return inj;
  }
  return null;
}

// ===== FYSIO FUNCTIONS =====
function getFysioTodayExercises(){
  const todayDate = new Date();
  const dayOfWeek = todayDate.getDay(); // 0=Sun, 1=Mon...
  return fysioExercises.filter(ex => {
    if(!ex.actief) return false;
    if(ex.frequentie === 'dagelijks') return true;
    if(ex.frequentie === '3x per week') return [1,3,5].includes(dayOfWeek); // Mon, Wed, Fri
    if(ex.frequentie === '2x per week') return [2,4].includes(dayOfWeek); // Tue, Thu
    return true;
  });
}

function toggleFysioCheck(exerciseId){
  if(!fysioLog[today()]) fysioLog[today()] = {};
  fysioLog[today()][exerciseId] = !fysioLog[today()][exerciseId];
  sv('fysioLog', fysioLog);
  renderWorkouts();
}

function getFysioStreak(){
  let streak = 0;
  const d = new Date();
  // Check if today is done (all exercises checked)
  const todayEx = getFysioTodayExercises();
  const todayLog = fysioLog[today()] || {};
  const todayDone = todayEx.length > 0 && todayEx.every(ex => todayLog[ex.id]);
  if(todayDone) streak++;
  
  d.setDate(d.getDate() - 1);
  while(true){
    const ds = d.toISOString().split('T')[0];
    const dayLog = fysioLog[ds];
    if(dayLog && Object.values(dayLog).some(v => v === true)){
      streak++;
      d.setDate(d.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

function addFysioExercise(){
  const naam = document.getElementById('fysioNaam').value.trim();
  if(!naam){toast('Vul een naam in');return}
  const ex = {
    id: 'fysio_' + Date.now(),
    naam,
    beschrijving: document.getElementById('fysioBeschrijving').value.trim(),
    sets: parseInt(document.getElementById('fysioSets').value) || 3,
    reps: parseInt(document.getElementById('fysioReps').value) || 0,
    tijd: parseInt(document.getElementById('fysioTijd').value) || null,
    frequentie: document.getElementById('fysioFrequentie').value,
    notities: document.getElementById('fysioNotities').value.trim(),
    actief: true
  };
  fysioExercises.push(ex);
  sv('fysioExercises', fysioExercises);
  closeModal('modalFysio');
  renderWorkouts();
  toast('Fysio oefening toegevoegd!');
}

function removeFysioExercise(id){
  fysioExercises = fysioExercises.filter(ex => ex.id !== id);
  sv('fysioExercises', fysioExercises);
  renderWorkouts();
  toast('Verwijderd');
}

function toggleFysioActive(id){
  const ex = fysioExercises.find(e => e.id === id);
  if(ex) ex.actief = !ex.actief;
  sv('fysioExercises', fysioExercises);
  renderWorkouts();
}

function renderFysioSection(){
  const todayExercises = getFysioTodayExercises();
  const todayLog = fysioLog[today()] || {};
  const streak = getFysioStreak();
  const doneCount = todayExercises.filter(ex => todayLog[ex.id]).length;
  const allDone = todayExercises.length > 0 && doneCount === todayExercises.length;

  let html = '';

  // Streak
  html += `<div class="fysio-streak">
    <div class="streak-num">ðŸ”¥ ${streak}</div>
    <div class="streak-label">dagen op rij fysio gedaan</div>
  </div>`;

  // Today's exercises
  html += `<div class="card" style="border-left:4px solid #00897b">
    <h3>ðŸ“‹ Vandaag te doen (${doneCount}/${todayExercises.length})</h3>
    <div class="progress-bar" style="height:8px;margin:8px 0"><div class="progress-fill green" style="width:${todayExercises.length>0?(doneCount/todayExercises.length)*100:0}%"></div></div>
    ${allDone ? '<div style="text-align:center;font-size:1rem;color:#00897b;font-weight:700;margin:8px 0">âœ… Alles gedaan! Goed bezig!</div>' : ''}`;

  if(todayExercises.length === 0){
    html += `<div class="empty-state" style="padding:16px"><div class="empty-icon">ðŸ¥</div><p>Geen fysio oefeningen gepland voor vandaag</p></div>`;
  } else {
    todayExercises.forEach(ex => {
      const done = todayLog[ex.id] === true;
      html += `<div class="fysio-card" style="${done?'opacity:.6;':''}">
        <div style="display:flex;align-items:flex-start;gap:10px">
          <input type="checkbox" class="fysio-check" ${done?'checked':''} onchange="toggleFysioCheck('${ex.id}')">
          <div style="flex:1">
            <div style="font-weight:700;font-size:.9rem;${done?'text-decoration:line-through;':''}">${escHtml(ex.naam)}</div>
            <div style="font-size:.8rem;color:var(--text-light);margin-top:2px">
              ${ex.sets}Ã—${ex.reps ? ex.reps + ' reps' : ex.tijd + ' sec'} â€¢ ${ex.frequentie}
            </div>
            ${ex.beschrijving ? `<div style="font-size:.75rem;color:#666;margin-top:4px">${escHtml(ex.beschrijving)}</div>` : ''}
            ${ex.notities ? `<div style="font-size:.75rem;color:#00897b;margin-top:4px;font-style:italic">ðŸ“ ${escHtml(ex.notities)}</div>` : ''}
          </div>
        </div>
      </div>`;
    });
  }
  html += `</div>`;

  // All exercises (manage)
  html += `<div class="card">
    <h3>ðŸ¥ Alle fysio oefeningen</h3>
    <div style="font-size:.8rem;color:var(--text-light);margin-bottom:8px">Beheer je fysio/revalidatie oefeningen</div>`;

  fysioExercises.forEach(ex => {
    html += `<div class="fysio-card" style="${!ex.actief?'opacity:.5;':''}border-left-color:${ex.actief?'#00897b':'#ccc'}">
      <div style="display:flex;justify-content:space-between;align-items:flex-start">
        <div style="flex:1">
          <div style="font-weight:700;font-size:.9rem">${escHtml(ex.naam)} ${!ex.actief?'<span style="font-size:.7rem;color:#999">(inactief)</span>':''}</div>
          <div style="font-size:.8rem;color:var(--text-light)">${ex.sets}Ã—${ex.reps ? ex.reps + ' reps' : ex.tijd + ' sec'} â€¢ ${ex.frequentie}</div>
          ${ex.beschrijving ? `<div style="font-size:.75rem;color:#666;margin-top:4px">${escHtml(ex.beschrijving)}</div>` : ''}
        </div>
        <div style="display:flex;gap:4px">
          <button class="btn btn-small" style="padding:4px 8px;min-height:28px;font-size:.7rem;background:${ex.actief?'#fff3e0':'#e8f5e9'};color:${ex.actief?'#e65100':'#2e7d32'}" onclick="toggleFysioActive('${ex.id}')">${ex.actief?'â¸ï¸':'â–¶ï¸'}</button>
          <button class="btn btn-danger btn-small" style="padding:4px 8px;min-height:28px;font-size:.7rem" onclick="removeFysioExercise('${ex.id}')">âœ•</button>
        </div>
      </div>
    </div>`;
  });

  html += `<button class="btn btn-primary btn-block" onclick="openAddFysio()" style="margin-top:8px">âž• Fysio oefening toevoegen</button>`;
  html += `</div>`;

  // Calendar view (last 28 days)
  html += `<div class="card">
    <h3>ðŸ“… Fysio kalender</h3>
    <div class="fysio-calendar">
      <div class="fysio-cal-header">Ma</div><div class="fysio-cal-header">Di</div><div class="fysio-cal-header">Wo</div>
      <div class="fysio-cal-header">Do</div><div class="fysio-cal-header">Vr</div><div class="fysio-cal-header">Za</div><div class="fysio-cal-header">Zo</div>`;

  // Show last 28 days
  const calStart = new Date();
  calStart.setDate(calStart.getDate() - 27);
  // Pad to start of week (Monday)
  while(calStart.getDay() !== 1) calStart.setDate(calStart.getDate() - 1);
  
  const calEnd = new Date();
  calEnd.setDate(calEnd.getDate() + (7 - calEnd.getDay()) % 7); // end of week
  
  const d = new Date(calStart);
  while(d <= calEnd){
    const ds = d.toISOString().split('T')[0];
    const dayLog = fysioLog[ds];
    const hasDone = dayLog && Object.values(dayLog).some(v => v === true);
    const isToday = ds === today();
    const isFuture = d > new Date();
    html += `<div class="fysio-cal-day ${hasDone?'done':''} ${isToday?'today':''} ${!hasDone && !isFuture?'missed':''}">${d.getDate()}</div>`;
    d.setDate(d.getDate() + 1);
  }

  html += `</div></div>`;

  return html;
}

function openAddFysio(){
  document.getElementById('modalFysioBody').innerHTML = `
    <label>Naam oefening</label>
    <input type="text" id="fysioNaam" placeholder="bijv. Schouder stretch">
    <label>Beschrijving / instructies</label>
    <textarea id="fysioBeschrijving" style="min-height:60px" placeholder="Hoe voer je de oefening uit?"></textarea>
    <label>Sets</label>
    <input type="number" id="fysioSets" value="3" min="1">
    <label>Reps (0 = gebruik tijd)</label>
    <input type="number" id="fysioReps" value="10" min="0">
    <label>Tijd in seconden (als reps = 0)</label>
    <input type="number" id="fysioTijd" value="0" min="0">
    <label>Frequentie</label>
    <select id="fysioFrequentie">
      <option value="dagelijks">Dagelijks</option>
      <option value="3x per week">3x per week</option>
      <option value="2x per week">2x per week</option>
    </select>
    <label>Notities van fysio</label>
    <textarea id="fysioNotities" style="min-height:40px" placeholder="Optioneel"></textarea>
    <div style="margin-top:16px">
      <button class="btn btn-primary btn-block" onclick="addFysioExercise()">ðŸ’¾ Opslaan</button>
    </div>
  `;
  openModal('modalFysio');
}

// ===== HABIT TRACKER FUNCTIONS =====
let newHabitEmoji = 'ðŸ’ª';

function selectHabitEmoji(el, emoji){
  document.querySelectorAll('#habitEmojiPicker .chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  newHabitEmoji = emoji;
}

function saveNewHabit(){
  const naam = document.getElementById('newHabitName').value.trim();
  if(!naam){toast('Vul een naam in');return}
  habitList.push({
    id: 'h_' + Date.now(),
    emoji: newHabitEmoji,
    naam,
    frequentie: document.getElementById('newHabitFreq').value
  });
  sv('habitList', habitList);
  closeModal('modalAddHabit');
  document.getElementById('newHabitName').value = '';
  renderHabits();
  toast('Habit toegevoegd!');
}

function removeHabit(id){
  if(!confirm('Habit verwijderen?')) return;
  habitList = habitList.filter(h => h.id !== id);
  sv('habitList', habitList);
  renderHabits();
  toast('Habit verwijderd');
}

function getHabitsForDate(dateStr){
  const d = new Date(dateStr);
  const dow = d.getDay(); // 0=Sun
  return habitList.filter(h => {
    if(h.frequentie === 'dagelijks') return true;
    if(h.frequentie === 'weekdagen') return dow >= 1 && dow <= 5;
    if(h.frequentie === '3x_per_week') return [1,3,5].includes(dow);
    return true;
  });
}

function toggleHabit(habitId){
  if(!habitLog[today()]) habitLog[today()] = {};
  habitLog[today()][habitId] = !habitLog[today()][habitId];
  sv('habitLog', habitLog);
  checkHabitAchievements();
  renderHabits();
}

function getHabitStreak(habitId){
  let streak = 0;
  const d = new Date(today());
  // Check today first
  if(habitLog[today()] && habitLog[today()][habitId]) {
    streak++;
    d.setDate(d.getDate() - 1);
  } else {
    // If today not done, check from yesterday
    d.setDate(d.getDate() - 1);
  }
  while(true){
    const ds = d.toISOString().split('T')[0];
    const habitsForDay = getHabitsForDate(ds);
    const habitApplies = habitsForDay.some(h => h.id === habitId);
    if(!habitApplies){
      // Skip days where habit doesn't apply
      d.setDate(d.getDate() - 1);
      if(d < new Date(profile.startDatum)) break;
      continue;
    }
    if(habitLog[ds] && habitLog[ds][habitId]){
      streak++;
      d.setDate(d.getDate() - 1);
    } else {
      break;
    }
    if(streak > 365) break;
  }
  return streak;
}

function getHabitBestStreak(habitId){
  let best = 0, current = 0;
  const start = new Date(profile.startDatum);
  const end = new Date(today());
  const d = new Date(start);
  while(d <= end){
    const ds = d.toISOString().split('T')[0];
    const habitsForDay = getHabitsForDate(ds);
    const habitApplies = habitsForDay.some(h => h.id === habitId);
    if(!habitApplies){
      d.setDate(d.getDate() + 1);
      continue;
    }
    if(habitLog[ds] && habitLog[ds][habitId]){
      current++;
      if(current > best) best = current;
    } else {
      current = 0;
    }
    d.setDate(d.getDate() + 1);
  }
  return best;
}

function getTodayHabitScore(){
  const todayHabits = getHabitsForDate(today());
  if(todayHabits.length === 0) return {done:0,total:0,pct:0};
  const log = habitLog[today()] || {};
  const done = todayHabits.filter(h => log[h.id]).length;
  return {done, total: todayHabits.length, pct: Math.round((done / todayHabits.length) * 100)};
}

function getHabitScoreColor(pct){
  if(pct < 50) return '#e53935';
  if(pct <= 75) return '#ff6f00';
  return '#43a047';
}

function getAllDaysStreak(){
  // Streak of days where ALL habits scored 80%+
  let streak = 0;
  const d = new Date(today());
  const checkDay = (ds) => {
    const habits = getHabitsForDate(ds);
    if(habits.length === 0) return true;
    const log = habitLog[ds] || {};
    const done = habits.filter(h => log[h.id]).length;
    return (done / habits.length) >= 0.8;
  };
  // Check today
  if(checkDay(today())){
    streak++;
    d.setDate(d.getDate() - 1);
  } else {
    d.setDate(d.getDate() - 1);
  }
  while(true){
    const ds = d.toISOString().split('T')[0];
    if(d < new Date(profile.startDatum)) break;
    if(checkDay(ds)){
      streak++;
      d.setDate(d.getDate() - 1);
    } else {
      break;
    }
    if(streak > 365) break;
  }
  return streak;
}

function getLongestActiveStreak(){
  let longest = 0;
  habitList.forEach(h => {
    const s = getHabitStreak(h.id);
    if(s > longest) longest = s;
  });
  return longest;
}

function checkHabitAchievements(){
  const score = getTodayHabitScore();
  const allStreak = getAllDaysStreak();
  const newAchievements = [];

  // Perfect day
  if(score.pct === 100 && !habitAchievements.includes('perfect_day_' + today())){
    habitAchievements.push('perfect_day_' + today());
    newAchievements.push({emoji:'ðŸ†',title:'Perfect Day!',desc:'Je hebt 100% van je habits gedaan vandaag!'});
  }
  // 3 day streak
  if(allStreak >= 3 && !habitAchievements.includes('streak_3')){
    habitAchievements.push('streak_3');
    newAchievements.push({emoji:'ðŸ”¥',title:'3 dagen streak!',desc:'3 dagen op rij alles gedaan!'});
  }
  // Week warrior
  if(allStreak >= 7 && !habitAchievements.includes('streak_7')){
    habitAchievements.push('streak_7');
    newAchievements.push({emoji:'â­',title:'Week Warrior!',desc:'Een hele week 80%+ gescoord!'});
  }
  // 14 day streak
  if(allStreak >= 14 && !habitAchievements.includes('streak_14')){
    habitAchievements.push('streak_14');
    newAchievements.push({emoji:'ðŸ’Ž',title:'14 dagen streak!',desc:'2 weken lang consistent!'});
  }
  // 28 day champion
  if(allStreak >= 28 && !habitAchievements.includes('streak_28')){
    habitAchievements.push('streak_28');
    newAchievements.push({emoji:'ðŸ‘‘',title:'28 dagen Champion!',desc:'Het volledige programma volgehouden!'});
  }

  sv('habitAchievements', habitAchievements);

  // Show achievement popups
  if(newAchievements.length > 0){
    showAchievement(newAchievements[0]);
  }
}

function showAchievement(a){
  const overlay = document.createElement('div');
  overlay.className = 'habit-achievement-overlay';
  overlay.onclick = () => { overlay.remove(); popup.remove(); };
  const popup = document.createElement('div');
  popup.className = 'habit-achievement';
  popup.innerHTML = `<div class="achieve-emoji">${a.emoji}</div><div class="achieve-title">${a.title}</div><div class="achieve-desc">${a.desc}</div>`;
  popup.onclick = () => { overlay.remove(); popup.remove(); };
  document.body.appendChild(overlay);
  document.body.appendChild(popup);
  setTimeout(() => { overlay.remove(); popup.remove(); }, 4000);
}

function renderHabits(){
  const score = getTodayHabitScore();
  const scoreColor = getHabitScoreColor(score.pct);
  const todayHabits = getHabitsForDate(today());
  const log = habitLog[today()] || {};
  const allStreak = getAllDaysStreak();

  let html = '';

  // Daily score
  html += `<div class="card" style="text-align:center">
    <h3>ðŸ“Š Vandaag: ${score.done}/${score.total} habits gedaan</h3>
    <div style="font-size:2rem;font-weight:800;color:${scoreColor};margin:8px 0">${score.pct}%</div>
    <div class="habit-score-bar">
      <div class="habit-score-fill" style="width:${score.pct}%;background:${scoreColor}"></div>
      <div class="habit-score-text">${score.done}/${score.total}</div>
    </div>
    ${allStreak > 0 ? `<div style="font-size:.9rem;color:var(--accent);font-weight:700;margin-top:4px">ðŸ”¥ ${allStreak} dagen streak (80%+)</div>` : ''}
  </div>`;

  // Today's habits
  html += `<div class="card"><h3>âœ… Dagelijkse gewoontes</h3>`;
  if(todayHabits.length === 0){
    html += `<div class="empty-state"><div class="empty-icon">âœ…</div><p>Geen habits gepland voor vandaag</p></div>`;
  } else {
    todayHabits.forEach(h => {
      const done = log[h.id] === true;
      const streak = getHabitStreak(h.id);
      const best = getHabitBestStreak(h.id);
      const freqLabels = {dagelijks:'Dagelijks',weekdagen:'Ma-Vr','3x_per_week':'3x/week'};
      html += `<div class="habit-item ${done ? 'checked' : ''}">
        <div class="habit-row">
          <input type="checkbox" class="habit-check" ${done?'checked':''} onchange="toggleHabit('${h.id}')">
          <div style="flex:1">
            <div class="habit-name" style="${done?'text-decoration:line-through;opacity:.7':''}">${h.emoji} ${escHtml(h.naam)}</div>
            <div class="habit-freq">${freqLabels[h.frequentie] || h.frequentie}</div>
          </div>
          <div style="text-align:right">
            ${streak > 0 ? `<div class="habit-streak">ðŸ”¥ ${streak} dagen</div>` : '<div class="habit-streak" style="color:#bbb">0 dagen</div>'}
            <div class="habit-best">Best: ${best}</div>
          </div>
        </div>
      </div>`;
    });
  }
  html += `<button class="btn btn-secondary btn-block" onclick="openModal('modalAddHabit')" style="margin-top:8px">âž• Eigen habit toevoegen</button>`;
  html += `</div>`;

  // Week overview grid
  html += `<div class="card">
    <h3>ðŸ“… Weekoverzicht</h3>`;
  
  // Get Monday of current week
  const todayDate = new Date(today());
  const mondayOffset = todayDate.getDay() === 0 ? -6 : 1 - todayDate.getDay();
  const monday = new Date(todayDate);
  monday.setDate(monday.getDate() + mondayOffset);
  const weekDays = [];
  for(let i = 0; i < 7; i++){
    const d = new Date(monday);
    d.setDate(d.getDate() + i);
    weekDays.push(d.toISOString().split('T')[0]);
  }
  const dayLabels = ['Ma','Di','Wo','Do','Vr','Za','Zo'];

  html += `<div class="habit-week-grid">`;
  // Header
  html += `<div class="hw-header"></div>`;
  weekDays.forEach((ds, i) => {
    const isToday = ds === today();
    html += `<div class="hw-header" style="${isToday?'color:var(--accent);font-weight:800':''}">${dayLabels[i]}<br>${ds.slice(8)}</div>`;
  });

  // Rows per habit
  habitList.forEach(h => {
    html += `<div class="hw-label">${h.emoji} ${escHtml(h.naam)}</div>`;
    weekDays.forEach(ds => {
      const isToday = ds === today();
      const isFuture = ds > today();
      const habitsForDay = getHabitsForDate(ds);
      const applies = habitsForDay.some(hh => hh.id === h.id);
      const dayLog = habitLog[ds] || {};
      const done = dayLog[h.id] === true;
      
      if(isFuture){
        html += `<div class="hw-cell future ${isToday?'today-cell':''}">â€”</div>`;
      } else if(!applies){
        html += `<div class="hw-cell future">â€”</div>`;
      } else if(done){
        html += `<div class="hw-cell done ${isToday?'today-cell':''}">âœ…</div>`;
      } else {
        html += `<div class="hw-cell missed ${isToday?'today-cell':''}">âŒ</div>`;
      }
    });
  });

  // Total score row
  html += `<div class="hw-label" style="font-weight:800">Score</div>`;
  weekDays.forEach(ds => {
    const isFuture = ds > today();
    if(isFuture){
      html += `<div class="hw-total" style="color:#bbb">â€”</div>`;
    } else {
      const habits = getHabitsForDate(ds);
      const dayLog = habitLog[ds] || {};
      const done = habits.filter(h => dayLog[h.id]).length;
      const pct = habits.length > 0 ? Math.round((done / habits.length) * 100) : 0;
      const color = getHabitScoreColor(pct);
      html += `<div class="hw-total" style="color:${color}">${pct}%</div>`;
    }
  });
  html += `</div></div>`;

  // Achievements
  html += `<div class="card">
    <h3>ðŸ† Achievements</h3>`;
  const achieveList = [
    {id:'perfect_day',emoji:'ðŸ†',title:'Perfect Day',desc:'100% score op een dag',check:() => habitAchievements.some(a => a.startsWith('perfect_day_'))},
    {id:'streak_3',emoji:'ðŸ”¥',title:'3 Dagen Streak',desc:'3 dagen op rij 80%+',check:() => habitAchievements.includes('streak_3')},
    {id:'streak_7',emoji:'â­',title:'Week Warrior',desc:'Een hele week 80%+',check:() => habitAchievements.includes('streak_7')},
    {id:'streak_14',emoji:'ðŸ’Ž',title:'14 Dagen Streak',desc:'2 weken consistent',check:() => habitAchievements.includes('streak_14')},
    {id:'streak_28',emoji:'ðŸ‘‘',title:'28 Dagen Champion',desc:'Het volledige programma!',check:() => habitAchievements.includes('streak_28')}
  ];
  achieveList.forEach(a => {
    const unlocked = a.check();
    html += `<div style="display:flex;align-items:center;gap:10px;padding:8px;${!unlocked?'opacity:.4':''}border-bottom:1px solid var(--border)">
      <span style="font-size:1.5rem">${a.emoji}</span>
      <div style="flex:1">
        <div style="font-weight:700;font-size:.85rem">${a.title}</div>
        <div style="font-size:.75rem;color:var(--text-light)">${a.desc}</div>
      </div>
      ${unlocked ? '<span style="color:#43a047;font-weight:700">âœ…</span>' : '<span style="color:#bbb">ðŸ”’</span>'}
    </div>`;
  });
  html += `</div>`;

  // Manage habits
  html += `<div class="card">
    <h3>âš™ï¸ Habits beheren</h3>
    <div style="font-size:.8rem;color:var(--text-light);margin-bottom:8px">Verwijder habits die je niet meer nodig hebt</div>`;
  habitList.forEach(h => {
    const isDefault = h.id.startsWith('h_') && DEFAULT_HABITS.some(d => d.id === h.id);
    html += `<div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--border)">
      <span style="font-size:1.1rem">${h.emoji}</span>
      <span style="flex:1;font-size:.85rem;font-weight:600">${escHtml(h.naam)}</span>
      <span style="font-size:.7rem;color:var(--text-light)">${h.frequentie}</span>
      <button class="btn btn-danger btn-small" style="padding:4px 8px;min-height:28px;font-size:.7rem" onclick="removeHabit('${h.id}')">âœ•</button>
    </div>`;
  });
  html += `</div>`;

  document.getElementById('habitsContent').innerHTML = html;
}

// ===== IF TIMER AUTO-UPDATE =====
setInterval(() => {
  // Update IF display on voeding tab if visible
  const voedingTab = document.getElementById('tab-voeding');
  if(voedingTab && voedingTab.classList.contains('active')){
    // Only update the status text and timer, not full re-render
    const statusEl = document.querySelector('.if-status-text');
    if(statusEl){
      const ifStatus = getIFStatus();
      statusEl.style.color = ifStatus.isEetvenster ? '#43a047' : '#e53935';
      statusEl.innerHTML = `${ifStatus.statusEmoji} ${ifStatus.statusText}`;
    }
  }
  // Also update dashboard IF status
  const dashTab = document.getElementById('tab-dashboard');
  if(dashTab && dashTab.classList.contains('active')){
    // Light update - don't re-render everything
  }
}, 60000); // Update every minute

// ===== MIGRATION: Add Crosstrainer if not present =====
if(!gymExercises.includes('Crosstrainer / Elliptical')){
  gymExercises.splice(gymExercises.indexOf('Climbmill / Stairmaster') + 1 || gymExercises.length, 0, 'Crosstrainer / Elliptical');
  sv('gymExercises', gymExercises);
}

// ===== INIT =====
renderDashboard();

