# notelex

[![Build Status](https://travis-ci.org/learningmedia/notelex.svg)](https://travis-ci.org/learningmedia/notelex)

Notelex is a widget to compare different approaches in music theory

## Installation

The notelex library depends on [jquery](https://www.npmjs.com/package/jquery), [jquery.klavier](https://www.npmjs.com/package/jquery.klavier) and [vexflow](https://www.npmjs.com/package/vexflow).

With browserify/webpack etc.:

~~~sh
# install dependencies:
$ npm install jquery jquery.klavier vexflow

# install notelex:
$ npm install notelex
~~~

... or as a global script:

~~~html
<script src="path/to/jquery.js"></script>
<script src="path/to/jquery.klavier.js"></script>
<script src="path/to/vexflow.js"></script>
<script src="node_modules/dist/notelex.min.js"></script>
~~~

## Usage

~~~js
notelex.init({
  pianoSelector: '#piano',
  theoryHeadersSelector: '#theoryHeaders',
  theoryContentSelector: '#theoryContent',
  scoreCanvasSelector: '#scoreCanvas'
});
~~~

Also, see the example `index.html` file within this repository.

## License

Licensed under the CC-BY-NC-ND-4.0 license (http://creativecommons.org/licenses/by-nc-nd/4.0/legalcode).
However we explicitly allow forks of this repository in order to create pull requests.
