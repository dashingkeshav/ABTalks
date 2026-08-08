import { useState } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

/* =========================================================
   DATA
========================================================= */

const TOTAL_DAYS = 60;

const challenge = {
  day: 12,
  title: "Build a responsive navigation bar",
  description:
    "Create a responsive navigation component that works beautifully across mobile and desktop.",
  track: "Frontend Development",
  difficulty: "Intermediate",
  time: "45 min",
};

const requirements = [
  "Responsive across mobile and desktop",
  "Mobile menu interaction",
  "Clear active navigation state",
  "Keyboard accessible",
  "Clean visual hierarchy",
];

const leaderboard = [
  {
    rank: "01",
    initials: "RK",
    name: "Riya Kapoor",
    track: "Full Stack",
    days: 27,
    streak: 12,
  },
  {
    rank: "02",
    initials: "AS",
    name: "Aditya Shah",
    track: "AI / ML",
    days: 24,
    streak: 9,
  },
  {
    rank: "03",
    initials: "AB",
    name: "You",
    track: "Frontend",
    days: 18,
    streak: 4,
    you: true,
  },
  {
    rank: "04",
    initials: "NV",
    name: "Nisha Verma",
    track: "Backend",
    days: 16,
    streak: 6,
  },
];

const tracks = [
  {
    id: "frontend",
    icon: "◈",
    title: "Frontend Development",
    description:
      "Build beautiful, responsive and interactive web experiences.",
    skills: "React · JavaScript · CSS",
  },
  {
    id: "backend",
    icon: "⌘",
    title: "Backend Development",
    description:
      "Build APIs, databases and scalable server-side systems.",
    skills: "Node.js · APIs · Databases",
  },
  {
    id: "ai",
    icon: "✦",
    title: "AI / Machine Learning",
    description:
      "Build intelligent products using data and machine learning.",
    skills: "Python · ML · AI",
  },
  {
    id: "data",
    icon: "▦",
    title: "Data Science",
    description:
      "Turn data into insights, visualizations and decisions.",
    skills: "Python · SQL · Analytics",
  },
  {
    id: "mobile",
    icon: "▯",
    title: "Mobile Development",
    description:
      "Create useful mobile applications people want to use.",
    skills: "React Native · Flutter",
  },
  {
    id: "design",
    icon: "✎",
    title: "UI/UX + Web Design",
    description:
      "Design interfaces that are beautiful, clear and useful.",
    skills: "Figma · UX · Design",
  },
];

/* =========================================================
   STORAGE HELPERS
========================================================= */

function getStoredNumber(key, fallback) {
  const value = Number(localStorage.getItem(key));

  return Number.isFinite(value) && value >= 0
    ? value
    : fallback;
}

function getCompletedDays() {
  return getStoredNumber("abtalks-completed-days", 18);
}

function getStreak() {
  return getStoredNumber("abtalks-streak", 4);
}

function saveProgress(completedDays, streak) {
  localStorage.setItem(
    "abtalks-completed-days",
    String(completedDays)
  );

  localStorage.setItem(
    "abtalks-streak",
    String(streak)
  );
}

function getSelectedTrack() {
  return localStorage.getItem("abtalks-track") || "frontend";
}

function getCompletedChallenges() {
  try {
    const saved = JSON.parse(
      localStorage.getItem(
        "abtalks-completed-challenges"
      ) || "[]"
    );

    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function saveCompletedChallenges(days) {
  localStorage.setItem(
    "abtalks-completed-challenges",
    JSON.stringify(days)
  );
}

/* =========================================================
   SHARED COMPONENTS
========================================================= */

function Logo() {
  return (
    <Link to="/" className="logo">
      <span className="logo-mark">A</span>
      <span>ABTalks</span>
    </Link>
  );
}

function Header() {
  const location = useLocation();

  return (
    <header className="site-header">
      <Logo />

      <nav className="desktop-nav">
        <Link
          to="/"
          className={
            location.pathname === "/" ? "active" : ""
          }
        >
          Home
        </Link>

        <Link
          to="/dashboard"
          className={
            location.pathname === "/dashboard"
              ? "active"
              : ""
          }
        >
          Dashboard
        </Link>

        <Link
          to="/challenge"
          className={
            location.pathname === "/challenge"
              ? "active"
              : ""
          }
        >
          Challenge
        </Link>
      </nav>

      <Link to="/dashboard" className="header-button">
        Enter
      </Link>
    </header>
  );
}

function MobileNav() {
  const location = useLocation();

  return (
    <nav className="bottom-nav">
      <Link
        to="/"
        className={
          location.pathname === "/" ? "selected" : ""
        }
      >
        <span>⌂</span>
        <small>Home</small>
      </Link>

      <Link
        to="/challenge"
        className={
          location.pathname === "/challenge"
            ? "selected"
            : ""
        }
      >
        <span>◈</span>
        <small>Challenge</small>
      </Link>

      <Link
        to="/dashboard"
        className={
          location.pathname === "/dashboard"
            ? "selected"
            : ""
        }
      >
        <span>↗</span>
        <small>Progress</small>
      </Link>

      <Link
        to="/tracks"
        className={
          location.pathname === "/tracks"
            ? "selected"
            : ""
        }
      >
        <span>○</span>
        <small>Track</small>
      </Link>
    </nav>
  );
}

function Button({
  to,
  children,
  secondary = false,
  onClick,
  type = "button",
  disabled = false,
}) {
  const className = `button ${
    secondary
      ? "button-secondary"
      : "button-primary"
  }`;

  if (to) {
    return (
      <Link to={to} className={className}>
        {children}

        {!secondary && (
          <span className="arrow">→</span>
        )}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {children}

      {!secondary && (
        <span className="arrow">→</span>
      )}
    </button>
  );
}

function ProgressBar({ value }) {
  const safeValue = Math.max(
    0,
    Math.min(100, Number(value) || 0)
  );

  return (
    <div className="progress-track">
      <div
        className="progress-fill"
        style={{
          width: `${safeValue}%`,
        }}
      />
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <span className="eyebrow">{children}</span>
  );
}

/* =========================================================
   HOME
========================================================= */

function Home() {
  const completedDays = getCompletedDays();

  const progress = Math.min(
    Math.round(
      (completedDays / TOTAL_DAYS) * 100
    ),
    100
  );

  return (
    <>
      <Header />

      <main>
        <section className="hero container">
          <div className="hero-badge">
            <span className="pulse-dot" />
            60-DAY CODING CHALLENGE
          </div>

          <h1>
            Build for 60 days.
            <br />
            <span>Become hard to ignore.</span>
          </h1>

          <p className="hero-copy">
            A daily coding challenge for college
            students who want to build consistently,
            create real projects, and turn their
            progress into public proof of work.
          </p>

          <div className="hero-actions">
            <Button to="/tracks">
              {completedDays > 0
                ? "Continue Building"
                : "Start the 60-Day Challenge"}
            </Button>

            <Button
              to="/challenge"
              secondary
            >
              See today's challenge
            </Button>
          </div>

          <div className="hero-progress-card">
            <div className="hero-progress-top">
              <div>
                <SectionLabel>
                  YOUR JOURNEY
                </SectionLabel>

                <strong>
                  DAY{" "}
                  {Math.min(
                    completedDays,
                    TOTAL_DAYS
                  )}{" "}
                  / {TOTAL_DAYS}
                </strong>
              </div>

              <strong className="hero-progress-percent">
                {progress}%
              </strong>
            </div>

            <ProgressBar value={progress} />

            <div className="hero-progress-bottom">
              <span>
                {completedDays} days completed
              </span>

              <span>
                {Math.max(
                  TOTAL_DAYS - completedDays,
                  0
                )}{" "}
                days remaining
              </span>
            </div>
          </div>
        </section>

        <section className="section container">
          <SectionLabel>
            WHY ABTALKS
          </SectionLabel>

          <h2>
            One challenge.
            <br />
            <span>60 days. Real proof.</span>
          </h2>

          <p className="section-intro">
            Build something every day. Share what
            you built. Create a public record of
            your progress.
          </p>

          <div className="three-cards">
            <InfoCard
              number="01"
              title="Build"
              text="One focused coding challenge every day."
            />

            <InfoCard
              number="02"
              title="Prove"
              text="Submit your GitHub work and LinkedIn post."
            />

            <InfoCard
              number="03"
              title="Grow"
              text="Turn consistency into projects, confidence, and visibility."
            />
          </div>
        </section>

        <section
          className="section container"
          id="how-it-works"
        >
          <SectionLabel>
            HOW IT WORKS
          </SectionLabel>

          <h2>
            Your 60-day
            <br />
            <span>journey.</span>
          </h2>

          <div className="journey">
            <JourneyStep
              number="01"
              title="Pick your track"
              text="Choose what you want to build and improve."
            />

            <JourneyStep
              number="02"
              title="Build every day"
              text="Complete one focused challenge at a time."
            />

            <JourneyStep
              number="03"
              title="Show your work"
              text="Submit GitHub and LinkedIn proof."
            />

            <JourneyStep
              number="04"
              title="Finish stronger"
              text="Walk away with 60 days of visible progress."
            />
          </div>
        </section>

        <section className="section container">
          <SectionLabel>
            CHALLENGE PREVIEW
          </SectionLabel>

          <div className="preview-card">
            <div className="preview-top">
              <div>
                <SectionLabel>
                  DAY {challenge.day}
                </SectionLabel>

                <h3>{challenge.title}</h3>
              </div>

              <span className="difficulty">
                {challenge.difficulty}
              </span>
            </div>

            <p>{challenge.description}</p>

            <div className="challenge-meta">
              <span>
                ⌁ {challenge.track}
              </span>

              <span>
                ◷ {challenge.time}
              </span>
            </div>

            <div className="mini-checklist">
              {requirements
                .slice(0, 4)
                .map((item) => (
                  <span key={item}>
                    ✓ {item}
                  </span>
                ))}
            </div>

            <Button to="/challenge">
              Open today's challenge
            </Button>
          </div>
        </section>

        <section className="quote-section">
          <div className="container">
            <div className="quote-mark">
              “
            </div>

            <h2>
              You don't need to be
              <br />
              <span>the best developer.</span>
              <br />
              You need to keep building.
            </h2>

            <p>
              One missed day shouldn't erase the
              work you've already done. ABTalks is
              designed around progress, not
              perfection.
            </p>
          </div>
        </section>

        <section className="final-cta container">
          <div className="final-cta-card">
            <SectionLabel>
              YOUR NEXT DAY STARTS NOW
            </SectionLabel>

            <h2>
              60 days from now,
              <br />
              <span>you'll have proof.</span>
            </h2>

            <p>
              Not just a streak. Real projects,
              public progress, and a stronger
              builder identity.
            </p>

            <Button to="/tracks">
              Start Building
            </Button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <Logo />

          <span>
            60 days of building.
          </span>
        </div>
      </footer>
    </>
  );
}

function InfoCard({
  number,
  title,
  text,
}) {
  return (
    <div className="info-card">
      <span className="card-number">
        {number}
      </span>

      <h3>{title}</h3>

      <p>{text}</p>
    </div>
  );
}

function JourneyStep({
  number,
  title,
  text,
}) {
  return (
    <div className="journey-step">
      <div className="journey-number">
        {number}
      </div>

      <div>
        <h3>{title}</h3>

        <p>{text}</p>
      </div>
    </div>
  );
}

/* =========================================================
   TRACK SELECTION
========================================================= */

function TrackSelection() {
  const navigate = useNavigate();

  const [selectedTrack, setSelectedTrack] =
    useState(getSelectedTrack());

  function handleContinue() {
    if (!selectedTrack) {
      return;
    }

    localStorage.setItem(
      "abtalks-track",
      selectedTrack
    );

    navigate("/dashboard");
  }

  return (
    <>
      <Header />

      <main className="track-page">
        <div className="track-container">
          <div className="track-intro">
            <SectionLabel>
              STEP 01 / 02
            </SectionLabel>

            <h1>
              What do you want
              <br />
              <span>to build?</span>
            </h1>

            <p>
              Choose the track that matches what
              you want to improve over the next 60
              days.
            </p>
          </div>

          <div className="track-grid">
            {tracks.map((track) => (
              <button
                key={track.id}
                type="button"
                className={`track-card ${
                  selectedTrack === track.id
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setSelectedTrack(track.id)
                }
              >
                <div className="track-card-top">
                  <span className="track-icon">
                    {track.icon}
                  </span>

                  {selectedTrack ===
                    track.id && (
                    <span className="track-check">
                      ✓
                    </span>
                  )}
                </div>

                <h2>{track.title}</h2>

                <p>
                  {track.description}
                </p>

                <small>
                  {track.skills}
                </small>
              </button>
            ))}
          </div>

          <div className="track-bottom">
            <span>
              {selectedTrack
                ? "Track selected ✓"
                : "Select a track to continue"}
            </span>

            <button
              type="button"
              className="button button-primary"
              disabled={!selectedTrack}
              onClick={handleContinue}
            >
              Continue
              <span className="arrow">
                →
              </span>
            </button>
          </div>
        </div>
      </main>

      <MobileNav />
    </>
  );
}

/* =========================================================
   DASHBOARD
========================================================= */

function Dashboard() {
  const trackId = getSelectedTrack();

  const selectedTrack =
    tracks.find(
      (track) => track.id === trackId
    ) || tracks[0];

  const completedDays = getCompletedDays();
  const streak = getStreak();

  const progress = Math.min(
    Math.round(
      (completedDays / TOTAL_DAYS) * 100
    ),
    100
  );

  const nextDay = Math.min(
    completedDays + 1,
    TOTAL_DAYS
  );

  const standing = Math.min(
    95,
    Math.max(50, 50 + progress)
  );

  return (
    <>
      <Header />

      <main className="dashboard-page">
        <div className="container dashboard-container">
          <div className="dashboard-heading">
            <SectionLabel>
              YOUR BUILDER SPACE
            </SectionLabel>

            <h1>
              Good evening,
              <br />
              <span>Builder 👋</span>
            </h1>

            <p>
              {selectedTrack.title} · Day{" "}
              {completedDays} of {TOTAL_DAYS}
            </p>
          </div>

          <section className="momentum-card">
            <div className="momentum-icon">
              🔥
            </div>

            <div className="momentum-content">
              <SectionLabel>
                YOUR MOMENTUM
              </SectionLabel>

              <div className="momentum-number">
                {streak} day streak
              </div>

              <p>
                You're building consistently.
              </p>

              <div className="momentum-meta">
                <span>
                  Longest streak:{" "}
                  {Math.max(streak, 8)}
                </span>

                <span>
                  Challenges: {completedDays}/60
                </span>
              </div>
            </div>
          </section>

          <section className="today-card">
            <div className="today-header">
              <div>
                <SectionLabel>
                  TODAY'S MISSION
                </SectionLabel>

                <span className="day-pill">
                  DAY {nextDay}
                </span>
              </div>

              <span className="difficulty">
                {challenge.difficulty}
              </span>
            </div>

            <h2>{challenge.title}</h2>

            <p>{challenge.description}</p>

            <div className="challenge-meta">
              <span>
                ⌁ {selectedTrack.title}
              </span>

              <span>
                ◷ {challenge.time}
              </span>
            </div>

            <Button to="/challenge">
              Start today's challenge
            </Button>
          </section>

          <section className="dashboard-section">
            <div className="section-heading-row">
              <div>
                <SectionLabel>
                  YOUR JOURNEY
                </SectionLabel>

                <h2>
                  {completedDays} /{" "}
                  {TOTAL_DAYS} days
                </h2>
              </div>

              <strong className="progress-percent">
                {progress}%
              </strong>
            </div>

            <ProgressBar value={progress} />

            <div className="progress-details">
              <span>
                {completedDays} completed
              </span>

              <span>
                {Math.max(
                  TOTAL_DAYS - completedDays,
                  0
                )}{" "}
                remaining
              </span>
            </div>
          </section>

          <StreakCalendar />

          <section className="dashboard-section">
            <SectionLabel>
              ACHIEVEMENTS
            </SectionLabel>

            <h2 className="dashboard-subtitle">
              Your milestones
            </h2>

            <div className="achievement-grid">
              <Achievement
                icon="🔥"
                number={streak}
                label="day streak"
              />

              <Achievement
                icon="🚀"
                number={Math.max(
                  1,
                  Math.floor(
                    completedDays / 6
                  )
                )}
                label="projects shipped"
              />

              <Achievement
                icon="💼"
                number={completedDays}
                label="proof posts"
              />

              <Achievement
                icon="🏆"
                number={`${Math.min(
                  99,
                  Math.max(
                    18,
                    progress + 5
                  )
                )}%`}
                label="top standing"
              />
            </div>
          </section>

          <section className="standing-card">
            <div>
              <SectionLabel>
                YOUR STANDING
              </SectionLabel>

              <h2>
                You're ahead {standing}% of
                builders this week.
              </h2>

              <p>
                Keep your momentum going to
                climb higher.
              </p>
            </div>

            <div className="standing-circle">
              <strong>{standing}</strong>
              <span>%</span>
            </div>
          </section>

          <section className="dashboard-section">
            <div className="leaderboard-heading">
              <div>
                <SectionLabel>
                  COMMUNITY
                </SectionLabel>

                <h2 className="dashboard-subtitle">
                  Builder leaderboard
                </h2>
              </div>

              <span>THIS WEEK</span>
            </div>

            <div className="leaderboard-card">
              {leaderboard.map(
                (person) => (
                  <LeaderboardRow
                    key={person.rank}
                    person={person}
                  />
                )
              )}
            </div>
          </section>

          <section className="dashboard-section">
            <SectionLabel>
              YOUR BUILD LOG
            </SectionLabel>

            <h2 className="dashboard-subtitle">
              Recent activity
            </h2>

            <div className="build-log">
              <LogItem
                day={Math.max(
                  1,
                  completedDays - 2
                )}
                title="Build a reusable card component"
                status="completed"
                text="GitHub + LinkedIn submitted"
              />

              <LogItem
                day={Math.max(
                  1,
                  completedDays - 1
                )}
                title="Create accessible form validation"
                status="completed"
                text="GitHub + LinkedIn submitted"
              />

              <LogItem
                day={nextDay}
                title={challenge.title}
                status="current"
                text="Today's challenge"
              />

              <LogItem
                day={Math.min(
                  nextDay + 1,
                  TOTAL_DAYS
                )}
                title="Next challenge"
                status="locked"
                text="Locked until tomorrow"
              />
            </div>
          </section>
        </div>
      </main>

      <MobileNav />
    </>
  );
}

/* =========================================================
   STREAK CALENDAR
========================================================= */

function StreakCalendar() {
  const completedDays = getCompletedDays();

  const [selected, setSelected] =
    useState(
      Math.min(
        Math.max(completedDays, 1),
        14
      )
    );

  const days = Array.from(
    { length: 14 },
    (_, index) => index + 1
  );

  function getStatus(day) {
    if (day === completedDays + 1) {
      return "today";
    }

    if (day > completedDays + 1) {
      return "locked";
    }

    if (
      day === 7 &&
      completedDays >= 7
    ) {
      return "missed";
    }

    return "complete";
  }

  return (
    <section className="dashboard-section">
      <div className="streak-calendar">
        <div className="calendar-header">
          <div>
            <SectionLabel>
              BUILDING CONSISTENCY
            </SectionLabel>

            <h2>60-day progress</h2>
          </div>

          <div className="calendar-streak">
            <strong>
              🔥 {getStreak()}
            </strong>

            <span>current streak</span>
          </div>
        </div>

        <div className="calendar-grid">
          {days.map((day) => (
            <button
              key={day}
              type="button"
              onClick={() =>
                setSelected(day)
              }
              className={`calendar-day ${getStatus(
                day
              )} ${
                selected === day
                  ? "selected"
                  : ""
              }`}
            >
              <span>{day}</span>
            </button>
          ))}
        </div>

        <div className="calendar-legend">
          <span>
            <i className="legend-dot complete" />
            Complete
          </span>

          <span>
            <i className="legend-dot missed" />
            Missed
          </span>

          <span>
            <i className="legend-dot today" />
            Today
          </span>
        </div>

        {selected === 7 &&
          completedDays >= 7 && (
            <div className="recovery-message">
              <span>↻</span>

              <div>
                <strong>
                  Missed Day 7?
                </strong>

                <p>
                  That's okay. Your previous
                  progress still counts. Keep
                  building today.
                </p>
              </div>
            </div>
          )}

        {selected !== 7 && (
          <div className="calendar-detail">
            <strong>
              Day {selected}
            </strong>

            <span>
              {selected <= completedDays
                ? "Challenge completed ✓"
                : selected ===
                  completedDays + 1
                ? "Today's challenge"
                : "Challenge unlocks soon"}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}

/* =========================================================
   LEADERBOARD
========================================================= */

function LeaderboardRow({ person }) {
  return (
    <div
      className={`leaderboard-row ${
        person.you ? "you" : ""
      }`}
    >
      <span className="leaderboard-rank">
        {person.rank}
      </span>

      <div className="leaderboard-avatar">
        {person.initials}
      </div>

      <div className="leaderboard-person">
        <strong>
          {person.name}{" "}
          {person.you && (
            <span>(you)</span>
          )}
        </strong>

        <small>{person.track}</small>
      </div>

      <div className="leaderboard-stat">
        <strong>{person.days}</strong>
        <small>days</small>
      </div>

      <div className="leaderboard-stat streak">
        <strong>
          🔥 {person.streak}
        </strong>

        <small>streak</small>
      </div>
    </div>
  );
}

function Achievement({
  icon,
  number,
  label,
}) {
  return (
    <div className="achievement">
      <span>{icon}</span>

      <strong>{number}</strong>

      <small>{label}</small>
    </div>
  );
}

function LogItem({
  day,
  title,
  status,
  text,
}) {
  return (
    <div
      className={`log-item ${status}`}
    >
      <div className="log-icon">
        {status === "completed"
          ? "✓"
          : status === "current"
          ? "→"
          : "○"}
      </div>

      <div>
        <span className="log-day">
          DAY {day}
        </span>

        <strong>{title}</strong>

        <small>{text}</small>
      </div>
    </div>
  );
}

/* =========================================================
   CHALLENGE PAGE
========================================================= */

function ChallengePage() {
  const navigate = useNavigate();

  const [github, setGithub] =
    useState(
      () =>
        localStorage.getItem(
          "abtalks-github"
        ) || ""
    );

  const [linkedin, setLinkedin] =
    useState(
      () =>
        localStorage.getItem(
          "abtalks-linkedin"
        ) || ""
    );

  const [checked, setChecked] =
    useState([]);

  const [error, setError] =
    useState("");

  const completedDays = getCompletedDays();

  const currentDay = Math.min(
    completedDays + 1,
    TOTAL_DAYS
  );

  /*
    IMPORTANT:
    We initialize submitted directly instead
    of calling setState inside useEffect.
    This fixes the ESLint error shown in
    your screenshot.
  */
  const [submitted, setSubmitted] =
    useState(() =>
      getCompletedChallenges().includes(
        currentDay
      )
    );

  function toggleRequirement(index) {
    setChecked((current) => {
      if (current.includes(index)) {
        return current.filter(
          (item) => item !== index
        );
      }

      return [
        ...current,
        index,
      ];
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const cleanGithub =
      github.trim();

    const cleanLinkedin =
      linkedin.trim();

    if (
      !cleanGithub ||
      !cleanLinkedin
    ) {
      setError(
        "Please add both your GitHub and LinkedIn links."
      );

      return;
    }

    if (
      !cleanGithub
        .toLowerCase()
        .includes("github.com") ||
      !cleanLinkedin
        .toLowerCase()
        .includes("linkedin.com")
    ) {
      setError(
        "Please enter valid GitHub and LinkedIn URLs."
      );

      return;
    }

    localStorage.setItem(
      "abtalks-github",
      cleanGithub
    );

    localStorage.setItem(
      "abtalks-linkedin",
      cleanLinkedin
    );

    const completed =
      getCompletedChallenges();

    if (!completed.includes(currentDay)) {
      completed.push(currentDay);

      saveCompletedChallenges(
        completed
      );

      const oldCompletedDays =
        getCompletedDays();

      const newCompletedDays =
        Math.min(
          Math.max(
            oldCompletedDays,
            currentDay
          ),
          TOTAL_DAYS
        );

      const newStreak = Math.min(
        getStreak() + 1,
        TOTAL_DAYS
      );

      saveProgress(
        newCompletedDays,
        newStreak
      );
    }

    setError("");
    setSubmitted(true);
  }

  if (submitted) {
    const finalCompletedDays =
      getCompletedDays();

    const finalStreak =
      getStreak();

    return (
      <>
        <Header />

        <main className="challenge-page">
          <div className="container challenge-container">
            <section className="completion-screen">
              <div className="completion-icon">
                ✓
              </div>

              <SectionLabel>
                DAY {currentDay} COMPLETE
              </SectionLabel>

              <h1>
                You showed up.
                <br />
                <span>
                  That's the point.
                </span>
              </h1>

              <p>
                Your proof has been recorded
                and your momentum continues.
              </p>

              <div className="completion-stats">
                <div>
                  <strong>
                    🔥 {finalStreak}
                  </strong>

                  <span>
                    day streak
                  </span>
                </div>

                <div>
                  <strong>
                    {finalCompletedDays} /{" "}
                    {TOTAL_DAYS}
                  </strong>

                  <span>
                    days completed
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="button button-primary full"
                onClick={() =>
                  navigate("/dashboard")
                }
              >
                Back to dashboard
                <span className="arrow">
                  →
                </span>
              </button>
            </section>
          </div>
        </main>

        <MobileNav />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="challenge-page">
        <div className="container challenge-container">
          <button
            type="button"
            className="back-button"
            onClick={() =>
              navigate("/dashboard")
            }
          >
            ← Back to dashboard
          </button>

          <section className="challenge-hero">
            <SectionLabel>
              DAY {currentDay} /{" "}
              {TOTAL_DAYS}
            </SectionLabel>

            <div className="challenge-track">
              {challenge.track}
            </div>

            <h1>
              {challenge.title}
            </h1>

            <p>
              {challenge.description}
            </p>

            <div className="challenge-stats">
              <span>
                <strong>
                  {challenge.difficulty}
                </strong>
                Difficulty
              </span>

              <span>
                <strong>
                  {challenge.time}
                </strong>
                Estimated time
              </span>
            </div>
          </section>

          <section className="challenge-section">
            <SectionLabel>
              THE MISSION
            </SectionLabel>

            <h2>
              What you're building
            </h2>

            <p>
              Build a responsive navigation
              bar for a modern web application.
              It should adapt smoothly between
              mobile and desktop layouts while
              maintaining clear navigation and
              accessibility.
            </p>
          </section>

          <section className="challenge-section">
            <SectionLabel>
              SUCCESS CRITERIA
            </SectionLabel>

            <h2>
              What good looks like
            </h2>

            <div className="requirements">
              {requirements.map(
                (item, index) => {
                  const isChecked =
                    checked.includes(index);

                  return (
                    <button
                      key={item}
                      type="button"
                      className={`requirement ${
                        isChecked
                          ? "checked"
                          : ""
                      }`}
                      onClick={() =>
                        toggleRequirement(
                          index
                        )
                      }
                    >
                      <span>
                        {isChecked
                          ? "✓"
                          : "○"}
                      </span>

                      <p>{item}</p>
                    </button>
                  );
                }
              )}
            </div>

            <p className="form-note">
              {checked.length}/
              {requirements.length} criteria
              checked
            </p>
          </section>

          <section className="done-card">
            <div className="done-icon">
              ✓
            </div>

            <div>
              <SectionLabel>
                DONE WHEN
              </SectionLabel>

              <p>
                Your navigation works on
                mobile, has a clear active
                state, and can be navigated
                using a keyboard.
              </p>
            </div>
          </section>

          <section className="proof-section">
            <SectionLabel>
              PROOF OF WORK
            </SectionLabel>

            <h2>
              Show your work
            </h2>

            <p className="proof-intro">
              Submit both links to complete
              today's challenge.
            </p>

            <form
              onSubmit={handleSubmit}
            >
              <div className="input-card">
                <div className="input-icon">
                  GH
                </div>

                <div className="input-content">
                  <label htmlFor="github">
                    GitHub repository or
                    commit
                  </label>

                  <input
                    id="github"
                    type="url"
                    value={github}
                    onChange={(event) =>
                      setGithub(
                        event.target.value
                      )
                    }
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>

              <div className="input-card">
                <div className="input-icon">
                  in
                </div>

                <div className="input-content">
                  <label htmlFor="linkedin">
                    LinkedIn post
                  </label>

                  <input
                    id="linkedin"
                    type="url"
                    value={linkedin}
                    onChange={(event) =>
                      setLinkedin(
                        event.target.value
                      )
                    }
                    placeholder="https://linkedin.com/posts/..."
                  />
                </div>
              </div>

              {error && (
                <div className="form-error">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="button button-primary full"
              >
                Submit today's proof
                <span className="arrow">
                  →
                </span>
              </button>
            </form>

            <p className="form-note">
              Your proof links are stored
              locally for this demo.
            </p>
          </section>
        </div>
      </main>

      <MobileNav />
    </>
  );
}

/* =========================================================
   APP ROUTES
========================================================= */

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/tracks"
        element={<TrackSelection />}
      />

      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      <Route
        path="/challenge"
        element={<ChallengePage />}
      />

      <Route
        path="*"
        element={<Home />}
      />
    </Routes>
  );
}

export default App;