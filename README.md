# eslint-plugin-react-usecallback

Rationale: [Why we memo all the things](https://attardi.org/why-we-memo-all-the-things/).

## Why the fork?

The original forked plugin ([eslint-plugin-react-memo](https://github.com/steadicat/eslint-plugin-react-memo)) also checks this using the `require-usememo-children` rule but the rule is too strict about JSX used as children (the most common thing in React) and has not way to select which of the actual children prop rules apply.

## Rules

### `require-usecallback-props` (**ADVANCED**)

Requires functions that get passed to children as props to be wrapped in `React.useCallback()`.
