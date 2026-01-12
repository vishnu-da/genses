import { useEffect, useRef, useState } from "react";
import { Sparkles, ExternalLink } from "lucide-react";

interface VirtualTryOnBotProps {
  productId?: string;
}

export function VirtualTryOnBot({ productId }: VirtualTryOnBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showContinue, setShowContinue] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.origin !== "https://pidy-tryon.lovable.app") return;

      if (e.data?.type === "tryon-expand") {
        // Widget has started; hide the continue overlay
        setShowContinue(false);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Try to auto-expand a few times right after opening
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

  if (!isOpen) {
    return (
      <button
        onClick={() => {
          setIsOpen(true);
          setShowContinue(true);
        }}
        className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-lg transition hover:bg-primary/90"
      >
        <Sparkles className="h-4 w-4" />
        Virtual Try-On
      </button>
    );
  }

  const frameWidth = 400;
  const frameHeight = 620;

  return (
    <div className="w-full">
      <div
        className="relative overflow-hidden rounded-md border border-border"
        style={{
          width: `${frameWidth}px`,
          height: `${frameHeight}px`,
          background: "hsl(var(--background))",
        }}
      >
        {/* "Continue to sign in" overlay – visible until the widget signals it's fully expanded */}
        {showContinue && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-background/95 backdrop-blur-sm p-6 text-center">
            <Sparkles className="h-8 w-8 text-primary" />
            <p className="text-sm text-muted-foreground max-w-[260px]">
              The try-on widget requires sign-in. Click below to continue in the widget or open a new tab.
            </p>

            <button
              onClick={() => setShowContinue(false)}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
            >
              Continue to sign in
            </button>

            <a
              href={tryOnUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs text-muted-foreground underline-offset-4 hover:underline"
            >
              Open in new tab <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        )}

        <iframe
          ref={iframeRef}
          src={tryOnUrl}
          allow="camera; microphone; fullscreen; popups; storage-access-by-user-activation"
          onLoad={() => {
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
        className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground underline-offset-4 hover:underline"
        href={tryOnUrl}
        target="_blank"
        rel="noreferrer"
      >
        Open in new tab <ExternalLink className="h-3 w-3" />
      </a>
    </div>
  );
}
