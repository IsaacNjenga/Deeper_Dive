import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Share2,
  Download,
  Mic2,
  Headphones,
  Search,
  Tag,
  Clock,
  Rss,
  Apple,
  Youtube,
  Twitter,
  Instagram,
  Mail,
  Menu,
  Sun,
  Moon,
  CheckCircle2,
  CircleCheckBig,
  Bookmark,
  BookmarkCheck,
  Users,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const EPISODES = [
  {
    id: "e12",

    number: 12,

    title: "Designing a Life You Don't Need a Vacation From",

    date: "2025-07-25",

    duration: 48,

    tags: ["careers", "habits", "mindset"],

    desc: "Jeremy sits down with a behavioral scientist to unpack sustainable habit loops and work-life design.",

    audioUrl: "/audio/episode12.mp3",

    cover: "/images/ep12.jpg",

    guest: {
      name: "Dr. Lina Muriuki",

      role: "Behavioral Scientist, Habit Labs",

      bio: "Dr. Muriuki researches how tiny, repeatable actions compound into meaningful behavior change.",

      socials: {
        twitter: "https://twitter.com/",
        instagram: "https://instagram.com/",
      },
    },

    chapters: [
      { time: 0, label: "Cold open" },

      { time: 85, label: "Intro & guest" },

      { time: 420, label: "Habit loops" },

      { time: 1380, label: "Audience Q&A" },
    ],

    transcript:
      "Welcome back to A Deeper Dive. Today we're exploring how to build habits that last...",

    links: [
      { label: "Habit Loop Paper", url: "https://example.com" },

      { label: "Guest Website", url: "https://example.com" },
    ],
  },

  {
    id: "e11",

    number: 11,

    title: "Startups in East Africa: Myth vs Reality",

    date: "2025-07-10",

    duration: 56,

    tags: ["startups", "tech", "Africa"],

    desc: "Fundraising winters, product-market fit, and building teams across Nairobi and beyond.",

    audioUrl: "/audio/episode11.mp3",

    cover: "/images/ep11.jpg",

    guest: {
      name: "Wanjiku Thuo",

      role: "Founder & CEO, Kito",

      bio: "Operator-investor focused on infrastructure for inclusive fintech in the region.",

      socials: {
        twitter: "https://twitter.com/",
        instagram: "https://instagram.com/",
      },
    },

    chapters: [
      { time: 0, label: "Opening" },

      { time: 120, label: "Funding landscape" },

      { time: 900, label: "Hiring" },

      { time: 1800, label: "Rapid fire" },
    ],

    transcript:
      "Jeremy: What's one narrative about African startups you wish would disappear? ...",

    links: [{ label: "Kito", url: "https://example.com" }],
  },

  {
    id: "e10",

    number: 10,

    title: "The Craft of Listening",

    date: "2025-06-20",

    duration: 42,

    tags: ["communication", "relationships"],

    desc: "Deep listening as a leadership superpower — and how to practice it daily.",

    audioUrl: "/audio/episode10.mp3",

    cover: "/images/ep10.jpg",

    guest: {
      name: "Sam Oduor",

      role: "Executive Coach",

      bio: "Coach helping leaders scale empathy, clarity, and courage.",

      socials: {
        twitter: "https://twitter.com/",
        instagram: "https://instagram.com/",
      },
    },

    chapters: [
      { time: 0, label: "Hook" },

      { time: 75, label: "Stories" },

      { time: 980, label: "Practices" },
    ],

    transcript: "Today's conversation is about listening beyond words...",

    links: [],
  },
];

const toMin = (mins) => `${Math.floor(mins)}m`;

const formatTime = (s) => {
  const m = Math.floor(s / 60);

  const sec = Math.floor(s % 60)
    .toString()
    .padStart(2, "0");

  return `${m}:${sec}`;
};

export default function DeeperDiveSite() {
  const [dark, setDark] = useState(true);

  const [q, setQ] = useState("");

  const [tag, setTag] = useState("all");

  const [bookmarks, setBookmarks] = useState(() => new Set());

  const allTags = useMemo(() => {
    const t = new Set();

    EPISODES.forEach((e) => e.tags.forEach((x) => t.add(x)));

    return ["all", ...Array.from(t)];
  }, []);

  const audioRef = useRef(null);

  const [current, setCurrent] = useState(EPISODES[0]);

  const [isPlaying, setIsPlaying] = useState(false);

  const [progress, setProgress] = useState(0);

  const [duration, setDuration] = useState(0);

  const [speed, setSpeed] = useState(1);

  const [vol, setVol] = useState(1);

  const [muted, setMuted] = useState(false);

  const filtered = EPISODES.filter((e) => {
    const byTag = tag === "all" || e.tags.includes(tag);

    const byQ =
      q.trim() === "" ||
      `${e.title} ${e.desc} ${e.guest.name}`

        .toLowerCase()

        .includes(q.toLowerCase());

    return byTag && byQ;
  });

  useEffect(() => {
    const a = audioRef.current;

    if (!a) return;

    const onTime = () => setProgress(a.currentTime || 0);

    const onLoaded = () => setDuration(a.duration || 0);

    a.addEventListener("timeupdate", onTime);

    a.addEventListener("loadedmetadata", onLoaded);

    return () => {
      a.removeEventListener("timeupdate", onTime);

      a.removeEventListener("loadedmetadata", onLoaded);
    };
  }, [current?.id]);

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.playbackRate = speed;
  }, [speed]);

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.volume = vol;

    audioRef.current.muted = muted;
  }, [vol, muted]);

  const play = () => {
    const a = audioRef.current;

    if (!a) return;

    a.play()
      .then(() => setIsPlaying(true))
      .catch(() => {});
  };

  const pause = () => {
    const a = audioRef.current;

    if (!a) return;

    a.pause();

    setIsPlaying(false);
  };

  const seek = (t) => {
    const a = audioRef.current;

    if (!a) return;

    const next = Math.min(Math.max(0, t), duration || 0);

    a.currentTime = next;
  };

  const selectEpisode = (ep) => {
    setCurrent(ep);

    setIsPlaying(false);

    setProgress(0);

    setTimeout(() => play(), 80);
  };

  const toggleBookmark = (id) => {
    setBookmarks((prev) => {
      const next = new Set(prev);

      if (next.has(id)) next.delete(id);
      else next.add(id);

      return next;
    });
  };

  const shareCurrent = async () => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";

    const url = `${origin}/episodes/${current.id}`;

    try {
      await navigator.clipboard.writeText(url);

      alert("Link copied to clipboard");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-white text-slate-900 dark:bg-[#0b0f14] dark:text-slate-100 transition-colors">
        <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/20 border-b border-black/5 dark:border-white/10">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-2xl grid place-items-center bg-black text-white dark:bg-white dark:text-black shadow">
                <Mic2 className="w-5 h-5" />
              </div>

              <div className="leading-tight">
                <p className="font-black tracking-tight text-xl">
                  A Deeper Dive
                </p>

                <p className="text-xs opacity-70 -mt-1">with Jeremy Nyabila</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6 text-sm">
              {[
                ["Episodes", "episodes"],

                ["Guests", "guests"],

                ["About", "about"],

                ["Newsletter", "newsletter"],

                ["Contact", "contact"],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={`#${href}`}
                  className="hover:text-rose-600 transition-colors"
                >
                  {label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4" />

              <Switch checked={dark} onCheckedChange={setDark} />

              <Moon className="w-4 h-4" />

              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </header>

        <section className="max-w-7xl mx-auto px-4 md:px-6 pt-10 md:pt-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="rounded-xl mb-3" variant="secondary">
                New episode every other Friday
              </Badge>

              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.05]">
                Go beyond the headlines.
                <span className="text-rose-600"> Dive deeper</span> into the
                ideas shaping life & work.
              </h1>

              <p className="mt-4 text-base md:text-lg opacity-80 max-w-prose">
                Long-form conversations hosted by Jeremy Nyabila — with
                founders, artists, scientists, and leaders across Africa and the
                world.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#episodes">
                  <Button className="rounded-2xl">Browse episodes</Button>
                </a>

                <div className="flex gap-2">
                  <Button variant="outline" className="rounded-2xl">
                    <Rss className="w-4 h-4 mr-2" />
                    RSS
                  </Button>

                  <Button variant="outline" className="rounded-2xl">
                    <Apple className="w-4 h-4 mr-2" />
                    Apple
                  </Button>

                  <Button variant="outline" className="rounded-2xl">
                    <Headphones className="w-4 h-4 mr-2" />
                    Listen
                  </Button>

                  <Button variant="outline" className="rounded-2xl">
                    <Youtube className="w-4 h-4 mr-2" />
                    YouTube
                  </Button>
                </div>
              </div>

              <ul className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3 text-sm opacity-80">
                {[
                  "Curious, not clickbait.",

                  "Chapters & transcripts.",

                  "Ad‑light & listener‑funded.",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    {t}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <NowPlaying
                current={current}
                isPlaying={isPlaying}
                progress={progress}
                duration={duration}
                speed={speed}
                setSpeed={setSpeed}
                vol={vol}
                setVol={setVol}
                muted={muted}
                setMuted={setMuted}
                onSeek={seek}
                onBack={() => seek(progress - 15)}
                onFwd={() => seek(progress + 30)}
                onPlay={play}
                onPause={pause}
                onShare={shareCurrent}
              />
            </motion.div>
          </div>
        </section>

        <section
          id="episodes"
          className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Episodes
            </h2>

            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search title, topic, or guest..."
                  className="pl-9 rounded-2xl w-72"
                />

                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-60" />
              </div>

              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" />

                <select
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className="rounded-2xl border px-3 py-2 bg-transparent"
                >
                  {allTags.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-[2fr_1fr] gap-6">
            <div className="grid gap-4">
              {filtered.map((ep) => (
                <EpisodeCard
                  key={ep.id}
                  ep={ep}
                  active={current?.id === ep.id}
                  playing={isPlaying}
                  bookmarked={bookmarks.has(ep.id)}
                  onPlay={() => selectEpisode(ep)}
                  onBookmark={() => toggleBookmark(ep.id)}
                />
              ))}
            </div>

            <Card className="rounded-2xl self-start sticky top-[84px]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Headphones className="w-5 h-5" />
                  Up next
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                {EPISODES.map((ep) => (
                  <button
                    key={ep.id}
                    onClick={() => selectEpisode(ep)}
                    className={`w-full text-left p-3 rounded-xl border border-black/10 dark:border-white/10 hover:bg-rose-600/10 ${
                      current?.id === ep.id ? "ring-2 ring-rose-600" : ""
                    }`}
                  >
                    <div className="text-sm font-medium">
                      Ep {ep.number}: {ep.title}
                    </div>

                    <div className="text-xs opacity-70 flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      {toMin(ep.duration)} •{" "}
                      {new Date(ep.date).toLocaleDateString()}
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="guests" className="max-w-7xl mx-auto px-4 md:px-6 py-10">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Featured Guest
                </CardTitle>
              </CardHeader>

              <CardContent>
                <GuestCard guest={current.guest} />
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>About the show</CardTitle>
              </CardHeader>

              <CardContent className="space-y-3 text-sm opacity-80">
                <p>
                  A Deeper Dive is a curiosity‑driven podcast hosted by Jeremy
                  Nyabila. We explore the questions behind the obvious answers —
                  through stories, research, and real talk.
                </p>

                <p>
                  Expect practical takeaways, chapter markers, and full
                  transcripts. Our north star: conversations you’ll want to
                  replay and share.
                </p>

                <div className="flex flex-wrap gap-2">
                  <Badge className="rounded-xl" variant="secondary">
                    Clean audio
                  </Badge>

                  <Badge className="rounded-xl" variant="secondary">
                    Chapters
                  </Badge>

                  <Badge className="rounded-xl" variant="secondary">
                    Transcripts
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section
          id="newsletter"
          className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16"
        >
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Join the newsletter
              </CardTitle>
            </CardHeader>

            <CardContent className="grid md:grid-cols-3 gap-4 items-center">
              <p className="opacity-80 text-sm md:col-span-2">
                One thoughtful email per month: episode notes, links, and
                extras. No spam, unsubscribe anytime.
              </p>

              <div className="flex gap-2 md:justify-end">
                <Input
                  placeholder="you@example.com"
                  type="email"
                  className="rounded-2xl"
                />

                <Button className="rounded-2xl">Subscribe</Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <section
          id="contact"
          className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16"
        >
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="rounded-2xl md:col-span-2">
              <CardHeader>
                <CardTitle>Contact the show</CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="grid md:grid-cols-2 gap-3">
                  <Input placeholder="Your name" className="rounded-2xl" />

                  <Input
                    placeholder="Email"
                    type="email"
                    className="rounded-2xl"
                  />

                  <Input
                    placeholder="Subject"
                    className="md:col-span-2 rounded-2xl"
                  />

                  <Textarea
                    placeholder="Message, guest suggestion, or question"
                    className="md:col-span-2 rounded-2xl"
                  />
                </div>

                <Button className="rounded-2xl">Send</Button>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Follow</CardTitle>
              </CardHeader>

              <CardContent className="flex flex-wrap gap-2">
                <Button variant="outline" className="rounded-2xl">
                  <Instagram className="w-4 h-4 mr-2" />
                  Instagram
                </Button>

                <Button variant="outline" className="rounded-2xl">
                  <Twitter className="w-4 h-4 mr-2" />X
                </Button>

                <Button variant="outline" className="rounded-2xl">
                  <Youtube className="w-4 h-4 mr-2" />
                  YouTube
                </Button>

                <Button variant="outline" className="rounded-2xl">
                  <Rss className="w-4 h-4 mr-2" />
                  RSS
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <footer className="sticky bottom-0 z-40 border-t border-black/5 dark:border-white/10 bg-white/90 dark:bg-[#0b0f14]/90 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center gap-4">
            <img
              src={current.cover}
              alt="cover"
              className="w-12 h-12 rounded-xl object-cover border border-black/10 dark:border-white/10"
            />

            <div className="min-w-0 flex-1">
              <div className="truncate font-medium">
                Ep {current.number}: {current.title}
              </div>

              <div className="text-xs opacity-70 truncate">
                {current.guest.name} • {toMin(current.duration)}
              </div>

              <div className="flex items-center gap-3 mt-2">
                <input
                  type="range"
                  min={0}
                  max={duration || 0}
                  value={progress}
                  onChange={(e) => seek(Number(e.target.value))}
                  className="w-full"
                />

                <span className="text-xs opacity-70 w-12 text-right">
                  {formatTime(progress)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => seek(progress - 15)}
              >
                <SkipBack className="w-5 h-5" />
              </Button>

              {isPlaying ? (
                <Button size="icon" className="rounded-full" onClick={pause}>
                  <Pause className="w-5 h-5" />
                </Button>
              ) : (
                <Button size="icon" className="rounded-full" onClick={play}>
                  <Play className="w-5 h-5" />
                </Button>
              )}

              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => seek(progress + 30)}
              >
                <SkipForward className="w-5 h-5" />
              </Button>

              <div className="flex items-center gap-2 ml-3">
                <button
                  onClick={() => setMuted((m) => !m)}
                  className="p-2 rounded-xl border border-black/10 dark:border-white/10"
                >
                  {muted || vol === 0 ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>

                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={muted ? 0 : vol}
                  onChange={(e) => setVol(Number(e.target.value))}
                />

                <select
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="rounded-xl border px-2 py-1"
                >
                  {[0.8, 1, 1.2, 1.5, 2].map((s) => (
                    <option key={s} value={s}>
                      {s}×
                    </option>
                  ))}
                </select>

                <Button
                  variant="outline"
                  className="rounded-2xl"
                  onClick={shareCurrent}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>

                <a download href={current.audioUrl}>
                  <Button variant="outline" className="rounded-2xl">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </a>

                <button
                  onClick={() => toggleBookmark(current.id)}
                  className="p-2 rounded-xl border border-black/10 dark:border-white/10"
                >
                  {bookmarks.has(current.id) ? (
                    <BookmarkCheck className="w-4 h-4" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <audio
              ref={audioRef}
              src={current.audioUrl}
              preload="metadata"
              onEnded={() => setIsPlaying(false)}
            />
          </div>
        </footer>
      </div>
    </div>
  );
}

function EpisodeCard({ ep, active, playing, bookmarked, onPlay, onBookmark }) {
  return (
    <Card
      className={`rounded-2xl overflow-hidden ${
        active ? "ring-2 ring-rose-600" : ""
      }`}
    >
      <div className="grid md:grid-cols-[160px_1fr]">
        <img
          src={ep.cover}
          alt="cover"
          className="w-full h-full object-cover md:h-40"
        />

        <div>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between gap-3">
              <span className="truncate">
                Ep {ep.number}: {ep.title}
              </span>

              <div className="flex items-center gap-2 text-xs opacity-70">
                <Clock className="w-3 h-3" />

                <span>{toMin(ep.duration)}</span>

                <span>• {new Date(ep.date).toLocaleDateString()}</span>
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-0">
            <p className="opacity-80 text-sm">{ep.desc}</p>

            <div className="flex flex-wrap gap-2 mt-3">
              {ep.tags.map((t) => (
                <Badge key={t} variant="secondary" className="rounded-xl">
                  {t}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <Button className="rounded-2xl" onClick={onPlay}>
                {active && playing ? "Resume" : "Play"}
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="rounded-2xl">
                    Details
                  </Button>
                </DialogTrigger>

                <DialogContent className="rounded-2xl max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      Ep {ep.number}: {ep.title}
                    </DialogTitle>

                    <DialogDescription>{ep.desc}</DialogDescription>
                  </DialogHeader>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Chapters</h4>

                      <ul className="space-y-1 text-sm">
                        {ep.chapters.map((c, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CircleCheckBig className="w-4 h-4" />
                            {formatTime(c.time)} — {c.label}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Guest</h4>

                      <GuestCard guest={ep.guest} compact />
                    </div>
                  </div>

                  <Accordion type="single" collapsible className="w-full mt-3">
                    <AccordionItem value="t">
                      <AccordionTrigger>Transcript</AccordionTrigger>

                      <AccordionContent>
                        <p className="text-sm opacity-80 whitespace-pre-line">
                          {ep.transcript}
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="links">
                      <AccordionTrigger>Show notes & links</AccordionTrigger>

                      <AccordionContent>
                        <ul className="list-disc ml-5 text-sm">
                          {ep.links.map((l, i) => (
                            <li key={i}>
                              <a
                                className="underline"
                                href={l.url}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {l.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </DialogContent>
              </Dialog>

              <Button
                variant="outline"
                className="rounded-2xl"
                onClick={onBookmark}
              >
                {bookmarked ? (
                  <>
                    <BookmarkCheck className="w-4 h-4 mr-2" />
                    Saved
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4 mr-2" />
                    Save
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}

function GuestCard({ guest, compact = false }) {
  return (
    <div
      className={`p-3 rounded-xl border border-black/10 dark:border-white/10 ${
        compact ? "" : "flex items-start gap-3"
      }`}
    >
      {!compact && (
        <div className="h-10 w-10 rounded-xl grid place-items-center bg-rose-600/10 text-rose-600">
          <Users className="w-5 h-5" />
        </div>
      )}

      <div>
        <div className="font-medium">{guest.name}</div>

        <div className="text-xs opacity-70">{guest.role}</div>

        <p className="text-sm opacity-80 mt-2">{guest.bio}</p>

        <div className="flex gap-2 mt-2">
          <Button variant="outline" className="rounded-xl" size="sm">
            <Twitter className="w-3 h-3 mr-1" />X
          </Button>

          <Button variant="outline" className="rounded-xl" size="sm">
            <Instagram className="w-3 h-3 mr-1" />
            IG
          </Button>
        </div>
      </div>
    </div>
  );
}

function NowPlaying({
  current,
  isPlaying,
  progress,
  duration,
  speed,
  setSpeed,
  vol,
  setVol,
  muted,
  setMuted,
  onSeek,
  onBack,
  onFwd,
  onPlay,
  onPause,
  onShare,
}) {
  return (
    <Card className="rounded-2xl">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          Now playing
        </CardTitle>
      </CardHeader>

      <CardContent className="grid md:grid-cols-[160px_1fr] gap-4 items-center">
        <img
          src={current.cover}
          alt="cover"
          className="w-full md:w-40 h-40 rounded-xl object-cover border border-black/10 dark:border-white/10"
        />

        <div>
          <div className="text-sm opacity-70">Episode {current.number}</div>

          <h3 className="text-xl font-bold tracking-tight">{current.title}</h3>

          <div className="text-xs opacity-70">
            {current.guest.name} • {toMin(current.duration)}
          </div>

          <div className="flex items-center gap-2 mt-3">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={onBack}
            >
              <SkipBack className="w-5 h-5" />
            </Button>

            {isPlaying ? (
              <Button size="icon" className="rounded-full" onClick={onPause}>
                <Pause className="w-5 h-5" />
              </Button>
            ) : (
              <Button size="icon" className="rounded-full" onClick={onPlay}>
                <Play className="w-5 h-5" />
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={onFwd}
            >
              <SkipForward className="w-5 h-5" />
            </Button>

            <div className="flex items-center gap-2 ml-3 text-sm">
              <span className="opacity-70">Speed</span>

              <select
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="rounded-xl border px-2 py-1"
              >
                {[0.8, 1, 1.2, 1.5, 2].map((s) => (
                  <option key={s} value={s}>
                    {s}×
                  </option>
                ))}
              </select>

              <span className="opacity-70 ml-3">Vol</span>

              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={muted ? 0 : vol}
                onChange={(e) => setVol(Number(e.target.value))}
              />

              <button
                onClick={() => setMuted((m) => !m)}
                className="p-2 rounded-xl border border-black/10 dark:border-white/10"
              >
                {muted || vol === 0 ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>

              <Button
                variant="outline"
                className="rounded-2xl"
                onClick={onShare}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-3">
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={progress}
              onChange={(e) => onSeek(Number(e.target.value))}
              className="w-full"
            />

            <span className="text-xs opacity-70 w-12 text-right">
              {formatTime(progress)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
