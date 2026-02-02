import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import pidyLogo from "@/assets/pidy-logo.png";

interface VirtualTryOnBotProps {
  productId?: string;
  size?: string;
}

export function VirtualTryOnBot({ productId, size }: VirtualTryOnBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Products that support try-on (original 5 + 6 women's products)
  const tryOnEnabledProducts = [
    'OVO-STAN-VRS-2025-001',
    'KITH-LAX-PKT-2025-002',
    'KNIT-POLO-JNY-2025-003',
    'W-LEG-DENIM-2025-004',
    'BTN-DWN-BRW-2025-005',
    'JCREW-STRIPE-DRS-2026-006',
    'AEO-LACE-CUL-2026-007',
    'NEXT-CP-BTN-2026-008',
    'NEXT-CRM-SHRT-2026-009',
    'SHEIN-RIB-TNK-2026-010',
    'SWIM-FLOR-BKN-2026-011',
  ];

  // Trigger SDK scan when widget opens
  useEffect(() => {
    if (!isOpen) return;
    
    const timer = setTimeout(() => {
      if (typeof (window as any).PidyTryOn?.scan === 'function') {
        (window as any).PidyTryOn.scan();
      } else {
        window.dispatchEvent(new Event('pidy-tryon-scan'));
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [isOpen, productId, size]);

  // Some SDK builds show an "Enter Suite" gate/overlay that requires a click.
  // If that button is injected into our host DOM (or its shadow root), we can
  // safely auto-click it to reduce user friction.
  useEffect(() => {
    if (!isOpen) return;

    const host = containerRef.current;
    if (!host) return;

    const start = Date.now();
    const maxMs = 8000;

    const findAndClick = (root: ParentNode) => {
      const candidates = Array.from(
        root.querySelectorAll<HTMLElement>("button,[role='button'],a")
      );

      for (const el of candidates) {
        const label = (el.textContent || "").trim().toLowerCase();
        if (!label) continue;
        if (!label.includes("enter suite")) continue;

        // Avoid clicking disabled buttons.
        if (el instanceof HTMLButtonElement && el.disabled) continue;

        el.click();
        return true;
      }

      return false;
    };

    const tick = () => {
      if (Date.now() - start > maxMs) return;

      // Try within host.
      if (findAndClick(host)) return;

      // Try within shadow root if present.
      const sr = (host as any).shadowRoot as ShadowRoot | null;
      if (sr && findAndClick(sr)) return;

      timer = window.setTimeout(tick, 250);
    };

    let timer = window.setTimeout(tick, 250);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  // Some SDKs render inside a (shadow) root and/or apply inline styles that
  // can make the media layer effectively invisible. This ensures any injected
  // iframe/canvas/img/video is visible and fills our container.
  useEffect(() => {
    if (!isOpen) return;

    const host = containerRef.current;
    if (!host) return;

    // Read the surface from the wrapper so our injected iframe background can
    // follow the UI toggle.
    const surface =
      getComputedStyle(host).getPropertyValue("--pidy-surface") ||
      "hsl(var(--tryon-surface))";

    const applyFixes = (root: ParentNode) => {
      const nodes = Array.from(
        root.querySelectorAll<HTMLElement>("iframe, canvas, img, video")
      );

      for (const el of nodes) {
        el.style.setProperty("opacity", "1", "important");
        el.style.setProperty("visibility", "visible", "important");

        // Ensure the main surface fills our container.
        el.style.setProperty("width", "100%", "important");
        el.style.setProperty("height", "100%", "important");
        el.style.setProperty("display", "block", "important");
        el.style.setProperty("max-width", "100%", "important");
        el.style.setProperty("max-height", "100%", "important");

        // Some SDK themes apply filters/blend-modes that can effectively hide
        // light/transparent PNGs on dark surfaces.
        el.style.setProperty("filter", "none", "important");
        el.style.setProperty("mix-blend-mode", "normal", "important");

        if (el.tagName.toLowerCase() === "iframe") {
          el.style.setProperty("border", "0", "important");
          el.style.setProperty("position", "absolute", "important");
          el.style.setProperty("inset", "0", "important");
          el.style.setProperty("z-index", "0", "important");
          el.style.setProperty(
            "background",
            surface.trim() || "hsl(var(--tryon-surface))",
            "important"
          );
        }

        // Keep media above SDK overlays but within the try-on stacking context.
        if (el.tagName.toLowerCase() !== "iframe") {
          el.style.setProperty("position", "relative", "important");
          el.style.setProperty("z-index", "30", "important");
        }
      }
    };

    // Apply immediately on host.
    applyFixes(host);

    // Apply within shadow root if/when it appears.
    const interval = window.setInterval(() => {
      applyFixes(host);
      const sr = (host as any).shadowRoot as ShadowRoot | null;
      if (sr) applyFixes(sr);
    }, 200);

    // Observe late-added nodes.
    const obs = new MutationObserver(() => {
      applyFixes(host);
      const sr = (host as any).shadowRoot as ShadowRoot | null;
      if (sr) applyFixes(sr);
    });

    obs.observe(host, { childList: true, subtree: true });

    return () => {
      window.clearInterval(interval);
      obs.disconnect();
    };
  }, [isOpen]);

  if (!productId || !tryOnEnabledProducts.includes(productId)) return null;

  return (
    <div className="w-full">
      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-lg transition hover:bg-primary/90"
        >
          <img src={pidyLogo} alt="Pidy" className="h-4 w-4" />
          Virtual Try-On
        </button>
      ) : (
        <div className="space-y-3">
          <div
            ref={containerRef}
            data-pidy-host-root
            className="relative overflow-hidden rounded-md border border-border"
            style={{
              width: "400px",
              height: "620px",
              background: "hsl(var(--tryon-surface))",
            }}
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close virtual try-on"
              className="absolute right-2 top-2 z-20 inline-flex h-9 w-9 items-center justify-center rounded-md bg-background/70 text-foreground shadow-sm backdrop-blur transition hover:bg-background"
            >
              <X className="h-4 w-4" />
            </button>

            <style>
              {`
                 [data-pidy-host-root] {
                   width: 400px !important;
                   height: 620px !important;
                   min-height: 620px !important;
                   position: relative;
                   z-index: 0;
                 }

                  [data-pidy-host-root] > * {
                   width: 100% !important;
                   height: 100% !important;
                 }

                  [data-pidy-host-root] iframe {
                   width: 100% !important;
                   height: 100% !important;
                   display: block !important;
                   border: 0 !important;
                   background: var(--pidy-surface) !important;
                   opacity: 1 !important;
                   visibility: visible !important;
                   pointer-events: auto !important;
                 }

                  [data-pidy-host-root] canvas,
                  [data-pidy-host-root] img,
                  [data-pidy-host-root] video {
                   opacity: 1 !important;
                   visibility: visible !important;
                   position: relative !important;
                   z-index: 30 !important;
                   max-width: 100% !important;
                   max-height: 100% !important;
                   filter: none !important;
                   mix-blend-mode: normal !important;
                 }
              `}
            </style>

            {/*
              The SDK may replace the target element entirely (removing its id/ref).
              Keep a stable wrapper (the element above) as our ref + styling root,
              and let the SDK mount into this inner target.
            */}
            <div
              key={`${productId}-${size}`}
              id="pidy-tryon"
              data-product-id={productId}
              data-size={size || "M"}
              data-pidy-auto
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
