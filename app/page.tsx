import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

type IconName =
  | "arrow"
  | "bell"
  | "bookmark"
  | "book"
  | "clock"
  | "compass"
  | "file"
  | "search"
  | "signal"
  | "sparkle";

type Course = {
  title: string;
  description: string;
  level: string;
  duration: string;
  lessons: string;
  progress: number;
  thumbnail: "code" | "docker" | "typescript";
};

const courses: Course[] = [
  {
    title: "Web Development Fundamentals",
    description: "Build modern, responsive websites with HTML, CSS, and JavaScript.",
    level: "Beginner",
    duration: "12h 24m",
    lessons: "12 lessons",
    progress: 65,
    thumbnail: "code",
  },
  {
    title: "Docker Essentials",
    description: "Containerize applications and streamline your development workflow.",
    level: "Intermediate",
    duration: "10h 12m",
    lessons: "8 lessons",
    progress: 40,
    thumbnail: "docker",
  },
  {
    title: "TypeScript Deep Dive",
    description: "Go beyond the basics and write safer, more expressive code.",
    level: "Intermediate",
    duration: "14h 36m",
    lessons: "10 lessons",
    progress: 30,
    thumbnail: "typescript",
  },
];

function JoojoMark({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 64 64"
      className={className}
      fill="none"
    >
      <path d="M9 10.5 29.5 17v35.5L9 43.5v-33Z" fill="url(#home-joojo-left)" />
      <path d="M55 10.5 35 17v35.5l20-9v-33Z" fill="url(#home-joojo-right)" />
      <path d="M29.5 17H35v35.5h-5.5V17Z" fill="#DBEAFE" />
      <defs>
        <linearGradient
          id="home-joojo-left"
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
          id="home-joojo-right"
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

function Icon({ name, className = "h-6 w-6" }: { name: IconName; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.9"
    >
      {name === "arrow" && <path d="M5 12h14M13 5l7 7-7 7" />}
      {name === "bell" && <path d="M6.5 10.5a5.5 5.5 0 0 1 11 0v4.4l1.4 2.1H5.1l1.4-2.1v-4.4ZM10 20h4" />}
      {name === "bookmark" && <path d="M7 4h10v16l-5-3.2L7 20V4Z" />}
      {name === "book" && <path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 0-3-3V4ZM5 17V4" />}
      {name === "clock" && <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7.5V12l3 2" />}
      {name === "compass" && (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="m15.5 8.5-2.1 4.9-4.9 2.1 2.1-4.9 4.9-2.1Z" />
        </>
      )}
      {name === "file" && <path d="M7 3.5h6l4 4V20H7V3.5ZM13 3.5V8h4M9.5 12h5M9.5 15.5h5" />}
      {name === "search" && <path d="m20 20-4.2-4.2M18 11a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />}
      {name === "signal" && <path d="M5 19v-3M9.5 19v-6M14 19v-9M18.5 19V6" />}
      {name === "sparkle" && <path d="M12 3.5 14.4 9l5.6 2.4-5.6 2.2L12 20l-2.4-6.4L4 11.4 9.6 9 12 3.5Z" />}
    </svg>
  );
}

function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-[7%] top-10 h-[400px] w-[43%] rounded-[0_0_84%_0] bg-[#eef6ff] opacity-80" />
      <div className="absolute right-[7%] top-10 h-[400px] w-[43%] rounded-[0_0_0_84%] bg-[#eef6ff] opacity-80" />
      <div className="absolute left-[7%] top-[370px] h-24 w-[43%] rounded-br-[100%] bg-white shadow-[inset_-12px_24px_50px_rgba(37,99,235,0.07)]" />
      <div className="absolute right-[7%] top-[370px] h-24 w-[43%] rounded-bl-[100%] bg-white shadow-[inset_12px_24px_50px_rgba(37,99,235,0.07)]" />
      <svg className="absolute inset-0 h-full w-full text-[#bfdbfe]" fill="none" viewBox="0 0 1024 650">
        <path d="M0 165c58-53 116-21 143 81 36 137 99 219 183 200" stroke="currentColor" strokeDasharray="5 7" opacity=".7" />
        <path d="M1024 186c-93-33-171 29-183 133-14 115-57 171-128 186" stroke="currentColor" strokeDasharray="5 7" opacity=".62" />
        <path d="M770 322c80-20 133-21 175-3" stroke="currentColor" strokeDasharray="5 7" opacity=".42" />
        <circle cx="69" cy="137" r="9" fill="#dbeafe" />
        <circle cx="222" cy="435" r="9" fill="#dbeafe" />
        <circle cx="947" cy="318" r="9" fill="#dbeafe" />
      </svg>
    </div>
  );
}

function CodeThumbnail() {
  return (
    <div className="relative h-full overflow-hidden rounded-[8px] bg-[#061a3a] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_20%,rgba(37,99,235,0.4),transparent_34%),linear-gradient(135deg,#123b77,#06142d_58%)]" />
      <div className="absolute left-0 top-0 h-full w-[18%] bg-[#0b274d]/85" />
      <div className="absolute left-4 top-4 flex gap-2">
        <span className="h-2 w-2 rounded-full bg-[#fb923c]" />
        <span className="h-2 w-2 rounded-full bg-[#94a3b8]" />
        <span className="h-2 w-2 rounded-full bg-[#64748b]" />
      </div>
      <div className="absolute left-4 top-11 space-y-3">
        <span className="block h-1.5 w-7 rounded-full bg-[#94a3b8]/70" />
        <span className="block h-1.5 w-10 rounded-full bg-[#94a3b8]/35" />
        <span className="block h-1.5 w-5 rounded-full bg-[#94a3b8]/50" />
      </div>
      <div className="absolute left-[23%] top-[31%] font-mono text-[48px] font-bold tracking-normal text-white">
        &lt;/&gt;
      </div>
      <div className="absolute right-6 top-10 grid grid-cols-[7px_1fr] gap-x-3 gap-y-3">
        {Array.from({ length: 8 }).map((_, index) => (
          <span
            key={index}
            className={index % 2 === 0 ? "h-1.5 w-1.5 rounded-full bg-[#3b82f6]" : "h-1.5 w-16 rounded-full bg-[#60a5fa]/35"}
          />
        ))}
      </div>
      <div className="absolute bottom-10 left-[28%] space-y-3">
        <span className="block h-1.5 w-28 rounded-full bg-[#94a3b8]/45" />
        <span className="block h-1.5 w-36 rounded-full bg-[#94a3b8]/32" />
        <span className="block h-1.5 w-24 rounded-full bg-[#94a3b8]/40" />
      </div>
    </div>
  );
}

function DockerThumbnail() {
  return (
    <div className="relative h-full overflow-hidden rounded-[8px] bg-[#eaf5ff]">
      <div className="absolute inset-x-0 bottom-0 h-[30%] bg-[#cce7ff]" />
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox="0 0 300 184" fill="none">
        <path d="M0 133c32-12 58 4 88 0 39-6 48-18 89-5 48 16 73-13 123-2v58H0v-51Z" fill="#dbeafe" />
        <path d="M67 105h112c-4 30-27 48-61 48-28 0-48-14-60-39H36c9-10 19-13 31-9Z" fill="#1d75d8" />
        <path d="M196 82c12 3 18 13 18 29 18-8 34-4 48 9-15 7-31 9-48 5-6 18-19 27-38 29 13-12 20-29 20-51V82Z" fill="#1d75d8" />
        <circle cx="103" cy="121" r="4" fill="white" />
        {[
          [74, 79],
          [96, 79],
          [118, 79],
          [140, 79],
          [162, 79],
          [96, 58],
          [118, 58],
          [140, 58],
          [118, 37],
          [140, 37],
        ].map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="18" height="18" fill="#2f8ee8" stroke="#0952a4" strokeWidth="2" />
        ))}
      </svg>
    </div>
  );
}

function TypeScriptThumbnail() {
  return (
    <div className="relative h-full overflow-hidden rounded-[8px] bg-[#155bd7] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_50%,rgba(96,165,250,0.58),transparent_24%),linear-gradient(135deg,#2563eb,#1d4ed8)]" />
      <div className="absolute left-8 top-10 grid h-24 w-24 place-items-center rounded-[8px] bg-white/12 text-[42px] font-extrabold tracking-normal">
        TS
      </div>
      <div className="absolute right-10 top-9 grid grid-cols-[5px_1fr] gap-x-5 gap-y-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <span
            key={index}
            className={index % 2 === 0 ? "h-1.5 w-1.5 rounded-full bg-[#93c5fd]" : "h-1.5 w-24 rounded-full bg-[#93c5fd]/36"}
          />
        ))}
      </div>
    </div>
  );
}

function CourseThumbnail({ type }: { type: Course["thumbnail"] }) {
  return (
    <div className="h-[160px] w-full">
      {type === "code" && <CodeThumbnail />}
      {type === "docker" && <DockerThumbnail />}
      {type === "typescript" && <TypeScriptThumbnail />}
    </div>
  );
}

function CourseCard({ course }: { course: Course }) {
  return (
    <article className="flex min-h-[478px] flex-col rounded-[14px] border border-[#e2e8f0] bg-white p-6 shadow-[0_18px_48px_-38px_rgba(15,23,42,0.5)]">
      <CourseThumbnail type={course.thumbnail} />
      <div className="mt-6 flex flex-1 flex-col">
        <h3 className="font-display text-[21px] font-bold leading-[1.25] tracking-normal text-[#071124]">
          {course.title}
        </h3>
        <p className="mt-4 text-[15px] leading-6 text-[#43516b]">{course.description}</p>
        <div className="mt-auto pt-7">
          <div className="flex items-center gap-4">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#d8dee8]">
              <div className="h-full rounded-full bg-[#2563eb]" style={{ width: `${course.progress}%` }} />
            </div>
            <span className="min-w-11 text-right text-[14px] font-medium text-[#2563eb]">
              {course.progress}%
            </span>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-3 text-[12px] font-medium text-[#334155]">
            <span className="inline-flex items-center gap-2">
              <Icon name="signal" className="h-4 w-4" />
              {course.level}
            </span>
            <span className="inline-flex items-center gap-2">
              <Icon name="clock" className="h-4 w-4" />
              {course.duration}
            </span>
            <span className="inline-flex items-center gap-2">
              <Icon name="file" className="h-4 w-4" />
              {course.lessons}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fbfdff] text-[#071124]">
      <header className="border-b border-[#e5eaf2] bg-white/95">
        <nav className="mx-auto flex h-[86px] max-w-[1440px] items-center justify-between gap-5 px-11 max-md:h-auto max-md:flex-wrap max-md:px-5 max-md:py-5">
          <Link href="/" className="flex items-center gap-3" aria-label="joojo home">
            <JoojoMark className="h-10 w-10" />
            <span className="font-display text-[28px] font-extrabold tracking-normal text-[#071124]">joojo ai</span>
          </Link>
          <div className="flex flex-1 items-center justify-center gap-10 text-[16px] font-medium text-[#071124] max-md:order-3 max-md:w-full max-md:justify-start max-md:gap-6 max-md:overflow-x-auto">
            <Link href="/design-system" className="inline-flex items-center gap-3 whitespace-nowrap transition-colors hover:text-[#2563eb] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563eb]">
              <Icon name="compass" className="h-6 w-6" />
              Explore
            </Link>
            <Link href="/design-system" className="inline-flex items-center gap-3 whitespace-nowrap transition-colors hover:text-[#2563eb] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563eb]">
              <Icon name="book" className="h-6 w-6" />
              My Learning
            </Link>
            <Link href="/design-system" className="inline-flex items-center gap-3 whitespace-nowrap transition-colors hover:text-[#2563eb] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563eb]">
              <Icon name="bookmark" className="h-6 w-6" />
              Bookmarks
            </Link>
          </div>
          <div className="flex items-center gap-7">
            <button type="button" className="grid h-9 w-9 place-items-center rounded-[8px] text-[#071124] transition-colors hover:bg-[#f1f5f9] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#2563eb]" aria-label="Search">
              <Icon name="search" className="h-6 w-6" />
            </button>
            <button type="button" className="grid h-9 w-9 place-items-center rounded-[8px] text-[#071124] transition-colors hover:bg-[#f1f5f9] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#2563eb]" aria-label="Notifications">
              <Icon name="bell" className="h-6 w-6" />
            </button>
            <Show when="signed-out">
              <div className="flex items-center gap-3">
                <SignInButton mode="redirect">
                  <button
                    type="button"
                    className="h-10 rounded-[8px] px-3 text-[14px] font-semibold text-[#071124] transition-colors hover:bg-[#f1f5f9] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#2563eb]"
                  >
                    Sign in
                  </button>
                </SignInButton>
                <SignUpButton mode="redirect">
                  <button
                    type="button"
                    className="h-10 rounded-[8px] bg-[#071f55] px-4 text-[14px] font-semibold text-white transition-colors hover:bg-[#0b2b70] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#2563eb]"
                  >
                    Sign up
                  </button>
                </SignUpButton>
              </div>
            </Show>
            <Show when="signed-in">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-10 w-10",
                  },
                }}
              />
            </Show>
          </div>
        </nav>
      </header>

      <section className="relative min-h-[620px] overflow-hidden border-b border-[#e5eaf2]">
        <HeroBackdrop />
        <div className="relative z-10 mx-auto flex max-w-[1440px] flex-col items-center px-11 pt-[70px] text-center max-md:px-5 max-md:pt-14">
          <span className="rounded-full border border-[#bfdbfe] bg-[#eff6ff]/80 px-6 py-2.5 text-[13px] font-extrabold uppercase tracking-[0.16em] text-[#2563eb]">
            Learn your way
          </span>
          <h1 className="mt-8 max-w-[620px] font-display text-[54px] font-extrabold leading-[1.16] tracking-normal text-[#071124] max-md:text-[44px] max-sm:text-[36px]">
            Find exactly what you need to learn.
          </h1>
          <p className="mt-5 max-w-[500px] text-[20px] leading-[1.45] text-[#46546d] max-sm:text-[18px]">
            joojo understands your goals and finds the right lessons across all your courses.
          </p>
          <Link href="/design-system" className="mt-9 inline-flex h-[56px] items-center gap-5 rounded-[8px] bg-[#071f55] px-7 text-[17px] font-semibold !text-white shadow-[0_14px_34px_-22px_rgba(7,31,85,0.65)] transition-colors hover:bg-[#0b2b70] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563eb]">
            Explore Courses
            <Icon name="arrow" className="h-6 w-6 text-white" />
          </Link>
          <label className="mt-12 flex h-20 w-full max-w-[760px] items-center gap-5 rounded-[12px] border border-[#cdd6e3] bg-white/92 px-7 text-left shadow-[0_18px_54px_-38px_rgba(15,23,42,0.45)] focus-within:border-[#2563eb] focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#bfdbfe] max-sm:h-20 max-sm:px-5">
            <Icon name="search" className="h-8 w-8 flex-none text-[#334155] max-sm:h-7 max-sm:w-7" />
            <span className="sr-only">Ask anything about your learning</span>
            <input
              className="min-w-0 flex-1 border-0 bg-transparent text-[18px] text-[#071124] outline-none placeholder:text-[#64748b] max-sm:text-[16px]"
              placeholder="Ask anything about your learning..."
            />
            <kbd className="inline-flex h-10 min-w-16 items-center justify-center rounded-[8px] border border-[#cdd6e3] bg-white px-4 text-[17px] font-medium text-[#334155] shadow-sm max-sm:hidden">
              ⌘ K
            </kbd>
          </label>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-[54px] pb-20 pt-10 max-md:px-5">
        <div className="flex items-center justify-between gap-6">
          <h2 className="font-display text-[24px] font-bold tracking-normal text-[#071124]">
            Recommended for you
          </h2>
          <Link href="/design-system" className="inline-flex items-center gap-3 whitespace-nowrap text-[16px] font-semibold text-[#2563eb] transition-colors hover:text-[#1d4ed8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563eb]">
            View all courses
            <Icon name="arrow" className="h-5 w-5" />
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
          {courses.map((course) => (
            <CourseCard key={course.title} course={course} />
          ))}
        </div>
        <div className="mx-auto mt-[90px] flex max-w-[890px] items-center gap-5 text-center text-[22px] text-[#25324a] max-sm:mt-14 max-sm:text-[17px]">
          <span className="h-px flex-1 bg-[#bfdbfe]" />
          <span className="grid h-11 w-11 flex-none place-items-center rounded-full border-2 border-[#22c55e] text-[#22c55e]">
            <Icon name="sparkle" className="h-6 w-6" />
          </span>
          <p className="shrink text-balance">New courses and lessons added every week.</p>
          <span className="h-px flex-1 bg-[#bfdbfe]" />
        </div>
      </section>
    </main>
  );
}
