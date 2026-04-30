// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: {
				en: 'Barestho Partnership',
				fr: 'Partenariat Barestho',
				nl: 'Partnerschap Barestho',
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/barestho', },
				{ icon: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/barestho/', },
			],
			sidebar: [
				{
					label: "Accueil",
					link: "/"
				},
				{
					label: 'Guides',
					translations: {
						en: "Guides",
						nl: "Gidsen",
					},
					autogenerate: { directory: 'guides' },
				}
			],

			// Localization
			defaultLocale: "fr",
			locales: {
				fr: {
					label: "Français",
					lang: "fr",
				},
				en: {
					label: "English",
					lang: "en",
				},
				nl: {
					label: "Nederlands",
					lang: "nl",
				}
			}
		}),
	],
});
