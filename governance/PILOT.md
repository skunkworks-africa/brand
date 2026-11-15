# Brand integration pilot baseline

The canonical design-system source is `tokens.css`. `tokens-1.0.0.css` is an immutable snapshot of the 1.0.0 baseline; SHA-256: `501a722bd4556929db101341a46440f89ce27567b38e895c1693faeef78716d9`. This snapshot is not a newly published release.

| Semantic role | Brand token | Theme token | Corporate token | Migration constraint |
| --- | --- | --- | --- | --- |
| Background | --sk-bg | --sw-bg | --bg | Different dark values; visual review required |
| Text | --sk-text | --sw-fg | --fg | Different light and dark values; review required |
| Muted text | --sk-muted | --sw-muted | --muted | Current theme uses alpha colours; contrast must be rechecked |
| Border | --sk-border | --sw-line | --line | Not value-equivalent |
| Surface | --sk-surface | --sw-soft | --soft | Not value-equivalent |
| Font | --sk-font | --sw-font | font-family | Similar stack; verify computed style |
| Radius | --sk-radius | --sw-radius / --sw-radius-sm | --radius / --radius-sm | Different component roles; no direct substitution |

The mapping records candidate roles, not equivalent values. Do not replace legacy tokens until component and theme tests pass. Corporate layout, contrast, light/dark and responsive behaviour require visual and browser verification. Pin downstream copies to a reviewed immutable commit and verify checksums. Validate site updates before deployment and retain the previous version for rollback.
