import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return <main className="error-page">
    <span className="eyebrow">TIMELESS · 404</span>
    <h1>A different<br /><em>kind of detour.</em></h1>
    <p>This page has moved, or its story is still to be written.</p>
    <Link className="button button-dark" href="/">Return to Timeless <ArrowUpRight size={18} /></Link>
  </main>;
}
