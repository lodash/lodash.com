# lodash.com

The Lodash website.

## Running Locally

1. Clone the repository locally.

2. Install [required gems](http://bundler.io/) in the repository directory.
    ```shell
    $ bundle
    ```

3. Build & run.
    ```shell
    $ bundle exec jekyll serve
    ```

## Incrementing the Lodash Version

1. Generate new documentation by running `npm run doc:sitehtml` from the [Lodash repository](https://github.com/lodash/lodash).
2. Copy the generated documentation from `lodash/doc/` to `lodash.com/docs/`.
3. Update the `release` field in `_config.yml`.
