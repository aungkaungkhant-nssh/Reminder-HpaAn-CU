import { cn } from "@/lib/utils";
import { Button } from "./button";

export default function SubmitButton({ text, isPending }: { text: string, isPending: boolean }) {

    return (
        <Button
            className={cn(
                "w-full border border-primary text-primary hover:bg-primary hover:text-white p-2 rounded-md transition duration-300 ease-in-out",
                isPending && "opacity-50 cursor-not-allowed",
                "group"
            )}
            variant="outline"
            disabled={isPending}
        >
            {isPending ? (
                <span className="flex items-center justify-center">
                    <svg
                        className="animate-spin h-5 w-5 text-primary mr-2 group-hover:text-white" // Use group-hover for hover color change
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8z"
                        ></path>
                    </svg>
                    Loading...
                </span>
            ) : (
                text
            )}
        </Button>

    )
}