import React from "react";

function stringToColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  const color = `hsl(${hash % 360}, 60%, 70%)`;
  return color;
}

export function AvatarFallback({
  name,
  size = 40,
}: {
  name: string;
  size?: number;
}) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .padEnd(2, name[1]?.toUpperCase() || "")
    .slice(0, 2);

  const bgColor = stringToColor(name);

  return (
    <div
      className="flex items-center justify-center rounded-full text-white font-semibold"
      style={{
        width: size,
        height: size,
        backgroundColor: bgColor,
        fontSize: size * 0.4,
      }}
    >
      {initials}
    </div>
  );
}
