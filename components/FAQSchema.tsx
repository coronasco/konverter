interface FAQItem {
  question: string
  answer: string
}

interface FAQSchemaProps {
  faqs: FAQItem[]
}

export default function FAQSchema({ faqs }: FAQSchemaProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  )
}

// FAQ data pentru diferite tool-uri
export const svgConverterFAQs: FAQItem[] = [
  {
    question: "How do I convert SVG to React component?",
    answer: "Upload your SVG file or paste the SVG code into our converter. The tool automatically generates a React/JSX component with proper TypeScript support, customizable props, and optimized code structure."
  },
  {
    question: "Can I optimize SVG files for better performance?",
    answer: "Yes! Our SVG optimizer reduces file size by up to 70% by removing unnecessary metadata, comments, and redundant code while preserving visual quality. Choose from Conservative, Balanced, Aggressive, or Maximum optimization levels."
  },
  {
    question: "What formats can I export SVG to?",
    answer: "You can convert SVG to: CSS background (URL-encoded), Base64 data URI, React/JSX components, PNG/JPG images, PDF files, and various icon formats. All conversions maintain high quality and are optimized for web use."
  },
  {
    question: "Is the SVG converter free to use?",
    answer: "Yes, our SVG converter is completely free with no registration required. You can convert unlimited SVG files, use all optimization features, and export in any format without restrictions."
  },
  {
    question: "Does the tool work offline?",
    answer: "The SVG conversion and optimization happens entirely in your browser using JavaScript. No files are uploaded to our servers, ensuring privacy and security. However, you need internet access to load the tool initially."
  }
]

export const jsonFormatterFAQs: FAQItem[] = [
  {
    question: "How do I format and validate JSON?",
    answer: "Paste your JSON data into the formatter, and it will automatically detect syntax errors, highlight them, and provide properly formatted output with correct indentation and structure."
  },
  {
    question: "Can I minify JSON to reduce file size?",
    answer: "Yes! Our JSON formatter can both beautify (add formatting) and minify (remove whitespace) JSON data. Minification reduces file size for production use while maintaining data integrity."
  },
  {
    question: "What JSON errors does the validator detect?",
    answer: "Our validator detects missing commas, unclosed brackets, invalid escape sequences, duplicate keys, incorrect data types, and other syntax errors. Each error shows the exact line and character position."
  },
  {
    question: "Is my JSON data secure and private?",
    answer: "Absolutely! All JSON processing happens locally in your browser. No data is sent to our servers, ensuring complete privacy and security for sensitive information."
  }
]

export const passwordGeneratorFAQs: FAQItem[] = [
  {
    question: "How do I create a strong password?",
    answer: "Use our password generator to create passwords with at least 12 characters, including uppercase, lowercase, numbers, and symbols. Avoid dictionary words and personal information for maximum security."
  },
  {
    question: "What makes a password secure?",
    answer: "Secure passwords have high entropy (randomness), sufficient length (12+ characters), mixed character types, and avoid predictable patterns. Our generator creates truly random passwords with military-grade security."
  },
  {
    question: "How long should my password be?",
    answer: "We recommend at least 12 characters for personal accounts and 16+ characters for business/sensitive accounts. Our generator supports passwords up to 64 characters for maximum security."
  },
  {
    question: "Can I customize the password characters?",
    answer: "Yes! You can include/exclude uppercase letters, lowercase letters, numbers, symbols, and choose to avoid similar characters (0, O, l, 1) or ambiguous characters for better usability."
  }
]
