import { useState, useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";

interface VirtualTryOnBotProps {
  productId?: string;
}

export function VirtualTryOnBot({ productId }: VirtualTryOnBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.origin !== 'https://pidy-tryon.lovable.app') return;
      
      if (e.data.type === 'tryon-expand') {
        setIsExpanded(true);
      } else if (e.data.type === 'tryon-collapse') {
        setIsExpanded(false);
        setIsOpen(false);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  if (!productId) return null;

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        <Sparkles className="w-4 h-4" />
        Virtual Try-On
      </button>
    );
  }

  return (
    <div className="w-full">
      <iframe
        ref={iframeRef}
        src={`https://pidy-tryon.lovable.app/?productId=${productId}`}
        allow="popups"
        style={{
          border: 'none',
          width: isExpanded ? '400px' : '150px',
          height: isExpanded ? '620px' : '45px',
          background: 'transparent',
          transition: 'width 0.3s ease, height 0.3s ease',
        }}
        title="Virtual Try-On"
      />
    </div>
  );
}
