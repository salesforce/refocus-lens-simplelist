# refocus-lens-simplelist

## SimpleList

A simple list of samples sorted by sample name. By default, it only displays
samples with a non-OK status. You can display all samples by adding query param
showAll=true to the url.

### Setup

1. Git clone this repo.

1. Install the Refocus Lens Developer Kit.

        git clone https://github.com/salesforce/refocus-ldk
        cd refocus-ldk
        npm install

1. Copy this lens into your `refocus-ldk/Lenses` directory.

        cp -r ../refocus-lens-simplelist/SimpleList Lenses/

1. Configure the Refocus LDK.

        npm config set refocus-ldk:lens SimpleList

1. Compile the lens.

        npm run compile

### Test

Run the Refocus LDK's `test` script to run all the tests under `refocus-ldk/Lenses/SimpleList/test`.

```
npm test
```

### Build

Run the Refocus LDK's `build` script to generate the lens library (`refocus-ldk/dist/SimpleList.zip`).

```
npm run build
```

### Deploy

Use the Refocus UI or API (`/v1/lenses`) to deploy the lens.
