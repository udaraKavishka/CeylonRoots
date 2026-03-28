"use client";

import { useEffect, useState } from "react";

type Heading = {
  id: string;
  text: string;
  level: 2 | 3;
};

type Props = {
  headings: Heading[];
};

export default function TableOfContents({ headings }: Props) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0,
      }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className="bg-ceylon-sand/10 rounded-2xl border border-ceylon-sand/30 p-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-ceylon-stone/60 mb-4">
        In this article
      </p>
      <nav>
        <ul className="space-y-1">
          {headings.map(({ id, text, level }) => (
            <li key={id} className={level === 3 ? "pl-4" : ""}>
              <a
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(id)?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                  setActiveId(id);
                }}
                className={`
                  block py-1 text-sm leading-snug transition-colors border-l-2 pl-3
                  ${
                    activeId === id
                      ? "border-ceylon-tea text-ceylon-tea font-medium"
                      : "border-transparent text-ceylon-stone/70 hover:text-ceylon-stone hover:border-ceylon-sand"
                  }
                  ${level === 3 ? "text-xs" : ""}
                `}
              >
                {text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
