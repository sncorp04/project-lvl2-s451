import renderOrdinary from './renderOrdinary';
import renderPlain from './renderPlain';
import renderJson from './renderJSON';

export default {
  ordinary: ast => renderOrdinary(ast),
  plain: ast => renderPlain(ast),
  json: ast => renderJson(ast),
};
