const fallbackCopyTextToClipboard = (text: string) => {
	const textArea = document.createElement('textarea');
	textArea.value = text;
	textArea.style.position = 'fixed';
	textArea.style.top = '0';
	textArea.style.left = '0';

	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();

	try {
		document.execCommand('copy');
	} finally {
		document.body.removeChild(textArea);
	}
};

const clipboardUtil = (node: HTMLElement, text: string) => {
	try {
		if (!navigator.clipboard) {
			fallbackCopyTextToClipboard(text);
			return;
		}
		navigator.clipboard.writeText(text);
	} catch (error) {
		node.dispatchEvent(new CustomEvent('copy:error', { detail: error }));
	}
};

export const copy = (node: HTMLElement, text: string) => {
	const copyListener = async () => {
		text ? clipboardUtil(node, text) : clipboardUtil(node, node.textContent);
	};

	node.addEventListener('click', copyListener, true);

	return {
		update: (data: string) => (text = data),
		destroy: () => node.removeEventListener('click', copyListener, true),
	};
};
