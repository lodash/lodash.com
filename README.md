# lodash.com

The Lodash website.

## Running Locally

1. Clone the repository locally.

2. Install required [gems](http://bundler.io/) & [packages](https://www.npmjs.com/) in the repository directory.
    ```shell
    $ bundle
    $ npm i
    ```

3. Build & run.
    ```shell
    $ bundle exec jekyll serve
    ```

## Incrementing the Lodash Version

1. Generate new documentation by running `npm run doc:sitehtml` from the [Lodash repository](https://github.com/lodash/lodash).

2. Copy the generated documentation from `lodash/doc/` to `lodash.com/docs/`.

3. Update `_config.yml` for the release.
    ```shell
    $ npm run build:config <version>
    ```
