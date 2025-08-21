import type { StructureResolver } from 'sanity/structure';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content Management')
    .items([
      // === SITE MANAGEMENT ===
      S.listItem()
        .title('🏠 Site Management')
        .child(
          S.list()
            .title('Site Management')
            .items([
              // Header - Singleton
              S.listItem()
                .id('header')
                .schemaType('header')
                .title('Header')
                .child(
                  S.editor().id('header').schemaType('header').documentId('header').title('Header')
                ),
              // Home Page - Singleton that can't be deleted
              S.listItem()
                .id('homePage')
                .schemaType('homePage')
                .title('Home Page')
                .child(
                  S.editor()
                    .id('homePage')
                    .schemaType('homePage')
                    .documentId('homePage')
                    .title('Home Page')
                ),
              // Footer - Singleton
              S.listItem()
                .id('footer')
                .schemaType('footer')
                .title('Footer')
                .child(
                  S.editor().id('footer').schemaType('footer').documentId('footer').title('Footer')
                ),

              // Site Settings - Singleton
              S.listItem()
                .id('siteSettings')
                .schemaType('siteSettings')
                .title('Site Settings')
                .child(
                  S.editor()
                    .id('siteSettings')
                    .schemaType('siteSettings')
                    .documentId('siteSettings')
                    .title('Site Settings')
                ),
            ])
        ),

      S.divider(),

      // === PAGES ===
      S.listItem()
        .id('pages')
        .title('📄 Pages')
        .child(
          S.documentTypeList('page').title('Pages').filter('_type == "page" && _id != "homePage"')
        ),

      S.divider(),

      // === BLOG ===
      S.listItem()
        .id('posts')
        .title('📝 Blog')
        .child(
          S.documentTypeList('post').title('Posts')
        ),

      S.divider(),

      // === EVENTS ===
      S.listItem()
        .id('events')
        .title('📅 Events')
        .child(
          S.list()
            .title('Events Management')
            .items([
              // Events Index Page - Singleton
              S.listItem()
                .id('eventsIndexPage')
                .schemaType('eventsIndexPage')
                .title('Event Index Page')
                .child(
                  S.editor()
                    .id('eventsIndexPage')
                    .schemaType('eventsIndexPage')
                    .documentId('eventsIndexPage')
                    .title('Event Index Page')
                ),
              // Individual Events
              S.listItem()
                .id('events')
                .title('Events')
                .child(
                  S.documentTypeList('event').title('Events')
                ),
            ])
        ),
    ]);
