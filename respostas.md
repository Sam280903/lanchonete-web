# Respostas Conceituais — Lista Git, GitHub e GitFlow

**Disciplina:** Engenharia da Qualidade e Confiabilidade  
**Aluno:** Sam280903  
**Data:** 11/06/2026

---

## Parte 1: Fundamentos do Git

### Questão 1c — O que significa "Untracked files"?

"Untracked files" indica que o Git detectou arquivos na pasta do projeto que **ainda não estão sendo monitorados** por ele. Esses arquivos existem no diretório de trabalho, mas o Git nunca os rastreou — ou seja, nenhum `git add` foi realizado sobre eles. O Git os exibe como aviso para que o desenvolvedor decida se deseja incluí-los no controle de versão.

---

### Questão 2a — O que mudou após `git add README.md`?

Após o `git add README.md`, o arquivo saiu da seção **"Untracked files"** e passou para a seção **"Changes to be committed"** (Staging Area). Isso significa que o README.md está agora preparado (staged) para ser incluído no próximo commit. Os demais arquivos continuam como "Untracked".

### Questão 2d — O que `git log --oneline` exibe?

O comando `git log --oneline` exibe o histórico de commits de forma resumida, com **uma linha por commit**, mostrando o **hash curto** (7 caracteres) e a **mensagem do commit**. É ideal para ter uma visão rápida da linha do tempo do projeto.

---

### Questão 3a — Diferença entre Untracked e Modified

| Status      | Significado |
|-------------|-------------|
| **Untracked** | Arquivo novo que o Git nunca rastreou. Não existe em nenhum commit anterior. |
| **Modified**  | Arquivo que o Git já conhece (já foi commitado), mas que sofreu alterações desde o último commit. |

Em resumo: *Untracked* é o primeiro contato do Git com o arquivo; *Modified* é uma mudança em algo já registrado no histórico.

### Questão 3b — O que `git diff` mostra?

O `git diff` (sem argumentos) mostra as **diferenças linha a linha** entre o arquivo no diretório de trabalho e a versão que está na Staging Area (ou no último commit, se nada foi staged). Linhas prefixadas com `+` são adições; com `-` são remoções. Ele permite revisar exatamente o que será incluído antes de fazer o `git add`.

---

### Questão 4a — Informações do `git log` (versão completa)

O `git log` exibe, para cada commit:
- **Hash completo** — identificador SHA-1 único do commit (40 caracteres)
- **Author** — nome e e-mail de quem realizou o commit
- **Date** — data e hora do commit
- **Mensagem** — descrição do que foi alterado

### Questão 4b — O símbolo `*` no `git log --oneline --graph`

O símbolo `*` representa **um commit na linha do tempo**. Cada asterisco é um ponto no grafo do histórico. Quando há branches, o grafo exibe ramificações (`|\`, `|/`) para mostrar onde os caminhos divergiram e convergiram.

### Questão 4c — Importância de mensagens de commit claras

Mensagens descritivas são essenciais porque:
1. **Facilitam a revisão de código** — qualquer desenvolvedor entende o que foi feito sem precisar analisar o diff.
2. **Agilizam a depuração** — ao investigar um bug, é possível identificar rapidamente qual commit introduziu a mudança.
3. **Documentam o histórico** — o `git log` vira um diário do projeto, permitindo rastrear decisões técnicas ao longo do tempo.
4. **Melhoram a colaboração** — em equipes, commits bem descritos evitam retrabalho e comunicação redundante.

---

### Questão 5c — O que o asterisco `(*)` em `git branch` indica?

O asterisco indica a **branch atual** (na qual o HEAD está apontando). É a branch que receberá os próximos commits.

### Questão 5d — Por que `promocoes.html` desapareceu ao voltar para `main`?

Porque o arquivo foi commitado **apenas na branch `feature/pagina-promocoes`**, e não na `main`. O Git gerencia o estado de cada branch de forma independente — ao trocar de branch, o diretório de trabalho reflete exatamente os arquivos daquela branch. Como o `promocoes.html` ainda não existia na `main`, ele simplesmente não aparece.

---

### Questão 6b — Estratégia de merge utilizada

O Git utilizou a estratégia **Fast-forward**. Ela ocorre quando a branch de destino (`main`) não teve nenhum commit novo desde a criação da branch de feature — ou seja, a `main` estava "atrás" da feature. O Git simplesmente avança o ponteiro da `main` para o commit mais recente da feature, sem criar um commit de merge.

### Questão 6c — O que mudou no histórico após o merge?

No `git log --oneline --graph`, o histórico permaneceu linear (sem bifurcação visível) por causa do Fast-forward. O ponteiro `main` simplesmente foi avançado para incluir o commit da feature. Não há commit de merge explícito.

### Questão 6d — Por que deletar branches concluídas?

Boas práticas para deletar branches finalizadas:
- **Limpeza do repositório** — evita acúmulo de branches obsoletas que confundem a equipe.
- **Clareza de propósito** — branches ativas devem representar trabalho em andamento.
- **Redução de conflitos futuros** — branches antigas acumulam divergências e podem causar conflitos desnecessários se reabertos.

---

### Questão 7c — Diferença entre `git revert` e `git reset`

| Comando       | Comportamento |
|---------------|---------------|
| `git revert`  | Cria um **novo commit** que desfaz as mudanças do commit indicado. O histórico é preservado. |
| `git reset`   | **Move o ponteiro** do HEAD para um commit anterior, podendo apagar commits do histórico. |

**Por que `revert` é mais seguro em projetos colaborativos?**  
Porque ele **não reescreve o histórico**. Em projetos com vários colaboradores, usar `git reset` em commits já enviados ao repositório remoto causaria divergências graves no histórico de outros desenvolvedores. O `revert` adiciona transparência: fica registrado que uma mudança foi desfeita e por quê.

---

### Questão 8c — O que significa a flag `-u` no `git push`?

A flag `-u` (ou `--set-upstream`) configura a branch local para **rastrear a branch remota** correspondente. Após usar `git push -u origin main`, nos próximos pushes basta digitar `git push` (sem precisar especificar `origin main`), pois o Git já sabe para onde enviar.

### Questão 8d — O que o `git pull` fez?

O `git pull` executou dois comandos em sequência:
1. `git fetch` — baixou as alterações do repositório remoto.
2. `git merge` — integrou essas alterações na branch local atual.

O resultado foi que a alteração feita diretamente no GitHub (no README.md) passou a existir também no repositório local.

---

## Parte 2: GitFlow

### Questão 9c — Qual branch foi criada além da `main`?

A branch **`develop`** foi criada. Ela serve como a **linha de integração contínua** do projeto — é onde todas as features são incorporadas antes de irem para produção. A `main` representa apenas versões estáveis e liberadas; a `develop` é o ramo de desenvolvimento ativo.

---

### Questão 10a — Em qual branch `git flow feature start` coloca o desenvolvedor?

Na branch **`feature/cardapio-interativo`**, criada automaticamente a partir da `develop`.

### Questão 10c — O que `git flow feature finish` fez automaticamente?

1. Fez o **merge** da branch `feature/cardapio-interativo` na `develop`.
2. **Deletou** a branch de feature localmente.
3. Voltou para a branch `develop`.

O código foi enviado para a branch **`develop`** (não para a `main`).

---

### Questão 11a — Em qual branch o `release` é criado e a partir de qual?

A branch de release é criada como **`release/1.0.0`**, nascendo a partir da branch **`develop`**. Ela captura o estado atual do desenvolvimento e isola os ajustes finais de preparação para o lançamento.

### Questão 11c — O que aconteceu com `main` e `develop` após o `release finish`?

O `git flow release finish 1.0.0`:
1. Fez **merge da release na `main`** — a versão estável foi lançada.
2. Criou a **tag `1.0.0`** na `main`.
3. Fez **merge da release de volta na `develop`** — para que os ajustes finais da release também existam no ramo de desenvolvimento.
4. Deletou a branch `release/1.0.0`.

### Questão 11d — Função de uma tag no GitFlow

Tags marcam **pontos imutáveis no histórico**, representando versões liberadas para produção. No GitFlow, cada `release finish` cria uma tag (ex: `1.0.0`) para que qualquer versão passada possa ser recuperada exatamente como foi entregue ao usuário. São análogas a "fotografias" do estado do software em um dado momento.

---

### Questão 12a — Por que o `hotfix` nasce da `main` e não da `develop`?

Porque o hotfix precisa corrigir um problema que está **em produção agora**, e a `main` representa exatamente o estado em produção. Se nascesse da `develop`, o hotfix incluiria features que ainda não foram liberadas, contaminando a correção urgente com código não validado. A `main` garante que apenas a correção pontual seja aplicada.

### Questão 12c — Para quais branches o hotfix foi mesclado?

Após `git flow hotfix finish correcao-titulo`, o hotfix foi mesclado em:
1. **`main`** — para corrigir o problema em produção imediatamente.
2. **`develop`** — para que a correção também esteja presente no desenvolvimento futuro, evitando que o bug reapareça nas próximas releases.

### Questão 12d — Número de versão após o hotfix (SemVer)

Seguindo o **Versionamento Semântico (SemVer)** — no formato `MAJOR.MINOR.PATCH`:
- **MAJOR**: mudanças incompatíveis com versões anteriores.
- **MINOR**: novas funcionalidades retrocompatíveis.
- **PATCH**: correções de bugs retrocompatíveis.

Um hotfix é uma correção de bug, portanto incrementa o **PATCH**:  
**`1.0.0` → `1.0.1`**

---

## Questão 13 — Reflexão Final

### 13a — Diagrama do histórico de branches

```
main    ─────●──────────────────────────────●──────●
             │                              │  tag  │  tag
             │                           1.0.0    1.0.1
             │                              │
develop ─────●────────●──────────●──────────●──────●
                      │          │
feature               ●──●──●──◄─┘
(cardapio-interativo)

release                    ●──◄── chore: prepara release v1.0.0
(1.0.0)                    └──► merge em main e develop

hotfix                                          ●──◄── fix: corrige titulo
(correcao-titulo)                               └──► merge em main e develop
```

**Legenda:**
- `●` = commit
- `──►` = direção do merge
- Setas duplas: a release e o hotfix são mesclados em **ambas** as branches (`main` e `develop`)

---

### 13b — Quando usar GitFlow (e quando não usar)

**GitFlow é mais indicado em:**
- Projetos com **ciclos de release planejados** (ex: versões mensais, trimestrais).
- Equipes maiores com **múltiplos desenvolvedores** trabalhando em features paralelas.
- Softwares que precisam manter **múltiplas versões em produção** simultaneamente.
- Projetos corporativos com processos formais de QA e aprovação antes do lançamento.

**GitFlow seria desnecessariamente complexo em:**
- Projetos pequenos ou solo, como aplicações pessoais ou exercícios acadêmicos.
- Times que praticam **entrega contínua (CI/CD)**, onde código vai para produção várias vezes ao dia — nesse caso, fluxos mais simples como GitHub Flow ou trunk-based development são mais adequados.
- Protótipos e MVPs onde a velocidade é mais importante que a formalidade do processo.

---

### 13c — Comparação: sem GitFlow (Q1–8) vs. com GitFlow (Q9–13)

**Vantagem do GitFlow:** O histórico de branches fica **organizado e semântico** — fica claro o que é feature, release ou hotfix. A separação entre `develop` (integração) e `main` (produção) garante que código instável nunca vai para produção acidentalmente.

**Desvantagem do GitFlow:** Para projetos simples, o fluxo adiciona **complexidade desnecessária** — são muitas branches, merges e tags para um trabalho que poderia ser feito diretamente na `main`. O overhead de `git flow feature start/finish` pode ser contraproducente em times pequenos ou projetos com entregas contínuas.
