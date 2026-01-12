import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import pidyLogo from "@/assets/pidy-logo.png";

interface VirtualTryOnBotProps {
  productId?: string;
}

export function VirtualTryOnBot({ productId }: VirtualTryOnBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadHelp, setShowLoadHelp] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.origin !== "https://pidy-tryon.lovable.app") return;

      if (e.data?.type === "tryon-expand") {
        setIsExpanded(true);
      } else if (e.data?.type === "tryon-collapse") {
        // Some widgets emit an initial "collapse" during boot.
        // Keep the iframe mounted to avoid a "click twice" loop.
        setIsExpanded(false);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // If the iframe takes too long to load (blocked, cookies, auth, etc.), show a helpful fallback.
  useEffect(() => {
    if (!isOpen) return;
    setShowLoadHelp(false);

    if (!isLoading) return;
    const t = window.setTimeout(() => setShowLoadHelp(true), 8000);
    return () => window.clearTimeout(t);
  }, [isOpen, isLoading]);

  // Try to auto-expand a few times right after opening (iframe may not be ready on the first postMessage).
  useEffect(() => {
    if (!isOpen || !productId) return;

    let tries = 0;
    const origin = "https://pidy-tryon.lovable.app";

    const post = () => {
      iframeRef.current?.contentWindow?.postMessage({ type: "tryon-auto-expand" }, origin);
    };

    post();
    const interval = window.setInterval(() => {
      tries += 1;
      post();
      if (tries >= 6) window.clearInterval(interval);
    }, 300);

    return () => window.clearInterval(interval);
  }, [isOpen, productId]);

  if (!productId) return null;

  const tryOnUrl = `https://pidy-tryon.lovable.app/?productId=${productId}`;

  // Always show the button; when clicked we open the iframe at full size
  return (
    <div className="w-full">
      {!isOpen ? (
        <button
          onClick={() => {
            setIsOpen(true);
            setIsExpanded(true);
            setIsLoading(true);
          }}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-lg transition hover:bg-primary/90"
        >
          <img src={pidyLogo} alt="Pidy" className="h-4 w-4" />
          Virtual Try-On
        </button>
      ) : (
        <>
          <div
            className="relative overflow-hidden rounded-md"
            style={{
              width: "400px",
              height: "620px",
              background: "transparent",
            }}
          >
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setIsExpanded(false);
                setIsLoading(false);
                setShowLoadHelp(false);
              }}
              aria-label="Close virtual try-on"
              className="absolute right-2 top-2 z-20 inline-flex h-9 w-9 items-center justify-center rounded-md bg-background/70 text-foreground shadow-sm backdrop-blur transition hover:bg-background"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Centered Try On button overlay - clicks through to iframe */}
            {!isLoading && (
              <button
                type="button"
                onClick={() => {
                  iframeRef.current?.contentWindow?.postMessage(
                    { type: "tryon-auto-expand" },
                    "https://pidy-tryon.lovable.app"
                  );
                }}
                className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 text-white transition hover:bg-black/60"
              >
              <span className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg">
                  <img src={pidyLogo} alt="Pidy" className="h-4 w-4" />
                  Try On
                </span>
              </button>
            )}

            {isLoading && (
              <div className="absolute inset-0 z-10 grid place-items-center bg-background/70 backdrop-blur-sm">
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="text-sm text-muted-foreground">Loading try-on…</div>

                  {showLoadHelp && (
                    <div className="max-w-[280px] text-xs text-muted-foreground">
                      If this stays blank, the try-on service may be blocked in an iframe (often due to
                      sign-in/cookies). Open it in a new tab:
                      <div className="mt-2">
                        <a
                          className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground"
                          href={tryOnUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Open Try‑On
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <iframe
              ref={iframeRef}
              src={tryOnUrl}
              allow="camera; microphone; fullscreen; popups; storage-access-by-user-activation"
              onLoad={() => {
                setIsLoading(false);
                iframeRef.current?.contentWindow?.postMessage(
                  { type: "tryon-auto-expand" },
                  "https://pidy-tryon.lovable.app"
                );
              }}
              style={{
                border: "none",
                width: "100%",
                height: "100%",
                background: "transparent",
              }}
              title="Virtual Try-On"
            />
          </div>

          <a
            className="mt-2 inline-flex text-xs text-muted-foreground underline-offset-4 hover:underline"
            href={tryOnUrl}
            target="_blank"
            rel="noreferrer"
          >
            Open in new tab
          </a>
        </>
      )}
    </div>
  );
}
