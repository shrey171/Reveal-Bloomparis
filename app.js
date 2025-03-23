const container = document.querySelector(".container");
const setGsap = () => {
  gsap.registerPlugin(
    Flip,
    ScrollTrigger,
    Observer,
    ScrollToPlugin,
    Draggable,
    MotionPathPlugin,
    EaselPlugin,
    PixiPlugin,
    TextPlugin,
    CustomEase
  );
};

document.addEventListener("DOMContentLoaded", () => {
  setGsap();
  const lettersOut = gsap.utils.toArray(".letter-out");
  let lettersOutWidth = 0;
  lettersOut.forEach(letterOut => {
    lettersOutWidth += letterOut.offsetWidth;
  });

  const ease = "power3.inOut";
  const loadingCounterDuration = 1;

  const revealTl = gsap
    .timeline({ delay: 0.5 })
    .set("body", { overflow: "hidden" })
    .from(".loading-percentage-wrapper, .loading-text", {
      opacity: 0,
      duration: 0.3,
    })
    .from(".loading-text-wrapper", { width: 200, duration: 0.3 }, "<")
    .to(".loading-text-wrapper", {
      width: "100%",
      duration: loadingCounterDuration,
      ease,
      delay: 0.1,
    })
    .to(
      ".loading-percentage",
      {
        innerText: 100,
        snap: { innerText: 1 },
        ease,
        duration: loadingCounterDuration,
      },
      "<"
    )
    .to(".loading-text-wrapper > *", { autoAlpha: 0, duration: 0.2 })
    .to(".loading-text-wrapper", { height: "100%", ease, duration: 0.6 })
    .to(
      ".company-name",
      { left: "2rem", xPercent: 0, ease, duration: 0.8 },
      "<-0.1"
    )
    .to(
      ".letter-out",
      {
        opacity: 0,
        y: "100%",
        stagger: -0.05,
        duration: 0.6,
        ease,
      },
      "<"
    )
    .addLabel("playhead")
    .to(".letter-in", { x: -lettersOutWidth, duration: 0.8, ease }, "<0.1")
    .from(".content", { autoAlpha: 0, duration: 0.1 }, '<-0.1')
    .from(".content", { scale: 0, rotate: -60, ease, duration: 1 }, "<")
    .from(".content p", { yPercent: 100, duration: 0.3 }, "-=0.1");

  // revealTl.pause("playhead");
  // revealTl.play("playhead");
  revealTl.play();
});
