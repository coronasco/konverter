import { Metadata } from 'next'
import PasswordGenerator from '@/components/PasswordGenerator'
import BreadcrumbSchema, { generateBreadcrumbs } from '@/components/BreadcrumbSchema'
import FAQSchema from '@/components/FAQSchema'
import ToolPageLayout from '@/components/ToolPageLayout'

export const metadata: Metadata = {
  title: 'Password Generator | Konverter',
  description:
    'Generate stronger passwords with practical options, live strength feedback, and browser-based copy actions.',
  alternates: {
    canonical: 'https://www.konverter-online.com/password-generator',
  },
}

const faqs = [
  {
    question: 'How is the password strength shown?',
    answer: 'The tool estimates strength using character variety, length, and a simple entropy-based analysis. It also flags repeated or predictable patterns.',
  },
  {
    question: 'Can I control what characters are used?',
    answer: 'Yes. You can include or exclude uppercase, lowercase, numbers, symbols, similar characters, and ambiguous symbols.',
  },
  {
    question: 'Is the password generated in the browser?',
    answer: 'Yes. The generator runs directly in the page and keeps the workflow local to your browser.',
  },
]

export default function PasswordGeneratorPage() {
  const breadcrumbs = generateBreadcrumbs('/password-generator')

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema faqs={faqs} />
      <ToolPageLayout
        toolPath="/password-generator"
        eyebrow="Frontend tools"
        title="Generate a password, check it, copy it, move on"
        description="Useful when you need something strong quickly and do not want to guess whether it is any good."
        highlights={['Strength feedback', 'Entropy analysis', 'Copy in one click']}
        toolNote="Generate a password, sanity-check it, copy it, and move on without overthinking the setup."
        useCases={[
          {
            title: 'Setting up accounts or environments',
            description: 'Generate a strong password quickly while still checking whether the result has the right length and character mix for the job.',
          },
          {
            title: 'Teaching or documenting password choices',
            description: 'The analysis makes it easier to explain why one password is stronger than another during onboarding or internal docs work.',
          },
          {
            title: 'Avoiding weak defaults',
            description: 'Use the controls to avoid repeated characters, similar-looking glyphs, or ambiguous symbols depending on the context.',
          },
        ]}
        helpfulPoints={[
          {
            title: 'More than random output',
            description: 'Strength checks and pattern warnings stay close to the password, so you can judge it before you copy it.',
          },
          {
            title: 'Easy to scan',
            description: 'The password, options, and feedback are easier to read at a glance on both desktop and mobile.',
          },
          {
            title: 'Fits the broader utility set',
            description: 'Security helpers still belong here when they are practical browser tools rather than separate account products.',
          },
        ]}
        faqs={faqs}
      >
        <PasswordGenerator />
      </ToolPageLayout>
    </>
  )
}
