import { forwardRef } from "react";
import {
  Root as ScrollAreaPrimitiveRoot,
  Viewport as ScrollAreaPrimitiveViewport,
  ScrollAreaScrollbar as ScrollAreaPrimitiveScrollbar,
  ScrollAreaThumb as ScrollAreaPrimitiveThumb,
  Corner as ScrollAreaPrimitiveCorner,
} from "@radix-ui/react-scroll-area";

import { cn } from "../../lib/utils";

const ScrollArea = forwardRef(
  /**
   * @param {import("react").ComponentPropsWithoutRef<typeof ScrollAreaPrimitiveRoot>} props
   * @param {import("react").Ref<import("react").ElementRef<typeof ScrollAreaPrimitiveRoot>>} ref
   */
  ({ className, children, ...props }, ref) => (
    <ScrollAreaPrimitiveRoot
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <ScrollAreaPrimitiveViewport className="h-full w-full rounded-[inherit]">
        {children}
      </ScrollAreaPrimitiveViewport>
      <ScrollBar />
      <ScrollAreaPrimitiveCorner />
    </ScrollAreaPrimitiveRoot>
  )
);
ScrollArea.displayName = ScrollAreaPrimitiveRoot.displayName;

const ScrollBar = forwardRef(
  /**
   * @param {import("react").ComponentPropsWithoutRef<typeof ScrollAreaPrimitiveScrollbar>} props
   * @param {import("react").Ref<import("react").ElementRef<typeof ScrollAreaPrimitiveScrollbar>>} ref
   */
  ({ className, orientation = "vertical", ...props }, ref) => (
    <ScrollAreaPrimitiveScrollbar
      ref={ref}
      orientation={orientation}
      className={cn(
        "flex touch-none select-none transition-colors",
        orientation === "vertical" &&
          "h-full w-2.5 border-l border-l-transparent p-[1px]",
        orientation === "horizontal" &&
          "h-2.5 flex-col border-t border-t-transparent p-[1px]",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitiveThumb className="relative flex-1 rounded-full bg-border" />
    </ScrollAreaPrimitiveScrollbar>
  )
);
ScrollBar.displayName = ScrollAreaPrimitiveScrollbar.displayName;

export { ScrollArea, ScrollBar };
