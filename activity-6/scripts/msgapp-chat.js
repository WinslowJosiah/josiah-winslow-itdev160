// Declarations

var chatbot;
const chatState = {
	c4Diff: "connect4-setDifficulty",
	c4Game: "connect4-game",
	c4GameOver: "connect4-gameOver",
};

const EMOJI = {
	COLLISION_SYMBOL: "\uD83D\uDCA5",
	CROSS_MARK: "\u274C",
	DOWN_POINTING_RED_TRIANGLE: "\uD83D\uDD3B",
	HANDSHAKE: "\uD83E\uDD1D",
	INPUT_SYMBOL_FOR_NUMBERS: "\uD83D\uDD22",
	KEYCAP: "\uFE0F\u20E3",
	LARGE_RED_CIRCLE: "\uD83D\uDD34",
	LARGE_YELLOW_CIRCLE: "\uD83D\uDFE1",
	SMILING_FACE_WITH_OPEN_MOUTH_AND_SMILING_EYES: "\uD83D\uDE04",
	WHITE_MEDIUM_SQUARE: "\u25FB",
	WINKING_FACE: "\uD83D\uDE09"
}

// I hate how long this regex is
const emojiRegex = /\u{1F3F4}\u{E0067}\u{E0062}(?:\u{E0077}\u{E006C}\u{E0073}|\u{E0073}\u{E0063}\u{E0074}|\u{E0065}\u{E006E}\u{E0067})\u{E007F}|(?:\u{1F9D1}\u{1F3FB}\u200D\u{1F91D}\u200D\u{1F9D1}|\u{1F469}\u{1F3FC}\u200D\u{1F91D}\u200D\u{1F469})\u{1F3FB}|\u{1F468}(?:\u{1F3FC}\u200D(?:\u{1F91D}\u200D\u{1F468}\u{1F3FB}|[\u{1F33E}\u{1F373}\u{1F393}\u{1F3A4}\u{1F3A8}\u{1F3EB}\u{1F3ED}\u{1F4BB}\u{1F4BC}\u{1F527}\u{1F52C}\u{1F680}\u{1F692}\u{1F9AF}-\u{1F9B3}\u{1F9BC}\u{1F9BD}])|\u{1F3FF}\u200D(?:\u{1F91D}\u200D\u{1F468}[\u{1F3FB}-\u{1F3FE}]|[\u{1F33E}\u{1F373}\u{1F393}\u{1F3A4}\u{1F3A8}\u{1F3EB}\u{1F3ED}\u{1F4BB}\u{1F4BC}\u{1F527}\u{1F52C}\u{1F680}\u{1F692}\u{1F9AF}-\u{1F9B3}\u{1F9BC}\u{1F9BD}])|\u{1F3FE}\u200D(?:\u{1F91D}\u200D\u{1F468}[\u{1F3FB}-\u{1F3FD}]|[\u{1F33E}\u{1F373}\u{1F393}\u{1F3A4}\u{1F3A8}\u{1F3EB}\u{1F3ED}\u{1F4BB}\u{1F4BC}\u{1F527}\u{1F52C}\u{1F680}\u{1F692}\u{1F9AF}-\u{1F9B3}\u{1F9BC}\u{1F9BD}])|\u{1F3FD}\u200D(?:\u{1F91D}\u200D\u{1F468}[\u{1F3FB}\u{1F3FC}]|[\u{1F33E}\u{1F373}\u{1F393}\u{1F3A4}\u{1F3A8}\u{1F3EB}\u{1F3ED}\u{1F4BB}\u{1F4BC}\u{1F527}\u{1F52C}\u{1F680}\u{1F692}\u{1F9AF}-\u{1F9B3}\u{1F9BC}\u{1F9BD}])|\u200D(?:\u2764\uFE0F\u200D(?:\u{1F48B}\u200D)?\u{1F468}|[\u{1F468}\u{1F469}]\u200D(?:\u{1F466}\u200D\u{1F466}|\u{1F467}\u200D[\u{1F466}\u{1F467}])|\u{1F466}\u200D\u{1F466}|\u{1F467}\u200D[\u{1F466}\u{1F467}]|[\u{1F468}\u{1F469}]\u200D[\u{1F466}\u{1F467}]|[\u2695\u2696\u2708]\uFE0F|[\u{1F466}\u{1F467}]|[\u{1F33E}\u{1F373}\u{1F393}\u{1F3A4}\u{1F3A8}\u{1F3EB}\u{1F3ED}\u{1F4BB}\u{1F4BC}\u{1F527}\u{1F52C}\u{1F680}\u{1F692}\u{1F9AF}-\u{1F9B3}\u{1F9BC}\u{1F9BD}])|(?:\u{1F3FB}\u200D[\u2695\u2696\u2708]|\u{1F3FF}\u200D[\u2695\u2696\u2708]|\u{1F3FE}\u200D[\u2695\u2696\u2708]|\u{1F3FD}\u200D[\u2695\u2696\u2708]|\u{1F3FC}\u200D[\u2695\u2696\u2708])\uFE0F|\u{1F3FB}\u200D[\u{1F33E}\u{1F373}\u{1F393}\u{1F3A4}\u{1F3A8}\u{1F3EB}\u{1F3ED}\u{1F4BB}\u{1F4BC}\u{1F527}\u{1F52C}\u{1F680}\u{1F692}\u{1F9AF}-\u{1F9B3}\u{1F9BC}\u{1F9BD}]|[\u{1F3FB}-\u{1F3FF}])|\u{1F9D1}(?:\u{1F3FF}\u200D\u{1F91D}\u200D\u{1F9D1}[\u{1F3FB}-\u{1F3FF}]|\u200D\u{1F91D}\u200D\u{1F9D1})|\u{1F469}(?:\u{1F3FE}\u200D(?:\u{1F91D}\u200D\u{1F468}[\u{1F3FB}-\u{1F3FD}\u{1F3FF}]|[\u{1F33E}\u{1F373}\u{1F393}\u{1F3A4}\u{1F3A8}\u{1F3EB}\u{1F3ED}\u{1F4BB}\u{1F4BC}\u{1F527}\u{1F52C}\u{1F680}\u{1F692}\u{1F9AF}-\u{1F9B3}\u{1F9BC}\u{1F9BD}])|\u{1F3FD}\u200D(?:\u{1F91D}\u200D\u{1F468}[\u{1F3FB}\u{1F3FC}\u{1F3FE}\u{1F3FF}]|[\u{1F33E}\u{1F373}\u{1F393}\u{1F3A4}\u{1F3A8}\u{1F3EB}\u{1F3ED}\u{1F4BB}\u{1F4BC}\u{1F527}\u{1F52C}\u{1F680}\u{1F692}\u{1F9AF}-\u{1F9B3}\u{1F9BC}\u{1F9BD}])|\u{1F3FC}\u200D(?:\u{1F91D}\u200D\u{1F468}[\u{1F3FB}\u{1F3FD}-\u{1F3FF}]|[\u{1F33E}\u{1F373}\u{1F393}\u{1F3A4}\u{1F3A8}\u{1F3EB}\u{1F3ED}\u{1F4BB}\u{1F4BC}\u{1F527}\u{1F52C}\u{1F680}\u{1F692}\u{1F9AF}-\u{1F9B3}\u{1F9BC}\u{1F9BD}])|\u{1F3FB}\u200D(?:\u{1F91D}\u200D\u{1F468}[\u{1F3FC}-\u{1F3FF}]|[\u{1F33E}\u{1F373}\u{1F393}\u{1F3A4}\u{1F3A8}\u{1F3EB}\u{1F3ED}\u{1F4BB}\u{1F4BC}\u{1F527}\u{1F52C}\u{1F680}\u{1F692}\u{1F9AF}-\u{1F9B3}\u{1F9BC}\u{1F9BD}])|\u200D(?:\u2764\uFE0F\u200D(?:\u{1F48B}\u200D[\u{1F468}\u{1F469}]|[\u{1F468}\u{1F469}])|[\u{1F33E}\u{1F373}\u{1F393}\u{1F3A4}\u{1F3A8}\u{1F3EB}\u{1F3ED}\u{1F4BB}\u{1F4BC}\u{1F527}\u{1F52C}\u{1F680}\u{1F692}\u{1F9AF}-\u{1F9B3}\u{1F9BC}\u{1F9BD}])|\u{1F3FF}\u200D[\u{1F33E}\u{1F373}\u{1F393}\u{1F3A4}\u{1F3A8}\u{1F3EB}\u{1F3ED}\u{1F4BB}\u{1F4BC}\u{1F527}\u{1F52C}\u{1F680}\u{1F692}\u{1F9AF}-\u{1F9B3}\u{1F9BC}\u{1F9BD}])|(?:\u{1F9D1}\u{1F3FE}\u200D\u{1F91D}\u200D\u{1F9D1}|\u{1F469}\u{1F3FF}\u200D\u{1F91D}\u200D[\u{1F468}\u{1F469}])[\u{1F3FB}-\u{1F3FE}]|(?:\u{1F9D1}\u{1F3FD}\u200D\u{1F91D}\u200D\u{1F9D1}|\u{1F469}\u{1F3FE}\u200D\u{1F91D}\u200D\u{1F469})[\u{1F3FB}-\u{1F3FD}]|(?:\u{1F9D1}\u{1F3FC}\u200D\u{1F91D}\u200D\u{1F9D1}|\u{1F469}\u{1F3FD}\u200D\u{1F91D}\u200D\u{1F469})[\u{1F3FB}\u{1F3FC}]|\u{1F469}\u200D\u{1F469}\u200D(?:\u{1F466}\u200D\u{1F466}|\u{1F467}\u200D[\u{1F466}\u{1F467}])|\u{1F469}\u200D\u{1F466}\u200D\u{1F466}|\u{1F469}\u200D\u{1F469}\u200D[\u{1F466}\u{1F467}]|(?:\u{1F441}\uFE0F\u200D\u{1F5E8}|\u{1F469}(?:\u{1F3FF}\u200D[\u2695\u2696\u2708]|\u{1F3FE}\u200D[\u2695\u2696\u2708]|\u{1F3FD}\u200D[\u2695\u2696\u2708]|\u{1F3FC}\u200D[\u2695\u2696\u2708]|\u{1F3FB}\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|[\u{1F3C3}\u{1F3C4}\u{1F3CA}\u{1F46E}\u{1F471}\u{1F473}\u{1F477}\u{1F481}\u{1F482}\u{1F486}\u{1F487}\u{1F645}-\u{1F647}\u{1F64B}\u{1F64D}\u{1F64E}\u{1F6A3}\u{1F6B4}-\u{1F6B6}\u{1F926}\u{1F937}-\u{1F939}\u{1F93D}\u{1F93E}\u{1F9B8}\u{1F9B9}\u{1F9CD}-\u{1F9CF}\u{1F9D6}-\u{1F9DD}][\u{1F3FB}-\u{1F3FF}]\u200D[\u2640\u2642]|[\u26F9\u{1F3CB}\u{1F3CC}\u{1F575}](?:\uFE0F\u200D[\u2640\u2642]|[\u{1F3FB}-\u{1F3FF}]\u200D[\u2640\u2642])|\u{1F3F4}\u200D\u2620|[\u{1F3C3}\u{1F3C4}\u{1F3CA}\u{1F46E}\u{1F46F}\u{1F471}\u{1F473}\u{1F477}\u{1F481}\u{1F482}\u{1F486}\u{1F487}\u{1F645}-\u{1F647}\u{1F64B}\u{1F64D}\u{1F64E}\u{1F6A3}\u{1F6B4}-\u{1F6B6}\u{1F926}\u{1F937}-\u{1F939}\u{1F93C}-\u{1F93E}\u{1F9B8}\u{1F9B9}\u{1F9CD}-\u{1F9CF}\u{1F9D6}-\u{1F9DF}]\u200D[\u2640\u2642])\uFE0F|\u{1F469}\u200D\u{1F467}\u200D[\u{1F466}\u{1F467}]|\u{1F3F3}\uFE0F\u200D\u{1F308}|\u{1F469}\u200D\u{1F467}|\u{1F469}\u200D\u{1F466}|\u{1F415}\u200D\u{1F9BA}|\u{1F1FD}\u{1F1F0}|\u{1F1F6}\u{1F1E6}|\u{1F1F4}\u{1F1F2}|\u{1F9D1}[\u{1F3FB}-\u{1F3FF}]|\u{1F469}[\u{1F3FB}-\u{1F3FF}]|\u{1F1FF}[\u{1F1E6}\u{1F1F2}\u{1F1FC}]|\u{1F1FE}[\u{1F1EA}\u{1F1F9}]|\u{1F1FC}[\u{1F1EB}\u{1F1F8}]|\u{1F1FB}[\u{1F1E6}\u{1F1E8}\u{1F1EA}\u{1F1EC}\u{1F1EE}\u{1F1F3}\u{1F1FA}]|\u{1F1FA}[\u{1F1E6}\u{1F1EC}\u{1F1F2}\u{1F1F3}\u{1F1F8}\u{1F1FE}\u{1F1FF}]|\u{1F1F9}[\u{1F1E6}\u{1F1E8}\u{1F1E9}\u{1F1EB}-\u{1F1ED}\u{1F1EF}-\u{1F1F4}\u{1F1F7}\u{1F1F9}\u{1F1FB}\u{1F1FC}\u{1F1FF}]|\u{1F1F8}[\u{1F1E6}-\u{1F1EA}\u{1F1EC}-\u{1F1F4}\u{1F1F7}-\u{1F1F9}\u{1F1FB}\u{1F1FD}-\u{1F1FF}]|\u{1F1F7}[\u{1F1EA}\u{1F1F4}\u{1F1F8}\u{1F1FA}\u{1F1FC}]|\u{1F1F5}[\u{1F1E6}\u{1F1EA}-\u{1F1ED}\u{1F1F0}-\u{1F1F3}\u{1F1F7}-\u{1F1F9}\u{1F1FC}\u{1F1FE}]|\u{1F1F3}[\u{1F1E6}\u{1F1E8}\u{1F1EA}-\u{1F1EC}\u{1F1EE}\u{1F1F1}\u{1F1F4}\u{1F1F5}\u{1F1F7}\u{1F1FA}\u{1F1FF}]|\u{1F1F2}[\u{1F1E6}\u{1F1E8}-\u{1F1ED}\u{1F1F0}-\u{1F1FF}]|\u{1F1F1}[\u{1F1E6}-\u{1F1E8}\u{1F1EE}\u{1F1F0}\u{1F1F7}-\u{1F1FB}\u{1F1FE}]|\u{1F1F0}[\u{1F1EA}\u{1F1EC}-\u{1F1EE}\u{1F1F2}\u{1F1F3}\u{1F1F5}\u{1F1F7}\u{1F1FC}\u{1F1FE}\u{1F1FF}]|\u{1F1EF}[\u{1F1EA}\u{1F1F2}\u{1F1F4}\u{1F1F5}]|\u{1F1EE}[\u{1F1E8}-\u{1F1EA}\u{1F1F1}-\u{1F1F4}\u{1F1F6}-\u{1F1F9}]|\u{1F1ED}[\u{1F1F0}\u{1F1F2}\u{1F1F3}\u{1F1F7}\u{1F1F9}\u{1F1FA}]|\u{1F1EC}[\u{1F1E6}\u{1F1E7}\u{1F1E9}-\u{1F1EE}\u{1F1F1}-\u{1F1F3}\u{1F1F5}-\u{1F1FA}\u{1F1FC}\u{1F1FE}]|\u{1F1EB}[\u{1F1EE}-\u{1F1F0}\u{1F1F2}\u{1F1F4}\u{1F1F7}]|\u{1F1EA}[\u{1F1E6}\u{1F1E8}\u{1F1EA}\u{1F1EC}\u{1F1ED}\u{1F1F7}-\u{1F1FA}]|\u{1F1E9}[\u{1F1EA}\u{1F1EC}\u{1F1EF}\u{1F1F0}\u{1F1F2}\u{1F1F4}\u{1F1FF}]|\u{1F1E8}[\u{1F1E6}\u{1F1E8}\u{1F1E9}\u{1F1EB}-\u{1F1EE}\u{1F1F0}-\u{1F1F5}\u{1F1F7}\u{1F1FA}-\u{1F1FF}]|\u{1F1E7}[\u{1F1E6}\u{1F1E7}\u{1F1E9}-\u{1F1EF}\u{1F1F1}-\u{1F1F4}\u{1F1F6}-\u{1F1F9}\u{1F1FB}\u{1F1FC}\u{1F1FE}\u{1F1FF}]|\u{1F1E6}[\u{1F1E8}-\u{1F1EC}\u{1F1EE}\u{1F1F1}\u{1F1F2}\u{1F1F4}\u{1F1F6}-\u{1F1FA}\u{1F1FC}\u{1F1FD}\u{1F1FF}]|[#\*0-9]\uFE0F\u20E3|[\u{1F3C3}\u{1F3C4}\u{1F3CA}\u{1F46E}\u{1F471}\u{1F473}\u{1F477}\u{1F481}\u{1F482}\u{1F486}\u{1F487}\u{1F645}-\u{1F647}\u{1F64B}\u{1F64D}\u{1F64E}\u{1F6A3}\u{1F6B4}-\u{1F6B6}\u{1F926}\u{1F937}-\u{1F939}\u{1F93D}\u{1F93E}\u{1F9B8}\u{1F9B9}\u{1F9CD}-\u{1F9CF}\u{1F9D6}-\u{1F9DD}][\u{1F3FB}-\u{1F3FF}]|[\u26F9\u{1F3CB}\u{1F3CC}\u{1F575}][\u{1F3FB}-\u{1F3FF}]|[\u261D\u270A-\u270D\u{1F385}\u{1F3C2}\u{1F3C7}\u{1F442}\u{1F443}\u{1F446}-\u{1F450}\u{1F466}\u{1F467}\u{1F46B}-\u{1F46D}\u{1F470}\u{1F472}\u{1F474}-\u{1F476}\u{1F478}\u{1F47C}\u{1F483}\u{1F485}\u{1F4AA}\u{1F574}\u{1F57A}\u{1F590}\u{1F595}\u{1F596}\u{1F64C}\u{1F64F}\u{1F6C0}\u{1F6CC}\u{1F90F}\u{1F918}-\u{1F91C}\u{1F91E}\u{1F91F}\u{1F930}-\u{1F936}\u{1F9B5}\u{1F9B6}\u{1F9BB}\u{1F9D2}-\u{1F9D5}][\u{1F3FB}-\u{1F3FF}]|[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55\u{1F004}\u{1F0CF}\u{1F18E}\u{1F191}-\u{1F19A}\u{1F1E6}-\u{1F1FF}\u{1F201}\u{1F21A}\u{1F22F}\u{1F232}-\u{1F236}\u{1F238}-\u{1F23A}\u{1F250}\u{1F251}\u{1F300}-\u{1F320}\u{1F32D}-\u{1F335}\u{1F337}-\u{1F37C}\u{1F37E}-\u{1F393}\u{1F3A0}-\u{1F3CA}\u{1F3CF}-\u{1F3D3}\u{1F3E0}-\u{1F3F0}\u{1F3F4}\u{1F3F8}-\u{1F43E}\u{1F440}\u{1F442}-\u{1F4FC}\u{1F4FF}-\u{1F53D}\u{1F54B}-\u{1F54E}\u{1F550}-\u{1F567}\u{1F57A}\u{1F595}\u{1F596}\u{1F5A4}\u{1F5FB}-\u{1F64F}\u{1F680}-\u{1F6C5}\u{1F6CC}\u{1F6D0}-\u{1F6D2}\u{1F6D5}\u{1F6EB}\u{1F6EC}\u{1F6F4}-\u{1F6FA}\u{1F7E0}-\u{1F7EB}\u{1F90D}-\u{1F93A}\u{1F93C}-\u{1F945}\u{1F947}-\u{1F971}\u{1F973}-\u{1F976}\u{1F97A}-\u{1F9A2}\u{1F9A5}-\u{1F9AA}\u{1F9AE}-\u{1F9CA}\u{1F9CD}-\u{1F9FF}\u{1FA70}-\u{1FA73}\u{1FA78}-\u{1FA7A}\u{1FA80}-\u{1FA82}\u{1FA90}-\u{1FA95}]|[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299\u{1F004}\u{1F0CF}\u{1F170}\u{1F171}\u{1F17E}\u{1F17F}\u{1F18E}\u{1F191}-\u{1F19A}\u{1F1E6}-\u{1F1FF}\u{1F201}\u{1F202}\u{1F21A}\u{1F22F}\u{1F232}-\u{1F23A}\u{1F250}\u{1F251}\u{1F300}-\u{1F321}\u{1F324}-\u{1F393}\u{1F396}\u{1F397}\u{1F399}-\u{1F39B}\u{1F39E}-\u{1F3F0}\u{1F3F3}-\u{1F3F5}\u{1F3F7}-\u{1F4FD}\u{1F4FF}-\u{1F53D}\u{1F549}-\u{1F54E}\u{1F550}-\u{1F567}\u{1F56F}\u{1F570}\u{1F573}-\u{1F57A}\u{1F587}\u{1F58A}-\u{1F58D}\u{1F590}\u{1F595}\u{1F596}\u{1F5A4}\u{1F5A5}\u{1F5A8}\u{1F5B1}\u{1F5B2}\u{1F5BC}\u{1F5C2}-\u{1F5C4}\u{1F5D1}-\u{1F5D3}\u{1F5DC}-\u{1F5DE}\u{1F5E1}\u{1F5E3}\u{1F5E8}\u{1F5EF}\u{1F5F3}\u{1F5FA}-\u{1F64F}\u{1F680}-\u{1F6C5}\u{1F6CB}-\u{1F6D2}\u{1F6D5}\u{1F6E0}-\u{1F6E5}\u{1F6E9}\u{1F6EB}\u{1F6EC}\u{1F6F0}\u{1F6F3}-\u{1F6FA}\u{1F7E0}-\u{1F7EB}\u{1F90D}-\u{1F93A}\u{1F93C}-\u{1F945}\u{1F947}-\u{1F971}\u{1F973}-\u{1F976}\u{1F97A}-\u{1F9A2}\u{1F9A5}-\u{1F9AA}\u{1F9AE}-\u{1F9CA}\u{1F9CD}-\u{1F9FF}\u{1FA70}-\u{1FA73}\u{1FA78}-\u{1FA7A}\u{1FA80}-\u{1FA82}\u{1FA90}-\u{1FA95}]\uFE0F|[\u261D\u26F9\u270A-\u270D\u{1F385}\u{1F3C2}-\u{1F3C4}\u{1F3C7}\u{1F3CA}-\u{1F3CC}\u{1F442}\u{1F443}\u{1F446}-\u{1F450}\u{1F466}-\u{1F478}\u{1F47C}\u{1F481}-\u{1F483}\u{1F485}-\u{1F487}\u{1F48F}\u{1F491}\u{1F4AA}\u{1F574}\u{1F575}\u{1F57A}\u{1F590}\u{1F595}\u{1F596}\u{1F645}-\u{1F647}\u{1F64B}-\u{1F64F}\u{1F6A3}\u{1F6B4}-\u{1F6B6}\u{1F6C0}\u{1F6CC}\u{1F90F}\u{1F918}-\u{1F91F}\u{1F926}\u{1F930}-\u{1F939}\u{1F93C}-\u{1F93E}\u{1F9B5}\u{1F9B6}\u{1F9B8}\u{1F9B9}\u{1F9BB}\u{1F9CD}-\u{1F9CF}\u{1F9D1}-\u{1F9DD}]/gu

// Initialize the chat
function chatInit() {
	chatbot = {
		state: undefined,
		active: true,
		name: "C.H.A.T.B.O.T.",
		messages: [],
		con4: {
			COLS: 7,
			ROWS: 6,
			diff: undefined,
			board: undefined,
			lastMove: undefined,
			cpuTurn: undefined,
			firstEmptyRow: function(col) {
				var row = -1;
				while (this.board[row + 1][col] == 0) {
					row++;
					if (row + 1 >= this.ROWS) break;
				}
				return row;
			},
			makeMove: function(col) {
				if (col >= 0 && col < this.COLS)
				{
					var row = this.firstEmptyRow(col);
					if (row >= 0)
					{
						this.board[row][col] = this.cpuTurn ? 1 : 2;
						this.lastMove = col;
						return true;
					}
				}
				return false;
			},
			winner: function() {
				var lastRow = (this.firstEmptyRow(this.lastMove) + 1);
				var lastCol = this.lastMove;
				var lastPlayer = this.board[lastRow][lastCol];
				
				function checkDir(dir, explode) {
					var total = 0;
					
					var i = lastRow + dir.i;
					var j = lastCol + dir.j;
					while (i >= 0 && i < this.ROWS && j >= 0 && j < this.COLS && this.board[i][j]==lastPlayer) {
						// If you won, turn the winning pieces into explosions
						if (explode) this.board[i][j] = 3;
						total++;
						i += dir.i;
						j += dir.j;
					}
					return total;
				}
				
				function checkFour(dirA, dirB) {
					var fourInARow = (1 + checkDir.call(this, dirA) + checkDir.call(this, dirB) >= 4);
					// If you won...
					if (fourInARow)
					{
						// Turn the winning pieces into explosions
						checkDir.call(this, dirA, true);
						checkDir.call(this, dirB, true);
						this.board[lastRow][lastCol] = 3;
					}
					return fourInARow;
				}
				
				var dirsToCheck = [
					[{i: 0, j: -1}, {i: 0, j: 1}], // Horizontal
					[{i: -1, j: 0}, {i: 1, j: 0}], // Vertical
					[{i: 1, j: -1}, {i: -1, j: 1}], // Diagonal (/)
					[{i: 1, j: 1}, {i: -1, j: -1}] // Diagonal (\)
				];
				
				for (var dirs of dirsToCheck)
				{
					if (checkFour.apply(this, dirs)) return lastPlayer;
				}
				
				return false;
			},
			boardToString: function() {
				var boardRows = [];
				
				for (var i = 0; i < this.ROWS; i++)
				{
					var boardRow = "";
					this.board[i].forEach(function(stone) {
						boardRow += [EMOJI.WHITE_MEDIUM_SQUARE, EMOJI.LARGE_RED_CIRCLE, EMOJI.LARGE_YELLOW_CIRCLE, EMOJI.COLLISION_SYMBOL][stone];
					});
					boardRows.push(boardRow);
				}
				
				return boardRows.join("\n");
			},
			movementToString: function(col) {
				return [...range(0,6)].map(n => n==col ? EMOJI.DOWN_POINTING_RED_TRIANGLE : (this.firstEmptyRow(n) < 0 ? EMOJI.CROSS_MARK : (n+1).toString() + EMOJI.KEYCAP)).join("");
			},
			validColsToString: function() {
				return [...range(0,6)].map(n => this.firstEmptyRow(n) < 0 ? EMOJI.CROSS_MARK : (n+1).toString() + EMOJI.KEYCAP).join("");
			}
		}
	};
};

// Execute the logic behind the chat
async function runChat() {
	var con4 = chatbot.con4;
	
	while (true) {
		con4.state = chatState.c4Diff;
		con4.diff = undefined;
		// Loop until a difficulty setting has been chosen
		do {
			await sendMsg(`Choose your difficulty...
1${EMOJI.KEYCAP}: Easy
2${EMOJI.KEYCAP}: Medium
3${EMOJI.KEYCAP}: Hard`);
			
			chatbot.active = false;
			await until(() => chatbot.active);
			
			processMessages(function(msg, index){
				if (isUndefined(con4.diff))
				{
					if (msg.text.match(/^\s*(?:1|easy)\s*$/i))
					{
						con4.diff = 0;
					}
					else if (msg.text.match(/^\s*(?:2|med(ium)?)\s*$/i))
					{
						con4.diff = 1;
					}
					else if (msg.text.match(/^\s*(?:3|hard)\s*$/i))
					{
						con4.diff = 2;
					}
				}
			});
			
			if (isUndefined(con4.diff))
			{
				await sendMsg(`Whoops! That's not a valid difficulty setting!`);
			}
		} while (isUndefined(con4.diff));
		
		await sendMsg(`You chose ${["Easy", "Medium", "Hard"][con4.diff]}. This is gonna be fun...`);
		
		// Populate Connect 4 board
		con4.board = [];
		for (var i = 0; i < con4.ROWS; i++)
		{
			con4.board[i] = [];
			for (var j = 0; j < con4.COLS; j++)
			{
				con4.board[i][j] = 0;
			}
		}
		
		// Define initial variables
		con4.cpuTurn = false;
		con4.lastMove = undefined;
		
		// Play Connect 4 game
		chatbot.state = chatState.c4Game;
		await sendMsg(`Here is the game board.

${con4.validColsToString()}
${con4.boardToString()}`);
		do {
			// Allow the next move to be made
			await makeMove(con4.cpuTurn);
			// If someone won, stop playing
			if (con4.winner()) break;
			con4.cpuTurn = !con4.cpuTurn;
		} while (true);
		
		// Tell us who won
		chatbot.state = chatState.c4GameOver;
		if (con4.cpuTurn)
		{
			await sendMsg(`Looks like I won! ${EMOJI.SMILING_FACE_WITH_OPEN_MOUTH_AND_SMILING_EYES}

${con4.boardToString()}`);
		}
		else
		{
			await sendMsg(`Oh my, this is embarrassing...`);
			await sendMsg(`...I guess you won fair and square, my friend. ${EMOJI.HANDSHAKE} Good game.

${con4.boardToString()}`);
		}
		await sendMsg(`I'll reset the pieces, so we can start a new game! ${EMOJI.WINKING_FACE}`);
	}
}

// Connect 4 functions

async function makeMove(bot) {
	var con4 = chatbot.con4;
	var moveToMake;
	
	if (bot)
	{
		await sendMsg(`My turn!`);
		
		// Choose a good move
		// (At this point, it's just random)
		var validMoves = [];
		for (var i = 0; i < con4.COLS; i++)
		{
			if (con4.firstEmptyRow(i) >= 0)
			{
				validMoves.push(i);
			}
		}
		
		moveToMake = validMoves.random();
		
		// Make the chosen move
		con4.makeMove(moveToMake);
		await sendMsg(`I think I should go here:

${con4.movementToString(moveToMake)}
${con4.boardToString()}`);
	}
	else
	{
		// Ask for user input
		do {
			sendMsg(`Enter a column number from 1 to 7.`);
			chatbot.active = false;
			await until(() => chatbot.active);
			
			moveToMake = undefined;
			processMessages(function(msg, index) {
				var colMatch = msg.text.match(/^\s*(?:col(?:umn)?\s+)?(\d)\s*$/i);
				if (colMatch)
				{
					moveToMake = Number(colMatch[1]) - 1;
				}
			});
			
			var moveIsDefined = !isUndefined(moveToMake);
			var moveIsInBounds = moveToMake >= 0 && moveToMake < con4.COLS;
			var moveIsValid = con4.firstEmptyRow(moveToMake) >= 0;
			if (!moveIsDefined)
			{
				await sendMsg(`You must enter in a number.`);
				await sendMsg(`Here's the board again. There are numbers here for a reason...I expect you to use them! ${EMOJI.INPUT_SYMBOL_FOR_NUMBERS}

${con4.validColsToString()}
${con4.boardToString()}`);
			}
			else if (!moveIsInBounds)
			{
				await sendMsg(`That's not a valid column number.`);
				await sendMsg(`Here's the board again. You can make a move in any column from 1 to 7 that doesn't have a ${EMOJI.CROSS_MARK} over it.

${con4.validColsToString()}
${con4.boardToString()}`);
			}
			else if (!moveIsValid)
			{
				await sendMsg(`You can't make a move in that column.`);
				await sendMsg(`Here's the board again, so you know which moves are valid. If you see a ${EMOJI.CROSS_MARK} over a column, you can't make a move there.

${con4.validColsToString()}
${con4.boardToString()}`);
			}
		} while (!(moveIsDefined && moveIsInBounds && moveIsValid));
		
		// Make the chosen move
		con4.makeMove(moveToMake);
		
		await sendMsg(`${con4.movementToString(moveToMake)}
${con4.boardToString()}`);
	}
}

// Chatbot functions

// Send a message from the chatbot
async function sendMsg(text) {
	// Display the typing animation
	await sleep(500);
	showTyping();
	// Simulate typing
	await sleep(text.replace(emojiRegex, "#").length * 15);
	// Hide the typing animation
	hideTyping();
	// Do the rather immediate work of adding the messages
	appendMessage(messageType.in, chatbot.name, text);
	// Discard all of the messages sent in that time
	processMessages(() => null);
}

// Run a function on every unprocessed message
function processMessages(callback) {
	var index = 0;
	var breakLoop = false;
	while (chatbot.messages.length > 0)
	{
		breakLoop = callback(chatbot.messages[0], index);
		chatbot.messages.shift();
		index++;
		if (breakLoop) break;
	}
}
