type Swatch = {
  name: string;
  hex: string;
};

type BadgeTone = "blue" | "cyan" | "green" | "indigo" | "navy";

type IconName =
  | "book"
  | "bookmark"
  | "bell"
  | "chevron"
  | "clock"
  | "code"
  | "download"
  | "file"
  | "grid"
  | "home"
  | "lock"
  | "menu"
  | "play"
  | "search"
  | "target"
  | "user"
  | "check"
  | "lightbulb"
  | "access";

const primarySwatches: Swatch[] = [
  { name: "Navy 900", hex: "#0F172A" },
  { name: "Navy 700", hex: "#1E3A5F" },
  { name: "Primary Blue", hex: "#2563EB" },
  { name: "Cyan Accent", hex: "#06B6D4" },
  { name: "Light Blue", hex: "#DBEAFE" },
];

const semanticSwatches: Swatch[] = [
  { name: "Success Green", hex: "#22C55E" },
  { name: "Main Text", hex: "#111827" },
  { name: "Muted Text", hex: "#64748B" },
  { name: "Background", hex: "#F8FAFC" },
  { name: "White", hex: "#FFFFFF" },
];

const typeScale = [
  ["Display 1", "Plus Jakarta Sans", "48 / 56", "Bold", "Hero titles"],
  ["Display 2", "Plus Jakarta Sans", "36 / 44", "Bold", "Section titles"],
  ["Heading 1", "Plus Jakarta Sans", "28 / 36", "Semi Bold", "Page titles"],
  ["Heading 2", "Plus Jakarta Sans", "22 / 28", "Semi Bold", "Sub section"],
  ["Body Large", "Inter", "16 / 24", "Medium", "Emphasis"],
  ["Body", "Inter", "14 / 20", "Regular", "Body copy"],
  ["Body Small", "Inter", "12 / 18", "Regular", "Captions, meta"],
];

const spacing = [
  ["4", "0.25rem"],
  ["8", "0.5rem"],
  ["12", "0.75rem"],
  ["16", "1rem"],
  ["24", "1.5rem"],
  ["32", "2rem"],
  ["40", "2.5rem"],
  ["48", "3rem"],
  ["64", "4rem"],
];

const radii = [
  ["4px", "(xs)"],
  ["8px", "(sm)"],
  ["12px", "(md)"],
  ["16px", "(lg)"],
  ["24px", "(xl)"],
  ["Full", "(circle)"],
];

const icons: IconName[] = [
  "home",
  "search",
  "play",
  "file",
  "bookmark",
  "grid",
  "bell",
  "user",
  "chevron",
];

const principles: Array<[IconName, string, string, string]> = [
  [
    "target",
    "Clarity",
    "Communicate information simply and effectively so learners can focus on what matters.",
    "blue",
  ],
  [
    "grid",
    "Consistency",
    "Use components and patterns consistently across joojo to build familiarity and trust.",
    "cyan",
  ],
  [
    "lightbulb",
    "Focus",
    "Reduce distractions and highlight what is important to help learners stay engaged.",
    "blue",
  ],
  [
    "access",
    "Accessible",
    "Design with accessibility and inclusivity in mind so every learner can succeed.",
    "green",
  ],
];

function Section({
  number,
  title,
  className = "",
  children,
}: {
  number: string;
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={`panel ${className}`}>
      <div className="section-kicker">
        <span>{number}</span>
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  );
}

function JoojoMark({ className = "h-16 w-16" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 64 64"
      className={className}
      fill="none"
    >
      <path
        d="M9 10.5 29.5 17v35.5L9 43.5v-33Z"
        fill="url(#joojo-left)"
      />
      <path
        d="M55 10.5 35 17v35.5l20-9v-33Z"
        fill="url(#joojo-right)"
      />
      <path d="M29.5 17 35 17v35.5h-5.5V17Z" fill="#DBEAFE" />
      <defs>
        <linearGradient
          id="joojo-left"
          x1="9"
          x2="31"
          y1="12"
          y2="51"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2563EB" />
          <stop offset="1" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient
          id="joojo-right"
          x1="55"
          x2="33"
          y1="10"
          y2="51"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#60A5FA" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function Icon({
  name,
  filled = false,
  className = "h-5 w-5",
}: {
  name: IconName;
  filled?: boolean;
  className?: string;
}) {
  const fill = filled ? "currentColor" : "none";
  const common = {
    fill,
    stroke: "currentColor",
    strokeWidth: 1.9,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      {...common}
    >
      {name === "book" && <path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 0-3-3V4ZM5 17V4" />}
      {name === "bookmark" && <path d="M7 4h10v16l-5-3.2L7 20V4Z" />}
      {name === "bell" && <path d="M6.5 10.5a5.5 5.5 0 0 1 11 0v4.4l1.4 2.1H5.1l1.4-2.1v-4.4ZM10 20h4" />}
      {name === "chevron" && <path d="m9 5 7 7-7 7" />}
      {name === "clock" && <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7.5V12l3 2" />}
      {name === "code" && <path d="m9 8-4 4 4 4M15 8l4 4-4 4M13 6l-2 12" />}
      {name === "download" && <path d="M12 4v10M8 10l4 4 4-4M5 19h14" />}
      {name === "file" && <path d="M7 3.5h6l4 4V20H7V3.5ZM13 3.5V8h4M9.5 12h5M9.5 15.5h5" />}
      {name === "grid" && <path d="M4 4h6v6H4V4ZM14 4h6v6h-6V4ZM4 14h6v6H4v-6ZM14 14h6v6h-6v-6Z" />}
      {name === "home" && <path d="m3.5 11 8.5-7 8.5 7M6 10v10h12V10M10 20v-6h4v6" />}
      {name === "lock" && <path d="M7 10h10v10H7V10ZM9 10V7a3 3 0 0 1 6 0v3" />}
      {name === "menu" && <path d="M5 7h14M5 12h14M5 17h14" />}
      {name === "play" && (
        <>
          <circle cx="12" cy="12" r="8.5" />
          <path d="m10 8.8 5.2 3.2-5.2 3.2V8.8Z" fill={filled ? "white" : "none"} />
        </>
      )}
      {name === "search" && <path d="m20 20-4.2-4.2M18 11a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />}
      {name === "target" && (
        <>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="4" fill="none" />
          <path d="M12 8v4l3-2" />
        </>
      )}
      {name === "user" && <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4.5 20c1.3-3.2 4-5 7.5-5s6.2 1.8 7.5 5" />}
      {name === "check" && <path d="M20 6 9 17l-5-5" />}
      {name === "lightbulb" && <path d="M9 18h6M10 22h4M8.5 14.5a6 6 0 1 1 7 0c-.8.6-1.3 1.6-1.5 2.5h-4c-.2-.9-.7-1.9-1.5-2.5ZM12 2v1M4.9 4.9l.7.7M2 12h1M19.1 4.9l-.7.7M22 12h-1" />}
      {name === "access" && <path d="M12 5.5a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6ZM4.5 8.2c3.8-1 7.7-1 15 0M12 8v5M8 21l4-8 4 8" />}
    </svg>
  );
}

function ColorSwatches({ swatches }: { swatches: Swatch[] }) {
  return (
    <div className="swatch-grid">
      {swatches.map((swatch) => (
        <div key={swatch.hex} className="swatch-item">
          <div
            className="swatch"
            style={{ backgroundColor: swatch.hex }}
            aria-label={`${swatch.name} ${swatch.hex}`}
          />
          <strong>{swatch.name}</strong>
          <span>{swatch.hex}</span>
        </div>
      ))}
    </div>
  );
}

function Badge({ tone, children }: { tone: BadgeTone; children: React.ReactNode }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

function ButtonSample({
  variant,
  disabled = false,
  children,
}: {
  variant: "primary" | "secondary" | "tertiary";
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button className={`button-sample button-${variant}`} disabled={disabled}>
      {children}
      {variant === "tertiary" && <Icon name="chevron" className="h-4 w-4" />}
    </button>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)] px-3 py-3 text-[var(--main-text)] sm:px-4 lg:px-6">
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-3">
        <section className="panel col-span-12 lg:col-span-5 xl:col-span-4">
          <div className="mb-8 flex items-center gap-4">
            <JoojoMark />
            <span className="font-display text-5xl font-bold tracking-normal text-[var(--navy-900)]">
              joojo
            </span>
          </div>
          <h1 className="font-display text-5xl font-bold leading-tight tracking-normal text-[var(--navy-900)] sm:text-6xl">
            Design System
          </h1>
          <p className="mt-4 text-2xl font-bold leading-8 text-[var(--primary-blue)]">
            Learn clearly. Grow confidently.
          </p>
          <p className="mt-10 max-w-sm text-xl leading-9 text-[var(--muted-text)]">
            A unified design language for joojo, a learning platform for
            students mastering technology.
          </p>
          <div className="mt-20 flex gap-7 text-xs font-bold uppercase tracking-[0.14em] text-[var(--muted-text)]">
            <span>Version 1.0</span>
            <span>May 2025</span>
          </div>
        </section>

        <Section number="01" title="Colors" className="col-span-12 lg:col-span-7 xl:col-span-8">
          <div className="mt-7 space-y-9">
            <div>
              <h3 className="mb-5 text-base font-semibold">Primary</h3>
              <ColorSwatches swatches={primarySwatches} />
            </div>
            <div>
              <h3 className="mb-5 text-base font-semibold">Semantic</h3>
              <ColorSwatches swatches={semanticSwatches} />
            </div>
          </div>
        </Section>

        <Section number="02" title="Typography" className="col-span-12 lg:col-span-5">
          <div className="grid gap-10 py-8 sm:grid-cols-[120px_1fr] sm:items-center">
            <div className="font-display text-7xl font-bold leading-none text-[var(--navy-900)]">
              Aa
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold">
                Plus Jakarta Sans <span className="font-sans text-base">(Display)</span>
              </h3>
              <p className="mt-4 text-base text-[var(--muted-text)]">
                Friendly <span className="dot" /> Modern <span className="dot" /> Approachable
              </p>
            </div>
            <div className="text-7xl font-medium leading-none text-[var(--main-text)]">
              Aa
            </div>
            <div>
              <h3 className="text-2xl font-bold">
                Inter <span className="font-normal">(Body)</span>
              </h3>
              <p className="mt-4 text-base text-[var(--muted-text)]">
                Clean <span className="dot" /> Readable <span className="dot" /> Highly Legible
              </p>
            </div>
          </div>
        </Section>

        <Section number="03" title="Type Scale" className="col-span-12 lg:col-span-7">
          <div className="overflow-x-auto">
            <table className="type-table">
              <thead>
                <tr>
                  <th>Style</th>
                  <th>Font</th>
                  <th>Size / Line Height</th>
                  <th>Weight</th>
                  <th>Use</th>
                </tr>
              </thead>
              <tbody>
                {typeScale.map(([style, font, size, weight, use]) => (
                  <tr key={style}>
                    <td className="font-display text-lg font-bold">{style}</td>
                    <td>{font}</td>
                    <td>{size}</td>
                    <td>{weight}</td>
                    <td>{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section number="04" title="Spacing System" className="col-span-12 lg:col-span-6">
          <p className="mt-5 text-base font-semibold">Base unit: 4px</p>
          <div className="mt-16 flex flex-wrap items-end justify-between gap-6">
            {spacing.map(([size, rem]) => (
              <div key={size} className="flex min-w-12 flex-col items-center gap-5">
                <div
                  className="rounded bg-[var(--light-blue)]"
                  style={{
                    width: `${Number(size) / 1.2}px`,
                    height: `${Number(size) / 1.2}px`,
                  }}
                />
                <div className="text-center text-sm font-semibold">
                  {size}
                  <span className="block font-normal">({rem})</span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section number="05" title="Corner Radii & Shadows" className="col-span-12 lg:col-span-6">
          <h3 className="mt-5 text-base font-semibold">Corner Radii</h3>
          <div className="mt-5 grid grid-cols-3 gap-5 sm:grid-cols-6">
            {radii.map(([label, caption], index) => (
              <div key={label} className="flex flex-col items-center gap-4 text-center text-sm">
                <div
                  className="h-13 w-13 border border-[var(--border-strong)] bg-white"
                  style={{
                    borderRadius: index === 5 ? "999px" : `${[4, 8, 12, 16, 24][index]}px`,
                  }}
                />
                <strong>
                  {label}
                  <span className="block font-normal text-[var(--muted-text)]">{caption}</span>
                </strong>
              </div>
            ))}
          </div>
          <h3 className="mt-8 text-base font-semibold">Shadows</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-4">
            {[
              ["Sm", "0 1px 2px 0 rgba(15, 23, 42, 0.05)"],
              ["Md", "0 4px 12px -2px rgba(15, 23, 42, 0.08)"],
              ["Lg", "0 12px 24px -4px rgba(15, 23, 42, 0.10)"],
              ["Xl", "0 20px 40px -8px rgba(15, 23, 42, 0.12)"],
            ].map(([name, value]) => (
              <div key={name} className="shadow-sample">
                <strong>{name}</strong>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section number="06" title="Icons" className="col-span-12 lg:col-span-4">
          <h3 className="mt-5 text-base font-semibold">Outline Style</h3>
          <div className="icon-row">
            {icons.map((icon) => (
              <Icon key={icon} name={icon} />
            ))}
          </div>
          <h3 className="mt-8 text-base font-semibold">Filled Style</h3>
          <div className="icon-row">
            {icons.map((icon) => (
              <Icon key={icon} name={icon} filled />
            ))}
          </div>
          <h3 className="mt-8 text-base font-semibold">Icon Specs</h3>
          <ul className="spec-list">
            <li>24x24px grid</li>
            <li>2px stroke width (outline)</li>
            <li>Rounded line caps</li>
            <li>Consistent optical balance</li>
          </ul>
        </Section>

        <Section number="07" title="Buttons" className="col-span-12 lg:col-span-5">
          <div className="button-grid mt-6">
            <span />
            <span>Primary</span>
            <span>Secondary</span>
            <span>Tertiary</span>
            <span>Default</span>
            <ButtonSample variant="primary">Explore Courses</ButtonSample>
            <ButtonSample variant="secondary">Continue Learning</ButtonSample>
            <ButtonSample variant="tertiary">View Lesson</ButtonSample>
            <span>Hover</span>
            <ButtonSample variant="primary">Explore Courses</ButtonSample>
            <ButtonSample variant="secondary">Continue Learning</ButtonSample>
            <ButtonSample variant="tertiary">View Lesson</ButtonSample>
            <span>Disabled</span>
            <ButtonSample variant="primary" disabled>
              Explore Courses
            </ButtonSample>
            <ButtonSample variant="secondary" disabled>
              Continue Learning
            </ButtonSample>
            <ButtonSample variant="tertiary" disabled>
              View Lesson
            </ButtonSample>
          </div>
          <h3 className="mt-8 text-base font-semibold">Button Specs</h3>
          <ul className="spec-list">
            <li>Height: 44px default</li>
            <li>Padding: 0 16px (lg), 0 12px (md)</li>
            <li>Radius: 8px</li>
            <li>Font: Inter Medium (14-16px)</li>
          </ul>
        </Section>

        <Section number="08" title="Inputs & Dropdowns" className="col-span-12 lg:col-span-3">
          <h3 className="mt-5 text-base font-semibold">Text Input</h3>
          <label className="input-shell mt-4">
            <span className="sr-only">Search anything</span>
            <input aria-label="Search anything" placeholder="Search anything..." />
            <Icon name="search" className="h-5 w-5 text-[var(--muted-text)]" />
          </label>
          <h3 className="mt-6 text-base font-semibold">Dropdown</h3>
          <button className="select-shell mt-4 w-full" type="button">
            <span>Most Relevant</span>
            <Icon name="chevron" className="h-4 w-4 rotate-90" />
          </button>
          <h3 className="mt-6 text-base font-semibold">Field Specs</h3>
          <ul className="spec-list">
            <li>Height: 44px</li>
            <li>Radius: 8px</li>
            <li>Border: 1px solid #CBD5E1</li>
            <li>Padding: 0 16px</li>
            <li>Focus: 2px solid #2563EB</li>
          </ul>
        </Section>

        <Section number="09" title="Badges" className="col-span-12 lg:col-span-4">
          <div className="mt-8 flex flex-wrap gap-4">
            <Badge tone="blue">New</Badge>
            <Badge tone="cyan">Popular</Badge>
            <Badge tone="green">Free</Badge>
            <Badge tone="indigo">Beta</Badge>
            <Badge tone="navy">Certified</Badge>
          </div>
        </Section>

        <Section number="10" title="Learning Status" className="col-span-12 lg:col-span-4">
          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm font-bold">
            <span className="status text-[var(--primary-blue)]">
              <i className="play-dot"><Icon name="play" className="h-3 w-3" filled /></i> In Progress
            </span>
            <span className="status text-[var(--success-green)]">
              <i className="success-dot"><Icon name="check" className="h-3 w-3" /></i> Completed
            </span>
            <span className="status">
              <Icon name="lock" className="h-4 w-4" /> Locked
            </span>
            <span className="status text-[var(--muted-text)]">
              <i className="empty-dot" /> Not Started
            </span>
          </div>
        </Section>

        <Section number="11" title="Progress Bar" className="col-span-12 lg:col-span-4">
          <div className="mt-10 flex items-center gap-9">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--light-blue)]">
              <div className="h-full w-[65%] rounded-full bg-[var(--primary-blue)]" />
            </div>
            <span className="whitespace-nowrap text-base font-medium text-[var(--muted-text)]">
              65% complete
            </span>
          </div>
        </Section>

        <Section number="12" title="Content Cards" className="col-span-12">
          <div className="mt-6 grid gap-10 lg:grid-cols-4">
            <article className="sample-card">
              <div className="card-head">
                <div className="course-logo">
                  <Icon name="code" className="h-7 w-7" />
                </div>
                <Icon name="menu" className="h-5 w-5 text-[var(--muted-text)]" />
              </div>
              <h3>Web Development Fundamentals</h3>
              <p>Build modern websites with HTML, CSS, and JavaScript.</p>
              <div className="card-meta justify-between">
                <Badge tone="blue">Beginner</Badge>
                <Badge tone="blue">12 Lessons</Badge>
              </div>
            </article>

            <article className="sample-card">
              <div className="card-head">
                <div className="media-icon">
                  <Icon name="play" className="h-7 w-7 text-[var(--primary-blue)]" filled />
                </div>
                <div className="flex items-center gap-3 text-[var(--primary-blue)]">
                  <Icon name="bookmark" className="h-5 w-5" />
                  <Icon name="menu" className="h-5 w-5 text-[var(--muted-text)]" />
                </div>
              </div>
              <h3>Project: Responsive Navigation</h3>
              <div className="card-meta justify-between">
                <span>Lesson 5 <span className="mx-2">-</span> 18:45</span>
                <a href="#"><Icon name="play" className="h-4 w-4" /> In Progress</a>
              </div>
            </article>

            <article className="sample-card">
              <div className="card-head">
                <div className="document-icon">
                  <Icon name="file" className="h-7 w-7 text-[var(--cyan-accent)]" />
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="bookmark" className="h-5 w-5 text-[var(--navy-700)]" />
                  <Icon name="menu" className="h-5 w-5 text-[var(--muted-text)]" />
                </div>
              </div>
              <h3>Data Fetching & Caching</h3>
              <div className="card-meta justify-between">
                <span>Lesson 7 <span className="mx-2">-</span> 24 min</span>
                <span className="text-[var(--success-green)]">
                  <Icon name="check" className="h-4 w-4" /> Completed
                </span>
              </div>
            </article>

            <article className="sample-card">
              <div className="resource-file">PDF</div>
              <h3>CSS Grid Cheat Sheet</h3>
              <div className="card-meta justify-between">
                <span>PDF <span className="mx-2">-</span> 1.2 MB</span>
                <a href="#" aria-label="Download resource"><Icon name="download" className="h-5 w-5" /></a>
              </div>
            </article>
          </div>
        </Section>

        <Section number="13" title="Navigation" className="col-span-12">
          <nav className="nav-sample mt-6" aria-label="Design system navigation sample">
            <a href="#" className="brand-link">
              <JoojoMark className="h-9 w-9" /> joojo
            </a>
            <div className="nav-links">
              <a href="#" className="active"><Icon name="target" /> Explore</a>
              <a href="#"><Icon name="book" /> My Learning</a>
              <a href="#"><Icon name="bookmark" /> Bookmarks</a>
            </div>
            <div className="nav-actions">
              <button aria-label="Search" type="button"><Icon name="search" /></button>
              <button aria-label="Notifications" type="button"><Icon name="bell" /></button>
              <button aria-label="Open user menu" className="avatar-button" type="button">
                <span aria-hidden="true">JS</span>
                <Icon name="chevron" className="h-4 w-4 rotate-90" />
              </button>
            </div>
          </nav>
        </Section>

        <Section number="14" title="Design Principles" className="col-span-12">
          <div className="mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {principles.map(([icon, title, copy, tone]) => (
              <article key={title} className="principle">
                <div className={`principle-icon principle-${tone}`}>
                  <Icon name={icon} className="h-12 w-12" />
                </div>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </Section>
      </div>
    </main>
  );
}
