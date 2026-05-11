    import { useState, useEffect, useRef } from "react";

// ─── STRIPE LINKS ────────────────────────────────────────────────────────────
const STRIPE_ANNUAL = "https://buy.stripe.com/7sYcN7csM1tBfTq1h7f3a01";
const STRIPE_GIFT   = "https://buy.stripe.com/9B6eVf1O84FNcHe8Jzf3a02";

// ─── DATA ────────────────────────────────────────────────────────────────────
const ZODIAC = [
  { name:"Aries",      sym:"♈", dates:"Mar 21 - Apr 19", el:"Fire",  color:"#e63946" },
  { name:"Taurus",     sym:"♉", dates:"Apr 20 - May 20", el:"Earth", color:"#2d9e6e" },
  { name:"Gemini",     sym:"♊", dates:"May 21 - Jun 20", el:"Air",   color:"#e9c46a" },
  { name:"Cancer",     sym:"♋", dates:"Jun 21 - Jul 22", el:"Water", color:"#a8dadc" },
  { name:"Leo",        sym:"♌", dates:"Jul 23 - Aug 22", el:"Fire",  color:"#f4a261" },
  { name:"Virgo",      sym:"♍", dates:"Aug 23 - Sep 22", el:"Earth", color:"#6a994e" },
  { name:"Libra",      sym:"♎", dates:"Sep 23 - Oct 22", el:"Air",   color:"#e07a9c" },
  { name:"Scorpio",    sym:"♏", dates:"Oct 23 - Nov 21", el:"Water", color:"#9b2335" },
  { name:"Sagittarius",sym:"♐", dates:"Nov 22 - Dec 21", el:"Fire",  color:"#9b72cf" },
  { name:"Capricorn",  sym:"♑", dates:"Dec 22 - Jan 19", el:"Earth", color:"#4cc9f0" },
  { name:"Aquarius",   sym:"♒", dates:"Jan 20 - Feb 18", el:"Air",   color:"#4cc9f0" },
  { name:"Pisces",     sym:"♓", dates:"Feb 19 - Mar 20", el:"Water", color:"#48cae4" },
];

const COMPAT = {Aries:{Aries:[85,"Fire against fire — explosive passion but also epic clashes."],Taurus:[45,"Too different in pace — one runs, the other waits."],Gemini:[78,"Energy and curiosity meet — never a dull moment."],Cancer:[40,"Aries burns where Cancer seeks protection."],Leo:[92,"Two fire signs — they understand each other without words."],Virgo:[38,"Virgo slows Aries down — constant tension."],Libra:[72,"Complementary opposites — magnetic attraction."],Scorpio:[65,"Both intense — they either love madly or destroy each other."],Sagittarius:[88,"Adventure and freedom — the most dynamic couple of the zodiac."],Capricorn:[50,"Aries wants it now, Capricorn waits — conflict of timing."],Aquarius:[75,"Both original and rebellious — they understand each other deeply."],Pisces:[55,"Different worlds but mysterious attraction."]},Taurus:{Aries:[45,"Too different in rhythm."],Taurus:[80,"Two rocks together — absolute stability but little surprise."],Gemini:[42,"Taurus wants roots, Gemini wants to fly."],Cancer:[90,"Earth and water — deep love, home and family."],Leo:[55,"Leo wants the spotlight, Taurus wants peace."],Virgo:[88,"Two earth signs — something solid is built."],Libra:[68,"Both love beauty — harmony is possible."],Scorpio:[72,"Powerful and complex attraction — all or nothing."],Sagittarius:[40,"Sagittarius flees where Taurus roots."],Capricorn:[92,"The most solid couple of the zodiac — they build together."],Aquarius:[38,"Too far apart."],Pisces:[82,"Infinite tenderness — they protect each other."]},Gemini:{Aries:[78,"They stimulate each other — never a moment of boredom."],Taurus:[42,"Taurus slows Gemini down — mutual frustration."],Gemini:[75,"Two brilliant minds — endless conversations but little depth."],Cancer:[50,"Cancer wants stability, Gemini fears it."],Leo:[80,"Both love being center stage — positive sparks."],Virgo:[55,"They understand but criticize each other."],Libra:[88,"Air and air — lightness, intelligence, natural affinity."],Scorpio:[48,"Scorpio is too intense for Gemini."],Sagittarius:[85,"Complementary opposites — adventure and freedom."],Capricorn:[40,"Capricorn structures, Gemini escapes."],Aquarius:[90,"Two extraordinary minds — revolutionary couple."],Pisces:[58,"Different worlds but mutual curiosity."]},Cancer:{Aries:[40,"Aries burns where Cancer seeks protection."],Taurus:[90,"Earth and water — deep and lasting love."],Gemini:[50,"Gemini changes too much for Cancer."],Cancer:[78,"They understand each other's soul — but too much sensitivity."],Leo:[62,"Leo illuminates Cancer — but can also blind them."],Virgo:[82,"Mutual care and devotion — a thoughtful couple."],Libra:[58,"Libra is too rational for emotional Cancer."],Scorpio:[92,"Water and water — emotional depth without equal."],Sagittarius:[38,"Sagittarius flees where Cancer wants to stay."],Capricorn:[70,"Opposites that attract — balance between heart and mind."],Aquarius:[42,"Aquarius is too detached for Cancer."],Pisces:[90,"Two water souls — total empathy and romantic love."]},Leo:{Aries:[92,"Fire and fire — immediate passion and mutual respect."],Taurus:[55,"Taurus doesn't always applaud — Leo takes offense."],Gemini:[80,"Gemini feeds Leo's ego — works well."],Cancer:[62,"Cancer nurtures Leo — a tender relationship."],Leo:[70,"Two kings together — grand but who yields?"],Virgo:[48,"Virgo criticizes Leo — inevitable clashes."],Libra:[85,"Libra adores Leo — elegant and harmonious couple."],Scorpio:[60,"Both want control — silent war."],Sagittarius:[90,"Fire and adventure — the most vibrant couple."],Capricorn:[52,"Capricorn is too sober for Leo."],Aquarius:[68,"Opposites that challenge each other — creative tension."],Pisces:[65,"Pisces admires Leo — fascinating dynamic."]},Virgo:{Aries:[38,"Aries is too impulsive for Virgo."],Taurus:[88,"Two earth signs — solidity and understanding."],Gemini:[55,"They stimulate each other mentally but get irritated."],Cancer:[82,"Mutual care — a thoughtful and stable couple."],Leo:[48,"Leo is too dramatic for practical Virgo."],Virgo:[72,"They understand each other perfectly — maybe too similar."],Libra:[65,"Both seek balance — good understanding."],Scorpio:[80,"Intensity and precision — they respect each other deeply."],Sagittarius:[42,"Sagittarius is too chaotic for Virgo."],Capricorn:[90,"The most efficient couple — they build the future."],Aquarius:[50,"Too different in their approach to life."],Pisces:[70,"Opposites that complete each other."]},Libra:{Aries:[72,"Magnetic attraction between opposites."],Taurus:[68,"Both love beauty — harmony is possible."],Gemini:[88,"Air and air — intellectual and light couple."],Cancer:[58,"Emotion vs rationality — difficult balance."],Leo:[85,"Elegance and charisma — an enviable couple."],Virgo:[65,"They respect but criticize each other."],Libra:[75,"Perfect harmony but who decides?"],Scorpio:[55,"Scorpio is too intense for Libra."],Sagittarius:[80,"Freedom and dialogue — open and dynamic couple."],Capricorn:[60,"Capricorn is too serious for Libra."],Aquarius:[88,"Two air signs — progressive and brilliant couple."],Pisces:[72,"Romance and harmony — a sensitive couple."]},Scorpio:{Aries:[65,"Both intense — passion or destruction."],Taurus:[72,"Complex and powerful attraction."],Gemini:[48,"Scorpio is too deep for Gemini."],Cancer:[92,"Two water souls — total connection."],Leo:[60,"Both dominant — power struggle."],Virgo:[80,"They respect and complete each other."],Libra:[55,"Too different in depth."],Scorpio:[82,"Double intensity — either wonderful or devastating."],Sagittarius:[45,"Sagittarius is too free for Scorpio."],Capricorn:[88,"Shared determination — an unbeatable couple."],Aquarius:[50,"Too emotionally distant."],Pisces:[92,"The deepest encounter of the zodiac."]},Sagittarius:{Aries:[88,"Pure adventure — the most dynamic couple."],Taurus:[40,"Too different — Taurus anchors, Sagittarius flies."],Gemini:[85,"Freedom and dialogue — never still."],Cancer:[38,"Cancer holds back where Sagittarius wants to fly."],Leo:[90,"Fire and passion — magnetic couple."],Virgo:[42,"Virgo slows Sagittarius down."],Libra:[80,"Freedom and harmony — open couple."],Scorpio:[45,"Scorpio wants to possess, Sagittarius wants to flee."],Sagittarius:[80,"Two free riders — wonderful while it lasts."],Capricorn:[50,"Capricorn plans, Sagittarius improvises."],Aquarius:[88,"Two free spirits — revolutionary couple."],Pisces:[62,"Different worlds but mystical attraction."]},Capricorn:{Aries:[50,"Too different in rhythms and goals."],Taurus:[92,"The most solid couple — they build the future."],Gemini:[40,"Gemini is too volatile for Capricorn."],Cancer:[70,"Complementary opposites — heart and mind."],Leo:[52,"Leo is too exuberant for Capricorn."],Virgo:[90,"Efficiency and determination — an unbeatable couple."],Libra:[60,"Libra is too indecisive for Capricorn."],Scorpio:[88,"Strength and determination — they respect each other deeply."],Sagittarius:[50,"Too different in approach."],Capricorn:[78,"They understand each other — but who warms up?"],Aquarius:[55,"Tradition vs revolution — constant tension."],Pisces:[72,"Pisces warms Capricorn — beautiful complementarity."]},Aquarius:{Aries:[75,"Both original — good understanding."],Taurus:[38,"Too far apart in lifestyle."],Gemini:[90,"Two brilliant minds — revolutionary couple."],Cancer:[42,"Aquarius is too detached for Cancer."],Leo:[68,"Creative challenge — opposites that attract."],Virgo:[50,"Approaches to life too different."],Libra:[88,"Air and air — progressive couple."],Scorpio:[50,"Too emotionally different."],Sagittarius:[88,"Two free spirits — open and dynamic couple."],Capricorn:[55,"Tradition vs innovation."],Aquarius:[80,"They understand each other perfectly."],Pisces:[65,"Rational vs emotional — fascination of opposites."]},Pisces:{Aries:[55,"Mystical attraction but different worlds."],Taurus:[82,"Tenderness and mutual protection."],Gemini:[58,"Mutual curiosity but little in common."],Cancer:[90,"Total empathy — romantic and deep love."],Leo:[65,"Leo fascinates Pisces."],Virgo:[70,"They complete each other."],Libra:[72,"Romance and harmony."],Scorpio:[92,"The deepest connection of the zodiac."],Sagittarius:[62,"Mystical attraction but unstable."],Capricorn:[72,"They complete each other — earth and water."],Aquarius:[65,"Fascination of opposites."],Pisces:[80,"Two romantic souls — ocean of feelings."]}};

const PERS = {Aries:{essence:"You are a flame that burns without asking permission. The universe created you to open roads where no paths exist.",strengths:["Instinctive leadership — others follow you without knowing why","Wild courage — you act when everyone hesitates","Primordial energy — you recharge while others sleep"],shadows:["Impatience betrays you in crucial moments","Your fire can burn those you love most"],love:"You love with devastating intensity. You want to conquer, not be conquered. Your ideal partner is someone who never surrenders to you.",fruit:"Magu Magu no Mi (Magma) — destructive, primordial, unstoppable like you.",destiny:"Your name will be remembered. Not for what you accumulated, but for the walls you tore down."},Taurus:{essence:"You are the mountain that doesn't move. While the world crumbles, you remain. This is your strength and your prison.",strengths:["Absolute resilience — you don't break, you bend and return","Refined aesthetic sense — you see beauty where others see nothing","Iron loyalty — whoever earns your trust has a treasure"],shadows:["Stubbornness isolates you even when you're wrong","The comfort zone is your golden cage"],love:"You love slowly, deeply, forever. You don't forgive betrayal. You seek stability but need someone who surprises you.",fruit:"Gura Gura no Mi (Earthquake) — absolute power, immovable, that makes the world tremble.",destiny:"You will build something that outlives your generation. Patience is your secret weapon."},Gemini:{essence:"You are two souls in one body. Others call you inconsistent. In reality you are living a double life they don't understand.",strengths:["Lightning intelligence — you connect ideas no one else sees linked","Adaptability — you survive in any environment","Magnetic communication — words are your magic"],shadows:["The surface sometimes hides emptiness — dig deeper","Anxiety devours you in moments of silence"],love:"You love with your mind before your heart. You need someone who stimulates your intellect every day.",fruit:"Kage Kage no Mi (Shadow) — you can be everywhere, multiple, elusive like your true nature.",destiny:"Your words will change minds. Whether you want it or not, you are destined to influence."},Cancer:{essence:"You are the ocean — calm on the surface, stormy in the depths. You protect those you love with silent ferocity.",strengths:["Supernatural intuition — you feel others' emotions before they express them","Prodigious memory — you never forget, for better or worse","Deep care — you make people feel at home"],shadows:["The shell protects you but isolates you from the world","The past anchors you when you should swim forward"],love:"You love with everything you have. You are the kind of person the other understands only after losing you.",fruit:"Sui Sui no Mi (Swim) — you glide through emotions like water, elusive and deep.",destiny:"You will be someone's anchor in a storm you can't yet see."},Leo:{essence:"You were born for the stage. Not out of vanity — but because when you enter a room, something changes in the air.",strengths:["Natural charisma — you attract without effort","Royal generosity — you give without calculating","Heart courage — you defend the weak by instinct"],shadows:["A wounded ego is your most dangerous blind spot","You need admiration like others need air"],love:"You love with theatricality and genuineness together. You want to be adored but also challenged. Whoever always flatters you will bore you.",fruit:"Hito Hito no Mi Model: Nika (Sun God) — light, freedom, power to change reality.",destiny:"You will become a reference point for many. Your true legacy is how you make others feel."},Virgo:{essence:"You see what others don't notice. Your mind is an instrument of precision in an approximate world.",strengths:["Penetrating analysis — you find the hidden flaw in any system","Total dedication — you do things right or not at all","Silent care — you love through actions, not words"],shadows:["Perfectionism paralyzes you at decisive moments","You are your own harshest critic"],love:"You love through concrete acts. You notice every detail of the person you love. You need someone who sees yours too.",fruit:"Ope Ope no Mi (Operation) — total control, surgical precision, understanding of every mechanism.",destiny:"You will solve a problem others have abandoned as impossible."},Libra:{essence:"You are the point where opposites meet. You don't seek balance — you are balance, and this costs you more than you show.",strengths:["Instinctive diplomacy — you find agreement where everyone sees conflict","Elevated aesthetic sense — you transform the ordinary into beauty","Visceral justice — injustice physically disturbs you"],shadows:["Indecision steals precious opportunities from you","To not disappoint anyone, you sometimes betray yourself"],love:"You love harmoniously but need passion. Your ideal partner completes you without overwhelming you.",fruit:"Bara Bara no Mi (Separation) — you can break down any conflict into its parts and recompose it.",destiny:"You will be the bridge between two worlds that don't understand each other. Your role is more important than you think."},Scorpio:{essence:"You are the abyss that looks inside others. You see everything, reveal little. This makes you the most powerful and the loneliest.",strengths:["X-ray intuition — you read people beyond their masks","Transformative intensity — you die and are reborn stronger","Absolute determination — you never abandon what you've decided"],shadows:["Resentment is the poison that poisons you first","Distrust isolates you from those who could truly love you"],love:"You love all-in or you don't love. There is no middle ground. You are the kind of love that is never forgotten.",fruit:"Doku Doku no Mi (Poison) — you penetrate others' defenses, transform pain into strength.",destiny:"You will go through a transformation that will look like destruction. On the other side is your truest self."},Sagittarius:{essence:"You are an arrow shot toward the horizon. No cage contains you for long — not even the ones you built yourself.",strengths:["Philosophical optimism — you find meaning even in chaos","Contagious freedom — you free others too with your presence","Expanded vision — you see beyond where others stop"],shadows:["Escape is your default response to depth","Promises weigh on you like chains"],love:"You love whoever lets you be free. The golden cage is your worst enemy even in love.",fruit:"Pika Pika no Mi (Light) — absolute speed, impossible to stop, always in motion.",destiny:"Your most important journey is the inner one. You will find what you seek outside only after finding it within."},Capricorn:{essence:"You were born with a map of the future in your head. While others live the present, you are already building the next decade.",strengths:["Legendary discipline — you do what must be done even when you don't want to","Strategic vision — you play chess when others play checkers","Silent resilience — you fall without anyone noticing and rise alone"],shadows:["Work is your armor against vulnerability","Losing control scares you more than any failure"],love:"You love with total dedication but show little. The right partner learns to read your silences.",fruit:"Zushi Zushi no Mi (Gravity) — weight, power, absolute control of fundamental forces.",destiny:"You will reach the top. The question is not if, but who you want beside you when you get there."},Aquarius:{essence:"You are from the future, trapped in the present. Others see you as strange — in reality you are simply ahead of your time.",strengths:["Revolutionary vision — you see solutions no one has yet imagined","Universal humanity — you love humanity as much as you struggle with individuals","Radical originality — you cannot be a copy, even if you try"],shadows:["Emotions scare you — you intellectualize them instead of feeling them","Distance protects you but deprives you of human warmth"],love:"You love the mind before the body. You need a partner who is also your best friend.",fruit:"Goro Goro no Mi (Lightning) — pure energy, unpredictable, capable of illuminating or destroying.",destiny:"Your craziest idea will change something. Stop waiting for permission."},Pisces:{essence:"You are the boundary between dream and reality. You live in both worlds simultaneously — this is your gift and your burden.",strengths:["Oceanic empathy — you absorb others' emotions like a sponge","Dreamlike creativity — you create worlds where others see only empty space","Spiritual connection — you feel what cannot be seen"],shadows:["The boundary between you and others often vanishes — and you get lost","Reality weighs on you — escape is always tempting"],love:"You love with a romantic intensity that can overwhelm. You need someone with their feet on the ground.",fruit:"Mero Mero no Mi (Love) — you touch souls, not bodies. Your power is emotional and absolute.",destiny:"Your greatest work has not yet begun. Wait for the moment — you will recognize it."}};

const ANNUAL = {Aries:{theme:"The Year of the Warrior's Awakening",overview:"2026 marks a turning point in your cosmic journey. The fire within you has been building — this is the year it ignites your greatest transformation yet.",quarters:[{q:"Q1 — Jan to Mar",love:"A new connection surprises you.",work:"Your leadership is finally recognized.",growth:"Release the identity that no longer fits."},{q:"Q2 — Apr to Jun",love:"Depth over intensity. The relationship that survives this quarter is built to last.",work:"Financial opportunity arrives — trust your instincts.",growth:"Your body is asking for rest. Honor it."},{q:"Q3 — Jul to Sep",love:"Passion returns with force.",work:"A collaboration brings unexpected results.",growth:"The wound you've been avoiding finally asks to be healed."},{q:"Q4 — Oct to Dec",love:"Clarity replaces confusion. You know exactly what you want.",work:"End the year with bold moves.",growth:"Gratitude unlocks the final door."}],challenge:"Your greatest obstacle is your own impatience.",gift:"Unstoppable momentum when aligned with purpose."},Taurus:{theme:"The Year of the Sacred Foundation",overview:"2026 asks you to build what will outlast you. A rare window for lasting achievement opens this year.",quarters:[{q:"Q1 — Jan to Mar",love:"A relationship deepens beyond what you thought possible.",work:"Financial clarity arrives.",growth:"Your body holds wisdom. Begin listening."},{q:"Q2 — Apr to Jun",love:"Spring brings renewal. A conflict resolves.",work:"An investment made now pays dividends for years.",growth:"Beauty heals you."},{q:"Q3 — Jul to Sep",love:"Your loyalty is tested. Trust what you know.",work:"Unexpected opportunity arrives.",growth:"Step outside the comfort zone."},{q:"Q4 — Oct to Dec",love:"The year ends with warmth and solidity.",work:"Recognition comes quietly.",growth:"What you've built is real. Rest."}],challenge:"Resistance to change will cost you more than change itself.",gift:"The rare ability to make things permanent."},Gemini:{theme:"The Year of the Dual Revelation",overview:"2026 is the year your two selves finally make peace. Tension dissolves into clarity.",quarters:[{q:"Q1 — Jan to Mar",love:"Mixed signals become clear.",work:"Communication opens a powerful door.",growth:"In the silence, the real answer waits."},{q:"Q2 — Apr to Jun",love:"A connection stimulates both mind and heart.",work:"Choose depth over breadth.",growth:"Write it down. Your thoughts contain gold."},{q:"Q3 — Jul to Sep",love:"Vulnerability creates the intimacy you've been searching for.",work:"A creative project reaches new heights.",growth:"Rest is the source of productivity."},{q:"Q4 — Oct to Dec",love:"You arrive somewhere you've always been heading.",work:"Your ideas plant seeds for years to come.",growth:"Both sides of you, finally walking together."}],challenge:"Commitment feels like a cage. It is actually a launchpad.",gift:"The ability to see what others miss entirely."},Cancer:{theme:"The Year of the Tidal Healing",overview:"2026 brings the deepest healing of your adult life.",quarters:[{q:"Q1 — Jan to Mar",love:"Someone from your past resurfaces.",work:"Intuition leads you to the right decision.",growth:"An inherited wound asks to stop here."},{q:"Q2 — Apr to Jun",love:"Nurture yourself as fiercely as you nurture others.",work:"Emotional intelligence becomes your asset.",growth:"Home transforms into sanctuary."},{q:"Q3 — Jul to Sep",love:"Full moon energy amplifies everything.",work:"A caring project reaches its culmination.",growth:"The old shell no longer fits."},{q:"Q4 — Oct to Dec",love:"Deep, quiet love.",work:"Recognition comes for the work you almost gave up on.",growth:"You end the year more fully yourself."}],challenge:"The past has your attention. The future needs it more.",gift:"Healing others simply by being present."},Leo:{theme:"The Year of the Sovereign Heart",overview:"2026 is your coronation. Not by others — by yourself.",quarters:[{q:"Q1 — Jan to Mar",love:"Someone truly sees you — and doesn't look away.",work:"A creative vision begins to take real shape.",growth:"The ego softens. What remains is more powerful."},{q:"Q2 — Apr to Jun",love:"A relationship is tested — and survives stronger.",work:"Collaboration with a creative equal produces something extraordinary.",growth:"Generosity without expectation unlocks abundance."},{q:"Q3 — Jul to Sep",love:"Summer brings passion and clarity.",work:"The spotlight finds you. You are ready.",growth:"Joy as a practice, not a reward."},{q:"Q4 — Oct to Dec",love:"The year closes with love that feels like coming home.",work:"What you built is a foundation, not a peak.",growth:"You were always exactly enough."}],challenge:"The need for validation will dim your light. Shine without permission.",gift:"The power to make others believe in themselves."},Virgo:{theme:"The Year of the Precise Miracle",overview:"2026 rewards your dedication with results you've quietly worked toward for years.",quarters:[{q:"Q1 — Jan to Mar",love:"Someone who notices the details about you arrives.",work:"A system you built begins to work as designed.",growth:"Begin imperfectly."},{q:"Q2 — Apr to Jun",love:"Depth of connection surprises you.",work:"An opportunity to lead arrives.",growth:"Your body knows before your mind does."},{q:"Q3 — Jul to Sep",love:"Criticism dissolves into acceptance.",work:"The detail others missed becomes the solution.",growth:"Rest without agenda."},{q:"Q4 — Oct to Dec",love:"A relationship settles into something nourishing.",work:"Tangible proof of your dedication arrives.",growth:"You are infinitely more than your productivity."}],challenge:"Fill yourself first before helping everyone else.",gift:"Finding solutions hidden in plain sight."},Libra:{theme:"The Year of the Beautiful Decision",overview:"2026 asks you to choose — and trust that choosing is not losing.",quarters:[{q:"Q1 — Jan to Mar",love:"A relationship reaches a crossroads.",work:"Collaboration brings beautiful results.",growth:"The avoided decision holds your next chapter."},{q:"Q2 — Apr to Jun",love:"Romance blooms under spring skies.",work:"An aesthetic project earns recognition.",growth:"Balance is practiced daily, imperfectly."},{q:"Q3 — Jul to Sep",love:"Authenticity attracts what performance never could.",work:"A partnership changes the trajectory of your work.",growth:"Justice begins with yourself."},{q:"Q4 — Oct to Dec",love:"The year ends in harmony.",work:"What you co-created outlasts the collaboration.",growth:"You chose yourself. That is the most elegant thing."}],challenge:"Indecision is also a decision — and it chooses for you.",gift:"Creating harmony where others see only conflict."},Scorpio:{theme:"The Year of the Phoenix Rising",overview:"2026 is your rebirth year. Something must end completely for the most powerful version of you to emerge.",quarters:[{q:"Q1 — Jan to Mar",love:"A truth surfaces that changes everything.",work:"Hidden information comes to light.",growth:"The transformation has already begun."},{q:"Q2 — Apr to Jun",love:"Deep, magnetic connection. The kind that leaves a mark.",work:"A power dynamic shifts in your favor.",growth:"Resentment released creates space for something extraordinary."},{q:"Q3 — Jul to Sep",love:"Passion and power balance in full presence.",work:"Investigation yields profound insight.",growth:"The old skin is gone. Who are you now?"},{q:"Q4 — Oct to Dec",love:"Intimacy that reaches the parts of you others never touch.",work:"What you built from ashes is stronger.",growth:"You are not who you were in January. That is the gift."}],challenge:"Control is an illusion that costs more than surrender.",gift:"Seeing the truth others hide even from themselves."},Sagittarius:{theme:"The Year of the Sacred Journey",overview:"2026 takes you somewhere you've never been — inside yourself.",quarters:[{q:"Q1 — Jan to Mar",love:"Someone who shares your hunger for meaning enters your life.",work:"A vision too large becomes the only one worth pursuing.",growth:"The question you fear holds the answer you need."},{q:"Q2 — Apr to Jun",love:"Freedom and commitment stop feeling like opposites.",work:"Your philosophy reaches further than expected.",growth:"Slow down to notice what's already here."},{q:"Q3 — Jul to Sep",love:"Adventure shared becomes sacred.",work:"An opportunity requires leaving your comfort zone.",growth:"Your optimism is vision. Protect it."},{q:"Q4 — Oct to Dec",love:"A love that has become a home.",work:"The seeds you planted take root.",growth:"You found what you were seeking."}],challenge:"Running from depth costs you the meaning you seek.",gift:"Turning every experience into wisdom."},Capricorn:{theme:"The Year of the Summit Reached",overview:"2026 delivers what you've been building toward for years.",quarters:[{q:"Q1 — Jan to Mar",love:"A relationship built on respect deepens into something rare.",work:"A long-term plan reaches a critical milestone.",growth:"Rest is how peaks are reached."},{q:"Q2 — Apr to Jun",love:"Vulnerability transforms a good relationship into a great one.",work:"Recognition arrives for quiet, consistent work.",growth:"Acknowledge what you've sacrificed."},{q:"Q3 — Jul to Sep",love:"A summer of genuine warmth. You allow yourself to receive.",work:"Leadership is confirmed by trust.",growth:"The summit reveals a view no one else has."},{q:"Q4 — Oct to Dec",love:"Love that is solid, chosen, built to last.",work:"You close 2026 with quiet certainty.",growth:"Legacy begins now."}],challenge:"Achievement without intimacy is a summit with no one to share the view.",gift:"Making the impossible inevitable through sustained effort."},Aquarius:{theme:"The Year of the Revolutionary Heart",overview:"2026 is the year your vision meets the world — and changes it.",quarters:[{q:"Q1 — Jan to Mar",love:"An unconventional connection defies every category.",work:"A dismissed idea begins to find its audience.",growth:"Emotion is data, not weakness."},{q:"Q2 — Apr to Jun",love:"Intellectual equals become something more.",work:"A collaborative project disrupts something that needed disrupting.",growth:"Belonging doesn't require becoming someone else."},{q:"Q3 — Jul to Sep",love:"Freedom within commitment becomes real.",work:"Your vision is adopted by others.",growth:"Detachment becomes presence."},{q:"Q4 — Oct to Dec",love:"Connection that honors both individuality and union.",work:"What you imagined in January exists by December.",growth:"You are not strange. You are early."}],challenge:"Loving humanity in theory while keeping individuals at arm's length.",gift:"Imagining futures that then become inevitable."},Pisces:{theme:"The Year of the Dream Made Real",overview:"2026 is the year the invisible becomes visible. What you've felt finally takes form.",quarters:[{q:"Q1 — Jan to Mar",love:"A soul-level recognition.",work:"Creative inspiration arrives in waves.",growth:"The boundary between you and others clarifies."},{q:"Q2 — Apr to Jun",love:"Love that heals something ancestral.",work:"A creative project gains tangible momentum.",growth:"Your sensitivity is your most accurate instrument."},{q:"Q3 — Jul to Sep",love:"Romantic intensity and artistic inspiration in equal measure.",work:"An opportunity to bring your inner world out.",growth:"What does the escapism signal? Answer that."},{q:"Q4 — Oct to Dec",love:"Love that feels like a prayer answered.",work:"What you created carries your soul's signature.",growth:"You are dreaming the world into being."}],challenge:"The boundary between empathy and dissolution must be tended daily.",gift:"Touching the hearts of others without trying — simply by being."}};

const DAILY_Q = {Aries:["Your fire cannot be contained. Today, let it illuminate rather than consume.","The boldest move is always the right one. Trust your instincts.","You were born to lead. Step forward — the world is waiting."],Taurus:["Slow and steady does not mean passive. It means purposeful.","Your roots run deep. No storm can uproot what you have built.","Beauty surrounds you today. Open your eyes and receive it."],Gemini:["Your mind is a universe. Today, explore its furthest edges.","Two paths appear before you. You are wise enough to walk both.","Words are your magic. Choose them like spells."],Cancer:["Your sensitivity is not fragility. It is your greatest intelligence.","Home is not a place. It is the feeling you create wherever you go.","Today, protect your energy as fiercely as you protect those you love."],Leo:["You were born to shine. Today, do not dim yourself for anyone.","The spotlight finds you because you deserve it. Own it.","Your heart is your compass. Let it lead today."],Virgo:["Perfection is a direction, not a destination. Keep moving.","Your attention to detail today will create tomorrow's masterpiece.","Progress, not perfection. You are exactly where you need to be."],Libra:["Balance is not stillness. It is constant, graceful adjustment.","Today, make the decision you have been avoiding. Trust your scales.","Harmony begins within. Find your center before seeking it outside."],Scorpio:["What others fear to face, you walk toward. This is your power.","Transformation is not loss. It is evolution in disguise.","From the ashes of who you were, your truest self emerges."],Sagittarius:["The horizon is not a limit. It is an invitation.","Your optimism is not naivety — it is a revolutionary act.","Today, follow the question that excites you most."],Capricorn:["Every step forward, no matter how small, is still a step forward.","Your discipline today is building the life you will live tomorrow.","The summit is closer than it appears. Keep going."],Aquarius:["The future you imagine is closer than the world believes.","Your difference is your contribution. Never apologize for it.","Revolution begins with a single mind willing to think differently."],Pisces:["Your dreams are not escapes. They are blueprints.","Today, your empathy is your compass. Follow it wisely.","The ocean within you is deeper than anyone has yet explored."]};

const COSMIC_Q = ["The universe conspires in favor of those who dare to dream.","Every star in the sky was once just a wish someone made in the dark.","You are made of stardust and ancient light. Act accordingly.","The cosmos does not rush, yet everything is accomplished.","What you seek is also seeking you.","Trust the timing of your life. The stars are never wrong.","Your soul chose this exact moment to exist. That is not an accident.","The moon does not apologize for its phases. Neither should you.","Energy flows where intention goes. Direct yours wisely today.","Even the darkest night will end, and the stars will shine again."];

const TAROT = [{name:"The Fool",emoji:"🃏",number:"0",energy:"Freedom",meaning:"New beginnings, innocence, spontaneity. A leap of faith awaits you."},{name:"The Magician",emoji:"🔮",number:"I",energy:"Power",meaning:"You have all the tools you need. Willpower and manifestation are your allies."},{name:"The High Priestess",emoji:"🌙",number:"II",energy:"Intuition",meaning:"Trust your intuition. Secrets are revealed to those who listen in silence."},{name:"The Empress",emoji:"🌸",number:"III",energy:"Abundance",meaning:"Abundance flows to you. Nurture yourself and watch everything bloom."},{name:"The Emperor",emoji:"👑",number:"IV",energy:"Authority",meaning:"Take control. Structure and discipline create the freedom you seek."},{name:"The Lovers",emoji:"💞",number:"VI",energy:"Union",meaning:"A choice of the heart approaches. Alignment between values and desires is key."},{name:"The Chariot",emoji:"⚡",number:"VII",energy:"Victory",meaning:"Victory through determination. You are unstoppable when you focus your will."},{name:"Strength",emoji:"🦁",number:"VIII",energy:"Courage",meaning:"Inner strength conquers all. Patience and compassion are more powerful than force."},{name:"Wheel of Fortune",emoji:"☸️",number:"X",energy:"Change",meaning:"The wheel turns in your favor. Embrace the cycles."},{name:"The Star",emoji:"⭐",number:"XVII",energy:"Hope",meaning:"Hope is restored. After the storm, you are guided by starlight toward your destiny."},{name:"The Sun",emoji:"☀️",number:"XIX",energy:"Joy",meaning:"Joy, success and vitality surround you. Today the universe celebrates your existence."},{name:"The World",emoji:"🌍",number:"XXI",energy:"Completion",meaning:"Completion and wholeness. You have arrived. Celebrate how far you have come."}];

const ORACLE_FALLBACK = ["The stars have seen your question. The answer lives in the silence between heartbeats — listen there.","What you seek is already within you. The cosmos merely reflects what your soul already knows.","A door will open where you least expect it. Your role is not to find the door, but to be ready when it appears.","The universe does not speak in certainties. It speaks in directions. Trust the current pulling you forward.","Three things are aligned in your favor right now: your intention, your timing, and the unseen hand of destiny.","What feels like an ending is the universe preparing space for something extraordinary to arrive."];

// ─── UTILS ───────────────────────────────────────────────────────────────────
function dayOfYear() {
  const n = new Date(), s = new Date(n.getFullYear(), 0, 0);
  return Math.floor((n - s) / 86400000);
}
function getDailyQuote(sign) {
  const q = DAILY_Q[sign]; if (!q) return "";
  return q[dayOfYear() % q.length];
}
function getCosmicQuote() { return COSMIC_Q[dayOfYear() % COSMIC_Q.length]; }
function getDailyTarot() { return TAROT[dayOfYear() % TAROT.length]; }

function getMoonPhase() {
  const jd = Date.now() / 86400000 + 2440587.5;
  const phase = ((jd - 2451550.1) / 29.5305882) % 1;
  const n = phase < 0 ? phase + 1 : phase;
  const d = Math.floor(n * 29.5);
  if (d === 0)  return { name:"New Moon",        emoji:"🌑", energy:"Manifestation",    meaning:"New beginnings. Plant your intentions. The universe is ready to receive." };
  if (d <= 6)   return { name:"Waxing Crescent", emoji:"🌒", energy:"Growth",           meaning:"Your intentions are taking root. Nurture your dreams with action and faith." };
  if (d === 7)  return { name:"First Quarter",   emoji:"🌓", energy:"Decision",         meaning:"Face the challenges. Decisions made now shape your destiny. Choose boldly." };
  if (d <= 13)  return { name:"Waxing Gibbous",  emoji:"🌔", energy:"Refinement",       meaning:"Your goals are almost within reach. Adjust and persist." };
  if (d === 14) return { name:"Full Moon",        emoji:"🌕", energy:"Release & Clarity",meaning:"Peak energy. Emotions are heightened. Release what no longer serves your soul." };
  if (d <= 20)  return { name:"Waning Gibbous",  emoji:"🌖", energy:"Gratitude",        meaning:"Time to share your wisdom. Gratitude amplifies your cosmic connection." };
  if (d === 21) return { name:"Last Quarter",    emoji:"🌗", energy:"Release",          meaning:"Let go of old patterns. Forgiveness unlocks your next level." };
  return               { name:"Waning Crescent", emoji:"🌘", energy:"Rest & Surrender", meaning:"Rest. Reflect. Surrender. The universe is preparing something extraordinary." };
}

function getSign(d, m) {
  const day = parseInt(d), mon = parseInt(m);
  if ((mon===3&&day>=21)||(mon===4&&day<=19)) return "Aries";
  if ((mon===4&&day>=20)||(mon===5&&day<=20)) return "Taurus";
  if ((mon===5&&day>=21)||(mon===6&&day<=20)) return "Gemini";
  if ((mon===6&&day>=21)||(mon===7&&day<=22)) return "Cancer";
  if ((mon===7&&day>=23)||(mon===8&&day<=22)) return "Leo";
  if ((mon===8&&day>=23)||(mon===9&&day<=22)) return "Virgo";
  if ((mon===9&&day>=23)||(mon===10&&day<=22)) return "Libra";
  if ((mon===10&&day>=23)||(mon===11&&day<=21)) return "Scorpio";
  if ((mon===11&&day>=22)||(mon===12&&day<=21)) return "Sagittarius";
  if ((mon===12&&day>=22)||(mon===1&&day<=19)) return "Capricorn";
  if ((mon===1&&day>=20)||(mon===2&&day<=18)) return "Aquarius";
  return "Pisces";
}

function getAscendant(h) {
  const hour = parseInt(h);
  if (hour>=6&&hour<8)   return "Leo";
  if (hour>=8&&hour<10)  return "Virgo";
  if (hour>=10&&hour<12) return "Libra";
  if (hour>=12&&hour<14) return "Scorpio";
  if (hour>=14&&hour<16) return "Sagittarius";
  if (hour>=16&&hour<18) return "Capricorn";
  if (hour>=18&&hour<20) return "Aquarius";
  if (hour>=20&&hour<22) return "Pisces";
  if (hour>=22||hour<2)  return "Aries";
  if (hour>=2&&hour<4)   return "Taurus";
  return "Gemini";
}

function formatDate() {
  return new Date().toLocaleDateString("en-US", { weekday:"long", year:"numeric", month:"long", day:"numeric" });
}

// ─── ZODIAC WHEEL ─────────────────────────────────────────────────────────────
function ZodiacWheel({ selectedSign, onSelect }) {
  const cx = 250, cy = 250, R = 228, ri = 158, rLabel = 198, rSym = 122;

  const slices = ZODIAC.map((z, i) => {
    const startAngle = (i * 30 - 90 - 15) * Math.PI / 180;
    const endAngle   = ((i + 1) * 30 - 90 - 15) * Math.PI / 180;
    const midAngle   = (startAngle + endAngle) / 2;
    const x1 = cx + R  * Math.cos(startAngle), y1 = cy + R  * Math.sin(startAngle);
    const x2 = cx + R  * Math.cos(endAngle),   y2 = cy + R  * Math.sin(endAngle);
    const xi1= cx + ri * Math.cos(startAngle), yi1= cy + ri * Math.sin(startAngle);
    const xi2= cx + ri * Math.cos(endAngle),   yi2= cy + ri * Math.sin(endAngle);
    const d  = `M${xi1},${yi1} L${x1},${y1} A${R},${R} 0 0,1 ${x2},${y2} L${xi2},${yi2} A${ri},${ri} 0 0,0 ${xi1},${yi1}`;
    const lx = cx + rLabel * Math.cos(midAngle), ly = cy + rLabel * Math.sin(midAngle);
    const sx = cx + rSym   * Math.cos(midAngle), sy = cy + rSym   * Math.sin(midAngle);
    const isSelected = selectedSign === z.name;
    return { z, d, lx, ly, sx, sy, startAngle, isSelected, midAngle };
  });

  // constellation points
  const constPts = ZODIAC.map((_, i) => {
    const a = (i * 30 - 90) * Math.PI / 180;
    return { x: cx + 108 * Math.cos(a), y: cy + 108 * Math.sin(a) };
  });

  return (
    <svg
      viewBox="0 0 500 500"
      style={{
        width:"100%", height:"100%", cursor:"pointer",
        filter:"drop-shadow(0 0 35px rgba(124,58,237,0.6)) drop-shadow(0 0 70px rgba(80,20,160,0.35))"
      }}
    >
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="strongGlow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="7" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="ringGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="purpleGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="14" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <radialGradient id="wheelBg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(100,30,220,0.28)"/>
          <stop offset="55%" stopColor="rgba(40,10,100,0.15)"/>
          <stop offset="100%" stopColor="rgba(0,0,0,0)"/>
        </radialGradient>
      </defs>

      {/* Background radial glow */}
      <circle cx={cx} cy={cy} r={R} fill="url(#wheelBg)" />

      {/* Outer rings */}
      <circle cx={cx} cy={cy} r={R}  fill="none" stroke="rgba(201,150,58,0.7)" strokeWidth="2"   filter="url(#ringGlow)" />
      <circle cx={cx} cy={cy} r={R}  fill="none" stroke="rgba(201,150,58,0.3)" strokeWidth="0.5" />
      <circle cx={cx} cy={cy} r={ri} fill="none" stroke="rgba(201,150,58,0.5)" strokeWidth="1.5" filter="url(#ringGlow)" />
      <circle cx={cx} cy={cy} r={95} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      <circle cx={cx} cy={cy} r={55} fill="none" stroke="rgba(180,120,255,0.4)" strokeWidth="1" filter="url(#purpleGlow)" />

      {/* Sacred geometry lines */}
      {ZODIAC.map((_, i) => {
        const a = (i * 30 - 90) * Math.PI / 180;
        return <line key={i} x1={cx} y1={cy} x2={cx+95*Math.cos(a)} y2={cy+95*Math.sin(a)} stroke="rgba(201,150,58,0.07)" strokeWidth="0.5" />;
      })}

      {/* Constellation lines */}
      {constPts.map((p, i) => {
        const next = constPts[(i + 1) % 12];
        return <line key={i} x1={p.x} y1={p.y} x2={next.x} y2={next.y} stroke="rgba(201,150,58,0.2)" strokeWidth="0.7" />;
      })}

      {/* Slices */}
      {slices.map(({ z, d, isSelected }) => (
        <path
          key={z.name} d={d}
          fill={isSelected ? z.color + "44" : "rgba(255,255,255,0.02)"}
          stroke={isSelected ? "rgba(180,100,255,0.95)" : "rgba(201,150,58,0.15)"}
          strokeWidth={isSelected ? "2" : "1"}
          filter={isSelected ? "url(#ringGlow)" : undefined}
          onClick={() => onSelect(z.name)}
          style={{ transition:"all .3s", cursor:"pointer" }}
          onMouseEnter={e => { if (!isSelected) e.target.setAttribute("fill", z.color + "22"); }}
          onMouseLeave={e => { if (!isSelected) e.target.setAttribute("fill", "rgba(255,255,255,0.02)"); }}
        />
      ))}

      {/* Separator lines */}
      {slices.map(({ z, startAngle }) => (
        <line key={z.name}
          x1={cx + ri * Math.cos(startAngle)} y1={cy + ri * Math.sin(startAngle)}
          x2={cx + R  * Math.cos(startAngle)} y2={cy + R  * Math.sin(startAngle)}
          stroke="rgba(201,150,58,0.22)" strokeWidth="1"
        />
      ))}

      {/* Sign names */}
      {slices.map(({ z, lx, ly }) => (
        <text key={z.name} x={lx} y={ly + 4} textAnchor="middle"
          fill={selectedSign === z.name ? "#f0d080" : "rgba(224,215,200,0.65)"}
          fontSize="8.5" fontFamily="Cinzel,serif" letterSpacing="0.04em"
          style={{ cursor:"pointer", transition:"fill .3s" }}
          onClick={() => onSelect(z.name)}>
          {z.name.toUpperCase()}
        </text>
      ))}

      {/* Symbols */}
      {slices.map(({ z, sx, sy }) => (
        <text key={z.name} x={sx} y={sy + 7} textAnchor="middle"
          fill={selectedSign === z.name ? "#ffffff" : z.color}
          fontSize="17" filter={selectedSign === z.name ? "url(#strongGlow)" : "url(#glow)"}
          style={{ cursor:"pointer", transition:"all .3s" }}
          onClick={() => onSelect(z.name)}>
          {z.sym}
        </text>
      ))}

      {/* Constellation dots */}
      {constPts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="2.8" fill="#f0c060" filter="url(#glow)" opacity="0.8" />
      ))}

      {/* Outer sparkle dots */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => {
        const a = deg * Math.PI / 180;
        return (
          <circle key={i} cx={cx+(R+10)*Math.cos(a)} cy={cy+(R+10)*Math.sin(a)} r="3"
            fill="#f0d080" filter="url(#glow)" opacity="0.9">
            <animate attributeName="opacity" values="0.2;1;0.2" dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite"/>
          </circle>
        );
      })}

      {/* Center purple pulse */}
      <circle cx={cx} cy={cy} r="54" fill="rgba(124,58,237,0.2)" filter="url(#purpleGlow)">
        <animate attributeName="r" values="50;62;50" dur="3s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.3;0.65;0.3" dur="3s" repeatCount="indefinite"/>
      </circle>

      {/* Moon */}
      <text x={cx} y={cy+18} textAnchor="middle" fontSize="46" filter="url(#purpleGlow)">🌙</text>
    </svg>
  );
}

// ─── SCORE BAR ────────────────────────────────────────────────────────────────
function ScoreBar({ score }) {
  const color = score >= 80 ? "#c9a84c" : score >= 60 ? "#8b9f5e" : "#8b4a4a";
  return (
    <div style={{ background:"rgba(255,255,255,0.06)", borderRadius:999, height:8, marginTop:8 }}>
      <div style={{ width:`${score}%`, background:`linear-gradient(90deg,${color},${color}bb)`, height:"100%", borderRadius:999, transition:"width 1s ease", boxShadow:`0 0 8px ${color}66` }} />
    </div>
  );
}

// ─── SECTION ──────────────────────────────────────────────────────────────────
function Section({ title, children }) {
  return (
    <div style={{ marginBottom:"1.1rem" }}>
      <div style={{ fontFamily:"'Cinzel',serif", color:"#c9a84c", fontSize:".82rem", fontWeight:700, marginBottom:".4rem", paddingBottom:".3rem", borderBottom:"1px solid rgba(201,150,58,0.12)" }}>{title}</div>
      {children}
    </div>
  );
}

// ─── MODALS ───────────────────────────────────────────────────────────────────
function AnnualModal({ sign, onClose }) {
  const [unlocked, setUnlocked] = useState(false);
  const d = ANNUAL[sign] || ANNUAL["Aries"];

  const pay = () => {
    window.open(STRIPE_ANNUAL, "_blank");
    setTimeout(() => {
      if (window.confirm("✅ Did you complete the payment? Click OK to unlock your 2026 Destiny.")) setUnlocked(true);
    }, 800);
  };

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.85)", zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", padding:"1rem" }}>
      <div style={{ background:"linear-gradient(135deg,#0d0a1a,#110d22)", border:"1px solid rgba(201,150,58,0.35)", borderRadius:20, padding:"1.8rem", width:"100%", maxWidth:520, maxHeight:"88vh", overflowY:"auto", position:"relative", boxShadow:"0 0 60px rgba(201,150,58,0.15)" }}>
        <button onClick={onClose} style={{ position:"absolute", top:"1rem", right:"1rem", background:"transparent", border:"none", color:"#6b5c7a", fontSize:"1.4rem", cursor:"pointer" }}>✕</button>
        <div style={{ textAlign:"center", marginBottom:"1.2rem" }}>
          <div style={{ fontSize:"2rem" }}>🔮</div>
          <div style={{ fontFamily:"'Cinzel',serif", color:"#c9a84c", fontSize:"1.2rem", margin:".3rem 0" }}>Annual Cosmic Destiny 2026</div>
          <div style={{ color:"#9b72cf", fontSize:".82rem" }}>{sign} — Complete cosmic forecast</div>
        </div>
        {!unlocked ? (
          <>
            <div style={{ background:"rgba(201,150,58,0.05)", border:"1px solid rgba(201,150,58,0.15)", borderRadius:12, padding:"1rem", marginBottom:"1.2rem" }}>
              {["🌟 Your year's cosmic theme","📅 Quarter-by-quarter predictions","❤️ Love forecast for each season","💼 Career & financial guidance","🌱 Personal growth milestones","⚡ Your greatest challenge of 2026","✨ Your cosmic gift for 2026"].map((item,i) => (
                <p key={i} style={{ color:"#c8b89a", fontSize:".82rem", margin:".3rem 0" }}>{item}</p>
              ))}
            </div>
            <div style={{ textAlign:"center", marginBottom:"1rem" }}>
              <div style={{ fontFamily:"'Cinzel',serif", fontSize:"2rem", fontWeight:700, color:"#c9a84c" }}>€2.99</div>
              <div style={{ color:"#6b5c7a", fontSize:".75rem" }}>One-time payment — yours forever</div>
            </div>
            <button onClick={pay} style={{ width:"100%", padding:"1rem", background:"linear-gradient(135deg,#c9a84c,#8b6914)", border:"none", borderRadius:12, color:"#0d0a1a", fontFamily:"'Cinzel',serif", fontWeight:700, fontSize:"1rem", cursor:"pointer", letterSpacing:".1em" }}>✦ Unlock My 2026 Destiny ✦</button>
            <p style={{ color:"#4a3a5a", fontSize:".72rem", textAlign:"center", marginTop:".6rem" }}>🔒 Secure payment via Stripe</p>
          </>
        ) : (
          <div>
            <div style={{ background:"rgba(201,150,58,0.06)", border:"1px solid rgba(201,150,58,0.15)", borderRadius:14, padding:"1.1rem", marginBottom:"1.2rem", textAlign:"center" }}>
              <div style={{ color:"#c9a84c", fontFamily:"'Cinzel',serif", fontWeight:700, marginBottom:".4rem" }}>{d.theme}</div>
              <p style={{ color:"#c8b89a", fontStyle:"italic", fontSize:".85rem", lineHeight:1.7, margin:0 }}>{d.overview}</p>
            </div>
            {d.quarters.map((q, i) => (
              <div key={i} style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(201,150,58,0.1)", borderRadius:12, padding:".9rem", marginBottom:"1rem" }}>
                <div style={{ color:"#c9a84c", fontFamily:"'Cinzel',serif", fontSize:".8rem", fontWeight:700, marginBottom:".6rem" }}>{q.q}</div>
                <p style={{ color:"#e07a9c", fontSize:".8rem", margin:"0 0 .3rem" }}>❤️ <strong>Love:</strong> {q.love}</p>
                <p style={{ color:"#8b9f5e", fontSize:".8rem", margin:"0 0 .3rem" }}>💼 <strong>Work:</strong> {q.work}</p>
                <p style={{ color:"#9b72cf", fontSize:".8rem", margin:0 }}>🌱 <strong>Growth:</strong> {q.growth}</p>
              </div>
            ))}
            <div style={{ background:"rgba(201,150,58,0.05)", border:"1px solid rgba(201,150,58,0.15)", borderRadius:12, padding:"1rem" }}>
              <p style={{ color:"#e63946", fontSize:".83rem", margin:"0 0 .5rem" }}>⚡ <strong>Your greatest challenge:</strong> {d.challenge}</p>
              <p style={{ color:"#c9a84c", fontSize:".83rem", margin:0 }}>✨ <strong>Your cosmic gift:</strong> {d.gift}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function GiftModal({ onClose }) {
  const [form, setForm] = useState({ name:"", day:"", month:"", year:"", hour:"", minute:"", message:"" });
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const pay = () => {
    if (!form.name || !form.day || !form.month || !form.year || !form.hour || form.minute === "") { alert("Please fill in all fields!"); return; }
    window.open(STRIPE_GIFT, "_blank");
    setTimeout(() => {
      if (window.confirm("✅ Did you complete the payment? Click OK to generate the cosmic gift.")) {
        const sign = getSign(form.day, form.month);
        const p = PERS[sign];
        setResult({ ...p, sign, ascendant: getAscendant(form.hour), friendName: form.name, friendMsg: form.message });
      }
    }, 800);
  };

  const copy = () => {
    if (!result) return;
    const text = `🔮 A COSMIC READING GIFT FOR ${result.friendName.toUpperCase()}\n\n♾ Sign: ${result.sign} | Rising: ${result.ascendant}\n\n🌟 Cosmic Essence:\n${result.essence}\n\n⚡ Hidden Powers:\n${result.strengths.map(s => "• " + s).join("\n")}\n\n❤️ Love:\n${result.love}\n\n🏴‍☠️ Devil Fruit:\n${result.fruit}\n\n🔮 Destiny:\n${result.destiny}${result.friendMsg ? `\n\n💌 "${result.friendMsg}"` : ""}\n\n✦ cosmicoracleapp.com ✦`;
    navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 3000); });
  };

  const inp = { background:"rgba(255,255,255,0.05)", border:"1px solid rgba(224,122,156,0.25)", borderRadius:8, padding:".7rem", color:"#e8d5a3", fontSize:".9rem", fontFamily:"Georgia,serif", outline:"none", textAlign:"center", width:"100%" };

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.85)", zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", padding:"1rem" }}>
      <div style={{ background:"linear-gradient(135deg,#0d0a1a,#110d22)", border:"1px solid rgba(224,122,156,0.35)", borderRadius:20, padding:"1.8rem", width:"100%", maxWidth:520, maxHeight:"88vh", overflowY:"auto", position:"relative", boxShadow:"0 0 60px rgba(224,122,156,0.12)" }}>
        <button onClick={onClose} style={{ position:"absolute", top:"1rem", right:"1rem", background:"transparent", border:"none", color:"#6b5c7a", fontSize:"1.4rem", cursor:"pointer" }}>✕</button>
        <div style={{ textAlign:"center", marginBottom:"1.2rem" }}>
          <div style={{ fontSize:"2rem" }}>💌</div>
          <div style={{ fontFamily:"'Cinzel',serif", color:"#e07a9c", fontSize:"1.2rem", margin:".3rem 0" }}>Gift a Cosmic Reading</div>
          <div style={{ color:"#9b72cf", fontSize:".82rem" }}>A personalized cosmic letter for someone special</div>
        </div>
        {!result ? (
          <>
            <div style={{ marginBottom:".8rem" }}>
              <label style={{ display:"block", fontFamily:"'Cinzel',serif", fontSize:".65rem", letterSpacing:".15em", color:"#e07a9c", marginBottom:".4rem" }}>FRIEND'S NAME</label>
              <input value={form.name} onChange={e => setForm({...form,name:e.target.value})} placeholder="Their name" style={inp} />
            </div>
            <div style={{ marginBottom:".8rem" }}>
              <label style={{ display:"block", fontFamily:"'Cinzel',serif", fontSize:".65rem", letterSpacing:".15em", color:"#e07a9c", marginBottom:".4rem" }}>THEIR DATE OF BIRTH</label>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1.5fr", gap:".5rem" }}>
                {[["day","DD"],["month","MM"],["year","YYYY"]].map(([f,ph]) => (
                  <input key={f} type="number" placeholder={ph} value={form[f]} onChange={e => setForm({...form,[f]:e.target.value})} style={inp} />
                ))}
              </div>
            </div>
            <div style={{ marginBottom:".8rem" }}>
              <label style={{ display:"block", fontFamily:"'Cinzel',serif", fontSize:".65rem", letterSpacing:".15em", color:"#e07a9c", marginBottom:".4rem" }}>THEIR TIME OF BIRTH</label>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:".5rem" }}>
                {[["hour","Hour (0-23)"],["minute","Minutes"]].map(([f,ph]) => (
                  <input key={f} type="number" placeholder={ph} value={form[f]} onChange={e => setForm({...form,[f]:e.target.value})} style={inp} />
                ))}
              </div>
            </div>
            <div style={{ marginBottom:"1.2rem" }}>
              <label style={{ display:"block", fontFamily:"'Cinzel',serif", fontSize:".65rem", letterSpacing:".15em", color:"#e07a9c", marginBottom:".4rem" }}>YOUR MESSAGE (optional)</label>
              <textarea value={form.message} onChange={e => setForm({...form,message:e.target.value})} placeholder="A message to include..." style={{ ...inp, minHeight:70, resize:"vertical", textAlign:"left" }} />
            </div>
            <div style={{ textAlign:"center", marginBottom:"1rem" }}>
              <div style={{ fontFamily:"'Cinzel',serif", fontSize:"2rem", fontWeight:700, color:"#e07a9c" }}>€1.99</div>
              <div style={{ color:"#6b5c7a", fontSize:".75rem" }}>A complete cosmic reading for your friend</div>
            </div>
            <button onClick={pay} style={{ width:"100%", padding:"1rem", background:"linear-gradient(135deg,#e07a9c,#9b3a5a)", border:"none", borderRadius:12, color:"white", fontFamily:"'Cinzel',serif", fontWeight:700, fontSize:"1rem", cursor:"pointer", letterSpacing:".1em" }}>💌 Generate the Cosmic Gift ✦</button>
            <p style={{ color:"#4a3a5a", fontSize:".72rem", textAlign:"center", marginTop:".6rem" }}>🔒 Secure payment via Stripe</p>
          </>
        ) : (
          <div>
            <div style={{ textAlign:"center", padding:"1rem", background:"rgba(224,122,156,0.08)", borderRadius:12, border:"1px solid rgba(224,122,156,0.2)", marginBottom:"1rem" }}>
              <div style={{ fontSize:"1.5rem" }}>{ZODIAC.find(z => z.name === result.sign)?.sym}</div>
              <div style={{ color:"#c9a84c", fontFamily:"'Cinzel',serif", fontWeight:700 }}>{result.friendName} is a {result.sign}</div>
              <div style={{ color:"#6b5c7a", fontSize:".75rem" }}>Rising {result.ascendant}</div>
            </div>
            <div style={{ background:"rgba(0,0,0,0.3)", border:"1px solid rgba(201,150,58,0.1)", borderRadius:12, padding:"1rem", marginBottom:"1rem", maxHeight:180, overflowY:"auto" }}>
              <p style={{ color:"#c8b89a", fontSize:".8rem", lineHeight:1.7 }}>{result.essence}</p>
              <p style={{ color:"#c9a84c", fontSize:".8rem", fontStyle:"italic", marginTop:".4rem" }}>🏴‍☠️ {result.fruit}</p>
              <p style={{ color:"#9b72cf", fontSize:".8rem", fontStyle:"italic", marginTop:".3rem" }}>🔮 {result.destiny}</p>
              {result.friendMsg && <p style={{ color:"#e07a9c", fontSize:".8rem", fontStyle:"italic", marginTop:".3rem" }}>💌 "{result.friendMsg}"</p>}
            </div>
            <button onClick={copy} style={{ width:"100%", padding:"1rem", background: copied ? "linear-gradient(135deg,#3a7a3a,#2a5a2a)" : "linear-gradient(135deg,#e07a9c,#9b3a5a)", border:"none", borderRadius:12, color: copied ? "#90ff90" : "white", fontFamily:"'Cinzel',serif", fontWeight:700, fontSize:".9rem", cursor:"pointer" }}>
              {copied ? "✓ Copied! Send it to your friend 💌" : "📋 Copy the Cosmic Letter"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage]         = useState("home");
  const [selectedSign, setSelectedSign] = useState(null);
  const [form, setForm]         = useState({ day:"", month:"", year:"", hour:"", minute:"" });
  const [result, setResult]     = useState(null);
  const [loading, setLoading]   = useState(false);
  const [activeTab, setActiveTab] = useState("personality");
  const [partnerSign, setPartnerSign] = useState("");
  const [showAnnual, setShowAnnual] = useState(false);
  const [showGift, setShowGift] = useState(false);
  const [copied, setCopied]     = useState(false);
  const [oracleQ, setOracleQ]   = useState("");
  const [oracleA, setOracleA]   = useState("");
  const [oracleLoading, setOracleLoading] = useState(false);
  const [journalText, setJournalText] = useState("");
  const [journalEntries, setJournalEntries] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cosmic_journal") || "[]"); } catch { return []; }
  });

  const moon  = getMoonPhase();
  const tarot = getDailyTarot();

  const handleSignSelect = (name) => {
    setSelectedSign(name);
    const z = ZODIAC.find(z => z.name === name);
    if (!form.day) setForm(f => ({ ...f }));
  };

  const handleFormChange = (field, value) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    if ((field === "day" || field === "month") && updated.day && updated.month) {
      const d = parseInt(updated.day), m = parseInt(updated.month);
      if (d >= 1 && d <= 31 && m >= 1 && m <= 12) setSelectedSign(getSign(d, m));
    }
  };

  const reveal = () => {
    if (!form.day || !form.month || !form.year || !form.hour || form.minute === "") { alert("Please fill in all fields!"); return; }
    setLoading(true);
    setTimeout(() => {
      const sign = getSign(form.day, form.month);
      const p = PERS[sign];
      setResult({ ...p, sign, ascendant: getAscendant(form.hour) });
      setSelectedSign(sign);
      setLoading(false);
      setActiveTab("personality");
    }, 2200);
  };

  const copyReading = () => {
    if (!result) return;
    const compat = partnerSign ? COMPAT[result.sign]?.[partnerSign] : null;
    let text = `🔮 COSMIC ORACLE — My Cosmic Reading\n\n♾ Sign: ${result.sign} | Rising: ${result.ascendant}\n📅 Born ${form.day}/${form.month}/${form.year}\n\n🌟 Essence:\n${result.essence}\n\n⚡ Powers:\n${result.strengths.join(" • ")}\n\n🏴‍☠️ Devil Fruit: ${result.fruit}\n\n🔮 Destiny: ${result.destiny}`;
    if (compat) text += `\n\n💞 Compatibility with ${partnerSign}: ${compat[0]}% — ${compat[1]}`;
    text += "\n\n✦ cosmicoracleapp.com ✦";
    navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 3000); });
  };

  const askOracle = async () => {
    if (!oracleQ.trim()) return;
    setOracleLoading(true); setOracleA("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:500,
          messages:[{ role:"user", content:`You are Cosmic Oracle, a mystical poetic oracle. A seeker asks: "${oracleQ}". Reply in 2-3 mystical, profound, poetic sentences. Reference stars or cosmic forces.${result ? " The seeker is a "+result.sign+"." : ""}` }] })
      });
      const data = await res.json();
      setOracleA(data.content[0].text);
    } catch {
      setOracleA(ORACLE_FALLBACK[Math.floor(Math.random() * ORACLE_FALLBACK.length)]);
    }
    setOracleLoading(false);
  };

  const saveJournal = () => {
    if (!journalText.trim()) return;
    const entries = [{ date: formatDate(), text: journalText }, ...journalEntries].slice(0, 20);
    setJournalEntries(entries);
    localStorage.setItem("cosmic_journal", JSON.stringify(entries));
    setJournalText("");
  };

  const compat = result && partnerSign ? COMPAT[result.sign]?.[partnerSign] : null;
  const compatScore = compat ? compat[0] : null;
  const selectedZ = ZODIAC.find(z => z.name === selectedSign);
  const resultZ   = result ? ZODIAC.find(z => z.name === result.sign) : null;

  // ── STYLES ────────────────────────────────────────────────────────────────
  const S = {
    app: { minHeight:"100vh", background:"radial-gradient(ellipse at top,#0d0a1a 0%,#050308 55%,#0a0515 100%)", display:"flex", fontFamily:"Georgia,serif", color:"#e8e0f8", overflow:"hidden", position:"relative" },
    sidebar: { width:220, minWidth:220, height:"100vh", background:"rgba(4,1,15,0.96)", borderRight:"1px solid rgba(255,255,255,0.07)", display:"flex", flexDirection:"column", padding:"1.5rem 0", zIndex:10, backdropFilter:"blur(20px)" },
    logo: { padding:"0 1.5rem 1.2rem", borderBottom:"1px solid rgba(255,255,255,0.07)" },
    logoTitle: { fontFamily:"'Cinzel',serif", fontSize:".95rem", fontWeight:700, background:"linear-gradient(135deg,#c9963a,#f0c060)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", letterSpacing:".15em" },
    logoSub: { fontSize:".6rem", color:"#4a3a6a", letterSpacing:".12em", marginTop:".1rem" },
    navItem: (active) => ({ display:"flex", alignItems:"center", gap:".7rem", padding:".75rem 1.5rem", cursor:"pointer", color: active ? "#c9a84c" : "#8b7aa8", fontFamily:"'Cinzel',serif", fontSize:".78rem", letterSpacing:".08em", borderLeft: active ? "2px solid #c9a84c" : "2px solid transparent", background: active ? "rgba(201,150,58,0.07)" : "transparent", transition:"all .2s" }),
    main: { flex:1, height:"100vh", overflow:"hidden", display:"flex", flexDirection:"column" },
    topbar: { padding:".75rem 1.5rem", borderBottom:"1px solid rgba(255,255,255,0.06)", display:"flex", alignItems:"center", justifyContent:"space-between", background:"rgba(4,1,15,0.75)", backdropFilter:"blur(10px)", flexShrink:0 },
    content: { flex:1, display:"grid", gridTemplateColumns:"1fr 270px", overflow:"hidden" },
    center: { padding:"1.2rem", overflowY:"auto", display:"flex", flexDirection:"column", alignItems:"center" },
    rightPanel: { borderLeft:"1px solid rgba(201,150,58,0.18)", background:"rgba(8,2,28,0.88)", padding:"1.1rem", overflowY:"auto", display:"flex", flexDirection:"column", gap:".9rem" },
    rpCard: (border) => ({ background:"rgba(255,255,255,0.06)", border:`1px solid ${border||"rgba(201,150,58,0.22)"}`, borderRadius:14, padding:"1rem" }),
    rpTitle: (color) => ({ fontFamily:"'Cinzel',serif", fontSize:".7rem", letterSpacing:".15em", color:color||"#c9a84c", textTransform:"uppercase", marginBottom:".55rem" }),
    rpBody: { fontSize:".88rem", lineHeight:1.8, color:"#ddd0f0", fontStyle:"italic" },
    rpName: { fontFamily:"'Cinzel',serif", fontSize:"1.35rem", fontWeight:700, color:"#f0d080" },
    rpDates: { fontSize:".78rem", color:"#a897c8", marginTop:".1rem" },
    formPanel: { width:"100%", maxWidth:440, background:"rgba(255,255,255,0.03)", border:"1px solid rgba(201,150,58,0.28)", borderRadius:20, padding:"1.5rem", marginBottom:"1rem", boxShadow:"0 0 40px rgba(124,58,237,0.14)" },
    inp: { background:"rgba(255,255,255,0.05)", border:"1px solid rgba(201,150,58,0.25)", borderRadius:8, padding:".7rem", color:"#e8d5a3", fontSize:".9rem", fontFamily:"Georgia,serif", width:"100%", outline:"none", textAlign:"center" },
    lbl: { fontFamily:"'Cinzel',serif", fontSize:".65rem", letterSpacing:".15em", color:"#c9a84c", marginBottom:".4rem", display:"block" },
    revealBtn: { width:"100%", padding:".9rem", background:"linear-gradient(135deg,#c9963a,#8b6914)", border:"none", borderRadius:12, color:"#0d0a1a", fontFamily:"'Cinzel',serif", fontWeight:700, fontSize:".9rem", letterSpacing:".12em", cursor:"pointer", textTransform:"uppercase", boxShadow:"0 0 25px rgba(201,150,58,0.25)" },
    tab: (active) => ({ flex:1, padding:".55rem .3rem", border: active ? "1px solid rgba(201,150,58,0.4)" : "1px solid transparent", borderRadius:8, background: active ? "rgba(201,150,58,0.15)" : "transparent", color: active ? "#c9a84c" : "#6b5c7a", fontSize:".72rem", cursor:"pointer", fontFamily:"'Cinzel',serif", transition:"all .2s" }),
    pText: { fontSize:".88rem", lineHeight:1.8, color:"#c8b89a", margin:".2rem 0" },
    sectionTitle: { fontFamily:"'Cinzel',serif", color:"#c9a84c", fontSize:".82rem", fontWeight:700, marginBottom:".45rem", paddingBottom:".3rem", borderBottom:"1px solid rgba(201,150,58,0.12)" },
    dailyMsg: { background:"rgba(124,58,237,0.08)", border:"1px solid rgba(124,58,237,0.22)", borderRadius:12, padding:".85rem 1rem", marginBottom:"1rem", width:"100%", maxWidth:490 },
  };

  const greeting = (() => { const h = new Date().getHours(); return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening"; })();

  return (
    <div style={S.app}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none;}
        input::placeholder,textarea::placeholder{color:rgba(201,150,58,0.25);}
        select option{background:#0d0a1a;color:#e8d5a3;}
        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-thumb{background:rgba(201,150,58,0.3);border-radius:2px;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes twinkle{0%,100%{opacity:.15}50%{opacity:.9}}
        .fade-up{animation:fadeUp .35s ease;}
      `}</style>

      {/* Stars */}
      {Array.from({length:90},(_,i) => (
        <div key={i} style={{ position:"fixed", width:`${Math.random()*2+.3}px`, height:`${Math.random()*2+.3}px`, background:"white", borderRadius:"50%", top:`${Math.random()*100}%`, left:`${Math.random()*100}%`, opacity:Math.random()*.6+.1, animation:`twinkle ${2+Math.random()*4}s ${Math.random()*4}s infinite ease-in-out`, pointerEvents:"none", zIndex:0 }} />
      ))}
      <div style={{ position:"fixed", width:600, height:600, top:-100, left:"20%", background:"radial-gradient(circle,rgba(80,20,180,0.18) 0%,transparent 70%)", borderRadius:"50%", pointerEvents:"none", zIndex:0 }} />

      {/* Modals */}
      {showAnnual && <AnnualModal sign={result?.sign || selectedSign || "Aries"} onClose={() => setShowAnnual(false)} />}
      {showGift   && <GiftModal onClose={() => setShowGift(false)} />}

      {/* Loading */}
      {loading && (
        <div style={{ position:"fixed", inset:0, background:"rgba(4,1,15,0.95)", zIndex:100, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
          <div style={{ fontSize:"4rem", animation:"spin 3s linear infinite" }}>🔮</div>
          <p style={{ fontFamily:"'Cinzel',serif", color:"#c9a84c", marginTop:"1rem", letterSpacing:".1em" }}>The stars are speaking...</p>
          <p style={{ color:"#6b5c7a", fontStyle:"italic", marginTop:".3rem", fontSize:".85rem" }}>The oracle is reading your soul</p>
        </div>
      )}

      {/* SIDEBAR */}
      <div style={S.sidebar}>
        <div style={S.logo}>
          <div style={{ fontSize:"1.5rem", marginBottom:".3rem" }}>🌙</div>
          <div style={S.logoTitle}>COSMIC ORACLE</div>
          <div style={S.logoSub}>UNVEIL YOUR DESTINY</div>
        </div>
        <nav style={{ flex:1, padding:"1rem 0" }}>
          {[["home","🏠","Home"],["today","☀️","Today"],["oracle","🔮","Ask Oracle"],["journal","📓","Journal"]].map(([id,icon,label]) => (
            <div key={id} style={S.navItem(page===id)} onClick={() => setPage(id)}>
              <span style={{ fontSize:"1rem", width:20, textAlign:"center" }}>{icon}</span>
              <span>{label}</span>
            </div>
          ))}
        </nav>
        <div style={{ padding:"1rem 1.5rem", borderTop:"1px solid rgba(255,255,255,0.07)" }}>
          <button onClick={() => setShowGift(true)} style={{ display:"block", width:"100%", padding:".65rem", marginBottom:".4rem", border:"1px solid rgba(224,122,156,0.4)", borderRadius:10, background:"rgba(224,122,156,0.08)", color:"#e07a9c", fontFamily:"'Cinzel',serif", fontSize:".68rem", letterSpacing:".06em", cursor:"pointer", textAlign:"center" }}>💌 Gift a Reading — €1.99</button>
          <button onClick={() => setShowAnnual(true)} style={{ display:"block", width:"100%", padding:".65rem", border:"1px solid rgba(201,150,58,0.35)", borderRadius:10, background:"rgba(201,150,58,0.07)", color:"#c9a84c", fontFamily:"'Cinzel',serif", fontSize:".68rem", letterSpacing:".06em", cursor:"pointer", textAlign:"center" }}>🔮 Annual Destiny — €2.99</button>
        </div>
      </div>

      {/* MAIN */}
      <div style={S.main}>
        {/* TOPBAR */}
        <div style={S.topbar}>
          <div style={{ fontFamily:"'Cinzel',serif", fontSize:".78rem", color:"#8b7aa8" }}>✦ {greeting}, <span style={{ color:"#c9a84c" }}>cosmic soul</span></div>
          <div style={{ fontSize:".75rem", color:"#6b5c7a", fontStyle:"italic" }}>{formatDate()}</div>
        </div>

        <div style={S.content}>
          {/* CENTER */}
          <div style={S.center}>

            {/* HOME */}
            {page === "home" && (
              <>
                {/* Wheel */}
                <div style={{ width:"min(460px,100%)", aspectRatio:"1", margin:"0 auto .8rem", flexShrink:0 }}>
                  <ZodiacWheel selectedSign={selectedSign} onSelect={handleSignSelect} />
                </div>
                <p style={{ fontSize:".72rem", color:"#6b5c7a", marginBottom:".8rem", fontStyle:"italic" }}>Click a sign to explore · Enter your birth data below</p>

                {!result ? (
                  <div style={{ ...S.formPanel, width:"100%", maxWidth:440 }}>
                    <p style={{ fontFamily:"'Cinzel',serif", fontSize:".72rem", letterSpacing:".18em", color:"#c9a84c", textAlign:"center", marginBottom:"1.1rem" }}>ENTER YOUR COSMIC DATA</p>
                    <div style={{ marginBottom:"1rem" }}>
                      <label style={S.lbl}>DATE OF BIRTH</label>
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1.5fr", gap:".5rem" }}>
                        {[["day","DD"],["month","MM"],["year","YYYY"]].map(([f,ph]) => (
                          <input key={f} type="number" placeholder={ph} value={form[f]} onChange={e => handleFormChange(f, e.target.value)} style={S.inp} />
                        ))}
                      </div>
                    </div>
                    <div style={{ marginBottom:"1rem" }}>
                      <label style={S.lbl}>TIME OF BIRTH</label>
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:".5rem" }}>
                        {[["hour","Hour (0-23)"],["minute","Minutes"]].map(([f,ph]) => (
                          <input key={f} type="number" placeholder={ph} value={form[f]} onChange={e => handleFormChange(f, e.target.value)} style={S.inp} />
                        ))}
                      </div>
                    </div>
                    {selectedZ && (
                      <div style={{ background:"rgba(124,58,237,0.1)", border:"1px solid rgba(124,58,237,0.28)", borderRadius:10, padding:".65rem 1rem", textAlign:"center", marginBottom:".9rem" }}>
                        <span style={{ fontSize:"1.4rem" }}>{selectedZ.sym}</span>
                        <span style={{ fontFamily:"'Cinzel',serif", color:"#c9a84c", fontWeight:700, marginLeft:".4rem" }}>{selectedZ.name}</span>
                        <span style={{ fontSize:".75rem", color:"#8b7aa8", marginLeft:".4rem" }}>· {selectedZ.el}</span>
                      </div>
                    )}
                    <button style={S.revealBtn} onClick={reveal}>✦ Reveal My Destiny ✦</button>
                    {/* Daily quote */}
                    <div style={{ marginTop:"1.2rem", borderTop:"1px solid rgba(201,150,58,0.1)", paddingTop:"1rem", textAlign:"center" }}>
                      <div style={{ fontFamily:"'Cinzel',serif", fontSize:".6rem", letterSpacing:".15em", color:"#6b5c7a", marginBottom:".4rem" }}>✦ COSMIC MESSAGE TODAY ✦</div>
                      <p style={{ color:"#8a7a9b", fontStyle:"italic", fontSize:".82rem", lineHeight:1.7 }}>"{getCosmicQuote()}"</p>
                    </div>
                  </div>
                ) : (
                  <div style={{ width:"100%", maxWidth:490 }} className="fade-up">
                    {/* Result header */}
                    <div style={{ textAlign:"center", marginBottom:"1.1rem" }}>
                      <div style={{ fontSize:"2.8rem" }}>{resultZ?.sym}</div>
                      <div style={{ fontFamily:"'Cinzel',serif", fontSize:"1.5rem", fontWeight:900, color:"#c9a84c" }}>{result.sign}</div>
                      <div style={{ fontSize:".78rem", color:"#8b7aa8", marginTop:".2rem" }}>Rising {result.ascendant} · Born {form.day}/{form.month}/{form.year} at {form.hour}:{String(form.minute).padStart(2,"0")}</div>
                    </div>

                    {/* Daily msg */}
                    <div style={S.dailyMsg}>
                      <div style={{ fontFamily:"'Cinzel',serif", fontSize:".6rem", letterSpacing:".14em", color:"#9b72cf", marginBottom:".35rem" }}>✦ YOUR COSMIC MESSAGE TODAY ✦</div>
                      <p style={{ color:"#c8b89a", fontStyle:"italic", fontSize:".84rem", lineHeight:1.7 }}>"{getDailyQuote(result.sign)}"</p>
                    </div>

                    {/* Annual CTA */}
                    <div onClick={() => setShowAnnual(true)} style={{ background:"rgba(201,150,58,0.07)", border:"1px solid rgba(201,150,58,0.22)", borderRadius:12, padding:".75rem 1rem", marginBottom:"1rem", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                      <div>
                        <div style={{ fontFamily:"'Cinzel',serif", fontSize:".78rem", color:"#c9a84c" }}>🔮 Your 2026 Annual Destiny</div>
                        <div style={{ fontSize:".7rem", color:"#6b5c7a" }}>Quarter by quarter cosmic forecast</div>
                      </div>
                      <div style={{ fontFamily:"'Cinzel',serif", fontSize:".88rem", fontWeight:700, color:"#c9a84c" }}>€2.99 →</div>
                    </div>

                    {/* Tabs */}
                    <div style={{ display:"flex", gap:".4rem", marginBottom:"1.1rem", background:"rgba(0,0,0,0.25)", borderRadius:10, padding:".25rem" }}>
                      {[["personality","🌟 Personality"],["compatibility","💞 Compat"],["share","📤 Share"]].map(([id,label]) => (
                        <button key={id} style={S.tab(activeTab===id)} onClick={() => setActiveTab(id)}>{label}</button>
                      ))}
                    </div>

                    {/* PERSONALITY */}
                    {activeTab === "personality" && (
                      <div className="fade-up">
                        {[["🌟 COSMIC ESSENCE", <p style={S.pText}>{result.essence}</p>],
                          ["⚡ HIDDEN POWERS", result.strengths.map((s,i) => <p key={i} style={S.pText}>• {s}</p>)],
                          ["🌑 SHADOWS OF THE SOUL", result.shadows.map((s,i) => <p key={i} style={S.pText}>• {s}</p>)],
                          ["❤️ LOVE & RELATIONSHIPS", <p style={S.pText}>{result.love}</p>],
                          ["🏴‍☠️ YOUR DEVIL FRUIT", <p style={S.pText}>{result.fruit}</p>],
                          ["🔮 DESTINY", <p style={{ ...S.pText, fontStyle:"italic", color:"#c9a84c" }}>{result.destiny}</p>],
                        ].map(([title, content]) => (
                          <div key={title} style={{ marginBottom:"1rem" }}>
                            <div style={S.sectionTitle}>{title}</div>
                            {content}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* COMPATIBILITY */}
                    {activeTab === "compatibility" && (
                      <div className="fade-up">
                        <p style={{ color:"#6b5c7a", fontStyle:"italic", textAlign:"center", marginBottom:"1rem", fontSize:".85rem" }}>Choose your partner's sign</p>
                        <select value={partnerSign} onChange={e => setPartnerSign(e.target.value)} style={{ ...S.inp, marginBottom:"1rem", cursor:"pointer" }}>
                          <option value="">— Select sign —</option>
                          {ZODIAC.map(z => <option key={z.name} value={z.name}>{z.sym} {z.name}</option>)}
                        </select>
                        {compat && (
                          <div className="fade-up">
                            <div style={{ textAlign:"center", marginBottom:"1rem" }}>
                              <div style={{ fontSize:"2rem" }}>{resultZ?.sym} 💞 {ZODIAC.find(z=>z.name===partnerSign)?.sym}</div>
                              <div style={{ fontFamily:"'Cinzel',serif", color:"#c9a84c", fontSize:"1rem", margin:".4rem 0" }}>{result.sign} & {partnerSign}</div>
                              <div style={{ fontFamily:"'Cinzel',serif", fontSize:"2.5rem", fontWeight:900, color: compatScore>=80?"#c9a84c":compatScore>=60?"#8b9f5e":"#8b4a4a" }}>{compatScore}%</div>
                              <div style={{ fontSize:".8rem", color:"#8a7a9b" }}>{compatScore>=85?"Soulmate 💫":compatScore>=70?"Great chemistry 🌟":compatScore>=55?"Good match ✨":compatScore>=40?"Stimulating challenge ⚡":"Extreme opposites 🔥"}</div>
                              <ScoreBar score={compatScore} />
                            </div>
                            <div style={{ background:"rgba(201,150,58,0.05)", border:"1px solid rgba(201,150,58,0.15)", borderRadius:12, padding:"1rem" }}>
                              <p style={{ fontSize:".85rem", lineHeight:1.7, color:"#c8b89a", fontStyle:"italic", textAlign:"center" }}>{compat[1]}</p>
                            </div>
                          </div>
                        )}
                        {!partnerSign && <div style={{ textAlign:"center", padding:"2rem", color:"#4a3a5a" }}><div style={{ fontSize:"2rem" }}>💫</div><p style={{ fontStyle:"italic", fontSize:".85rem" }}>Select a sign to discover your cosmic compatibility</p></div>}
                      </div>
                    )}

                    {/* SHARE */}
                    {activeTab === "share" && (
                      <div className="fade-up" style={{ textAlign:"center" }}>
                        <div style={{ fontSize:"2.5rem", marginBottom:"1rem" }}>📤</div>
                        <div style={{ background:"rgba(0,0,0,0.3)", border:"1px solid rgba(201,150,58,0.12)", borderRadius:12, padding:"1rem", marginBottom:"1rem", textAlign:"left" }}>
                          <p style={{ fontFamily:"'Cinzel',serif", fontSize:".72rem", color:"#c9a84c", marginBottom:".4rem" }}>Preview:</p>
                          <p style={{ fontSize:".78rem", color:"#6b5c7a", lineHeight:1.6 }}>🔮 COSMIC ORACLE — {result.sign} | Rising {result.ascendant}<br/>🌟 {result.essence.substring(0,80)}...<br/>🏴‍☠️ {result.fruit.substring(0,60)}...</p>
                        </div>
                        <button onClick={copyReading} style={{ width:"100%", padding:".85rem", background: copied?"linear-gradient(135deg,#3a7a3a,#2a5a2a)":"linear-gradient(135deg,#c9a84c,#8b6914)", border:"none", borderRadius:12, color: copied?"#90ff90":"#0d0a1a", fontFamily:"'Cinzel',serif", fontWeight:700, fontSize:".9rem", cursor:"pointer", letterSpacing:".08em", marginBottom:".5rem" }}>
                          {copied ? "✓ Copied to clipboard!" : "📋 Copy Cosmic Reading"}
                        </button>
                        <button onClick={() => setShowGift(true)} style={{ width:"100%", padding:".85rem", background:"rgba(224,122,156,0.1)", border:"1px solid rgba(224,122,156,0.35)", borderRadius:12, color:"#e07a9c", fontFamily:"'Cinzel',serif", fontWeight:700, fontSize:".9rem", cursor:"pointer", letterSpacing:".08em" }}>💌 Gift a Reading — €1.99</button>
                      </div>
                    )}

                    <button onClick={() => { setResult(null); setActiveTab("personality"); setPartnerSign(""); }} style={{ width:"100%", padding:".7rem", marginTop:"1.2rem", background:"transparent", border:"1px solid rgba(201,150,58,0.18)", borderRadius:10, color:"#6b5c7a", fontFamily:"'Cinzel',serif", fontSize:".75rem", letterSpacing:".1em", cursor:"pointer" }}>
                      ✦ New Reading ✦
                    </button>
                  </div>
                )}
              </>
            )}

            {/* TODAY */}
            {page === "today" && (
              <div style={{ width:"100%", maxWidth:480 }} className="fade-up">
                <h2 style={{ fontFamily:"'Cinzel',serif", color:"#c9a84c", fontSize:"1.1rem", textAlign:"center", marginBottom:".3rem" }}>Today's Cosmic Energy</h2>
                <p style={{ fontSize:".75rem", color:"#6b5c7a", textAlign:"center", marginBottom:"1.2rem", fontStyle:"italic" }}>{formatDate()}</p>
                <div style={{ background:"rgba(124,58,237,0.07)", border:"1px solid rgba(124,58,237,0.2)", borderRadius:12, padding:"1rem", marginBottom:"1rem", textAlign:"center" }}>
                  <div style={{ fontFamily:"'Cinzel',serif", fontSize:".6rem", letterSpacing:".14em", color:"#9b72cf", marginBottom:".35rem" }}>✦ UNIVERSAL MESSAGE ✦</div>
                  <p style={{ color:"#a897c8", fontStyle:"italic", fontSize:".84rem", lineHeight:1.7 }}>"{getCosmicQuote()}"</p>
                </div>
                {[
                  { emoji:moon.emoji, label:"🌙 MOON PHASE TODAY", name:moon.name, energy:moon.energy, meaning:moon.meaning },
                  { emoji:tarot.emoji, label:"🎴 TAROT CARD OF THE DAY", name:`${tarot.number} — ${tarot.name}`, energy:tarot.energy, meaning:tarot.meaning }
                ].map((card, i) => (
                  <div key={i} style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(201,150,58,0.2)", borderRadius:14, padding:"1.2rem", marginBottom:"1rem", textAlign:"center" }}>
                    <div style={{ fontSize:"2.8rem", marginBottom:".4rem" }}>{card.emoji}</div>
                    <div style={{ fontFamily:"'Cinzel',serif", fontSize:".65rem", letterSpacing:".14em", color:"#8b7aa8", marginBottom:".4rem" }}>{card.label}</div>
                    <div style={{ fontFamily:"'Cinzel',serif", fontSize:"1rem", color:"#f0d080", fontWeight:700 }}>{card.name}</div>
                    <div style={{ fontSize:".7rem", letterSpacing:".1em", color:"#8b7aa8", textTransform:"uppercase", margin:".3rem 0" }}>Energy: {card.energy}</div>
                    <p style={{ color:"#c8b89a", fontStyle:"italic", fontSize:".83rem", lineHeight:1.7 }}>{card.meaning}</p>
                  </div>
                ))}
              </div>
            )}

            {/* ORACLE */}
            {page === "oracle" && (
              <div style={{ width:"100%", maxWidth:480 }} className="fade-up">
                <h2 style={{ fontFamily:"'Cinzel',serif", color:"#c9a84c", fontSize:"1.1rem", textAlign:"center", marginBottom:".3rem" }}>Ask the Oracle</h2>
                <p style={{ fontSize:".75rem", color:"#6b5c7a", textAlign:"center", marginBottom:"1.2rem", fontStyle:"italic" }}>The cosmos answers what the heart dares to ask</p>
                <textarea value={oracleQ} onChange={e => setOracleQ(e.target.value)} placeholder="Ask the Oracle anything about your destiny, love, career, or soul path..." style={{ width:"100%", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(201,150,58,0.25)", borderRadius:12, padding:".9rem", color:"#e8d5a3", fontSize:".9rem", fontFamily:"Georgia,serif", resize:"vertical", minHeight:100, outline:"none", marginBottom:"1rem" }} />
                <button onClick={askOracle} disabled={oracleLoading} style={{ width:"100%", padding:".85rem", background:"linear-gradient(135deg,#7c3aed,#5b21b6)", border:"none", borderRadius:12, color:"#f0c060", fontFamily:"'Cinzel',serif", fontWeight:700, fontSize:".9rem", cursor:"pointer", letterSpacing:".1em" }}>
                  {oracleLoading ? "✦ The oracle is speaking... ✦" : "✦ Ask the Oracle ✦"}
                </button>
                {oracleA && (
                  <div style={{ background:"rgba(124,58,237,0.08)", border:"1px solid rgba(124,58,237,0.25)", borderRadius:14, padding:"1.2rem", marginTop:"1rem" }} className="fade-up">
                    <div style={{ fontFamily:"'Cinzel',serif", color:"#a78bfa", fontSize:".72rem", letterSpacing:".14em", marginBottom:".6rem" }}>✦ THE ORACLE SPEAKS ✦</div>
                    <p style={{ fontSize:".88rem", lineHeight:1.8, color:"#c8b89a", fontStyle:"italic" }}>{oracleA}</p>
                  </div>
                )}
              </div>
            )}

            {/* JOURNAL */}
            {page === "journal" && (
              <div style={{ width:"100%", maxWidth:480 }} className="fade-up">
                <h2 style={{ fontFamily:"'Cinzel',serif", color:"#c9a84c", fontSize:"1.1rem", textAlign:"center", marginBottom:".3rem" }}>Cosmic Journal</h2>
                <p style={{ fontSize:".75rem", color:"#6b5c7a", textAlign:"center", marginBottom:"1.2rem", fontStyle:"italic" }}>Record your cosmic reflections</p>
                <textarea value={journalText} onChange={e => setJournalText(e.target.value)} placeholder="Write your cosmic thoughts, dreams, or reflections for today..." style={{ width:"100%", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(201,150,58,0.25)", borderRadius:12, padding:".9rem", color:"#e8d5a3", fontSize:".88rem", fontFamily:"Georgia,serif", resize:"vertical", minHeight:130, outline:"none", marginBottom:".7rem" }} />
                <button onClick={saveJournal} style={{ width:"100%", padding:".75rem", background:"rgba(201,150,58,0.08)", border:"1px solid rgba(201,150,58,0.3)", borderRadius:10, color:"#c9a84c", fontFamily:"'Cinzel',serif", fontSize:".8rem", letterSpacing:".1em", cursor:"pointer", marginBottom:"1rem" }}>✦ Save Entry ✦</button>
                <div>
                  {journalEntries.map((e, i) => (
                    <div key={i} style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:10, padding:".8rem", marginBottom:".6rem" }}>
                      <div style={{ fontFamily:"'Cinzel',serif", fontSize:".68rem", color:"#6b5c7a", marginBottom:".4rem" }}>✦ {e.date}</div>
                      <p style={{ fontSize:".82rem", color:"#a897c8", lineHeight:1.6 }}>{e.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>{/* end center */}

          {/* RIGHT PANEL */}
          <div style={S.rightPanel}>
            <div style={S.rpCard()}>
              <div style={S.rpTitle()}>Your Sign</div>
              {selectedZ ? (
                <>
                  <div style={{ fontSize:"1.8rem", float:"right", color:selectedZ.color }}>{selectedZ.sym}</div>
                  <div style={S.rpName}>{selectedZ.name}</div>
                  <div style={S.rpDates}>{selectedZ.dates} · {selectedZ.el}</div>
                </>
              ) : (
                <>
                  <div style={{ fontSize:"1.8rem", float:"right", color:"#4a3a6a" }}>✦</div>
                  <div style={{ ...S.rpName, color:"#4a3a6a" }}>—</div>
                  <div style={S.rpDates}>Select your sign on the wheel</div>
                </>
              )}
            </div>
            <div style={S.rpCard()}>
              <div style={S.rpTitle()}>Today's Energy</div>
              <p style={S.rpBody}>{selectedSign ? getDailyQuote(selectedSign) : "The universe is aligning its forces for you today."}</p>
            </div>
            <div style={S.rpCard()}>
              <div style={S.rpTitle()}>Cosmic Tip</div>
              <p style={S.rpBody}>{selectedSign && PERS[selectedSign] ? PERS[selectedSign].destiny : "Trust the path that appears — even when you cannot see where it leads."}</p>
            </div>
            <div style={{ ...S.rpCard("rgba(201,150,58,0.32)"), background:"rgba(201,150,58,0.07)", cursor:"pointer" }} onClick={() => setShowAnnual(true)}>
              <div style={S.rpTitle()}>🔮 2026 Annual Destiny</div>
              <p style={{ ...S.rpBody, color:"#e8d5a3" }}>Unlock your complete quarter-by-quarter cosmic forecast for 2026.</p>
              <div style={{ color:"#f0c060", fontFamily:"'Cinzel',serif", fontSize:".88rem", fontWeight:700, marginTop:".5rem" }}>€2.99 — Unlock →</div>
            </div>
            <div style={{ ...S.rpCard("rgba(224,122,156,0.32)"), background:"rgba(224,122,156,0.07)", cursor:"pointer" }} onClick={() => setShowGift(true)}>
              <div style={S.rpTitle("#e07a9c")}>💌 Gift a Reading</div>
              <p style={{ ...S.rpBody, color:"#f0d0e0" }}>Send a personalized cosmic reading to someone you love.</p>
              <div style={{ color:"#f090b8", fontFamily:"'Cinzel',serif", fontSize:".88rem", fontWeight:700, marginTop:".5rem" }}>€1.99 — Gift →</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

    
