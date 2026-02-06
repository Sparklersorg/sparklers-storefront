
import * as React from "react"
import { cn } from "@/lib/utils"

const Dialog = ({ children }: { children: React.ReactNode }) => <div className="dialog">{children}</div>
const DialogTrigger = ({ children, asChild }: { children: React.ReactNode, asChild?: boolean }) => <div className="dialog-trigger">{children}</div>
const DialogContent = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("dialog-content", className)}>{children}</div>
)

export { Dialog, DialogTrigger, DialogContent }
