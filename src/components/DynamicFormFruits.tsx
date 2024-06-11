import { useDynamicStore } from "../hooks/useStore";

const useStore = useDynamicStore("fruits");

export const DynamicFormFruits = () => {
	const actions = useStore((state) => state.actions);
	const name = useStore((state) => state.item_name);
	const data = useStore((state) => state.data);
	const dates = actions.getDates();

	return (
		<div>
			<p style={{ color: "green" }}>This works!</p>
			<button type="button" onClick={() => actions.setName("pineapple")}>
				🍍 PineApple
			</button>
			<button type="button" onClick={() => actions.setName("banana")}>
				🍌 Banana
			</button>
			<button type="button" onClick={() => actions.setName("apple")}>
				🍎 Apple
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

			<div>Current fruit "{name}"</div>
			<div>Current fruit Data {JSON.stringify(data)}</div>
			<div>Static Created: {dates[0].toISOString()}</div>
			<div>Static Updated: {dates[1].toISOString()}</div>
		</div>
	);
};
