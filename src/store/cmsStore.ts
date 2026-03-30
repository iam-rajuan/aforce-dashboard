import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CmsPageId = 'about-us' | 'privacy-policy' | 'terms-and-conditions'

export interface CmsPageContent {
  id: CmsPageId
  title: string
  path: string
  summary: string
  content: string
}

interface CmsState {
  pages: Record<CmsPageId, CmsPageContent>
  updatePageContent: (id: CmsPageId, content: string) => void
}

const defaultPages: Record<CmsPageId, CmsPageContent> = {
  'about-us': {
    id: 'about-us',
    title: 'About Us',
    path: '/about-us',
    summary: 'Share the story, mission and product vision behind AForce.',
    content:
      '<h1>About AForce</h1><p>AForce helps teams operate faster with a focused admin experience, real-time visibility and cleaner decision workflows.</p><p>Our mission is to make operational dashboards feel precise, fast and easy to maintain at scale.</p><h2>What We Value</h2><ul><li>Reliable data visibility for every team.</li><li>Fast admin actions without unnecessary friction.</li><li>Interfaces that stay clear as the platform grows.</li></ul>',
  },
  'privacy-policy': {
    id: 'privacy-policy',
    title: 'Privacy Policy',
    path: '/privacy-policy',
    summary: 'Define how user data is collected, stored and protected.',
    content:
      '<h1>Privacy Policy</h1><p>AForce collects only the information required to operate the platform, secure accounts and improve service quality.</p><h2>Information We Process</h2><ul><li>Account profile details provided by administrators.</li><li>Operational usage data needed for analytics and support.</li><li>Security logs used to detect abuse and protect the platform.</li></ul><p>We use administrative, technical and organizational safeguards to protect this information.</p>',
  },
  'terms-and-conditions': {
    id: 'terms-and-conditions',
    title: 'Terms & Conditions',
    path: '/terms-and-conditions',
    summary: 'Publish the platform usage terms and legal conditions.',
    content:
      '<h1>Terms &amp; Conditions</h1><p>By accessing AForce, administrators agree to use the dashboard in compliance with applicable law and internal company policy.</p><h2>Acceptable Use</h2><ul><li>Do not misuse platform access or attempt unauthorized changes.</li><li>Keep credentials secure and report suspicious activity promptly.</li><li>Use the platform only for approved business operations.</li></ul><p>AForce may update these terms as the service evolves.</p>',
  },
}

export const cmsPageOrder: CmsPageId[] = ['about-us', 'privacy-policy', 'terms-and-conditions']

export const useCmsStore = create<CmsState>()(
  persist(
    (set) => ({
      pages: defaultPages,
      updatePageContent: (id, content) =>
        set((state) => ({
          pages: {
            ...state.pages,
            [id]: {
              ...state.pages[id],
              content,
            },
          },
        })),
    }),
    {
      name: 'aforce-cms-pages',
      partialize: (state) => ({ pages: state.pages }),
    },
  ),
)
