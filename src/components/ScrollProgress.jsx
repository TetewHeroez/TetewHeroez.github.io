import React, { useState, useEffect, useRef } from "react";

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showScrollbar, setShowScrollbar] = useState(false);
  const trackRef = useRef(null);
  const thumbRef = useRef(null);
  const containerRef = useRef(null);
  const scrollingRef = useRef(null);
  const draggingRef = useRef(false);
  const animationFrameRef = useRef(null);
  const hideTimerRef = useRef(null);
  const latestMouseY = useRef(0);

  useEffect(() => {
    // Cache scrolling element for fastest access
    scrollingRef.current =
      document.scrollingElement || document.documentElement;

    const showScrollbarWithTimer = () => {
      setShowScrollbar(true);

      // Clear existing timer
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }

      // Set new timer to hide after 3 seconds of inactivity
      hideTimerRef.current = setTimeout(() => {
        if (!draggingRef.current && !isHovered) {
          setShowScrollbar(false);
        }
      }, 2000);
    };

    const handleMouseMove = (e) => {
      const distanceFromRight = window.innerWidth - e.clientX;
      const shouldHover = distanceFromRight <= 80; // Show when within 80px from right edge

      setIsHovered(shouldHover);

      if (shouldHover) {
        showScrollbarWithTimer();
      }
    };

    const handleScroll = () => {
      // Skip React state updates while actively dragging to avoid lag
      if (draggingRef.current) return;

      const scrollTop = scrollingRef.current
        ? scrollingRef.current.scrollTop
        : window.pageYOffset;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent =
        documentHeight > 0
          ? Math.min((scrollTop / documentHeight) * 100, 100)
          : 0;

      setScrollProgress(scrollPercent);
      setIsVisible(scrollTop > 50);

      // Show scrollbar briefly when scrolling
      if (scrollTop > 10) {
        showScrollbarWithTimer();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Initial call
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);

      // Cleanup animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handleTrackClick = (e) => {
    if (!trackRef.current || draggingRef.current) return;

    const rect = trackRef.current.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const trackHeight = rect.height;
    const percentage = (clickY / trackHeight) * 100; // Normal direction - top is 0%, bottom is 100%

    const documentHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const targetScrollTop = (percentage / 100) * documentHeight;

    // Immediate scroll without any animation
    const finalScrollTop = Math.max(
      0,
      Math.min(targetScrollTop, documentHeight)
    );
    const el = scrollingRef.current || document.documentElement;

    // Use requestAnimationFrame for smoother update
    requestAnimationFrame(() => {
      el.scrollTop = finalScrollTop; // Instant, no animation

      // Update thumb position immediately
      if (thumbRef.current) {
        thumbRef.current.style.top = `${percentage}%`;
        thumbRef.current.style.transform = `translateY(-${percentage}%)`;
      }

      // Update React state
      setScrollProgress(percentage);
    });
  };

  const handleThumbMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Mark dragging in ref (no React state updates to avoid re-render)
    draggingRef.current = true;
    setIsDragging(true);

    // Clear hide timer while dragging
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }

    // Immediately disable text selection and apply performance class
    document.body.style.userSelect = "none";
    document.body.style.webkitUserSelect = "none";
    document.body.classList.add("is-scrolling-fast");

    // Ensure container stays visible during drag without triggering re-render
    if (containerRef.current) {
      containerRef.current.style.opacity = "1";
      containerRef.current.style.pointerEvents = "auto";
      containerRef.current.style.transition = "none";
    }

    // Disable thumb transition while dragging to remove any visual delay
    if (thumbRef.current) {
      thumbRef.current.style.transition = "none";
      thumbRef.current.style.willChange = "transform, top";
    }

    // Cache calculations that don't change during drag for better performance
    const trackRect = trackRef.current.getBoundingClientRect();
    const trackTop = trackRect.top;
    const trackHeight = trackRect.height;
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollElement = scrollingRef.current || document.documentElement;

    const onMouseMove = (moveEvent) => {
      // Cancel any pending animation frame to prevent stacking
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      // Use requestAnimationFrame for smoother updates
      animationFrameRef.current = requestAnimationFrame(() => {
        if (!trackRef.current || !thumbRef.current || !draggingRef.current)
          return;

        // Calculate percentage based on mouse position within track
        const mouseY = moveEvent.clientY - trackTop;
        const percentage = Math.max(
          0,
          Math.min(100, (mouseY / trackHeight) * 100)
        );

        // Calculate target scroll position using cached values
        const targetScroll = (percentage / 100) * maxScroll;
        const finalScroll = Math.max(0, Math.min(targetScroll, maxScroll));

        // INSTANT SCROLL - Direct property assignment (fastest method)
        scrollElement.scrollTop = finalScroll;

        // Update thumb position directly without waiting for React
        const thumbStyle = thumbRef.current.style;
        thumbStyle.top = `${percentage}%`;
        thumbStyle.transform = `translateY(-${percentage}%)`;
      });
    };

    const onMouseUp = () => {
      // Cancel any pending animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      draggingRef.current = false;
      setIsDragging(false);

      // Re-enable body interactions and remove performance class
      document.body.style.userSelect = "";
      document.body.style.webkitUserSelect = "";
      document.body.classList.remove("is-scrolling-fast");

      // Re-enable transitions after drag if needed
      if (thumbRef.current) {
        thumbRef.current.style.transition = "";
        thumbRef.current.style.willChange = "";
      }

      if (containerRef.current) {
        containerRef.current.style.transition = "";
        containerRef.current.style.pointerEvents = "";
      }

      document.removeEventListener("mousemove", onMouseMove, true);
      document.removeEventListener("mouseup", onMouseUp, true);

      // Sync React state after drag completes (single update)
      requestAnimationFrame(() => {
        const scrollTop = scrollElement.scrollTop;
        const documentHeight = maxScroll;
        const scrollPercent =
          documentHeight > 0
            ? Math.min((scrollTop / documentHeight) * 100, 100)
            : 0;
        setScrollProgress(scrollPercent);
      });
    };

    // Use capture phase with highest priority
    document.addEventListener("mousemove", onMouseMove, true);
    document.addEventListener("mouseup", onMouseUp, true);

    // Start immediately
    onMouseMove(e);
  };

  // Show scrollbar when hovered, dragging, or explicitly shown
  const shouldShowScrollbar = showScrollbar || isDragging || isHovered;

  return (
    <div
      ref={containerRef}
      className="fixed right-0 top-0 h-full w-4 z-50 transition-opacity duration-300 ease-out"
      style={{
        opacity: shouldShowScrollbar ? 1 : 0,
        pointerEvents: shouldShowScrollbar ? "auto" : "none",
      }}
      onMouseEnter={() => {
        setIsHovered(true);
        setShowScrollbar(true);
        if (hideTimerRef.current) {
          clearTimeout(hideTimerRef.current);
        }
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        if (!isDragging) {
          hideTimerRef.current = setTimeout(() => {
            setShowScrollbar(false);
          }, 1000); // Hide after 1 second when leaving scrollbar area
        }
      }}
    >
      {/* Scrollbar Track */}
      <div
        ref={trackRef}
        className="absolute right-0 top-0 w-3 h-full bg-white/10 backdrop-blur-sm rounded-full border border-cyan-200/20 shadow-lg cursor-pointer"
        style={{ touchAction: "none" }}
        onClick={handleTrackClick}
      >
        {/* Scrollbar Thumb */}
        <div
          ref={thumbRef}
          className="absolute right-0 w-full bg-gradient-to-b from-cyan-400 to-sky-500 rounded-full cursor-grab"
          style={{
            height: `${Math.max(
              5,
              Math.min(
                30,
                (window.innerHeight / document.documentElement.scrollHeight) *
                  100
              )
            )}%`,
            // During drag we update position via direct DOM to avoid any delay
            top: draggingRef.current ? undefined : `${scrollProgress}%`,
            transform: draggingRef.current
              ? undefined
              : `translateY(-${scrollProgress}%)`,
            transition: draggingRef.current ? "none" : "box-shadow 150ms ease",
            boxShadow: "0 0 12px rgba(6, 182, 212, 0.6)",
            willChange: draggingRef.current ? "transform, top" : undefined,
            touchAction: "none",
          }}
          onMouseDown={handleThumbMouseDown}
        >
          {/* Inner Highlight */}
          <div className="absolute inset-0.5 bg-gradient-to-b from-cyan-300/80 to-sky-400/80 rounded-full"></div>

          {/* Grip Lines */}
          <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-0.5">
            <div className="w-1 h-0.5 bg-white/60 rounded-full"></div>
            <div className="w-1 h-0.5 bg-white/60 rounded-full"></div>
            <div className="w-1 h-0.5 bg-white/60 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollProgress;
