import dynamic from "next/dynamic";

const FadeLoader = dynamic(
  () => import("react-spinners").then((lib) => lib.FadeLoader),
  {
    ssr: false,
  }
);
type Props = {
  color?: string;
};
export default function GridSpinner({ color = "red" }: Props) {
  return <FadeLoader color={color} />;
}
