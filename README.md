# tos.coreofscience.org

A web application to create your tree of science.

## Available commands

- `npm test` starts your test runner.
- `npm start` starts your development environment.
- `npm run build` builds your dist files.
- `npm run serve` previews your built dist files.

And also:

- `npm run shipit` tags a new deployment.

## Emulators workflow

To work with the local emulators,

- On a terminal window run `npm run start:emulators`
- On a separate terminal window run `npm run start:ui`

Now the UI should be connected to the local emulators for easier debugging.

There might be an error if you don't have a firebase project selected, if so use:

```
npm run firebase -- use default
```
