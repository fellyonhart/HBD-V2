import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SITE_CONFIG } from "../data/config";
import { useReducedMotionSafe } from "../hooks/useReducedMotionSafe";
import ScrollReveal from "./ScrollReveal";

export function SectionPesan() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotionSafe();

  useEffect(() => {
    const scope = sectionRef.current;
    if (!scope) return;

    const ctx = gsap.context(() => {
      const lines = scope.querySelectorAll<HTMLElement>("[data-message-line]");

      if (reduced) {
        gsap.set(lines, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(lines, { opacity: 0, y: 28, filter: "blur(10px)" });

      lines.forEach((line, index) => {
        gsap.to(line, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power2.out",
          delay: index * 0.12,
          scrollTrigger: {
            trigger: line,
            start: "top 85%",
            end: "top 55%",
            scrub: 0.8,
            once: true
          }
        });
      });
    }, scope);

    return () => ctx.revert();
  }, [reduced]);

  const messages = [
    `Happy sweet sixteen, sayang! 🎉🤍

    Pertama-tama, aku mau minta maaf banget karena telat ngucapin ulang tahun kamu. Sumpah, bukan karena aku lupa sama hari spesial kamu, ya. Kemarin aku benar-benar sibuk dengan kegiatan LDKS, jadi nggak bisa leluasa pegang HP, bahkan sekadar buat ngabarin atau ngucapin tepat waktu pas jam 12 malam. Maafin aku, yaa? 🥺`,

    `Selamat ulang tahun yang ke-16! ❤️

    Di umur kamu yang sekarang, aku berharap semua hal baik selalu datang ke hidup kamu. Semoga kamu selalu diberi kesehatan, kebahagiaan, makin pintar, dan dimudahkan dalam segala urusan, baik di sekolah maupun hal-hal lain yang sedang kamu usahakan. Semoga setiap hari ke depannya selalu punya alasan buat kamu tersenyum.`,

    `Makasih banyak, ya, udah hadir dan jadi bagian penting dalam hidup aku. Makasih karena selama ini udah sabar ngadepin aku, selalu berusaha ngerti keadaan aku, dan mau nemenin aku buat saling cerita tentang banyak hal.

    Aku benar-benar bersyukur bisa kenal dan punya kamu. Aku tahu aku masih punya banyak kekurangan, salah satunya telat ngucapin ulang tahun kamu kali ini. Tapi, aku harap kamu tahu kalau itu sama sekali nggak mengurangi betapa berharganya kamu buat aku.`,

    `Sekali lagi, happy birthday, cantik! 🎂🤍

    Semoga di umur yang baru ini, kamu bisa semakin bahagia, banyak mendapatkan pengalaman baru, dan semua harapan kamu satu per satu bisa terwujud.

    Nanti kalau kita ketemu, aku tebus, ya, keterlambatan aku kali ini. I love you! ❤️`
  ];

  return (
    <section
      id="pesan"
      ref={sectionRef}
      className="section-shell px-5 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="section-kicker">Pesan ucapan</p>

        <ScrollReveal
          baseOpacity={0.12}
          enableBlur={true}
          baseRotation={3}
          blurStrength={5}
          containerClassName="mt-3 block"
        >
          <h2 className="section-title">Hari ini tentang kamu.</h2>
        </ScrollReveal>

        <div className="mt-10 space-y-6">
          {messages.map((line, index) => (
            <p
              data-message-line
              key={index}
              className="whitespace-pre-line font-display text-lg italic leading-9 text-cream/95 sm:text-xl"
            >
              {line.trim()}
            </p>
          ))}

          <p
            data-message-line
            className="font-display text-xl italic leading-9 text-cream/95 sm:text-2xl"
          >
            {SITE_CONFIG.recipientName}.
          </p>
        </div>
      </div>
    </section>
  );
}
