import type { Preview } from '@storybook/react-vite'
import '../src/tokens/colors.css'

const preview: Preview = {
  parameters: {
    viewport: {
      viewports: {
        mobile390: {
          name: 'Mobile 390px',
          styles: {
            width: '390px',
            height: '844px',
          },
        },
      },
    },
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;
