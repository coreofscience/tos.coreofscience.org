# tos.coreofscience.org

A web application to create your tree of science.

## Available commands

- `pnpm test` starts your test runner.
- `pnpm start` starts your development environment.
- `pnpm run build` builds your dist files.
- `pnpm run serve` previews your built dist files.

And also:

- `pnpm run shipit` tags a new deployment.

## Emulators workflow

To work with the local emulators,

- On a terminal window run `pnpm run start:emulators`
- On a separate terminal window run `pnpm run start:ui`

Now the UI should be connected to the local emulators for easier debugging.

There might be an error if you don't have a firebase project selected, if so use:

```
pnpm run firebase use default
```
