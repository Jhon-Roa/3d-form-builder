"use client";

import { Button } from "@radix-ui/themes";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

interface Page {
    id: number;
    label: string;
    path: string;
}

interface PageSidebarProps {
    pages: Page[];
}

export function PageSidebar({ pages }: PageSidebarProps) {
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const currentIndex = pages.findIndex(
        (page) => page.path === location.pathname
    );

    const canGoBack = currentIndex > 0;
    const canGoForward = currentIndex < pages.length - 1;

    const goBack = () => {
        if (canGoBack) {
            navigate(pages[currentIndex - 1].path);
        }
    };

    const goForward = () => {
        if (canGoForward) {
            navigate(pages[currentIndex + 1].path);
        }
    };

    return (
        <>
            <button
                className="md:hidden fixed left-0 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-2 py-3 rounded-r-lg shadow-lg z-50"
                onClick={() => setOpen(!open)}
            >
                {open ? "‹" : "›"}
            </button>

            <aside
                className={cn(
                    "w-16 border-l border-border bg-sidebar h-[calc(100vh-3.5rem)] sticky top-7 flex flex-col items-center py-4",
                    "md:flex",
                    "fixed md:static left-0 top-0 z-40 transition-transform duration-300",
                    open ? "translate-x-0 bg-black" : "-translate-x-full md:translate-x-0"
                )}
            >
                <div className="flex flex-col items-center gap-2 flex-1">
                    <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
                        Paginas
                    </span>

                    <Button
                        variant="ghost"
                        className="h-8 w-8"
                        onClick={() => goBack()}
                        disabled={!canGoBack}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <div className="flex flex-col gap-1.5 my-2">
                        {pages.map((page) => {
                            return (
                                <button
                                    key={page.id}
                                    onClick={() => {
                                        navigate(page.path);
                                        setOpen(false);
                                    }}
                                    // onClick={() => onPageChange(page.id)}
                                    className={cn(
                                        "w-8 h-8 rounded-md text-xs font-medium transition-all",
                                        currentIndex === page.id
                                            ? "bg-primary text-primary-foreground shadow-sm"
                                            : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
                                    )}
                                >
                                    {page.id}
                                </button>
                            )
                        })}
                    </div>

                    <Button
                        variant="ghost"
                        className="h-8 w-8"
                        onClick={() => goForward()}
                        disabled={!canGoForward}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>

                <div className="text-[10px] text-muted-foreground">
                    {currentIndex + 1}/{pages.length}
                </div>
            </aside>

            {open && (
                <div
                    className="fixed inset-0 bg-black/30 md:hidden z-30"
                    onClick={() => setOpen(false)}
                />
            )}
        </>
    );
}
