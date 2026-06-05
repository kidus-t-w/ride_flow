'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

function FAQAccordionItem({ question, answer }: FAQItem) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-admin-border-strong transition-colors duration-150 focus-within:border-brand-ink">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full py-6 flex justify-between items-center bg-transparent border-none text-left cursor-pointer group focus:outline-none"
      >
        <span className="text-base font-bold tracking-wide text-brand-ink uppercase transition-colors group-hover:text-brand-primary">
          {question}
        </span>
        <span
          aria-hidden="true"
          className="text-brand-ink text-xl ml-4 transition-transform duration-200 block transform select-none"
        >
          {isOpen ? '−' : '+'}
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[500px] pb-6 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-sm font-light leading-relaxed text-brand-muted max-w-[640px]">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  return (
    <div className="flex flex-col">
      {items.map((faq, idx) => (
        <FAQAccordionItem key={idx} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
}