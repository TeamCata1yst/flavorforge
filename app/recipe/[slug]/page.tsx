import React from "react";
import PageComponent from "./PageComponent";

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const slug = (await params).slug;
	return <PageComponent slug={slug} />;
}
