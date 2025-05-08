# Honestus

A modern, responsive personal website built with Next.js, showcasing storytelling services and professional offerings.

## 🚀 Features

- Modern, responsive design with beautiful animations
- Built with Next.js 14 and React
- Framer Motion for smooth animations
- Tailwind CSS for styling
- SEO optimized with comprehensive metadata
- Contact form integration
- Blog functionality
- Services showcase

## 🛠️ Tech Stack

- **Framework:** Next.js 14
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide Icons
- **Deployment:** Vercel (recommended)

## 📦 Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd kayla
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
src/
├── app/                    # App router directory
│   ├── (frontend)/        # Frontend routes
│   │   ├── blog/         # Blog pages
│   │   ├── services/     # Services pages
│   │   └── page.tsx      # Home page
│   └── api/              # API routes
├── components/            # Reusable components
├── styles/               # Global styles
└── utilities/            # Utility functions
```

## 🔧 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_SITE_URL=your-site-url
```

## 🚀 Deployment

The easiest way to deploy this website is using [Vercel](https://vercel.com):

1. Push your code to a Git repository
2. Import the project to Vercel
3. Vercel will detect Next.js and set up the build configuration automatically

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

For any questions or inquiries, please reach out to [kayla@honestus.world](mailto:kayla@honestus.world)
