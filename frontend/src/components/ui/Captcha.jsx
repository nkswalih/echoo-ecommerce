import { useState, useEffect, useCallback, forwardRef, useImperativeHandle } from "react";
import { ArrowPathIcon, SpeakerWaveIcon } from "@heroicons/react/24/outline";

const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
const FONTS = ["Arial", "Verdana", "Georgia", "Trebuchet MS", "Impact", "Courier New"];

const generateCaptchaData = () => {
  let code = "";
  for (let i = 0; i < 5; i++) {
    code += CHARS[Math.floor(Math.random() * CHARS.length)];
  }

  const charData = code.split("").map((char, i) => ({
    char,
    x: 10 + i * 22 + Math.random() * 4,
    y: 32 + Math.random() * 14,
    rotation: (Math.random() - 0.5) * 30,
    fontSize: 24 + Math.random() * 10,
    font: FONTS[Math.floor(Math.random() * FONTS.length)],
  }));

  const lines = Array.from({ length: 5 }, () => ({
    x1: Math.random() * 140,
    y1: Math.random() * 60,
    x2: Math.random() * 140,
    y2: Math.random() * 60,
  }));

  const dots = Array.from({ length: 15 }, () => ({
    cx: Math.random() * 140,
    cy: Math.random() * 60,
    r: 1 + Math.random() * 2,
  }));

  return { code, charData, lines, dots };
};

const Captcha = forwardRef((_props, ref) => {
  const [data, setData] = useState(() => generateCaptchaData());
  const [input, setInput] = useState("");

  const generateCode = useCallback(() => {
    setData(generateCaptchaData());
    setInput("");
  }, []);

  useEffect(() => {
    generateCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useImperativeHandle(ref, () => ({
    validate: () => input === data.code,
    reset: generateCode,
  }));

  const speakCode = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(data.code.split("").join(" "));
      utterance.rate = 0.6;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="relative flex-1 h-16 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
          <svg
            viewBox="0 0 140 60"
            className="w-full h-full"
            role="img"
            aria-label="Captcha code"
          >
            <rect width="140" height="60" fill="#f9fafb" />
            {data.lines.map((line, i) => (
              <line key={`l${i}`} {...line} stroke="#d1d5db" strokeWidth={1.5} opacity={0.5} />
            ))}
            {data.dots.map((dot, i) => (
              <circle key={`d${i}`} {...dot} fill="#d1d5db" opacity={0.4} />
            ))}
            {data.charData.map((c, i) => (
              <text
                key={i}
                x={c.x}
                y={c.y}
                transform={`rotate(${c.rotation}, ${c.x}, ${c.y})`}
                fill="#374151"
                fontSize={c.fontSize}
                fontFamily={c.font}
                fontWeight="bold"
              >
                {c.char}
              </text>
            ))}
          </svg>
        </div>
        <button
          type="button"
          onClick={speakCode}
          aria-label="Listen to captcha code"
          className="p-3 rounded-xl bg-white border border-gray-200 text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-all shrink-0"
          title="Listen"
        >
          <SpeakerWaveIcon className="size-5" />
        </button>
        <button
          type="button"
          onClick={generateCode}
          aria-label="Generate new captcha code"
          className="p-3 rounded-xl bg-white border border-gray-200 text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-all shrink-0"
          title="New code"
        >
          <ArrowPathIcon className="size-5" />
        </button>
      </div>
      <input
        type="text"
        placeholder="Type the characters shown above"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        maxLength={5}
        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all text-sm tracking-widest"
        autoComplete="off"
      />
    </div>
  );
});

Captcha.displayName = "Captcha";
export default Captcha;
