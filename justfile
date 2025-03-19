set dotenv-load

# list the available recipes.
default:
    just -l

# run a dev server.
dev:
   bunx vite dev
# build using svelte's adapter-static.
build:
    bunx vite build
# keep a watching build running.
build-watch:
    bunx vite build --watch
# create a static build and create a .zip extension from it.
build-ext: build
    bunx web-ext build -s ./build --overwrite-dest
# create a static build, then sign and upload the extension.
sign-ext: build
    bunx web-ext sign -s ./build --channel unlisted
# remove the build directory.
clean:
    rm -rf ./build
# synchronize svelte-kit's generated type definitions.  
prepare:
    bunx svelte-kit sync
# run svelte-check.
check: prepare
    bunx svelte-check --tsconfig ./tsconfig.json
# run svelte-check --watch.
check-watch: prepare
    bunx svelte-check --tsconfig ./tsconfig.json --watch
# format project files using prettier.
fmt:
    bunx prettier --write .
# check project files for eslint & prettier rule violations.
lint:
    bunx prettier --check .
    bunx eslint .
# run web-ext lint.
lint-ext:
    bunx web-ext lint
