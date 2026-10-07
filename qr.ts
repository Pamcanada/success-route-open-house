import { eventConfig } from "@/config/eventConfig";

function registrationLink(location: "brampton" | "halifax" | null) {
	const configuredUrl = eventConfig.registrationURL.trim();
	if (!configuredUrl) return null;

	try {
		const url = new URL(configuredUrl);
		if (url.protocol !== "https:" && url.protocol !== "http:") return null;

		if (location) url.searchParams.set("location", location);
		url.searchParams.set("utm_source", "qr");
		url.searchParams.set("utm_medium", "offline");
		url.searchParams.set(
			"utm_campaign",
			location
				? `${location}_october_open_house`
				: "october_open_house",
		);
		return url.toString();
	} catch {
		return null;
	}
}

export function qrLinks() {
	return {
		general: registrationLink(null),
		brampton: registrationLink("brampton"),
		halifax: registrationLink("halifax"),
	};
}
