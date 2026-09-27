import { useMemo, useState } from "react";

const VIDEO_FILES = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10"
] as const;

export function VideoSection() {
  const [selectedId, setSelectedId] = useState<string>(VIDEO_FILES[0]);
  const [missing, setMissing] = useState(false);

  const videos = useMemo(
    () =>
      VIDEO_FILES.map((file, index) => ({
        id: file,
        src: `/video/${file}.mp4`,
        label: `Video kenangan ${index + 1}`
      })),
    []
  );

  const selectedIndex = videos.findIndex((video) => video.id === selectedId);
  const currentIndex = selectedIndex >= 0 ? selectedIndex : 0;
  const selectedVideo = videos[currentIndex] ?? videos[0];

  const goToVideo = (direction: 1 | -1) => {
    const nextIndex =
      (currentIndex + direction + videos.length) % videos.length;
    setSelectedId(videos[nextIndex].id);
  };

  return (
    <section id="video" className="section-shell px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 max-w-2xl">
          <p className="section-kicker">Foto & video</p>
          <h2 className="section-title mt-3">
            Satu momen, banyak cerita yang ingin diulang.
          </h2>
        </div>

        {missing ? (
          <div className="grid min-h-[320px] place-items-center rounded-3xl border border-gold/20 bg-navy-deep p-8 text-center shadow-[0_30px_80px_rgba(0,0,0,.22)]">
            <div>
              <p className="text-sm text-cream-muted">Video belum tersedia.</p>
              <p className="mt-2 text-xs text-gold">Cek folder public/video</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-3xl border border-gold/20 bg-navy-deep shadow-[0_30px_80px_rgba(0,0,0,.22)]">
              <button
                type="button"
                aria-label="Video sebelumnya"
                onClick={() => goToVideo(-1)}
                className="absolute left-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-navy/70 text-lg text-cream backdrop-blur-sm transition hover:border-gold/60 hover:text-gold"
              >
                ‹
              </button>

              <button
                type="button"
                aria-label="Video berikutnya"
                onClick={() => goToVideo(1)}
                className="absolute right-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-navy/70 text-lg text-cream backdrop-blur-sm transition hover:border-gold/60 hover:text-gold"
              >
                ›
              </button>

              <video
                key={selectedVideo.id}
                width={1280}
                height={720}
                src={selectedVideo.src}
                controls
                playsInline
                preload="metadata"
                className="aspect-video h-auto w-full bg-black object-cover"
                onError={() => setMissing(true)}
                aria-label={selectedVideo.label}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
