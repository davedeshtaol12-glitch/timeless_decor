import type { ReactNode } from "react";

/** Tag handlers shared by every `t.rich()` call so copy can use <em> and <br></br>. */
export const richTags = {
  em: (chunks: ReactNode) => <em>{chunks}</em>,
  br: () => <br />,
};
