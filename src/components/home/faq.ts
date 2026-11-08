/**
 * DRAFT: the home page FAQ. Answers are HTML (links allowed). The same data
 * renders the section and its FAQPage structured data, so they cannot differ.
 */
export interface Qa {
  q: string;
  a: string;
}

export const faq: Qa[] = [
  {
    q: "Does DynShift's software cost anything?",
    a: `No. Everything released so far is free, and the free versions are the products rather than demos of them. If you find a tool useful you can support it through <a href="https://github.com/sponsors/MNBLabs" rel="noopener">GitHub Sponsors</a> or <a href="https://ko-fi.com/nishanbhuinya" rel="noopener">Ko-fi</a>, but support unlocks nothing: everyone gets the same software. If paid extras ever appear, they will be additions, never a charge for what already works.`,
  },
  {
    q: "Can I use LAYR or the Flutter packages in a commercial or closed-source project?",
    a: `Yes. LAYR and all four Flutter packages are published under the MIT licence, which allows use inside any software, including closed and commercial software, as long as the licence notice is kept. PhonePad is different: it is GPL-3.0, so you can use and modify it freely, but if you distribute a modified version you must publish its source under the same licence. PhonePad's wire protocol is Apache-2.0, so you can write a compatible client or companion without the GPL applying to it.`,
  },
  {
    q: "Does PhonePad collect any data, or need an account?",
    a: `No. There is no account, no server and no telemetry. The phone talks to the companion on your PC over your own network and contacts nothing else. Pairing creates a key shared by the two devices, and every input packet is authenticated with it, so nothing else on the network can send input to your PC.`,
  },
  {
    q: "Where do I get PhonePad, and is there an iPhone version?",
    a: `PhonePad is published on <a href="https://github.com/MNBLabs/phonepad/releases" rel="noopener">GitHub Releases</a>: an Android APK for 64-bit ARM phones and the Windows companion, with SHA-256 checksums for both. It is not on the Play Store. An iPhone version is not planned, because there is no way to build it on iOS that works as well as the Android version, and a worse version would not be worth shipping. The <a href="https://phonepad.dynshift.com/setup/">setup guide</a> walks through the first connection.`,
  },
  {
    q: "What happened to the Layr React component library?",
    a: `LAYR 3.0, released on 25 September 2026, replaced it as the default <code>@dynshift/layr</code> on npm. LAYR is now a compiled language for web layout rather than a set of React components. The 1.x library is still installable as <code>@dynshift/layr@v1</code>, its source is on the <code>v1</code> branch of the repository, and the LAYR documentation has a guide for migrating.`,
  },
  {
    q: "How do I report a bug or contribute?",
    a: `Each project's GitHub repository is the fastest route: bugs as issues, questions and ideas as discussions, fixes as pull requests. Small, focused changes are the easiest to review. For anything else, including privacy requests, write to <a href="mailto:official@dynshift.com">official@dynshift.com</a>.`,
  },
];
