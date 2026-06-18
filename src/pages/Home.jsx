import React from 'react'
import { Helmet } from 'react-helmet-async'
import Hero from '../components/home/Hero'
import { WhyChooseF3, TrainingPhilosophy } from '../components/home/WhyChooseF3'
import { StatsCounter, Testimonials, GalleryPreview, ContactCTA } from '../components/home/Sections'
import FeaturedServices from '../components/home/FeaturedServices'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>F3 – Fight For Fitness | Elite Performance Training</title>
        <meta name="description" content="F3 – where warriors are forged. Premium MMA, strength training, and elite performance coaching in Hyderabad." />
        <meta property="og:title" content="F3 – Fight For Fitness" />
        <meta property="og:description" content="Elite performance training. Where warriors are forged." />
      </Helmet>

      <main>
        <Hero />
        <WhyChooseF3 />
        <TrainingPhilosophy />
        <FeaturedServices />
        <StatsCounter />
        <GalleryPreview />
        <Testimonials />
        <ContactCTA />
      </main>
    </>
  )
}
