import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

// Images are served as-is from public/assets/img (already optimised, not
// run through Astro's build-time image pipeline) so schemas below store
// plain public-root-relative paths rather than using the `image()` helper.

const team = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/team' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    image: z.string(),
    order: z.number().default(0),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/testimonials' }),
  schema: z.object({
    author: z.string().default(''),
    quote: z.string(),
    order: z.number().default(0),
  }),
});

const portfolio = defineCollection({
  loader: file('./src/content/portfolio.yml'),
  schema: z.object({
    id: z.string(),
    items: z.array(
      z.object({
        title: z.string(),
        caption: z.string().default(''),
        image: z.string(),
        categories: z.array(
          z.enum(['event', 'hw', 's', 'sherfield-park', 'sil', 'app', 'fabric', 'web', 'video'])
        ),
      })
    ),
  }),
});

const locations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/locations' }),
  schema: z.object({
    name: z.string(),
    tabId: z.string(),
    navLabel: z.string(),
    mapImage: z.string(),
    mapHref: z.string().url(),
    outsideImage: z.string(),
    features: z.array(z.string()).default([]),
    order: z.number().default(0),
    active: z.boolean().default(true),
  }),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    icon: z.string(),
    description: z.string(),
    order: z.number().default(0),
  }),
});

const supporters = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/supporters' }),
  schema: z.object({
    name: z.string(),
    logo: z.string(),
    href: z.string().url().optional(),
    order: z.number().default(0),
  }),
});

const upcomingEvents = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/upcoming-events' }),
  schema: z.object({
    date: z.date(),
    location: z.string(),
    time: z.string(),
    bookingUrl: z.string().url().optional(),
    order: z.number().default(0),
  }),
});

const pastEvents = defineCollection({
  loader: file('./src/content/past-events.yml'),
  schema: z.object({
    id: z.string(),
    events: z.array(z.string()),
  }),
});

const siteSettings = defineCollection({
  loader: file('./src/content/settings/site.yml'),
  schema: z.object({
    id: z.string(),
    heroTitle: z.string(),
    heroSubtitle: z.string(),
    scrollBannerText: z.string(),
    scrollBannerHref: z.string(),
    nextEventDescription: z.string(),
    nextEventLocation: z.string(),
    nextEventLocationHref: z.string(),
    nextEventWhen: z.string(),
    nextEventBookingUrl: z.string().url(),
    stats: z.object({
      happyClients: z.number(),
      savingsGbp: z.number(),
      ghgKg: z.number(),
      landfillKg: z.number(),
    }),
    contactEmail: z.string().email(),
    facebookUrl: z.string().url(),
    instagramUrl: z.string().url(),
    paypalHostedButtonId: z.string(),
    statcounterProject: z.number(),
    statcounterSecurity: z.string(),
    gtagId: z.string(),
  }),
});

export const collections = {
  team,
  testimonials,
  portfolio,
  locations,
  services,
  supporters,
  'upcoming-events': upcomingEvents,
  'past-events': pastEvents,
  'site-settings': siteSettings,
};
