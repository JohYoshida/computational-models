import Link from "next/link";

const linkStyle = {
  marginRight: 15,
  textDecoration: "none"
};

const layoutStyle = {
  paddingBottom: 10,
  height: 40,
  boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.06)",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center"
};

export default function Header() {
  return (
    <div style={layoutStyle}>
      <title>Computational Models</title>
      <Link href="/">
        <a style={linkStyle}>Home</a>
      </Link>
      <Link href="/gameoflife">
        <a style={linkStyle}>Game Of Life</a>
      </Link>
      <Link href="/cellularautomata">
        <a style={linkStyle}>Cellular Automata</a>
      </Link>
      <Link href="/strangeloopexplorer">
        <a style={linkStyle}>GEB Strange Loop Explorer</a>
      </Link>
      <Link href="/populationevolution">
        <a style={linkStyle}>Population Evolution</a>
      </Link>
    </div>
  );
}
