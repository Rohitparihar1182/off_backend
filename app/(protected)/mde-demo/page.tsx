"use client";
import React from "react";
import dynamic from "next/dynamic";
import "./uiwstyle.css"
const MDEditor = dynamic(() => import("@uiw/react-markdown-editor"), {
	ssr: false,
});

export default function App() {
	const [value, setValue] = React.useState("**Hello world!!!**");
	return (
		<div className="container">
			<div>Light Theme</div>
			<div data-color-mode="light">
				<MDEditor
					value={value}
					onChange={(val) => {
						setValue(val!);
					}}
				/>
			</div>
		</div>
	);
}
