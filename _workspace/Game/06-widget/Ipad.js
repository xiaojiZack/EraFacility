function closeOverlay() {
	$("#customOverlay").addClass("hidden").parent().addClass("hidden");
}
F.closeOverlay = closeOverlay;

function updateOptions() {
	if (T.currentOverlay === "options" && T.optionsRefresh && V.passage !== "Start") {
		updatehistorycontrols();
		const optionsData = clone(V.options);
		const tmpButtons = T.buttons;
		const tmpKey = T.key;

		State.restore();
		V.options = optionsData;
		State.show();

		T.key = tmpKey;
		T.buttons = tmpButtons;
		T.buttons.setupTabs();
		if (T.key !== "options") {
			T.buttons.setActive(T.buttons.activeTab);
		}
	}
}
F.updateOptions = updateOptions;