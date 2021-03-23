# API Docs

# :pushpin: Tabela de conteúdos

- :construction: [Estrutura](#:construction:-estrutura)
- :computer: [Endpoints](#:computer:-endpoints)
- :receipt: [Chamadas](#:receipt:-chamadas)

# :construction: Estrutura

## :computer: Comandos úteis

- Alterei o `.env` da raiz, e agora?: `yarn install:env`

---

- Gerar novo service de modulo: `nest g service ${module}`
- Gerar novo controller de modulo: `nest g controller ${module}`
- Gerar novo decorator de modulo: `nest g decorator ${module}`
- Gerar novo guard de modulo: `nest g guard ${module}`

---

- Gerar novo submodulo: `nest g module ${submodule} ${module}`
- Gerar novo service em submodulo: `nest g service ${submodule} ${module}`
- Gerar novo controller em submodulo: `nest g controller ${submodule} ${module}`
- Gerar novo decorator em submodulo: `nest g decorator ${submodule} ${module}`
- Gerar novo guard em submodulo: `nest g guard ${submodule} ${module}`

---

- Para saber se está mantendo a Clean Architecture apenas execute o comando: `yarn test:check:ca`
  Se houver alguma despadronização você verá o aviso no console

## :open_file_folder: Diretórios

```
  __mocks__/
  src/
    application/
      api/
        http-rest/
          controller/
            documentation/
          exception-filter/
      dependency-injection/
    core/
      common/
        adapter/
        api/
        code/
        di/
        entity/
        enums/
        exception/
        port/
        type/
        usecase/
        util/
      domain/
        ${module}/
          di/
          entity/
          handler/
          port/
          usecase/
      service/
        ${module}/
          handler/
          usecase/
    infrastructure/
      adapter/
        message/
        persistence/
          typeorm/
            ${module}/
        usecase/
          ${module}/
      config/
        environment/
        typeorm/
      handler/
        ${module}/
      transaction/
        ${module}/
```

# :computer: Endpoints

A documentação dos endpoints se encontra na url documentation:

`http://{host}:{port}/documentation`;
