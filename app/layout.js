export const metadata = {
  title: 'AI Trip Planner MVP',
  description: 'Simple AI travel planner starter project'
};

import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
