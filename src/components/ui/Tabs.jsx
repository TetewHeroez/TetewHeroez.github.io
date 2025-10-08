import { forwardRef } from "react";
import {
  Root as TabsPrimitiveRoot,
  List as TabsPrimitiveList,
  Trigger as TabsPrimitiveTrigger,
  Content as TabsPrimitiveContent,
} from "@radix-ui/react-tabs";

import { cn } from "../../lib/utils";

const Tabs = TabsPrimitiveRoot;

const TabsList = forwardRef(
  /**
   * @param {import("react").ComponentPropsWithoutRef<typeof TabsPrimitiveList>} props
   * @param {import("react").Ref<import("react").ElementRef<typeof TabsPrimitiveList>>} ref
   */
  ({ className, ...props }, ref) => (
    <TabsPrimitiveList
      ref={ref}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
        className
      )}
      {...props}
    />
  )
);
TabsList.displayName = TabsPrimitiveList.displayName;

const TabsTrigger = forwardRef(
  /**
   * @param {import("react").ComponentPropsWithoutRef<typeof TabsPrimitiveTrigger>} props
   * @param {import("react").Ref<import("react").ElementRef<typeof TabsPrimitiveTrigger>>} ref
   */
  ({ className, ...props }, ref) => (
    <TabsPrimitiveTrigger
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        className
      )}
      {...props}
    />
  )
);
TabsTrigger.displayName = TabsPrimitiveTrigger.displayName;

const TabsContent = forwardRef(
  /**
   * @param {import("react").ComponentPropsWithoutRef<typeof TabsPrimitiveContent>} props
   * @param {import("react").Ref<import("react").ElementRef<typeof TabsPrimitiveContent>>} ref
   */
  ({ className, ...props }, ref) => (
    <TabsPrimitiveContent
      ref={ref}
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      {...props}
    />
  )
);
TabsContent.displayName = TabsPrimitiveContent.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
