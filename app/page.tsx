import type { Metadata } from "next";
import { pages } from "../lib/pages";
import TTFLHome from "../components/TTFLHome";
export const metadata: Metadata = {title:pages.index.title,description:pages.index.description,alternates:{canonical:"/"}};
export default function Home(){return <><TTFLHome/>{pages.index.schemas.map((schema,index)=><script key={index} type="application/ld+json" dangerouslySetInnerHTML={{__html:schema}}/>)}</>}