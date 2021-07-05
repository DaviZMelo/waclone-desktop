import React from 'react';
import Collapse from '../../components/Collapse';
import Dashboard from '../../templates/Dashboard';
import {
  CollapseContainer,
  CollapseList,
  Collapses,
  Container,
} from './styles';

const Help: React.FC = () => {
  return (
    <Dashboard>
      <Container>
        <Collapses>
          <CollapseList>
            <h1>FAQ</h1>
            <CollapseContainer>
              <Collapse title="Como faço para desconectar o bot do meu whatsapp?">
                Você tem duas opções.
                <br /> 1 - Clique na opção de deslogar no canto inferior direito
                do painel.
                <br /> 2 - Desconecte pelas configurações de Whatsapp Web do seu
                próprio whatsapp.
              </Collapse>
              <Collapse title="O que significa os parênteses nos comandos?">
                Os parênteses são um exemplo de onde você deve colocar os
                parâmetros do comando, por exemplo: <br />
                +adicionarpermissao (número)
                <br />
                +adicionarpermissao 11964945942
              </Collapse>
              <Collapse title="O bot não me responde!">
                Verifique se o seu número está autorizado a usar o bot. <br />
                OBS: O whatsapp em que o bot está hospedado não pode utiliza-lo.
              </Collapse>
            </CollapseContainer>
          </CollapseList>
          <CollapseList>
            <h1>Comandos</h1>
            <CollapseContainer>
              <Collapse title="+comandos">
                Envia todos os comandos disponíveis do bot no chat onde o
                comando foi executado.
              </Collapse>
              <Collapse title="+adicionarpermissao (número)">
                Autoriza o telefone informado a usar o bot.
              </Collapse>
              <Collapse title="+removerpermissao (número)">
                Desautoriza o telefone informado a usar o bot.
              </Collapse>
              <Collapse title="+listarautorizados">
                Envia todos os telefones autorizados a usar o bot no chat onde o
                comando foi executado.
              </Collapse>
              <Collapse title="+delay (segundos)">
                Define o intervalo de tempo em que as ações serão executadas.
                <br />
                Um delay de 20 segundos faz com que um membro seja adicionado a
                cada 20 segundos.
              </Collapse>
            </CollapseContainer>
          </CollapseList>
        </Collapses>
      </Container>
    </Dashboard>
  );
};

export default Help;
