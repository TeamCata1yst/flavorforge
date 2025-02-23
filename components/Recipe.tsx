import React from "react";

type Props = {
	name: string;
	img: string;
	info: {
		kcal: number;
		protein: number;
		fat: number;
		carbs: number;
	};
	time: string;
};

export default function Recipe({ name, info, img, time }: Props) {
	return (
		<button className="border-2 border-primary/40 bg-background p-3 space-y-2 text-center h-full transition-all flex flex-col relative rounded-lg group hover:shadow-primary/20 cursor-pointer hover:shadow-lg">
			<span className="text-lg font-montserrat">{name}</span>
			<div className="relative h-48 w-full rounded-md overflow-hidden">
				<img
					src={img}
					alt={name}
					className="h-48 w-full rounded-md object-cover"
				/>
				<p className="text-white absolute inset-0 flex items-center justify-center -left-96 group-hover:left-0 group-hover:bg-primary/80 transition-all h-48">
					{info.kcal} kcal <br />
					{info.carbs}g carbs <br />
					{info.protein}g protein <br />
					{info.fat}g fat
				</p>
			</div>
			<span className="text-sm">Time to cook: {time}</span>
		</button>
	);
}
