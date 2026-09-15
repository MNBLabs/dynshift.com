/**
 * Everything the home page says about a project comes from here. Adding a
 * project is adding an entry; the page has no per-project markup.
 */
export interface Project {
  name: string;
  /** One line, in the product's own voice. */
  tagline: string;
  /** Two or three sentences: what it is and who it is for. */
  summary: string;
  url: string;
  /** Path under /public. Each product brings its own icon. */
  icon: string;
  /** Short facts shown under the summary: platform, licence, and so on. */
  facts: string[];
  /** Secondary destinations. Source or package, when they exist. */
  links: { label: string; href: string }[];
}

export const projects: Project[] = [
  {
    name: "PhonePad",
    tagline: "No controller? Use your phone.",
    summary:
      "Turns an Android phone into a wireless Xbox-compatible controller for Windows. Sticks, triggers and rumble over your own Wi-Fi, with a Windows companion that presents it as a real gamepad to every game and to Xbox Cloud Gaming.",
    url: "https://phonepad.dynshift.com/",
    icon: "/brand/phonepad.png",
    facts: ["Android + Windows", "GPL-3.0", "Free"],
    links: [{ label: "Source", href: "https://github.com/MNBLabs/phonepad" }],
  },
  {
    name: "Layr",
    tagline: "Flutter-inspired layout primitives for React.",
    summary:
      "Container, Row, Column, Stack and the rest of Flutter's layout vocabulary as type-safe React components, so a layout reads the way it is drawn.",
    url: "https://layr.dynshift.com/",
    icon: "/brand/layr.png",
    facts: ["React + TypeScript", "MIT", "npm"],
    links: [{ label: "Package", href: "https://www.npmjs.com/package/@dynshift/layr" }],
  },
];

export interface Package {
  name: string;
  summary: string;
  url: string;
}

/** Smaller pieces published on pub.dev. All MIT. */
export const packages: Package[] = [
  {
    name: "mokr",
    summary: "Deterministic mock data and images for Flutter UI work.",
    url: "https://pub.dev/packages/mokr",
  },
  {
    name: "figma_design_scale",
    summary: "Orientation-aware scaling from a Figma frame to any Flutter device.",
    url: "https://pub.dev/packages/figma_design_scale",
  },
  {
    name: "flutter_ui_scaler",
    summary: "Accurate UI scaling that survives rotation.",
    url: "https://pub.dev/packages/flutter_ui_scaler",
  },
  {
    name: "skip_ink_underline",
    summary: "Text underlines that step over descenders, as CSS does.",
    url: "https://pub.dev/packages/skip_ink_underline",
  },
];
