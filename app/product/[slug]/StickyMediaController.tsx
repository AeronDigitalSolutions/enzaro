"use client";

import { useEffect } from "react";

const DESKTOP_BREAKPOINT = 1100;
const NAV_OFFSET = 100;

export default function StickyMediaController() {
  useEffect(() => {
    const section = document.getElementById("product-section");
    const column = document.getElementById("product-media-column");
    const details = document.getElementById("product-details-column");
    const panel = document.getElementById("product-media-sticky");
    const spacer = document.getElementById("product-media-spacer");

    if (!section || !column || !details || !panel || !spacer) return;

    let rafId = 0;
    let mode: "relative" | "fixed" | "stopped" = "relative";
    let lastLeft = "";
    let lastWidth = "";
    let lastTop = "";

    const applyRelative = () => {
      if (mode === "relative") return;
      panel.style.position = "relative";
      panel.style.top = "";
      panel.style.left = "";
      panel.style.bottom = "";
      panel.style.width = "";
      spacer.style.height = "0px";
      mode = "relative";
      lastLeft = "";
      lastWidth = "";
      lastTop = "";
    };

    const applyPinned = (left: number, width: number, top: number, nextMode: "fixed" | "stopped") => {
      const nextLeft = `${Math.round(left)}px`;
      const nextWidth = `${Math.round(width)}px`;
      const nextTop = `${Math.round(top)}px`;

      if (mode !== nextMode) {
        panel.style.position = "fixed";
        panel.style.bottom = "auto";
        mode = nextMode;
      }

      if (lastLeft !== nextLeft) {
        panel.style.left = nextLeft;
        lastLeft = nextLeft;
      }

      if (lastWidth !== nextWidth) {
        panel.style.width = nextWidth;
        lastWidth = nextWidth;
      }

      if (lastTop !== nextTop) {
        panel.style.top = nextTop;
        lastTop = nextTop;
      }
    };

    const update = () => {
      rafId = 0;

      if (window.innerWidth <= DESKTOP_BREAKPOINT) {
        applyRelative();
        return;
      }

      const sectionRect = section.getBoundingClientRect();
      const columnRect = column.getBoundingClientRect();
      const detailsRect = details.getBoundingClientRect();
      const panelHeight = panel.offsetHeight;
      const shouldStick = sectionRect.top <= NAV_OFFSET;

      if (!shouldStick) {
        applyRelative();
        return;
      }

      spacer.style.height = "0px";
      const stopTop = detailsRect.bottom - panelHeight;

      if (stopTop <= NAV_OFFSET) {
        applyPinned(columnRect.left, columnRect.width, stopTop, "stopped");
        return;
      }

      applyPinned(columnRect.left, columnRect.width, NAV_OFFSET, "fixed");
    };

    const requestUpdate = () => {
      if (!rafId) rafId = window.requestAnimationFrame(update);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return null;
}
