import React from "react";
import "./parceiros-empresas.css";

const anoPrograma = 2027;
const dataFestival = "04 de dezembro de 2027";

const patrocinadores = [
  /*
  Exemplo futuro:

  {
    nome: "Empresa Exemplo",
    categoria: "Parceiro Anual — Alimentação",
    logo: "/assets/img/patrocinadores/empresa-exemplo.png",
    posicao: 1,
  },
  */
];

export default function ParceirosEmpresas() {
  const scrollToSection = (event, id) => {
    event.preventDefault();

    const target = document.querySelector(id);

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="parceiros-page">
      <div className="parceiros-top-bar">
        Programa de Parcerias Empresariais Hot Dogueres{" "}
        <strong>{anoPrograma}</strong>
      </div>

      <header className="parceiros-hero">
        <div className="parceiros-container">
          <div className="parceiros-hero-content">
            <div className="parceiros-badge">
              🤝 Empresas e pessoas unidas por um bem maior
            </div>

            <h1>Faça parte dessa grande ação solidária</h1>

            <p>
              Seja parceiro dessa grande corrente do bem Hot Dogueres e
              participe de um ecossistema que une impacto social, educação,
              proteção animal, meio ambiente, tecnologia e solidariedade.
            </p>

            <div className="parceiros-hero-actions">
              <a
                href="#fazer-parte"
                className="parceiros-btn parceiros-btn-primary"
                onClick={(event) => scrollToSection(event, "#fazer-parte")}
              >
                Quero ser parceiro
              </a>

              <a
                href="#planos"
                className="parceiros-btn parceiros-btn-outline"
                onClick={(event) => scrollToSection(event, "#planos")}
              >
                Ver cotas e oportunidades
              </a>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="parceiros-container">
          <div className="parceiros-intro-box">
            <h2>Sua empresa dentro do Ecossistema Hot Dogueres</h2>

            <p>
              A parceria não é apenas uma cota de mídia. É uma participação
              contínua na construção de ações, projetos e experiências que geram
              visibilidade, relacionamento, impacto e reconhecimento público.
            </p>
          </div>
        </section>

        <section className="parceiros-section">
          <div className="parceiros-container">
            <div className="parceiros-section-title">
              <span>Como funciona</span>

              <h2>Um programa empresarial anual, por evento ou por permuta</h2>

              <p>
                A empresa pode participar de forma contínua durante o ano, apoiar
                eventos específicos ou contribuir por meio de produtos e serviços
                negociados conforme cada projeto.
              </p>
            </div>

            <div className="parceiros-grid parceiros-grid-3">
              <div className="parceiros-card">
                <div className="parceiros-card-icon">📅</div>

                <h3>Parceiro Anual</h3>

                <p>
                  Presença durante o período contratado, com participação no
                  ecossistema, benefícios previstos, programa de pontos e
                  acompanhamento pela Área do Parceiro.
                </p>
              </div>

              <div className="parceiros-card">
                <div className="parceiros-card-icon">🎪</div>

                <h3>Por Evento</h3>

                <p>
                  A empresa apoia uma ação, projeto ou evento específico. O
                  valor varia conforme o tamanho, formato e necessidade do
                  evento.
                </p>
              </div>

              <div className="parceiros-card">
                <div className="parceiros-card-icon">🔄</div>

                <h3>Por Permuta</h3>

                <p>
                  Parcerias com fornecimento de produtos ou serviços, como água
                  mineral, sucos, alimentação, ração, brindes, estrutura ou
                  apoio operacional.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="parceiros-section parceiros-section-light" id="beneficios">
          <div className="parceiros-container">
            <div className="parceiros-section-title">
              <span>Benefícios</span>

              <h2>Por que participar?</h2>

              <p>
                A empresa parceira se conecta a projetos reais, acompanha sua
                participação e pode ser reconhecida publicamente pelo seu
                envolvimento.
              </p>
            </div>

            <div className="parceiros-grid parceiros-grid-4">
              <div className="parceiros-card">
                <div className="parceiros-card-icon">📣</div>

                <h3>Exposição da marca</h3>

                <p>
                  Presença institucional nos canais, ações e materiais
                  relacionados ao programa.
                </p>
              </div>

              <div className="parceiros-card">
                <div className="parceiros-card-icon">📊</div>

                <h3>Área do Parceiro</h3>

                <p>
                  Acompanhamento da empresa, participação, pagamentos, pontos e
                  histórico.
                </p>
              </div>

              <div className="parceiros-card">
                <div className="parceiros-card-icon">🏆</div>

                <h3>Programa de pontos</h3>

                <p>
                  Empresas acumulam pontos por participação, impacto social,
                  compromisso e envolvimento.
                </p>
              </div>

              <div className="parceiros-card">
                <div className="parceiros-card-icon">❤️</div>

                <h3>Impacto social</h3>

                <p>
                  Participação em uma corrente do bem envolvendo pessoas,
                  empresas, escolas e comunidades.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="parceiros-section" id="pontos">
          <div className="parceiros-container">
            <div className="parceiros-section-title">
              <span>Programa de Pontos</span>

              <h2>Como sua empresa pode ganhar pontos?</h2>

              <p>
                O Programa de Pontos Hot Dogueres valoriza empresas que
                participam, cumprem seus compromissos e se envolvem de verdade
                nas ações do ecossistema.
              </p>
            </div>

            <div className="parceiros-points-list">
              <div className="parceiros-point-item">
                <strong>🤝 Participação</strong>
                Presença de representantes nos eventos e projetos.
              </div>

              <div className="parceiros-point-item">
                <strong>❤️ Impacto Social</strong>
                Participação em ações sociais e solidárias.
              </div>

              <div className="parceiros-point-item">
                <strong>🎓 Educação</strong>
                Apoio e participação em projetos educacionais.
              </div>

              <div className="parceiros-point-item">
                <strong>🐾 Proteção Animal</strong>
                Envolvimento nas ações voltadas aos animais.
              </div>

              <div className="parceiros-point-item">
                <strong>🌱 Meio Ambiente</strong>
                Participação em projetos ambientais e sustentáveis.
              </div>

              <div className="parceiros-point-item">
                <strong>🤖 Tecnologia</strong>
                Apoio e participação em iniciativas de inovação.
              </div>

              <div className="parceiros-point-item">
                <strong>⏰ Compromisso</strong>
                Cumprimento das obrigações e pagamentos dentro dos prazos.
              </div>

              <div className="parceiros-point-item">
                <strong>🚀 Envolvimento</strong>
                Participação em diferentes projetos ao longo do ano.
              </div>
            </div>

            <div className="parceiros-notice">
              Os pontos individuais das empresas não precisam ser divulgados
              publicamente. O ranking público pode apresentar posições como 1º,
              2º e 3º lugar, mantendo a disputa saudável até o final da
              temporada.
            </div>
          </div>
        </section>

        <section className="parceiros-section parceiros-section-light">
          <div className="parceiros-container">
            <div className="parceiros-ranking-box">
              <h3>Uma disputa saudável durante todo o ano</h3>

              <p>
                Cada empresa poderá acompanhar sua própria evolução por meio da
                Área do Parceiro HotCore. O melhor desempenho será reconhecido no
                grande momento do ecossistema:{" "}
                <strong>Festival Cultural Hot Dogueres</strong>, com previsão
                para <strong>{dataFestival}</strong>.
              </p>

              <div className="parceiros-ranking-list">
                <div className="parceiros-ranking-item">
                  <span>🥇 1º lugar</span>
                  <small>Empresa com melhor desempenho</small>
                </div>

                <div className="parceiros-ranking-item">
                  <span>🥈 2º lugar</span>
                  <small>Destaque de participação</small>
                </div>

                <div className="parceiros-ranking-item">
                  <span>🥉 3º lugar</span>
                  <small>Destaque de envolvimento</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="parceiros-section" id="planos">
          <div className="parceiros-container">
            <div className="parceiros-section-title">
              <span>Cotas e oportunidades</span>

              <h2>Escolha como sua marca quer fazer parte</h2>

              <p>
                As vagas são limitadas. A disponibilidade poderá ser atualizada
                conforme as adesões realizadas.
              </p>
            </div>

            <div className="parceiros-plans-table">
              <table>
                <thead>
                  <tr>
                    <th>Modalidade</th>
                    <th>Vagas</th>
                    <th>Investimento</th>
                    <th>Formato</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>
                      🥫 <strong>Parceiro Anual — Alimentação</strong>
                    </td>
                    <td>8</td>
                    <td>R$ 10.000/mês</td>
                    <td>
                      <span className="parceiros-tag">Anual</span>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      🍴 <strong>Patrocínio Especial — Alimentação</strong>
                    </td>
                    <td>1</td>
                    <td>R$ 150.000</td>
                    <td>
                      <span className="parceiros-tag">Especial</span>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      🏆 <strong>Vaga por Pontos — Alimentação</strong>
                    </td>
                    <td>1</td>
                    <td>Conforme regulamento</td>
                    <td>
                      <span className="parceiros-tag">Desempenho</span>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      🐾 <strong>Parceiro Anual — Alimentação Animal</strong>
                    </td>
                    <td>4</td>
                    <td>R$ 8.000/mês</td>
                    <td>
                      <span className="parceiros-tag">Anual</span>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      🐶{" "}
                      <strong>Patrocínio Especial — Alimentação Animal</strong>
                    </td>
                    <td>1</td>
                    <td>R$ 120.000</td>
                    <td>
                      <span className="parceiros-tag">Especial</span>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      🏆{" "}
                      <strong>Vaga por Pontos — Alimentação Animal</strong>
                    </td>
                    <td>1</td>
                    <td>Conforme regulamento</td>
                    <td>
                      <span className="parceiros-tag">Desempenho</span>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      🔄 <strong>Parceiros por Permuta</strong>
                    </td>
                    <td>Limitado</td>
                    <td>Conforme negociação</td>
                    <td>
                      <span className="parceiros-tag">Permuta</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="parceiros-notice">
              A parceria anual foi pensada para empresas que desejam construir
              presença contínua ao longo de {anoPrograma}. Empresas que aderirem
              após janeiro poderão regularizar os meses já transcorridos no
              momento da assinatura, conforme as regras comerciais do programa.
            </div>
          </div>
        </section>

        <section className="parceiros-section parceiros-section-light" id="fazer-parte">
          <div className="parceiros-container">
            <div className="parceiros-section-title">
              <span>Como fazer parte</span>

              <h2>Próximos passos da parceria</h2>

              <p>
                O processo é simples, organizado e preparado para empresas que
                precisam de contrato, cadastro e emissão de notas fiscais
                mensais.
              </p>
            </div>

            <div className="parceiros-two-columns">
              <div className="parceiros-steps">
                <div className="parceiros-step">
                  <h3>Escolha sua modalidade</h3>

                  <p>
                    Defina se sua empresa deseja uma parceria anual, patrocínio
                    especial por evento ou participação por permuta.
                  </p>
                </div>

                <div className="parceiros-step">
                  <h3>Faça o cadastro da empresa</h3>

                  <p>
                    A empresa informa os dados necessários para análise,
                    contrato e emissão das notas fiscais mensais.
                  </p>
                </div>

                <div className="parceiros-step">
                  <h3>Receba a proposta e o contrato</h3>

                  <p>
                    Nossa equipe apresenta as condições, benefícios, forma de
                    pagamento e responsabilidades de cada parte.
                  </p>
                </div>

                <div className="parceiros-step">
                  <h3>Assinatura e formalização</h3>

                  <p>
                    A assinatura poderá ser feita digitalmente via Gov.br,
                    assinatura eletrônica ou por cartório, conforme a necessidade
                    da empresa e do contrato.
                  </p>
                </div>

                <div className="parceiros-step">
                  <h3>Boleto e acompanhamento</h3>

                  <p>
                    Após formalizada, a empresa recebe os boletos, notas fiscais
                    e acompanha sua evolução na Área do Parceiro.
                  </p>
                </div>
              </div>

              <div className="parceiros-card">
                <div className="parceiros-card-icon">📄</div>

                <h3>Cadastro empresarial</h3>

                <p>
                  Para participar, a empresa precisará realizar um cadastro com
                  os dados necessários para contrato, faturamento e emissão das
                  notas fiscais.
                </p>

                <br />

                <p>
                  A partir da aprovação, a marca entra para o Ecossistema Hot
                  Dogueres e poderá acompanhar sua participação, pontos e
                  benefícios.
                </p>

                <br />

                <a
                  href="/cadastro-parceiro"
                  className="parceiros-btn parceiros-btn-primary parceiros-full-btn"
                >
                  Iniciar cadastro da empresa
                </a>

                <br />
                <br />

                <a
                  href="#planos"
                  className="parceiros-btn parceiros-btn-light parceiros-full-btn"
                  onClick={(event) => scrollToSection(event, "#planos")}
                >
                  Ver modalidades disponíveis
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="parceiros-section" id="patrocinadores">
          <div className="parceiros-container">
            <div className="parceiros-section-title">
              <span>Área dos patrocinadores</span>

              <h2>Empresas que já fazem parte</h2>

              <p>
                As empresas poderão ser exibidas conforme a ordem de cadastro,
                assinatura ou ativação da parceria.
              </p>
            </div>

            {patrocinadores.length > 0 ? (
              <div className="parceiros-sponsors-grid">
                {patrocinadores.map((patrocinador) => (
                  <div className="parceiros-sponsor-card" key={patrocinador.posicao}>
                    <img
                      src={patrocinador.logo}
                      alt={patrocinador.nome}
                      className="parceiros-sponsor-logo"
                    />

                    <h3>{patrocinador.nome}</h3>

                    <p>{patrocinador.categoria}</p>

                    <br />

                    <span className="parceiros-tag">
                      {patrocinador.posicao}º parceiro
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="parceiros-empty-sponsors">
                <h3>As primeiras empresas parceiras aparecerão aqui.</h3>

                <p>
                  Quem se cadastrar e formalizar primeiro poderá ocupar as
                  primeiras posições na área pública de patrocinadores, conforme
                  as regras do programa.
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="parceiros-section">
          <div className="parceiros-container">
            <div className="parceiros-cta">
              <h2>Sua marca pode estar presente desde o início</h2>

              <p>
                Entre para o Programa de Parcerias Hot Dogueres {anoPrograma} e
                participe de uma grande corrente do bem com visibilidade, impacto
                e reconhecimento.
              </p>

              <a
                href="/cadastro-parceiro"
                className="parceiros-btn parceiros-btn-primary"
              >
                Quero cadastrar minha empresa
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="parceiros-footer">
        <div className="parceiros-container">
          <p>
            Hot Dogueres &copy; {new Date().getFullYear()} — Programa de
            Parcerias Empresariais
          </p>
        </div>
      </footer>
    </div>
  );
}
        