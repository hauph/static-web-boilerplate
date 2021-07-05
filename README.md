# Static Web Boilerplate

Simple boilerplate for developing static web projects using `Webpack`, `SCSS`. It is also configured with `webpack-dev-server`, `eslint`, `prettier`, `stylelint`and `babel`.

## Folder Structure

```bash
.
├── /build/                             # All the built files and folders which are used for production will go here
├── /node_modules/                      # 3rd-party libraries and utilities installed via npm
├── /src/                               # The source code of the application
│   ├── /fonts/                         # Fonts
│   ├── /images/                        # Images
│   ├── /pages/                         # HTML files (no folders allowed)
│   ├── /plugins/                       # 3rd-party libraries and utilities downloaded and added to HTML file via link and script tags
│   ├── /scripts/                       # Javascript
│   │   ├── /style-script/            
│   │   │   ├── style-script.js         # Main CSS and SCSS used in project
│   │   ├── global-plugin-list.json     # List of CSS and JS links that are used on all pages
│   │   ├── index.js                    # Main JS file
│   ├── styles  
│   │   ├── /css/                     
│   │   │   ├── css.css                 # Main CSS file (in case you want to use CSS)
│   │   ├── /scss/                      # Source of your SCSS files
│   │   │   ├── style.scss              # Main SCSS file
│   ├── index.html                      # Main page
├── /webpack/
│   ├── webpack.common.js               # Webpack configuration which is used on both development and production modes
│   ├── webpack.dev.js                  # Webpack configuration for development mode
│   ├── webpack.prod.js                 # Webpack configuration for production mode
├── .babelrc                            # Babel configuration
├── .editorconfig                       # Editor configuration
├── .eslintrc.json                      # Es-lint configuration
├── .gitignore                          # Ignored git files and folders
├── .prettierignore                     # Ignored prettier files and folders
├── .prettierrc                         # Prettier configuration
├── .stylelintrc                        # Stylelint configuration
├── package.json                        # The list of 3rd party libraries and utilities
├── README.md                           # This file
```

## Documentation

- All the source code will be inside `src` directory.
- This boilerplate supports multiple pages. To use this, create your page (**html** file) inside `pages` folder. Please note that this boilerplate does not support nested HTML pages, so folders created inside `pages` are prohibited.
- There are 2 ways to add external links and scripts:
  - Particular: add link and script tags to page you want. This is the classic way and added links and scripts will only work within that page.
  - Globally: add links of CSS and JS to file `global-plugin-list.json`. Added links will be imported to all pages.
  ```
    // Example
    {
        "css": [
            "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
        ],
        "js": [
            "https://code.jquery.com/jquery-3.6.0.slim.min.js",
            "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js",
            "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
        ]
    }
  ```

## Usage

- `npm run start` or `npm start`: Start development server, open http://localhost:1802.
- `npm run build`: Build `src` and create `build` folder for production.
- `npm run start:prod`: Build `src` and create `build` folder for production, then start production server on http://localhost:5001. This will show you how your project looks like on a real server.