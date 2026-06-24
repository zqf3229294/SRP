(() => {
  const slideshows = document.querySelectorAll("[data-slideshow]");

  slideshows.forEach((slideshow) => {
    const track = slideshow.querySelector("[data-slideshow-track]");
    const prev = slideshow.querySelector("[data-slideshow-prev]");
    const next = slideshow.querySelector("[data-slideshow-next]");
    const slides = Array.from(track?.children || []);

    if (!track || !prev || !next || slides.length === 0) {
      return;
    }

    const getStep = () => {
      const firstSlide = slides[0];
      const styles = window.getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || styles.gap) || 0;
      return firstSlide.getBoundingClientRect().width + gap;
    };

    const updateControls = () => {
      const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft >= maxScroll - 2;
    };

    prev.addEventListener("click", () => {
      track.scrollBy({ left: -getStep(), behavior: "smooth" });
    });

    next.addEventListener("click", () => {
      track.scrollBy({ left: getStep(), behavior: "smooth" });
    });

    track.addEventListener(
      "scroll",
      () => {
        window.requestAnimationFrame(updateControls);
      },
      { passive: true }
    );

    window.addEventListener("resize", updateControls);
    updateControls();
  });
})();
