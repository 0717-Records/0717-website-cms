export function GET(): Response {
  // Get the base URL, defaulting to production URL if not set
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://0717records.com'

  const robotsText = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /admin/',
    'Disallow: /api/',
    'Disallow: /draft/',
    'Disallow: /studio/',
    '',
    `Sitemap: ${baseUrl}/sitemap.xml`
  ].join('\n')

  return new Response(robotsText, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}