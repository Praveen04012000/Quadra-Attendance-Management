interface AvatarProps {
  initials: string;
  size?: number;
  className?: string;
}

export function Avatar({ initials, size = 32, className = "" }: AvatarProps) {
  return (
    <div
      className={`rounded-full bg-gradient-to-b from-[#055cac] to-[#23a5e6] flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <span
        className="font-sora font-semibold text-white"
        style={{ fontSize: size * 0.34 }}
      >
        {initials}
      </span>
    </div>
  );
}
