import {Instruction} from "obsidian";

export const NAVIGATE_INSTRUCTION: Instruction = {
	command: "⮁",
	purpose: "to navigate",
};

export const INSERT_CHAR_INSTRUCTION: Instruction = {
	command: "↵",
	purpose: "to insert selected character",
};

export const INSTRUCTION_DISMISS: Instruction = {
	command: "esc",
	purpose: "to dismiss",
};

export const ELEMENT_RECENT: DomElementInfo = {
	cls: "icon inline-description recent",
	text: "↩",
	title: "used recently",
};

export const ELEMENT_FREQUENT: DomElementInfo = {
	cls: "icon inline-description frequent",
	text: "↺",
	title: "used frequently",
};

export const ELEMENT_FAVORITE: DomElementInfo = {
	cls: "icon inline-description favorite",
	text: "☆",
	title: "favorite",
};
