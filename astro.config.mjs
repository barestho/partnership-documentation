// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightOpenAPI, { openAPISidebarGroups } from 'starlight-openapi';


// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: {
				en: 'Barestho Partnership',
				// fr: 'Partenariat Barestho',
				// nl: 'Partnerschap Barestho',
			},
			plugins: [
				starlightOpenAPI([
					{
						base: 'api',
						schema: './schemas/openapi.yaml',
						sidebar: { 
							label: 'API reference',
						},
					},
				]),
			],
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/barestho', },
				{ icon: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/barestho/', },
			],
			sidebar: [
				{
					label: "Accueil",
					translations: {
						en: "Home",
						nl: "Home",
					},
					link: "/"
				},
				{
					label: 'Guides',
					translations: {
						en: "Guides",
						nl: "Gidsen",
					},
					autogenerate: { directory: 'guides' },
				},
				...openAPISidebarGroups,
			],

			// Localization
			defaultLocale: "root",
			locales: {
				root: {
					label: "English",
					lang: "en",
				},
				// fr: {
				// 	label: "Français",
				// 	lang: "fr",
				// },
				// nl: {
				// 	label: "Nederlands",
				// 	lang: "nl",
				// }
			}
		}),
	],
});
