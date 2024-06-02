
# HomeFinanceManager

Esta aplicação foi criada para simplificar o gerenciamento das contas de uma república. Com ela, os usuários podem acompanhar facilmente o status dos pagamentos das contas da casa. Além disso, a aplicação é versátil e pode ser utilizada em diversos ambientes onde existam débitos semelhantes entre diferentes usuários, proporcionando uma gestão clara e eficiente das finanças.


## MySql

Foi selecionado o MySQL como sistema de gerenciamento de banco de dados devido a capacidade de lidar eficientemente com dados estruturados, atendendendo bem as necessidades do projeto. 


## Entidades

Users - Tabela onde são registrados os usuários do sistema.

Hosts - Tabela que representa os diferentes ambientes ou servidores disponíveis.

HostUser - Tabela que relaciona os usuários aos hosts nos quais eles estão presentes.

Pendencias - Tabela que registra as contas a serem pagas pelos usuários dentro de um host.

PendenciaUsers - Tabela que define quais usuários estão relacionados a cada pendência de um host.
