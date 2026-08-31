import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Contenuti sito',
  type: 'document',
  fields: [
    defineField({ name: 'heroTitle', title: 'Titolo home', type: 'string' }),
    defineField({ name: 'heroText', title: 'Testo home', type: 'text', rows: 3 }),
    defineField({ name: 'welcomeTitle', title: 'Titolo benvenuto', type: 'string' }),
    defineField({ name: 'welcomeText', title: 'Testo benvenuto', type: 'text', rows: 3 }),
    defineField({ name: 'practiceTitle', title: 'Titolo pratica', type: 'string' }),
    defineField({ name: 'practiceText', title: 'Testo pratica', type: 'text', rows: 4 }),
    defineField({ name: 'aboutTitle', title: 'Titolo Chi sono', type: 'string' }),
    defineField({ name: 'aboutIntro', title: 'Introduzione Chi sono', type: 'text', rows: 3 }),
    defineField({ name: 'aboutHeading', title: 'Titolo storia personale', type: 'string' }),
    defineField({ name: 'aboutText', title: 'Testo storia personale', type: 'text', rows: 5 }),
    defineField({
      name: 'courses',
      title: 'Corsi',
      type: 'array',
      validation: (rule) => rule.max(4),
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Titolo', type: 'string' }),
          defineField({ name: 'description', title: 'Descrizione', type: 'text', rows: 3 }),
          defineField({ name: 'availability', title: 'Dove e quando', type: 'string' }),
        ],
      }],
    }),
    defineField({ name: 'contactTitle', title: 'Titolo contatti', type: 'string' }),
    defineField({ name: 'contactText', title: 'Testo contatti', type: 'text', rows: 3 }),
    defineField({ name: 'phone', title: 'Telefono', type: 'string' }),
    defineField({ name: 'instagramUrl', title: 'Link Instagram', type: 'url' }),
    defineField({ name: 'heroImage', title: 'Immagine home', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'aboutImage', title: 'Immagine Chi sono', type: 'image', options: { hotspot: true } }),
  ],
  preview: {
    prepare: () => ({ title: 'Contenuti LAVY' }),
  },
})