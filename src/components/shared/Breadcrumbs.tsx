import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-1.5">
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1.5">
          {index > 0 && (
            <ChevronRight className="w-3.5 h-3.5 text-[#9ca3af]" />
          )}
          {item.href && index < items.length - 1 ? (
            <Link
              href={item.href}
              className="font-sora text-[13px] text-[#055cac] hover:underline"
            >
              {item.label}
            </Link>
          ) : (
            <span
              className={`font-sora text-[13px] ${
                index === items.length - 1
                  ? "text-[#242424] font-semibold"
                  : "text-[#055cac]"
              }`}
            >
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
