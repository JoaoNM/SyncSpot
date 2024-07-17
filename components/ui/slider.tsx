"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { WidthIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";

interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
    showSecondThumb?: boolean;
}

const Slider = React.forwardRef<
React.ElementRef<typeof SliderPrimitive.Root>,
SliderProps
>(({ className, ...props }, ref) => (
	<SliderPrimitive.Root
		ref={ref}
		className={cn(
			"relative flex w-full touch-none select-none items-center",
			className
		)}
		{...props}
	>
		<SliderPrimitive.Track className="relative opacity-0 h-1 w-full grow overflow-hidden rounded-full bg-secondary">
			<SliderPrimitive.Range className="absolute h-full bg-primary" />
		</SliderPrimitive.Track>

		{props.showSecondThumb && (
			<SliderPrimitive.Thumb className="flex h-[100vh] w-0  ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 ">
				<div className="absolute cursor-pointer flex justify-center items-center h-7 w-7 left-1/2 top-1/2 shadow-lg translate-x-[-50%] translate-y-[-50%] bg-white rounded-lg">
					<svg
						width="16"
						height="16"
						viewBox="0 0 15 15"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M4.81812 4.68161C4.99386 4.85734 4.99386 5.14227 4.81812 5.318L3.08632 7.0498H11.9135L10.1817 5.318C10.006 5.14227 10.006 4.85734 10.1817 4.68161C10.3575 4.50587 10.6424 4.50587 10.8181 4.68161L13.3181 7.18161C13.4939 7.35734 13.4939 7.64227 13.3181 7.818L10.8181 10.318C10.6424 10.4937 10.3575 10.4937 10.1817 10.318C10.006 10.1423 10.006 9.85734 10.1817 9.68161L11.9135 7.9498H3.08632L4.81812 9.68161C4.99386 9.85734 4.99386 10.1423 4.81812 10.318C4.64239 10.4937 4.35746 10.4937 4.18173 10.318L1.68173 7.818C1.50599 7.64227 1.50599 7.35734 1.68173 7.18161L4.18173 4.68161C4.35746 4.50587 4.64239 4.50587 4.81812 4.68161Z"
							fill="#5046E5"
							fill-rule="evenodd"
							clip-rule="evenodd"
						></path>
					</svg>
				</div>
			</SliderPrimitive.Thumb>
		)}

		<SliderPrimitive.Thumb className="flex h-[100vh] w-0  ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 ">
			<div className="absolute cursor-pointer flex justify-center items-center h-7 w-7 left-1/2 top-1/2 shadow-lg translate-x-[-50%] translate-y-[-50%] bg-white rounded-lg">
				<svg
					width="16"
					height="16"
					viewBox="0 0 15 15"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M4.81812 4.68161C4.99386 4.85734 4.99386 5.14227 4.81812 5.318L3.08632 7.0498H11.9135L10.1817 5.318C10.006 5.14227 10.006 4.85734 10.1817 4.68161C10.3575 4.50587 10.6424 4.50587 10.8181 4.68161L13.3181 7.18161C13.4939 7.35734 13.4939 7.64227 13.3181 7.818L10.8181 10.318C10.6424 10.4937 10.3575 10.4937 10.1817 10.318C10.006 10.1423 10.006 9.85734 10.1817 9.68161L11.9135 7.9498H3.08632L4.81812 9.68161C4.99386 9.85734 4.99386 10.1423 4.81812 10.318C4.64239 10.4937 4.35746 10.4937 4.18173 10.318L1.68173 7.818C1.50599 7.64227 1.50599 7.35734 1.68173 7.18161L4.18173 4.68161C4.35746 4.50587 4.64239 4.50587 4.81812 4.68161Z"
						fill="#5046E5"
						fill-rule="evenodd"
						clip-rule="evenodd"
					></path>
				</svg>
			</div>
		</SliderPrimitive.Thumb>
	</SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
