# DomusTrack

**DomusTrack** é uma plataforma simples e eficiente para gerenciar manutenções de imóveis alugados. O projeto oferece uma interface fácil de usar para proprietários, inquilinos e prestadores de serviços, garantindo que manutenções sejam registradas, acompanhadas e realizadas no prazo, sem complicações.

## Estrutura do Projeto

O projeto **DomusTrack** é dividido em duas partes principais: o **backend** e o **frontend**. Cada uma dessas partes tem seu próprio conjunto de arquivos e README com instruções detalhadas para configuração e uso.

- **[Frontend](front/README.md):** A interface do usuário foi construída utilizando **Next.js** e **Tailwind CSS**. Ele comunica com o backend para exibir as informações de propriedades, manutenções e notificações.
- **[Backend](backend/README.md):** O backend foi desenvolvido utilizando **Node.js**, **Express**, **Prisma** (para acesso ao banco de dados) e **JWT** (para autenticação). Ele gerencia as operações de banco de dados e fornece uma API RESTful para o frontend.

## Funcionalidades

- **Gestão de Propriedades:** Adicione, edite e visualize propriedades.
- **Gestão de Manutenções:** Registre e gerencie manutenções, com lembretes automáticos.
- **Gestão de Prestadores de Serviço:** Registre prestadores para facilitar a execução das manutenções.
- **Notificações:** Receba alertas sobre prazos de manutenções e outras atualizações importantes.

## Começando

### Pré-requisitos

Antes de começar, certifique-se de ter os seguintes pré-requisitos:

- Node.js (versão >= 16.x.x)
- Banco de dados (configuração do Prisma com PostgreSQL)

### Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/Gaabriel22/domustrack.git
   cd domustrack
   ```

2. Instale as dependências do backend e frontend. Para instruções detalhadas de como configurar cada parte, consulte os README's dentro das respectivas pastas:

   - **[Backend](backend/README.md)**
   - **[Frontend](front/README.md)**

### Rodando o Projeto

Cada parte (frontend e backend) possui seus próprios comandos para iniciar o servidor. Consulte os README's de **[Backend](backend/README.md)** e **[Frontend](front/README.md)** para detalhes sobre como rodar cada um.

## Contribuindo

1. Faça o fork do repositório.
2. Crie uma branch para sua feature:
   ```bash
   git checkout -b minha-feature
   ```
3. Faça as alterações necessárias e adicione testes, se possível.
4. Envie suas mudanças:
   ```bash
   git commit -am 'Adiciona nova feature'
   git push origin minha-feature
   ```
5. Abra um pull request.

## Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contato

- **Autor:** Gabriel Amaral
- **E-mail:** gabrielvieira2205@gmail.com
- **GitHub:** https://github.com/Gaabriel22
