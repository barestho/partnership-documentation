// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightOpenAPI, { openAPISidebarGroups } from 'starlight-openapi';


// https://astro.build/config
export default defineConfig({
	site: 'https://barestho.github.io',
	base: '/partnership-documentation',
	integrations: [
		starlight({
			favicon: './public/favicon.ico',
			title: {
				en: 'Barestho Partnership',
				// fr: 'Partenariat Barestho',
				// nl: 'Partnerschap Barestho',
			},
			logo: {
				light: "./src/assets/logo-light.svg",
				dark: "./src/assets/logo-dark.svg",
				replacesTitle: true,
			},
			customCss: [
				'./src/style/theme.css',
			],
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
				{ icon: 'youtube', label: 'Youtube', href: 'https://www.youtube.com/@Barestho', },
				{ icon: 'linkedin', label: 'Linkedin', href: 'https://linkedin.com/company/barestho', },
				{ icon: 'email', label: 'Contact email', href: 'mailto:contact@barestho.com', },
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
