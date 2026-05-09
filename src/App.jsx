import { useState } from "react";

const ZODIAC_SIGNS = [
  { name: "Aries", symbol: "♈", dates: "Mar 21 - Apr 19", element: "Fire" },
  { name: "Taurus", symbol: "♉", dates: "Apr 20 - May 20", element: "Earth" },
  { name: "Gemini", symbol: "♊", dates: "May 21 - Jun 20", element: "Air" },
  { name: "Cancer", symbol: "♋", dates: "Jun 21 - Jul 22", element: "Water" },
  { name: "Leo", symbol: "♌", dates: "Jul 23 - Aug 22", element: "Fire" },
  { name: "Virgo", symbol: "♍", dates: "Aug 23 - Sep 22", element: "Earth" },
  { name: "Libra", symbol: "♎", dates: "Sep 23 - Oct 22", element: "Air" },
  { name: "Scorpio", symbol: "♏", dates: "Oct 23 - Nov 21", element: "Water" },
  { name: "Sagittarius", symbol: "♐", dates: "Nov 22 - Dec 21", element: "Fire" },
  { name: "Capricorn", symbol: "♑", dates: "Dec 22 - Jan 19", element: "Earth" },
  { name: "Aquarius", symbol: "♒", dates: "Jan 20 - Feb 18", element: "Air" },
  { name: "Pisces", symbol: "♓", dates: "Feb 19 - Mar 20", element: "Water" },
];

const COMPATIBILITY = {
  "Aries": { "Aries": [85,"Fire against fire — explosive passion but also epic clashes."], "Taurus": [45,"Too different in pace — one runs, the other waits."], "Gemini": [78,"Energy and curiosity meet — never a dull moment."], "Cancer": [40,"Aries burns where Cancer seeks protection."], "Leo": [92,"Two fire signs — they understand each other without words."], "Virgo": [38,"Virgo slows Aries down — constant tension."], "Libra": [72,"Complementary opposites — magnetic attraction."], "Scorpio": [65,"Both intense — they either love madly or destroy each other."], "Sagittarius": [88,"Adventure and freedom — the most dynamic couple of the zodiac."], "Capricorn": [50,"Aries wants it now, Capricorn waits — conflict of timing."], "Aquarius": [75,"Both original and rebellious — they understand each other deeply."], "Pisces": [55,"Different worlds but mysterious attraction."] },
  "Taurus": { "Aries": [45,"Too different in rhythm — one runs, the other savors."], "Taurus": [80,"Two rocks together — absolute stability but little surprise."], "Gemini": [42,"Taurus wants roots, Gemini wants to fly."], "Cancer": [90,"Earth and water — deep love, home and family."], "Leo": [55,"Leo wants the spotlight, Taurus wants peace."], "Virgo": [88,"Two earth signs — something solid is built."], "Libra": [68,"Both love beauty — harmony is possible."], "Scorpio": [72,"Powerful and complex attraction — all or nothing."], "Sagittarius": [40,"Sagittarius flees where Taurus roots."], "Capricorn": [92,"The most solid couple of the zodiac — they build together."], "Aquarius": [38,"Too far apart — Taurus doesn't understand Aquarius."], "Pisces": [82,"Infinite tenderness — they protect each other."] },
  "Gemini": { "Aries": [78,"They stimulate each other — never a moment of boredom."], "Taurus": [42,"Taurus slows Gemini down — mutual frustration."], "Gemini": [75,"Two brilliant minds — endless conversations but little depth."], "Cancer": [50,"Cancer wants stability, Gemini fears it."], "Leo": [80,"Both love being center stage — positive sparks."], "Virgo": [55,"They understand but criticize each other — intellectual tension."], "Libra": [88,"Air and air — lightness, intelligence, natural affinity."], "Scorpio": [48,"Scorpio is too intense for Gemini."], "Sagittarius": [85,"Complementary opposites — adventure and freedom."], "Capricorn": [40,"Capricorn structures, Gemini escapes."], "Aquarius": [90,"Two extraordinary minds — revolutionary couple."], "Pisces": [58,"Different worlds but mutual curiosity."] },
  "Cancer": { "Aries": [40,"Aries burns where Cancer seeks protection."], "Taurus": [90,"Earth and water — deep and lasting love."], "Gemini": [50,"Gemini changes too much for Cancer."], "Cancer": [78,"They understand each other's soul — but too much sensitivity."], "Leo": [62,"Leo illuminates Cancer — but can also blind them."], "Virgo": [82,"Mutual care and devotion — a thoughtful couple."], "Libra": [58,"Libra is too rational for emotional Cancer."], "Scorpio": [92,"Water and water — emotional depth without equal."], "Sagittarius": [38,"Sagittarius flees where Cancer wants to stay."], "Capricorn": [70,"Opposites that attract — balance between heart and mind."], "Aquarius": [42,"Aquarius is too detached for Cancer."], "Pisces": [90,"Two water souls — total empathy and romantic love."] },
  "Leo": { "Aries": [92,"Fire and fire — immediate passion and mutual respect."], "Taurus": [55,"Taurus doesn't always applaud — Leo takes offense."], "Gemini": [80,"Gemini feeds Leo's ego — works well."], "Cancer": [62,"Cancer nurtures Leo — a tender relationship."], "Leo": [70,"Two kings together — grand but who yields?"], "Virgo": [48,"Virgo criticizes Leo — inevitable clashes."], "Libra": [85,"Libra adores Leo — elegant and harmonious couple."], "Scorpio": [60,"Both want control — silent war."], "Sagittarius": [90,"Fire and adventure — the most vibrant couple."], "Capricorn": [52,"Capricorn is too sober for Leo."], "Aquarius": [68,"Opposites that challenge each other — creative tension."], "Pisces": [65,"Pisces admires Leo — fascinating dynamic."] },
  "Virgo": { "Aries": [38,"Aries is too impulsive for Virgo."], "Taurus": [88,"Two earth signs — solidity and understanding."], "Gemini": [55,"They stimulate each other mentally but get irritated."], "Cancer": [82,"Mutual care — a thoughtful and stable couple."], "Leo": [48,"Leo is too dramatic for practical Virgo."], "Virgo": [72,"They understand each other perfectly — maybe too similar."], "Libra": [65,"Both seek balance — good understanding."], "Scorpio": [80,"Intensity and precision — they respect each other deeply."], "Sagittarius": [42,"Sagittarius is too chaotic for Virgo."], "Capricorn": [90,"The most efficient couple — they build the future."], "Aquarius": [50,"Too different in their approach to life."], "Pisces": [70,"Opposites that complete each other — Pisces warms Virgo."] },
  "Libra": { "Aries": [72,"Magnetic attraction between opposites."], "Taurus": [68,"Both love beauty — harmony is possible."], "Gemini": [88,"Air and air — intellectual and light couple."], "Cancer": [58,"Emotion vs rationality — difficult balance."], "Leo": [85,"Elegance and charisma — an enviable couple."], "Virgo": [65,"They respect but criticize each other."], "Libra": [75,"Perfect harmony but who decides?"], "Scorpio": [55,"Scorpio is too intense for Libra."], "Sagittarius": [80,"Freedom and dialogue — open and dynamic couple."], "Capricorn": [60,"Capricorn is too serious for Libra."], "Aquarius": [88,"Two air signs — progressive and brilliant couple."], "Pisces": [72,"Romance and harmony — a sensitive couple."] },
  "Scorpio": { "Aries": [65,"Both intense — passion or destruction."], "Taurus": [72,"Complex and powerful attraction."], "Gemini": [48,"Scorpio is too deep for Gemini."], "Cancer": [92,"Two water souls — total connection."], "Leo": [60,"Both dominant — power struggle."], "Virgo": [80,"They respect and complete each other."], "Libra": [55,"Too different in depth."], "Scorpio": [82,"Double intensity — either wonderful or devastating."], "Sagittarius": [45,"Sagittarius is too free for Scorpio."], "Capricorn": [88,"Shared determination — an unbeatable couple."], "Aquarius": [50,"Too emotionally distant."], "Pisces": [92,"The deepest encounter of the zodiac."] },
  "Sagittarius": { "Aries": [88,"Pure adventure — the most dynamic couple."], "Taurus": [40,"Too different — Taurus anchors, Sagittarius flies."], "Gemini": [85,"Freedom and dialogue — never still."], "Cancer": [38,"Cancer holds back where Sagittarius wants to fly."], "Leo": [90,"Fire and passion — magnetic couple."], "Virgo": [42,"Virgo slows Sagittarius down."], "Libra": [80,"Freedom and harmony — open couple."], "Scorpio": [45,"Scorpio wants to possess, Sagittarius wants to flee."], "Sagittarius": [80,"Two free riders — wonderful while it lasts."], "Capricorn": [50,"Capricorn plans, Sagittarius improvises."], "Aquarius": [88,"Two free spirits — revolutionary couple."], "Pisces": [62,"Different worlds but mystical attraction."] },
  "Capricorn": { "Aries": [50,"Too different in rhythms and goals."], "Taurus": [92,"The most solid couple — they build the future."], "Gemini": [40,"Gemini is too volatile for Capricorn."], "Cancer": [70,"Complementary opposites — heart and mind."], "Leo": [52,"Leo is too exuberant for Capricorn."], "Virgo": [90,"Efficiency and determination — an unbeatable couple."], "Libra": [60,"Libra is too indecisive for Capricorn."], "Scorpio": [88,"Strength and determination — they respect each other deeply."], "Sagittarius": [50,"Too different in approach."], "Capricorn": [78,"They understand each other — but who warms up?"], "Aquarius": [55,"Tradition vs revolution — constant tension."], "Pisces": [72,"Pisces warms Capricorn — beautiful complementarity."] },
  "Aquarius": { "Aries": [75,"Both original — good understanding."], "Taurus": [38,"Too far apart in lifestyle."], "Gemini": [90,"Two brilliant minds — revolutionary couple."], "Cancer": [42,"Aquarius is too detached for Cancer."], "Leo": [68,"Creative challenge — opposites that attract."], "Virgo": [50,"Approaches to life too different."], "Libra": [88,"Air and air — progressive couple."], "Scorpio": [50,"Too emotionally different."], "Sagittarius": [88,"Two free spirits — open and dynamic couple."], "Capricorn": [55,"Tradition vs innovation."], "Aquarius": [80,"They understand each other perfectly — maybe too similar."], "Pisces": [65,"Rational vs emotional — fascination of opposites."] },
  "Pisces": { "Aries": [55,"Mystical attraction but different worlds."], "Taurus": [82,"Tenderness and mutual protection."], "Gemini": [58,"Mutual curiosity but little in common."], "Cancer": [90,"Total empathy — romantic and deep love."], "Leo": [65,"Leo fascinates Pisces."], "Virgo": [70,"They complete each other — Pisces warms Virgo."], "Libra": [72,"Romance and harmony."], "Scorpio": [92,"The deepest connection of the zodiac."], "Sagittarius": [62,"Mystical attraction but unstable."], "Capricorn": [72,"They complete each other — earth and water."], "Aquarius": [65,"Fascination of opposites."], "Pisces": [80,"Two romantic souls — ocean of feelings."] },
};

const PERSONALITIES = {
  "Aries": { essence: "You are a flame that burns without asking permission. The universe created you to open roads where no paths exist.", strengths: ["Instinctive leadership — others follow you without knowing why", "Wild courage — you act when everyone hesitates", "Primordial energy — you recharge while others sleep"], shadows: ["Impatience betrays you in crucial moments", "Your fire can burn those you love most"], love: "You love with devastating intensity. You want to conquer, not be conquered. Your ideal partner is someone who never surrenders to you.", fruit: "Magu Magu no Mi (Magma) — destructive, primordial, unstoppable like you.", destiny: "Your name will be remembered. Not for what you accumulated, but for the walls you tore down." },
  "Taurus": { essence: "You are the mountain that doesn't move. While the world crumbles, you remain. This is your strength and your prison.", strengths: ["Absolute resilience — you don't break, you bend and return", "Refined aesthetic sense — you see beauty where others see nothing", "Iron loyalty — whoever earns your trust has a treasure"], shadows: ["Stubbornness isolates you even when you're wrong", "The comfort zone is your golden cage"], love: "You love slowly, deeply, forever. You don't forgive betrayal. You seek stability but need someone who surprises you.", fruit: "Gura Gura no Mi (Earthquake) — absolute power, immovable, that makes the world tremble.", destiny: "You will build something that outlives your generation. Patience is your secret weapon." },
  "Gemini": { essence: "You are two souls in one body. Others call you inconsistent. In reality you are living a double life they don't understand.", strengths: ["Lightning intelligence — you connect ideas no one else sees linked", "Adaptability — you survive in any environment", "Magnetic communication — words are your magic"], shadows: ["The surface sometimes hides emptiness — dig deeper", "Anxiety devours you in moments of silence"], love: "You love with your mind before your heart. You need someone who stimulates your intellect every day.", fruit: "Kage Kage no Mi (Shadow) — you can be everywhere, multiple, elusive like your true nature.", destiny: "Your words will change minds. Whether you want it or not, you are destined to influence." },
  "Cancer": { essence: "You are the ocean — calm on the surface, stormy in the depths. You protect those you love with silent ferocity.", strengths: ["Supernatural intuition — you feel others' emotions before they express them", "Prodigious memory — you never forget, for better or worse", "Deep care — you make people feel at home"], shadows: ["The shell protects you but isolates you from the world", "The past anchors you when you should swim forward"], love: "You love with everything you have. You are the kind of person the other understands only after losing you.", fruit: "Sui Sui no Mi (Swim) — you glide through emotions like water, elusive and deep.", destiny: "You will be someone's anchor in a storm you can't yet see." },
  "Leo": { essence: "You were born for the stage. Not out of vanity — but because when you enter a room, something changes in the air.", strengths: ["Natural charisma — you attract without effort", "Royal generosity — you give without calculating", "Heart courage — you defend the weak by instinct"], shadows: ["A wounded ego is your most dangerous blind spot", "You need admiration like others need air"], love: "You love with theatricality and genuineness together. You want to be adored but also challenged. Whoever always flatters you will bore you.", fruit: "Hito Hito no Mi Model: Nika (Sun God) — light, freedom, power to change reality.", destiny: "You will become a reference point for many. Your true legacy is how you make others feel." },
  "Virgo": { essence: "You see what others don't notice. Your mind is an instrument of precision in an approximate world.", strengths: ["Penetrating analysis — you find the hidden flaw in any system", "Total dedication — you do things right or not at all", "Silent care — you love through actions, not words"], shadows: ["Perfectionism paralyzes you at decisive moments", "You are your own harshest critic"], love: "You love through concrete acts. You notice every detail of the person you love. You need someone who sees yours too.", fruit: "Ope Ope no Mi (Operation) — total control, surgical precision, understanding of every mechanism.", destiny: "You will solve a problem others have abandoned as impossible." },
  "Libra": { essence: "You are the point where opposites meet. You don't seek balance — you are balance, and this costs you more than you show.", strengths: ["Instinctive diplomacy — you find agreement where everyone sees conflict", "Elevated aesthetic sense — you transform the ordinary into beauty", "Visceral justice — injustice physically disturbs you"], shadows: ["Indecision steals precious opportunities from you", "To not disappoint anyone, you sometimes betray yourself"], love: "You love harmoniously but need passion. Your ideal partner completes you without overwhelming you.", fruit: "Bara Bara no Mi (Separation) — you can break down any conflict into its parts and recompose it.", destiny: "You will be the bridge between two worlds that don't understand each other. Your role is more important than you think." },
  "Scorpio": { essence: "You are the abyss that looks inside others. You see everything, reveal little. This makes you the most powerful and the loneliest.", strengths: ["X-ray intuition — you read people beyond their masks", "Transformative intensity — you die and are reborn stronger", "Absolute determination — you never abandon what you've decided"], shadows: ["Resentment is the poison that poisons you first", "Distrust isolates you from those who could truly love you"], love: "You love all-in or you don't love. There is no middle ground. You are the kind of love that is never forgotten.", fruit: "Doku Doku no Mi (Poison) — you penetrate others' defenses, transform pain into strength.", destiny: "You will go through a transformation that will look like destruction. On the other side is your truest self." },
  "Sagittarius": { essence: "You are an arrow shot toward the horizon. No cage contains you for long — not even the ones you built yourself.", strengths: ["Philosophical optimism — you find meaning even in chaos", "Contagious freedom — you free others too with your presence", "Expanded vision — you see beyond where others stop"], shadows: ["Escape is your default response to depth", "Promises weigh on you like chains"], love: "You love whoever lets you be free. The golden cage is your worst enemy even in love.", fruit: "Pika Pika no Mi (Light) — absolute speed, impossible to stop, always in motion.", destiny: "Your most important journey is the inner one. You will find what you seek outside only after finding it within." },
  "Capricorn": { essence: "You were born with a map of the future in your head. While others live the present, you are already building the next decade.", strengths: ["Legendary discipline — you do what must be done even when you don't want to", "Strategic vision — you play chess when others play checkers", "Silent resilience — you fall without anyone noticing and rise alone"], shadows: ["Work is your armor against vulnerability", "Losing control scares you more than any failure"], love: "You love with total dedication but show little. The right partner learns to read your silences.", fruit: "Zushi Zushi no Mi (Gravity) — weight, power, absolute control of fundamental forces.", destiny: "You will reach the top. The question is not if, but who you want beside you when you get there." },
  "Aquarius": { essence: "You are from the future, trapped in the present. Others see you as strange — in reality you are simply ahead of your time.", strengths: ["Revolutionary vision — you see solutions no one has yet imagined", "Universal humanity — you love humanity as much as you struggle with individuals", "Radical originality — you cannot be a copy, even if you try"], shadows: ["Emotions scare you — you intellectualize them instead of feeling them", "Distance protects you but deprives you of human warmth"], love: "You love the mind before the body. You need a partner who is also your best friend.", fruit: "Goro Goro no Mi (Lightning) — pure energy, unpredictable, capable of illuminating or destroying.", destiny: "Your craziest idea will change something. Stop waiting for permission." },
  "Pisces": { essence: "You are the boundary between dream and reality. You live in both worlds simultaneously — this is your gift and your burden.", strengths: ["Oceanic empathy — you absorb others' emotions like a sponge", "Dreamlike creativity — you create worlds where others see only empty space", "Spiritual connection — you feel what cannot be seen"], shadows: ["The boundary between you and others often vanishes — and you get lost", "Reality weighs on you — escape is always tempting"], love: "You love with a romantic intensity that can overwhelm. You need someone with their feet on the ground.", fruit: "Mero Mero no Mi (Love) — you touch souls, not bodies. Your power is emotional and absolute.", destiny: "Your greatest work has not yet begun. Wait for the moment — you will recognize it." },
};


const DAILY_QUOTES = {
  "Aries": [
    "Your fire cannot be contained. Today, let it illuminate rather than consume.",
    "The boldest move is always the right one. Trust your instincts.",
    "You were born to lead. Step forward — the world is waiting.",
    "Courage is not the absence of fear. It is you, moving anyway.",
    "Today the universe gives you permission to be unstoppable.",
    "Your energy is your superpower. Direct it with intention.",
    "The warrior in you knows no defeat — only lessons.",
  ],
  "Taurus": [
    "Slow and steady does not mean passive. It means purposeful.",
    "Your roots run deep. No storm can uproot what you have built.",
    "Beauty surrounds you today. Open your eyes and receive it.",
    "Patience is not waiting. It is knowing the right moment will come.",
    "Your loyalty is your greatest gift. Give it only to those who deserve it.",
    "The earth beneath your feet is yours. Stand firm.",
    "Today, trust the process. Your season is coming.",
  ],
  "Gemini": [
    "Your mind is a universe. Today, explore its furthest edges.",
    "Two paths appear before you. You are wise enough to walk both.",
    "Words are your magic. Choose them like spells.",
    "Curiosity is not a weakness — it is your greatest strength.",
    "Today your duality is your power, not your paradox.",
    "The conversation you need most may be with yourself.",
    "Your adaptability is a gift the world rarely understands.",
  ],
  "Cancer": [
    "Your sensitivity is not fragility. It is your greatest intelligence.",
    "Home is not a place. It is the feeling you create wherever you go.",
    "Today, protect your energy as fiercely as you protect those you love.",
    "The moon guides you. Trust the tides of your emotions.",
    "Your intuition is speaking. Be still enough to hear it.",
    "You do not need to carry everyone. Put yourself down first.",
    "Vulnerability is not weakness. It is the highest form of courage.",
  ],
  "Leo": [
    "You were born to shine. Today, do not dim yourself for anyone.",
    "The spotlight finds you because you deserve it. Own it.",
    "Your heart is your compass. Let it lead today.",
    "Generosity flows through you naturally. Give freely.",
    "A lion does not lose sleep over the opinions of sheep.",
    "Today your presence alone is enough to change the room.",
    "Roar quietly. The most powerful lions rarely need to.",
  ],
  "Virgo": [
    "Perfection is a direction, not a destination. Keep moving.",
    "Your attention to detail today will create tomorrow's masterpiece.",
    "Not everything broken needs fixing. Some things need releasing.",
    "Your mind is your greatest tool. Sharpen it with rest today.",
    "Service to others is sacred. But service to yourself comes first.",
    "The details you notice are the ones others will thank you for later.",
    "Progress, not perfection. You are exactly where you need to be.",
  ],
  "Libra": [
    "Balance is not stillness. It is constant, graceful adjustment.",
    "Your sense of justice is a gift to a world that has forgotten fairness.",
    "Beauty is not superficial when you create it — it is intentional.",
    "Today, make the decision you have been avoiding. Trust your scales.",
    "Harmony begins within. Find your center before seeking it outside.",
    "Your diplomacy today will open doors others cannot even see.",
    "Indecision is also a choice. Choose yourself first.",
  ],
  "Scorpio": [
    "What others fear to face, you walk toward. This is your power.",
    "Transformation is not loss. It is evolution in disguise.",
    "Your silence speaks volumes. Today, let it say what needs saying.",
    "The depth you carry is not a burden — it is a treasure.",
    "Trust is earned in drops and lost in floods. Guard yours wisely.",
    "You see through illusions effortlessly. Trust what you perceive.",
    "From the ashes of who you were, your truest self emerges.",
  ],
  "Sagittarius": [
    "The horizon is not a limit. It is an invitation.",
    "Your optimism is not naivety — it is a revolutionary act.",
    "Today, follow the question that excites you most.",
    "Freedom is not found. It is created, daily, by your choices.",
    "Your arrow flies truest when you release without hesitation.",
    "Adventure does not always mean distance. Sometimes it means depth.",
    "The truth you speak today may be the one someone needed to hear.",
  ],
  "Capricorn": [
    "Every step forward, no matter how small, is still a step forward.",
    "Your discipline today is building the life you will live tomorrow.",
    "Rest is not failure. It is strategy.",
    "You do not climb mountains for others to see. You climb them for yourself.",
    "Legacy is built one quiet, consistent day at a time.",
    "The summit is closer than it appears. Keep going.",
    "Your ambition is not cold. It is focused love for your future self.",
  ],
  "Aquarius": [
    "The future you imagine is closer than the world believes.",
    "Your difference is your contribution. Never apologize for it.",
    "Today, the idea that sounds impossible is the one worth pursuing.",
    "You are not ahead of your time. Your time is simply arriving.",
    "Revolution begins with a single mind willing to think differently.",
    "Your detachment is not coldness. It is clarity.",
    "The world needs your vision more than your conformity.",
  ],
  "Pisces": [
    "Your dreams are not escapes. They are blueprints.",
    "The boundary between you and the universe is thinner than you think.",
    "Today, your empathy is your compass. Follow it wisely.",
    "What you feel, others cannot yet name. You are ahead of the emotion.",
    "Your creativity is not a hobby. It is your highest calling.",
    "The ocean within you is deeper than anyone has yet explored.",
    "Trust the invisible currents. They are always guiding you home.",
  ],
};

function getDailyQuote(sign) {
  const quotes = DAILY_QUOTES[sign];
  if (!quotes) return "";
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  return quotes[dayOfYear % quotes.length];
}



const COSMIC_DAILY_QUOTES = [
  "The universe conspires in favor of those who dare to dream.",
  "Every star in the sky was once just a wish someone made in the dark.",
  "You are made of stardust and ancient light. Act accordingly.",
  "The cosmos does not rush, yet everything is accomplished.",
  "What you seek is also seeking you.",
  "Trust the timing of your life. The stars are never wrong.",
  "Your soul chose this exact moment to exist. That is not an accident.",
  "The moon does not apologize for its phases. Neither should you.",
  "Energy flows where intention goes. Direct yours wisely today.",
  "Even the darkest night will end, and the stars will shine again.",
  "You are the universe experiencing itself. Make it beautiful.",
  "Alignment is not found. It is created, one conscious choice at a time.",
  "The planets have been waiting for this version of you.",
  "Silence is the language the cosmos speaks most fluently.",
  "Your light does not dim others. It shows them where to find their own.",
  "Every ending in your life is a star being born somewhere else.",
  "The answers you seek are already written in the sky above you.",
  "Breathe. The universe has been here before. It knows the way.",
  "You do not need to understand the storm to dance in the rain.",
  "What is meant for you will find you, even in the dark.",
  "The greatest telescope is turned inward.",
  "A single shift in perspective can change your entire constellation.",
  "You are not lost. You are exploring.",
  "The cosmos rewards those who show up, even imperfectly.",
  "Your story is still being written by the stars.",
  "Let the universe surprise you today.",
  "Some things cannot be rushed — growth, tides, and destiny.",
  "The space between the stars is not empty. It is full of potential.",
  "Today is a page in a story greater than you can yet imagine.",
  "You carry entire galaxies within you. Do not forget that.",
  "The stars do not compete. They simply shine.",
];

function getCosmicDailyQuote() {
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  return COSMIC_DAILY_QUOTES[dayOfYear % COSMIC_DAILY_QUOTES.length];
}

function formatTodayDate() {
  return new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}


function getMoonPhase() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  // Calculate moon phase (0-29.5 days cycle)
  const c = Math.floor((year - 1900) * 12.3685);
  const e = c + month - 1;
  const jd = e * 29.5305882 + 2415020.75933 + day;
  const phase = ((jd - 2451550.1) / 29.5305882) % 1;
  const normalizedPhase = phase < 0 ? phase + 1 : phase;
  const dayInCycle = Math.floor(normalizedPhase * 29.5);

  if (dayInCycle === 0) return { name: "New Moon", emoji: "🌑", meaning: "New beginnings. Plant your intentions. The universe is ready to receive your desires.", energy: "Manifestation" };
  if (dayInCycle <= 6) return { name: "Waxing Crescent", emoji: "🌒", meaning: "Your intentions are taking root. Nurture your dreams with action and faith.", energy: "Growth" };
  if (dayInCycle === 7) return { name: "First Quarter", emoji: "🌓", meaning: "Face the challenges. Decisions made now shape your destiny. Choose boldly.", energy: "Decision" };
  if (dayInCycle <= 13) return { name: "Waxing Gibbous", emoji: "🌔", meaning: "Refinement time. Your goals are almost within reach. Adjust and persist.", energy: "Refinement" };
  if (dayInCycle === 14) return { name: "Full Moon", emoji: "🌕", meaning: "Peak energy. Emotions are heightened. Release what no longer serves your soul.", energy: "Release & Clarity" };
  if (dayInCycle <= 20) return { name: "Waning Gibbous", emoji: "🌖", meaning: "Time to share your wisdom. Gratitude amplifies your cosmic connection.", energy: "Gratitude" };
  if (dayInCycle === 21) return { name: "Last Quarter", emoji: "🌗", meaning: "Let go of old patterns. Forgiveness — of self and others — unlocks your next level.", energy: "Release" };
  return { name: "Waning Crescent", emoji: "🌘", meaning: "Rest. Reflect. Surrender. The universe is preparing something extraordinary for you.", energy: "Rest & Surrender" };
}


const TAROT_CARDS = [
  { name: "The Fool", emoji: "🃏", number: "0", meaning: "New beginnings, innocence, spontaneity. A leap of faith awaits you.", energy: "Freedom" },
  { name: "The Magician", emoji: "🔮", number: "I", meaning: "You have all the tools you need. Willpower and manifestation are your allies today.", energy: "Power" },
  { name: "The High Priestess", emoji: "🌙", number: "II", meaning: "Trust your intuition. Secrets are being revealed to those who listen in silence.", energy: "Intuition" },
  { name: "The Empress", emoji: "🌸", number: "III", meaning: "Abundance flows to you. Nurture yourself and watch everything bloom.", energy: "Abundance" },
  { name: "The Emperor", emoji: "👑", number: "IV", meaning: "Take control. Structure and discipline create the freedom you seek.", energy: "Authority" },
  { name: "The Hierophant", emoji: "🏛️", number: "V", meaning: "Seek wisdom from tradition or mentors. The answers have been here all along.", energy: "Wisdom" },
  { name: "The Lovers", emoji: "💞", number: "VI", meaning: "A choice of the heart approaches. Alignment between values and desires is key.", energy: "Union" },
  { name: "The Chariot", emoji: "⚡", number: "VII", meaning: "Victory through determination. You are unstoppable when you focus your will.", energy: "Victory" },
  { name: "Strength", emoji: "🦁", number: "VIII", meaning: "Inner strength conquers all. Patience and compassion are more powerful than force.", energy: "Courage" },
  { name: "The Hermit", emoji: "🕯️", number: "IX", meaning: "Withdraw and reflect. The answers you seek are found within the silence.", energy: "Solitude" },
  { name: "Wheel of Fortune", emoji: "☸️", number: "X", meaning: "The wheel turns in your favor. Embrace the cycles — what rises must fall and rise again.", energy: "Change" },
  { name: "Justice", emoji: "⚖️", number: "XI", meaning: "Truth and fairness prevail. What you have sown, you are now ready to reap.", energy: "Balance" },
  { name: "The Hanged Man", emoji: "🌀", number: "XII", meaning: "Surrender brings clarity. A new perspective reveals what force could not.", energy: "Surrender" },
  { name: "Death", emoji: "🦋", number: "XIII", meaning: "Transformation is here. Something must end so your truest self can emerge.", energy: "Rebirth" },
  { name: "Temperance", emoji: "✨", number: "XIV", meaning: "Find your balance. Patience and moderation are creating something extraordinary.", energy: "Harmony" },
  { name: "The Devil", emoji: "🔗", number: "XV", meaning: "Examine your chains. What binds you also holds the key to your liberation.", energy: "Liberation" },
  { name: "The Tower", emoji: "⚡", number: "XVI", meaning: "Sudden change breaks old structures. From the rubble, something truer will rise.", energy: "Breakthrough" },
  { name: "The Star", emoji: "⭐", number: "XVII", meaning: "Hope is restored. After the storm, you are guided by starlight toward your destiny.", energy: "Hope" },
  { name: "The Moon", emoji: "🌕", number: "XVIII", meaning: "Illusions dissolve in moonlight. Trust your dreams — they carry hidden truths.", energy: "Illusion" },
  { name: "The Sun", emoji: "☀️", number: "XIX", meaning: "Joy, success and vitality surround you. Today the universe celebrates your existence.", energy: "Joy" },
  { name: "Judgement", emoji: "🎺", number: "XX", meaning: "A powerful awakening calls you. Rise, answer it, and step into your highest self.", energy: "Awakening" },
  { name: "The World", emoji: "🌍", number: "XXI", meaning: "Completion and wholeness. You have arrived. Celebrate how far you have come.", energy: "Completion" },
];

function getDailyTarot() {
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  return TAROT_CARDS[dayOfYear % TAROT_CARDS.length];
}


const SIGN_COLORS = {
  "Aries":       { primary: "#e63946", glow: "rgba(230,57,70,0.15)", border: "rgba(230,57,70,0.3)" },
  "Taurus":      { primary: "#2d6a4f", glow: "rgba(45,106,79,0.15)", border: "rgba(45,106,79,0.3)" },
  "Gemini":      { primary: "#e9c46a", glow: "rgba(233,196,106,0.15)", border: "rgba(233,196,106,0.3)" },
  "Cancer":      { primary: "#a8dadc", glow: "rgba(168,218,220,0.15)", border: "rgba(168,218,220,0.3)" },
  "Leo":         { primary: "#f4a261", glow: "rgba(244,162,97,0.15)", border: "rgba(244,162,97,0.3)" },
  "Virgo":       { primary: "#6a994e", glow: "rgba(106,153,78,0.15)", border: "rgba(106,153,78,0.3)" },
  "Libra":       { primary: "#e07a9c", glow: "rgba(224,122,156,0.15)", border: "rgba(224,122,156,0.3)" },
  "Scorpio":     { primary: "#9b2335", glow: "rgba(155,35,53,0.15)", border: "rgba(155,35,53,0.3)" },
  "Sagittarius": { primary: "#7b2d8b", glow: "rgba(123,45,139,0.15)", border: "rgba(123,45,139,0.3)" },
  "Capricorn":   { primary: "#1d3557", glow: "rgba(29,53,87,0.2)",  border: "rgba(29,53,87,0.4)" },
  "Aquarius":    { primary: "#4cc9f0", glow: "rgba(76,201,240,0.15)", border: "rgba(76,201,240,0.3)" },
  "Pisces":      { primary: "#48cae4", glow: "rgba(72,202,228,0.15)", border: "rgba(72,202,228,0.3)" },
};


const TRANSLATIONS = {
  en: {
    flag: "🇬🇧", label: "EN",
    subtitle: "Unveil the secrets of your soul through the stars",
    enterData: "{t.enterData}",
    dateOfBirth: {t.dateOfBirth},
    timeOfBirth: {t.timeOfBirth},
    hour: "Hour (0-23)", minute: "Minutes",
    reveal: "{t.reveal}",
    cosmicMessage: "Cosmic Message",
    moonPhase: "{t.moonPhase}",
    tarotCard: "{t.tarotCard}",
    energy: "Energy",
    newReading: "{t.newReading}",
    rising: "Rising",
    bornOn: "Born",
    at: "at",
    tabs: { personality: {t.tabs.personality}, compatibility: {t.tabs.compatibility}, share: {t.tabs.share} },
    sections: { essence: {t.sections.essence}, powers: {t.sections.powers}, shadows: {t.sections.shadows}, love: {t.sections.love}, fruit: {t.sections.fruit}, destiny: {t.sections.destiny} },
    choosePartner: "{t.choosePartner}",
    selectSign: "{t.selectSign}",
    compatibility: "Compatibility",
    labels: { soulmate: "Soulmate 💫", great: "Great chemistry 🌟", good: "Good match ✨", challenge: "Stimulating challenge ⚡", opposite: "Extreme opposites 🔥" },
    shareTitle: "{t.shareTitle}",
    preview: {t.preview},
    copyBtn: "{t.copyBtn}",
    copied: "{t.copied}",
    support: "{t.support}",
    supportText: "{t.supportText}",
    coffeeBtn: "{t.coffeeBtn}",
    fillFields: "Please fill in all fields!",
    loading1: "{t.loading1}",
    loading2: "{t.loading2}",
    with: "With",
    include: "Includes compatibility with",
  },
  it: {
    flag: "🇮🇹", label: "IT",
    subtitle: "Svela i segreti della tua anima attraverso le stelle",
    enterData: "Inserisci i tuoi dati cosmici",
    dateOfBirth: "Data di Nascita",
    timeOfBirth: "Ora di Nascita",
    hour: "Ora (0-23)", minute: "Minuti",
    reveal: "✦ Rivela il Mio Destino ✦",
    cosmicMessage: "Messaggio Cosmico",
    moonPhase: "Fase Lunare di Oggi",
    tarotCard: "Carta dei Tarocchi del Giorno",
    energy: "Energia",
    newReading: "✦ Nuova Lettura ✦",
    rising: "Ascendente",
    bornOn: "Nato il",
    at: "alle",
    tabs: { personality: "🌟 Personalità", compatibility: "💞 Compatibilità", share: "📤 Condividi" },
    sections: { essence: "🌟 ESSENZA COSMICA", powers: "⚡ POTERI NASCOSTI", shadows: "🌑 OMBRE DELL'ANIMA", love: "❤️ AMORE E RELAZIONI", fruit: "🏴‍☠️ IL TUO FRUTTO DEL DIAVOLO", destiny: "🔮 DESTINO" },
    choosePartner: "Scegli il segno del tuo partner",
    selectSign: "— Seleziona segno —",
    compatibility: "Compatibilità",
    labels: { soulmate: "Anima gemella 💫", great: "Grande intesa 🌟", good: "Buona compatibilità ✨", challenge: "Sfida stimolante ⚡", opposite: "Opposti estremi 🔥" },
    shareTitle: "Copia la tua lettura cosmica e condividila con il mondo",
    preview: "Anteprima:",
    copyBtn: "📋 Copia Lettura Cosmica",
    copied: "✓ Copiato negli appunti!",
    support: "☕ SUPPORTA L'ORACOLO",
    supportText: "Se le stelle ti hanno parlato, offri un caffè",
    coffeeBtn: "☕ Offrimi un caffè",
    fillFields: "Compila tutti i campi!",
    loading1: "Le stelle stanno parlando...",
    loading2: "L'oracolo sta leggendo la tua anima",
    with: "Con",
    include: "Include compatibilità con",
  },
  es: {
    flag: "🇪🇸", label: "ES",
    subtitle: "Desvela los secretos de tu alma a través de las estrellas",
    enterData: "Ingresa tus datos cósmicos",
    dateOfBirth: "Fecha de Nacimiento",
    timeOfBirth: "Hora de Nacimiento",
    hour: "Hora (0-23)", minute: "Minutos",
    reveal: "✦ Revela Mi Destino ✦",
    cosmicMessage: "Mensaje Cósmico",
    moonPhase: "Fase Lunar de Hoy",
    tarotCard: "Carta del Tarot del Día",
    energy: "Energía",
    newReading: "✦ Nueva Lectura ✦",
    rising: "Ascendente",
    bornOn: "Nacido el",
    at: "a las",
    tabs: { personality: "🌟 Personalidad", compatibility: "💞 Compatibilidad", share: "📤 Compartir" },
    sections: { essence: "🌟 ESENCIA CÓSMICA", powers: "⚡ PODERES OCULTOS", shadows: "🌑 SOMBRAS DEL ALMA", love: "❤️ AMOR Y RELACIONES", fruit: "🏴‍☠️ TU FRUTA DEL DIABLO", destiny: "🔮 DESTINO" },
    choosePartner: "Elige el signo de tu pareja",
    selectSign: "— Selecciona un signo —",
    compatibility: "Compatibilidad",
    labels: { soulmate: "Alma gemela 💫", great: "Gran química 🌟", good: "Buena pareja ✨", challenge: "Desafío estimulante ⚡", opposite: "Opuestos extremos 🔥" },
    shareTitle: "Copia tu lectura cósmica y compártela con el mundo",
    preview: "Vista previa:",
    copyBtn: "📋 Copiar Lectura Cósmica",
    copied: "✓ ¡Copiado al portapapeles!",
    support: "☕ APOYA EL ORÁCULO",
    supportText: "Si las estrellas te hablaron, considera invitarme un café",
    coffeeBtn: "☕ Invítame un café",
    fillFields: "¡Por favor completa todos los campos!",
    loading1: "Las estrellas están hablando...",
    loading2: "El oráculo está leyendo tu alma",
    with: "Con",
    include: "Incluye compatibilidad con",
  },
  fr: {
    flag: "🇫🇷", label: "FR",
    subtitle: "Dévoilez les secrets de votre âme à travers les étoiles",
    enterData: "Entrez vos données cosmiques",
    dateOfBirth: "Date de Naissance",
    timeOfBirth: "Heure de Naissance",
    hour: "Heure (0-23)", minute: "Minutes",
    reveal: "✦ Révélez Mon Destin ✦",
    cosmicMessage: "Message Cosmique",
    moonPhase: "Phase Lunaire d'Aujourd'hui",
    tarotCard: "Carte de Tarot du Jour",
    energy: "Énergie",
    newReading: "✦ Nouvelle Lecture ✦",
    rising: "Ascendant",
    bornOn: "Né le",
    at: "à",
    tabs: { personality: "🌟 Personnalité", compatibility: "💞 Compatibilité", share: "📤 Partager" },
    sections: { essence: "🌟 ESSENCE COSMIQUE", powers: "⚡ POUVOIRS CACHÉS", shadows: "🌑 OMBRES DE L'ÂME", love: "❤️ AMOUR ET RELATIONS", fruit: "🏴‍☠️ VOTRE FRUIT DU DÉMON", destiny: "🔮 DESTIN" },
    choosePartner: "Choisissez le signe de votre partenaire",
    selectSign: "— Sélectionner un signe —",
    compatibility: "Compatibilité",
    labels: { soulmate: "Âme sœur 💫", great: "Grande chimie 🌟", good: "Bonne compatibilité ✨", challenge: "Défi stimulant ⚡", opposite: "Opposés extrêmes 🔥" },
    shareTitle: "Copiez votre lecture cosmique et partagez-la avec le monde",
    preview: "Aperçu:",
    copyBtn: "📋 Copier la Lecture Cosmique",
    copied: "✓ Copié dans le presse-papiers!",
    support: "☕ SOUTENEZ L'ORACLE",
    supportText: "Si les étoiles vous ont parlé, offrez-moi un café",
    coffeeBtn: "☕ Offrez-moi un café",
    fillFields: "Veuillez remplir tous les champs!",
    loading1: "Les étoiles parlent...",
    loading2: "L'oracle lit votre âme",
    with: "Avec",
    include: "Inclut la compatibilité avec",
  },
};

function getZodiacSign(day, month) {
  const d = parseInt(day), m = parseInt(month);
  if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) return "Aries";
  if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) return "Taurus";
  if ((m === 5 && d >= 21) || (m === 6 && d <= 20)) return "Gemini";
  if ((m === 6 && d >= 21) || (m === 7 && d <= 22)) return "Cancer";
  if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) return "Leo";
  if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) return "Virgo";
  if ((m === 9 && d >= 23) || (m === 10 && d <= 22)) return "Libra";
  if ((m === 10 && d >= 23) || (m === 11 && d <= 21)) return "Scorpio";
  if ((m === 11 && d >= 22) || (m === 12 && d <= 21)) return "Sagittarius";
  if ((m === 12 && d >= 22) || (m === 1 && d <= 19)) return "Capricorn";
  if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) return "Aquarius";
  return "Pisces";
}

function getAscendant(hour) {
  const h = parseInt(hour);
  if (h >= 6 && h < 8) return "Leo";
  if (h >= 8 && h < 10) return "Virgo";
  if (h >= 10 && h < 12) return "Libra";
  if (h >= 12 && h < 14) return "Scorpio";
  if (h >= 14 && h < 16) return "Sagittarius";
  if (h >= 16 && h < 18) return "Capricorn";
  if (h >= 18 && h < 20) return "Aquarius";
  if (h >= 20 && h < 22) return "Pisces";
  if (h >= 22 || h < 2) return "Aries";
  if (h >= 2 && h < 4) return "Taurus";
  return "Gemini";
}

function ScoreBar({ score }) {
  const color = score >= 80 ? "#c9a84c" : score >= 60 ? "#8b9f5e" : score >= 40 ? "#9f7a3e" : "#8b4a4a";
  return (
    <div style={{ width: "100%", background: "rgba(255,255,255,0.05)", borderRadius: "999px", height: "8px", marginTop: "0.5rem" }}>
      <div style={{ width: `${score}%`, background: `linear-gradient(90deg, ${color}, ${color}cc)`, height: "100%", borderRadius: "999px", transition: "width 1s ease", boxShadow: `0 0 8px ${color}66` }} />
    </div>
  );
}

const stars = Array.from({ length: 80 }, (_, i) => ({ id: i, top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, size: Math.random() * 2 + 1, opacity: Math.random() * 0.6 + 0.2 }));
const inputStyle = { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,168,76,0.3)", borderRadius: "8px", padding: "0.8rem", color: "#e8d5a3", fontSize: "1rem", width: "100%", boxSizing: "border-box", outline: "none", textAlign: "center", fontFamily: "Georgia, serif" };
const labelStyle = { color: "#c9a84c", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "'Cinzel', serif" };
const textStyle = { margin: "0.3rem 0", lineHeight: 1.8, color: "#c8b89a", fontSize: "0.95rem" };

export default function App() {
  const [lang, setLang] = useState("en");
  const t = TRANSLATIONS[lang];
  const [step, setStep] = useState("form");
  const [form, setForm] = useState({ day: "", month: "", year: "", hour: "", minute: "" });
  const [partnerSign, setPartnerSign] = useState("");
  const [result, setResult] = useState(null);
  const [autoSign, setAutoSign] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("personality");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);
    const d = name === "day" ? value : form.day;
    const m = name === "month" ? value : form.month;
    if (d && m && parseInt(d) >= 1 && parseInt(m) >= 1 && parseInt(m) <= 12) {
      setAutoSign(getZodiacSign(d, m));
    }
  };

  const analyze = () => {
    if (!form.day || !form.month || !form.year || !form.hour || !form.minute) {
      alert(t.fillFields);
      return;
    }
    setStep("loading");
    setTimeout(() => {
      const sign = getZodiacSign(form.day, form.month);
      const p = PERSONALITIES[sign];
      const asc = getAscendant(form.hour);
      setResult({ ...p, sign, ascendant: asc });
      setStep("result");
    }, 2500);
  };

  const reset = () => {
    setStep("form");
    setForm({ day: "", month: "", year: "", hour: "", minute: "" });
    setResult(null);
    setAutoSign("");
    setPartnerSign("");
    setActiveTab("personality");
  };

  const handleShare = () => {
    if (!result) return;
    const compat = partnerSign ? COMPATIBILITY[result.sign]?.[partnerSign] : null;
    const text = `🔮 COSMIC ORACLE — My Cosmic Reading

♾ Sign: ${result.sign} | Rising: ${result.ascendant}
📅 Born ${form.day}/${form.month}/${form.year} at ${form.hour}:${form.minute.padStart(2, "0")}

🌟 Essence: ${result.essence}

⚡ Powers: ${result.strengths.join(" • ")}

🏴‍☠️ Devil Fruit: ${result.fruit}

🔮 Destiny: ${result.destiny}
${compat ? `\n💞 Compatibility with ${partnerSign}: ${compat[0]}% — ${compat[1]}` : ""}

✦ Discover your cosmic reading at cosmicoracleapp.com ✦`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const signData = autoSign ? ZODIAC_SIGNS.find(s => s.name === autoSign) : null;
  const compat = result && partnerSign ? COMPATIBILITY[result.sign]?.[partnerSign] : null;
  const activeSign = result ? result.sign : autoSign;
  const signColor = SIGN_COLORS[activeSign] || { primary: "#c9a84c", glow: "rgba(147,51,234,0.12)", border: "rgba(201,168,76,0.2)" };
  const compatScore = compat ? compat[0] : null;
  const compatLabel = compatScore >= 85 ? t.labels.soulmate : compatScore >= 70 ? t.labels.great : compatScore >= 55 ? t.labels.good : compatScore >= 40 ? t.labels.challenge : t.labels.opposite;

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(ellipse at top, #0d0a1a 0%, #050308 60%, #0a0515 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem 1rem", fontFamily: "Georgia, serif", position: "relative", overflow: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes twinkle { 0%,100% { opacity: 0.2; } 50% { opacity: 0.9; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }
        input::placeholder { color: rgba(201,168,76,0.3); }
        select option { background: #0d0a1a; color: #e8d5a3; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.3); border-radius: 2px; }
      `}</style>

      {stars.map(s => <div key={s.id} style={{ position: "fixed", width: `${s.size}px`, height: `${s.size}px`, background: "white", borderRadius: "50%", top: s.top, left: s.left, opacity: s.opacity, animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`, animationDelay: `${Math.random() * 3}s` }} />)}
      <div style={{ position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)", width: "500px", height: "500px", background: `radial-gradient(circle, ${signColor.glow} 0%, transparent 70%)`, borderRadius: "50%", pointerEvents: "none", transition: "background 1s ease" }} />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "2rem", position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: "2.5rem", filter: "drop-shadow(0 0 15px rgba(201,168,76,0.9))" }}>✦ 🔮 ✦</div>
        <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.6rem, 5vw, 2.8rem)", fontWeight: 900, background: "linear-gradient(135deg, #c9a84c, #f0d080, #c9a84c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: "0.3rem 0", letterSpacing: "0.1em" }}>COSMIC ORACLE</h1>
        <p style={{ color: "#6b5c7a", fontStyle: "italic", margin: 0, fontSize: "0.9rem" }}>{t.subtitle}</p>
        <div style={{ display: "flex", gap: "0.4rem", justifyContent: "center", marginTop: "0.8rem" }}>
          {Object.entries(TRANSLATIONS).map(([code, tr]) => (
            <button key={code} onClick={() => setLang(code)} style={{ padding: "0.3rem 0.7rem", background: lang === code ? "rgba(201,168,76,0.2)" : "transparent", border: lang === code ? "1px solid rgba(201,168,76,0.4)" : "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", color: lang === code ? "#c9a84c" : "#6b5c7a", fontSize: "0.75rem", cursor: "pointer", fontFamily: "'Cinzel', serif" }}>
              {tr.flag} {tr.label}
            </button>
          ))}
        </div>
      </div>



      {/* FORM */}
      {step === "form" && (
        <div style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${signColor.border}`, borderRadius: "20px", padding: "2rem", width: "100%", maxWidth: "460px", backdropFilter: "blur(10px)", position: "relative", zIndex: 1, animation: "fadeIn 0.5s ease", boxShadow: `0 0 40px ${signColor.glow}`, transition: "all 0.8s ease" }}>
          <p style={{ color: "#6b5c7a", textAlign: "center", marginTop: 0, fontStyle: "italic", fontSize: "0.9rem" }}>{t.enterData}</p>

          <div style={{ marginBottom: "1.2rem" }}>
            <label style={labelStyle}>Date of Birth</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.5fr", gap: "0.7rem", marginTop: "0.5rem" }}>
              {[{ name: "day", placeholder: "DD" }, { name: "month", placeholder: "MM" }, { name: "year", placeholder: "YYYY" }].map(f => (
                <input key={f.name} type="number" name={f.name} placeholder={f.placeholder} value={form[f.name]} onChange={handleChange} style={inputStyle} />
              ))}
            </div>
          </div>

          <div style={{ marginBottom: "1.2rem" }}>
            <label style={labelStyle}>Time of Birth</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.7rem", marginTop: "0.5rem" }}>
              {[{ name: "hour", placeholder: "Hour (0-23)" }, { name: "minute", placeholder: "Minutes" }].map(f => (
                <input key={f.name} type="number" name={f.name} placeholder={f.placeholder} value={form[f.name]} onChange={handleChange} style={inputStyle} />
              ))}
            </div>
          </div>

          {signData && (
            <div style={{ background: signColor.glow, border: `1px solid ${signColor.border}`, borderRadius: "12px", padding: "0.8rem", textAlign: "center", marginBottom: "1.2rem", transition: "all 0.8s ease" }}>
              <span style={{ fontSize: "1.8rem" }}>{signData.symbol}</span>
              <span style={{ color: signColor.primary, fontFamily: "'Cinzel', serif", fontWeight: "bold", marginLeft: "0.5rem", transition: "color 0.8s ease" }}>{signData.name}</span>
              <span style={{ color: "#6b5c7a", fontSize: "0.8rem", marginLeft: "0.5rem" }}>• {signData.element}</span>
            </div>
          )}

          <button onClick={analyze} style={{ width: "100%", padding: "1rem", background: "linear-gradient(135deg, #c9a84c, #8b6914)", border: "none", borderRadius: "12px", color: "#0d0a1a", fontFamily: "'Cinzel', serif", fontWeight: "bold", fontSize: "1rem", letterSpacing: "0.12em", cursor: "pointer", textTransform: "uppercase", boxShadow: "0 0 25px rgba(201,168,76,0.25)" }}>
            {t.reveal}
          </button>

          {/* Cosmic Daily Quote */}
          <div style={{ marginTop: "1.5rem", borderTop: "1px solid rgba(201,168,76,0.12)", paddingTop: "1.2rem", textAlign: "center" }}>
            <div style={{ color: "#c9a84c", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "'Cinzel', serif", marginBottom: "0.5rem" }}>✦ {t.cosmicMessage} — {formatTodayDate()} ✦</div>
            <p style={{ color: "#8a7a9b", fontStyle: "italic", margin: 0, lineHeight: 1.7, fontSize: "0.85rem" }}>"{getCosmicDailyQuote()}"</p>
          </div>

          {/* Moon Phase */}
          {(() => {
            const moon = getMoonPhase();
            return (
              <div style={{ marginTop: "1rem", background: "rgba(147,51,234,0.06)", border: "1px solid rgba(147,51,234,0.2)", borderRadius: "14px", padding: "1rem 1.2rem", textAlign: "center" }}>
                <div style={{ color: "#9b72cf", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "'Cinzel', serif", marginBottom: "0.4rem" }}>🌙 {t.moonPhase}</div>
                <div style={{ fontSize: "2rem", marginBottom: "0.3rem" }}>{moon.emoji}</div>
                <div style={{ color: "#c9a84c", fontFamily: "'Cinzel', serif", fontWeight: "bold", fontSize: "0.95rem", marginBottom: "0.3rem" }}>{moon.name}</div>
                <div style={{ color: "#9b72cf", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.4rem" }}>{t.energy}: {moon.energy}</div>
                <p style={{ color: "#8a7a9b", fontStyle: "italic", margin: 0, lineHeight: 1.6, fontSize: "0.82rem" }}>{moon.meaning}</p>
              </div>
            );
          })()}

          {/* Daily Tarot */}
          {(() => {
            const card = getDailyTarot();
            return (
              <div style={{ marginTop: "1rem", background: "rgba(201,168,76,0.04)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "14px", padding: "1rem 1.2rem", textAlign: "center" }}>
                <div style={{ color: "#c9a84c", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "'Cinzel', serif", marginBottom: "0.4rem" }}>🎴 {t.tarotCard}</div>
                <div style={{ fontSize: "2rem", marginBottom: "0.3rem" }}>{card.emoji}</div>
                <div style={{ color: "#c9a84c", fontFamily: "'Cinzel', serif", fontWeight: "bold", fontSize: "0.95rem", marginBottom: "0.2rem" }}>{card.number} — {card.name}</div>
                <div style={{ color: "#9b72cf", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.4rem" }}>{t.energy}: {card.energy}</div>
                <p style={{ color: "#8a7a9b", fontStyle: "italic", margin: 0, lineHeight: 1.6, fontSize: "0.82rem" }}>{card.meaning}</p>
              </div>
            );
          })()}
        </div>
      )}

      {/* LOADING */}
      {step === "loading" && (
        <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: "4rem", animation: "spin 3s linear infinite", display: "inline-block" }}>🔮</div>
          <p style={{ color: "#c9a84c", fontFamily: "'Cinzel', serif", marginTop: "1rem", letterSpacing: "0.1em" }}>{t.loading1}</p>
          <p style={{ color: "#6b5c7a", fontStyle: "italic" }}>{t.loading2}</p>
        </div>
      )}

      {/* RESULT */}
      {step === "result" && result && (
        <div style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${signColor.border}`, borderRadius: "20px", padding: "2rem", width: "100%", maxWidth: "580px", backdropFilter: "blur(10px)", position: "relative", zIndex: 1, maxHeight: "78vh", overflowY: "auto", animation: "fadeIn 0.6s ease", boxShadow: `0 0 60px ${signColor.glow}` }}>

          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <div style={{ fontSize: "2.5rem" }}>{ZODIAC_SIGNS.find(s => s.name === result.sign)?.symbol}</div>
            <h2 style={{ fontFamily: "'Cinzel', serif", color: "#c9a84c", margin: "0.4rem 0", fontSize: "1.4rem" }}>{result.sign}</h2>
            <div style={{ color: "#6b5c7a", fontSize: "0.8rem" }}>{t.rising} {result.ascendant} • Born {form.day}/{form.month}/{form.year} at {form.hour}:{form.minute.padStart(2, "0")}</div>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", background: "rgba(0,0,0,0.2)", borderRadius: "10px", padding: "0.3rem" }}>
            {[["personality", {t.tabs.personality}], ["compatibility", {t.tabs.compatibility}], ["share", {t.tabs.share}]].map(([id, label]) => (
              <button key={id} onClick={() => setActiveTab(id)} style={{ flex: 1, padding: "0.6rem 0.3rem", background: activeTab === id ? "rgba(201,168,76,0.2)" : "transparent", border: activeTab === id ? "1px solid rgba(201,168,76,0.4)" : "1px solid transparent", borderRadius: "8px", color: activeTab === id ? "#c9a84c" : "#6b5c7a", fontSize: "0.75rem", cursor: "pointer", fontFamily: "'Cinzel', serif", transition: "all 0.2s" }}>{label}</button>
            ))}
          </div>

          {activeTab === "personality" && (
            <div style={{ animation: "fadeIn 0.3s ease" }}>
              <Section title={t.sections.essence}><p style={textStyle}>{result.essence}</p></Section>
              <Section title={t.sections.powers}>{result.strengths.map((s, i) => <p key={i} style={textStyle}>• {s}</p>)}</Section>
              <Section title={t.sections.shadows}>{result.shadows.map((s, i) => <p key={i} style={textStyle}>• {s}</p>)}</Section>
              <Section title={t.sections.love}><p style={textStyle}>{result.love}</p></Section>
              <Section title={t.sections.fruit}><p style={textStyle}>{result.fruit}</p></Section>
              <Section title={t.sections.destiny}><p style={{ ...textStyle, fontStyle: "italic", color: "#c9a84c" }}>{result.destiny}</p></Section>
            </div>
          )}

          {activeTab === "compatibility" && (
            <div style={{ animation: "fadeIn 0.3s ease" }}>
              <p style={{ color: "#6b5c7a", fontStyle: "italic", textAlign: "center", marginBottom: "1.2rem", fontSize: "0.9rem" }}>{t.choosePartner}</p>
              <select value={partnerSign} onChange={e => setPartnerSign(e.target.value)} style={{ ...inputStyle, marginBottom: "1.2rem", cursor: "pointer" }}>
                <option value="">{t.selectSign}</option>
                {ZODIAC_SIGNS.map(s => <option key={s.name} value={s.name}>{s.symbol} {s.name}</option>)}
              </select>

              {compat && (
                <div style={{ animation: "fadeIn 0.4s ease" }}>
                  <div style={{ textAlign: "center", marginBottom: "1.2rem" }}>
                    <div style={{ fontSize: "2rem" }}>{ZODIAC_SIGNS.find(s => s.name === result.sign)?.symbol} 💞 {ZODIAC_SIGNS.find(s => s.name === partnerSign)?.symbol}</div>
                    <div style={{ fontFamily: "'Cinzel', serif", color: "#c9a84c", fontSize: "1.1rem", margin: "0.5rem 0" }}>{result.sign} & {partnerSign}</div>
                    <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: compatScore >= 80 ? "#c9a84c" : compatScore >= 60 ? "#8b9f5e" : "#8b4a4a" }}>{compatScore}%</div>
                    <div style={{ color: "#8a7a9b", fontSize: "0.85rem" }}>{compatLabel}</div>
                    <ScoreBar score={compatScore} />
                  </div>
                  <div style={{ background: "rgba(201,168,76,0.05)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "12px", padding: "1rem" }}>
                    <p style={{ ...textStyle, fontStyle: "italic", textAlign: "center", margin: 0 }}>{compat[1]}</p>
                  </div>
                </div>
              )}

              {!partnerSign && (
                <div style={{ textAlign: "center", padding: "2rem", color: "#4a3a5a" }}>
                  <div style={{ fontSize: "2rem" }}>💫</div>
                  <p style={{ fontStyle: "italic", fontSize: "0.9rem" }}>Select a sign to discover your cosmic compatibility</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "share" && (
            <div style={{ animation: "fadeIn 0.3s ease", textAlign: "center" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📤</div>
              <p style={{ color: "#8a7a9b", fontStyle: "italic", marginBottom: "1.5rem", fontSize: "0.9rem" }}>{t.shareTitle}</p>
              <div style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "12px", padding: "1.2rem", textAlign: "left", marginBottom: "1.5rem" }}>
                <p style={{ color: "#c9a84c", fontFamily: "'Cinzel', serif", fontSize: "0.85rem", margin: "0 0 0.5rem 0" }}>Preview:</p>
                <p style={{ color: "#6b5c7a", fontSize: "0.8rem", lineHeight: 1.6, margin: 0 }}>
                  🔮 COSMIC ORACLE — {result.sign} | {t.rising} {result.ascendant}<br />
                  🌟 {result.essence.substring(0, 80)}...<br />
                  🏴‍☠️ {result.fruit}<br />
                  {compat ? `💞 With ${partnerSign}: ${compatScore}%` : ""}
                </p>
              </div>
              <button onClick={handleShare} style={{ width: "100%", padding: "1rem", background: copied ? "linear-gradient(135deg, #3a7a3a, #2a5a2a)" : "linear-gradient(135deg, #c9a84c, #8b6914)", border: "none", borderRadius: "12px", color: copied ? "#90ff90" : "#0d0a1a", fontFamily: "'Cinzel', serif", fontWeight: "bold", fontSize: "1rem", cursor: "pointer", letterSpacing: "0.1em", transition: "all 0.3s ease", boxShadow: copied ? "0 0 20px rgba(0,200,0,0.3)" : "0 0 20px rgba(201,168,76,0.2)" }}>
                {copied ? "{t.copied}" : "{t.copyBtn}"}
              </button>

              <div style={{ marginTop: "1.5rem", padding: "1rem", background: "rgba(201,168,76,0.05)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "12px" }}>
                <p style={{ color: "#c9a84c", fontFamily: "'Cinzel', serif", fontSize: "0.8rem", margin: "0 0 0.8rem 0" }}>{t.support}</p>
                <p style={{ color: "#6b5c7a", fontSize: "0.8rem", margin: "0 0 0.8rem 0", fontStyle: "italic" }}>{t.supportText}</p>
                <a href="https://ko-fi.com" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "0.6rem 1.5rem", background: "linear-gradient(135deg, #FF5E5B, #c0392b)", borderRadius: "8px", color: "white", textDecoration: "none", fontSize: "0.85rem", fontFamily: "'Cinzel', serif" }}>
                  {t.coffeeBtn}
                </a>
              </div>

              {compat && <p style={{ color: "#6b5c7a", fontSize: "0.8rem", marginTop: "0.8rem", fontStyle: "italic" }}>Includes compatibility with {partnerSign}</p>}
            </div>
          )}

          <button onClick={reset} style={{ width: "100%", padding: "0.8rem", marginTop: "1.5rem", background: "transparent", border: "1px solid rgba(201,168,76,0.25)", borderRadius: "12px", color: "#6b5c7a", fontFamily: "'Cinzel', serif", fontSize: "0.8rem", letterSpacing: "0.15em", cursor: "pointer", textTransform: "uppercase" }}>
            {t.newReading}
          </button>
        </div>
      )}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: "1.3rem" }}>
      <div style={{ color: "#c9a84c", fontWeight: "bold", fontSize: "0.95rem", marginBottom: "0.5rem", fontFamily: "'Cinzel', serif", borderBottom: "1px solid rgba(201,168,76,0.12)", paddingBottom: "0.3rem" }}>{title}</div>
      {children}
    </div>
  );
}

