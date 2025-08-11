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
              // Home Page - Singleton that can't be deleted
              S.listItem()
                .id('homePage')
                .schemaType('homePage')
                .title('Home Page')
                .child(S.editor().id('homePage').schemaType('homePage').documentId('homePage')),

              // Navbar - Singleton
              S.listItem()
                .id('navbar')
                .schemaType('navbar')
                .title('Navigation Menu')
                .child(S.editor().id('navbar').schemaType('navbar').documentId('navbar')),

              // Footer - Singleton
              S.listItem()
                .id('footer')
                .schemaType('footer')
                .title('Footer')
                .child(S.editor().id('footer').schemaType('footer').documentId('footer')),

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
        .title('📝 Blog')
        .child(
          S.list()
            .title('Blog Management')
            .items([
              S.documentTypeListItem('post').title('Posts'),
              S.documentTypeListItem('category').title('Categories'),
            ])
        ),
    ]);
