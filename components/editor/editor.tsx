"use client";

import React from "react";
import dynamic from "next/dynamic";
import "./editor.css";

const MDEditor = dynamic(() => import("@uiw/react-markdown-editor"), {
	ssr: false,
});

export default function Editor({value, onChange}: {value: string, onChange: (a:string) => void}) {
	return (
		<div data-color-mode="light">
			<MDEditor
				value={value}
				onChange={(val) => {
					onChange(val!);
				}}
			/>
		</div>
	);
}
