'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProfilePhotoProps {
  /** Square container size in px. */
  size: number;
  rounded?: string;
  className?: string;
}

export default function ProfilePhoto({ size, rounded = 'rounded-2xl', className = '' }: ProfilePhotoProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`${rounded} bg-[var(--bg-hover)] border border-[var(--border)] flex items-center justify-center shrink-0 ${className}`}
      >
        <span
          className="font-mono font-black text-[var(--accent)]"
          style={{ fontSize: size / 4 }}
        >
          GS
        </span>
      </div>
    );
  }

  return (
    <div
      style={{ width: size, height: size }}
      className={`relative ${rounded} overflow-hidden border border-[var(--border)] shrink-0 ${className}`}
    >
      <Image
        src="/profile.png"
        alt="Gninninmaguignon Silué"
        fill
        className="object-cover"
        onError={() => setError(true)}
      />
    </div>
  );
}
