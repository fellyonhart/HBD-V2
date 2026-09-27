# Website Ulang Tahun Interaktif

Stack: React 18 + Vite + TypeScript strict + Tailwind v4 + GSAP/ScrollTrigger + Lenis + Framer Motion + canvas-confetti.

## Jalankan

```bash
npm install
npm run dev
```

Build produksi:

```bash
npm run build
```

## Ganti konten

Nama dan pengaturan umum ada di `src/data/config.ts`.

Foto ada di `src/data/photos.ts`. Untuk foto nyata, taruh file di `public/photos/`, lalu ganti `src` menjadi `/photos/nama-file.jpg` serta pertahankan `width` dan `height` yang sesuai rasio gambar.

Ucapan kecil ada di `src/data/messages.ts`.

Surat botol ada di `src/data/letters.ts`.

Audio ada di `src/data/playlist.ts` dan path aktif juga di `src/data/config.ts`. File audio diletakkan di `public/audio/ambient-piano.mp3`.

Video diletakkan di `public/video/memory.mp4`.

Tidak ada tanggal/waktu unlock, countdown, atau gate. Surat selalu bisa dibuka.

## Struktur utama

- `src/hooks/` — tier perangkat, reduced motion, audio, Lenis, canvas visibility.
- `src/components/` — semua section interaktif.
- `src/data/` — konten yang mudah diganti.
- `src/styles/index.css` — Tailwind v4 theme, star-border property, svh-friendly layout, reduced motion.

## Catatan mobile

Preset aman menurunkan jumlah tile/confetti dan menonaktifkan perilaku parallax pada perangkat coarse/low tier. Canvas berhenti ketika keluar viewport atau tab tidak aktif.
