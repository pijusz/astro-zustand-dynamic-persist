import { useDynamicStore, type StoreType } from "../hooks/useStore";

export const DynamicFormMisc = ({ storeName }: { storeName: StoreType }) => {
	const useStore = useDynamicStore(storeName);
	const actions = useStore((state) => state.actions);
	const name = useStore((state) => state.item_name);
	const data = useStore((state) => state.data);
	const dates = actions.getDates();

	return (
		<div>
			<p style={{ color: "blue" }}>
				Store Persist Name is set from Astro props, Store Name: "{storeName}"
			</p>
			<button type="button" onClick={() => actions.setName("water")}>
				💧 Water
			</button>
			<button type="button" onClick={() => actions.setName("coffee")}>
				☕️ Coffee
			</button>
			<button type="button" onClick={() => actions.setName("tea")}>
				🍵 Tea
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

			<div>Current Misc "{name}"</div>
			<div>Current Misc Data {JSON.stringify(data)}</div>
			<div>Static Created: {dates[0].toISOString()}</div>
			<div>Static Updated: {dates[1].toISOString()}</div>
		</div>
	);
};
