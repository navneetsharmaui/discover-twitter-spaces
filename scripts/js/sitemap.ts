/* eslint-disable no-console */
import fs from 'fs';

const pathToWorkspaceJSON = './sveltekit-space.json';

const filterArguments = (argv: string[], flag: string): string[] =>
	argv.filter((value) => value.includes(flag)).map((value) => value.split('=')[1]);

const getArguments = (argv: string[], flag: string): string =>
	filterArguments(argv, flag) ? filterArguments(argv, flag).reduce((value) => value) : '';

const writeToFile = (filePath: string, data: string): void => fs.writeFileSync(filePath, data);

const processArguments = process.argv;

const project = getArguments(processArguments, '--project');

const workspace = JSON.parse(
	fs.readFileSync(pathToWorkspaceJSON, {
		encoding: 'utf8',
	}),
);

const root = workspace['projects'][project]['root'];
const routes = workspace['projects'][project]['routes'];
const assets = workspace['projects'][project]['assets'];

const URL = process.env.SVELTEKIT_BLOG_BASE_URL;
const BASE_URL = URL ? URL : 'https://discover-twitter-spaces.vercel.app';
const pages = [''];

fs.readdirSync(`${root}/${routes}`).forEach((file) => {
	file = file.split('.')[0];

	if (
		file.charAt(0) !== '_' &&
		file !== 'sitemap' &&
		file !== 'index' &&
		file !== 'api' &&
		file !== 'rss'
	) {
		pages.push(file);
	}
});

const render = (pages: string[]) => `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  ${pages
		.map(
			(page: string) => `
    <url><loc>${BASE_URL}/${page ? `${page}/` : ''}</loc><priority>0.85</priority></url>
  `,
		)
		.join('\n')}
</urlset>
`;

const sitemap = render(pages);

writeToFile(`${root}/${assets}/sitemap.xml`, sitemap);
