# lodash.github.io

The Lodash website.

## Running Locally

1. Clone the repository locally.

2. Install the `github-pages` gem.
    ```shell
    $ gem install github-pages
    ```

3. Build & run from the repository’s directory.
    ```shell
    $ jekyll serve
    ```

## Incrementing the Lodash Version

1. Generate new documentation by running `npm run doc:sitehtml` from the [Lodash repository](https://github.com/lodash/lodash).
2. Copy the generated documentation from `lodash/doc/` to `lodash.github.io/docs/`.
3. Update the `release` field in `_config.yml`.
