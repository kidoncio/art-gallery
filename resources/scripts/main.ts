// Build something cool. <3
// @ts-ignore
import { createApp } from 'vue/dist/vue.esm-bundler.js';
import { i18nVue } from 'laravel-vue-i18n';
import PrimeVue from 'primevue/config';
import AutoComplete from 'primevue/autocomplete';
import ElementPlus from 'element-plus';
import 'primeflex/primeflex.css';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'element-plus/dist/index.css';

const components = import.meta.globEager('./components/*.vue');

const vueApp = createApp();

let initialLang = document.documentElement.lang?.replace('-', '_');

if (initialLang !== 'pt' && initialLang !== 'pt_BR') {
    initialLang = 'pt';
}

const initialLangLocale = import(`../lang/${initialLang}.json`);

vueApp.use(i18nVue, {
    lang: initialLang,
    resolve: (lang: string) => {
        return lang === initialLang
            ? initialLangLocale
            : import(`../lang/${lang}.json`);
    },
    
});

Object.entries(components).forEach(([path, definition]) => {
    // Get name of component, based on filename
    // "./components/Fruits.vue" will become "Fruits"
    // @ts-ignore
    const componentName = path
        .split('/')
        .pop()
        .replace(/\.\w+$/, '');

    // Register component on this Vue instance
    vueApp.component(componentName, definition.default);
});

vueApp.use(PrimeVue);
vueApp.component('AutoComplete', AutoComplete);
vueApp.use(ElementPlus);

vueApp.mount('#app');
