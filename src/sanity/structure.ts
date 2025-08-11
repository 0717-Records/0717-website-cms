import type { StructureResolver } from 'sanity/structure';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Blog')
    .items([
      // Home Page - Singleton that can't be deleted
      S.listItem()
        .id('homePage')
        .schemaType('homePage')
        .title('Home Page')
        .child(S.editor().id('homePage').schemaType('homePage').documentId('homePage')),
      S.divider(),
      S.documentTypeListItem('post').title('Posts'),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('author').title('Authors'),
      S.divider(),
      // Regular pages (excluding home page)
      S.listItem()
        .id('pages')
        .title('Pages')
        .child(
          S.documentTypeList('page').title('Pages').filter('_type == "page" && _id != "homePage"')
        ),
      S.documentTypeListItem('faq').title('FAQs'),
      S.listItem()
        .id('siteSettings')
        .schemaType('siteSettings')
        .title('Site Settings')
        .child(S.editor().id('siteSettings').schemaType('siteSettings').documentId('siteSettings')),
    ]);
