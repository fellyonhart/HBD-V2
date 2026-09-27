# Performance Checklist

## Implementasi

- [x] `useDeviceTier()` membagi `low | mid | high` berdasarkan motion preference, pointer, CPU, dan device memory bila tersedia.
- [x] `prefers-reduced-motion` dihormati pada GSAP, Framer Motion, canvas spark, Lenis, dan confetti.
- [x] Animasi DOM hanya memakai `transform` dan `opacity`; tidak ada animasi layout/filter blur.
- [x] Aurora memakai layered CSS `radial-gradient`, tanpa div blur.
- [x] Parallax tidak dipakai pada tier low dan pointer coarse.
- [x] Confetti memakai jumlah partikel per tier: low 34, mid 62, high 96.
- [x] Canvas spark memakai `IntersectionObserver` + `document.visibilityState` untuk auto-stop.
- [x] Audio baru mencoba play setelah interaksi user pertama; preferensi mute tersimpan di `localStorage`.
- [x] Semua `useEffect` membersihkan listener, observer, RAF, interval, Lenis, dan GSAP context.
- [x] Gambar memakai `loading="lazy"`, `decoding="async"`, serta `width/height`.
- [x] Section memakai `svh` untuk viewport-sensitive height.
- [x] Tidak ada unlockAt, countdown, `isLocked`, atau TimeGate.

## Uji HP mid-range

Target aman: perangkat Android kelas menengah dengan Chrome terbaru.

1. Jalankan `npm run build` lalu preview build produksi.
2. Aktifkan DevTools mobile mode dan gunakan throttle CPU/Network seperlunya.
3. Scroll dari Hero sampai confetti; pastikan tidak ada lag saat tile reveal.
4. Buka/tutup lightbox, surat, dan slider pesan berkali-kali untuk memastikan tidak ada listener/scroll lock yang tertinggal.
5. Pindah tab beberapa detik saat spark canvas terlihat; kembali ke tab dan pastikan canvas melanjutkan hanya saat masih in-view.
6. Aktifkan `prefers-reduced-motion`; semua konten harus tetap muncul tanpa motion berat.
7. Uji rotate portrait/landscape dan pastikan layout tidak memunculkan horizontal scroll.
8. Uji audio: pertama kali interaksi boleh memulai audio bila tidak mute; setelah reload, state mute harus mengikuti `localStorage`.
9. Pantau frame drops dan memory; bila foto nyata besar, kompres ke WebP/AVIF sebelum dimasukkan ke `public/photos`.
