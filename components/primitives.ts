import { tv } from "tailwind-variants";

export const title = tv({
  base: "tracking-tight inline font-semibold",
  compoundVariants: [
    {
      class: "bg-clip-text text-transparent bg-gradient-to-b",
      color: [
        "violet",
        "yellow",
        "blue",
        "cyan",
        "green",
        "pink",
        "foreground",
      ],
    },
  ],
  defaultVariants: {
    size: "md",
  },
  variants: {
    color: {
      blue: "from-[#5EA2EF] to-[#0072F5]",
      cyan: "from-[#00b7fa] to-[#01cfea]",
      foreground: "dark:from-[#FFFFFF] dark:to-[#4B4B4B]",
      green: "from-[#6FEE8D] to-[#17c964]",
      pink: "from-[#FF72E1] to-[#F54C7A]",
      violet: "from-[#FF1CF7] to-[#b249f8]",
      yellow: "from-[#FF705B] to-[#FFB457]",
    },
    fullWidth: {
      true: "w-full block",
    },
    size: {
      lg: "text-4xl lg:text-6xl",
      md: "text-[2.3rem] lg:text-5xl leading-9",
      sm: "text-3xl lg:text-4xl",
    },
  },
});

export const subtitle = tv({
  base: "w-full md:w-1/2 my-2 text-lg lg:text-xl text-default-600 block max-w-full",
  defaultVariants: {
    fullWidth: true,
  },
  variants: {
    fullWidth: {
      true: "!w-full",
    },
  },
});
