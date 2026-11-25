/**
 * Approved copy from "nanditaspeaks.in: Page Copy for Developer" (Version 1), word for word.
 * These are the fallbacks used until the team edits the matching fields in the admin.
 * Inline formatting: *Silent Screams* = italic, [label](/path/) = link.
 * Empty strings mean the client has not supplied the text yet; the section or line stays hidden.
 */

export type QA = { q: string; a: string }
export type Theme = { title: string; text: string }

export const SITE = {
  name: 'Nandita Speaks',
  person: 'Nandita Thakur',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://nanditaspeaks.in').replace(/\/$/, ''),
  cta: 'Invite Nandita to Speak',
  footerLine: 'Nandita Thakur speaks to women about rebuilding self-belief after life’s setbacks.',
}

export const CTA_LINE = 'Planning an event for women, or a session for your team? Tell me the date, the audience and what you have in mind.'

export const HOME = {
  seo: {
    title: 'Nandita Thakur | Motivational Speaker for Women',
    description:
      'Nandita Thakur speaks to women about rebuilding self-belief after life’s setbacks. Women-focused keynotes and motivational talks. Invite her to speak.',
  },
  h1: 'Nandita Thakur: Motivational Speaker for Women',
  displayLine: 'Life after a setback can still be your own.',
  intro:
    'I speak to women about believing in themselves again and finding a next step when life has not gone to plan. I am also an entrepreneur and the author of *Silent Screams*.',
  supportLine: 'Women-focused keynotes and motivational talks',
  whyHeading: 'Why I speak to women about self-belief',
  whyParagraphs: [
    'I married young, became a mother early and did not finish college. When I realised my marriage might not work, I started working towards earning my own money. That gave me choices I would not otherwise have had.',
    'I have had to rebuild more than once. I separated after 18 years of marriage. Both my parents had cancer at the same time and I looked after them. My father died while my mother was in treatment. I also had cancer myself. I know what it is like to look at your life and ask, “What do I do now?” That question is why I speak. You can read the full story on [my About page](/about/).',
  ],
  audiencesHeading: 'Who can invite me to speak',
  audiences: [
    {
      heading: 'Women’s communities and events',
      text: 'Talks for women’s groups, associations and events, for audiences who want to hear an honest story and take something away to think about.',
      linkLabel: 'Talks for women’s events',
      href: '/speaking/#women',
    },
    {
      heading: 'Companies and teams',
      text: 'Sessions for teams and middle managers on rebuilding self-belief and keeping a life of your own outside work.',
      linkLabel: 'Sessions for companies and teams',
      href: '/speaking/#companies',
    },
  ],
  themesHeading: 'What I speak about',
  themes: [
    { title: 'Believing in yourself again', text: 'Confidence can drop after one hard event or fade slowly over years. I talk about how self-belief goes missing and what a first step back can look like.' },
    { title: 'Having an identity of your own', text: 'Family and work take most of the day. I talk about keeping a few interests that belong only to you.' },
    { title: 'Building independence', text: 'Earning my own money gave me the freedom to make my own decisions. I share what that looked like for me.' },
    { title: 'Living through uncertainty', text: 'Caring for my parents, my own cancer, starting over when plans changed. I talk about what that felt like and the practical things I did next.' },
    { title: 'Finding enjoyment again', text: 'Singing helped me through treatment. I talk about making room for music, laughter and ordinary pleasures when life is hard.' },
  ] as Theme[],
  storyHeading: 'I kept singing through chemotherapy',
  storyParagraphs: [
    'When I was diagnosed I was living alone. The first thing I did was call my insurance agent to find out what my policy covered, and I began arranging my treatment before I told my family. That is how I cope: when something goes wrong, I start doing what needs to be done. Other people cope in other ways, and that is fine.',
    'I carried on with my online music classes and kept singing through chemotherapy. Singing gave my days something that had nothing to do with being a patient.',
  ],
  storyExtraLine: '', // [ADD: one short, light line in Nandita's own words]
  storyVideoUrl: '', // permitted music video (YouTube/Vimeo link)
  spokenHeading: 'Where I have spoken',
  spokenIntro: 'I have spoken at sessions for cancer patients.',
  spokenItems: [] as string[], // verified organisation names / audiences, added later
  bookHeading: 'My book, *Silent Screams*',
  bookText:
    'I wrote *Silent Screams* to put difficult experiences into words and to find some closure. Writing it is part of why I can speak openly about hard experiences today.',
  bookLinkLabel: 'About the book *Silent Screams*',
  blogHeading: 'From the blog',
  faqHeading: 'Questions organisers ask',
  faqs: [
    { q: 'Who is Nandita Thakur?', a: 'Nandita Thakur is a motivational speaker for women, an entrepreneur and the author of Silent Screams. She gives keynotes and motivational talks about rebuilding belief in yourself after life’s setbacks, drawing on her own experience of ending a long marriage, caring for her parents through cancer and being diagnosed with cancer herself.' },
    { q: 'What does Nandita speak about?', a: 'She speaks on five themes: believing in yourself again, having an identity of your own, building independence, living through uncertainty and finding enjoyment again. Each comes from her own experience, told honestly, with questions the audience can take away.' },
    { q: 'Who can invite Nandita to speak?', a: 'Women’s communities, associations, event teams and people organising events for women inside companies. She also speaks to teams and middle managers about self-belief and keeping a life of your own outside work.' },
    { q: 'What will the audience take away?', a: 'A few questions to think about, such as which decision they could start making for themselves and what next step feels manageable. Nandita shares her own experience. She is not a therapist or a financial adviser, and her talks do not promise a particular result.' },
    { q: 'How do I invite Nandita to speak?', a: 'Send an enquiry through the contact form with the date or approximate timing, the audience and its size, whether the event is in person or online, and what you have in mind. You do not need to book a call first.' },
  ] as QA[],
  ctaHeading: 'Invite Nandita to speak',
  ctaLine: CTA_LINE,
}

export const SPEAKING = {
  seo: {
    title: 'Speaker for Women’s Events | Keynotes by Nandita Thakur',
    description:
      'Invite Nandita Thakur to speak at your women’s event or company session. Talks on rebuilding self-belief, independence and finding enjoyment again.',
  },
  h1: 'Keynotes and Talks for Women’s Events',
  intro:
    'I speak at women’s events, community gatherings and company sessions about rebuilding self-belief after life’s setbacks. My talks come from my own experience, told honestly, with a few questions for the audience to take home.',
  whoHeading: 'Who I speak to',
  womenHeading: 'For women’s communities and events',
  womenParagraphs: [
    'I speak at International Women’s Day sessions, women’s network meetings, association and community gatherings, and conferences for women.',
    'Some of the women in the room will have been through a major setback. Others will have spent years meeting everyone else’s expectations and slowly lost confidence in themselves. My life will not match every woman’s, and I do not tell anyone what to decide. I share what happened to me and ask questions.',
  ],
  womenEventTypesConfirmed: false, // [CONFIRM: event types with Nandita]
  companiesHeading: 'For companies and teams',
  companiesParagraphs: [
    'I also speak to teams and middle managers about rebuilding self-belief after a setback, making your own decisions and keeping a life of your own outside work. The audience can be women only or a mixed group. These are talks that start a conversation. I do not run a leadership programme.',
  ],
  themesHeading: 'What I speak about',
  themes: [
    { title: 'Believing in yourself again', text: 'Confidence can drop after a major setback, or fade slowly over years of putting other people first. I talk about how that happens and what a first step back can look like.' },
    { title: 'Having an identity of your own', text: 'Family and work can take over every hour of the day. I talk about keeping a few interests that belong only to you, and why they matter.' },
    { title: 'Building independence', text: 'Earning my own money gave me the freedom to make my own decisions. I share what that was like for me. It is my own experience and not financial advice.' },
    { title: 'Living through uncertainty', text: 'I looked after both my parents through cancer and then had cancer myself. I talk about what it is like when plans change and what I did next.' },
    { title: 'Finding enjoyment again', text: 'I kept singing through chemotherapy. I talk about making room for music, laughter and ordinary pleasures even when life is hard.' },
  ] as Theme[],
  talksHeading: 'Talk ideas for your event',
  talksIntro: 'Each talk can be a keynote or a shorter session.',
  talksApproved: false, // "Do not publish them until she approves."
  talks: [
    {
      title: 'What Do I Do With My Life Now?',
      description:
        'Many women reach a point where they are no longer sure what they want or what they can do. It can come after a major setback or after years of meeting everyone else’s expectations. In this talk I share how I had to rebuild parts of my own life more than once, and what I did next.',
      questions: ['What has happened to my belief in myself?', 'What is one decision I can begin making for myself?', 'What is a next step that feels manageable?'],
    },
    {
      title: 'Silent Screams: The Courage to Reclaim Your Life',
      description:
        'This talk draws on the themes of my book, *Silent Screams*: independence, having an identity of your own and making your own decisions. I talk about earning my own money, what that changed for me and why I value a life of my own alongside family responsibilities.',
      questions: ['What would help me feel more independent?', 'Which interest have I stopped making time for?'],
    },
    {
      title: 'Still Singing: Keeping Something of Your Own When Life Gets Hard',
      description:
        'I carried on with my music classes and kept singing through chemotherapy. This talk uses that experience to talk about living through uncertainty, keeping a little room for what you enjoy and finding something to laugh about when things go wrong.',
      questions: ['What is only mine, and how could I make room for it in a hard stretch?', 'People cope in different ways, so what works for me?'],
    },
  ],
  talksOutro: 'Any of these can be shaped to your audience and event. Tell me what you have in mind and we can talk it through.',
  sessionHeading: 'Session details',
  sessionLength: '',
  sessionFormat: '',
  sessionLanguages: '',
  sessionBaseTravel: '',
  sessionQuestions: '',
  bioHeading: 'Bio for your event programme',
  bioIntro: 'Please use this short bio in your programme or event listing.',
  bioApproved: false, // "Nandita should approve the bio wording before it goes live."
  bioPhotosUrl: '', // [ADD: link to download high-resolution photos]
  bio: 'Nandita Thakur is a motivational speaker for women, an entrepreneur and the author of Silent Screams. She speaks about rebuilding belief in yourself after life’s setbacks, drawing on her own experience of building a working life of her own, caring for her parents through cancer and keeping up her music while she was in treatment herself.',
  spokenHeading: 'Where I have spoken',
  spokenIntro: 'I have spoken at sessions for cancer patients.',
  spokenItems: [] as string[],
  faqHeading: 'Questions organisers ask',
  faqs: [
    { q: 'What does Nandita speak about at women’s events?', a: 'She speaks about rebuilding belief in yourself after life’s setbacks, and about having an identity of your own, building independence, living through uncertainty and finding enjoyment again. She talks from her own experience and leaves the audience with a few questions to think about.' },
    { q: 'Does Nandita speak at company events?', a: 'Yes. She speaks at events organised for women inside companies, and to teams and middle managers about self-belief and keeping a life of your own outside work. The audience can be women only or a mixed group.' },
    { q: 'What will the audience take away?', a: 'A few questions to think about, such as which decision they could start making for themselves and what next step feels manageable. Nandita shares her own experience. She is not a therapist or a financial adviser, and her talks do not promise a particular result.' },
    { q: 'What should I include in my enquiry?', a: 'The date or approximate timing, the audience and its size, the location or whether it is online, and what you have in mind. You do not need to book a call first.' },
  ] as QA[],
  ctaHeading: 'Invite Nandita to speak',
  ctaLine: 'Tell me the date, the audience and what you have in mind.',
  replyTimeLine: '', // [ADD: reply time]
  profilePdfUrl: '', // [ADD: speaker profile PDF]
}

export const ABOUT = {
  seo: {
    title: 'About Nandita Thakur | Speaker, Entrepreneur and Author',
    description:
      'Nandita Thakur is a speaker for women, an entrepreneur and the author of Silent Screams. Read her story of rebuilding life after setbacks.',
  },
  h1: 'About Nandita Thakur',
  intro:
    'I am a speaker for women, an entrepreneur and the author of *Silent Screams*. I speak about rebuilding belief in yourself after life’s setbacks, because I have had to do it more than once.',
  factsHeading: 'Quick facts',
  facts: [
    { label: 'Name', value: 'Nandita Thakur' },
    { label: 'Known for', value: 'Speaking to women about self-belief, independence and starting again' },
    { label: 'Author of', value: '*Silent Screams*' },
    { label: 'Also', value: 'Entrepreneur. She built a salon business and a travel business.' },
    { label: 'Speaks at', value: 'Women’s events, communities and company sessions' },
  ],
  businessNames: '', // appended to "Also" only if Nandita wants them shown
  basedIn: '', // shown only if Nandita wants it shown
  storyHeading: 'My story',
  storyParagraphs: [
    'I married young, became a mother early and did not finish college. For years my life was my family and my home.',
    'When I realised my marriage might not work, I started working towards earning my own money. I built a salon business and a travel business myself. Earning my own money gave me choices I would not otherwise have had.',
    'My marriage was a narcissistic relationship. It took me a long time to see that, and longer to leave. I separated after 18 years.',
    'Then both my parents were diagnosed with cancer, and I looked after them. My father died while my mother was in treatment. After that, I was diagnosed with cancer myself.',
    'I was living alone when I was diagnosed. I called my insurance agent to find out what my policy covered and began arranging my treatment before I told my family. I carried on with my online music classes and kept singing through chemotherapy. I am back at work now.',
  ],
  storyExtraLine: '',
  nowHeading: 'What I do now',
  now: [
    {
      heading: 'Speaking',
      text: 'I speak at women’s events, community gatherings and company sessions about self-belief, having an identity of your own, building independence, living through uncertainty and finding enjoyment again.',
      linkLabel: 'Invite me to speak at your event',
      href: '/speaking/',
    },
    {
      heading: 'Writing',
      text: 'I wrote *Silent Screams* to put difficult experiences into words and to find some closure. Writing it is part of why I can speak openly about hard experiences today.',
      linkLabel: 'About the book',
      href: '/silent-screams/',
    },
    { heading: 'Business', text: 'I built a salon business and a travel business myself, and I am back at work now.', linkLabel: '', href: '' },
  ],
  anthem: '', // [ADD: what Anthem is and what Nandita does there]
  believeHeading: 'What I believe',
  beliefs: [
    'Everyone copes in their own way, and none of them is wrong.',
    'I share what happened to me. I do not tell anyone what to decide.',
    'A small next step is still a step.',
    'Laughter and music have a place even in a hard year.',
  ],
  bookOneLiner: '', // [ADD: one-line description of the book] appended to the Silent Screams FAQ
  faqHeading: 'Questions people ask about Nandita',
  faqs: [
    { q: 'Who is Nandita Thakur?', a: 'Nandita Thakur is a speaker for women, an entrepreneur and the author of Silent Screams. She speaks about rebuilding belief in yourself after life’s setbacks, drawing on her own experience of ending a long marriage, caring for her parents through cancer and being diagnosed with cancer herself.' },
    { q: 'Why does Nandita speak to women?', a: 'She spent years putting family first and had to rebuild her own confidence, independence and sense of identity more than once. She speaks to women because she knows how it feels to ask, “What do I do now?”' },
    { q: 'What is Silent Screams?', a: 'Silent Screams is Nandita’s book. She wrote it to put difficult experiences into words and to find some closure.' },
    { q: 'Is Nandita a therapist or a coach?', a: 'No. Nandita shares her own experience and leaves the audience with questions to think about. She is not a therapist or a financial adviser, and her talks do not promise a particular result.' },
  ] as QA[],
  ctaHeading: 'Invite Nandita to speak',
  ctaLine: CTA_LINE,
}

export const BOOK = {
  title: 'Silent Screams',
  byline: 'A book by Nandita Thakur',
  description: '', // pending: Silent Screams page copy
  whyHeading: 'Why I wrote it',
  why: [
    'I wrote *Silent Screams* to put difficult experiences into words and to find some closure.',
    'Writing it is part of why I can speak openly about hard experiences today.',
  ],
  synopsisHeading: 'About the book',
  buyHeading: 'Where to buy',
  buyLabel: 'Buy the Book',
}

export const CONTACT = {
  seo: {
    title: 'Invite Nandita Thakur to Speak | Contact',
    description: 'Send a speaking enquiry to Nandita Thakur for your women’s event, community gathering or company session. No call needed first.',
  },
  h1: 'Invite Nandita to speak',
  intro: 'Planning an event for women, or a session for your team? Tell me the date, the audience and what you have in mind. You do not need to book a call first.',
  includeHeading: 'Helpful to include',
  include: ['The date or approximate timing', 'The audience and its size', 'The location, or whether it is online', 'What you have in mind'],
  thanksHeading: 'Thank you. Your enquiry has been sent.',
  thanksText: 'A confirmation is on its way to your email.',
}

export const BLOG = {
  seo: { title: 'Blog | Nandita Thakur', description: 'Writing by Nandita Thakur on self-belief, identity, independence and starting again.' },
  h1: 'Blog',
  intro: '',
  categories: ['Believing in Yourself', 'Identity and Interests', 'Independence', 'Uncertainty and Starting Again', 'Enjoying Life'],
}

export const ALT = {
  heroPortrait: 'Nandita Thakur, motivational speaker for women',
  aboutPortrait: 'Nandita Thakur, speaker, entrepreneur and author',
  bioPhoto: 'Nandita Thakur, motivational speaker for women',
  bookCover: 'Silent Screams book cover by Nandita Thakur',
}
