# lodash.github.io
The lodash website.


## Running Locally

1 – Clone the repo locally.
2 – Install github-pages gem.

```
gem install github-pages
```

3 – Build & run from repo dir.
```
jekyll build
jekyll serve --watch
```

## Incrementing the Lodash version

1 – Generate the new doc by running `npm run doc:sitehtml` in the `lodash/lodash` repo and copying the file over.

2 – Update the `latestRelease` variable in `_config.yml`.

3 – Add an option for the new version to the version selector in `_layouts/docs.html`. E.g.:

```html
<option value="v4.13.0" {% if page.version == 'v4.13.0' %} selected {% endif %}>v4.13.0</option>
```
