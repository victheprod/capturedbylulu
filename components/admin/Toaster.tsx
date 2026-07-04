import { Toaster } from "sonner";

export function AppToaster() {
  return (
    <Toaster
      theme="dark"
      position="top-right"
      toastOptions={{
        classNames: {
          toast:
            "border border-foreground/15 bg-card text-foreground shadow-xl",
        },
      }}
    />
  );
}
