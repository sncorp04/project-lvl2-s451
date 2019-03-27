import renderOrdinary from './renderOrdinary';
import renderPlain from './renderPlain';

export default {
  ordinary: ast => renderOrdinary(ast),
  plain: ast => renderPlain(ast),
};
