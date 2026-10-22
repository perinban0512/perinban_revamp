import Link from 'next/link'
import { PondyHero } from '@/components/PondyHero'
import { Reveal } from '@/components/Reveal'
import { NatureArt, PetsArt, TechArt } from '@/components/TopicArt'
import { NewsletterForm, ContactForm } from '@/components/Forms'
import { PostCard } from '@/components/PostCard'
import { diaryPosts } from '@/lib/fixtures'
import { img } from '@/lib/image'

const topics = [
  { title: 'Technology', text: 'I learn how to use software and programming languages, and how to draw in Adobe Illustrator and Photoshop.', Art: TechArt, tone: 'sea' },
  { title: 'Nature & Travel', text: 'I love going out with my parents to new places like beaches, ponds and villages, and enjoying nature.', Art: NatureArt, tone: 'leaf' },
  { title: 'Pets', text: 'I raise lots of pets — rabbits, hens, colourful fish, lovebirds and more. I love spending time and playing with them.', Art: PetsArt, tone: 'rose' },
]

export default function HomePage() {
  return (
    <>
      <PondyHero />

      <section id="what-i-do" className="section">
        <Reveal className="section-head">
          <span className="eyebrow">What I do here</span>
          <h2>I share my thoughts and the interesting things I learn.</h2>
          <p>I hope you like them! Here are the topics I enjoy every day.</p>
        </Reveal>
        <div className="topic-grid">
          {topics.map(({ title, text, Art, tone }, i) => (
            <Reveal key={title} delay={i * 0.12} className={`topic-card tone-${tone}`}>
              <Art />
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section newsletter-band">
        <Reveal className="postcard" y={60}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img('/img/pondy-street.png', 900)} alt="Illustration of a colourful White Town street in Pondicherry" loading="lazy" />
          <span className="stamp" aria-hidden>PONDY<br />✉</span>
          <span className="postmark" aria-hidden>Greetings from Pondicherry</span>
        </Reveal>
        <Reveal delay={0.1} className="newsletter-card">
          <span className="eyebrow">Subscribe to my newsletter</span>
          <h2>Stay updated!</h2>
          <p>
            You can subscribe to my newsletter right here or from the <Link href="/newsletter">Newsletter</Link> page to see some more information.
          </p>
          <NewsletterForm compact />
        </Reveal>
      </section>

      <section className="section">
        <Reveal className="section-head">
          <span className="eyebrow">My Diary</span>
          <h2>Read my latest posts and share your thoughts.</h2>
        </Reveal>
        <div className="post-grid">
          {diaryPosts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <PostCard post={p} />
            </Reveal>
          ))}
        </div>
        <Reveal className="center">
          <Link href="/blogs" className="btn btn-ghost">See all blogs →</Link>
        </Reveal>
      </section>

      <section className="section touch">
        <Reveal className="touch-art" y={60}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img('/img/pondy-beach.png', 900)} alt="Illustration of a family flying a kite on Paradise Beach near Pondicherry" loading="lazy" />
          <span className="kite-float" aria-hidden>🪁</span>
        </Reveal>
        <Reveal delay={0.1} className="touch-card">
          <span className="eyebrow">Get in touch</span>
          <h2>We can meet virtually</h2>
          <p>
            Send me your email ID and I will send you a Google Meet link. The <Link href="/contact">Contact Me</Link> page has some more information.
          </p>
          <ContactForm />
        </Reveal>
      </section>
    </>
  )
}
