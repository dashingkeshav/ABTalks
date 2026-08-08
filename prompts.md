# ABTalks — Project Prompt

## Project Overview

ABTalks is a responsive 60-Day Coding Challenge platform designed for college students and beginner/intermediate developers.

The goal is to help users build coding consistency, complete real-world challenges, maintain a streak, track progress, and create public proof of work through GitHub and LinkedIn.

The product should feel like a modern premium developer-productivity platform rather than a generic student dashboard.

---

## Core Product Idea

"Build for 60 days. Become hard to ignore."

Users should be able to:

1. Discover the ABTalks challenge.
2. Select a development track.
3. Start a 60-day coding journey.
4. View their dashboard.
5. Complete daily challenges.
6. Check challenge requirements.
7. Submit GitHub and LinkedIn proof.
8. Increase their progress and streak.
9. View achievements.
10. View the community leaderboard.
11. See their build history.
12. Recover from missed days without losing previous progress.

---

## Current Tech Stack

- React
- Vite
- JavaScript
- React Router
- CSS
- LocalStorage
- Vercel deployment

Do not introduce unnecessary frameworks or dependencies.

---

## Application Routes

The application currently contains:

### `/`

Landing page.

Must include:

- ABTalks branding
- 60-day challenge headline
- Short product explanation
- CTA to start/continue
- CTA to today's challenge
- Journey progress card
- Why ABTalks section
- How it works section
- Challenge preview
- Motivational quote
- Final CTA
- Footer

---

### `/tracks`

Track selection page.

Users can choose:

- Frontend Development
- Backend Development
- AI / Machine Learning
- Data Science
- Mobile Development
- UI/UX + Web Design

The selected track should be saved to LocalStorage.

After selecting a track, the user can continue to `/dashboard`.

---

### `/dashboard`

Builder dashboard.

Must display:

- Current development track
- Current day
- Total 60-day progress
- Current streak
- Longest streak
- Today's mission
- Progress bar
- 60-day consistency calendar
- Achievements
- Builder standing
- Community leaderboard
- Recent build activity

The dashboard should feel like the user's personal builder command center.

---

### `/challenge`

Daily challenge page.

Must include:

- Challenge day
- Track
- Difficulty
- Estimated time
- Mission description
- Success criteria
- Interactive requirement checklist
- GitHub proof input
- LinkedIn proof input
- Validation
- Submit button
- Completion screen

A valid GitHub URL should contain:

`github.com`

A valid LinkedIn URL should contain:

`linkedin.com`

After successful submission:

- Save proof links locally.
- Mark the challenge complete.
- Increase completed days.
- Increase streak.
- Show completion screen.
- Allow navigation back to dashboard.

---

## Current Example Challenge

Title:

Build a responsive navigation bar

Description:

Create a responsive navigation component that works beautifully across mobile and desktop.

Track:

Frontend Development

Difficulty:

Intermediate

Estimated time:

45 min

Requirements:

- Responsive across mobile and desktop
- Mobile menu interaction
- Clear active navigation state
- Keyboard accessible
- Clean visual hierarchy

---

## LocalStorage

Use LocalStorage for the current demo.

Existing keys include:

```text
abtalks-track
abtalks-completed-days
abtalks-streak
abtalks-completed-challenges
abtalks-github
abtalks-linkedin