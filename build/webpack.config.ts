import { Configuration } from "webpack";
import l10n from "./webpack.config.l10n";
import { main, unminified } from "./webpack.config.main";
import {
  minified as minifiedCSS,
  unminified as unminifiedCSS,
  themes,
} from "./webpack.config.style";

import {
  scripts as plugins,
  styles as pluginStyles,
} from "./webpack.config.plugins";

export default [
  main,
  unminified,
  l10n,
  minifiedCSS,
  unminifiedCSS,
  ...plugins,
  ...pluginStyles,
  ...themes,
] as Configuration[];
