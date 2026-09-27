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

  const selectedVideo =
    videos.find((video) => video.id === selectedId) ?? videos[0];

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
          <div className="space-y-5">
            <div className="overflow-hidden rounded-3xl border border-gold/20 bg-navy-deep shadow-[0_30px_80px_rgba(0,0,0,.22)]">
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

            <div className="flex flex-wrap gap-3">
              {videos.map((video) => {
                const isActive = video.id === selectedVideo.id;

                return (
                  <button
                    key={video.id}
                    type="button"
                    onClick={() => setSelectedId(video.id)}
                    className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] transition ${
                      isActive
                        ? "border-gold bg-gold text-navy"
                        : "border-white/15 bg-navy-deep text-cream-muted hover:border-gold/50 hover:text-cream"
                    }`}
                  >
                    {video.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
