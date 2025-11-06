document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(MotionPathPlugin);

    // Initial position
    gsap.set('.paper', { top: '50%', left: 0, xPercent: 0, yPercent: -50, position: 'absolute' });

    // Timeline
    const tl = gsap.timeline();
    tl.to('.paper', {
        duration: 3,
        ease: 'power1.inOut',
        motionPath: {
            path: [
                { x: 120, y: -30 },
                { x: 380, y: 20 },
                { x: 640, y: 110 },
                { x: 880, y: -80 },
                { x: window.innerWidth, y: -120 }
            ],
            curviness: 1.25,
            autoRotate: true
        }
    });

    // ScrollMagic
    const controller = new ScrollMagic.Controller();
    new ScrollMagic.Scene({
        triggerElement: '.animation',
        duration: 3000,
        triggerHook: 0
    })
        .setPin('.animation')
        .setTween(tl)
        .addTo(controller);
});