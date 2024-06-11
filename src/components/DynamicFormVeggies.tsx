import { useStoreActions, useStoreData, useStoreName } from "../hooks/useStore";

export const DynamicFormVeggies = () => {
	const actions = useStoreActions("veggies");
	const data = useStoreData("veggies");
	const name = useStoreName("veggies");

	return (
		<div>
			<p style={{ color: "red" }}>This does not work, only the first time</p>
			<button type="button" onClick={() => actions.setName("carrot")}>
				🥕 Carrot
			</button>
			<button type="button" onClick={() => actions.setName("potato")}>
				🥔 Potato
			</button>
			<button type="button" onClick={() => actions.setName("tomato")}>
				🍅 Tomato
			</button>

			<button
				type="button"
				onClick={() => {
					actions.setData({
						randInt: Math.floor(Math.random() * 100),
					});
				}}
			>
				Set Random Data
			</button>

			<div>Current Veggie "{name}"</div>
			<div>Current Veggie Data {JSON.stringify(data)}</div>
		</div>
	);
};
