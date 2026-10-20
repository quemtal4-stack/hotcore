import Link from "next/link";
import SetasNavegacao from "@/components/SetasNavegacao";


type ItemCalendario = {
  mes: string;
  acao: string;
};

type EventoCalendario = {
  numero: string;
  nome: string;
  subtitulo: string;
  categoria: string;
  quantidade: string;
  periodo: string;
  cor: string;
  objetivo: string;
  descricao: string;
  comoFunciona: string[];
  impacto: string[];
  calendario: ItemCalendario[];
};

const EVENTOS_2027: EventoCalendario[] = [
  {
    numero: "01",
    nome: "Hot Dogueres Salva Vidas",
    subtitulo: "A Gastronomia que Salva Vidas - HEMOSE",
    categoria: "Doação de sangue",
    quantidade: "5 eventos previstos",
    periodo: "Meses estratégicos de baixa doação",
    cor: "bg-red-600 text-white",
    objetivo:
      "Incentivar a doação de sangue em períodos de baixa nos estoques, aproximando a comunidade de uma causa urgente e necessária.",
    descricao:
      "O Hot Dogueres Salva Vidas une solidariedade, alimentação e mobilização social. A ideia é estimular novos doadores de sangue e valorizar quem já pratica esse gesto de amor. Após a doação, os participantes poderão fazer parte de uma experiência especial com o tradicional hot dog do Ecossistema Hot Dogueres.",
    comoFunciona: [
      "Campanhas de incentivo à doação de sangue em parceria com o HEMOSE.",
      "Ações em meses com menor volume de doadores.",
      "Recepção especial para os participantes da campanha.",
      "Distribuição de hot dogs após a doação, podendo ser um hot dog gigante de 10 metros ou produção aproximada de 200 hot dogs, conforme estrutura do evento.",
      "Convite para que os doadores façam parte da corrente do bem do Ecossistema Hot Dogueres.",
    ],
    impacto: [
      "Aumento do número de doadores de sangue.",
      "Fortalecimento dos estoques do HEMOSE.",
      "Engajamento da comunidade em uma causa de vida.",
      "Aproximação entre solidariedade, gastronomia e participação social.",
    ],
    calendario: [
      {
        mes: "Fevereiro",
        acao: "Primeira ação de mobilização e doação de sangue.",
      },
      {
        mes: "Abril",
        acao: "Campanha em período de reforço dos estoques.",
      },
      {
        mes: "Junho",
        acao: "Ação especial próxima ao Junho Vermelho.",
      },
      {
        mes: "Agosto",
        acao: "Nova mobilização comunitária para doadores.",
      },
      {
        mes: "Novembro",
        acao: "Encerramento anual das ações Salva Vidas.",
      },
    ],
  },
  {
    numero: "02",
    nome: "Hot Dogueres na Escola",
    subtitulo: "Educação alimentar, plantio e consciência social",
    categoria: "Educação",
    quantidade: "10 escolas públicas",
    periodo: "Março a novembro de 2027",
    cor: "bg-yellow-400 text-gray-950",
    objetivo:
      "Atender escolas públicas e estimular crianças do 1º ao 5º ano a aprenderem sobre plantio, cuidado com a terra, alimentação saudável e responsabilidade coletiva.",
    descricao:
      "O projeto levará conhecimento prático para aproximadamente 3 mil crianças. Os alunos serão incentivados a plantar, cuidar e colher verduras e legumes, entendendo de forma simples a importância da alimentação, do meio ambiente e do trabalho em equipe.",
    comoFunciona: [
      "Implantação ou revitalização de hortas em escolas públicas.",
      "Atividades educativas com alunos do 1º ao 5º ano.",
      "Acompanhamento do desenvolvimento das hortas.",
      "Dinâmicas sobre alimentação saudável, sustentabilidade e cuidado coletivo.",
      "Premiação para escolas que se destacarem no cuidado, criatividade e participação.",
    ],
    impacto: [
      "Atendimento estimado de até 3 mil crianças.",
      "Estímulo à educação alimentar desde cedo.",
      "Criação de hortas escolares produtivas.",
      "Participação de professores, alunos, famílias e comunidade.",
    ],
    calendario: [
      {
        mes: "Março",
        acao: "Seleção das primeiras escolas e início das visitas técnicas.",
      },
      {
        mes: "Abril a junho",
        acao: "Implantação das primeiras hortas escolares.",
      },
      {
        mes: "Julho a setembro",
        acao: "Acompanhamento, oficinas e atividades práticas com os alunos.",
      },
      {
        mes: "Outubro",
        acao: "Avaliação das escolas participantes.",
      },
      {
        mes: "Novembro",
        acao: "Premiação das escolas destaque.",
      },
    ],
  },
  {
    numero: "03",
    nome: "Hot Dogueres City Quest",
    subtitulo: "Gincana municipal com missões e tecnologia",
    categoria: "Tecnologia e educação",
    quantidade: "5 eventos previstos",
    periodo: "Durante o ano letivo de 2027",
    cor: "bg-blue-700 text-white",
    objetivo:
      "Criar uma gincana municipal envolvendo alunos de escolas públicas em missões educativas, culturais, sociais e tecnológicas.",
    descricao:
      "O Hot Dogueres City Quest será uma experiência urbana e tecnológica. Os alunos participarão de missões liberadas por meio de tecnologia, estimulando raciocínio, colaboração, conhecimento da cidade, cultura local e trabalho em equipe.",
    comoFunciona: [
      "Participação de equipes formadas por alunos de escolas públicas.",
      "Missões disponibilizadas por meio de ferramentas digitais.",
      "Desafios envolvendo cultura, história, meio ambiente, solidariedade e cidadania.",
      "Pontuação por conclusão de tarefas.",
      "Premiação para equipes e escolas com melhor desempenho.",
    ],
    impacto: [
      "Maior integração entre escolas, cidade e tecnologia.",
      "Estímulo à criatividade e resolução de problemas.",
      "Valorização do conhecimento local.",
      "Participação ativa dos estudantes em experiências fora da sala de aula.",
    ],
    calendario: [
      {
        mes: "Abril",
        acao: "Evento piloto com escolas convidadas.",
      },
      {
        mes: "Maio",
        acao: "Primeira etapa municipal.",
      },
      {
        mes: "Agosto",
        acao: "Segunda etapa com novas missões.",
      },
      {
        mes: "Setembro",
        acao: "Terceira etapa classificatória.",
      },
      {
        mes: "Novembro",
        acao: "Grande final do City Quest.",
      },
    ],
  },
  {
    numero: "04",
    nome: "Hot Dogueres EcoAção",
    subtitulo: "Voluntariado, limpeza, plantio e hot dog",
    categoria: "Meio ambiente",
    quantidade: "3 eventos previstos",
    periodo: "Ações pontuais em 2027",
    cor: "bg-green-600 text-white",
    objetivo:
      "Reunir voluntários para pequenas ações ambientais, como limpeza de áreas, plantio de mudas e cuidado com espaços públicos.",
    descricao:
      "O EcoAção será composto por encontros práticos de voluntariado. Após a ação ambiental, os participantes se reúnem para compartilhar um delicioso hot dog, celebrando o trabalho coletivo e o cuidado com a cidade.",
    comoFunciona: [
      "Mobilização de grupos de voluntários.",
      "Limpeza de praias, praças, áreas verdes ou regiões específicas.",
      "Plantio de árvores e mudas em locais previamente autorizados.",
      "Registro do impacto ambiental gerado.",
      "Confraternização com hot dog após a ação.",
    ],
    impacto: [
      "Valorização do voluntariado ambiental.",
      "Melhoria de espaços públicos.",
      "Conscientização sobre descarte correto de resíduos.",
      "Criação de uma cultura de cuidado com o meio ambiente.",
    ],
    calendario: [
      {
        mes: "Março",
        acao: "Primeira ação de limpeza ou plantio.",
      },
      {
        mes: "Julho",
        acao: "Segunda ação ambiental com voluntários.",
      },
      {
        mes: "Outubro",
        acao: "Terceira ação especial de encerramento.",
      },
    ],
  },
  {
    numero: "05",
    nome: "Hot Dogueres Horta Medicinal",
    subtitulo: "Hortas medicinais em postos de saúde",
    categoria: "Saúde comunitária",
    quantidade: "1 projeto teste",
    periodo: "Fase piloto em 2027",
    cor: "bg-emerald-700 text-white",
    objetivo:
      "Desenvolver uma horta medicinal em posto de saúde, aproximando comunidade, cuidado natural, educação e saúde preventiva.",
    descricao:
      "O projeto será realizado em fase de teste, com implantação de uma horta medicinal em uma unidade de saúde. A proposta é criar um espaço educativo com plantas medicinais, sempre respeitando orientações adequadas e o uso consciente.",
    comoFunciona: [
      "Escolha de um posto de saúde para receber o projeto piloto.",
      "Implantação de canteiros com plantas medicinais.",
      "Identificação das plantas e orientações educativas.",
      "Participação de profissionais, comunidade e voluntários.",
      "Avaliação do projeto para possível expansão futura.",
    ],
    impacto: [
      "Criação de um espaço educativo em unidade de saúde.",
      "Valorização do conhecimento popular com responsabilidade.",
      "Fortalecimento do vínculo entre comunidade e posto de saúde.",
      "Base para expansão do projeto em outros locais.",
    ],
    calendario: [
      {
        mes: "Abril",
        acao: "Escolha da unidade de saúde e planejamento técnico.",
      },
      {
        mes: "Maio",
        acao: "Implantação da horta medicinal piloto.",
      },
      {
        mes: "Junho a agosto",
        acao: "Acompanhamento, manutenção e avaliação.",
      },
    ],
  },
  {
    numero: "06",
    nome: "Hot Dogueres Community",
    subtitulo: "Horta comunitária e sustentabilidade local",
    categoria: "Comunidade",
    quantidade: "1 projeto teste",
    periodo: "Fase piloto em 2027",
    cor: "bg-lime-600 text-white",
    objetivo:
      "Criar uma horta comunitária em fase de teste, onde a própria comunidade participe do plantio, cuidado, colheita e construção de caminhos sustentáveis.",
    descricao:
      "O Hot Dogueres Community busca fortalecer comunidades por meio da produção compartilhada. A comunidade será protagonista no cuidado da horta, criando possibilidades de alimentação, aprendizado e geração de valor local.",
    comoFunciona: [
      "Escolha de uma comunidade para receber o projeto piloto.",
      "Implantação da horta comunitária.",
      "Organização de grupos responsáveis pelo cuidado e manutenção.",
      "Oficinas sobre plantio, colheita e aproveitamento dos alimentos.",
      "Estudo de caminhos para tornar a horta sustentável ao longo do tempo.",
    ],
    impacto: [
      "Fortalecimento da comunidade.",
      "Produção local de alimentos.",
      "Educação ambiental e alimentar.",
      "Construção de autonomia e sustentabilidade.",
    ],
    calendario: [
      {
        mes: "Maio",
        acao: "Mapeamento da comunidade e planejamento.",
      },
      {
        mes: "Junho",
        acao: "Implantação da horta comunitária.",
      },
      {
        mes: "Julho a outubro",
        acao: "Acompanhamento, oficinas e primeiros ciclos de colheita.",
      },
    ],
  },
  {
    numero: "07",
    nome: "Hot Dogueres Corrida do Bem",
    subtitulo: "Caminhada, corrida e solidariedade",
    categoria: "Esporte solidário",
    quantidade: "2 eventos previstos",
    periodo: "Primeiro e segundo semestre de 2027",
    cor: "bg-orange-600 text-white",
    objetivo:
      "Realizar caminhadas e corridas de 5 km e 10 km em prol de instituições ou entidades sociais, começando por crianças com câncer.",
    descricao:
      "A Corrida do Bem une esporte, arrecadação e emoção. Parte da venda dos kits será destinada à instituição apoiada. As crianças participarão com desenhos, e o desenho escolhido poderá estampar a camisa oficial dos corredores.",
    comoFunciona: [
      "Caminhada, corrida de 5 km e corrida de 10 km.",
      "Venda de kits oficiais do evento.",
      "Destinação de 50% do resultado dos kits para a instituição apoiada.",
      "Destinação de 10% para ações humanitárias do ecossistema.",
      "Interação com crianças da instituição por meio de desenhos.",
      "Desenho escolhido estampado na camisa dos corredores.",
      "Crianças que puderem participar poderão entregar prêmios aos vencedores.",
      "Entrega de materiais arrecadados, brinquedos e livros infantis.",
      "Pequena comemoração com palhaços e atividades para as crianças.",
    ],
    impacto: [
      "Apoio financeiro e material para instituições.",
      "Participação emocional das crianças no evento.",
      "Arrecadação de brinquedos e livros infantis.",
      "Promoção de saúde, esporte e solidariedade.",
    ],
    calendario: [
      {
        mes: "Junho",
        acao: "Primeira Corrida do Bem em prol de instituição parceira.",
      },
      {
        mes: "Setembro",
        acao: "Segunda Corrida do Bem com nova causa apoiada.",
      },
    ],
  },
  {
    numero: "08",
    nome: "Hot Dogueres Pets Day",
    subtitulo: "Feira pet, adoção, tecnologia e cuidado animal",
    categoria: "Proteção animal",
    quantidade: "1 feira prevista",
    periodo: "Julho de 2027",
    cor: "bg-sky-600 text-white",
    objetivo:
      "Criar uma feira voltada ao universo pet, reunindo pequenas, médias e grandes empresas, protetores, produtos, tecnologia e ações de cuidado animal.",
    descricao:
      "O Pets Day será uma feira aberta para marcas, empresas e apaixonados por animais. O evento poderá reunir novidades em rações, remédios, brinquedos, tecnologia pet, serviços, adoção responsável e conscientização.",
    comoFunciona: [
      "Espaço para empresas do segmento pet.",
      "Exposição de produtos, rações, brinquedos e tecnologias.",
      "Participação de protetores e iniciativas de adoção.",
      "Ações de conscientização sobre cuidado animal.",
      "Possibilidade de arrecadação de ração.",
    ],
    impacto: [
      "Fortalecimento da causa animal.",
      "Conexão entre empresas, protetores e comunidade.",
      "Apoio à arrecadação de ração.",
      "Divulgação de soluções e tecnologias para pets.",
    ],
    calendario: [
      {
        mes: "Julho",
        acao: "Realização da Feira Hot Dogueres Pets Day.",
      },
    ],
  },
  {
    numero: "09",
    nome: "Hot Dogueres Adventure Race",
    subtitulo: "Up & Down Challenge e treino outdoor",
    categoria: "Aventura e esporte",
    quantidade: "1 a 2 eventos previstos",
    periodo: "Segundo semestre de 2027",
    cor: "bg-gray-950 text-white",
    objetivo:
      "Criar experiências esportivas para atletas que desejam sair do asfalto e entrar em uma proposta mais aventureira, em contato com a natureza.",
    descricao:
      "O Adventure Race poderá trabalhar formatos como Up & Down Challenge, com desafio de subida e descida, ou Outdoor Adventure Wild WOD, voltado para treino funcional, aventura e natureza, especialmente para atletas e apaixonados por crossfit.",
    comoFunciona: [
      "Percursos em ambiente natural.",
      "Desafio de subida e descida.",
      "Treinos outdoor com pegada aventureira.",
      "Experiência para corredores, praticantes de crossfit e atletas amadores.",
      "Possibilidade de formato competitivo ou participativo.",
    ],
    impacto: [
      "Promoção de saúde e esporte.",
      "Valorização de ambientes naturais.",
      "Criação de experiências diferenciadas para atletas.",
      "Aproximação entre esporte, natureza e comunidade.",
    ],
    calendario: [
      {
        mes: "Agosto",
        acao: "Primeira edição Adventure Race.",
      },
      {
        mes: "Novembro",
        acao: "Possível segunda edição, conforme estrutura e autorizações.",
      },
    ],
  },
  {
    numero: "10",
    nome: "Dia do Herói",
    subtitulo: "Homenagem a classes trabalhadoras",
    categoria: "Reconhecimento social",
    quantidade: "1 evento previsto",
    periodo: "Setembro de 2027",
    cor: "bg-red-700 text-white",
    objetivo:
      "Homenagear uma classe de trabalhadores essenciais, como enfermeiros, agentes de limpeza ou outras categorias que servem diariamente a população.",
    descricao:
      "O Dia do Herói será um momento de reconhecimento, lazer e gratidão. A proposta é oferecer um dia especial para trabalhadores homenageados, com comida, brindes, alegria e valorização pública.",
    comoFunciona: [
      "Escolha da classe homenageada da edição.",
      "Abertura de lista de participação próxima ao evento.",
      "Comprovação da atividade profissional, quando necessário.",
      "Encerramento das inscrições ao atingir o limite de participantes.",
      "Dia de lazer com alimentação, brindes e atividades.",
    ],
    impacto: [
      "Valorização de trabalhadores essenciais.",
      "Reconhecimento público de categorias importantes.",
      "Criação de um momento de lazer e gratidão.",
      "Fortalecimento do vínculo entre comunidade e profissionais homenageados.",
    ],
    calendario: [
      {
        mes: "Agosto",
        acao: "Divulgação da classe homenageada e abertura de inscrições.",
      },
      {
        mes: "Setembro",
        acao: "Realização do Dia do Herói.",
      },
    ],
  },
  {
    numero: "11",
    nome: "Hot Dogueres Outdoor Adventure - Trail Edition",
    subtitulo: "Mountain Run no sertão",
    categoria: "Corrida de montanha",
    quantidade: "1 evento previsto",
    periodo: "Outubro de 2027",
    cor: "bg-stone-700 text-white",
    objetivo:
      "Realizar uma corrida de montanha aberta ao público, em meio à natureza e ao cenário forte do sertão.",
    descricao:
      "A Trail Edition será uma experiência para corredores e amantes de aventura. Um evento em ambiente natural, com percurso desafiador, calor, resistência e espírito esportivo.",
    comoFunciona: [
      "Evento aberto ao público.",
      "Percurso em ambiente natural.",
      "Formato Mountain Run.",
      "Participação de corredores iniciantes e experientes, conforme categorias.",
      "Estrutura de apoio, hidratação e segurança.",
    ],
    impacto: [
      "Promoção do esporte em meio à natureza.",
      "Valorização de paisagens naturais e do sertão.",
      "Atração de atletas e público para experiências outdoor.",
      "Fortalecimento do calendário esportivo do ecossistema.",
    ],
    calendario: [
      {
        mes: "Outubro",
        acao: "Realização da Trail Edition.",
      },
    ],
  },
  {
    numero: "12",
    nome: "Hot Dogueres Day",
    subtitulo: "Especial Dia das Crianças",
    categoria: "Infantil e social",
    quantidade: "1 evento previsto",
    periodo: "Outubro de 2027",
    cor: "bg-pink-600 text-white",
    objetivo:
      "Criar um dia especial de diversão para crianças, com alimentação, palhaços, teatro infantil e atividades recreativas.",
    descricao:
      "O Hot Dogueres Day será uma celebração voltada para as crianças. A proposta é oferecer um dia alegre, com muito hot dog, brincadeiras, teatro infantil, palhaços e momentos de acolhimento.",
    comoFunciona: [
      "Evento especial próximo ao Dia das Crianças.",
      "Distribuição de hot dogs.",
      "Apresentações com palhaços e teatro infantil.",
      "Atividades recreativas.",
      "Possibilidade de parceria com escolas, comunidades ou instituições.",
    ],
    impacto: [
      "Criação de memórias positivas para crianças.",
      "Acesso a lazer, cultura e alimentação.",
      "Fortalecimento da missão social do ecossistema.",
      "Integração entre famílias, voluntários e parceiros.",
    ],
    calendario: [
      {
        mes: "Outubro",
        acao: "Realização do Hot Dogueres Day especial Dia das Crianças.",
      },
    ],
  },
  {
    numero: "13",
    nome: "Feira Hot Dogueres HotCore Tecnologia",
    subtitulo: "Robótica, inovação, universidades e escolas",
    categoria: "Tecnologia e inovação",
    quantidade: "1 feira de 2 dias",
    periodo: "Novembro de 2027",
    cor: "bg-purple-700 text-white",
    objetivo:
      "Realizar uma feira de tecnologia com empresas, universidades, escolas e projetos inovadores, conectando conhecimento, mercado e impacto social.",
    descricao:
      "A HotCore Tecnologia será uma feira de dois dias. A proposta é trazer empresas de robótica, universidades com áreas de tecnologia, escolas públicas e particulares, expositores e experiências interativas. A entrada poderá ser vinculada à doação de 1 kg de alimento por dia, ajudando na meta solidária.",
    comoFunciona: [
      "Evento com duração prevista de dois dias.",
      "Participação de empresas de tecnologia e robótica.",
      "Presença de universidades e instituições de ensino.",
      "Interação com escolas públicas e particulares.",
      "Entrada solidária sugerida de 1 kg de alimento por dia.",
      "Exposição de soluções, projetos, robôs, inovação e experiências educativas.",
    ],
    impacto: [
      "Aproximação de alunos com tecnologia e inovação.",
      "Arrecadação de alimentos para a meta solidária.",
      "Conexão entre empresas, universidades e comunidade.",
      "Incentivo à educação tecnológica.",
    ],
    calendario: [
      {
        mes: "Novembro",
        acao: "Realização da Feira HotCore Tecnologia em dois dias.",
      },
    ],
  },
  {
    numero: "14",
    nome: "Festival Cultural Hot Dogueres",
    subtitulo: "O Maior Hot Dog do Brasil",
    categoria: "Cultura e encerramento",
    quantidade: "1 festival previsto",
    periodo: "Dezembro de 2027",
    cor: "bg-yellow-500 text-gray-950",
    objetivo:
      "Encerrar o ciclo anual com um grande festival cultural, celebrando as ações realizadas, premiando destaques e construindo o maior hot dog do Brasil.",
    descricao:
      "O Festival Cultural Hot Dogueres será o grande fechamento do ano. A proposta é celebrar o impacto das ações, reunir parceiros, voluntários, comunidade, artistas, empresas e participantes em torno de um marco simbólico: um hot dog gigante de aproximadamente 250 metros.",
    comoFunciona: [
      "Festival cultural de encerramento do calendário anual.",
      "Construção simbólica do maior hot dog do Brasil, com meta aproximada de 250 metros.",
      "Premiação de escolas, parceiros, voluntários, projetos e destaques do ano.",
      "Apresentações culturais e momentos de celebração.",
      "Prestação simbólica dos resultados e impacto do ecossistema.",
    ],
    impacto: [
      "Celebração das ações sociais realizadas em 2027.",
      "Fortalecimento da marca Hot Dogueres.",
      "Reconhecimento de parceiros e voluntários.",
      "Grande mobilização cultural e solidária.",
    ],
    calendario: [
      {
        mes: "Dezembro",
        acao: "Festival Cultural e encerramento oficial do calendário 2027.",
      },
    ],
  },
];

const RESUMO_ANUAL = [
  {
    mes: "Fevereiro",
    evento: "Hot Dogueres Salva Vidas",
  },
  {
    mes: "Março",
    evento: "Hot Dogueres na Escola e EcoAção",
  },
  {
    mes: "Abril",
    evento: "City Quest, Salva Vidas e Horta Medicinal",
  },
  {
    mes: "Maio",
    evento: "Community, Horta Medicinal e City Quest",
  },
  {
    mes: "Junho",
    evento: "Corrida do Bem, Salva Vidas e projetos escolares",
  },
  {
    mes: "Julho",
    evento: "Pets Day e EcoAção",
  },
  {
    mes: "Agosto",
    evento: "Adventure Race, City Quest e Salva Vidas",
  },
  {
    mes: "Setembro",
    evento: "Dia do Herói e Corrida do Bem",
  },
  {
    mes: "Outubro",
    evento: "Trail Edition, Hot Dogueres Day e EcoAção",
  },
  {
    mes: "Novembro",
    evento: "HotCore Tecnologia, City Quest e Salva Vidas",
  },
  {
    mes: "Dezembro",
    evento: "Festival Cultural Hot Dogueres",
  },
];

export default function Calendario2027Page() {
  return (
    <main>
      <SetasNavegacao
        anterior="/cadastro-parceiro"
        labelAnterior="Voltar para cadastro de parceiro"
      />

      <section className="relative overflow-hidden px-4 pb-10 pt-24 md:pt-28">
        <div className="absolute left-[-180px] top-[-180px] h-[360px] w-[360px] rounded-full bg-red-200/50 blur-3xl" />
        <div className="absolute bottom-[-220px] right-[-160px] h-[440px] w-[440px] rounded-full bg-yellow-200/70 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="rounded-[2.5rem] bg-gray-950 p-6 text-center text-white shadow-2xl md:p-10">
            <p className="inline-flex rounded-full bg-yellow-400 px-5 py-2 text-xs font-black uppercase tracking-wide text-gray-950">
              Calendário oficial em desenvolvimento
            </p>

            <h1 className="mx-auto mt-5 max-w-5xl text-4xl font-black leading-tight md:text-6xl">
              Calendário Hot Dogueres 2027
            </h1>

            <p className="mx-auto mt-5 max-w-4xl text-base font-bold leading-relaxed text-gray-300 md:text-lg">
              Um ano inteiro de eventos, ações sociais, educação, esporte,
              tecnologia, proteção animal, cultura, meio ambiente e gastronomia
              solidária.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-4">
              <div className="rounded-[1.5rem] bg-white p-5 text-gray-950">
                <p className="text-4xl font-black text-red-600">34+</p>
                <p className="mt-1 text-xs font-black uppercase text-gray-600">
                  ações previstas
                </p>
              </div>

              <div className="rounded-[1.5rem] bg-yellow-400 p-5 text-gray-950">
                <p className="text-4xl font-black">14</p>
                <p className="mt-1 text-xs font-black uppercase">
                  formatos de projetos
                </p>
              </div>

              <div className="rounded-[1.5rem] bg-green-600 p-5 text-white">
                <p className="text-4xl font-black">2027</p>
                <p className="mt-1 text-xs font-black uppercase text-green-100">
                  ano de impacto
                </p>
              </div>

              <div className="rounded-[1.5rem] bg-red-600 p-5 text-white">
                <p className="text-4xl font-black">100t+</p>
                <p className="mt-1 text-xs font-black uppercase text-red-100">
                  meta solidária
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="#eventos"
                className="rounded-full bg-yellow-400 px-7 py-4 text-sm font-black uppercase tracking-wide text-gray-950 shadow-lg transition hover:-translate-y-1 hover:bg-yellow-500"
              >
                Ver eventos
              </Link>

              <Link
                href="#resumo-anual"
                className="rounded-full bg-white px-7 py-4 text-sm font-black uppercase tracking-wide text-red-600 shadow-lg transition hover:-translate-y-1 hover:bg-red-50"
              >
                Ver resumo anual
              </Link>

              <Link
                href="/parceiros-empresas#fazer-parte"
                className="rounded-full bg-red-600 px-7 py-4 text-sm font-black uppercase tracking-wide text-white shadow-lg transition hover:-translate-y-1 hover:bg-red-700"
              >
                Quero ser parceiro
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="resumo-anual" className="scroll-mt-28 px-4 pb-10">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-white p-6 shadow-xl md:p-8">
          <div className="text-center">
            <p className="inline-flex rounded-full bg-red-600 px-5 py-2 text-xs font-black uppercase tracking-wide text-white">
              Visão geral
            </p>

            <h2 className="mt-4 text-3xl font-black leading-tight md:text-5xl">
              Resumo previsto do calendário 2027
            </h2>

            <p className="mx-auto mt-4 max-w-4xl text-sm font-bold leading-relaxed text-gray-600 md:text-base">
              As datas finais ainda dependerão de autorizações, parceiros,
              estrutura, patrocínios e confirmação dos locais. Esta é uma
              previsão estratégica para organização anual do ecossistema.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {RESUMO_ANUAL.map((item) => (
              <div
                key={item.mes}
                className="rounded-[1.5rem] bg-gray-50 p-5 shadow-sm ring-1 ring-gray-100"
              >
                <p className="text-xs font-black uppercase tracking-wide text-red-600">
                  {item.mes}
                </p>

                <p className="mt-2 text-lg font-black leading-tight text-gray-950">
                  {item.evento}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="eventos" className="scroll-mt-28 px-4 pb-12">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="inline-flex rounded-full bg-gray-950 px-5 py-2 text-xs font-black uppercase tracking-wide text-white">
              Projetos e eventos
            </p>

            <h2 className="mt-4 text-3xl font-black leading-tight md:text-5xl">
              Conheça cada ação do calendário
            </h2>

            <p className="mx-auto mt-4 max-w-4xl text-sm font-bold leading-relaxed text-gray-600 md:text-base">
              Cada evento foi pensado para gerar impacto real, envolver pessoas,
              atrair empresas parceiras e transformar gastronomia em movimento
              social.
            </p>
          </div>

          <div className="mt-10 space-y-8">
            {EVENTOS_2027.map((evento) => (
              <article
                key={evento.nome}
                className="overflow-hidden rounded-[2.2rem] bg-white shadow-xl ring-1 ring-gray-100"
              >
                <div className="grid gap-0 lg:grid-cols-[0.75fr_1.25fr]">
                  <div className="flex flex-col justify-between bg-gray-950 p-6 text-white md:p-8">
                    <div>
                      <p
                        className={`inline-flex rounded-full px-5 py-2 text-xs font-black uppercase tracking-wide ${evento.cor}`}
                      >
                        {evento.numero}
                      </p>

                      <h3 className="mt-5 text-3xl font-black leading-tight md:text-4xl">
                        {evento.nome}
                      </h3>

                      <p className="mt-3 text-lg font-black text-yellow-300">
                        {evento.subtitulo}
                      </p>

                      <div className="mt-6 grid gap-3">
                        <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
                          <p className="text-[10px] font-black uppercase tracking-wide text-gray-400">
                            Categoria
                          </p>
                          <p className="mt-1 text-sm font-black">
                            {evento.categoria}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
                          <p className="text-[10px] font-black uppercase tracking-wide text-gray-400">
                            Quantidade
                          </p>
                          <p className="mt-1 text-sm font-black">
                            {evento.quantidade}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
                          <p className="text-[10px] font-black uppercase tracking-wide text-gray-400">
                            Período previsto
                          </p>
                          <p className="mt-1 text-sm font-black">
                            {evento.periodo}
                          </p>
                        </div>
                      </div>
                    </div>

                    <Link
                      href="/parceiros-empresas#fazer-parte"
                      className="mt-6 flex justify-center rounded-full bg-yellow-400 px-6 py-4 text-xs font-black uppercase tracking-wide text-gray-950 shadow-lg transition hover:bg-yellow-500"
                    >
                      Apoiar este projeto
                    </Link>
                  </div>

                  <div className="p-6 md:p-8">
                    <div className="rounded-[1.5rem] bg-red-50 p-5 ring-1 ring-red-100">
                      <p className="text-xs font-black uppercase tracking-wide text-red-600">
                        Objetivo
                      </p>

                      <p className="mt-2 text-base font-bold leading-relaxed text-gray-700">
                        {evento.objetivo}
                      </p>
                    </div>

                    <p className="mt-6 text-base font-bold leading-relaxed text-gray-700">
                      {evento.descricao}
                    </p>

                    <div className="mt-6 grid gap-5 xl:grid-cols-2">
                      <div className="rounded-[1.5rem] bg-gray-50 p-5 ring-1 ring-gray-100">
                        <p className="text-xs font-black uppercase tracking-wide text-gray-500">
                          Como funciona
                        </p>

                        <ul className="mt-4 space-y-3">
                          {evento.comoFunciona.map((item) => (
                            <li
                              key={item}
                              className="flex gap-3 text-sm font-bold leading-relaxed text-gray-700"
                            >
                              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-600 text-xs text-white">
                                ✓
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="rounded-[1.5rem] bg-green-50 p-5 ring-1 ring-green-100">
                        <p className="text-xs font-black uppercase tracking-wide text-green-700">
                          Impacto esperado
                        </p>

                        <ul className="mt-4 space-y-3">
                          {evento.impacto.map((item) => (
                            <li
                              key={item}
                              className="flex gap-3 text-sm font-bold leading-relaxed text-gray-700"
                            >
                              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-600 text-xs text-white">
                                ✓
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 rounded-[1.5rem] bg-yellow-50 p-5 ring-1 ring-yellow-200">
                      <p className="text-xs font-black uppercase tracking-wide text-yellow-700">
                        Calendário previsto
                      </p>

                      <div className="mt-4 grid gap-3 md:grid-cols-2">
                        {evento.calendario.map((item) => (
                          <div
                            key={`${evento.nome}-${item.mes}-${item.acao}`}
                            className="rounded-2xl bg-white p-4 shadow-sm"
                          >
                            <p className="text-xs font-black uppercase tracking-wide text-red-600">
                              {item.mes}
                            </p>

                            <p className="mt-1 text-sm font-bold leading-relaxed text-gray-700">
                              {item.acao}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-14">
        <div className="mx-auto max-w-7xl rounded-[2.2rem] bg-red-600 p-6 text-center text-white shadow-xl md:p-10">
          <p className="inline-flex rounded-full bg-white px-5 py-2 text-xs font-black uppercase tracking-wide text-red-600">
            Empresas parceiras
          </p>

          <h2 className="mx-auto mt-5 max-w-5xl text-3xl font-black leading-tight md:text-5xl">
            Sua marca pode fazer parte de um ano inteiro de impacto social
          </h2>

          <p className="mx-auto mt-5 max-w-4xl text-base font-bold leading-relaxed text-red-50 md:text-lg">
            O Calendário Hot Dogueres 2027 foi pensado para conectar marcas,
            comunidade, escolas, instituições, atletas, famílias, voluntários e
            causas sociais em uma agenda anual de transformação.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/parceiros-empresas#fazer-parte"
              className="rounded-full bg-yellow-400 px-7 py-4 text-sm font-black uppercase tracking-wide text-gray-950 shadow-lg transition hover:-translate-y-1 hover:bg-yellow-500"
            >
              Quero ser parceiro
            </Link>

            <Link
              href="/"
              className="rounded-full bg-white px-7 py-4 text-sm font-black uppercase tracking-wide text-red-600 shadow-lg transition hover:-translate-y-1 hover:bg-red-50"
            >
              Voltar para início
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-red-100 bg-white px-4 py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <div>
            <p className="font-black text-gray-950">Hot Dogueres Solidário</p>
            <p className="mt-1 text-sm text-gray-500">
              Calendário 2027 em desenvolvimento.
            </p>
          </div>

          <div className="text-sm font-bold text-gray-600">
            <p>Contato: (79) 98131 4109</p>
            <p>Email: contato@hotdogueres.com.br</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
