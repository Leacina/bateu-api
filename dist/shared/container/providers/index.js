"use strict";

require("../../../modules/users/providers");

require("../../../modules/establishment/providers");

require("../../../modules/piece/providers");

require("../../../modules/budget/providers");

require("../../../modules/quotation/providers");

var _tsyringe = require("tsyringe");

var _EtherealMailProvider = _interopRequireDefault(require("./MailProvider/implementations/EtherealMailProvider"));

var _HandlebarsMailTemplateProvider = _interopRequireDefault(require("./MailTemplateProvider/implementations/HandlebarsMailTemplateProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('MailTemplateProvider', _HandlebarsMailTemplateProvider.default);

_tsyringe.container.registerInstance('MailProvider', _tsyringe.container.resolve(_EtherealMailProvider.default));