# TypeormExample

This repository was created to showcase that generation migrations using the typeorm cli does not work for entities that import from other libs in the same repo.

The goal is to generate an initial migration for the user entity in the user domain (libs/backend/user/src/lib/domain/user.entity.ts).
According to the typeorm documentation one should be able to run:

```
npm run typeorm migration:generate -- test -d libs/backend/user/orm.config.ts
```

This however returns the following error:

```
> typeorm-example@0.0.0 typeorm
> typeorm-ts-node-esm "migration:generate" "test" "-d" "libs/backend/user/orm.config.ts"

Error during migration generation:
libs/backend/user/src/lib/domain/user.entity.ts:2:31 - error TS2307: Cannot find module '@typeorm-example/shared/ddd-seedwork' or its corresponding type declarations.

2 import { AggregateRoot } from '@typeorm-example/shared/ddd-seedwork';
                                ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
libs/backend/user/src/lib/domain/user.entity.ts:5:14 - error TS1219: Experimental support for decorators is a feature that is subject to change in a future release. Set the 'experimentalDecorators' option in your 'tsconfig' or 'jsconfig' to remove this warning.

5 export class User extends AggregateRoot {
               ~~~~
libs/backend/user/src/lib/domain/user.entity.ts:7:10 - error TS1219: Experimental support for decorators is a feature that is subject to change in a future release. Set the 'experimentalDecorators' option in your 'tsconfig' or 'jsconfig' to remove this warning.

7   public name: string;
           ~~~~
```

Apparently the ts-node settings used by typeorm are incorrect. Maybe we should register our paths?

```
ts-node --project tsconfig.base.json -r tsconfig-paths/register node_modules/typeorm/cli-ts-node-commonjs.js migration:generate test -d libs/backend/user/orm.config.ts
```

Unfortunately no:

```
Error during migration generation:
libs/backend/user/src/lib/domain/user.entity.ts:3:31 - error TS2307: Cannot find module '@typeorm-example/shared/ddd-seedwork' or its corresponding type declarations.

3 import { AggregateRoot } from '@typeorm-example/shared/ddd-seedwork';
                                ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
libs/backend/user/src/lib/domain/user.entity.ts:5:17 - error TS7006: Parameter 'name' implicitly has an 'any' type.

5     constructor(name) {
                  ~~~~
libs/backend/user/src/lib/domain/user.entity.ts:7:14 - error TS2339: Property 'name' does not exist on type 'User'.

7         this.name = name;

```

At this point we could start messing with compilerOptions to try and get ts-node to accept the errors. But obviously it will keep failing at the import that cannot be found.

How to proceed?
