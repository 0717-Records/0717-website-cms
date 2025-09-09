export default function ErrorTestPage() {
  // Throw a server error to test the error.tsx page
  throw new Error('This is a test server error to demonstrate the error page functionality');
}