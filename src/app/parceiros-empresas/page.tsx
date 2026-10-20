import Link from "next/link";
import styles from "./parceirosEmpresas.module.css";
import SetasNavegacao from "@/components/SetasNavegacao";



type Patrocinador = {
  nome: string;
  categoria: string;
  logo: string;
  posicao: number;
};

const patrocinadores: Patrocinador[] = [
  /*
  {
    nome: 'Empresa Exemplo',
    categoria: 'Parceiro Anual — Alimentação',
    logo: '/assets/img/patrocinadores/empresa-exemplo.png',
    posicao: 1,
  },
  */
];

const anoPrograma = 2027;
const dataFestival = '04 de dezembro de 2027';

export const metadata = {
  title: 'Programa de Parcerias Empresariais | Hot Dogueres',
  description:
    'Faça parte do Programa de Parcerias Empresariais Hot Dogueres. Empresas unidas em uma grande corrente do bem, apoiando projetos sociais, educacionais, ambientais e de proteção animal.',
};
function CardCartoonParcerias() {
  return (
    <section className={styles.partnerCartoonSection}>
      <div className={styles.container}>
        <div className={styles.partnerCartoonCard}>
          <div className={styles.partnerCartoonGlowOne} />
          <div className={styles.partnerCartoonGlowTwo} />

          <div className={styles.partnerCartoonGrid}>
            <div className={styles.partnerCartoonArt}>
              <div className={styles.cartoonScene}>
                <div className={styles.sun}>☀️</div>

                <div className={styles.cloudOne}>☁️</div>
                <div className={styles.cloudTwo}>☁️</div>

                <div className={styles.businessBuilding}>
                  <div className={styles.buildingTop}>HOTCORE</div>
                  <div className={styles.windowGrid}>
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className={styles.buildingDoor} />
                </div>

                <div className={styles.communityHouse}>
                  <div className={styles.houseRoof} />
                  <div className={styles.houseBody}>
                    <span>❤️</span>
                  </div>
                </div>

                <div className={styles.handshakeBubble}>🤝</div>

                <div className={styles.impactTokens}>
                  <span>🥫</span>
                  <span>🐾</span>
                  <span>🎓</span>
                  <span>🌱</span>
                  <span>🤖</span>
                </div>

                <div className={styles.cartoonGround} />
              </div>
            </div>

            <div className={styles.partnerCartoonContent}>
              <span className={styles.partnerCartoonBadge}>
                🤝 Programa de Parcerias Empresariais
              </span>

              <h1>Empresas unidas para transformar vidas</h1>

              <p>
                Sua marca pode participar do Ecossistema Hot Dogueres apoiando
                ações sociais, projetos educacionais, proteção animal, meio
                ambiente, tecnologia e eventos solidários.
              </p>

              <div className={styles.partnerCartoonHighlights}>
                <div>
                  <strong>📣 Visibilidade</strong>
                  <span>Marca presente nas ações e campanhas.</span>
                </div>

                <div>
                  <strong>❤️ Impacto real</strong>
                  <span>Ajuda direta para pessoas, animais e comunidades.</span>
                </div>

                <div>
                  <strong>🏆 Reconhecimento</strong>
                  <span>Programa de pontos e destaque para parceiros.</span>
                </div>
              </div>

              <div className={styles.partnerCartoonActions}>
                <Link
                  href="/cadastro-parceiro"
                  className={`${styles.btn} ${styles.btnPrimary}`}
                >
                  Quero cadastrar minha empresa
                </Link>

                <a
                  href="#planos"
                  className={`${styles.btn} ${styles.btnOutlineDark}`}
                >
                  Ver cotas e oportunidades
                </a>
              </div>

              <p className={styles.partnerCartoonNote}>
                Parcerias anuais, por evento ou por permuta. Cada empresa pode
                escolher a melhor forma de participar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ParceirosEmpresasPage() {
  const anoAtual = new Date().getFullYear();

  return (
    <main className={styles.page}>
<SetasNavegacao
  anterior="/impacto-social"
  proxima="/cadastro-parceiro"
  labelAnterior="Voltar para Impacto Social"
  labelProxima="Ir para Cadastro de Parceiro"
/>


     <section className={styles.pageTop}>
  <div className={styles.topBar}>
    Programa de Parcerias Empresariais Hot Dogueres{" "}
    <strong>{anoPrograma}</strong>
  </div>

  <CardCartoonParcerias />
</section>


      <section className={styles.container}>
        <div className={styles.introBox}>
          <h2>Sua empresa dentro do Ecossistema Hot Dogueres</h2>

          <p>
            A parceria não é apenas uma cota de mídia. É uma participação
            contínua na construção de ações, projetos e experiências que geram
            visibilidade, relacionamento, impacto e reconhecimento público.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionTitle}>
            <span>Como funciona</span>
            <h2>Um programa empresarial anual, por evento ou por permuta</h2>
            <p>
              A empresa pode participar de forma contínua durante o ano, apoiar
              eventos específicos ou contribuir por meio de produtos e serviços
              negociados conforme cada projeto.
            </p>
          </div>

          <div className={`${styles.grid} ${styles.grid3}`}>
            <div className={styles.card}>
              <div className={styles.cardIcon}>📅</div>
              <h3>Parceiro Anual</h3>
              <p>
                Presença durante o período contratado, com participação no
                ecossistema, benefícios previstos, programa de pontos e
                acompanhamento pela Área do Parceiro.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon}>🎪</div>
              <h3>Por Evento</h3>
              <p>
                A empresa apoia uma ação, projeto ou evento específico. O valor
                varia conforme o tamanho, formato e necessidade do evento.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon}>🔄</div>
              <h3>Por Permuta</h3>
              <p>
                Parcerias com fornecimento de produtos ou serviços, como água
                mineral, sucos, alimentação, ração, brindes, estrutura ou apoio
                operacional.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionLight}`} id="beneficios">
        <div className={styles.container}>
          <div className={styles.sectionTitle}>
            <span>Benefícios</span>
            <h2>Por que participar?</h2>
            <p>
              A empresa parceira se conecta a projetos reais, acompanha sua
              participação e pode ser reconhecida publicamente pelo seu
              envolvimento.
            </p>
          </div>

          <div className={`${styles.grid} ${styles.grid4}`}>
            <div className={styles.card}>
              <div className={styles.cardIcon}>📣</div>
              <h3>Exposição da marca</h3>
              <p>
                Presença institucional nos canais, ações e materiais
                relacionados ao programa.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon}>📊</div>
              <h3>Área do Parceiro</h3>
              <p>
                Acompanhamento da empresa, participação, pagamentos, pontos e
                histórico.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon}>🏆</div>
              <h3>Programa de pontos</h3>
              <p>
                Empresas acumulam pontos por participação, impacto social,
                compromisso e envolvimento.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon}>❤️</div>
              <h3>Impacto social</h3>
              <p>
                Participação em uma corrente do bem envolvendo pessoas,
                empresas, escolas e comunidades.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} id="pontos">
        <div className={styles.container}>
          <div className={styles.sectionTitle}>
            <span>Programa de Pontos</span>
            <h2>Como sua empresa pode ganhar pontos?</h2>
            <p>
              O Programa de Pontos Hot Dogueres valoriza empresas que
              participam, cumprem seus compromissos e se envolvem de verdade
              nas ações do ecossistema.
            </p>
          </div>

          <div className={styles.pointsList}>
            <div className={styles.pointItem}>
              <strong>🤝 Participação</strong>
              Presença de representantes nos eventos e projetos.
            </div>

            <div className={styles.pointItem}>
              <strong>❤️ Impacto Social</strong>
              Participação em ações sociais e solidárias.
            </div>

            <div className={styles.pointItem}>
              <strong>🎓 Educação</strong>
              Apoio e participação em projetos educacionais.
            </div>

            <div className={styles.pointItem}>
              <strong>🐾 Proteção Animal</strong>
              Envolvimento nas ações voltadas aos animais.
            </div>

            <div className={styles.pointItem}>
              <strong>🌱 Meio Ambiente</strong>
              Participação em projetos ambientais e sustentáveis.
            </div>

            <div className={styles.pointItem}>
              <strong>🤖 Tecnologia</strong>
              Apoio e participação em iniciativas de inovação.
            </div>

            <div className={styles.pointItem}>
              <strong>⏰ Compromisso</strong>
              Cumprimento das obrigações e pagamentos dentro dos prazos.
            </div>

            <div className={styles.pointItem}>
              <strong>🚀 Envolvimento</strong>
              Participação em diferentes projetos ao longo do ano.
            </div>
          </div>

          <div className={styles.notice}>
            Os pontos individuais das empresas não precisam ser divulgados
            publicamente. O ranking público pode apresentar posições como 1º,
            2º e 3º lugar, mantendo a disputa saudável até o final da temporada.
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionLight}`}>
        <div className={styles.container}>
          <div className={styles.rankingBox}>
            <h3>Uma disputa saudável durante todo o ano</h3>

            <p>
              Cada empresa poderá acompanhar sua própria evolução por meio da
              Área do Parceiro HotCore. O melhor desempenho será reconhecido no
              grande momento do ecossistema:{' '}
              <strong>Festival Cultural Hot Dogueres</strong>, com previsão
              para <strong>{dataFestival}</strong>.
            </p>

            <div className={styles.rankingList}>
              <div className={styles.rankingItem}>
                <span>🥇 1º lugar</span>
                <small>Empresa com melhor desempenho</small>
              </div>

              <div className={styles.rankingItem}>
                <span>🥈 2º lugar</span>
                <small>Destaque de participação</small>
              </div>

              <div className={styles.rankingItem}>
                <span>🥉 3º lugar</span>
                <small>Destaque de envolvimento</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} id="planos">
        <div className={styles.container}>
          <div className={styles.sectionTitle}>
            <span>Cotas e oportunidades</span>
            <h2>Escolha como sua marca quer fazer parte</h2>
            <p>
              As vagas são limitadas. A disponibilidade poderá ser atualizada
              conforme as adesões realizadas.
            </p>
          </div>

          <div className={styles.plansTable}>
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
                    <span className={styles.tag}>Anual</span>
                  </td>
                </tr>

                <tr>
                  <td>
                    🍴 <strong>Patrocínio Especial — Alimentação</strong>
                  </td>
                  <td>1</td>
                  <td>R$ 150.000</td>
                  <td>
                    <span className={styles.tag}>Especial</span>
                  </td>
                </tr>

                <tr>
                  <td>
                    🏆 <strong>Vaga por Pontos — Alimentação</strong>
                  </td>
                  <td>1</td>
                  <td>Conforme regulamento</td>
                  <td>
                    <span className={styles.tag}>Desempenho</span>
                  </td>
                </tr>

                <tr>
                  <td>
                    🐾 <strong>Parceiro Anual — Alimentação Animal</strong>
                  </td>
                  <td>10</td>
                  <td>R$ 8.000/mês</td>
                  <td>
                    <span className={styles.tag}>Anual</span>
                  </td>
                </tr>

                <tr>
                  <td>
                    🐶 <strong>Patrocínio Especial — Alimentação Animal</strong>
                  </td>
                  <td>1</td>
                  <td>R$ 120.000</td>
                  <td>
                    <span className={styles.tag}>Especial</span>
                  </td>
                </tr>

                <tr>
                  <td>
                    🏆 <strong>Vaga por Pontos — Alimentação Animal</strong>
                  </td>
                  <td>1</td>
                  <td>Conforme regulamento</td>
                  <td>
                    <span className={styles.tag}>Desempenho</span>
                  </td>
                </tr>

                <tr>
                  <td>
                    🔄 <strong>Parceiros por Permuta</strong>
                  </td>
                  <td>Limitado</td>
                  <td>Conforme negociação</td>
                  <td>
                    <span className={styles.tag}>Permuta</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={styles.notice}>
            A parceria anual foi pensada para empresas que desejam construir
            presença contínua ao longo de {anoPrograma}. Empresas que aderirem
            após janeiro poderão regularizar os meses já transcorridos no
            momento da assinatura, conforme as regras comerciais do programa.
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionLight}`} id="fazer-parte">
        <div className={styles.container}>
          <div className={styles.sectionTitle}>
            <span>Como fazer parte</span>
            <h2>Próximos passos da parceria</h2>
            <p>
              O processo é simples, organizado e preparado para empresas que
              precisam de contrato, cadastro e emissão de notas fiscais mensais.
            </p>
          </div>

          <div className={styles.participationGrid}>
            <div className={styles.steps}>
              <div className={styles.step}>
                <h3>Escolha sua modalidade</h3>
                <p>
                  Defina se sua empresa deseja uma parceria anual, patrocínio
                  especial por evento ou participação por permuta.
                </p>
              </div>

              <div className={styles.step}>
                <h3>Faça o cadastro da empresa</h3>
                <p>
                  A empresa informa os dados necessários para análise, contrato
                  e emissão das notas fiscais mensais.
                </p>
              </div>

              <div className={styles.step}>
                <h3>Receba a proposta e o contrato</h3>
                <p>
                  Nossa equipe apresenta as condições, benefícios, forma de
                  pagamento e responsabilidades de cada parte.
                </p>
              </div>

              <div className={styles.step}>
                <h3>Assinatura e formalização</h3>
                <p>
                  A assinatura poderá ser feita digitalmente via gov.br ou por
                  cartório, conforme a necessidade da empresa e do contrato.
                </p>
              </div>

              <div className={styles.step}>
                <h3>Boleto e acompanhamento</h3>
                <p>
                  Após formalizada, a empresa recebe os boletos, notas fiscais e
                  acompanha sua evolução na Área do Parceiro.
                </p>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon}>📄</div>

              <h3>Cadastro empresarial</h3>

              <p>
                Para participar, a empresa precisará realizar um cadastro com os
                dados necessários para contrato, faturamento e emissão das notas
                fiscais.
              </p>

              <br />

              <p>
                A partir da aprovação, a marca entra para o Ecossistema Hot
                Dogueres e poderá acompanhar sua participação, pontos e
                benefícios.
              </p>

              <br />

            <Link
  href="/cadastro-parceiro"
  className={`${styles.btn} ${styles.btnPrimary} ${styles.fullButton}`}
>
  Iniciar cadastro da empresa
</Link>


              <br />
              <br />

              <a
                href="#planos"
                className={`${styles.btn} ${styles.btnLight} ${styles.fullButton}`}
              >
                Ver modalidades disponíveis
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} id="patrocinadores">
        <div className={styles.container}>
          <div className={styles.sectionTitle}>
            <span>Área dos patrocinadores</span>
            <h2>Empresas que já fazem parte</h2>
            <p>
              As empresas poderão ser exibidas conforme a ordem de cadastro,
              assinatura ou ativação da parceria.
            </p>
          </div>

          {patrocinadores.length > 0 ? (
            <div className={styles.sponsorsGrid}>
              {patrocinadores.map((patrocinador) => (
                <div className={styles.sponsorCard} key={patrocinador.nome}>
                  <img
                    src={patrocinador.logo}
                    alt={patrocinador.nome}
                    className={styles.sponsorLogo}
                  />

                  <h3>{patrocinador.nome}</h3>

                  <p>{patrocinador.categoria}</p>

                  <br />

                  <span className={styles.tag}>
                    {patrocinador.posicao}º parceiro
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptySponsors}>
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

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.cta}>
            <h2>Sua marca pode estar presente desde o início</h2>

            <p>
              Entre para o Programa de Parcerias Hot Dogueres {anoPrograma} e
              participe de uma grande corrente do bem com visibilidade, impacto
              e reconhecimento.
            </p>

         <Link href="/cadastro-parceiro" className={`${styles.btn} ${styles.btnPrimary}`}>
  Quero cadastrar minha empresa
</Link>

          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>
            Hot Dogueres &copy; {anoAtual} — Programa de Parcerias Empresariais
          </p>
        </div>
      </footer>
    </main>
  );
}
