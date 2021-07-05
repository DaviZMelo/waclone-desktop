import IWhatsappProvider from '@shared/container/providers/WhatsappProvider/models/IWhatsappProvider';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class HelpCommandService {
  constructor(
    @inject('WhatsappProvider')
    private whatsappProvider: IWhatsappProvider,
  ) {}

  public async execute() {
    const helpText = `    
🛡️    *Comandos administrativos*

+adicionarpermissao (número) - Concede o acesso de um número ao bot.
  *Exemplo*:  _+adicionarpermissao 11964945942_

+removerpermissao (número) - Remove o acesso de um número ao bot.
  *Exemplo*:  _+removerpermissao 11964945942_

+listarautorizados - Lista os telefones autorizados a usar o bot.
  *Exemplo*:  _+listarautorizados_

🤖    *Comandos gerais*

+ativar - Ativa a adição de membros ao grupo anfitrião
  *Exemplo*:  _+ativar

+desativar - Desativa a adição de membros.
  *Exemplo*:  _+desativar

+grupoanfitriao - Digite esse comando no grupo onde serão colocados os membros. O bot precisa estar no grupo e ser administrador.
  *Exemplo*:  _+grupoanfitriao_

+grupoalvo (link do grupo) - Define o grupo de onde virão os membros. Quando você executar o comando o bot irá entrar no grupo e te enviar um arquivo .VCF (contatos) que você precisa abrir para que ele possa adicionar membros ao grupo.
  *Exemplo*:  _+grupoalvo https://chat.whatsapp.com/blablabla_

+grupolog - Digite esse comando no grupo onde serão enviados os registros. O bot precisa estar no grupo.
  *Exemplo*:  _+grupolog_


⚙️    *Configurações*

+delay (segundos) - Define o delay de adição de cada membro (Padrão de 30 segundos).
  *Exemplo*:  _+delay 60_

+modolink (on ou off) - O modo link faz com que ao invés do bot adicione membros de outros grupos diretamente, ele envie o link do grupo anfitrião para os alvos.
  *Exemplo*:  _+modolink on_

+mensagemlink (mensagem) - Define a mensagem que acompanhará o link do grupo no modolink
  *Exemplo*:  _+mensagemlink Entre nesse grupo, fazemos sorteios diários!_

+modolog (on ou off) - O modo log faz com que sejam enviados relatórios de falhas ao grupo definido pelo comando +grupolog.
  *Exemplo*:  _+modolog on_

    `;
    await this.whatsappProvider.sendText(
      this.whatsappProvider.message.from,
      helpText,
    );

    return helpText;
  }
}
