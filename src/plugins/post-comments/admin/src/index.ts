import { getTranslation } from './utils/getTranslation';
import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';
import CommentsButton from './components/CommentsButton';

export default {
  register(app: any) {
    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });
  },

  bootstrap(app: any) {
    const contentManager = app.getPlugin('content-manager');

    console.log('Plugin Comments Pagination iniciado');
    console.log('contentManager', contentManager);

    if (contentManager) {
      contentManager.injectComponent('editView', 'right-links', {
        name: 'comments-button',
        shouldDisplay: ({ layout }: any) => {
          return layout?.info?.singularName === 'post';
        },
        Component: CommentsButton,
      });
    }
  },

  async registerTrads({ locales }: { locales: string[] }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(`./translations/${locale}.json`);
          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  },
};
