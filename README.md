# lodash.github.io

The lodash website.

## Running Locally

1. Clone the repository locally.
1. Install the `github-pages` gem.

    ```sh
    $ gem install github-pages
    ```

1. Build & run from the repository’s directory.

    ```sh
    $ jekyll build
    $ jekyll serve --watch
    ```

## Incrementing the lodash version

1. Generate the new documentation by running `npm run doc:sitehtml` in the `lodash/lodash` repo and copying the file over.
1. Update the `latestRelease` variable in `_config.yml`.
1. Add an option for the new version to the version selector in `_layouts/docs.html`. E.g.:

    ```html
    <option value="v4.13.0" {% if page.version == 'v4.13.0' %} selected {% endif %}>v4.13.0</option>
    ```
