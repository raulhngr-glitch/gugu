import Hero from '../components/Hero'
import PackagesGrid from '../components/PackagesGrid'
import BlogPreview from '../components/BlogPreview'
import Testimonials from '../components/Testimonials'
import { getFeaturedPackages } from '../lib/data'
export default async function Home() {
  const packages = await getFeaturedPackages()
  return (
    <main>
      <Hero />
      <PackagesGrid packages={packages} />
      <BlogPreview />
      <Testimonials />
    </main>
  )
}
