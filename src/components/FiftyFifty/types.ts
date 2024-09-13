export type FiftyFiftyData = {
  title: string;
  subtitle?: string;
  description: string;
  imagePosition?: "left" | "right";
  image: string;
} & React.HTMLProps<HTMLDivElement>;