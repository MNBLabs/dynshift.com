import { unlinkSync } from "node:fs";
for (const f of ["public/brand/sky.png", "public/brand/sky-portrait.png"]) unlinkSync(f);
