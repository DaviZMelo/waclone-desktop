import { container } from 'tsyringe';
import AddUserPermissionService from '@modules/commands/services/AddAllowedUsersService';
import CommandsCommandService from '@modules/commands/services/ListCommandsService';
import HostGroupService from '@modules/commands/services/SetHostGroupService';
import ListAllowedUsersService from '@modules/commands/services/ListAllowedUsersService';
import RemoveAllowedUser from '@modules/commands/services/RemoveAllowedUserService';
import WaError from '@shared/errors/WaError';
import SetTargetGroupSerivce from '@modules/commands/services/SetTargetGroupService';
import SetDelayService from '@modules/commands/services/SetDelayService';
import DisableTaskService from '@modules/commands/services/StopCloningService';
import EnableTaskService from '@modules/commands/services/StartCloningService';
import SetLinkModeService from '@modules/commands/services/SetLinkModeService';
import SetLinkMessageService from '@modules/commands/services/SetLinkMessageService';
import SetLogGroupService from '@modules/commands/services/SetLogGroupService';
import SetLogModeService from '@modules/commands/services/SetLogModeService';

export default class HandleCommandsController {
  public async create(command: string, params: Array<any>): Promise<any> {
    const commandsList = [
      'comandos',
      'listarautorizados',
      'grupoanfitriao',
      'desativar',
      'ativar',
      'grupolog',
      'delay',
      'modolink',
      'mensagemlink',
      'adicionarpermissao',
      'removerpermissao',
      'grupoalvo',
      'modolog',
    ];

    const isAValidCommand = commandsList.find(
      commandListItem => commandListItem === command,
    );

    if (!isAValidCommand) {
      throw new WaError(
        'Comando inexistente, digite +comandos para ver os comandos disponíveis',
      );
    }

    if (command === 'comandos')
      return container.resolve(CommandsCommandService).execute();

    if (command === 'listarautorizados')
      return container.resolve(ListAllowedUsersService).execute();

    if (command === 'grupoanfitriao')
      return container.resolve(HostGroupService).execute();

    if (command === 'desativar')
      return container.resolve(DisableTaskService).execute();

    if (command === 'ativar')
      return container.resolve(EnableTaskService).execute();

    if (command === 'grupolog')
      return container.resolve(SetLogGroupService).execute();

    if (params.length < 1)
      throw new WaError('É necessário informar os parâmetros');

    if (command === 'delay')
      return container.resolve(SetDelayService).execute(params[0]);

    if (command === 'modolink')
      return container.resolve(SetLinkModeService).execute(params[0]);

    if (command === 'mensagemlink')
      return container
        .resolve(SetLinkMessageService)
        .execute(params.join(' ').toString());

    if (command === 'adicionarpermissao')
      return container.resolve(AddUserPermissionService).execute(params[0]);

    if (command === 'removerpermissao')
      return container.resolve(RemoveAllowedUser).execute(params[0]);

    if (command === 'grupoalvo')
      return container.resolve(SetTargetGroupSerivce).execute(params[0]);

    if (command === 'modolog')
      return container.resolve(SetLogModeService).execute(params[0]);

    throw new WaError('Erro desconhecido, contate o desenvolvedor');
  }
}
